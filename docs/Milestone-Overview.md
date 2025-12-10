# 🎯 Taskry 프로젝트 마일스톤 개요 (재구성)

**프로젝트**: Taskry (타스크리)  
**목표**: "Your Personal Flow Engine" - 게이미피케이션 기반 To-Do 웹앱  
**작성일**: 2024년

---

## 📋 마일스톤 재구성 개요

이 로드맵은 **당장 사용 가능한 환경 구축(Phase 0, 1)을 최우선**으로 하고, 이후 **서비스의 재미 요소(Phase 2, 3)를 점진적으로 통합**하는 순서로 구성됩니다.

### 변경 사항
- **기존**: 구현(CRUD) → 배포 순서
- **변경**: 배포/인증(Phase 0) → UX 개선(Phase 1) → 게이미피케이션(Phase 2) 순서
- **Milestone 1 유지**: 지금까지 진행된 Planning Mode 기본 구현 내용은 그대로 유지

---

## 🚀 마일스톤 구조

### Milestone 1: Planning Mode 기본 구현 ✅ (진행 중)
**목표**: 간결하고 빠른 입력, 화려한 완료 피드백을 갖춘 Planning Mode 완성  
**상태**: 🚧 진행 중 (75%)  
**우선순위**: 🔴 최우선

**주요 내용**:
- 기본 CRUD 기능 (추가, 조회, 완료, 삭제, 수정)
- IndexedDB 기반 오프라인 저장
- Task 분류 시스템 (Focus, Rhythm, Catalyst)
- 다크 모드 + 네온 테마 UI

---

### Milestone 2: 환경 구축 및 서버 연동 (Phase 0)
**목표**: 앱을 실제 환경에 배포하고, 사용자별 데이터 관리를 시작합니다.  
**상태**: ❌ 미시작 (0%)  
**우선순위**: 🔴 최우선  
**예상 기간**: 2-3주

**주요 작업**:
- **M2.1**: 프로젝트 배포 환경 구축 (Vercel 배포 파이프라인)
- **M2.2**: Supabase DB 초기 설정 (Tasks, Users, Goals, Rewards 테이블)
- **M2.3**: Google OAuth (로그인) 통합
- **M2.4**: 로컬/서버 동기화 로직 전환 (IndexedDB → Supabase)

---

### Milestone 3: MVP 사용성 및 QoL 개선 (Phase 1)
**목표**: PM(사용자님)이 불편함 없이 앱을 일상적으로 사용할 수 있도록 기본적인 UX 문제를 해결합니다.  
**상태**: ❌ 미시작 (0%)  
**우선순위**: 🔴 High  
**예상 기간**: 2-3주

**주요 작업**:
- **M3.1**: 입력 UI 위치 조정 (NewTaskInput을 화면 최하단 고정)
- **M3.2**: Goals 상기 기능 통합 (Planning Mode에 Goals List 팝업 버튼)
- **M3.3**: Tasks UI 세부 조정 (글자수 제한, 아이콘/FRC 스탯 위치 재조정)
- **M3.4**: 완료된 Task의 History 로직 (24시간 후 자동 필터링)

---

### Milestone 4: 게이미피케이션 몰입도 강화 (Phase 2)
**목표**: Taskry의 'Juicy'한 감성을 완성하고, Reward 시스템을 위한 기초 데이터 구조를 확립합니다.  
**상태**: ❌ 미시작 (0%)  
**우선순위**: 🟡 Medium  
**예상 기간**: 2-3주

**주요 작업**:
- **M4.1**: 사운드 이펙트 통합 (Task 완료 시 효과음)
- **M4.2**: Flow Engine 스탯 추적 데이터 설계 (xp_total, flow_energy_balance 필드)
- **M4.3**: Flow Planner Core 데이터 정의 (아이템 테이블, unlocked_mission_mode 상태)

---

### Milestone 5: 보상시스템 구축 (기존 Milestone 4)
**목표**: 지연된 보상 전략을 포함한 완전한 보상 시스템 구현  
**상태**: ⚠️ 부분 구현 (10%)  
**우선순위**: 🟡 Medium  
**예상 기간**: 3-4주

**주요 내용**:
- Micro/Macro Reward 시스템
- 지연된 보상 전략
- 보상 발생 조건 및 UI

---

### Milestone 6: XP 및 레벨 시스템 (기존 Milestone 5)
**목표**: Focus, Rhythm, Catalyst 스탯별 XP 추적 및 레벨 계산  
**상태**: ⚠️ 부분 구현 (5%)  
**우선순위**: 🟡 Medium  
**예상 기간**: 2-3주

**주요 내용**:
- XP Store 및 레벨 계산
- 스탯별 XP 추적
- 레벨업 시스템

---

### Milestone 7: Reward Mode 연동 및 AI 통합 (기존 Milestone 6)
**목표**: Planning Mode와 Reward Mode 완전 연동, AI 기반 보상 체계 통합  
**상태**: ⚠️ 부분 구현 (20%)  
**우선순위**: 🟡 Medium  
**예상 기간**: 4-5주

**주요 내용**:
- Reward Mode 활성화 및 데이터 연동
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
Milestone 5 (보상시스템 구축)
    ↓
Milestone 6 (XP/레벨 시스템)
    ↓
Milestone 7 (Reward Mode 연동 & AI)
```

**주의사항**:
- Milestone 1은 이미 진행 중이므로 완료 후 Milestone 2 시작
- Milestone 2-3은 순차적으로 진행 필요 (배포 → UX 개선)
- Milestone 4는 Milestone 3 완료 후 시작 가능
- Milestone 5-7은 병렬 진행 가능 (단, 6이 7보다 먼저 완료되어야 함)

---

## 📊 마일스톤 진행 현황

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

## 📌 다음 단계

### 즉시 진행할 작업
1. **Milestone 1 완성**: Juicy UI 애니메이션 및 사용자 피드백 반영
2. **Milestone 2 준비**: 배포 환경 구축 및 Supabase 설정

---

**마지막 업데이트**: 2024년  
**관리자**: @AI_Planner
