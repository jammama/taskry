**[Assignee]:** @AI_Dever

**[Issue]:** #Bug-M2-01 (버그 수정)

**[Requirement]:** 
1. **브라우저 기본 드래그 기능 비활성화**: 웹 화면에서 텍스트가 선택된 상태(푸른색 하이라이트)에서 드래그할 때 DOM 요소가 드래그되는 브라우저 기본 동작을 비활성화하여, 커스텀 드래그 기능과의 충돌을 방지하시오.
2. **텍스트 선택 비활성화**: 일반 영역에서 텍스트 선택(하이라이트) 기능을 비활성화하되, 입력 필드(input, textarea 등)에서는 텍스트 선택이 정상적으로 작동해야 합니다.

**[Bug Details]:**
- **버그**: 웹 화면에서 텍스트를 선택한 상태(푸른색으로 하이라이트된 상태)에서 드래그를 하면 브라우저의 기본 드래그 기능이 작동하여 DOM 요소가 드래그되고, 이로 인해 구현된 커스텀 드래그 기능들이 제대로 동작하지 않음.
- **영향 범위**: 모든 드래그 기능이 있는 컴포넌트에 영향을 미침 (예: 할 일 항목 드래그, 리스트 정렬 드래그 등)
- **요구사항**: 
  - 일반 영역에서 텍스트 선택 및 드래그 비활성화
  - 입력 필드(input, textarea, contenteditable 등)에서는 텍스트 선택 및 드래그 정상 작동 유지

**[Development Order]**
1. 전역 CSS 스타일을 통해 텍스트 선택 비활성화 (`user-select: none`) 적용
2. 입력 필드에 대해서는 텍스트 선택 허용 (`user-select: text` 또는 `user-select: auto`)
3. 드래그 이벤트 핸들러에서 `preventDefault()`를 사용하여 기본 드래그 동작 차단
4. `draggable="false"` 속성을 적절한 요소에 적용하여 이미지나 링크 등의 기본 드래그 방지
5. 입력 필드가 아닌 영역에서 `dragstart` 이벤트를 차단하여 DOM 요소 드래그 방지

**[Target Files]:** 
- 전역 CSS 파일 또는 `app.html`의 `<style>` 태그
- 드래그 기능이 있는 컴포넌트들 (예: `PlanningMode.svelte`, 드래그 관련 컴포넌트)
- 필요시 `app.html` 또는 레이아웃 컴포넌트

**[Dependencies]:** 
- 기존 드래그 기능 구현 코드와의 호환성 확인 필요
- 입력 필드 컴포넌트들 (예: `NewTaskInput.svelte`)

**[Guideline Check]:** 
- 'II. 기술 스택' (SvelteKit + JavaScript) 준수
- 'III. 디자인 및 스타일 가이드' (Dark Mode + Neon Glow, CSS 변수 사용) 준수
- 'IV. UX 철학 (Juicy UI)' (기존 드래그 애니메이션 및 인터랙션 유지) 준수
- 기존 JS 코드 변경 시 반드시 변경 내역을 기록할 것
- 다크 모드 + 네온 테마를 유지할 것
- 입력 필드의 사용성은 유지되어야 함 (텍스트 선택, 복사, 붙여넣기 등)

**[Technical Notes]**
- CSS `user-select` 속성 사용: `none` (비활성화), `text` (활성화), `auto` (기본값)
- JavaScript 이벤트: `dragstart`, `selectstart` 이벤트 처리
- 입력 필드 선택자: `input`, `textarea`, `[contenteditable="true"]` 등
- 전역 스타일 적용 시 입력 필드에 대한 예외 처리 필수

