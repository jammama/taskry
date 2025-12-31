**[Assignee]:** @AI_Dever

**[Issue]:** #Feature-008 (인증 로직 및 세션 관리)

**[Feature Name]:** Google OAuth 로그인/로그아웃 로직 및 세션 관리 구현

**[Milestone]:** Milestone 2: 환경 구축 및 서버 연동 (Phase 0)

---

## 📖 기능 개요

### 목적
Google OAuth 로그인/로그아웃 로직을 구현하고, 사용자 세션을 관리하여 인증 상태를 추적합니다.

### 사용자 스토리
- **As a** 사용자
- **I want** 로그인 후 세션이 유지되고, 로그아웃할 수 있는 것
- **So that** 매번 로그인하지 않고 앱을 사용할 수 있다

---

## 🎯 기능 요구사항

### 핵심 기능
1. Google OAuth 로그인 로직 구현
2. OAuth 콜백 처리
3. 로그아웃 로직 구현
4. 세션 관리 및 인증 상태 추적
5. 인증 상태에 따른 라우팅

### 상세 요구사항
- **로그인 로직**:
  - `signInWithOAuth()` 함수로 Google 로그인 시작
  - Google OAuth 페이지로 리다이렉트
  - 에러 처리
- **콜백 처리**:
  - `/auth/callback` 라우트 생성
  - `exchangeCodeForSession()` 호출하여 세션 생성
  - 로그인 성공 시 메인 화면으로 리다이렉트
  - 로그인 실패 시 에러 처리
- **로그아웃 로직**:
  - `signOut()` 함수로 세션 종료
  - 로그아웃 후 로그인 화면으로 리다이렉트
- **세션 관리**:
  - SvelteKit hooks를 사용한 세션 상태 추적
  - 전역 인증 상태 관리 (store 또는 context)
  - 세션 만료 처리
- **라우팅 보호**:
  - 인증되지 않은 사용자는 로그인 화면으로 리다이렉트
  - 인증된 사용자는 메인 화면 접근 가능

---

## 🎨 UI/UX 명세

### 화면 구성
- **인증 상태 표시**: 
  - 로그인된 사용자: 사용자 프로필 또는 로그아웃 버튼
  - 로그인되지 않은 사용자: 로그인 화면 표시

### 인터랙션
- 로그인 성공 → 메인 화면으로 자동 이동
- 로그아웃 버튼 클릭 → 세션 종료 및 로그인 화면으로 이동
- 세션 만료 → 자동으로 로그인 화면으로 이동

### 애니메이션
- 로그인 성공 시 부드러운 전환
- 로그아웃 시 부드러운 전환

---

## 🔗 관련 이슈

- **의존 이슈**: 
  - Feature-006: Supabase 클라이언트 설정 및 기본 연동
  - Feature-007: Google OAuth 설정 및 로그인 UI
- **후속 이슈**: 
  - Feature-009: 인증 기반 서비스 활성화
- **부모 이슈**: Milestone 2 (환경 구축 및 서버 연동)

---

## 📝 작업 내역

### [날짜] - 작업 시작
- 이슈 생성 및 요구사항 정의

### [2024-12-01] - 구현 완료
- ✅ 로그인 로직 구현 (Feature-007에서 완료)
- ✅ OAuth 콜백 처리 (Feature-007에서 완료)
  - `/auth/callback` 라우트 생성 (`+page.svelte`)
  - `code` 플로우: `exchangeCodeForSession()` 사용
  - `access_token` 플로우: Supabase 자동 처리 (URL 토큰 자동 감지)
- ✅ 로그아웃 함수 구현 (`authStore.js`의 `signOut()`)
- ✅ 로그아웃 버튼 UI 추가 (PlanningMode 헤더)
  - 로그아웃 아이콘 버튼
  - 호버 효과 (네온 글로우)
- ✅ 사용자 정보 표시 (PlanningMode 헤더)
  - 사용자 아바타 (Google 프로필 이미지 또는 이니셜)
  - 사용자 이름/이메일 표시
  - 네온 테마 스타일 적용
- ✅ 세션 관리 및 인증 상태 추적
  - `+page.svelte`에서 `onAuthStateChange` 활용
  - `PlanningMode.svelte`에서 사용자 정보 실시간 업데이트
  - 세션 상태 변경 시 자동 UI 업데이트
- ✅ 세션 만료 처리
  - `SIGNED_OUT` 이벤트 감지
  - `TOKEN_REFRESHED` 이벤트에서 세션 없음 감지
  - 세션 만료 시 자동으로 로그인 화면으로 전환
- ✅ 전역 인증 상태 store 생성 (`authStore.js`)
  - `user`, `session`, `loading` writable stores
  - `signOut()` 함수
  - `initAuth()` 함수 (선택적 사용)
- ✅ 인증 상태에 따른 라우팅
  - `+page.svelte`에서 조건부 렌더링
  - 로그인됨: `PlanningMode` 표시
  - 로그인 안 됨: `LoginScreen` 표시
  - 로딩 중: 스피너 표시

---

**참고 문서**:
- `docs/brainstorm.md` (942-966줄): Google 로그인 구현 예시
- `docs/devGuideLine.md`: Supabase 사용 가이드
- Supabase 공식 문서: https://supabase.com/docs/guides/auth

**작성일**: 2024년  
**마지막 업데이트**: 2024년

