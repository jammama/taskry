**[Assignee]:** @AI_Dever

**[Issue]:** #CodeClean-001 (스와이프 제스처 로직 유틸 함수 분리)

**[Feature Name]:** 스와이프 제스처 관련 코드를 별도 유틸 함수로 리팩토링

**[Milestone]:** Milestone 1: Planning Mode 기본 구현

---

## 📖 리팩토링 개요

### 목적
`PlanningMode.svelte`에서 스와이프 제스처 관련 코드가 많은 영역을 차지하고 있으며, 해당 내용은 로직보다는 '유틸 기능'에 가깝기 때문에 별도의 JS 유틸 함수로 분리하여 코드 가독성과 재사용성을 향상시킵니다.

### 사용자 스토리
- **As a** 개발자
- **I want** 스와이프 제스처 로직이 별도 유틸 함수로 분리된 것
- **So that** PlanningMode.svelte가 더 간결해지고, 스와이프 로직을 다른 컴포넌트에서도 재사용할 수 있다

---

## 🎯 리팩토링 요구사항

### 핵심 작업
1. 스와이프 제스처 관련 상태 관리 로직을 유틸 함수로 분리
2. 스와이프 제스처 이벤트 핸들러를 유틸 함수로 분리
3. 수평/수직 스와이프 감지 로직을 유틸 함수로 분리
4. PlanningMode.svelte에서 분리된 유틸 함수 사용하도록 수정

### 상세 요구사항
- **파일 생성**: `src/lib/utils/swipeGesture.js` 생성
- **분리할 기능**:
  - 스와이프 상태 관리 (시작 좌표, 현재 좌표, 스와이프 중 여부 등)
  - 터치/마우스 이벤트 처리 (touchstart, touchmove, touchend, mousedown, mousemove, mouseup)
  - 수평 스와이프 감지 로직 (삭제 선택 모드)
  - 수직 스와이프 감지 로직 (순서 변경 모드)
  - 방향 감지 로직 (horizontal vs vertical)
  - 스와이프 임계값 체크 로직
- **인터페이스 설계**:
  - 스와이프 제스처 상태를 반환하는 함수
  - 이벤트 핸들러를 생성하는 함수
  - 스와이프 콜백을 받아 처리하는 함수
- **PlanningMode.svelte 수정**:
  - 분리된 유틸 함수 import
  - 기존 스와이프 관련 코드 제거
  - 유틸 함수를 사용하도록 리팩토링

---

## 🎨 코드 구조 명세

### 유틸 함수 구조
```javascript
// src/lib/utils/swipeGesture.js

/**
 * 스와이프 제스처 상태 관리 클래스 또는 함수
 */
export function createSwipeGestureHandler(options) {
  // options: {
  //   onSwipeStart: (taskId, direction) => void,
  //   onSwipeMove: (taskId, deltaX, deltaY) => void,
  //   onSwipeEnd: (taskId, direction, deltaX) => void,
  //   horizontalThreshold: number, // 기본값: 30
  //   verticalThreshold: number, // 기본값: taskHeight * 0.45
  //   directionDetectionThreshold: number // 기본값: 5
  // }
  
  // 상태 관리
  // 이벤트 핸들러 반환
  return {
    handleStart: (event, taskId, element) => void,
    handleMove: (event, taskId) => void,
    handleEnd: (event, taskId) => void,
    reset: () => void
  };
}
```

### PlanningMode.svelte 변경 사항
- 스와이프 관련 상태 변수 제거 또는 최소화
- 스와이프 관련 함수들을 유틸 함수 호출로 대체
- 이벤트 바인딩은 유지하되, 핸들러 내부 로직은 유틸 함수 사용

---

## 🔧 기술 명세

### 분리 대상 코드
1. **상태 변수** (PlanningMode.svelte 내):
   - `swipeStartX`, `swipeStartY`, `swipeCurrentX`, `swipeCurrentY`
   - `isSwiping`, `swipingId`
   - `isHorizontalSwiping`, `initialDragDirection`
   - `verticalSwipeStartY`, `verticalSwipeTaskId`, `verticalSwipeTaskHeight`, `verticalSwipeCurrentY`, `isVerticalSwiping`, `verticalSwipeThreshold`

2. **함수들** (PlanningMode.svelte 내):
   - `handleTouchStart(event, taskId, element)`
   - `handleTouchMove(event, taskId)`
   - `handleTouchEnd(event, taskId)`
   - `handleMouseDown(event, taskId)`
   - `handleMouseMove(event, taskId)`
   - `handleMouseUp(event, taskId)`
   - `handleMouseLeave(event, taskId)`
   - `handleVerticalSwipeReorder(taskId, currentY)` (일부 로직은 PlanningMode에 유지 가능)

### 유지할 코드
- `selectedIds` 관리 (PlanningMode의 비즈니스 로직)
- `handleVerticalSwipeReorder`의 순서 변경 로직 (PlanningMode의 비즈니스 로직)
- 이벤트 바인딩 (`on:touchstart`, `on:mousedown` 등)

---

## 📝 작업 내역

### [날짜] - 작업 시작
- 리팩토링 이슈 생성 및 요구사항 정의

---

## 작업 완료 내역

### 변경 사항
- `src/lib/utils/swipeGesture.js`: 스와이프 제스처 유틸 함수 생성
- `src/lib/components/PlanningMode.svelte`: 스와이프 로직을 유틸 함수로 리팩토링

### 주요 수정 사항
1. **스와이프 제스처 유틸 함수 생성**
   - `createSwipeGestureHandler` 함수 생성
   - 가로/세로 스와이프 감지 로직 구현
   - 수평 스와이프(삭제 선택) 및 수직 스와이프(순서 변경) 지원

2. **PlanningMode.svelte 리팩토링**
   - 스와이프 관련 상태 변수 제거 (유틸 함수 내부로 이동)
   - 스와이프 이벤트 핸들러를 유틸 함수 래퍼로 변경
   - 비즈니스 로직(선택/해제, 순서 변경)은 PlanningMode에 유지
   - 반응형 상태 추적을 위한 `updateSwipeState` 함수 추가

3. **코드 구조 개선**
   - 스와이프 제스처 로직과 비즈니스 로직 분리
   - 재사용 가능한 유틸 함수로 분리
   - 코드 가독성 향상

### 코드 변경 내역
- **추가된 파일**:
  - `src/lib/utils/swipeGesture.js`: 스와이프 제스처 유틸 함수
- **수정된 파일**:
  - `src/lib/components/PlanningMode.svelte`: 스와이프 로직을 유틸 함수로 대체

### 리팩토링 효과
- 코드 가독성 향상 (스와이프 로직과 비즈니스 로직 분리)
- 재사용성 향상 (다른 컴포넌트에서도 스와이프 제스처 사용 가능)
- 유지보수성 향상 (스와이프 로직 변경 시 한 곳만 수정)
- PlanningMode.svelte 코드 라인 수 감소

---

**참고 문서**:
- `src/lib/utils/taskClassifier.js` - 유틸 함수 예시
- `src/lib/components/PlanningMode.svelte` - 리팩토링 대상 파일
- `docs/issues/dever/Fix-001[Complete].md` - 스와이프 제스처 구현 내역
- `docs/issues/dever/Bug-004[Complete].md` - 스와이프와 드래그 구분 로직

**작성일**: 2024년  
**마지막 업데이트**: 2024년 12월 1일  
**완료일**: 2024년 12월 1일
