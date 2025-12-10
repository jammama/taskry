**[Assignee]:** @AI_Dever

**[Issue]:** #Fix-006 (애니메이션 효과 강화)

**[Feature Name]:** Juicy UI 애니메이션 강화 (체크박스, 파티클, 보상 팝업)

**[Milestone]:** Milestone 1: Planning Mode 기본 구현

---

## 📖 기능 개요

### 목적
체크박스 클릭, 파티클 효과, 보상 팝업 등 전반적인 애니메이션을 강화하여 '보상'이 즐겁다는 느낌을 주는 Juicy UI를 완성합니다.

### 사용자 스토리
- **As a** 사용자
- **I want** 할 일 완료 시 화려하고 즐거운 애니메이션 효과
- **So that** 할 일 완료가 더 보람있고 재미있다

---

## 🎯 기능 요구사항

### 핵심 기능
1. 체크박스 클릭 애니메이션 강화 (Bounce, Scale, Glow)
2. 파티클 효과 추가 (폭죽, 별, 코인)
3. Micro Reward 팝업 애니메이션 강화
4. Flow Energy 표시 애니메이션 개선
5. 완료 시 화면 살짝 흔들림 효과 (선택)

### 상세 요구사항
- 체크박스: Bounce, Scale, Glow 효과 동시 적용
- 파티클: canvas-confetti 또는 GSAP 사용
- 보상 팝업: 화려한 등장/퇴장 애니메이션
- Flow Energy: 숫자가 올라가는 애니메이션
- 전반적인 타이밍 및 강도 조정

---

## 🎨 UI/UX 명세

### 화면 구성
- 체크박스 클릭 시: 즉각적인 Bounce + Scale + Glow 효과
- 완료 시: 파티클 효과 (폭죽, 별, 코인)
- Micro Reward 팝업: 화려한 등장 애니메이션
- Flow Energy: 숫자 카운트업 애니메이션

### 인터랙션
- 체크박스 클릭 → 즉각적인 시각적 피드백
- 완료 처리 → 파티클 효과 + 보상 팝업
- 보상 팝업 → 2.5초 후 자동 닫기

---

## 📝 작업 내역

### [날짜] - 작업 시작
- 이슈 생성 및 요구사항 정의

---

**참고 문서**:
- `docs/issues/planner/Mile1-UserFeedback(1).md` - 사용자 피드백 #4
- `docs/Milestone-Basic(Detail).md` - Milestone 1 Phase 1.2
- `docs/uiuxGuide.md` - Juicy UI 가이드라인

