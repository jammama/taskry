<script>
    import { fly, fade, slide } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import { onDestroy, onMount } from 'svelte';
    import { dndzone } from 'svelte-dnd-action';
    import NewTaskInput from '$lib/components/NewTaskInput.svelte';
    import SelectionBar from '$lib/components/SelectionBar.svelte';
    import { addTodo, completeTodo, deleteTodo, updateTodo, todos, getCompletedSectionCollapsed, setCompletedSectionCollapsed, reorderTodos } from '$lib/stores/todoStore.js';

    let completedId = null;
    let rewardTimer = null;
    let editingId = null;
    let editingTitle = '';
    let editInputElement = null;
    // 스와이프 제스처 상태 변수
    let swipeStartX = null;
    let swipeStartY = null;
    let swipeCurrentX = null;
    let swipeCurrentY = null;
    let isSwiping = false;
    let swipingId = null;
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
    
    // 드래그앤드롭을 위한 로컬 상태 (각 섹션별로 독립적)
    let activeTodosList = [];
    let completedTodosList = [];
    
    // 드래그 중인지 추적하는 플래그 (반응형 문이 드래그 중 로컬 리스트를 덮어쓰지 않도록)
    let isDraggingActive = false;
    let isDraggingCompleted = false;
    
    // activeTodos와 completedTodos가 변경될 때 로컬 리스트 업데이트
    // 단, 드래그 중이 아닐 때만 업데이트 (드래그 프리뷰 상태 보호)
    $: if (activeTodos.length >= 0 && !isDraggingActive) {
        activeTodosList = activeTodos;
    }
    $: if (completedTodos.length >= 0 && !isDraggingCompleted) {
        completedTodosList = completedTodos;
    }
    
    // 진행 중인 할 일 드래그앤드롭 핸들러
    function handleActiveConsider(e) {
        isDraggingActive = true;
        activeTodosList = e.detail.items;
    }
    
    function handleActiveFinalize(e) {
        isDraggingActive = false;
        if (e.detail.items !== activeTodosList) {
            activeTodosList = e.detail.items;
            // 순서 업데이트: activeTodos의 id만 전달
            const newOrder = activeTodosList.map((item, index) => ({
                id: item.id,
                order: index
            }));
            reorderTodos(newOrder);
        }
        // 스토어 업데이트 후 로컬 리스트 동기화를 위해 플래그 해제
        // 반응형 문이 다음 업데이트에서 동기화할 수 있도록
    }
    
    // 완료된 할 일 드래그앤드롭 핸들러
    function handleCompletedConsider(e) {
        isDraggingCompleted = true;
        completedTodosList = e.detail.items;
    }
    
    function handleCompletedFinalize(e) {
        isDraggingCompleted = false;
        if (e.detail.items !== completedTodosList) {
            completedTodosList = e.detail.items;
            // 순서 업데이트: completedTodos의 id만 전달
            // 완료된 할 일은 activeTodos 다음 순서로 시작
            const activeCount = activeTodos.length;
            const newOrder = completedTodosList.map((item, index) => ({
                id: item.id,
                order: activeCount + index
            }));
            reorderTodos(newOrder);
        }
        // 스토어 업데이트 후 로컬 리스트 동기화를 위해 플래그 해제
        // 반응형 문이 다음 업데이트에서 동기화할 수 있도록
    }
    
    // 완료된 할 일 섹션 접기/펴기 토글
    async function toggleCompletedSection() {
        completedSectionCollapsed = !completedSectionCollapsed;
        await setCompletedSectionCollapsed(completedSectionCollapsed);
    }
    
    // 컴포넌트 마운트 시 저장된 설정 로드
    onMount(async () => {
        completedSectionCollapsed = await getCompletedSectionCollapsed();
    });

    // 카테고리별 아이콘 매핑 함수
    function getCategoryIcon(category) {
        const iconMap = {
            'Focus': 'target', // SVG 아이콘으로 대체
            'Rhythm': 'refresh', // SVG 아이콘으로 대체
            'Catalyst': 'zap' // SVG 아이콘으로 대체
        };
        return iconMap[category] || '📝';
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

        // 완료 상태로 변경된 경우에만 보상 팝업 표시
        if (!wasCompleted) {
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

    // 스와이프 제스처 처리 함수들
    function handleTouchStart(event, taskId) {
        // 편집 모드 중일 때는 스와이프 비활성화
        if (editingId === taskId) return;
        
        const touch = event.touches?.[0] || event;
        swipeStartX = touch.clientX;
        swipeStartY = touch.clientY;
        swipeCurrentX = swipeStartX;
        swipeCurrentY = swipeStartY;
        isSwiping = false;
        swipingId = taskId;
    }

    function handleTouchMove(event, taskId) {
        // 편집 모드이거나 다른 항목을 스와이프 중이면 무시
        if (swipingId !== taskId || editingId === taskId) return;
        
        const touch = event.touches?.[0] || event;
        swipeCurrentX = touch.clientX;
        swipeCurrentY = touch.clientY;
        
        const deltaX = swipeCurrentX - swipeStartX;
        const deltaY = Math.abs(swipeCurrentY - swipeStartY);
        
        // 수평 스와이프가 수직 스와이프보다 큰 경우 (수평 스와이프 감지)
        if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > deltaY) {
            isSwiping = true;
            event.preventDefault(); // 스크롤 방지
        }
    }

    function handleTouchEnd(event, taskId) {
        // 다른 항목을 스와이프 중이면 무시
        if (swipingId !== taskId) return;
        
        // 스와이프 방향에 따라 선택/해제 처리
        const deltaX = swipeCurrentX - swipeStartX;
        const threshold = 30; // 스와이프 임계값
        
        if (isSwiping) {
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
        }
        
        // 스와이프 상태 초기화
        swipeStartX = null;
        swipeStartY = null;
        swipeCurrentX = null;
        swipeCurrentY = null;
        isSwiping = false;
        swipingId = null;
    }

    // 마우스 이벤트 처리 (데스크톱 지원)
    function handleMouseDown(event, taskId) {
        if (editingId === taskId) return;
        handleTouchStart(event, taskId);
    }

    function handleMouseMove(event, taskId) {
        if (swipingId === taskId && swipeStartX !== null) {
            handleTouchMove(event, taskId);
        }
    }

    function handleMouseUp(event, taskId) {
        if (swipingId === taskId) {
            handleTouchEnd(event, taskId);
        }
    }

    function handleMouseLeave(event, taskId) {
        // 마우스가 항목 밖으로 나갈 때 스와이프의 임계수치를 넘은 것으로 판단하여 선택/해제 처리
        if (swipingId === taskId && swipeStartX !== null) {
            const deltaX = swipeCurrentX - swipeStartX;
            const threshold = 30; // 스와이프 임계값
            
            if (Math.abs(deltaX) > 10) { // 수평 이동이 있는 경우
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
            }
            
            // 스와이프 상태 초기화
            swipeStartX = null;
            swipeStartY = null;
            swipeCurrentX = null;
            swipeCurrentY = null;
            isSwiping = false;
            swipingId = null;
        }
    }

    // 선택 상태 관리 함수들
    function isSelected(taskId) {
        return selectedIds.has(taskId);
    }

    // 반응형 선택 개수
    $: selectedCount = selectedIds.size;

    function clearSelection() {
        selectedIds.clear();
        selectedIds = selectedIds; // Svelte 반응성 트리거
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
        <button class="menu-btn">☰</button>
    </header>

    <div class="task-input-wrapper">
        <NewTaskInput addTask={handleAddTask} />
    </div>

    <div class="task-list">
        <h3>Today Tasks</h3>
        <ul 
            use:dndzone={{ 
                items: activeTodosList,
                flipDurationMs: 200,
                dragDisabled: false,
                morphDisabled: false,
                dragTransitionOptions: { duration: 200, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
            }}
            on:consider={handleActiveConsider}
            on:finalize={handleActiveFinalize}
        >
            {#each activeTodosList as task, index (task.id)}
                <li 
                    class:completed={task.isComplete} 
                    class:focus={task.category === 'Focus'}
                    class:swiping={isSwiping && swipingId === task.id}
                    class:selected={isSelected(task.id)}
                    class:clipped={isSwiping && swipingId === task.id && swipeCurrentX - swipeStartX < 0 || isSelected(task.id)}
                    transition:fade={{ duration: 300 }}
                    on:touchstart={(e) => handleTouchStart(e, task.id)}
                    on:touchmove={(e) => handleTouchMove(e, task.id)}
                    on:touchend={(e) => handleTouchEnd(e, task.id)}
                    on:mousedown={(e) => handleMouseDown(e, task.id)}
                    on:mousemove={(e) => handleMouseMove(e, task.id)}
                    on:mouseup={(e) => handleMouseUp(e, task.id)}
                    on:mouseleave={(e) => handleMouseLeave(e, task.id)}
                    style={(() => {
                        if (isSwiping && swipingId === task.id) {
                            // 스와이프 중인 항목의 실시간 위치 업데이트 및 잘려나간 효과
                            const swipeX = swipeCurrentX - swipeStartX;
                            const swipeAmount = Math.abs(swipeX);
                            
                            // 왼쪽으로 스와이프한 경우 clip-path 적용
                            if (swipeX < 0) {
                                const clipLeft = Math.min(swipeAmount, 100); // 최대 100px까지
                                return `transform: translateX(${swipeX}px); clip-path: inset(0 0 0 ${clipLeft}px);`;
                            } else {
                                return `transform: translateX(${swipeX}px);`;
                            }
                        } else if (isSelected(task.id)) {
                            // 선택된 할 일: -40px만큼 왼쪽 부분이 짧아지는 효과 (영역 밖으로 나가 잘린 느낌)
                            return `transform: translateX(-40px); clip-path: inset(0 0 0 40px);`;
                        }
                        return '';
                    })()}
                >
                    <span class="index">{(task.order ?? index) + 1}.</span>
                    <span class="icon">
                        {#if getCategoryIcon(task.category) === 'target'}
                            <!-- 타겟 아이콘 SVG - design.png 스타일 -->
                            <svg 
                                width="18" 
                                height="18" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="1.5" 
                                stroke-linecap="round" 
                                stroke-linejoin="round"
                                class="category-icon"
                            >
                                <!-- 외부 원 -->
                                <circle cx="12" cy="12" r="9" />
                                <!-- 내부 원 -->
                                <circle cx="12" cy="12" r="5" />
                                <!-- 중심 점 -->
                                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                            </svg>
                        {:else if getCategoryIcon(task.category) === 'refresh'}
                            <!-- 리프레시 아이콘 SVG - design.png 스타일 -->
                            <svg 
                                width="18" 
                                height="18" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="1.5" 
                                stroke-linecap="round" 
                                stroke-linejoin="round"
                                class="category-icon"
                            >
                                <!-- 회전 화살표 -->
                                <polyline points="23 4 23 10 17 10"></polyline>
                                <polyline points="1 20 1 14 7 14"></polyline>
                                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                            </svg>
                        {:else if getCategoryIcon(task.category) === 'zap'}
                            <!-- 번개 아이콘 SVG - design.png 스타일 -->
                            <svg 
                                width="18" 
                                height="18" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="1.5" 
                                stroke-linecap="round" 
                                stroke-linejoin="round"
                                class="category-icon"
                            >
                                <!-- 번개 모양 -->
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                            </svg>
                        {:else}
                            {getCategoryIcon(task.category)}
                        {/if}
                    </span>
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
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                        {:else}
                            <span class="title" on:dblclick={() => startEdit(task.id, task.title)}>{task.title}</span>
                        {/if}
                    </div>
                    {#if task.category}
                        <span class="tag">{task.category}</span>
                    {/if}
                    <div class="action-buttons">
                        <button class="check-btn" on:click={() => toggleTask(task.id)}>
                            {#if task.isComplete}
                                <div class="check-icon">✓</div>
                                {#if completedId === task.id}
                                    <div class="reward-pop" in:fly="{{ y: 20, duration: 500 }}" out:fade>
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
    </div>
    
    <!-- 완료된 할 일 섹션 -->
    {#if completedTodos.length > 0}
        <div class="completed-section">
            <div class="completed-header" on:click={toggleCompletedSection} role="button" tabindex="0" on:keydown={(e) => e.key === 'Enter' && toggleCompletedSection()}>
                <h3>Completed Tasks ({completedTodos.length})</h3>
                <svg 
                    class="collapse-icon" 
                    class:collapsed={completedSectionCollapsed}
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                >
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
            {#if !completedSectionCollapsed}
                <ul 
                    class="completed-list" 
                    transition:slide={{ axis: 'y', duration: 300 }}
                    use:dndzone={{ 
                        items: completedTodosList,
                        flipDurationMs: 200,
                        dragDisabled: false,
                        morphDisabled: false,
                        dragTransitionOptions: { duration: 200, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
                    }}
                    on:consider={handleCompletedConsider}
                    on:finalize={handleCompletedFinalize}
                >
                    {#each completedTodosList as task, index (task.id)}
                        <li 
                            class:completed={task.isComplete} 
                            class:focus={task.category === 'Focus'}
                            transition:fade={{ duration: 300 }}
                            style="cursor: default;"
                        >
                            <span class="index">{(task.order ?? (activeTodos.length + index)) + 1}.</span>
                            <span class="icon">
                                {#if getCategoryIcon(task.category) === 'target'}
                                    <svg 
                                        width="18" 
                                        height="18" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        stroke-width="1.5" 
                                        stroke-linecap="round" 
                                        stroke-linejoin="round"
                                        class="category-icon"
                                    >
                                        <circle cx="12" cy="12" r="9" />
                                        <circle cx="12" cy="12" r="5" />
                                        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                                    </svg>
                                {:else if getCategoryIcon(task.category) === 'refresh'}
                                    <svg 
                                        width="18" 
                                        height="18" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        stroke-width="1.5" 
                                        stroke-linecap="round" 
                                        stroke-linejoin="round"
                                        class="category-icon"
                                    >
                                        <polyline points="23 4 23 10 17 10"></polyline>
                                        <polyline points="1 20 1 14 7 14"></polyline>
                                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                                    </svg>
                                {:else if getCategoryIcon(task.category) === 'zap'}
                                    <svg 
                                        width="18" 
                                        height="18" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        stroke-width="1.5" 
                                        stroke-linecap="round" 
                                        stroke-linejoin="round"
                                        class="category-icon"
                                    >
                                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                                    </svg>
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

<style>
    .planning-screen-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .planning-screen {
        padding: 20px;
        height: 100%;
        box-sizing: border-box;
        /* Planning Mode 자체는 배경이 아닌 투명한 카드가 주를 이루게 합니다. */
    }

    /* 헤더와 입력창 컨테이너 */
    .planning-screen > header, .search-box, .task-list {
        background: var(--card-bg); /* app.css의 반투명 배경 변수 사용 */
        backdrop-filter: blur(8px); /* 글래스모피즘 핵심: 블러 효과 */
        border: var(--glass-border); /* 얇고 밝은 테두리 */
        border-radius: 15px;
        padding: 15px 20px;
        margin-bottom: 20px;
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 15px; /* 헤더와 검색창 분리 */
        margin-bottom: 0;
        background: none; /* 헤더는 독립된 스타일을 위해 배경 제거 */
        border: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    h1 { font-size: 1.2rem; font-weight: 600; margin: 0; }
    .menu-btn {
        background: none;
        border: none;
        color: var(--primary-cyan);
        font-size: 1.5rem;
        cursor: pointer;
        text-shadow: 0 0 5px var(--primary-cyan); /* 네온 효과 */
    }

    /* 할 일 입력창 래퍼 */
    .task-input-wrapper {
        margin-top: 20px;
    }

    /* 할 일 목록 제목 */
    h3 {
        font-size: 0.85rem;
        color: var(--primary-cyan); /* 제목을 네온 색상으로 강조 */
        margin: 0 0 15px 0;
        text-transform: uppercase;
        letter-spacing: 1px;
        text-shadow: 0 0 5px rgba(0, 240, 255, 0.3);
    }
    
    /* 완료된 할 일 섹션 */
    .completed-section {
        margin-top: 20px;
        background: var(--card-bg);
        backdrop-filter: blur(8px);
        border: var(--glass-border);
        border-radius: 15px;
        padding: 15px 20px;
        box-sizing: border-box;
    }
    
    .completed-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        user-select: none;
        padding: 5px 0;
        transition: opacity 0.2s;
    }
    
    .completed-header:hover {
        opacity: 0.8;
    }
    
    .completed-header h3 {
        margin: 0;
        font-size: 0.85rem;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .collapse-icon {
        color: var(--text-muted);
        transition: transform 0.3s ease;
        flex-shrink: 0;
    }
    
    .collapse-icon.collapsed {
        transform: rotate(-90deg);
    }
    
    .completed-list {
        list-style: none;
        padding: 0;
        margin-top: 15px;
    }
    
    .completed-list li {
        display: flex;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid rgba(255,255,255,0.08);
        position: relative;
        transition: background 0.2s;
    }
    
    .completed-list li:last-child {
        border-bottom: none;
    }

    ul { list-style: none; padding: 0; }

    li {
        display: flex;
        align-items: center;
        padding: 8px 0; /* 높이 줄이기: 12px → 8px */
        border-bottom: 1px solid rgba(255,255,255,0.08); /* 목록 구분선 */
        position: relative;
        transition: background 0.2s;
        cursor: grab;
        user-select: none;
        touch-action: pan-y; /* 수직 스크롤은 허용, 수평 스와이프는 커스텀 처리 */
    }

    li:active {
        cursor: grabbing;
    }

    li.swiping {
        transition: transform 0.1s ease-out; /* 스와이프 중 부드러운 전환 */
    }
    
    /* 드래그앤드롭 시각적 피드백 */
    li.svelte-dnd-draggable {
        cursor: grab;
    }
    
    li.svelte-dnd-draggable:active {
        cursor: grabbing;
    }
    
    li.svelte-dnd-drag-over {
        opacity: 0.5;
        transform: scale(1.02);
        background: rgba(0, 240, 255, 0.1);
        border-top: 2px solid var(--primary-cyan);
    }
    
    li.svelte-dnd-dragged {
        opacity: 0.6;
        transform: scale(0.95);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 240, 255, 0.5);
        z-index: 1000;
    }

    /* 선택된 할 일의 시각적 효과 - 영역 밖으로 나가 잘린 느낌 */
    li.selected {
        overflow: hidden; /* 왼쪽 부분이 잘리도록 */
        opacity: 0.85;
        background: rgba(255, 107, 157, 0.1);
        border-right: 3px solid #ff6b9d;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s, background 0.3s, clip-path 0.3s;
        /* transform과 clip-path는 style 속성에서 처리 */
    }
    
    /* 잘려나간 왼쪽 부분에 네온 글로우 효과 */
    li.clipped {
        position: relative;
    }
    
    li.clipped::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background: linear-gradient(to right, 
            rgba(255, 107, 157, 0) 0%,
            rgba(255, 107, 157, 1) 50%,
            rgba(255, 107, 157, 0) 100%
        );
        /* 효과 범위를 크게 늘려서 잘린 부분 밖에서도 보이도록 */
        box-shadow: 
            0 0 20px rgba(255, 107, 157, 1),
            0 0 40px rgba(255, 107, 157, 0.9),
            0 0 60px rgba(255, 107, 157, 0.7),
            0 0 80px rgba(255, 107, 157, 0.5),
            -10px 0 30px rgba(255, 107, 157, 0.6),
            -20px 0 50px rgba(255, 107, 157, 0.4),
            -30px 0 70px rgba(255, 107, 157, 0.3);
        z-index: 1;
        pointer-events: none;
        animation: glow-pulse 2s ease-in-out infinite;
    }
    
    /* 네온 글로우 펄스 애니메이션 */
    @keyframes glow-pulse {
        0%, 100% {
            opacity: 0.9;
            box-shadow: 
                0 0 20px rgba(255, 107, 157, 1),
                0 0 40px rgba(255, 107, 157, 0.9),
                0 0 60px rgba(255, 107, 157, 0.7),
                0 0 80px rgba(255, 107, 157, 0.5),
                -10px 0 30px rgba(255, 107, 157, 0.6),
                -20px 0 50px rgba(255, 107, 157, 0.4),
                -30px 0 70px rgba(255, 107, 157, 0.3);
        }
        50% {
            opacity: 1;
            box-shadow: 
                0 0 30px rgba(255, 107, 157, 1),
                0 0 60px rgba(255, 107, 157, 1),
                0 0 90px rgba(255, 107, 157, 0.8),
                0 0 120px rgba(255, 107, 157, 0.6),
                -15px 0 50px rgba(255, 107, 157, 0.8),
                -30px 0 80px rgba(255, 107, 157, 0.6),
                -45px 0 110px rgba(255, 107, 157, 0.4);
        }
    }

    li:last-child { border-bottom: none; }

    .index { width: 25px; color: var(--text-muted); font-size: 0.9rem; }
    .icon { 
        margin-right: 8px; 
        display: inline-flex;
        align-items: center;
        justify-content: center;
    } /* 아이콘과 숫자 간격 줄이기: 12px → 8px */
    
    /* 카테고리 아이콘 스타일 - design.png와 동일한 모노크롬 스타일 */
    .category-icon {
        color: var(--text-main);
        width: 18px;
        height: 18px;
        opacity: 0.9;
    }
    .content { flex: 1; display: flex; flex-direction: column; }
    .title { 
        font-size: 0.95rem; 
        transition: color 0.3s;
        cursor: text;
        user-select: none;
    }

    .title:hover {
        color: var(--primary-cyan);
    }

    /* 편집 모드 스타일 */
    .edit-container {
        position: relative;
        width: 100%;
    }

    .edit-input {
        width: 100%;
        background: rgba(0, 240, 255, 0.1);
        border: 1px solid var(--primary-cyan);
        border-radius: 6px;
        padding: 6px 32px 6px 10px; /* 오른쪽 패딩 추가하여 취소 버튼 공간 확보 */
        color: var(--text-main);
        font-size: 0.95rem;
        outline: none;
        box-shadow: 0 0 8px rgba(0, 240, 255, 0.3);
        box-sizing: border-box;
    }

    .edit-input:focus {
        box-shadow: 0 0 12px rgba(0, 240, 255, 0.5);
    }

    .edit-cancel-btn {
        position: absolute;
        top: 50%;
        right: 6px;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: background 0.2s, transform 0.2s, opacity 0.2s;
        color: var(--text-muted);
        opacity: 0.7;
        z-index: 10;
    }

    .edit-cancel-btn:hover {
        background: rgba(255, 107, 157, 0.2);
        color: #ff6b9d;
        opacity: 1;
        transform: translateY(-50%) scale(1.1);
    }

    .edit-cancel-btn:active {
        transform: translateY(-50%) scale(0.95);
    }

    /* Tag 스타일 - 배경 없음, 미묘한 회색 톤, 제목 오른쪽 배치 */
    .tag {
        color: var(--text-muted);
        font-size: 0.7rem;
        text-transform: uppercase;
        font-weight: normal;
        opacity: 0.7;
        margin-right: 8px; /* 태그와 완료 버튼 사이 간격 */
        /* 배경 색상 완전 제거 */
    }

    /* 완료 상태 스타일 */
    li.completed .title {
        text-decoration: line-through;
        color: var(--text-muted);
        opacity: 0.6;
    }

    /* 액션 버튼 컨테이너 */
    .action-buttons {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    /* 체크 버튼 - 크기 줄이기 */
    .check-btn {
        background: none; border: none; cursor: pointer; position: relative; width: 32px; height: 32px; /* 40px → 32px */
        display: flex; align-items: center; justify-content: center;
    }

    @keyframes pulse-glow {
        0%, 100% {
            opacity: 0.8;
            transform: scale(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.1);
        }
    }

    /* 체크 아이콘과 원형 아이콘 크기 조정 */
    .circle {
        width: 16px; height: 16px; /* 18px → 16px */
        border: 2px solid var(--text-muted);
        border-radius: 50%;
        transition: border-color 0.3s;
    }

    /* 보상 팝업 효과 (별도 레이어로 표시) */
    .reward-pop {
        position: absolute;
        right: 10px;
        top: -30px; /* 위치 조정 */
        background: rgba(0, 10, 20, 0.95);
        border: 1px solid var(--primary-cyan);
        padding: 8px 15px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 0 15px var(--primary-cyan);
        z-index: 10;
        pointer-events: none;
        white-space: nowrap;
        font-size: 0.8rem;
    }

    .check-icon {
        font-size: 1rem; /* 1.2rem → 1rem */
        color: var(--primary-cyan); 
        font-weight: bold;
        text-shadow: 0 0 10px var(--primary-cyan);
        width: 16px; /* 18px → 16px */
        height: 16px; /* 18px → 16px */
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .reward-pop span { color: white; margin-top: 0; font-weight: bold; }
    .particles {
        position: absolute;
        font-size: 1rem;
        opacity: 0.8;
        right: 5px;
        animation: float 1s infinite alternate;
    }

    @keyframes float {
        from { transform: translateY(0px); }
        to { transform: translateY(-5px); }
    }
</style>