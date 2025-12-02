**[Assignee]:** @AI_Dever

**[Issue]:** #Bug-001 (버그 수정)

**[Requirement]:** 
1. **입력창 기능 구현**: `PlanningMode.svelte`의 검색창처럼 보이는 입력창을 실제 할 일 추가 입력창으로 변경하고, `todoStore.js`의 `addTodo` 함수를 연동하여 입력 기능을 구현하시오.
2. **체크버튼 표시 로직 수정**: 할 일 완료 시 체크버튼이 사라졌다가 다시 나타나는 문제를 수정하여, 할 일 완료 여부(`task.completed`)에 따라 체크버튼이 항상 일관되게 표시되도록 변경하시오.

**[Bug Details]:**
- **버그 1**: `src/lib/components/PlanningMode.svelte` 35-38번 라인의 `.search-box`가 검색 아이콘(🔍)과 함께 표시되지만 실제 입력 기능이 없음. `NewTaskInput.svelte` 컴포넌트가 존재하지만 사용되지 않음.
- **버그 2**: `src/lib/components/PlanningMode.svelte` 57-67번 라인의 체크버튼이 `{#if task.completed && completedId === task.id}` 조건으로 인해 보상 팝업이 표시되는 동안에만 나타나고, 그 외에는 `.circle`만 표시됨. 완료된 할 일의 체크버튼이 항상 표시되어야 함.

**[Development Order]:**
1. `PlanningMode.svelte`에서 검색창 스타일의 입력창을 제거하고, `NewTaskInput.svelte` 컴포넌트를 import하여 사용하도록 변경.
2. `NewTaskInput.svelte`의 `addTask` prop을 `todoStore.js`의 `addTodo` 함수와 연결.
3. `PlanningMode.svelte`의 체크버튼 렌더링 로직을 수정: 완료 상태에 따라 체크 아이콘(✓) 또는 빈 원형 버튼이 항상 표시되도록 변경. 보상 팝업은 별도 레이어로 표시하여 체크버튼과 독립적으로 동작하도록 수정.
4. 완료된 할 일의 체크버튼은 항상 체크 아이콘이 표시되어야 하며, 미완료 할 일은 빈 원형 버튼이 표시되어야 함.

**[Target Files]:** 
- `src/lib/components/PlanningMode.svelte`
- `src/lib/components/NewTaskInput.svelte` (필요시 수정)

**[Dependencies]:** 
- `src/lib/stores/todoStore.js`의 `addTodo` 함수 사용

**[Guideline Check]:** 
- 'II. 기술 스택' (SvelteKit + JavaScript) 준수
- 'III. 디자인 및 스타일 가이드' (Dark Mode + Neon Glow, CSS 변수 사용) 준수
- 'IV. UX 철학 (Juicy UI)' (체크박스 완료 시 애니메이션 효과 유지) 준수
- 기존 JS 코드 변경 시 반드시 변경 내역을 기록할 것
- 다크 모드 + 네온 테마를 유지할 것
- `NewTaskInput.svelte`의 검색 아이콘을 입력/추가 아이콘(예: + 또는 ➕)으로 변경하거나, 적절한 입력 아이콘으로 교체할 것
