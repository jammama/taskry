**[Assignee]:** @AI_Dever

**[Issue]:** #Fix-001(3) (선택된 할 일의 시각적 효과 구현)

**[Feature Name]:** 예비 삭제 상태 시각적 표시

**[Milestone]:** Milestone 1: 기본 ToDo CRUD 기능

**[Parent Issue]:** Fix-001 (삭제 기능 UI/UX 개선)

---

## 📖 기능 개요

### 목적
예비 삭제 상태로 선택된 할 일을 시각적으로 명확하게 표시합니다. 선택된 할 일은 왼쪽으로 밀려나고, 오른쪽에 X 아이콘이 표시되며, 배경색과 테두리로 강조됩니다.

### 사용자 스토리
- **As a** 사용자
- **I want** 선택된 할 일이 시각적으로 명확하게 표시되는 기능
- **So that** 어떤 할 일이 삭제 예정인지 쉽게 알 수 있다

---

## 🎯 기능 요구사항

### 핵심 기능
1. 선택된 할 일을 왼쪽으로 40px 이동 (`translateX(-40px)`)
2. 선택된 할 일의 오른쪽에 X 아이콘 표시
3. 선택된 할 일의 배경색 및 테두리 강조
4. 투명도 감소로 비활성화된 느낌 표현

### 상세 요구사항
- **위치 이동**: `transform: translateX(-40px)`
- **X 아이콘**: 오른쪽에 배치 (`right: -35px`), 핑크 색상, 펄스 애니메이션
- **배경 강조**: `background: rgba(255, 107, 157, 0.1)`
- **테두리 강조**: `border-right: 3px solid #ff6b9d`
- **투명도**: `opacity: 0.85`
- **조건부 렌더링**: `{#if isSelected(task.id)}` 블록 사용

---

## 🎨 UI/UX 명세

### 화면 구성
- 선택된 할 일은 왼쪽으로 40px 이동
- 오른쪽에 X 아이콘이 나타남 (펄스 애니메이션)
- 핑크 배경 및 오른쪽 테두리로 강조

### 애니메이션
- 선택 시 부드러운 전환 효과 (`transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)`)
- X 아이콘 펄스 애니메이션 (`pulse-glow`)

### 디자인 참고
- `assets/delete.png` 파일 참조
- 선택된 할 일의 오른쪽 가장자리에 X 아이콘 표시

---

## 🔗 관련 이슈

- **부모 이슈**: Fix-001 (삭제 기능 UI/UX 개선)
- **이전 단계**: Fix-001(2) (선택 상태 관리 시스템 구현)
- **다음 단계**: Fix-001(4) (하단 선택 바 구현)

---

## 📝 작업 내역

### [날짜] - 작업 시작
- 이슈 생성 및 요구사항 정의

---

## 작업 완료 내역

### 변경 사항
- `src/lib/components/PlanningMode.svelte`: 선택된 할 일의 시각적 효과 구현

### 주요 수정 사항
1. **li 요소에 조건부 클래스 추가**
   - `class:selected={isSelected(task.id)}` 추가
   - 선택된 할 일에 `selected` 클래스가 자동으로 적용됨

2. **X 아이콘 컴포넌트 추가**
   - `{#if isSelected(task.id)}` 블록으로 조건부 렌더링
   - SVG X 아이콘 (24x24px, stroke-width 2.5)
   - 오른쪽에 배치 (`right: -35px`)

3. **li.selected CSS 클래스 스타일 정의**
   - `transform: translateX(-40px)`: 왼쪽으로 40px 이동
   - `opacity: 0.85`: 투명도 감소로 비활성화된 느낌
   - `background: rgba(255, 107, 157, 0.1)`: 핑크 배경 강조
   - `border-right: 3px solid #ff6b9d`: 오른쪽 테두리 강조
   - `transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)`: 부드러운 전환 효과

4. **delete-indicator 스타일 및 펄스 애니메이션**
   - `position: absolute`, `right: -35px`: 오른쪽에 배치
   - `color: #ff6b9d`: 핑크 색상
   - `text-shadow: 0 0 10px #ff6b9d`: 네온 글로우 효과
   - `@keyframes pulse-glow`: 펄스 애니메이션 (1.5s, ease-in-out, infinite)
     - 0%, 100%: opacity 0.8, scale(1)
     - 50%: opacity 1, scale(1.1)

### 테스트 결과
- ✅ 선택된 할 일이 왼쪽으로 40px 이동 확인
- ✅ 선택된 할 일의 오른쪽에 X 아이콘 표시 확인
- ✅ 핑크 배경 및 오른쪽 테두리 강조 확인
- ✅ 투명도 감소로 비활성화된 느낌 확인
- ✅ 선택 시 부드러운 전환 효과 확인
- ✅ X 아이콘 펄스 애니메이션 확인
- ✅ 다크 모드 + 네온 테마 유지 확인

### 코드 변경 내역
- **추가된 코드**:
  - `li` 요소에 `class:selected={isSelected(task.id)}` 조건부 클래스
  - `{#if isSelected(task.id)}` 블록으로 X 아이콘 조건부 렌더링
  - `.delete-indicator` 스타일 및 SVG X 아이콘
  - `li.selected` CSS 클래스 스타일
  - `@keyframes pulse-glow` 애니메이션

---

## 개발 가이드

### 구현 순서
1. `li.selected` CSS 클래스 스타일 정의
2. X 아이콘 컴포넌트 추가 (`.delete-indicator`)
3. 조건부 렌더링: `{#if isSelected(task.id)}` 블록
4. 펄스 애니메이션 키프레임 정의
5. 다크 모드 + 네온 테마 유지

### 주의사항
- `translateX(-40px)`로 왼쪽 이동 (음수 값)
- X 아이콘은 오른쪽에 배치 (`right: -35px`)
- 오른쪽 테두리 강조 (`border-right`)
- 다크 모드 + 네온 테마 완전 유지

---

**작성일**: 2024년 12월 1일  
**마지막 업데이트**: 2024년 12월 1일  
**완료일**: 2024년 12월 1일
