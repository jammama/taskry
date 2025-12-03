# 🎯 Taskry 프로젝트 마일스톤

**프로젝트**: Taskry (타스크리)  
**목표**: "Your Personal Flow Engine" - 게이미피케이션 기반 To-Do 웹앱

> **상세 내용**: 각 마일스톤의 세부 작업은 `docs/issues/planner/DetailMileStone.md`를 참고하세요.

---

## 📋 마일스톤 개요

Taskry 프로젝트는 다음 4단계의 큰 맥락으로 진행됩니다:

[Basic Taskry System]
기본적인 '보상 시스템이 있는 Todo 서비스'를 구현합니다

1. **일반적인 ToDo 앱 구현** (Milestone 1-2)
2. **로그인을 통해 '개인화'된 Todo 구현** (Milestone 3)
3. **보상시스템 구현** (Milestone 4-6)
4. **배포** (Milestone 7)


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
| **Milestone 1** | 기본 ToDo CRUD 기능 | 🚧 진행 중 | 60% | 🔴 최우선 |
| **Milestone 2** | ToDo 기능 고도화 | ❌ 미시작 | 0% | 🔴 High |
| **Milestone 3** | 로그인 & 개인화 | ❌ 미시작 | 0% | 🔴 High |
| **Milestone 4** | 보상시스템 구축 | ⚠️ 부분 구현 | 10% | 🟡 Medium |
| **Milestone 5** | XP/레벨 시스템 | ⚠️ 부분 구현 | 5% | 🟡 Medium |
| **Milestone 6** | Reward Mode 연동 | ⚠️ 부분 구현 | 20% | 🟡 Medium |
| **Milestone 7** | 배포 | 🚧 진행 중 | 40% | 🟢 Low |

---

## 📝 마일스톤 요약

### Milestone 1: 기본 ToDo CRUD 기능
**목표**: 일반적인 To-Do 앱의 핵심 기능 완성
- ✅ 할 일 추가, 조회, 완료/토글
- ❌ 할 일 삭제, 수정 (진행 필요)

### Milestone 2: ToDo 기능 고도화
**목표**: 날짜 지정, 할일/완료한일 구분, 히스토리화
- 날짜 지정 기능
- 필터링 및 히스토리 관리
- 날짜별 그룹화

### Milestone 3: 로그인 기능 & 개인화
**목표**: 사용자 인증을 통한 개인화된 Todo 관리
- Supabase 인증 연동
- 사용자별 데이터 분리
- 로컬 ↔ 클라우드 동기화

### Milestone 4: 보상시스템 구축
**목표**: 할 일 완료 시 보상 제공 시스템
- Micro/Macro Reward 시스템
- 보상 발생 조건 및 UI

### Milestone 5: XP 및 레벨 시스템
**목표**: XP 누적, 레벨 계산, 스탯 추적
- XP Store 및 레벨 계산
- 스탯별 XP 추적
- 레벨업 시스템

### Milestone 6: Reward Mode 연동
**목표**: Planning Mode와 Reward Mode 완전 연동
- Reward Mode 활성화
- 실제 데이터 연동
- 화면 전환 애니메이션

### Milestone 7: 배포
**목표**: 프로덕션 환경 배포 준비
- PWA 완전 설정
- 빌드 최적화
- 배포 환경 구성

---

## 🔄 마일스톤 간 의존성

```
Milestone 1 (CRUD)
    ↓
Milestone 2 (고도화)
    ↓
Milestone 3 (로그인 & 개인화)
    ↓
Milestone 4 (보상시스템)
    ↓
Milestone 5 (XP/레벨)
    ↓
Milestone 6 (Reward 연동)
    ↓
Milestone 7 (배포)
```

**주의사항**:
- Milestone 1-3은 순차적으로 진행 필요
- Milestone 4-6은 병렬 진행 가능 (단, 5가 6보다 먼저 완료되어야 함)
- Milestone 7은 모든 기능 완성 후 진행

---

## 📌 현재 진행 중인 작업

### 즉시 진행할 작업 (Milestone 1 완성)
1. 할 일 삭제 기능 구현
2. 할 일 수정 기능 구현

---

**마지막 업데이트**: 2024년  
**관리자**: @AI_Planner
