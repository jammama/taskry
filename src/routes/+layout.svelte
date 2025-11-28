<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
    :root {
        /* 다크 테마 색상 변수 정의 */
        --bg-color: #0f1115; /* 가장 어두운 배경 */
        --card-bg: rgba(30, 34, 45, 0.6); /* 반투명 카드 배경 */
        --primary-cyan: #00f0ff;
        --accent-gold: #ffd700;
        --text-main: #ffffff;
        --text-muted: #8b9bb4;
        --glass-border: 1px solid rgba(255, 255, 255, 0.1);
    }

    /* body 태그에 배경색 적용 */
    body {
        margin: 0;
        padding: 0;
        font-family: 'Inter', sans-serif;
        background-color: var(--bg-color); /* 📌 이 부분이 배경색을 결정합니다! */
        color: var(--text-main);
        /* UI를 중앙에 배치하기 위한 flex 설정 (선택 사항) */
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

    /* 스크롤바 커스텀 */
    ::-webkit-scrollbar {
        width: 6px;
    }
    ::-webkit-scrollbar-thumb {
        background: var(--card-bg);
        border-radius: 3px;
    }
</style>