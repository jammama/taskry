<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { supabase } from '$lib/supabaseClient';

    let processing = true;
    let error = null;

    onMount(async () => {
        try {
            // URL 파라미터 전체 확인 (디버깅용)
            console.log('OAuth 콜백 URL:', $page.url.href);
            console.log('URL 파라미터:', Object.fromEntries($page.url.searchParams.entries()));

            // URL에서 code 또는 access_token 확인
            // Supabase OAuth는 URL 파라미터 또는 해시(#)에 토큰을 포함할 수 있음
            const code = $page.url.searchParams.get('code');
            console.log('code:', code);
            let accessToken = $page.url.searchParams.get('access_token');
            const errorParam = $page.url.searchParams.get('error');
            const errorDescription = $page.url.searchParams.get('error_description');

            // 해시(#)에 토큰이 있는 경우 (일부 OAuth 플로우)
            if (!accessToken && $page.url.hash) {
                const hashParams = new URLSearchParams($page.url.hash.substring(1));
                accessToken = hashParams.get('access_token') || accessToken;
            }

            // 에러 파라미터가 있는 경우
            if (errorParam) {
                error = errorDescription || errorParam;
                processing = false;
                console.error('OAuth 에러:', error);
                // 에러 메시지와 함께 메인 페이지로 리다이렉트
                setTimeout(() => {
                    goto(`/?error=${encodeURIComponent(error)}`);
                }, 2000);
                return;
            }

            // code가 있는 경우 세션으로 교환
            if (code) {
                console.log('Code를 세션으로 교환 중...');
                const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
                
                if (exchangeError) {
                    console.error('OAuth 콜백 처리 오류:', exchangeError);
                    error = exchangeError.message;
                    processing = false;
                    setTimeout(() => {
                        goto(`/?error=${encodeURIComponent(error)}`);
                    }, 2000);
                    return;
                }

                // 세션 교환 성공
                if (data.session) {
                    console.log('로그인 성공:', data.session.user.email);
                    // 세션이 설정되었는지 다시 확인
                    const { data: { session: verifiedSession } } = await supabase.auth.getSession();
                    if (verifiedSession) {
                        console.log('세션 확인 완료:', verifiedSession.user.email);
                        // 메인 페이지로 리다이렉트
                        goto('/');
                    } else {
                        console.error('세션 설정 실패');
                        error = '세션 설정에 실패했습니다.';
                        processing = false;
                        setTimeout(() => {
                            goto(`/?error=${encodeURIComponent(error)}`);
                        }, 2000);
                    }
                    return;
                } else {
                    console.error('세션 데이터 없음');
                    error = '세션을 받지 못했습니다.';
                    processing = false;
                    setTimeout(() => {
                        goto(`/?error=${encodeURIComponent(error)}`);
                    }, 2000);
                    return;
                }
            }

            // access_token이 직접 있는 경우 (Supabase가 자동으로 처리)
            // Supabase 클라이언트는 URL에 토큰이 있으면 자동으로 감지하고 세션을 설정합니다
            if (accessToken) {
                console.log('Access token 발견 - Supabase가 자동으로 처리합니다...');
                console.log('URL 해시:', $page.url.hash);
                
                // Supabase 클라이언트가 URL의 토큰을 자동으로 처리할 시간을 줍니다
                // setSession()을 직접 호출하면 "Forbidden use of secret API key" 에러가 발생합니다
                await new Promise(resolve => setTimeout(resolve, 200));
                
                // Supabase가 자동으로 URL의 토큰을 처리했는지 확인
                const { data: { session }, error: sessionError } = await supabase.auth.getSession();
                
                if (sessionError) {
                    console.error('세션 확인 오류:', sessionError);
                    error = sessionError.message || '세션 설정에 실패했습니다.';
                    processing = false;
                    setTimeout(() => {
                        goto(`/?error=${encodeURIComponent(error)}`);
                    }, 2000);
                    return;
                }
                
                if (session) {
                    console.log('로그인 성공 (자동 처리):', session.user.email);
                    // 메인 페이지로 리다이렉트
                    goto('/');
                    return;
                } else {
                    console.error('세션을 받지 못했습니다.');
                    console.error('URL에 토큰이 있지만 Supabase가 자동으로 처리하지 못했습니다.');
                    error = '세션 설정에 실패했습니다.';
                    processing = false;
                    setTimeout(() => {
                        goto(`/?error=${encodeURIComponent(error)}`);
                    }, 2000);
                    return;
                }
            }

            // code나 access_token이 없는 경우
            console.error('인증 코드 또는 토큰을 받지 못함');
            error = '인증 코드를 받지 못했습니다.';
            processing = false;
            setTimeout(() => {
                goto(`/?error=${encodeURIComponent(error)}`);
            }, 2000);

        } catch (err) {
            console.error('OAuth 콜백 처리 중 예외 발생:', err);
            error = err.message || '로그인 처리 중 오류가 발생했습니다.';
            processing = false;
            setTimeout(() => {
                goto(`/?error=${encodeURIComponent(error)}`);
            }, 2000);
        }
    });
</script>

<div class="callback-container">
    {#if processing}
        <div class="processing">
            <div class="spinner"></div>
            <p>로그인 처리 중...</p>
        </div>
    {:else if error}
        <div class="error">
            <span class="error-icon">⚠️</span>
            <p>{error}</p>
            <p class="redirect-hint">잠시 후 로그인 페이지로 이동합니다...</p>
        </div>
    {/if}
</div>

<style>
    .callback-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100vh;
        background: var(--bg-color);
    }

    .processing,
    .error {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        text-align: center;
        padding: 40px;
        background: var(--card-bg);
        backdrop-filter: blur(8px);
        border: var(--glass-border);
        border-radius: 20px;
        max-width: 400px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
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

    .error-icon {
        font-size: 3rem;
    }

    .error p {
        margin: 0;
        color: var(--text-main);
    }

    .error p:first-of-type {
        color: #ff6b9d;
        font-weight: 600;
    }

    .redirect-hint {
        font-size: 0.9rem;
        color: var(--text-muted);
    }

    .processing p {
        margin: 0;
        color: var(--text-main);
    }
</style>
