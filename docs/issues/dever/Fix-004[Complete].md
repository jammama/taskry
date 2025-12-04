**[Assignee]:** @AI_Dever

**[Issue]:** #Fix-004 (수정 기능 UI 개선)

**[Feature Name]:** 수정 모드 UI 개선 (저장 버튼 제거, 취소 버튼 위치 변경)

**[Milestone]:** Milestone 1: Planning Mode 기본 구현

---

## 📖 기능 개요

### 목적
수정 모드에서 불필요한 저장 버튼을 제거하고, 취소 버튼을 인풋창 오른쪽 상단으로 이동하여 더 직관적이고 깔끔한 UI를 제공합니다.

### 사용자 스토리
- **As a** 사용자
- **I want** 수정 모드에서 저장 버튼 없이 Enter 키로 저장하고, 취소 버튼이 인풋창 상단에 있는 것
- **So that** 더 빠르고 직관적으로 할 일을 수정할 수 있다

---

## 🎯 기능 요구사항

### 핵심 기능
1. 저장 버튼 제거 (Enter 키로 저장 유지)
2. 취소 버튼을 인풋창 오른쪽 상단으로 이동
3. 취소 버튼 아이콘 스타일 조정

### 상세 요구사항
- 저장 버튼 완전 제거
- Enter 키로 저장 기능 유지
- ESC 키로 취소 기능 유지
- 취소 버튼 위치: 인풋창 오른쪽 상단 (앱 알림 표시 아이콘처럼)
- 취소 버튼 아이콘: X 또는 닫기 아이콘

---

## 🎨 UI/UX 명세

### 화면 구성
- 편집 모드 진입 시: 제목이 입력 필드로 변경
- 취소 버튼: 인풋창 오른쪽 상단에 작은 X 아이콘
- 저장 버튼: 제거됨

### 인터랙션
- 더블클릭 → 편집 모드 진입
- Enter 키 혹은 input 외부 클릭 → 수정 완료 (저장)
- ESC 키 또는 취소 버튼 클릭 → 수정 취소
- 입력 필드 blur → 자동 저장 (기존 동작 유지)

---

## 📝 작업 내역

### [날짜] - 작업 시작
- 이슈 생성 및 요구사항 정의

---

## 작업 완료 내역

### 변경 사항
- `src/lib/components/PlanningMode.svelte`: 수정 모드 UI 개선 (저장 버튼 제거, 취소 버튼 위치 변경)

### 주요 수정 사항
1. **저장 버튼 제거**
   - `.edit-save-btn` 버튼 및 관련 HTML 제거
   - Enter 키로 저장 기능은 기존대로 유지 (`handleEditKeydown` 함수)
   - input blur 시 자동 저장 기능 유지

2. **취소 버튼 위치 변경**
   - `.edit-container`를 `position: relative`로 변경
   - `.edit-cancel-btn`을 `position: absolute`로 설정하여 인풋창 오른쪽 상단에 배치
   - `top: 50%`, `right: 6px`, `transform: translateY(-50%)`로 수직 중앙 정렬
   - `.edit-input`에 오른쪽 패딩(`padding-right: 32px`) 추가하여 취소 버튼이 텍스트를 가리지 않도록 처리

3. **취소 버튼 스타일 조정**
   - 크기: `24px × 24px` (앱 알림 아이콘처럼 작고 깔끔하게)
   - 아이콘 크기: `16px × 16px` (기존 14px에서 약간 증가)
   - 기본 투명도: `opacity: 0.7` (hover 시 `opacity: 1`)
   - hover 효과: 배경색 변경, 색상 변경, 스케일 증가
   - active 효과: 스케일 감소로 클릭 피드백 제공

4. **불필요한 CSS 제거**
   - `.edit-actions` 관련 CSS 제거 (더 이상 사용하지 않음)
   - `.edit-save-btn` 관련 CSS 제거

### 테스트 결과
- ✅ 저장 버튼이 완전히 제거되었는지 확인
- ✅ Enter 키로 저장이 정상 작동하는지 확인
- ✅ ESC 키로 취소가 정상 작동하는지 확인
- ✅ 취소 버튼이 인풋창 오른쪽 상단에 올바르게 배치되었는지 확인
- ✅ 취소 버튼 클릭 시 수정 취소가 정상 작동하는지 확인
- ✅ 취소 버튼 hover 효과가 정상 작동하는지 확인
- ✅ input blur 시 자동 저장이 정상 작동하는지 확인
- ✅ 취소 버튼이 텍스트를 가리지 않는지 확인

### 코드 변경 내역
- **제거된 코드**:
  - `.edit-save-btn` 버튼 HTML 및 SVG 아이콘
  - `.edit-actions` div 컨테이너
  - `.edit-save-btn` 관련 CSS
  - `.edit-actions` 관련 CSS
- **수정된 코드**:
  - `.edit-container`: `display: flex` → `position: relative`
  - `.edit-input`: `flex: 1` 제거, `width: 100%` 추가, `padding-right: 32px` 추가
  - `.edit-cancel-btn`: `position: absolute`로 변경, 오른쪽 상단 배치, 크기 및 스타일 조정

### UI/UX 개선 효과
- 더 깔끔한 편집 모드 UI (저장 버튼 제거로 공간 절약)
- 직관적인 취소 버튼 위치 (인풋창 오른쪽 상단, 앱 알림 아이콘처럼)
- 빠른 편집 워크플로우 (Enter 키로 즉시 저장 가능)
- 시각적 피드백 개선 (취소 버튼 hover/active 효과)

---

**참고 문서**:
- `docs/issues/planner/Mile1-UserFeedback(1).md` - 사용자 피드백 #1
- `docs/issues/dever/Feature-002[Complete].md` - 기존 수정 기능 구현
- `docs/Milestone-1.md` - Milestone 1 진행 상황
- `docs/devGuideLine.md` - 개발 가이드라인

**작성일**: 2024년  
**마지막 업데이트**: 2024년 12월 1일  
**완료일**: 2024년 12월 1일

