**[Assignee]:** @AI_Dever

**[Issue]:** #Fix-005 (삭제 애니메이션 조정)

**[Feature Name]:** 삭제 시 밀림 정도 조정 및 clip-path 제거

**[Milestone]:** Milestone 1: Planning Mode 기본 구현

---

## 📖 기능 개요

### 목적
삭제 애니메이션의 밀림 정도를 -40px에서 -10px로 줄이고, clip-path를 제거하여 더 부드럽고 자연스러운 삭제 애니메이션을 제공합니다.

### 사용자 스토리
- **As a** 사용자
- **I want** 삭제 시 과도하게 밀리지 않고, clip-path로 잘리지 않는 자연스러운 애니메이션
- **So that** 삭제 동작이 더 부드럽고 시각적으로 편안하다

---

## 🎯 기능 요구사항

### 핵심 기능
1. 삭제 시 밀림 정도 조정 (-40px → -10px)
2. clip-path 제거 검토 및 제거
3. 삭제 애니메이션 부드러움 개선

### 상세 요구사항
- 밀림 정도: -40px → -10px로 변경
- clip-path 제거: 약간 밀리는 정도면 미관 해치지 않으므로 제거
- 애니메이션 타이밍 조정으로 부드러움 개선

---

## 🎨 UI/UX 명세

### 화면 구성
- 스와이프 중: Task가 왼쪽으로 -10px 정도만 밀림
- clip-path 없이 자연스러운 삭제 애니메이션

### 인터랙션
- 스와이프 → Task가 왼쪽으로 -10px 밀림
- 삭제 완료 → 부드러운 fade-out 애니메이션

---

## 📝 작업 내역

### [날짜] - 작업 시작
- 이슈 생성 및 요구사항 정의

---

## 작업 완료 내역

### 변경 사항
- `src/lib/components/PlanningMode.svelte`: 삭제 애니메이션 조정 (밀림 정도 -40px → -10px, clip-path 제거)

### 주요 수정 사항
1. **삭제 시 밀림 정도 조정 (-40px → -10px)**
   - 선택된 할 일의 `transform: translateX(-40px)` → `transform: translateX(-10px)`로 변경
   - 스와이프 중인 항목은 실시간 위치 업데이트 유지 (clip-path 제거)

2. **clip-path 제거**
   - 스와이프 중인 항목: `clip-path: inset(0 0 0 ${clipLeft}px)` 제거
   - 선택된 할 일: `clip-path: inset(0 0 0 40px)` 제거
   - `li.selected` CSS에서 `overflow: hidden` 제거
   - `li.clipped` 클래스 및 관련 CSS 완전 제거 (네온 글로우 효과 포함)
   - `@keyframes glow-pulse` 애니메이션 제거
   - `class:clipped` 조건부 클래스 제거

3. **삭제 애니메이션 부드러움 개선**
   - `li.selected` transition에서 `clip-path` 제거
   - `transform`, `opacity`, `background`만 transition 적용
   - `cubic-bezier(0.4, 0, 0.2, 1)` easing 유지로 부드러운 전환 효과

### 테스트 결과
- ✅ 삭제 시 밀림 정도가 -10px로 조정되었는지 확인
- ✅ clip-path가 완전히 제거되었는지 확인
- ✅ 스와이프 중 애니메이션이 자연스럽게 작동하는지 확인
- ✅ 선택된 할 일의 애니메이션이 부드럽게 작동하는지 확인
- ✅ clip-path 제거로 인한 레이아웃 문제 없음 확인
- ✅ 애니메이션 타이밍이 부드럽게 작동하는지 확인

### 코드 변경 내역
- **제거된 코드**:
  - `clip-path: inset(0 0 0 ${clipLeft}px)` (스와이프 중)
  - `clip-path: inset(0 0 0 40px)` (선택된 할 일)
  - `overflow: hidden` (li.selected)
  - `class:clipped` 조건부 클래스
  - `li.clipped` CSS 클래스 및 `::before` pseudo-element
  - `@keyframes glow-pulse` 애니메이션
  - `clip-path 0.3s` transition 속성
- **수정된 코드**:
  - 선택된 할 일: `transform: translateX(-40px)` → `transform: translateX(-10px)`
  - 스와이프 중: clip-path 제거, transform만 적용
  - `li.selected` transition: clip-path 제거

### UI/UX 개선 효과
- 더 자연스러운 삭제 애니메이션 (과도한 밀림 제거)
- 깔끔한 시각적 효과 (clip-path 제거로 복잡도 감소)
- 부드러운 전환 효과 (애니메이션 타이밍 최적화)
- 더 직관적인 사용자 경험 (약간의 밀림으로 삭제 의도만 표시)

---

**참고 문서**:
- `docs/issues/planner/Mile1-UserFeedback(1).md` - 사용자 피드백 #2
- `docs/Milestone-1.md` - Milestone 1 진행 상황
- `docs/devGuideLine.md` - 개발 가이드라인

**작성일**: 2024년  
**마지막 업데이트**: 2024년 12월 1일  
**완료일**: 2024년 12월 1일

