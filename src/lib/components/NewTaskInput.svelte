<script>
    export let addTask;
    let taskTitle = '';

    function handleSubmit() {
        if (taskTitle.trim()) {
            addTask(taskTitle.trim());
            taskTitle = '';
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit} class="input-container">
    <input type="text"
           bind:value={taskTitle}
           placeholder="Add a new task... (AI-powered)"
           class="real-input" />

    <button type="submit" class="add-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    </button>
</form>

<style>
    .input-container {
        display: flex;
        align-items: center;
        background: var(--card-bg);
        backdrop-filter: blur(8px);
        border: var(--glass-border);
        border-radius: 15px;
        padding: 10px 15px;
        margin-bottom: 20px;
        box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
        transition: box-shadow 0.3s;
    }

    .input-container:focus-within {
        border-color: var(--primary-cyan);
        box-shadow: 0 0 15px rgba(0, 240, 255, 0.4);
    }

    .real-input {
        flex: 1;
        background: transparent;
        border: none;
        color: var(--text-main);
        padding: 5px 0;
        font-size: 0.95rem;
        outline: none;
        /* 입력 필드에서는 텍스트 선택 허용 */
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
    }

    .real-input::placeholder {
        color: var(--text-muted);
        opacity: 0.8;
    }

    .add-btn {
        background: none;
        border: none;
        color: var(--primary-cyan, var(--text-sub));
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: color 0.2s, transform 0.2s;
    }

    .add-btn:hover {
        color: var(--primary-cyan, var(--text-main));
        transform: scale(1.1);
    }

    .add-btn:active {
        transform: scale(0.95);
    }
</style>