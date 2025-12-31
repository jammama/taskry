**[Assignee]:** @AI_Dever

**[Issue]:** #Feature-002 (할 일 수정/편집 기능)

**[Feature Name]:** 할 일 수정/편집 (Update - Edit)

**[Milestone]:** Milestone 1: 기본 ToDo CRUD 기능

---

## 📖 기능 개요

### 목적
사용자가 실수로 입력한 할 일이나 내용을 변경해야 하는 할 일을 수정할 수 있도록 합니다. 이를 통해 사용자는 할 일을 삭제하고 다시 추가하는 번거로움 없이 직접 수정할 수 있습니다.

### 사용자 스토리
- **As a** 사용자
- **I want** 할 일의 제목을 수정할 수 있는 기능
- **So that** 실수로 입력한 내용을 쉽게 고칠 수 있다

---

## 🎯 기능 요구사항

### 핵심 기능
1. 할 일 항목에서 수정 모드 진입
2. 인라인 편집을 통한 제목 수정
3. 수정된 내용을 IndexedDB에 저장
4. 수정 후 목록 자동 업데이트

### 상세 요구사항
- 더블클릭 또는 long-tap(오래누르기)으로 편집 모드 진입
- 편집 모드에서는 입력 필드가 활성화됨
- Enter 키 또는 저장 버튼으로 수정 완료
- ESC 키 또는 취소 버튼으로 수정 취소
- 수정 시 카테고리 재분류 여부는 구현 시 결정

---

## 🎨 UI/UX 명세

### 화면 구성
- 각 할 일 항목을 더블클릭 또는 long-tap(오래누르기)으로 편집
- 편집 모드 진입 시: 할 일 제목이 입력 필드로 변경
- 저장/취소 버튼 표시

### 인터랙션
- 더블클릭 또는 long-tap(오래누르기) → 제목이 입력 필드로 변경
- Enter 키 또는 저장 버튼 → 수정 완료
- ESC 키 또는 취소 버튼 → 수정 취소

### 애니메이션
- 편집 모드 진입 시 부드러운 전환 효과
- 저장 시 입력 필드가 다시 텍스트로 전환되는 애니메이션

---

## 🔗 관련 이슈

- **마일스톤**: Milestone 1: 기본 ToDo CRUD 기능
- **관련 이슈**: Feature-001 (할 일 삭제 기능)
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
- `src/lib/stores/todoStore.js`: `updateTodo` 함수 추가
- `src/lib/components/PlanningMode.svelte`: 편집 모드 기능 추가 (더블클릭 편집, 인라인 편집 UI)

### 주요 수정 사항
1. **updateTodo 함수 구현**
   - `todoStore.js`에 `updateTodo` 함수 추가
   - `queueUpdate`를 사용하여 IndexedDB와 동기화
   - 제목 변경 시 카테고리 자동 재분류 (`classifyTask` 함수 사용)
   - 제목이 변경된 경우에만 업데이트하여 불필요한 재분류 방지

2. **편집 모드 상태 관리**
   - `editingId`: 현재 편집 중인 할 일의 ID
   - `editingTitle`: 편집 중인 제목 텍스트
   - `editInputElement`: 입력 필드 참조 (자동 포커스 및 선택)

3. **더블클릭 편집 기능**
   - 할 일 제목을 더블클릭하면 편집 모드 진입
   - 편집 모드 진입 시 입력 필드에 자동 포커스 및 텍스트 선택
   - 제목 호버 시 시안 색상으로 변경하여 편집 가능함을 시각적으로 표시

4. **인라인 편집 UI**
   - 편집 모드 진입 시 제목이 입력 필드로 변경
   - 저장 버튼(체크 아이콘) 및 취소 버튼(X 아이콘) 표시
   - 입력 필드에 네온 글로우 효과 적용
   - 저장/취소 버튼 호버 효과 추가

5. **키보드 단축키 지원**
   - Enter 키: 수정 완료 (저장)
   - ESC 키: 수정 취소
   - 입력 필드 blur 시 자동 저장

6. **카테고리 재분류**
   - 제목 수정 시 `classifyTask` 함수를 사용하여 카테고리 자동 재분류
   - 카테고리 변경 시 XP 값도 자동 재계산
   - UI에 변경된 카테고리 태그 및 XP 배지 자동 반영

### 테스트 결과
- ✅ 할 일 제목 더블클릭 시 편집 모드 진입 확인
- ✅ 편집 모드 진입 시 입력 필드에 자동 포커스 및 텍스트 선택 확인
- ✅ Enter 키로 수정 완료 확인
- ✅ ESC 키로 수정 취소 확인
- ✅ 저장 버튼 클릭으로 수정 완료 확인
- ✅ 취소 버튼 클릭으로 수정 취소 확인
- ✅ 입력 필드 blur 시 자동 저장 확인
- ✅ 수정된 내용이 IndexedDB에 저장되는지 확인
- ✅ 제목 수정 시 카테고리 자동 재분류 확인
- ✅ 다크 모드 + 네온 테마 유지 확인
- ✅ 편집 모드 UI 및 애니메이션 정상 작동 확인

### 코드 변경 내역
- **추가된 코드**:
  - `todoStore.js`: `updateTodo` 함수 (127-152번 라인)
  - `PlanningMode.svelte`: 편집 모드 상태 변수 (`editingId`, `editingTitle`, `editInputElement`)
  - `PlanningMode.svelte`: `startEdit`, `cancelEdit`, `saveEdit`, `handleEditKeydown` 함수
  - `PlanningMode.svelte`: 편집 모드 UI (`.edit-container`, `.edit-input`, `.edit-actions`)
  - `PlanningMode.svelte`: 편집 모드 스타일 (`.edit-container`, `.edit-input`, `.edit-save-btn`, `.edit-cancel-btn`)
- **수정된 코드**:
  - `PlanningMode.svelte`: 제목 표시 부분에 더블클릭 이벤트 및 편집 모드 조건부 렌더링 추가
  - `PlanningMode.svelte`: `.title` 스타일에 호버 효과 추가

---

**작성일**: 2024년  
**마지막 업데이트**: 2024년 12월 1일
