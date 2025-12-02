**[Assignee]:** @AI_Dever

**[Issue]:** #Bug-002 (버그 수정)

**[Requirement]:** 
1. **Reward Popup 자동 닫기 기능 구현**: `PlanningMode.svelte`의 보상 팝업(`.reward-pop`)이 일정 시간 후 자동으로 사라지도록 구현하시오.
2. **Input창 할 일 추가 기능 구현**: `NewTaskInput` 컴포넌트를 통해 입력한 할 일이 실제로 화면에 표시되도록 `todos` store를 구독하여 동적으로 할 일 목록을 렌더링하도록 수정하시오.

**[Bug Details]:**
- **버그 1**: `src/lib/components/PlanningMode.svelte` 70-73번 라인의 `.reward-pop`이 표시되지만 자동으로 사라지는 로직이 없음. `RewardPopup.svelte`에는 3초 후 자동 닫기 로직이 있으나, `PlanningMode.svelte`의 작은 보상 팝업에는 해당 기능이 구현되어 있지 않음.
- **버그 2**: `src/lib/components/PlanningMode.svelte`에서 `NewTaskInput` 컴포넌트와 `addTodo` 함수는 연결되어 있으나, `tasks` 배열이 하드코딩되어 있고 `todos` store를 구독하지 않아서 새로 추가된 할 일이 화면에 표시되지 않음. `todos` store는 import되었지만 실제로 사용되지 않고 있음.

**[Development Order]:**
1. `PlanningMode.svelte`의 보상 팝업(`.reward-pop`)에 자동 닫기 로직 추가: `completedId`를 일정 시간(예: 2-3초) 후 `null`로 설정하여 팝업이 사라지도록 구현.
2. `PlanningMode.svelte`에서 하드코딩된 `tasks` 배열을 제거하고, `todos` store를 구독(`$todos`)하여 동적으로 할 일 목록을 렌더링하도록 변경.
3. `todos` store의 데이터 구조에 맞춰 할 일 아이템 렌더링 로직 수정: `task.id`, `task.title`, `task.isComplete`, `task.category` 등을 사용하도록 변경.
4. `toggleTask` 함수를 `todos` store의 `completeTodo` 함수와 제대로 연동되도록 수정 (이미 호출되고 있으나, UI 업데이트가 store 구독으로 자동 반영되도록 변경).

**[Target Files]:** 
- `src/lib/components/PlanningMode.svelte`

**[Dependencies]:** 
- `src/lib/stores/todoStore.js`의 `todos` store 구독
- `src/lib/stores/todoStore.js`의 `completeTodo` 함수 사용

**[Guideline Check]:** 
- 'II. 기술 스택' (SvelteKit + JavaScript) 준수
- 'III. 디자인 및 스타일 가이드' (Dark Mode + Neon Glow, CSS 변수 사용) 준수
- 'IV. UX 철학 (Juicy UI)' (체크박스 완료 시 애니메이션 효과 유지) 준수
- 기존 JS 코드 변경 시 반드시 변경 내역을 기록할 것
- 다크 모드 + 네온 테마를 유지할 것

---
## 작업 완료 내역

### 변경 사항
- `src/lib/components/PlanningMode.svelte`: 하드코딩된 tasks 배열 제거, todos store 구독으로 전환, 보상 팝업 자동 닫기 로직 추가

### 주요 수정 사항
1. **보상 팝업 자동 닫기 기능 구현**
   - `completedId`를 2.5초 후 `null`로 설정하는 타이머 로직 추가
   - `onDestroy` 훅을 사용하여 컴포넌트 언마운트 시 타이머 정리
   - 완료 해제 시에도 보상 팝업이 즉시 제거되도록 처리

2. **todos store 구독으로 전환**
   - 하드코딩된 `tasks` 배열 완전 제거
   - `$todos` 구독을 사용하여 동적으로 할 일 목록 렌더링
   - `todos` store의 데이터 구조(`id`, `title`, `isComplete`, `category`, `xp`)에 맞춰 렌더링 로직 수정

3. **데이터 구조 매핑**
   - `task.completed` → `task.isComplete`로 변경
   - `task.icon` → `getCategoryIcon(task.category)` 함수로 카테고리 기반 아이콘 매핑
   - `task.focus` → `task.category === 'Focus'` 조건으로 변경
   - 카테고리별 태그 스타일 추가 (Focus: 골드, Rhythm: 시안, Catalyst: 핑크)
   - XP 배지 표시 추가

4. **toggleTask 함수 개선**
   - `todos` store의 `completeTodo` 함수와 제대로 연동
   - 완료 상태 변경 시에만 보상 팝업 표시
   - UI 업데이트가 store 구독으로 자동 반영되도록 변경
   - 보상 팝업에 실제 XP 값 표시 (`+{task.xp} XP`)

### 테스트 결과
- ✅ 보상 팝업이 2.5초 후 자동으로 사라지는지 확인
- ✅ NewTaskInput을 통해 추가한 할 일이 화면에 즉시 표시되는지 확인
- ✅ 할 일 완료 시 체크 아이콘이 정상적으로 표시되는지 확인
- ✅ todos store의 데이터 변경이 UI에 자동 반영되는지 확인
- ✅ 다크 모드 + 네온 테마 유지 확인
- ✅ 체크박스 완료 시 애니메이션 효과 유지 확인

### 코드 변경 내역
- **제거된 코드**: 하드코딩된 `tasks` 배열 (8-15번 라인)
- **추가된 코드**: 
  - `onDestroy` import 및 타이머 정리 로직
  - `getCategoryIcon` 함수 (카테고리별 아이콘 매핑)
  - `rewardTimer` 변수 및 자동 닫기 로직
  - 카테고리별 태그 스타일 (tag-rhythm, tag-catalyst, xp-badge)
- **수정된 코드**:
  - `toggleTask` 함수: todos store와 연동, 보상 팝업 자동 닫기 로직 추가
  - 템플릿: `tasks` → `$todos`, `task.completed` → `task.isComplete`, 카테고리별 태그 렌더링
