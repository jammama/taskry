**[Assignee]:** @AI_Dever

**[Issue]:** #Feature-007 (Google OAuth 설정 및 로그인 UI)

**[Feature Name]:** Google OAuth Provider 설정 및 로그인 화면 구현

**[Milestone]:** Milestone 2: 환경 구축 및 서버 연동 (Phase 0)

---

## 📖 기능 개요

### 목적
Supabase에서 Google OAuth Provider를 설정하고, 사용자가 로그인할 수 있는 UI를 구현합니다.

### 사용자 스토리
- **As a** 사용자
- **I want** Google 계정으로 로그인할 수 있는 화면과 버튼
- **So that** 간편하게 인증할 수 있다

---

## 🎯 기능 요구사항

### 핵심 기능
1. Supabase 콘솔에서 Google OAuth Provider 활성화
2. Google Cloud Console에서 OAuth 클라이언트 생성
3. 로그인 화면 UI 구현
4. Google 로그인 버튼 구현

### 상세 요구사항
- **Supabase 콘솔 설정**:
  - Supabase 프로젝트 → Authentication → Providers
  - Google Provider 활성화
  - Redirect URL 설정
- **Google Cloud Console 설정**:
  - Google Cloud Console 프로젝트 생성
  - OAuth 2.0 클라이언트 ID 생성
  - 승인된 리디렉션 URI 설정 (Supabase 콜백 URL)
  - Client ID와 Client Secret 발급
- **Supabase에 등록**:
  - Client ID를 Supabase에 등록
  - Client Secret을 Supabase에 등록
- **로그인 UI 구현**:
  - 로그인 화면 컴포넌트 생성 (`LoginScreen.svelte`)
  - Google 로그인 버튼 UI
  - 로딩 상태 표시
  - 에러 상태 표시

---

## 🎨 UI/UX 명세

### 화면 구성
- **로그인 화면**: 
  - 앱 로고/제목
  - "Google로 로그인" 버튼
  - 로딩 스피너 (로그인 진행 중)
  - 에러 메시지 표시 영역

### 인터랙션
- Google 로그인 버튼 클릭 → Google OAuth 페이지로 리다이렉트
- 로그인 진행 중 → 로딩 스피너 표시
- 로그인 실패 → 에러 메시지 표시

### 애니메이션
- 로그인 버튼 호버 효과 (네온 글로우)
- 로그인 진행 중 로딩 스피너
- 버튼 클릭 시 부드러운 피드백

---

## 🔗 관련 이슈

- **의존 이슈**: 
  - Feature-006: Supabase 클라이언트 설정 및 기본 연동
- **후속 이슈**: 
  - Feature-008: 인증 로직 및 세션 관리
- **부모 이슈**: Milestone 2 (환경 구축 및 서버 연동)

---

## 📝 작업 내역

### [날짜] - 작업 시작
- 이슈 생성 및 요구사항 정의

### [2024-12-01] - 구현 완료
- ✅ `LoginScreen.svelte` 컴포넌트 생성 (로그인 UI)
- ✅ Google 로그인 버튼 UI 구현 (네온 글로우 호버 효과 포함)
- ✅ `signInWithGoogle` 함수 구현 (Supabase OAuth 연동)
- ✅ 로딩 상태 표시 (스피너 애니메이션)
- ✅ 에러 상태 표시 (에러 메시지 UI)
- ✅ OAuth 콜백 라우트 생성 (`/auth/callback`)
- ✅ `+page.svelte`에 인증 상태에 따른 조건부 렌더링 추가
- ✅ 인증 상태 확인 및 세션 관리 기본 구조 구현

---

**참고 문서**:
- `docs/brainstorm.md` (942-966줄): Google 로그인 구현 예시
- `docs/devGuideLine.md`: Supabase 사용 가이드
- Supabase 공식 문서: https://supabase.com/docs/guides/auth/social-login/auth-google

**작성일**: 2024년  
**마지막 업데이트**: 2024년

---

## 추가 작업 필요 내용

### 사용자가 직접 수행해야 할 작업

#### 1. Supabase 콘솔에서 Google OAuth Provider 활성화
- [ ] Supabase 프로젝트 대시보드 접속 (https://app.supabase.com)
- [ ] 프로젝트 선택 → Authentication → Providers 메뉴 이동
- [ ] Google Provider 활성화
- [ ] Redirect URL 확인 및 설정:
  - 개발 환경: `http://localhost:5173/auth/callback`
  - 배포 환경: `https://your-domain.com/auth/callback`

#### 2. Google Cloud Console에서 OAuth 클라이언트 생성
- [ ] Google Cloud Console 접속 (https://console.cloud.google.com)
- [ ] 새 프로젝트 생성 또는 기존 프로젝트 선택
- [ ] APIs & Services → Credentials 메뉴 이동
- [ ] "Create Credentials" → "OAuth client ID" 선택
- [ ] Application type: "Web application" 선택
- [ ] 승인된 리디렉션 URI 추가:
  - 개발 환경: `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`
  - 배포 환경: `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`
- [ ] Client ID와 Client Secret 발급

#### 3. Supabase에 OAuth 정보 등록
- [ ] Supabase 콘솔 → Authentication → Providers → Google
- [ ] 발급받은 Client ID 입력
- [ ] 발급받은 Client Secret 입력
- [ ] 저장

#### 4. 환경 변수 확인
- [ ] `.env` 파일에 Supabase 정보가 올바르게 설정되어 있는지 확인:
  ```
  VITE_SUPABASE_URL=https://your-project-id.supabase.co
  VITE_SUPABASE_ANON_KEY=your-anon-key
  ```

#### 5. 테스트 및 검증
- [ ] 개발 서버 실행 (`npm run dev`)
- [ ] 로그인 화면이 정상적으로 표시되는지 확인
- [ ] Google 로그인 버튼 클릭 시 Google OAuth 페이지로 리다이렉트되는지 확인
- [ ] Google 계정 선택 후 로그인 성공 시 메인 화면으로 이동하는지 확인
- [ ] 로그인 실패 시 에러 메시지가 표시되는지 확인

#### 6. 다음 단계 준비
- [ ] Feature-008: 인증 로직 및 세션 관리 구현 준비
- [ ] 세션 만료 처리 로직 검토
- [ ] 로그아웃 기능 구현 준비
