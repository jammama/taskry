<script>
    import PlanningMode from "$lib/components/PlanningMode.svelte";
    import RewardMode from "$lib/components/RewardMode.svelte";

    let showReward = false;

    // 할 일 완료 시 보상 화면 띄우기
    function handleTaskComplete() {
        setTimeout(() => {
            showReward = true;
        }, 800); // 체크 애니메이션 후 팝업
    }

    function closeReward() {
        showReward = false;
    }
</script>

<main class="app-container">
<!--    <PlanningMode on:complete={handleTaskComplete} />-->
        <RewardMode on:close={closeReward} />
</main>

<style>
    .app-container {
        position: relative;
        width: 100%;
        max-width: 400px; /* 모바일 사이즈 제한 */
        height: 800px;
        background-color: var(--bg-color);
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        border: var(--glass-border);
    }
</style>