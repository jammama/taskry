**[Assignee]:** @AI_Dever

**[Issue]:** #Feature-004 (Task 순서 변경 - 드래그앤드롭)

**[Feature Name]:** 드래그앤드롭을 통한 Task 순서 변경 기능

**[Milestone]:** Milestone 1: Planning Mode 기본 구현

---

## 📖 기능 개요

### 목적
사용자가 드래그앤드롭을 통해 Task의 순서를 변경할 수 있도록 하여 우선순위와 중요도를 직접 관리할 수 있게 합니다.

### 사용자 스토리
- **As a** 사용자
- **I want** 드래그앤드롭으로 Task 순서를 변경할 수 있는 것
- **So that** 우선순위와 중요도를 직접 정할 수 있다

---

## 🎯 기능 요구사항

### 핵심 기능
1. 드래그앤드롭 라이브러리 통합
2. Task 순서 변경 기능 구현
3. 순서 정보를 IndexedDB에 저장
4. 드래그 중 시각적 피드백
5. 드롭 시 애니메이션 효과

### 상세 요구사항
- 라이브러리: dnd-kit 또는 svelte-dnd-action 선택
- 데이터 구조: `order` 또는 `position` 필드 추가
- 드래그 중: 그림자, 배경색 변경 등 시각적 피드백
- 드롭 시: 부드러운 애니메이션
- 모바일: 터치 제스처 지원

---

## 🎨 UI/UX 명세

### 화면 구성
- 드래그 가능한 Task 리스트
- 드래그 중: Task가 반투명하게 표시되고 그림자 효과
- 드롭 영역: 시각적 가이드 표시

### 인터랙션
- Task 길게 누르기 또는 드래그 시작 → 드래그 모드 진입
- 드래그 중 → 다른 Task 위치에 드롭 가능 영역 표시
- 드롭 → 순서 변경 및 애니메이션

---

## 📝 작업 내역

### [날짜] - 작업 시작
- 이슈 생성 및 요구사항 정의

---

## 작업 완료 내역

### 변경 사항
- `src/lib/components/PlanningMode.svelte`: 드래그앤드롭 기능 구현 (할 일 목록과 완료된 할 일 목록 독립적으로)
- `src/lib/stores/todoStore.js`: order 필드 추가 및 순서 업데이트 함수 구현
- `package.json`: svelte-dnd-action 라이브러리 추가

### 주요 수정 사항
1. **드래그앤드롭 라이브러리 통합**
   - `svelte-dnd-action` 라이브러리 설치 및 import
   - `dndzone` 디렉티브를 사용하여 드래그앤드롭 영역 설정

2. **Task 순서 변경 기능 구현**
   - `todoStore.js`에 `order` 필드 추가 (기존 데이터 마이그레이션 포함)
   - `reorderTodos(newOrder)` 함수 구현: 순서 업데이트 및 IndexedDB 저장
   - `activeTodos`와 `completedTodos`를 `order` 기준으로 정렬

3. **할 일 목록 드래그앤드롭 (독립적)**
   - `activeTodosList` 로컬 상태로 관리
   - `handleActiveConsider`: 드래그 중 순서 미리보기
   - `handleActiveFinalize`: 드래그 완료 시 순서 업데이트 (order: 0부터 시작)

4. **완료된 할 일 목록 드래그앤드롭 (독립적)**
   - `completedTodosList` 로컬 상태로 관리
   - `handleCompletedConsider`: 드래그 중 순서 미리보기
   - `handleCompletedFinalize`: 드래그 완료 시 순서 업데이트 (order: activeTodos.length부터 시작)
   - **중요**: 할 일 목록과 완료된 할 일 목록은 서로 독립적으로 드래그앤드롭 가능

5. **드래그 중 시각적 피드백**
   - `.svelte-dnd-draggable`: 드래그 가능한 항목 커서 변경 (grab/grabbing)
   - `.svelte-dnd-drag-over`: 드롭 영역 표시 (투명도, 스케일, 배경색, 테두리)
   - `.svelte-dnd-dragged`: 드래그 중인 항목 스타일 (투명도, 그림자, 네온 글로우)

6. **드롭 시 애니메이션 효과**
   - `flipDurationMs: 200`: 항목 위치 변경 애니메이션 지속 시간
   - `dragTransitionOptions`: 드래그 중 부드러운 전환 효과 (cubic-bezier easing)

7. **기존 데이터 마이그레이션**
   - `hydrateFromIndexedDB`에서 기존 데이터에 `order` 필드가 없는 경우 자동으로 인덱스 기반 order 할당

### 테스트 결과
- ✅ 할 일 목록에서 드래그앤드롭으로 순서 변경 가능
- ✅ 완료된 할 일 목록에서 드래그앤드롭으로 순서 변경 가능
- ✅ 할 일 목록과 완료된 할 일 목록이 서로 독립적으로 작동 (교차 이동 불가)
- ✅ 드래그 중 시각적 피드백 정상 작동
- ✅ 드롭 시 애니메이션 효과 정상 작동
- ✅ 순서 변경이 IndexedDB에 저장되는지 확인
- ✅ 페이지 새로고침 후 순서가 유지되는지 확인
- ✅ 모바일 터치 제스처 지원 확인

### 코드 변경 내역
- **추가된 코드**:
  - `svelte-dnd-action` import 및 `dndzone` 디렉티브 사용
  - `activeTodosList`, `completedTodosList` 로컬 상태 변수
  - `handleActiveConsider`, `handleActiveFinalize` 함수
  - `handleCompletedConsider`, `handleCompletedFinalize` 함수
  - `reorderTodos(newOrder)` 함수 (todoStore.js)
  - `order` 필드 (seedTodos 및 addTodo 함수)
  - 드래그앤드롭 시각적 피드백 CSS (`.svelte-dnd-draggable`, `.svelte-dnd-drag-over`, `.svelte-dnd-dragged`)
- **수정된 코드**:
  - `activeTodos`, `completedTodos`: `order` 기준 정렬 추가
  - `addTodo`: 새 할 일에 `order` 필드 자동 할당
  - `hydrateFromIndexedDB`: 기존 데이터 마이그레이션 로직 추가
  - 할 일 리스트 `<ul>`: `use:dndzone` 디렉티브 및 이벤트 핸들러 추가
  - 완료된 할 일 리스트 `<ul>`: `use:dndzone` 디렉티브 및 이벤트 핸들러 추가

### 주의사항
- 할 일 목록과 완료된 할 일 목록은 **서로 독립적으로** 드래그앤드롭이 작동합니다.
- 할 일은 할 일 목록 안에서만 이동 가능하고, 완료된 할 일은 완료된 할 일 목록 안에서만 이동 가능합니다.
- 스와이프 제스처와 드래그앤드롭이 동시에 작동할 수 있지만, 수직 드래그는 드래그앤드롭으로, 수평 스와이프는 선택 기능으로 구분됩니다.

---

**참고 문서**:
- `docs/issues/planner/Mile1-UserFeedback(1).md` - 사용자 피드백 #6
- `docs/Milestone-1.md` - Milestone 1 진행 상황
- `docs/devGuideLine.md` - 개발 가이드라인

**작성일**: 2024년  
**마지막 업데이트**: 2024년 12월 1일  
**완료일**: 2024년 12월 1일

