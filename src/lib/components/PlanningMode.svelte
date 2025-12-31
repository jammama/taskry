<script>
    import { fly, fade, slide } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import { onDestroy, onMount } from 'svelte';
    import NewTaskInput from '$lib/components/NewTaskInput.svelte';
    import SelectionBar from '$lib/components/SelectionBar.svelte';
    import { addTodo, completeTodo, deleteTodo, updateTodo, todos, getCompletedSectionCollapsed, setCompletedSectionCollapsed, reorderTodos } from '$lib/stores/todoStore.js';
    import { createSwipeGestureHandler } from '$lib/utils/swipeGesture.js';
    import { getCategoryIcon } from '$lib/utils/categoryUtils.js';
    import TargetIcon from '$lib/components/icons/TargetIcon.svelte';
    import RefreshIcon from '$lib/components/icons/RefreshIcon.svelte';
    import ZapIcon from '$lib/components/icons/ZapIcon.svelte';
    import CollapseIcon from '$lib/components/icons/CollapseIcon.svelte';
    import CancelIcon from '$lib/components/icons/CancelIcon.svelte';
    import confetti from 'canvas-confetti';
    import { signOut } from '$lib/stores/authStore.js';
    import { supabase } from '$lib/supabaseClient';
    import './PlanningMode.css';

    let completedId = null;
    let rewardTimer = null;
    let editingId = null;
    let editingTitle = '';
    let editInputElement = null;
    let taskListElement = null;
    let animatingCheckId = null; // 애니메이션 중인 체크박스 ID
    // 선택 상태 관리
    let selectedIds = new Set();
    const dispatch = createEventDispatcher();
    
    // 완료된 할 일 섹션 접기/펴기 상태
    let completedSectionCollapsed = false;
    
    // 완료된 할 일과 진행 중인 할 일 분리 및 정렬
    $: activeTodos = $todos
        .filter(task => !task.isComplete)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    $: completedTodos = $todos
        .filter(task => task.isComplete)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    
    // 수직 스와이프 상태 관리
    let draggedTaskOriginalIndex = -1; // 드래그 중인 Task의 원래 인덱스
    let dropTargetIndex = -1; // 드롭될 위치 인덱스 (-1이면 드롭 위치 없음)
    let dropTargetPosition = null; // 'top' | 'bottom' | null - 드롭 위치가 위인지 아래인지
    let draggedTaskShadowY = null; // shadow div의 Y 위치
    let draggedTaskData = null; // 드래그 중인 Task 데이터 (shadow용)
    
    // 스와이프 제스처 핸들러 생성
    const swipeHandler = createSwipeGestureHandler({
        onSwipeStart: (taskId, element) => {
            // 편집 모드 중일 때는 스와이프 비활성화
            if (editingId === taskId) {
                swipeHandler.reset();
                return;
            }
            
            // 수직 스와이프 상태 초기화
            draggedTaskOriginalIndex = -1;
            dropTargetIndex = -1;
            dropTargetPosition = null;
            draggedTaskShadowY = null;
            draggedTaskData = null;
        },
        onSwipeMove: (taskId, deltaX, deltaY, direction) => {
            // 수평 스와이프: 시각적 피드백만 (비즈니스 로직 없음)
            // 수직 스와이프: 시각적 피드백만 (드래그 중에는 순서 변경 안 함)
            if (direction === 'vertical') {
                const state = swipeHandler.getState();
                // 현재 마우스/터치 위치 계산
                if (state.swipeStartY !== null && state.swipeCurrentY !== null) {
                    // 드래그 중인 Task 데이터 저장 (처음 한 번만)
                    if (draggedTaskData === null) {
                        const task = activeTodos.find(t => t.id === taskId);
                        if (task) {
                            draggedTaskData = task;
                            draggedTaskOriginalIndex = activeTodos.findIndex(t => t.id === taskId);
                        }
                    }
                    // shadow 위치 업데이트
                    draggedTaskShadowY = state.swipeCurrentY;
                    // drop target 계산 (순서 변경은 하지 않음)
                    handleVerticalSwipeVisualFeedback(taskId, state.swipeCurrentY);
                }
            }
        },
        onSwipeEnd: (taskId, deltaX, deltaY, direction) => {
            if (direction === 'horizontal') {
                // 수평 스와이프 종료 - 선택/해제 처리
                const threshold = 30;
                if (deltaX < -threshold) {
                    // 왼쪽으로 스와이프 - 선택
                    if (!selectedIds.has(taskId)) {
                        selectedIds.add(taskId);
                        selectedIds = selectedIds; // Svelte 반응성 트리거
                        console.log(`${selectedIds.size}개 선택됨`);
                    }
                } else if (deltaX > threshold) {
                    // 오른쪽으로 스와이프 - 선택 해제
                    if (selectedIds.has(taskId)) {
                        selectedIds.delete(taskId);
                        selectedIds = selectedIds; // Svelte 반응성 트리거
                        console.log(`선택 해제됨 (현재 ${selectedIds.size}개 선택됨)`);
                    }
                }
            } else if (direction === 'vertical') {
                // 수직 스와이프 종료 처리 - 실제 순서 변경 수행
                if (draggedTaskOriginalIndex !== -1 && dropTargetIndex !== -1 && dropTargetIndex !== draggedTaskOriginalIndex) {
                // 실제 순서 변경
                const newOrder = [...activeTodos];
                const [movedTask] = newOrder.splice(draggedTaskOriginalIndex, 1);
                
                // targetIndex 조정
                let adjustedTargetIndex = dropTargetIndex;
                if (dropTargetPosition === 'bottom') {
                    // 아래쪽 border에 드롭하면 해당 Task 다음에 배치
                    adjustedTargetIndex = dropTargetIndex + 1;
                }
                // 위쪽 border에 드롭하면 해당 Task 앞에 배치 (이미 dropTargetIndex가 맞음)
                if (dropTargetIndex > draggedTaskOriginalIndex && dropTargetPosition === 'top') {
                    adjustedTargetIndex = dropTargetIndex - 1;
                }
                
                newOrder.splice(adjustedTargetIndex, 0, movedTask);
                    
                    // 순서 업데이트
                    const orderUpdate = newOrder.map((item, index) => ({
                        id: item.id,
                        order: index
                    }));
                    reorderTodos(orderUpdate);
                }
                
                // 상태 초기화
                draggedTaskOriginalIndex = -1;
                dropTargetIndex = -1;
                dropTargetPosition = null;
                draggedTaskShadowY = null;
                draggedTaskData = null;
            }
        }
    });
    
    // 스와이프 상태를 반응형으로 추적
    let swipeState = { 
        isSwiping: false, 
        swipingId: null, 
        currentDirection: null,
        swipeStartX: null, 
        swipeStartY: null,
        swipeCurrentX: null,
        swipeCurrentY: null,
        deltaX: 0,
        deltaY: 0
    };
    
    // 스와이프 상태 업데이트 함수
    function updateSwipeState() {
        swipeState = swipeHandler.getState();
    }
    
    $: isSwiping = swipeState.isSwiping;
    $: swipingId = swipeState.swipingId;
    $: currentDirection = swipeState.currentDirection;
    $: swipeStartX = swipeState.swipeStartX;
    $: swipeStartY = swipeState.swipeStartY;
    $: swipeCurrentX = swipeState.swipeCurrentX;
    $: swipeCurrentY = swipeState.swipeCurrentY;
    $: deltaX = swipeState.deltaX;
    $: deltaY = swipeState.deltaY;
    
    // 편의 변수
    $: isHorizontalSwiping = isSwiping && currentDirection === 'horizontal';
    $: isVerticalSwiping = isSwiping && currentDirection === 'vertical';
    
    // 전역 이벤트 리스너 (스와이프 중일 때만 활성화)
    onMount(() => {
        function handleGlobalMove(event) {
            const state = swipeHandler.getState();
            // swipingId가 있으면 스와이프가 시작된 것으로 간주
            if (state.swipingId) {
                swipeHandler.handleMove(event, state.swipingId);
                updateSwipeState();
            }
        }

        function handleGlobalEnd(event) {
            const state = swipeHandler.getState();
            // swipingId가 있으면 스와이프가 시작된 것으로 간주
            if (state.swipingId) {
                swipeHandler.handleEnd(event, state.swipingId);
                updateSwipeState();
            }
        }

        // 브라우저 기본 드래그 동작 차단
        function handleDragStart(event) {
            // 입력 필드가 아닌 경우에만 차단
            const target = event.target;
            if (target.tagName !== 'INPUT' && 
                target.tagName !== 'TEXTAREA' && 
                !target.isContentEditable) {
                event.preventDefault();
                return false;
            }
        }

        // 텍스트 선택 시작 차단 (입력 필드 제외)
        function handleSelectStart(event) {
            const target = event.target;
            if (target.tagName !== 'INPUT' && 
                target.tagName !== 'TEXTAREA' && 
                !target.isContentEditable) {
                event.preventDefault();
                return false;
            }
        }

        // 전역 이벤트 리스너 등록
        document.addEventListener('touchmove', handleGlobalMove, { passive: false });
        document.addEventListener('touchend', handleGlobalEnd);
        document.addEventListener('mousemove', handleGlobalMove);
        document.addEventListener('mouseup', handleGlobalEnd);
        document.addEventListener('dragstart', handleDragStart);
        document.addEventListener('selectstart', handleSelectStart);

        return () => {
            // 클린업
            document.removeEventListener('touchmove', handleGlobalMove);
            document.removeEventListener('touchend', handleGlobalEnd);
            document.removeEventListener('mousemove', handleGlobalMove);
            document.removeEventListener('mouseup', handleGlobalEnd);
            document.removeEventListener('dragstart', handleDragStart);
            document.removeEventListener('selectstart', handleSelectStart);
        };
    });
    
    // 완료된 할 일 섹션 접기/펴기 토글
    async function toggleCompletedSection() {
        completedSectionCollapsed = !completedSectionCollapsed;
        await setCompletedSectionCollapsed(completedSectionCollapsed);
    }
    
    // 사용자 정보
    let currentUser = null;
    
    // 컴포넌트 마운트 시 초기화
    onMount(async () => {
        // 완료된 할 일 섹션 설정 로드
        completedSectionCollapsed = await getCompletedSectionCollapsed();
        
        // 사용자 정보 가져오기
        const { data: { session } } = await supabase.auth.getSession();
        currentUser = session?.user ?? null;
        
        // 인증 상태 변경 감지 (로그아웃, 세션 만료 등)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            currentUser = session?.user ?? null;
            
            // 세션 만료 또는 로그아웃 감지
            if (event === 'SIGNED_OUT' || (event === 'TOKEN_REFRESHED' && !session)) {
                console.log('사용자가 로그아웃되었거나 세션이 만료되었습니다.');
            }
        });
        
        // 컴포넌트 언마운트 시 구독 해제
        return () => {
            subscription.unsubscribe();
        };
    });

    // 로그아웃 함수
    async function handleSignOut() {
        const { error } = await signOut();
        if (error) {
            console.error('로그아웃 실패:', error);
        }
        // 로그아웃 성공 시 onAuthStateChange가 자동으로 user를 null로 설정하고
        // +page.svelte에서 LoginScreen으로 전환됩니다
    }


    function handleAddTask(title) {
        addTodo(title);
    }

    function toggleTask(id) {
        // 현재 할 일의 완료 상태 확인
        const currentTodo = $todos.find(t => t.id === id);
        if (!currentTodo) return;

        const wasCompleted = currentTodo.isComplete;

        // todoStore의 completeTodo 함수 호출 (상태 토글)
        completeTodo(id);

        // 완료 상태로 변경된 경우에만 보상 팝업 표시 및 애니메이션
        if (!wasCompleted) {
            // 체크박스 애니메이션 트리거
            animatingCheckId = id;
            setTimeout(() => {
                animatingCheckId = null;
            }, 600); // 애니메이션 지속 시간

            // 파티클 효과
            triggerConfetti();

            // 화면 살짝 흔들림 효과
            triggerScreenShake();

            completedId = id;

            // 이전 타이머가 있으면 클리어
            if (rewardTimer) {
                clearTimeout(rewardTimer);
            }

            // 2.5초 후 보상 팝업 자동 닫기
            rewardTimer = setTimeout(() => {
                completedId = null;
                rewardTimer = null;
            }, 2500);

            // 부모 컴포넌트(App)에 알림 (보상 모드 진입용)
            dispatch('complete');
        } else {
            // 완료 해제 시 보상 팝업 제거
            completedId = null;
            if (rewardTimer) {
                clearTimeout(rewardTimer);
                rewardTimer = null;
            }
        }
    }

    function handleDeleteTask(id) {
        deleteTodo(id);
    }

    // 스와이프 제스처 처리 함수들 (유틸 함수 래퍼)
    // 공통 로직: 편집 모드 체크 후 swipeHandler 호출 및 상태 업데이트
    function handleSwipeStart(event, taskId, element) {
        if (editingId === taskId) return;
        swipeHandler.handleStart(event, taskId, element);
        updateSwipeState();
    }

    function handleSwipeMove(event, taskId) {
        if (editingId === taskId) return;
        swipeHandler.handleMove(event, taskId);
        updateSwipeState();
    }

    function handleSwipeEnd(event, taskId) {
        swipeHandler.handleEnd(event, taskId);
        updateSwipeState();
    }

    // 터치 이벤트 처리
    function handleTouchStart(event, taskId, element) {
        // 버튼/입력 등 인터랙션은 스와이프 제스처로 가로채지 않음 (모바일 클릭 불가 버그 방지)
        const target = event.target;
        const isInteractive =
            target?.closest?.('button, input, textarea, a, [role="button"], [contenteditable="true"]');
        if (isInteractive) return;

        handleSwipeStart(event, taskId, element);
    }

    function handleTouchMove(event, taskId) {
        handleSwipeMove(event, taskId);
    }

    function handleTouchEnd(event, taskId) {
        handleSwipeEnd(event, taskId);
    }

    // 마우스 이벤트 처리 (데스크톱 지원)
    function handleMouseDown(event, taskId, element) {
        handleSwipeStart(event, taskId, element);
    }

    function handleMouseMove(event, taskId) {
        handleSwipeMove(event, taskId);
    }

    function handleMouseUp(event, taskId) {
        handleSwipeEnd(event, taskId);
    }

    
    // 수직 스와이프 시각적 피드백만 처리 (순서 변경은 하지 않음)
    function handleVerticalSwipeVisualFeedback(taskId, currentY) {
        const state = swipeHandler.getState();
        if (state.swipingId !== taskId || state.currentDirection !== 'vertical') return;
        if (draggedTaskOriginalIndex === -1) return;
        
        let targetIndex = draggedTaskOriginalIndex;
        let targetPosition = null; // 'top' | 'bottom'
        
        // 모든 Task 요소의 위치 확인
        for (let i = 0; i < activeTodos.length; i++) {
            if (i === draggedTaskOriginalIndex) continue;
            
            // DOM에서 해당 Task의 요소 찾기 (data-task-id로 찾기)
            const task = activeTodos[i];
            const taskElement = document.querySelector(`.task-list ul li[data-task-id="${task.id}"]`);
            
            if (!taskElement) continue;
            
            const rect = taskElement.getBoundingClientRect();
            const taskCenterY = rect.top + rect.height / 2;
            const taskTopY = rect.top;
            const taskBottomY = rect.bottom;
            
            // 마우스가 Task 영역 내에 있는지 확인
            if (currentY >= taskTopY && currentY <= taskBottomY) {
                // Task의 중앙을 기준으로 위/아래 판단
                if (currentY < taskCenterY) {
                    // 위쪽에 있음 - 위쪽 border 강조
                    targetIndex = i;
                    targetPosition = 'top';
                } else {
                    // 아래쪽에 있음 - 아래쪽 border 강조
                    targetIndex = i;
                    targetPosition = 'bottom';
                }
                break;
            } else if (currentY < taskTopY && i < draggedTaskOriginalIndex) {
                // Task 위쪽 영역에 있고, 원래 인덱스보다 위에 있음
                targetIndex = i;
                targetPosition = 'top';
                break;
            } else if (currentY > taskBottomY && i > draggedTaskOriginalIndex) {
                // Task 아래쪽 영역에 있고, 원래 인덱스보다 아래에 있음
                targetIndex = i;
                targetPosition = 'bottom';
            }
        }
        
        // 드롭 위치 업데이트 (시각적 피드백만)
        dropTargetIndex = targetIndex;
        dropTargetPosition = targetPosition;
    }

    // 선택 상태 관리 함수들
    function isSelected(taskId) {
        return selectedIds.has(taskId);
    }

    // 반응형 선택 개수
    $: selectedCount = selectedIds.size;

    function clearSelection() {
        // 새로운 Set을 생성하여 반응성 트리거 (명시적 반응성 보장)
        selectedIds = new Set();
    }

    function deleteSelected() {
        // 선택된 모든 할 일 삭제
        selectedIds.forEach(id => {
            deleteTodo(id);
        });
        // 선택 해제
        clearSelection();
    }

    function startEdit(id, currentTitle) {
        editingId = id;
        editingTitle = currentTitle;
        // 다음 틱에서 입력 필드에 포커스
        setTimeout(() => {
            if (editInputElement) {
                editInputElement.focus();
                editInputElement.select();
            }
        }, 0);
    }

    function cancelEdit() {
        editingId = null;
        editingTitle = '';
    }

    function saveEdit(id) {
        if (editingTitle.trim()) {
            updateTodo(id, editingTitle.trim());
        }
        cancelEdit();
    }

    function handleEditKeydown(event, id) {
        if (event.key === 'Enter') {
            event.preventDefault();
            saveEdit(id);
        } else if (event.key === 'Escape') {
            event.preventDefault();
            cancelEdit();
        }
    }

    // 파티클 효과 트리거
    function triggerConfetti() {
        const duration = 2000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // 폭죽 효과
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });

            // 별 효과
            confetti({
                ...defaults,
                particleCount: particleCount * 0.5,
                origin: { x: randomInRange(0.4, 0.6), y: Math.random() - 0.2 },
                colors: ['#00f0ff', '#ff6b9d', '#ffd700', '#ffa500']
            });
        }, 250);
    }

    // 화면 살짝 흔들림 효과
    function triggerScreenShake() {
        const planningScreen = document.querySelector('.planning-screen');
        if (!planningScreen) return;

        planningScreen.style.animation = 'none';
        setTimeout(() => {
            planningScreen.style.animation = 'screen-shake 0.5s ease-in-out';
        }, 10);
    }

    // 컴포넌트 언마운트 시 타이머 정리
    onDestroy(() => {
        if (rewardTimer) {
            clearTimeout(rewardTimer);
        }
    });
</script>

<div class="planning-screen-wrapper">
<div class="planning-screen">
    <header>
        <h1>Planning Mode</h1>
        <div class="header-actions">
            {#if currentUser}
                <div class="user-info">
                    {#if currentUser.user_metadata?.avatar_url}
                        <img src={currentUser.user_metadata.avatar_url} alt="Profile" class="user-avatar" />
                    {:else}
                        <div class="user-avatar-placeholder">
                            {currentUser.email?.[0]?.toUpperCase() || 'U'}
                        </div>
                    {/if}
                    <span class="user-name">{currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'User'}</span>
                </div>
            {/if}
            <button class="logout-btn" on:click={handleSignOut} title="로그아웃">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
            </button>
        </div>
    </header>

    <div class="task-input-wrapper">
        <NewTaskInput addTask={handleAddTask} />
    </div>

    <div class="task-list">
        <h3>Today Tasks</h3>
        <ul style="position: relative;" bind:this={taskListElement}>
            {#each activeTodos as task, index (task.id)}
                <li 
                    data-task-id={task.id}
                    draggable="false"
                    class:completed={task.isComplete} 
                    class:focus={task.category === 'Focus'}
                    class:swiping={isSwiping && swipingId === task.id}
                    class:selected={isSelected(task.id)}
                    class:vertical-swiping={isVerticalSwiping && swipingId === task.id}
                    class:dragged-task={isVerticalSwiping && swipingId === task.id}
                    class:drop-target-top={isVerticalSwiping && swipingId !== task.id && dropTargetIndex === index && dropTargetPosition === 'top'}
                    class:drop-target-bottom={isVerticalSwiping && swipingId !== task.id && dropTargetIndex === index && dropTargetPosition === 'bottom'}
                    transition:fade={{ duration: 300 }}
                    on:touchstart={(e) => handleTouchStart(e, task.id, e.currentTarget)}
                    on:mousedown={(e) => handleMouseDown(e, task.id, e.currentTarget)}
                    on:dragstart|preventDefault
                    on:selectstart|preventDefault
                    class:swiping-horizontal={isSwiping && swipingId === task.id && currentDirection === 'horizontal'}
                    style={(() => {
                        if (isSwiping && swipingId === task.id) {
                            if (currentDirection === 'horizontal') {
                                // 수평 스와이프: 스와이프 거리에 상관 없이 최대 -10px로 제한
                                const limitedSwipeX = Math.max(deltaX, -10);
                                return `--swipe-x: ${limitedSwipeX}px;`;
                            }
                        }
                        return '';
                    })()}
                >
                    <span class="index">{(task.order ?? index) + 1}.</span>
                    <div class="content">
                        {#if editingId === task.id}
                            <div class="edit-container">
                                <input
                                    type="text"
                                    bind:value={editingTitle}
                                    bind:this={editInputElement}
                                    on:keydown={(e) => handleEditKeydown(e, task.id)}
                                    on:blur={() => saveEdit(task.id)}
                                    class="edit-input"
                                />
                                <button class="edit-cancel-btn" on:click={() => cancelEdit()} title="Cancel (ESC)">
                                    <CancelIcon width={16} height={16} />
                                </button>
                            </div>
                        {:else}
                            <span class="title" on:dblclick={() => startEdit(task.id, task.title)}>{task.title}</span>
                        {/if}
                    </div>
                    {#if task.category}

                        <span class="icon">
                        {#if getCategoryIcon(task.category) === 'target'}
                            <TargetIcon width={18} height={18} />
                        {:else if getCategoryIcon(task.category) === 'refresh'}
                            <RefreshIcon width={18} height={18} />
                        {:else if getCategoryIcon(task.category) === 'zap'}
                            <ZapIcon width={18} height={18} />
                        {:else}
                            {getCategoryIcon(task.category)}
                        {/if}
                        <span class="tag">{task.category}</span>
                    </span>
                    {/if}
                    <div class="action-buttons">
                        <button 
                            class="check-btn" 
                            class:animating={animatingCheckId === task.id}
                            on:click={() => toggleTask(task.id)}
                        >
                            {#if task.isComplete}
                                <div class="check-icon" class:animating={animatingCheckId === task.id}>✓</div>
                                {#if completedId === task.id}
                                    <div class="reward-pop" in:fly="{{ y: 20, duration: 600, easing: (t) => 1 - Math.pow(1 - t, 3) }}" out:fade={{ duration: 300 }}>
                                        <span>+{task.xp} XP</span>
                                        <span class="particles">✨</span>
                                    </div>
                                {/if}
                            {:else}
                                <div class="circle"></div>
                            {/if}
                        </button>
                    </div>
                </li>
            {/each}
        </ul>
        
        <!-- Shadow div (드래그 중일 때만 표시) -->
        {#if isVerticalSwiping && draggedTaskData && draggedTaskShadowY !== null && taskListElement}
            {@const task = draggedTaskData}
            {@const taskListRect = taskListElement.getBoundingClientRect()}
            {@const shadowY = draggedTaskShadowY - taskListRect.top}
            <li 
                class="task-shadow"
                style="position: absolute; top: {shadowY}px; left: 0; right: 0; pointer-events: none; z-index: 1001;"
            >
                <span class="index">{(task.order ?? 0) + 1}.</span>
                <span class="icon">
                    {#if getCategoryIcon(task.category) === 'target'}
                        <TargetIcon width={18} height={18} />
                    {:else if getCategoryIcon(task.category) === 'refresh'}
                        <RefreshIcon width={18} height={18} />
                    {:else if getCategoryIcon(task.category) === 'zap'}
                        <ZapIcon width={18} height={18} />
                    {:else}
                        {getCategoryIcon(task.category)}
                    {/if}
                </span>
                <div class="content">
                    <span class="title">{task.title}</span>
                </div>
                {#if task.category}
                    <span class="tag">{task.category}</span>
                {/if}
                <div class="action-buttons">
                    <button class="check-btn" disabled>
                        {#if task.isComplete}
                            <div class="check-icon">✓</div>
                        {:else}
                            <div class="circle"></div>
                        {/if}
                    </button>
                </div>
            </li>
        {/if}
    </div>
    
    <!-- 완료된 할 일 섹션 -->
    {#if completedTodos.length > 0}
        <div class="completed-section">
            <div class="completed-header" on:click={toggleCompletedSection} role="button" tabindex="0" on:keydown={(e) => e.key === 'Enter' && toggleCompletedSection()}>
                <h3>Completed Tasks ({completedTodos.length})</h3>
                <CollapseIcon width={20} height={20} collapsed={completedSectionCollapsed} />
            </div>
            {#if !completedSectionCollapsed}
                <ul 
                    class="completed-list" 
                    transition:slide={{ axis: 'y', duration: 300 }}
                >
                    {#each completedTodos as task, index (task.id)}
                        <li 
                            class:completed={task.isComplete} 
                            class:focus={task.category === 'Focus'}
                            class:completed-task={true}
                            transition:fade={{ duration: 300 }}
                        >
                            <span class="index">{(task.order ?? (activeTodos.length + index)) + 1}.</span>
                            <span class="icon">
                                {#if getCategoryIcon(task.category) === 'target'}
                                    <TargetIcon width={18} height={18} />
                                {:else if getCategoryIcon(task.category) === 'refresh'}
                                    <RefreshIcon width={18} height={18} />
                                {:else if getCategoryIcon(task.category) === 'zap'}
                                    <ZapIcon width={18} height={18} />
                                {:else}
                                    {getCategoryIcon(task.category)}
                                {/if}
                            </span>
                            <div class="content">
                                <span class="title">{task.title}</span>
                            </div>
                            {#if task.category}
                                <span class="tag">{task.category}</span>
                            {/if}
                            <div class="action-buttons">
                                <button class="check-btn" on:click={() => toggleTask(task.id)}>
                                    <div class="check-icon">✓</div>
                                </button>
                            </div>
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>
    {/if}
</div>

<!-- 선택 바 컴포넌트 -->
<SelectionBar 
    selectedCount={selectedCount} 
    onDelete={deleteSelected}
    onCancel={clearSelection}
/>
</div>