<script>
    import { fly, fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';

    export let reward; // { xp, title }
    const dispatch = createEventDispatcher();

    // 일정 시간 후 팝업 닫기
    let timer;
    $: if (reward) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            dispatch('close');
        }, 3000); // 3초 후 자동 닫기
    }
</script>

<div class="overlay"
     transition:fade={{ duration: 150 }}
     on:click={() => dispatch('close')}>

    <div class="reward-box"
         role="alert"
         in:fly={{ y: -50, duration: 300, easing: quintOut }}
         out:fly={{ y: 20, duration: 200 }}
         on:click|stopPropagation>

        <p class="congrats">TASK COMPLETE!</p>
        <h2 class="task-title">"{reward.title}"</h2>

        <div class="xp-display">
            <span class="xp-text">+ {reward.xp}</span>
            <span class="xp-label">XP Acquired</span>
        </div>

        <button on:click={() => dispatch('close')}>Close</button>
    </div>
</div>

<style>
    /* ----------------------------------------------------------------
     * 오버레이 및 중앙 정렬
     * ---------------------------------------------------------------- */
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7); /* 어두운 투명 배경 */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000; /* 최상단에 표시 */
    }

    /* ----------------------------------------------------------------
     * 보상 상자 스타일
     * ---------------------------------------------------------------- */
    .reward-box {
        background: var(--surface-color);
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        max-width: 90%;
        width: 350px;
        box-shadow: 0 0 30px var(--primary-color)50, 0 5px 15px rgba(0, 0, 0, 0.8);
        border: 2px solid var(--primary-color);
        animation: pulse 1s infinite alternate; /* 네온 펄스 효과 */
    }

    .congrats {
        color: var(--primary-color);
        font-size: 1.1em;
        font-weight: bold;
        margin-bottom: 5px;
        letter-spacing: 2px;
    }

    .task-title {
        color: var(--text-color);
        margin: 0 0 20px 0;
        font-size: 1.5em;
    }

    /* ----------------------------------------------------------------
     * XP 표시 스타일 및 애니메이션
     * ---------------------------------------------------------------- */
    .xp-display {
        background-color: var(--primary-color);
        padding: 15px 20px;
        border-radius: 10px;
        margin-bottom: 25px;
        display: inline-block;
        color: var(--bg-color); /* 어두운 배경색 */
        font-weight: 900;
        animation: pop-in 0.4s ease-out; /* 등장 애니메이션 */
    }

    .xp-text {
        display: block;
        font-size: 2.5em;
        line-height: 1;
    }
    .xp-label {
        display: block;
        font-size: 0.8em;
        margin-top: 5px;
        opacity: 0.8;
    }

    button {
        background-color: var(--primary-color);
        color: var(--bg-color);
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.2s;
    }
    button:hover {
        background-color: #00e5ff;
    }

    /* CSS Keyframes */
    @keyframes pulse {
        from {
            transform: scale(1);
            box-shadow: 0 0 20px var(--primary-color)50;
        }
        to {
            transform: scale(1.01);
            box-shadow: 0 0 35px var(--primary-color)80;
        }
    }
    @keyframes pop-in {
        from {
            transform: scale(0.5);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
</style>