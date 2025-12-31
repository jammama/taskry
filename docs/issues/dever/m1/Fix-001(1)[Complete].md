**[Assignee]:** @AI_Dever

**[Issue]:** #Fix-001(1) (스와이프 제스처 감지 로직 구현)

**[Feature Name]:** 스와이프 제스처 감지 및 기본 처리

**[Milestone]:** Milestone 1: 기본 ToDo CRUD 기능

**[Parent Issue]:** Fix-001 (삭제 기능 UI/UX 개선)

---

## 📖 기능 개요

### 목적
할 일 항목에 스와이프 제스처를 감지하는 로직을 구현합니다. 터치 및 마우스 이벤트를 처리하여 왼쪽/오른쪽 스와이프를 정확히 감지하고, 스와이프 중인 항목의 위치를 실시간으로 업데이트합니다.

### 사용자 스토리
- **As a** 사용자
- **I want** 할 일 항목을 스와이프할 수 있는 기능
- **So that** 모바일 친화적인 방식으로 할 일을 조작할 수 있다

---

## 🎯 기능 요구사항

### 핵심 기능
1. 터치 이벤트 및 마우스 이벤트 지원 (데스크톱/모바일 호환)
2. 왼쪽 스와이프 감지 (임계값: 30px 이상)
3. 오른쪽 스와이프 감지 (임계값: 30px 이상)
4. 편집 모드 중에는 스와이프 비활성화

### 상세 요구사항
- **터치 이벤트**: `touchstart`, `touchmove`, `touchend` 처리
- **마우스 이벤트**: `mousedown`, `mousemove`, `mouseup` 처리 (데스크톱 지원)
- **스와이프 감지 조건**:
  - 수평 이동 거리(`deltaX`)가 10px 이상
  - 수평 이동 거리가 수직 이동 거리(`deltaY`)보다 큼
  - 왼쪽 스와이프: `deltaX < -30px`
  - 오른쪽 스와이프: `deltaX > 30px`
- **실시간 피드백**: 스와이프 중인 항목의 위치를 실시간으로 업데이트하여 시각적 피드백 제공
- **편집 모드 제외**: 편집 중인 할 일은 스와이프 비활성화

---

## 🎨 UI/UX 명세

### 인터랙션
- 사용자가 할 일 항목을 터치/클릭하고 드래그
- 왼쪽으로 드래그 → 스와이프 감지 (임계값 도달 시 선택 상태로 전환)
- 오른쪽으로 드래그 → 스와이프 감지 (임계값 도달 시 선택 해제)
- 스와이프 중인 항목은 실시간으로 위치 이동

### 애니메이션
- 스와이프 중인 항목은 `transform: translateX()`로 실시간 위치 업데이트
- 부드러운 전환 효과 (`transition: transform 0.1s ease-out`)

---

## 🔗 관련 이슈

- **부모 이슈**: Fix-001 (삭제 기능 UI/UX 개선)
- **다음 단계**: Fix-001(2) (선택 상태 관리 시스템 구현)
- **참고 문서**: 
  - `assets/delete.png` (디자인 참고)

---

## 📝 작업 내역

### [날짜] - 작업 시작
- 이슈 생성 및 요구사항 정의

---

## 작업 완료 내역

### 변경 사항
- `src/lib/components/PlanningMode.svelte`: 스와이프 제스처 감지 로직 구현

### 주요 수정 사항
1. **스와이프 상태 변수 선언**
   - `swipeStartX`, `swipeStartY`: 스와이프 시작 위치
   - `swipeCurrentX`, `swipeCurrentY`: 스와이프 현재 위치
   - `isSwiping`: 스와이프 중인지 여부
   - `swipingId`: 현재 스와이프 중인 할 일 ID

2. **터치 이벤트 핸들러 구현**
   - `handleTouchStart`: 터치/마우스 시작 위치 기록, 편집 모드 체크
   - `handleTouchMove`: 스와이프 감지 (수평 이동 10px 이상, 수직보다 큼), 실시간 위치 업데이트
   - `handleTouchEnd`: 스와이프 완료 시 상태 초기화

3. **마우스 이벤트 핸들러 구현** (데스크톱 지원)
   - `handleMouseDown`: 마우스 다운 시 터치 시작과 동일 처리
   - `handleMouseMove`: 마우스 이동 시 스와이프 감지
   - `handleMouseUp`: 마우스 업 시 스와이프 종료
   - `mouseleave`: 마우스가 항목 밖으로 나가면 스와이프 상태 초기화

4. **li 요소에 이벤트 핸들러 연결**
   - 터치 이벤트: `touchstart`, `touchmove`, `touchend`
   - 마우스 이벤트: `mousedown`, `mousemove`, `mouseup`, `mouseleave`
   - `class:swiping` 조건부 클래스 추가

5. **실시간 위치 업데이트**
   - 스와이프 중인 항목의 `style` 속성에 `transform: translateX()` 동적 적용
   - `swipeCurrentX - swipeStartX`로 실시간 위치 계산

6. **CSS 스타일 추가**
   - `li.swiping`: 스와이프 중 부드러운 전환 효과 (`transition: transform 0.1s ease-out`)
   - `cursor: grab`, `cursor: grabbing`: 드래그 가능한 커서 표시
   - `touch-action: pan-y`: 수직 스크롤은 허용, 수평 스와이프는 커스텀 처리
   - `user-select: none`: 텍스트 선택 방지

### 테스트 결과
- ✅ 터치 이벤트로 스와이프 감지 확인
- ✅ 마우스 이벤트로 스와이프 감지 확인 (데스크톱)
- ✅ 수평 스와이프만 인식하고 수직 스크롤과 충돌하지 않음
- ✅ 스와이프 중인 항목이 실시간으로 위치 이동
- ✅ 편집 모드 중 스와이프 비활성화 확인
- ✅ 마우스가 항목 밖으로 나가면 스와이프 상태 초기화 확인

### 코드 변경 내역
- **추가된 코드**:
  - 스와이프 상태 변수 6개 (`swipeStartX`, `swipeStartY`, `swipeCurrentX`, `swipeCurrentY`, `isSwiping`, `swipingId`)
  - 터치 이벤트 핸들러 3개 (`handleTouchStart`, `handleTouchMove`, `handleTouchEnd`)
  - 마우스 이벤트 핸들러 4개 (`handleMouseDown`, `handleMouseMove`, `handleMouseUp`, `mouseleave` 처리)
  - `li` 요소에 이벤트 핸들러 연결 및 `class:swiping` 조건부 클래스
  - 스와이프 중인 항목의 동적 `style` 속성 (`transform: translateX()`)
  - CSS 스타일: `.swiping` 클래스, `cursor`, `touch-action`, `user-select`

---

## 개발 가이드

### 구현 순서
1. 스와이프 상태 변수 선언 (`swipeStartX`, `swipeStartY`, `swipeCurrentX`, `swipeCurrentY`, `isSwiping`, `swipingId`)
2. `handleTouchStart` 함수 구현: 터치/마우스 시작 위치 기록
3. `handleTouchMove` 함수 구현: 스와이프 감지 및 실시간 위치 업데이트
4. `handleTouchEnd` 함수 구현: 스와이프 완료 시 선택/해제 처리 (다음 단계에서 구현)
5. `li` 요소에 이벤트 핸들러 연결
6. 스와이프 중인 항목의 `style` 속성에 `transform: translateX()` 적용

### 주의사항
- 편집 모드 중에는 스와이프 비활성화
- 수직 스크롤과 충돌하지 않도록 수평 스와이프만 인식
- 스와이프 상태 초기화는 `handleTouchEnd`에서 처리

---

**작성일**: 2024년 12월 1일  
**마지막 업데이트**: 2024년 12월 1일  
**완료일**: 2024년 12월 1일
