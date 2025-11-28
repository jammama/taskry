<script>
    import { fly, fade } from 'svelte/transition';

    let tasks = [
        { id: 1, title: '2hr Strength Training', icon: '🏋️', completed: false },
        { id: 2, title: 'Project Pitch Deck - Draft', icon: '🖊️', focus: true, fire: 2, completed: false },
        { id: 3, title: 'Grocery Pitch Deck', icon: '🛒', completed: true }, // 예시로 완료된 상태
        { id: 4, title: 'Grocery Shopping (Weekly)', icon: '🛒', completed: false },
        { id: 5, title: '10min Meditation', icon: '🧘', completed: false },
        { id: 6, title: 'Call with Mentor', icon: '📞', completed: false },
    ];

    let completedId = null;
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function toggleTask(id) {
        completedId = id;
        // UI 업데이트
        tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);

        // 부모 컴포넌트(App)에 알림 (보상 모드 진입용)
        if (tasks.find(t => t.id === id).completed) {
            dispatch('complete');
        }
    }
</script>

<div class="planning-screen">
    <header>
        <h1>Planning Mode</h1>
        <button class="menu-btn">☰</button>
    </header>

    <div class="search-box">
        <input type="text" placeholder="Add a new task... (AI-powered)" />
        <span class="search-icon">🔍</span>
    </div>

    <div class="task-list">
        <h3>Today Tasks</h3>
        <ul>
            {#each tasks as task, index}
                <li class:completed={task.completed} class:focus={task.focus}>
                    <span class="index">{index + 1}.</span>
                    <span class="icon">{task.icon}</span>
                    <div class="content">
                        <span class="title">{task.title}</span>
                        {#if task.focus}
                            <div class="tags">
                                <span class="tag-focus">Focus</span>
                                {#each Array(task.fire) as _}🔥{/each}
                            </div>
                        {/if}
                    </div>

                    <button class="check-btn" on:click={() => toggleTask(task.id)}>
                        {#if task.completed && completedId === task.id}
                            <div class="reward-pop" in:fly="{{ y: 20, duration: 500 }}" out:fade>
                                <div class="check-icon">✓</div>
                                <span>+20 FLOW ENERGY</span>
                                <span class="particles">✨</span>
                            </div>
                        {:else}
                            <div class="circle"></div>
                        {/if}
                    </button>
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

    /* 검색 입력창 스타일 */
    .search-box {
        position: relative;
        padding: 10px 15px;
        margin-top: 20px;
        box-shadow: 0 0 10px rgba(0, 240, 255, 0.2); /* 입력창에 약한 글로우 */
    }

    .search-box input {
        width: 90%;
        background: transparent;
        border: none;
        padding: 5px 0;
        color: var(--text-main);
        font-size: 0.95rem;
    }
    .search-box input::placeholder { color: var(--text-muted); opacity: 0.8; }
    .search-box input:focus { outline: none; }

    .search-icon {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--primary-cyan);
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
    .title { font-size: 0.95rem; transition: color 0.3s; }

    /* Focus Tag 스타일 */
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

    /* 완료 상태 스타일 */
    li.completed .title {
        text-decoration: line-through;
        color: var(--text-muted);
        opacity: 0.6;
    }

    /* 체크 버튼 */
    .check-btn {
        background: none; border: none; cursor: pointer; position: relative; width: 40px; height: 40px;
        display: flex; align-items: center; justify-content: center;
    }

    .circle {
        width: 18px; height: 18px;
        border: 2px solid var(--text-muted);
        border-radius: 50%;
        transition: border-color 0.3s;
    }

    /* 보상 팝업 효과 (기존 코드 유지) */
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
        box-shadow: 0 0 15px var(--primary-cyan);
        z-index: 10;
        pointer-events: none;
        white-space: nowrap;
        font-size: 0.8rem;
    }

    .check-icon {
        font-size: 1.2rem; color: var(--primary-cyan); font-weight: bold;
        text-shadow: 0 0 10px var(--primary-cyan);
        margin-right: 5px;
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