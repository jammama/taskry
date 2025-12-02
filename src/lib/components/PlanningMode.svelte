<script>
    import { fly, fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import { onDestroy } from 'svelte';
    import NewTaskInput from '$lib/components/NewTaskInput.svelte';
    import { addTodo, completeTodo, deleteTodo, updateTodo, todos } from '$lib/stores/todoStore.js';

    let completedId = null;
    let rewardTimer = null;
    let editingId = null;
    let editingTitle = '';
    let editInputElement = null;
    const dispatch = createEventDispatcher();

    // 카테고리별 아이콘 매핑 함수
    function getCategoryIcon(category) {
        const iconMap = {
            'Focus': '🎯',
            'Rhythm': '🔄',
            'Catalyst': '⚡'
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
        <ul>
            {#each $todos as task, index (task.id)}
                <li 
                    class:completed={task.isComplete} 
                    class:focus={task.category === 'Focus'}
                    transition:fade={{ duration: 300 }}
                >
                    <span class="index">{index + 1}.</span>
                    <span class="icon">{getCategoryIcon(task.category)}</span>
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
                                <div class="edit-actions">
                                    <button class="edit-save-btn" on:click={() => saveEdit(task.id)} title="Save (Enter)">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </button>
                                    <button class="edit-cancel-btn" on:click={() => cancelEdit()} title="Cancel (ESC)">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        {:else}
                            <span class="title" on:dblclick={() => startEdit(task.id, task.title)}>{task.title}</span>
                            {#if task.category === 'Focus'}
                                <div class="tags">
                                    <span class="tag-focus">{task.category}</span>
                                    <span class="xp-badge">+{task.xp} XP</span>
                                </div>
                            {:else if task.category === 'Rhythm'}
                                <div class="tags">
                                    <span class="tag-rhythm">{task.category}</span>
                                    <span class="xp-badge">+{task.xp} XP</span>
                                </div>
                            {:else if task.category === 'Catalyst'}
                                <div class="tags">
                                    <span class="tag-catalyst">{task.category}</span>
                                    <span class="xp-badge">+{task.xp} XP</span>
                                </div>
                            {/if}
                        {/if}
                    </div>

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
                        <button class="delete-btn" on:click={() => handleDeleteTask(task.id)} title="Delete task">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>
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

    ul { list-style: none; padding: 0; }

    li {
        display: flex;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid rgba(255,255,255,0.08); /* 목록 구분선 */
        position: relative;
        transition: background 0.2s;
    }

    li:last-child { border-bottom: none; }

    .index { width: 25px; color: var(--text-muted); font-size: 0.9rem; }
    .icon { margin-right: 12px; }
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
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
    }

    .edit-input {
        flex: 1;
        background: rgba(0, 240, 255, 0.1);
        border: 1px solid var(--primary-cyan);
        border-radius: 6px;
        padding: 6px 10px;
        color: var(--text-main);
        font-size: 0.95rem;
        outline: none;
        box-shadow: 0 0 8px rgba(0, 240, 255, 0.3);
    }

    .edit-input:focus {
        box-shadow: 0 0 12px rgba(0, 240, 255, 0.5);
    }

    .edit-actions {
        display: flex;
        gap: 4px;
    }

    .edit-save-btn,
    .edit-cancel-btn {
        background: none;
        border: none;
        cursor: pointer;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: background 0.2s, transform 0.2s;
    }

    .edit-save-btn {
        color: var(--primary-cyan);
    }

    .edit-save-btn:hover {
        background: rgba(0, 240, 255, 0.2);
        transform: scale(1.1);
    }

    .edit-cancel-btn {
        color: var(--text-muted);
    }

    .edit-cancel-btn:hover {
        background: rgba(255, 107, 157, 0.2);
        color: #ff6b9d;
        transform: scale(1.1);
    }

    /* Tag 스타일 */
    .tags { font-size: 0.7rem; margin-top: 4px; display: flex; gap: 8px; align-items: center;}
    .tag-focus {
        color: var(--accent-gold);
        text-transform: uppercase;
        font-weight: bold;
        text-shadow: 0 0 3px rgba(255, 215, 0, 0.5); /* 골드 글로우 */
        background: rgba(255, 215, 0, 0.1);
        padding: 2px 6px;
        border-radius: 4px;
    }
    .tag-rhythm {
        color: var(--primary-cyan);
        text-transform: uppercase;
        font-weight: bold;
        text-shadow: 0 0 3px rgba(0, 240, 255, 0.5);
        background: rgba(0, 240, 255, 0.1);
        padding: 2px 6px;
        border-radius: 4px;
    }
    .tag-catalyst {
        color: #ff6b9d;
        text-transform: uppercase;
        font-weight: bold;
        text-shadow: 0 0 3px rgba(255, 107, 157, 0.5);
        background: rgba(255, 107, 157, 0.1);
        padding: 2px 6px;
        border-radius: 4px;
    }
    .xp-badge {
        color: var(--text-muted);
        font-size: 0.65rem;
        opacity: 0.8;
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

    /* 체크 버튼 */
    .check-btn {
        background: none; border: none; cursor: pointer; position: relative; width: 40px; height: 40px;
        display: flex; align-items: center; justify-content: center;
    }

    /* 삭제 버튼 */
    .delete-btn {
        background: none;
        border: none;
        cursor: pointer;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-muted);
        opacity: 0.6;
        transition: opacity 0.2s, color 0.2s, transform 0.2s;
        border-radius: 4px;
    }

    .delete-btn:hover {
        opacity: 1;
        color: #ff6b9d;
        background: rgba(255, 107, 157, 0.1);
        transform: scale(1.1);
    }

    .delete-btn:active {
        transform: scale(0.95);
    }

    .circle {
        width: 18px; height: 18px;
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
        font-size: 1.2rem; 
        color: var(--primary-cyan); 
        font-weight: bold;
        text-shadow: 0 0 10px var(--primary-cyan);
        width: 18px;
        height: 18px;
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