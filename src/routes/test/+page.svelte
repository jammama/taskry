<script>
    let activeTab = 'crossline'; // 'crossline', 'crush', 'vibrate'
    let activeSwipe = false;

    const testTasks = [
        { id: 1, title: '테스트 할 일 1', category: 'Focus' },
        { id: 2, title: '테스트 할 일 2', category: 'Rhythm' },
        { id: 3, title: '테스트 할 일 3', category: 'Catalyst' },
        { id: 4, title: '테스트 할 일 4', category: 'Focus' },
        { id: 5, title: '테스트 할 일 5', category: 'Rhythm' }
    ];

    function toggleSwipe() {
        activeSwipe = !activeSwipe;
    }
</script>

<div class="test-container">
    <header class="test-header">
        <h1>PlanningMode 효과 테스트</h1>
        <div class="tab-buttons">
            <button 
                class:active={activeTab === 'crossline'}
                on:click={() => activeTab = 'crossline'}
            >
                십자선 효과
            </button>
            <button 
                class:active={activeTab === 'crush'}
                on:click={() => activeTab = 'crush'}
            >
                구겨짐 효과
            </button>
            <button 
                class:active={activeTab === 'vibrate'}
                on:click={() => activeTab = 'vibrate'}
            >
                떨림 효과
            </button>
        </div>
        <button class="toggle-btn" on:click={toggleSwipe}>
            {activeSwipe ? '효과 해제' : '효과 적용'}
        </button>
    </header>

    <div class="test-content">
        <ul class="task-list">
            {#each testTasks as task (task.id)}
                <li 
                    class="task-item deleting"
                    class:active-swipe={activeSwipe}
                    class:effect-crossline={activeTab === 'crossline' && activeSwipe}
                    class:effect-crush={activeTab === 'crush' && activeSwipe}
                    class:effect-vibrate={activeTab === 'vibrate' && activeSwipe}
                >
                    <span class="task-text">{task.title}</span>
                    <span class="task-category">{task.category}</span>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>
    .test-container {
        padding: 20px;
        max-width: 400px;
        margin: 0 auto;
        background-color: var(--bg-color);
        min-height: 100vh;
    }

    .test-header {
        margin-bottom: 30px;
    }

    .test-header h1 {
        font-size: 1.5rem;
        color: var(--primary-cyan);
        margin-bottom: 20px;
        text-align: center;
    }

    .tab-buttons {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
        justify-content: center;
    }

    .tab-buttons button {
        padding: 8px 16px;
        border: 2px solid var(--primary-cyan);
        background: transparent;
        color: var(--primary-cyan);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
    }

    .tab-buttons button.active {
        background: var(--primary-cyan);
        color: var(--bg-color);
    }

    .tab-buttons button:hover {
        box-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
    }

    .toggle-btn {
        width: 100%;
        padding: 12px;
        border: 2px solid #ff6b9d;
        background: transparent;
        color: #ff6b9d;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.2s;
    }

    

    .toggle-btn:hover {
        background: rgba(255, 107, 157, 0.2);
        box-shadow: 0 0 15px rgba(255, 107, 157, 0.4);
    }

    .test-content {
        margin-top: 20px;
    }

    .task-list {
        list-style: none;
        padding: 0;
    }

    .task-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
        margin-bottom: 10px;
        background: var(--card-bg);
        border: var(--glass-border);
        border-radius: 10px;
        backdrop-filter: blur(8px);
    }

    .task-text {
        flex: 1;
        color: var(--text-main);
        font-size: 0.95rem;
    }

    .task-category {
        color: var(--text-muted);
        font-size: 0.8rem;
        padding: 4px 8px;
        background: rgba(0, 240, 255, 0.1);
        border-radius: 4px;
    }

    /* 십자선 효과 */
    .task-item.deleting .task-text {
        position: relative;
    }
.task-item.deleting .task-text {
    /* 배경색 변경 (선택 사항) */
    background-color: #2C1A1A; 
    
    /* 텍스트 그림자(레이어)를 더 크게 분리 */
    text-shadow: 
        2px 2px 0 #FF8855,       /* 주황색 레이어: 2px 이동 */
        -2px -2px 0 #FF3366,     /* 네온 레드 레이어: -2px 이동 */
        -1px 1px 0 #FFFFFF,      /* 흰색 기본 텍스트도 미세하게 이동 */
        0 0 10px #FF3366;        /* 네온 레드 광채를 더 강하게 */
        
    /* 텍스트 전체를 미세하게 흔들거나 왼쪽으로 이동 */
    transform: translateX(calc(var(--swipe-distance, -50px) * 0.1)); 
    opacity: 0.8; /* 약간 희미하게 */
}
    .task-item.deleting .task-text::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        height: 3px;
        background-color: #402020;
        width: 100%;
        transform: scaleX(0);
        transition: transform 0.3s ease-out;
        transform-origin: left center;
    }

    .task-item.deleting.active-swipe .task-text::after {
        transform: scaleX(1);
    }

    /* 구겨짐 효과 */
    .task-item.deleting {
        transition: transform 0.2s, opacity 0.2s, background-color 0.2s, scale 0.2s;
    }

    .task-item.deleting.active-swipe {
        opacity: 0.5;
        transform: translateX(-50px) scaleY(0.95);
        background-color: #f7b4b4;
    }

    /* 떨림 효과 */
    @keyframes vibrate-subtle {
        0% { transform: translateX(var(--swipe-distance, -50px)); }
        25% { transform: translateX(calc(var(--swipe-distance, -50px) - 1px)); }
        75% { transform: translateX(calc(var(--swipe-distance, -50px) + 1px)); }
        100% { transform: translateX(var(--swipe-distance, -50px)); }
    }

    /* 십자선 효과만 */
    .task-item.deleting.effect-crossline.active-swipe {
        opacity: 1;
        transform: translateX(-50px);
        background-color: var(--card-bg);
        animation: none;
    }

    .task-item.deleting.effect-crossline.active-swipe .task-text::after {
        transform: scaleX(1);
    }

    /* 구겨짐 효과만 */
    .task-item.deleting.effect-crush.active-swipe {
        opacity: 0.5;
        transform: translateX(-50px) scaleY(0.95);
        background-color: #f7b4b4;
        animation: none;
    }

    .task-item.deleting.effect-crush.active-swipe .task-text::after {
        transform: scaleX(0);
    }

    /* 떨림 효과만 */
    .task-item.deleting.effect-vibrate.active-swipe {
        --swipe-distance: -50px;
        animation: vibrate-subtle 0.1s linear infinite;
        opacity: 1;
        background-color: var(--card-bg);
    }

    .task-item.deleting.effect-vibrate.active-swipe .task-text::after {
        transform: scaleX(0);
    }
</style>
