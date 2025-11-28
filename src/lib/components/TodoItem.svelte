<script>
    import { fly, scale } from 'svelte/transition';
    export let todo;
    export let completeTodo;
    export let showReward;

    function toggleComplete() {
        completeTodo(todo.id);
        if (!todo.isComplete) {
            showReward({ xp: todo.xp, title: todo.title });
        }
    }

    // 아이콘 결정 로직 (임시)
    function getIcon(category) {
        if(category === 'Rhythm') return '🛒';
        if(category === 'Focus') return '✏️';
        if(category === 'Catalyst') return '📞';
        return '📌';
    }
</script>

<div class="task-item" on:click={toggleComplete}>
    <div class="left-col">
        <span class="category-icon">{getIcon(todo.category)}</span>
    </div>

    <div class="center-col">
        <span class="task-text" class:done={todo.isComplete}>{todo.title}</span>
    </div>

    <div class="right-col">
        {#if todo.isComplete}
            <div class="check-circle done" transition:scale>✓</div>
        {:else}
            <div class="check-circle"></div>
        {/if}
    </div>

</div>

<style>
    .task-item {
        display: flex;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid rgba(255,255,255,0.05); /* 아주 흐릿한 구분선 */
        cursor: pointer;
        transition: background 0.2s;
    }

    .task-item:hover {
        background: rgba(255,255,255,0.02);
    }

    .left-col {
        width: 30px;
        display: flex;
        justify-content: center;
        color: var(--text-sub);
        font-size: 0.9rem;
    }

    .center-col {
        flex: 1;
        padding: 0 10px;
    }

    .task-text {
        font-size: 0.95rem;
        color: var(--text-main);
    }

    .task-text.done {
        color: var(--text-sub);
        text-decoration: line-through;
    }

    .right-col {
        width: 30px;
        display: flex;
        justify-content: center;
    }

    .check-circle {
        width: 18px;
        height: 18px;
        border: 2px solid var(--border-dim);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: transparent;
        transition: all 0.2s;
    }

    .check-circle.done {
        border-color: var(--accent-blue);
        background-color: var(--accent-blue);
        color: #000;
        box-shadow: 0 0 10px var(--accent-blue); /* 네온 글로우 */
    }
</style>