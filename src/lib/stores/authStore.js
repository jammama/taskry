/**
 * 인증 상태 관리 Store
 * 
 * 전역 인증 상태를 관리하고, 세션 변경을 추적합니다.
 */

import { writable } from 'svelte/store';
import { supabase } from '$lib/supabaseClient';

// 사용자 정보 및 세션 상태
export const user = writable(null);
export const session = writable(null);
export const loading = writable(true);

/**
 * 로그아웃 함수
 */
export async function signOut() {
    // 배포 환경에서 세션이 저장/복원되지 못한 경우에도 로그아웃 버튼이 "에러"로 보이면 UX가 깨짐
    // - 세션이 없으면 로컬 상태만 정리하고 성공 처리
    const { data: { session: currentSession } } = await supabase.auth.getSession();
    if (!currentSession) {
        return { error: null };
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
        // 세션이 이미 없는 케이스는 성공으로 취급
        if (error?.name === 'AuthSessionMissingError') {
            return { error: null };
        }
        console.error('로그아웃 오류:', error);
        return { error };
    }
    return { error: null };
}

/**
 * 현재 세션 확인 및 초기화
 */
export async function initAuth() {
    loading.set(true);
    
    // 현재 세션 확인
    const { data: { session: currentSession }, error } = await supabase.auth.getSession();
    
    if (error) {
        console.error('세션 확인 오류:', error);
        user.set(null);
        session.set(null);
        loading.set(false);
        return;
    }
    
    user.set(currentSession?.user ?? null);
    session.set(currentSession);
    loading.set(false);
    
    // 인증 상태 변경 감지
    supabase.auth.onAuthStateChange((_event, newSession) => {
        user.set(newSession?.user ?? null);
        session.set(newSession);
        loading.set(false);
    });
}
