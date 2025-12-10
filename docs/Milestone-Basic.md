# 🎯 Taskry 프로젝트 마일스톤

**프로젝트**: Taskry (타스크리)  
**목표**: "Your Personal Flow Engine" - 게이미피케이션 기반 To-Do 웹앱

> **상세 내용**: 각 마일스톤의 세부 작업은 `docs/Milestone-Basic(Detail).md`를 참고하세요.

---

## 📋 마일스톤 개요

Taskry 프로젝트는 **당장 사용 가능한 환경 구축을 최우선**으로 하고, 이후 **서비스의 재미 요소를 점진적으로 통합**하는 순서로 진행됩니다.

**[Basic Taskry System]**
기본적인 '보상 시스템이 있는 Todo 서비스'를 구현합니다

1. **Planning Mode 기본 구현** (Milestone 1) - ✅ 진행 중
2. **환경 구축 및 서버 연동** (Milestone 2) - Phase 0
3. **MVP 사용성 및 QoL 개선** (Milestone 3) - Phase 1
4. **게이미피케이션 몰입도 강화** (Milestone 4) - Phase 2
5. **보상시스템 구축** (Milestone 5)
6. **XP 및 레벨 시스템** (Milestone 6)
7. **Reward Mode 연동 및 AI 통합** (Milestone 7)

해당 마일스톤은 추후 별개의 마일스톤 파일로 다룹니다.

[수익화 (예정)]
광고를 도입해 앱의 자체 수익성을 만듭니다.

[AI (예정)]
보상 시스템과 계획 수립등에 AI를 적용하여 사용자의 동기제공, 편의성을 극대화 합니다.

[Social (예정)]
소셜 기능을 통해 앱 사용의 지속성을 높입니다.

[통계 (예정)]
사용자의 이용 현황등을 확인해

---

## 🚀 마일스톤 진행 현황

| 마일스톤 | 목표 | 상태 | 진행률 | 우선순위 |
|---------|------|------|-------|---------|
| **Milestone 1** | Planning Mode 기본 구현 | 🚧 진행 중 | 75% | 🔴 최우선 |
| **Milestone 2** | 환경 구축 및 서버 연동 | ❌ 미시작 | 0% | 🔴 최우선 |
| **Milestone 3** | MVP 사용성 개선 | ❌ 미시작 | 0% | 🔴 High |
| **Milestone 4** | 게이미피케이션 몰입도 강화 | ❌ 미시작 | 0% | 🟡 Medium |
| **Milestone 5** | 보상시스템 구축 | ⚠️ 부분 구현 | 10% | 🟡 Medium |
| **Milestone 6** | XP/레벨 시스템 | ⚠️ 부분 구현 | 5% | 🟡 Medium |
| **Milestone 7** | Reward Mode 연동 & AI | ⚠️ 부분 구현 | 20% | 🟡 Medium |

---

## 📝 마일스톤 요약

### Milestone 1: Planning Mode 기본 구현
**목표**: 간결하고 빠른 입력, 화려한 완료 피드백을 갖춘 Planning Mode 완성
- ✅ 할 일 추가, 조회, 완료, 삭제, 수정
- ✅ IndexedDB 기반 오프라인 저장
- ✅ Task 분류 시스템 (Focus, Rhythm, Catalyst)
- ✅ 다크 모드 + 네온 테마 UI

### Milestone 2: 환경 구축 및 서버 연동 (Phase 0)
**목표**: 앱을 실제 환경에 배포하고, 사용자별 데이터 관리를 시작합니다
- 프로젝트 배포 환경 구축 (Vercel)
- Supabase DB 초기 설정
- Google OAuth (로그인) 통합
- 로컬/서버 동기화 로직 전환

### Milestone 3: MVP 사용성 및 QoL 개선 (Phase 1)
**목표**: PM(사용자님)이 불편함 없이 앱을 일상적으로 사용할 수 있도록 기본적인 UX 문제를 해결합니다
- 입력 UI 위치 조정 (화면 최하단 고정)
- Goals 상기 기능 통합
- Tasks UI 세부 조정
- 완료된 Task의 History 로직

### Milestone 4: 게이미피케이션 몰입도 강화 (Phase 2)
**목표**: Taskry의 'Juicy'한 감성을 완성하고, Reward 시스템을 위한 기초 데이터 구조를 확립합니다
- 사운드 이펙트 통합
- Flow Engine 스탯 추적 데이터 설계
- Flow Planner Core 데이터 정의

### Milestone 5: 보상시스템 구축
**목표**: 할 일 완료 시 보상 제공 시스템
- Micro/Macro Reward 시스템
- 지연된 보상 전략
- 보상 발생 조건 및 UI

### Milestone 6: XP 및 레벨 시스템
**목표**: XP 누적, 레벨 계산, 스탯 추적
- XP Store 및 레벨 계산
- 스탯별 XP 추적
- 레벨업 시스템

### Milestone 7: Reward Mode 연동 및 AI 통합
**목표**: Planning Mode와 Reward Mode 완전 연동, AI 기반 보상 체계 통합
- Reward Mode 활성화
- 실제 데이터 연동
- AI 기반 보상 체계 통합
- 화면 전환 애니메이션

---

## 🔄 마일스톤 간 의존성

```
Milestone 1 (Planning Mode 기본 구현)
    ↓
Milestone 2 (환경 구축 및 서버 연동) ← Phase 0
    ↓
Milestone 3 (MVP 사용성 개선) ← Phase 1
    ↓
Milestone 4 (게이미피케이션 몰입도 강화) ← Phase 2
    ↓
Milestone 5 (보상시스템)
    ↓
Milestone 6 (XP/레벨)
    ↓
Milestone 7 (Reward 연동 & AI)
```

**주의사항**:
- Milestone 1은 이미 진행 중이므로 완료 후 Milestone 2 시작
- Milestone 2-3은 순차적으로 진행 필요 (배포 → UX 개선)
- Milestone 4는 Milestone 3 완료 후 시작 가능
- Milestone 5-7은 병렬 진행 가능 (단, 6이 7보다 먼저 완료되어야 함)

---

## 📌 현재 진행 중인 작업

### 즉시 진행할 작업 (Milestone 1 완성)
1. Juicy UI 애니메이션 효과 강화
2. 완료된 할 일 분리 표시
3. 수정 기능 UI 개선

### 다음 마일스톤 준비 (Milestone 2)
1. 배포 환경 구축 준비
2. Supabase 프로젝트 설정
3. Google OAuth 설정 준비

---

**마지막 업데이트**: 2024년  
**관리자**: @AI_Planner
