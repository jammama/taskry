**[Assignee]:** @AI_Dever

**[Issue]:** #Bug-004 (수직 스와이프로 순서 변경 기능 작동 불안정)

**[Feature Name]:** 수직 스와이프로 Task 순서 변경 기능 안정화

**[Milestone]:** Milestone 1: Planning Mode 기본 구현

---

## 📖 버그 개요

### 문제
수직 스와이프로 Task 순서를 변경하는 기능이 불안정하게 작동합니다. 스와이프 중에 멈춰버리거나, 드래그가 되다가 말거나, 순서 변경이 제대로 반영되지 않는 문제가 발생합니다.

### 재현 방법
1. Task를 위/아래로 스와이프하여 순서 변경 시도
2. 스와이프 중간에 멈춤 또는 드래그가 중단됨
3. 순서 변경이 제대로 반영되지 않음

### 예상 동작
- Task를 위/아래로 스와이프하면 부드럽게 순서가 변경되어야 함
- 스와이프 중간에 멈추지 않고 끝까지 동작해야 함
- 순서 변경이 즉시 반영되어야 함

---

## 🎯 기능 명세

### 핵심 동작 방식

#### 1. 수직 스와이프 감지
- **방향 감지**: 수직 이동이 수평 이동보다 5px 이상 크면 수직 스와이프로 인식
- **즉시 활성화**: 방향이 감지되면 즉시 수직 스와이프 모드로 전환 (45% 임계값 없이)

#### 2. 순서 변경 로직
- **실시간 감지**: 스와이프 중 마우스/터치 위치를 실시간으로 추적
- **드롭 위치 계산**: 현재 위치가 다른 Task의 중앙을 넘었는지 확인
  - 위로 이동: 현재 위치가 다른 Task의 중앙보다 위에 있고, 그 Task가 원래 위치보다 위에 있으면 교체
  - 아래로 이동: 현재 위치가 다른 Task의 중앙보다 아래에 있고, 그 Task가 원래 위치보다 아래에 있으면 교체
- **즉시 반영**: 드롭 위치가 변경되면 즉시 순서 업데이트 (디바운싱 최소화 또는 제거)

#### 3. 시각적 피드백
- **드래그 중인 Task**: 약간 투명하게 표시 (opacity: 0.7)
- **드롭 위치 표시**: 드롭될 위치에 시각적 가이드 표시 (예: 구분선 또는 배경색 변경)
- **부드러운 애니메이션**: 순서 변경 시 다른 Task들이 부드럽게 이동

#### 4. 이벤트 처리
- **터치 이벤트**: `touchstart`, `touchmove`, `touchend` 모두 처리
- **마우스 이벤트**: `mousedown`, `mousemove`, `mouseup` 모두 처리
- **이벤트 차단**: 수직 스와이프 중에는 `preventDefault()`, `stopPropagation()` 호출하여 다른 이벤트 차단
- **스크롤 방지**: 수직 스와이프 중에는 페이지 스크롤 방지

---

## 🔧 상세 구현 요구사항

### 1. 수직 스와이프 감지 개선
```javascript
// swipeGesture.js에서 수직 스와이프 감지 시 즉시 활성화
if (absDeltaY > absDeltaX && absDeltaY > directionDetectionThreshold) {
    initialDragDirection = 'vertical';
    isVerticalSwiping = true; // 즉시 활성화 (45% 조건 제거)
    event.preventDefault();
    event.stopPropagation();
    // 드래그앤드롭 비활성화 플래그 설정
}
```

### 2. 순서 변경 로직 개선
```javascript
// handleVerticalSwipeReorder 함수 개선
function handleVerticalSwipeReorder(taskId, currentY) {
    // 디바운싱 제거 또는 최소화 (50ms 이하)
    // 실시간으로 드롭 위치 계산
    // 드롭 위치가 변경되면 즉시 순서 업데이트
    
    // 모든 Task 요소의 위치 확인
    const taskElements = document.querySelectorAll('.task-list ul li');
    const currentIndex = activeTodos.findIndex(t => t.id === taskId);
    
    // 현재 위치 기준으로 가장 가까운 드롭 위치 찾기
    let targetIndex = currentIndex;
    for (let i = 0; i < taskElements.length; i++) {
        if (i === currentIndex) continue;
        const rect = taskElements[i].getBoundingClientRect();
        const taskCenterY = rect.top + rect.height / 2;
        
        // 현재 위치가 다른 Task의 중앙을 넘었는지 확인
        if (currentY < taskCenterY && i < currentIndex) {
            targetIndex = i;
            break;
        } else if (currentY > taskCenterY && i > currentIndex) {
            targetIndex = i;
        }
    }
    
    // 순서 변경이 필요한 경우 즉시 업데이트
    if (targetIndex !== currentIndex) {
        // 순서 업데이트 로직
    }
}
```

### 3. 이벤트 처리 개선
- **touchmove/mousemove**: 수직 스와이프 중에는 항상 `preventDefault()`, `stopPropagation()` 호출
- **touchend/mouseup**: 스와이프 종료 시 상태 초기화
- **mouseleave**: 마우스가 Task 밖으로 나가도 스와이프 계속 추적

### 4. 상태 관리 개선
- **원래 인덱스 추적**: 스와이프 시작 시 원래 인덱스 저장
- **현재 인덱스 업데이트**: 순서 변경 후 현재 인덱스 업데이트
- **드롭 위치 추적**: 현재 드롭될 위치를 실시간으로 추적

---

## 🎨 UI/UX 명세

### 시각적 피드백
- **드래그 중인 Task**:
  - `opacity: 0.7` (약간 투명)
  - `transform: translateY(현재 위치)` (실제 위치 반영)
  - `z-index: 1000` (다른 Task 위에 표시)
  
- **드롭 위치 표시**:
  - 드롭될 위치에 구분선 표시 (예: `border-top: 2px dashed #00ff00`)
  - 또는 드롭될 위치의 Task에 배경색 변경

- **다른 Task 애니메이션**:
  - 순서 변경 시 다른 Task들이 부드럽게 이동 (`transition: transform 0.2s`)

### 인터랙션
- **수직 스와이프 시작**: Task를 위/아래로 드래그 시작
- **순서 변경**: 드래그 중 다른 Task의 중앙을 넘으면 즉시 순서 변경
- **스와이프 종료**: 손가락/마우스를 떼면 최종 위치에 고정

---

## 🔍 문제 원인 분석

### 현재 문제점
1. **45% 임계값 조건**: 수직 스와이프가 45% 이상 나가야 활성화되어 중간에 멈춤
2. **디바운싱 지연**: 100ms 디바운싱으로 인해 순서 변경이 지연됨
3. **이벤트 처리 불완전**: 일부 이벤트에서 `preventDefault()`가 누락되어 스크롤 등과 충돌
4. **순서 변경 로직 복잡도**: 드롭 위치 계산 로직이 복잡하여 실시간 반영이 어려움

---

## 📝 작업 내역

### [날짜] - 작업 시작
- 버그 이슈 생성 및 기능 명세 정의

---

**참고 문서**:
- `src/lib/utils/swipeGesture.js` - 스와이프 제스처 유틸 함수
- `src/lib/components/PlanningMode.svelte` - 문제 발생 위치
- `docs/issues/dever/CodeClean-001[Complete].md` - 스와이프 유틸 분리

**작성일**: 2024년  
**마지막 업데이트**: 2024년
