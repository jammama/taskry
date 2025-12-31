**[Assignee]:** @AI_Dever

**[Issue]:** #Bug-M2-03 (모바일에서 체크 버튼이 완료 처리(Todo→Complete)만 안 눌림)

**[Requirement]:** 
1. **모바일에서 체크 버튼이 항상 동작해야 함**: Todo→Complete, Complete→Todo 모두 동일하게 탭으로 토글되어야 합니다.
2. **스와이프 제스처가 버튼 클릭을 가로채면 안 됨**: 스와이프/선택 기능은 유지하되, 버튼/입력 등 인터랙션 요소 탭은 정상 동작해야 합니다.

**[Bug Details]:**
- **버그**: 모바일에서 활성 Todo 항목의 체크 버튼을 눌러도 완료 처리(Todo→Complete)가 되지 않음.
  - 반대로 완료 목록에서 Complete→Todo(완료 해제)는 클릭이 되는 것으로 관찰됨.
- **재현 조건**:
  - 모바일 터치 환경
  - 활성 Todo 리스트(상단 리스트)
- **원인(유력)**:
  - `src/lib/components/PlanningMode.svelte`에서 활성 Todo의 `<li>`에 `on:touchstart`로 스와이프 제스처를 시작함
  - 기존 `handleSwipeStart()`가 `event.preventDefault()`를 터치 시작 시점에 호출하여
    버튼의 기본 탭/클릭 시퀀스를 깨뜨릴 수 있음
  - 완료 섹션(Completed list)의 `<li>`에는 동일한 touchstart 스와이프 핸들러가 없어서
    Complete→Todo 버튼은 정상 동작하는 현상과 일치

**[Development Order]**
1. 터치 시작에서 무조건 `preventDefault()` 하는 로직 제거
2. 인터랙션 요소(체크 버튼, 편집 버튼, input 등)에서 시작된 터치는 스와이프 제스처로 처리하지 않도록 예외 처리
   - `event.target.closest('button, input, textarea, a, ...')`이면 스와이프 시작을 무시
3. 모바일에서 Todo→Complete / Complete→Todo 양방향 토글 검증

**[Target Files]:**
- `src/lib/components/PlanningMode.svelte`
- (간접) `src/lib/utils/swipeGesture.js` (move 시점 preventDefault는 유틸이 담당)

**[Dependencies]:** 
- 없음

**[Guideline Check]:** 
- 스와이프 삭제/선택 UX 유지
- 모바일 조작성(탭 우선) 보장

**[Technical Notes]**
- 터치 제스처 구현에서 `touchstart` 단계의 `preventDefault()`는 클릭 자체를 막는 부작용이 큼
- 이동량 임계치 이후에만 preventDefault/stopPropagation 하는 방식이 안전함
