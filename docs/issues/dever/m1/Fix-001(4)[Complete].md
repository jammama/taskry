**[Assignee]:** @AI_Dever

**[Issue]:** #Fix-001(4) (하단 선택 바 구현)

**[Feature Name]:** 선택 상태 표시 및 삭제/취소 액션 바

**[Milestone]:** Milestone 1: 기본 ToDo CRUD 기능

**[Parent Issue]:** Fix-001 (삭제 기능 UI/UX 개선)

---

## 📖 기능 개요

### 목적
선택된 할 일이 있을 때 하단에 고정된 선택 바를 표시합니다. 선택된 할 일 개수를 표시하고, Delete와 Cancel 버튼을 제공하여 일괄 삭제 또는 선택 해제를 수행할 수 있도록 합니다.

### 사용자 스토리
- **As a** 사용자
- **I want** 선택된 할 일 개수와 삭제/취소 버튼이 하단에 표시되는 기능
- **So that** 선택된 할 일을 한 번에 삭제하거나 선택을 취소할 수 있다

---

## 🎯 기능 요구사항

### 핵심 기능
1. 선택된 할 일이 있을 때만 선택 바 표시
2. "N Tasks Selected" 텍스트 표시 (N은 선택된 개수)
3. Delete 버튼: 선택된 모든 할 일 삭제
4. Cancel 버튼: 모든 선택 해제
5. 하단 고정 위치 (slide up 애니메이션)

### 상세 요구사항
- **조건부 표시**: `{#if getSelectedCount() > 0}`
- **선택 개수**: `getSelectedCount()` 함수 사용
- **Delete 버튼**: 핑크 네온 글로우, `deleteSelected()` 함수 호출
- **Cancel 버튼**: 시안 네온 글로우, `clearSelection()` 함수 호출
- **위치**: `position: fixed`, `bottom: 0`, `left: 50%`, `transform: translateX(-50%)`
- **애니메이션**: `slide` transition (axis: 'y', duration: 300ms)
- **디자인**: `assets/delete.png` 참조

---

## 🎨 UI/UX 명세

### 화면 구성
- 하단에 고정된 선택 바
- 왼쪽: "N Tasks Selected" (N은 핑크 색상 강조)
- 오른쪽: Delete 버튼 (핑크), Cancel 버튼 (시안)

### 인터랙션
- Delete 버튼 클릭 → 선택된 모든 할 일 삭제 후 선택 해제
- Cancel 버튼 클릭 → 모든 선택 해제 (할 일은 유지)

### 애니메이션
- 선택 바 등장: slide up 애니메이션
- 버튼 호버: 크기 확대 + 글로우 강화

---

## 🔗 관련 이슈

- **부모 이슈**: Fix-001 (삭제 기능 UI/UX 개선)
- **이전 단계**: Fix-001(3) (선택된 할 일의 시각적 효과 구현)
- **다음 단계**: Fix-001(5) (구겨진 느낌 효과 구현)

---

## 📝 작업 내역

### [날짜] - 작업 시작
- 이슈 생성 및 요구사항 정의

---

## 개발 가이드

### 구현 순서
1. `deleteSelected()` 함수 구현: 선택된 모든 할 일 삭제
2. `clearSelection()` 함수 구현: 모든 선택 해제
3. 선택 바 UI 구조 작성 (`.selection-bar`, `.selection-info`, `.selection-actions`)
4. 선택 바 스타일 정의 (핑크/시안 네온 글로우)
5. `slide` transition 적용
6. `+page.svelte`의 `overflow: visible` 확인 (선택 바 노출을 위해)

### 주의사항
- 버튼 텍스트: "Delete", "Cancel" (대괄호 없이)
- 선택 바는 `planning-screen-wrapper` 밖에 배치
- z-index: 1000으로 설정하여 다른 요소 위에 표시
- 글래스모피즘 효과 유지

---

**작성일**: 2024년 12월 1일  
**마지막 업데이트**: 2024년 12월 1일
