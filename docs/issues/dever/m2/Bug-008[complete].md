**[Assignee]:** @AI_Dever

**[Issue]:** #Bug-M2-04 (배포 도메인에서 로그아웃 실패: AuthSessionMissingError)

**[Requirement]:**
1. **배포 도메인에서도 로그아웃이 항상 동작해야 함**: `taskry` 도메인에서 로그아웃 시 에러 없이 로그인 화면으로 돌아가야 합니다.
2. **세션 누락 케이스도 UX가 깨지지 않아야 함**: 세션이 없거나 저장/복원이 실패한 경우에도 로그아웃 버튼이 에러를 띄우면 안 됩니다.

**[Bug Details]:**
- **버그**: 배포 도메인에서 로그아웃 클릭 시 `AuthSessionMissingError: Auth session missing!` 발생.
- **재현 조건**:
  - 배포 도메인에서 로그인 후(또는 로그인 상태처럼 보이는 상태에서) 로그아웃 버튼 클릭
- **원인(유력)**:
  1) **배포 환경 Supabase env 미설정**
     - `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`가 배포 환경에 없으면, 클라이언트가 올바른 프로젝트를 가리키지 못해 `getSession()`이 null이 되고 `signOut()`에서 세션 누락 에러가 발생할 수 있음.
  2) **세션 저장/복원 실패**
     - 도메인/브라우저 정책에 의해 로컬 스토리지 기반 세션이 복원되지 않으면 `signOut()`이 세션 없음 에러를 반환.

**[Development Order]**
1. 배포 환경에서 Supabase env 필수화
   - PROD에서 env 누락 시 즉시 실패(placeholder 동작 금지)
2. 로그아웃 로직을 세션 누락에 강건하게 수정
   - `getSession()`이 null이면 성공 처리(UX 깨짐 방지)
   - `AuthSessionMissingError`는 성공으로 취급
3. 배포 도메인에서 검증
   - 로그인 → 로그아웃 → 로그인 화면 복귀 확인

**[Target Files]:**
- `src/lib/supabaseClient.js`
- `src/lib/stores/authStore.js`

**[Dependencies]:**
- Vercel(또는 배포 플랫폼) 환경 변수 설정

**[Guideline Check]:**
- 배포 환경 안정성 우선
- 인증 UX(로그인/로그아웃) 신뢰성 확보

**[Technical Notes]**
- `signOut()`은 내부적으로 현재 세션을 필요로 하며, 세션이 복원되지 않으면 `AuthSessionMissingError`를 반환할 수 있음
- 배포 환경에서 env 미설정은 동일 증상을 만들 수 있으므로 PROD에서는 placeholder를 금지하는 것이 안전함
