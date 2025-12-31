/**
 * Supabase 클라이언트 설정
 * 
 * Supabase는 BaaS(Backend as a Service)로, 클라우드에서 제공하는 데이터베이스와 인증 서비스를 사용합니다.
 * 별도의 서버 구현 없이 클라이언트에서 직접 데이터베이스에 접근할 수 있습니다.
 * 
 * 작동 방식:
 * 1. 클라이언트 (브라우저)에서 Supabase 클라이언트 라이브러리를 통해 직접 DB 접근
 * 2. Supabase 클라우드 서버가 PostgreSQL DB + Auth 서버 역할
 * 3. RLS(Row Level Security) 정책으로 사용자별 데이터 분리 보장
 * 
 * 환경 변수:
 * - VITE_SUPABASE_URL: Supabase 프로젝트 URL
 * - VITE_SUPABASE_ANON_KEY: Supabase Anonymous Key (공개 키)
 */

import { createClient } from '@supabase/supabase-js';

// 환경 변수에서 Supabase 설정 가져오기
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const hasEnv = Boolean(supabaseUrl && supabaseAnonKey);

// 환경 변수 검증
if (!hasEnv) {
    console.warn('⚠️ Supabase 환경 변수가 설정되지 않았습니다.');
    console.warn('   VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY 를 설정하세요.');
}

// 개발 중에는 경고로 두되, 배포에서 placeholder로 조용히 동작하면
// 로그인/로그아웃이 "세션 없음" 형태로 실패하기 쉬우므로 즉시 실패시킵니다.
if (!hasEnv && import.meta.env.PROD) {
    throw new Error('Missing Supabase env vars in production (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).');
}

// Supabase 클라이언트 생성 및 export
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
});
