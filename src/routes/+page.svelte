<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import PlanningMode from "$lib/components/PlanningMode.svelte";
    import LoginScreen from "$lib/components/LoginScreen.svelte";
    import RewardMode from "$lib/components/RewardMode.svelte";
    import { supabase } from '$lib/supabaseClient';

    let showReward = false;
    let user = null;
    let loading = true;
    let error = null;

    // 모바일에서 "카드 UI를 통째로 확대"하기 위한 스케일 값
    const APP_W = 400;
    const APP_H = 800;
    let appContainerEl;

    // URL 파라미터에서 에러 확인
    $: {
        const errorParam = $page.url.searchParams.get('error');
        if (errorParam) {
            error = decodeURIComponent(errorParam);
        }
    }

    function updateAppScale() {
        if (!appContainerEl) return;

        // 데스크톱은 1배 (카드 프레임 유지)
        const isMobileLike =
            (typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches) ||
            (typeof window !== 'undefined' && window.matchMedia?.('(max-width: 768px)').matches);

        if (!isMobileLike) {
            appContainerEl.style.setProperty('--app-scale', '1');
            return;
        }

        const vv = window.visualViewport;
        const vw = vv?.width ?? window.innerWidth;
        const vh = vv?.height ?? window.innerHeight;

        // contain 방식으로 최대한 키움 (잘리지 않게)
        const scale = Math.min(vw / APP_W, vh / APP_H);
        appContainerEl.style.setProperty('--app-scale', String(scale));
    }

    // 인증 상태 확인
    onMount(async () => {
        // 스케일 계산/갱신 (모바일 주소창 변화 포함)
        updateAppScale();
        const onResize = () => updateAppScale();
        window.addEventListener('resize', onResize);
        window.visualViewport?.addEventListener('resize', onResize);

        // 현재 세션 확인
        const { data: { session } } = await supabase.auth.getSession();
        user = session?.user ?? null;

        // 인증 상태 변경 감지 (로그인/로그아웃 시 자동 업데이트)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            user = session?.user ?? null;
            loading = false;
            
            // 세션 만료 또는 로그아웃 처리
            if (event === 'SIGNED_OUT' || (event === 'TOKEN_REFRESHED' && !session)) {
                console.log('세션이 만료되었거나 로그아웃되었습니다.');
                // user는 이미 null로 설정됨
            } else if (event === 'SIGNED_IN') {
                console.log('로그인 성공:', session?.user?.email);
            }
        });

        loading = false;

        // 컴포넌트 언마운트 시 구독 해제
        return () => {
            subscription.unsubscribe();
            window.removeEventListener('resize', onResize);
            window.visualViewport?.removeEventListener('resize', onResize);
        };
    });

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

<main class="app-viewport">
    <div class="app-container" bind:this={appContainerEl}>
    {#if loading}
        <div class="loading-screen">
            <div class="spinner"></div>
        </div>
    {:else if user}
        <PlanningMode on:complete={handleTaskComplete} />
    {:else}
        <LoginScreen {error} />
    {/if}
<!--        <RewardMode on:close={closeReward} />-->
    </div>
</main>

<style>
    .app-viewport {
        width: 100vw;
        height: 100svh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    @supports (height: 100dvh) {
        .app-viewport {
            height: 100dvh;
        }
    }

    .app-container {
        position: relative;
        width: 400px; /* 디자인 기준 카드 크기 */
        height: 800px;
        background-color: var(--bg-color);
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        border: var(--glass-border);
        transform: scale(var(--app-scale, 1));
        transform-origin: center;
        /* transform이나 filter가 없어야 position: fixed가 viewport 기준으로 작동 */
    }

    /* JS가 --app-scale 값을 채워 넣고, 데스크톱은 1배 유지 */

    .loading-screen {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(0, 240, 255, 0.1);
        border-top-color: var(--primary-cyan);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>