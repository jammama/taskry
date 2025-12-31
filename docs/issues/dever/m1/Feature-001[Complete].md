**[Assignee]:** @AI_Dever

**[Issue]:** #Feature-001 (할 일 삭제 기능)

**[Feature Name]:** 할 일 삭제 (Delete)

**[Milestone]:** Milestone 1: 기본 ToDo CRUD 기능

---

## 📖 기능 개요

### 목적
일반적인 To-Do 앱의 핵심 기능인 CRUD 중 Delete 기능을 구현하여 사용자가 불필요한 할 일을 삭제할 수 있도록 합니다. 이를 통해 사용자는 실수로 추가한 할 일이나 더 이상 필요 없는 할 일을 제거할 수 있습니다.

### 사용자 스토리
- **As a** 사용자
- **I want** 할 일을 삭제할 수 있는 기능
- **So that** 불필요한 할 일을 제거하고 목록을 깔끔하게 관리할 수 있다

---

## 🎯 기능 요구사항

### 핵심 기능
1. 할 일 목록에서 삭제 버튼 표시
2. 삭제 버튼 클릭 시 할 일 삭제
3. IndexedDB에서도 해당 할 일 제거
4. 삭제 후 목록 자동 업데이트

### 상세 요구사항
- 삭제 버튼은 각 할 일 항목에 표시되어야 함
- 삭제 시 즉시 UI에서 제거되어야 함
- IndexedDB에도 변경사항이 반영되어야 함

---

## 🎨 UI/UX 명세

### 화면 구성
- 각 할 일 항목에 삭제 버튼 추가
- 삭제 버튼은 체크 버튼 옆 또는 오른쪽 끝에 배치
- 삭제 버튼은 아이콘(예: ✕, 🗑️) 또는 텍스트로 표시

### 인터랙션
- 사용자가 삭제 버튼 클릭 → 해당 할 일이 목록에서 제거
- 삭제 후 목록이 자동으로 재정렬됨
- 삭제된 할 일은 IndexedDB에서도 제거되어 영구 삭제됨

### 애니메이션
- 삭제 시 fade out 또는 slide out 애니메이션 적용
- Svelte transition을 활용하여 부드러운 제거 효과

---

## 🔗 관련 이슈

- **마일스톤**: Milestone 1: 기본 ToDo CRUD 기능
- **관련 이슈**: Feature-002 (할 일 수정 기능)
- **참고 문서**: 
  - `docs/issues/planner/DetailMileStone.md`
  - `docs/Milestone.md`

---

## 📝 작업 내역

### [날짜] - 작업 시작
- 이슈 생성 및 요구사항 정의

---

## 작업 완료 내역

### 변경 사항
- `src/lib/stores/todoStore.js`: `deleteTodo` 함수 추가
- `src/lib/components/PlanningMode.svelte`: 삭제 버튼 추가 및 삭제 애니메이션 적용

### 주요 수정 사항
1. **deleteTodo 함수 구현**
   - `todoStore.js`에 `deleteTodo` 함수 추가
   - `queueUpdate`를 사용하여 IndexedDB와 동기화
   - ID를 기반으로 할 일을 필터링하여 제거

2. **삭제 버튼 UI 추가**
   - 각 할 일 항목에 삭제 버튼 추가 (체크 버튼 옆)
   - X 아이콘 SVG 사용
   - 호버 시 핑크 색상으로 변경 및 배경 강조
   - 액션 버튼 컨테이너(`.action-buttons`) 추가하여 체크 버튼과 삭제 버튼을 그룹화

3. **삭제 애니메이션 적용**
   - Svelte의 `fade` transition 적용 (300ms duration)
   - `{#each}` 블록에 `(task.id)` 키 지정으로 각 항목을 고유하게 식별
   - 삭제 시 부드러운 fade out 효과

4. **스타일 개선**
   - 삭제 버튼 기본 상태: 반투명 회색
   - 호버 상태: 핑크 색상 + 배경 강조 + 크기 확대
   - 액티브 상태: 크기 축소 효과
   - 다크 모드 + 네온 테마 유지

### 테스트 결과
- ✅ 삭제 버튼이 각 할 일 항목에 정상적으로 표시됨
- ✅ 삭제 버튼 클릭 시 할 일이 즉시 목록에서 제거됨
- ✅ IndexedDB에서도 해당 할 일이 제거되어 영구 삭제됨
- ✅ 삭제 후 목록이 자동으로 재정렬됨
- ✅ 삭제 시 fade out 애니메이션이 부드럽게 작동함
- ✅ 다크 모드 + 네온 테마 유지 확인
- ✅ 호버 효과 및 인터랙션 정상 작동 확인

### 코드 변경 내역
- **추가된 코드**:
  - `todoStore.js`: `deleteTodo` 함수 (117-123번 라인)
  - `PlanningMode.svelte`: `handleDeleteTask` 함수
  - `PlanningMode.svelte`: 삭제 버튼 UI 및 스타일
  - `PlanningMode.svelte`: `.action-buttons` 컨테이너 및 `.delete-btn` 스타일
- **수정된 코드**:
  - `PlanningMode.svelte`: `{#each}` 블록에 키 지정 및 transition 추가
  - `PlanningMode.svelte`: 체크 버튼을 `.action-buttons` 컨테이너로 감쌈

---

**작성일**: 2024년  
**마지막 업데이트**: 2024년 12월 1일
