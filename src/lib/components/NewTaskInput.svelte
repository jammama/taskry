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

    <button type="submit" class="search-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    </button>
</form>

<style>
    .input-container {
        display: flex;
        align-items: center;
        background-color: var(--surface-card);
        border: 1px solid var(--border-dim);
        border-radius: 12px;
        padding: 5px 15px;
        margin-bottom: 30px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    .input-container:focus-within {
        border-color: var(--accent-blue);
        box-shadow: 0 0 10px rgba(0, 240, 255, 0.1);
    }

    .real-input {
        flex: 1;
        background: transparent;
        border: none;
        color: white;
        padding: 12px 0;
        font-size: 0.95rem;
        outline: none;
    }

    .real-input::placeholder {
        color: #4a4a5a;
    }

    .search-btn {
        background: none;
        border: none;
        color: var(--text-sub);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .search-btn:hover {
        color: var(--text-main);
    }
</style>