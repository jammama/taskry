<script>
    import { supabase } from '$lib/supabaseClient';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { page } from '$app/stores';

    export let error = null; // 외부에서 전달받은 에러 (예: OAuth 콜백 실패)

    let isLoading = false;

    /**
     * Google OAuth 로그인 시작
     */
    async function signInWithGoogle() {
        isLoading = true;
        error = null;

        try {
            // 현재 진입한 URL을 기반으로 콜백 URL 생성
            // $page.url.origin을 사용하여 동적으로 현재 도메인 가져오기
            const redirectUrl = `${$page.url.origin}/auth/callback`;
            
            console.log('OAuth 콜백 URL:', redirectUrl);
            
            const { error: authError } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: redirectUrl
                }
            });

            if (authError) {
                error = authError.message;
                isLoading = false;
            }
            // 성공 시 자동으로 Google OAuth 페이지로 리다이렉트되므로
            // isLoading은 그대로 유지 (리다이렉트 중임을 표시)
        } catch (err) {
            error = err.message || '로그인 중 오류가 발생했습니다.';
            isLoading = false;
        }
    }

    onMount(() => {
        // 컴포넌트 마운트 시 에러 초기화
        error = null;
    });
</script>

<div class="login-screen">
    <div class="login-container">
        <div class="login-header">
            <h1 class="app-title">Taskry</h1>
            <p class="app-subtitle">Your Personal Flow Engine</p>
        </div>

        <div class="login-content">
            {#if error}
                <div class="error-message" transition:fade>
                    <span class="error-icon">⚠️</span>
                    <span>{error}</span>
                </div>
            {/if}

            <button 
                class="google-login-btn" 
                on:click={signInWithGoogle}
                disabled={isLoading}
                class:loading={isLoading}
            >
                {#if isLoading}
                    <div class="spinner"></div>
                    <span>로그인 중...</span>
                {:else}
                    <svg class="google-icon" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Google로 로그인</span>
                {/if}
            </button>

            <p class="login-hint">
                Google 계정으로 간편하게 로그인하세요
            </p>
        </div>
    </div>
</div>

<style>
    .login-screen {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        /* 앱 카드(400x800) 내부에서도 정상 동작하도록 viewport 기준(min-height:100vh) 금지 */
        min-height: 100%;
        background: var(--bg-color);
    }

    .login-container {
        background: var(--card-bg);
        backdrop-filter: blur(8px);
        border: var(--glass-border);
        border-radius: 20px;
        padding: 40px 30px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    }

    .login-header {
        text-align: center;
        margin-bottom: 40px;
    }

    .app-title {
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0 0 10px 0;
        background: linear-gradient(135deg, var(--primary-cyan), #ff6b9d);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0 0 20px rgba(0, 240, 255, 0.5);
    }

    .app-subtitle {
        font-size: 0.9rem;
        color: var(--text-muted);
        margin: 0;
        letter-spacing: 1px;
    }

    .login-content {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .error-message {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        background: rgba(255, 107, 157, 0.1);
        border: 1px solid #ff6b9d;
        border-radius: 8px;
        color: #ff6b9d;
        font-size: 0.9rem;
    }

    .error-icon {
        font-size: 1.2rem;
    }

    .google-login-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        width: 100%;
        padding: 14px 24px;
        background: #ffffff;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        color: #333;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .google-login-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 240, 255, 0.3),
                    0 0 30px rgba(0, 240, 255, 0.2);
        border-color: var(--primary-cyan);
    }

    .google-login-btn:active:not(:disabled) {
        transform: translateY(0);
    }

    .google-login-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .google-login-btn.loading {
        background: rgba(255, 255, 255, 0.9);
    }

    .google-icon {
        flex-shrink: 0;
    }

    .spinner {
        width: 20px;
        height: 20px;
        border: 3px solid rgba(0, 0, 0, 0.1);
        border-top-color: #333;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .login-hint {
        text-align: center;
        font-size: 0.85rem;
        color: var(--text-muted);
        margin: 0;
    }
</style>

