**[Assignee]:** @AI_Dever

**[Issue]:** #Fix-001(2) (선택 상태 관리 시스템 구현)

**[Feature Name]:** 예비 삭제 상태 선택/해제 관리

**[Milestone]:** Milestone 1: 기본 ToDo CRUD 기능

**[Parent Issue]:** Fix-001 (삭제 기능 UI/UX 개선)

---

## 📖 기능 개요

### 목적
스와이프 제스처로 선택된 할 일을 관리하는 상태 관리 시스템을 구현합니다. 왼쪽 스와이프로 예비 삭제 상태로 선택하고, 오른쪽 스와이프로 선택 해제하는 로직을 구현합니다.

### 사용자 스토리
- **As a** 사용자
- **I want** 할 일을 왼쪽으로 스와이프하여 예비 삭제 상태로 선택, 오른쪽으로 스와이프하여 선택 해제할 수 있는 기능
- **So that** 삭제할 할 일을 명확하게 표시할 수 있다

---

## 🎯 기능 요구사항

### 핵심 기능
1. 왼쪽 스와이프 → 예비 삭제 상태로 선택
2. 오른쪽 스와이프 → 예비 삭제 상태 해제
3. 다중 선택 지원 (여러 할 일 연속 선택 가능)
4. 선택 상태 조회 및 개수 계산

### 상세 요구사항
- **선택 상태 저장**: `selectedIds` Set을 사용하여 선택된 할 일 ID 관리
- **선택 로직**: 왼쪽 스와이프 완료 시(`deltaX < -30px`) → `selectedIds.add(taskId)`
- **해제 로직**: 오른쪽 스와이프 완료 시(`deltaX > 30px`) → `selectedIds.delete(taskId)`
- **Svelte 반응성**: `selectedIds = selectedIds`로 반응성 트리거
- **선택 개수 계산**: `selectedIds.size` 반환
- **선택 상태 확인**: `selectedIds.has(taskId)` 반환

---

## 🎨 UI/UX 명세

### 인터랙션
- 왼쪽 스와이프 완료 → 할 일이 예비 삭제 상태로 선택됨
- 오른쪽 스와이프 완료 → 선택된 할 일이 해제됨
- 여러 할 일을 연속으로 선택 가능

---

## 🔗 관련 이슈

- **부모 이슈**: Fix-001 (삭제 기능 UI/UX 개선)
- **이전 단계**: Fix-001(1) (스와이프 제스처 감지 로직 구현)
- **다음 단계**: Fix-001(3) (선택된 할 일의 시각적 효과 구현)

---

## 📝 작업 내역

### [날짜] - 작업 시작
- 이슈 생성 및 요구사항 정의

---

## 작업 완료 내역

### 변경 사항
- `src/lib/components/PlanningMode.svelte`: 선택 상태 관리 시스템 구현

### 주요 수정 사항
1. **선택 상태 변수 선언**
   - `selectedIds` Set 변수 선언: 선택된 할 일 ID를 관리하는 Set

2. **handleTouchEnd 함수에서 선택/해제 처리**
   - 왼쪽 스와이프 완료 시 (`deltaX < -30px`): `selectedIds.add(taskId)` - 예비 삭제 상태로 선택
   - 오른쪽 스와이프 완료 시 (`deltaX > 30px`): `selectedIds.delete(taskId)` - 선택 해제
   - 이미 선택된 경우 중복 선택 방지
   - 선택되지 않은 경우 해제 무시
   - Svelte 반응성을 위해 `selectedIds = selectedIds`로 재할당

3. **선택 상태 관리 함수 구현**
   - `isSelected(taskId)`: 선택 상태 확인 (`selectedIds.has(taskId)`)
   - `getSelectedCount()`: 선택된 개수 반환 (`selectedIds.size`)
   - `clearSelection()`: 모든 선택 해제 (다음 단계에서 사용)

4. **handleMouseLeave 함수 구현** (추가 요구사항)
   - 마우스가 항목 밖으로 나갈 때 스와이프의 임계수치(30px)를 넘은 것으로 판단
   - 왼쪽으로 스와이프한 경우 (`deltaX < -30px`): 선택
   - 오른쪽으로 스와이프한 경우 (`deltaX > 30px`): 선택 해제
   - 선택/해제 처리 후 스와이프 상태 초기화

### 테스트 결과
- ✅ 왼쪽 스와이프로 할 일 선택 확인
- ✅ 오른쪽 스와이프로 선택 해제 확인
- ✅ 여러 할 일 연속 선택 가능 확인
- ✅ 선택 상태 조회 및 개수 계산 정상 작동 확인
- ✅ 마우스가 항목 밖으로 나갈 때 선택/해제 동작 확인
- ✅ 이미 선택된 항목 중복 선택 방지 확인
- ✅ 선택되지 않은 항목 해제 무시 확인

### 코드 변경 내역
- **추가된 코드**:
  - `selectedIds` Set 변수 선언
  - `handleTouchEnd` 함수에 선택/해제 로직 추가
  - `isSelected(taskId)` 함수: 선택 상태 확인
  - `getSelectedCount()` 함수: 선택된 개수 반환
  - `clearSelection()` 함수: 모든 선택 해제
  - `handleMouseLeave(event, taskId)` 함수: 마우스가 항목 밖으로 나갈 때 선택/해제 처리

---

## 개발 가이드

### 구현 순서
1. `selectedIds` Set 변수 선언
2. `handleTouchEnd` 함수에서 스와이프 방향에 따라 선택/해제 처리
3. `isSelected(taskId)` 함수 구현: 선택 상태 확인
4. `getSelectedCount()` 함수 구현: 선택된 개수 반환
5. `clearSelection()` 함수 구현: 모든 선택 해제 (다음 단계에서 사용)

### 주의사항
- 왼쪽 스와이프: `deltaX < -30px` → 선택 (이미 선택된 경우 중복 선택 방지)
- 오른쪽 스와이프: `deltaX > 30px` → 해제 (선택되지 않은 경우 무시)
- Svelte 반응성을 위해 `selectedIds = selectedIds`로 재할당 필요

---

**작성일**: 2024년 12월 1일  
**마지막 업데이트**: 2024년 12월 1일  
**완료일**: 2024년 12월 1일
