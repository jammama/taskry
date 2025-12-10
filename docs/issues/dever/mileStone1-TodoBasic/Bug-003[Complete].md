**[Assignee]:** @AI_Dever

**[Issue]:** #Bug-003 (삭제 모드 취소 시 Task 위치가 복원되지 않는 버그)

**[Feature Name]:** 삭제 모드 취소 시 transform 스타일 복원

**[Milestone]:** Milestone 1: Planning Mode 기본 구현

---

## 📖 버그 개요

### 문제
삭제 모드에서 Cancel 버튼을 누르면 모든 선택이 풀리지만, 선택되었던 Task들의 Div 위치가 `transform: translateX(-40px)` 상태로 고정되어 원래 위치로 복원되지 않습니다.

### 재현 방법
1. Task를 스와이프하여 선택 모드 진입
2. 하나 이상의 Task를 선택 (선택된 Task는 -10px로 이동)
3. SelectionBar의 Cancel 버튼 클릭
4. 선택은 해제되지만 Task의 위치가 -10px 상태로 고정됨

### 예상 동작
- Cancel 버튼 클릭 시 선택 해제와 함께 모든 Task가 원래 위치(translateX(0))로 복원되어야 함

---

## 🎯 버그 원인 분석

### 현재 코드 동작
- `clearSelection()` 함수는 `selectedIds` Set만 클리어함
- `isSelected(task.id)`가 false가 되면 스타일이 제거되어야 하지만, CSS transition이나 반응성 문제로 제대로 복원되지 않음

### 문제 위치
- `src/lib/components/PlanningMode.svelte`의 `clearSelection()` 함수
- Task 항목의 `style` 바인딩 로직 (line 292-310)

---

## 🔧 해결 방안

### 방법 1: clearSelection에서 강제 리렌더링
`clearSelection()` 함수에서 선택 해제 후 강제로 리렌더링을 트리거하여 스타일이 제거되도록 함.

### 방법 2: 스타일 바인딩 로직 개선
`isSelected(task.id)`가 false일 때 명시적으로 `transform: translateX(0)`을 반환하도록 수정.

### 방법 3: 애니메이션 transition 추가
CSS transition을 활용하여 선택 해제 시 부드럽게 원래 위치로 복원되도록 함.

---

## 🎨 UI/UX 명세

### 수정 후 동작
- Cancel 버튼 클릭 → 선택 해제 + 모든 Task가 부드럽게 원래 위치로 복원
- 복원 애니메이션: 0.3s cubic-bezier 전환 효과

---

## 📝 작업 내역

### [날짜] - 작업 시작
- 버그 이슈 생성 및 원인 분석

---

**참고 문서**:
- `docs/issues/dever/Fix-005.md` - 삭제 애니메이션 조정 (관련)
- `src/lib/components/PlanningMode.svelte` - 문제 발생 위치

