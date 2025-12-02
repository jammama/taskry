<script>
    import { slide } from 'svelte/transition';

    export let selectedCount = 0;
    export let onDelete = () => {};
    export let onCancel = () => {};
</script>

{#if selectedCount > 0}
    <div class="selection-bar" transition:slide={{ axis: 'y', duration: 300 }}>
        <div class="selection-info">
            <span class="selection-count">{selectedCount}</span>
            <span class="selection-text">Tasks Selected</span>
        </div>
        <div class="selection-actions">
            <button class="delete-selected-btn" on:click={onDelete}>
                Delete
            </button>
            <button class="cancel-selection-btn" on:click={onCancel}>
                Cancel
            </button>
        </div>
    </div>
{/if}

<style>
    /* 선택 바 (하단 고정) */
    .selection-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        box-sizing: border-box;
        background: rgba(28, 28, 36, 0.98);
        backdrop-filter: blur(16px);
        border: 2px solid #ff6b9d;
        border-radius: 20px 20px 0 0;
        padding: 18px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 -4px 30px rgba(255, 107, 157, 0.5), 0 0 40px rgba(255, 107, 157, 0.4);
        z-index: 1000;
    }

    .selection-info {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--text-main);
        font-size: 0.9rem;
    }

    .selection-count {
        color: #ff6b9d;
        font-weight: bold;
        font-size: 1.1rem;
        text-shadow: 0 0 8px rgba(255, 107, 157, 0.8);
    }

    .selection-text {
        color: var(--text-muted);
    }

    .selection-actions {
        display: flex;
        gap: 12px;
    }

    .delete-selected-btn,
    .cancel-selection-btn {
        padding: 8px 16px;
        border: 2px solid;
        border-radius: 12px;
        background: transparent;
        font-weight: bold;
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.2s;
        letter-spacing: 0.5px;
    }

    .delete-selected-btn {
        color: #ff6b9d;
        border-color: #ff6b9d;
        box-shadow: 0 0 15px rgba(255, 107, 157, 0.4);
    }

    .delete-selected-btn:hover {
        background: rgba(255, 107, 157, 0.2);
        box-shadow: 0 0 20px rgba(255, 107, 157, 0.6);
        transform: scale(1.05);
    }

    .delete-selected-btn:active {
        transform: scale(0.95);
    }

    .cancel-selection-btn {
        color: var(--primary-cyan);
        border-color: var(--primary-cyan);
        box-shadow: 0 0 15px rgba(0, 240, 255, 0.4);
    }

    .cancel-selection-btn:hover {
        background: rgba(0, 240, 255, 0.2);
        box-shadow: 0 0 20px rgba(0, 240, 255, 0.6);
        transform: scale(1.05);
    }

    .cancel-selection-btn:active {
        transform: scale(0.95);
    }
</style>
