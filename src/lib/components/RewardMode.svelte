<script>
    import { fade, scale } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import CircularProgress from '$lib/assets/CircularProgress.svelte';

    const dispatch = createEventDispatcher();
</script>

<div class="reward-overlay" transition:fade>
    <div class="reward-container" in:scale={{start: 0.9, duration: 400}}>

        <header>
            <h2>Reward Mode</h2>
            <div class="currency-badge">⚙️ 5+</div>
            <button class="close-btn" on:click={() => dispatch('close')}>✕</button>
        </header>

        <div class="tab-indicator">New Rewards Awaiting</div>

        <div class="engine-display">
            <div class="engine-core-visual">
                <div class="core-glow"></div>
                <div class="core-rings"></div>
            </div>

            <div class="stats-row">
                <CircularProgress percentage={75} color="#00f0ff" />
                <CircularProgress percentage={60} color="#ffffff" />
                <CircularProgress percentage={40} color="#00f0ff" />
            </div>

            <div class="level-up-text">
                <h1>LEVEL UP!</h1>
                <p>ENGINE EFFICIENCY +10%</p>
            </div>
        </div>

        <div class="section-title">New Item Drops</div>
        <div class="item-grid">
            <div class="item-card">
                <div class="item-icon">🛒</div>
                <span>Time Shard x3</span>
            </div>
            <div class="item-card">
                <div class="item-icon">🧪</div>
                <span>Instant-Sort Module</span>
            </div>
        </div>

        <div class="social-hub">
            <div class="avatar">👩‍💼</div>
            <div class="msg">
                <strong>Alex</strong> sent you Cheer Up Energy!<br>
                <span style="font-size:0.7rem; opacity:0.7">Your Rhythm: 85%. Keep it up.</span>
            </div>
            <button class="arrow-btn">></button>
        </div>

    </div>
</div>

<style>
    .reward-overlay {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.85); backdrop-filter: blur(5px);
        z-index: 100;
        display: flex; justify-content: center; align-items: center;
    }

    .reward-container {
        width: 100%; height: 100%;
        background: linear-gradient(180deg, rgba(16,20,30,1) 0%, rgba(5,5,10,1) 100%);
        padding: 20px; box-sizing: border-box; display: flex; flex-direction: column;
    }

    header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;}
    h2 { font-size: 1.1rem; margin: 0; }
    .currency-badge { background: rgba(0, 240, 255, 0.2); padding: 5px 10px; border-radius: 8px; color: var(--primary-cyan); font-weight: bold; font-size: 0.9rem;}
    .close-btn { background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; }

    .tab-indicator {
        border-bottom: 2px solid var(--primary-cyan); display: inline-block; padding-bottom: 5px; font-size: 0.8rem; margin-bottom: 20px;
    }

    /* 엔진 비주얼 영역 */
    .engine-display {
        flex: 1;
        background: url('https://via.placeholder.com/300x300/000000/000000') no-repeat center; /* 배경 이미지 대신 CSS 효과 사용 */
        background-size: cover;
        position: relative;
        border: 1px solid rgba(0, 240, 255, 0.1);
        border-radius: 15px;
        padding: 20px;
        display: flex; flex-direction: column; align-items: center; justify-content: space-between;
        overflow: hidden;
    }

    /* CSS로 3D 코어 느낌 시뮬레이션 */
    .engine-core-visual {
        position: absolute; top: 50%; left: 50%; transform: translate(-50%, -60%);
        width: 200px; height: 200px; pointer-events: none;
    }
    .core-glow {
        position: absolute; width: 100%; height: 100%;
        background: radial-gradient(circle, rgba(0,240,255,0.4) 0%, transparent 70%);
        animation: pulse 2s infinite;
    }
    .core-rings {
        position: absolute; width: 140px; height: 140px; top: 30px; left: 30px;
        border: 2px solid rgba(0,240,255,0.3); border-radius: 50%;
        transform: rotateX(60deg);
        box-shadow: 0 0 10px var(--primary-cyan);
    }

    .stats-row { display: flex; gap: 20px; z-index: 2; margin-top: 20px; }

    .level-up-text { text-align: center; z-index: 2; margin-bottom: 20px; }
    .level-up-text h1 {
        color: var(--accent-gold); font-size: 1.8rem; margin: 0;
        text-shadow: 0 0 10px var(--accent-gold);
    }
    .level-up-text p { color: var(--accent-gold); margin: 5px 0 0; font-size: 0.9rem; opacity: 0.9; }

    /* 아이템 카드 */
    .section-title { font-size: 0.9rem; margin: 15px 0 10px; color: var(--text-muted); }
    .item-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
    .item-card {
        background: var(--card-bg); border-radius: 10px; padding: 15px;
        display: flex; flex-direction: column; align-items: center; gap: 10px;
        border: 1px solid rgba(255,255,255,0.05);
    }
    .item-icon { font-size: 1.5rem; color: var(--primary-cyan); filter: drop-shadow(0 0 5px var(--primary-cyan)); }
    .item-card span { font-size: 0.8rem; color: #ccc; }

    /* 소셜 허브 */
    .social-hub {
        background: var(--card-bg); border-radius: 12px; padding: 12px;
        display: flex; align-items: center; gap: 10px;
    }
    .avatar { width: 35px; height: 35px; background: #ddd; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;}
    .msg { flex: 1; font-size: 0.8rem; line-height: 1.3; }
    .arrow-btn { background: rgba(255,255,255,0.1); border: none; border-radius: 50%; width: 25px; height: 25px; color: white; cursor: pointer;}

    @keyframes pulse {
        0% { opacity: 0.5; transform: scale(0.9); }
        50% { opacity: 1; transform: scale(1.1); }
        100% { opacity: 0.5; transform: scale(0.9); }
    }
</style>