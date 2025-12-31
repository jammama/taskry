**[Assignee]:** @AI_Dever

**[Issue]:** #CodeClean-002 (PlanningMode.svelte 코드 정리 및 구조 개선)

**[Feature Name]:** PlanningMode.svelte 파일 분리 및 리팩토링

**[Milestone]:** Milestone 1: Planning Mode 기본 구현

---

## 📖 리팩토링 개요

### 목적
`PlanningMode.svelte` 파일이 1000줄 이상으로 길어져 가독성과 유지보수성이 떨어지고 있습니다. 코드를 논리적으로 분리하여 관리하기 쉽게 만듭니다.

### 사용자 스토리
- **As a** 개발자
- **I want** PlanningMode.svelte가 여러 파일로 분리되어 있는 것
- **So that** 코드를 찾고 수정하기 쉽고, 재사용 가능한 컴포넌트로 관리할 수 있다

---

## 🎯 리팩토링 요구사항

### 핵심 작업
1. SVG 아이콘을 별도 파일로 분리하여 import
2. CSS를 별도 파일로 분리
3. 인라인 style을 CSS 클래스로 리팩토링
4. 중복된 함수 정리 및 공통 함수 추출

---

## 🔧 상세 작업 내용

### 1. SVG 아이콘 분리

#### 분리 대상 SVG
- **카테고리 아이콘**:
  - Target 아이콘 (Focus 카테고리) - 416-433줄
  - Refresh 아이콘 (Rhythm 카테고리) - 434-451줄
  - Zap 아이콘 (Catalyst 카테고리) - 452-467줄
- **UI 아이콘**:
  - Collapse/Expand 아이콘 (완료된 할 일 섹션) - 522-535줄
  - Cancel 아이콘 (편집 모드 취소 버튼) - 484-487줄

#### 생성할 파일
- `src/lib/components/icons/TargetIcon.svelte`
- `src/lib/components/icons/RefreshIcon.svelte`
- `src/lib/components/icons/ZapIcon.svelte`
- `src/lib/components/icons/CollapseIcon.svelte`
- `src/lib/components/icons/CancelIcon.svelte`

#### 사용 방법
```svelte
<script>
    import TargetIcon from '$lib/components/icons/TargetIcon.svelte';
    import RefreshIcon from '$lib/components/icons/RefreshIcon.svelte';
    import ZapIcon from '$lib/components/icons/ZapIcon.svelte';
    import CollapseIcon from '$lib/components/icons/CollapseIcon.svelte';
    import CancelIcon from '$lib/components/icons/CancelIcon.svelte';
</script>

<!-- 기존: -->
<svg width="18" height="18" viewBox="0 0 24 24" ...>
    <circle cx="12" cy="12" r="9" />
    ...
</svg>

<!-- 변경 후: -->
<TargetIcon width={18} height={18} />
```

---

### 2. CSS 파일 분리

#### 분리 방법
- **옵션 1**: `PlanningMode.css` 파일 생성 (권장)
- **옵션 2**: 기능별로 CSS 파일 분리
  - `planningMode.css` (메인 스타일)
  - `taskItem.css` (Task 아이템 스타일)
  - `animations.css` (애니메이션 스타일)

#### 권장 구조
```
src/lib/components/
  ├── PlanningMode.svelte
  ├── PlanningMode.css
  └── icons/
      ├── TargetIcon.svelte
      └── ...
```

#### 사용 방법
```svelte
<script>
    import './PlanningMode.css';
</script>
```

#### 분리할 CSS 내용
- 전체 스타일 블록 (`<style>` 태그 내용 전체) - 약 375줄 (628-1003줄)
- 애니메이션 키프레임 (`@keyframes`)
  - `@keyframes glow-pulse` (941-950줄)
  - `@keyframes float` (1000-1003줄)
  - `@keyframes drop-target-glow` (800-810줄)

---

### 3. 인라인 style 리팩토링

#### 현재 인라인 style 위치
1. **Task 아이템 동적 스타일** (390-410줄):
   ```svelte
   style={(() => {
       if (isSwiping && swipingId === task.id && currentDirection === 'horizontal') {
           const limitedSwipeX = Math.max(deltaX, -10);
           return `transform: translateX(${limitedSwipeX}px);`;
       } else if (currentDirection === 'vertical') {
           return `transform: translateY(${deltaY}px);`;
       }
       return '';
   })()}
   ```

2. **완료된 할 일 cursor 스타일** (547줄):
   ```svelte
   style="cursor: default;"
   ```

#### 리팩토링 방법
- **동적 스타일**: CSS 변수와 클래스를 활용
  ```svelte
  <!-- 기존 -->
  style={`transform: translateX(${limitedSwipeX}px);`}
  
  <!-- 변경 후 -->
  class:swiping-left={isSwiping && swipingId === task.id && currentDirection === 'horizontal'}
  style={`--swipe-x: ${limitedSwipeX}px;`}
  ```
  ```css
  .swiping-left {
      transform: translateX(var(--swipe-x));
  }
  ```

- **고정 스타일**: CSS 클래스로 변경
  ```svelte
  <!-- 기존 -->
  style="cursor: default;"
  
  <!-- 변경 후 -->
  class="completed-task"
  ```
  ```css
  .completed-task {
      cursor: default;
  }
  ```

---

### 4. 중복된 함수 정리

#### 확인할 함수들
- `getCategoryIcon()` (133-140줄): 카테고리 아이콘 매핑 함수
  - `TodoItem.svelte`에도 유사한 함수가 있을 수 있음
- 스와이프 이벤트 핸들러들 (188-223줄):
  - `handleTouchStart`, `handleTouchMove`, `handleTouchEnd`
  - `handleMouseDown`, `handleMouseMove`, `handleMouseUp`
  - 중복 로직 확인 필요
- 편집 관련 함수들 (324-358줄):
  - `startEdit`, `cancelEdit`, `saveEdit`, `handleEditKeydown`

#### 정리 방법
1. **공통 유틸 함수 추출**:
   - `getCategoryIcon` → `src/lib/utils/categoryUtils.js`로 이동
   - 또는 아이콘 컴포넌트에서 직접 처리

2. **중복 로직 통합**:
   - 스와이프 이벤트 핸들러에서 중복되는 로직 확인
   - 공통 함수로 추출

3. **함수명 일관성**:
   - 함수명 규칙 통일 (camelCase)
   - 비슷한 기능의 함수 통합 검토

---

## 📁 파일 구조 제안

### 변경 전
```
src/lib/components/
  └── PlanningMode.svelte (1004줄)
```

### 변경 후
```
src/lib/components/
  ├── PlanningMode.svelte (~300-400줄)
  ├── PlanningMode.css (~375줄)
  └── icons/
      ├── TargetIcon.svelte
      ├── RefreshIcon.svelte
      ├── ZapIcon.svelte
      ├── CollapseIcon.svelte
      └── CancelIcon.svelte

src/lib/utils/
  └── categoryUtils.js (getCategoryIcon 함수)
```

---

## 🎨 작업 우선순위

1. **높음**: SVG 아이콘 분리 (가장 많은 코드 줄 수 감소)
2. **높음**: CSS 파일 분리 (가독성 향상)
3. **중간**: 인라인 style 리팩토링 (유지보수성 향상)
4. **낮음**: 중복 함수 정리 (코드 품질 향상)

---

## 📝 작업 내역

### [날짜] - 작업 시작
- 리팩토링 이슈 생성 및 요구사항 정의

---

**참고 문서**:
- `src/lib/components/PlanningMode.svelte` - 리팩토링 대상 파일
- `src/lib/components/NewTaskInput.svelte` - 컴포넌트 구조 참고
- `src/lib/components/SelectionBar.svelte` - 컴포넌트 구조 참고
- `docs/issues/dever/CodeClean-001[Complete].md` - 스와이프 유틸 분리 참고

**작성일**: 2024년  
**마지막 업데이트**: 2024년
