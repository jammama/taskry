# 🎯 Taskry 프로젝트 상세 마일스톤

**프로젝트**: Taskry (타스크리)  
**목표**: "Your Personal Flow Engine" - 게이미피케이션 기반 To-Do 웹앱  
**기준 문서**: `docs/idea-001.md` (기획 회의록)  
**작성일**: 2024년

> **참고**: 전체적인 마일스톤 구조는 `docs/Milestone-Basic.md`를 참고하세요.

---

## 📋 마일스톤 개요

Taskry 프로젝트는 다음 4단계의 큰 맥락으로 진행됩니다:

**[Basic Taskry System]**
기본적인 '보상 시스템이 있는 Todo 서비스'를 구현합니다

1. **일반적인 ToDo 앱 구현** (Milestone 1-2)
2. **로그인을 통해 '개인화'된 Todo 구현** (Milestone 3)
3. **보상시스템 구현** (Milestone 4-6)
4. **배포** (Milestone 7)

---

## ⚠️ 기획 변경 사항 및 충돌 해결

### 변경 사항
1. **Juicy UI 애니메이션 강화**: idea-001.md에서 핵심으로 강조된 "입력은 간결하게, 피드백은 화려하게" 원칙을 Milestone 1에 명시적으로 추가
2. **지연된 보상 전략**: Micro/Macro Reward 분리 전략을 Milestone 4에 상세히 반영
3. **AI 기능 통합**: AI 기반 보상 체계를 Milestone 4-5에 통합 (별도 마일스톤 대신)
4. **Planning Mode 우선**: Planning Mode 완성 후 Reward Mode 연동 순서 명확화

### 충돌 해결
- **Milestone 1**: CRUD만이 아닌 "Juicy Checkbox" 애니메이션까지 포함하여 완성도 높임
- **Milestone 4**: 보상시스템을 Micro/Macro로 분리하여 지연된 보상 전략 반영
- **Milestone 5**: AI 프롬프트 엔지니어링 및 폴백 시스템 포함

---

## 🚀 Milestone 1: Planning Mode 기본 구현 (CRUD + Juicy UI)

**목표**: 간결하고 빠른 입력, 화려한 완료 피드백을 갖춘 Planning Mode 완성  
**우선순위**: 🔴 최우선  
**예상 기간**: 2-3주

### 📋 완료 조건

#### 개발자 (@AI_Dever)
- [x] 할 일 추가 (Create) - `NewTaskInput` 컴포넌트
- [x] 할 일 목록 조회 (Read) - `todos` store 구독
- [x] 할 일 완료/토글 (Update) - `completeTodo` 함수
- [ ] 할 일 삭제 (Delete) - `deleteTodo` 함수 구현
- [ ] 할 일 수정/편집 (Update) - 인라인 편집 또는 모달 방식
- [x] IndexedDB 기반 오프라인 저장
- [x] Task 분류 시스템 (Focus, Rhythm, Catalyst)
- [ ] **Juicy Checkbox 애니메이션**: 완료 시 0.5~1초 짧은 이펙트
  - [ ] 체크박스 눌림/튕김 애니메이션
  - [ ] 파티클 효과 (폭죽, 별, 코인)
  - [ ] Micro Reward 팝업 (+Flow Energy 텍스트 애니메이션)
  - [ ] 화면 살짝 흔들림 효과 (선택)

#### 디자이너 (@AI_Designer)
- [x] 다크 모드 + 네온 테마 적용
- [x] CSS 변수 기반 색상 시스템
- [x] Planning Mode 레이아웃 (모바일 최적화)
- [ ] **Juicy UI 애니메이션 디자인**
  - [ ] 체크박스 애니메이션 스펙
  - [ ] 파티클 효과 디자인 가이드
  - [ ] Micro Reward 팝업 디자인
  - [ ] 전환 애니메이션 타이밍 정의

#### 기획자 (@AI_Planner)
- [x] Planning Mode 컨셉 정의
- [x] Task 분류 기준 (Focus, Rhythm, Catalyst) 정의
- [x] 기본 XP 계산 로직 정의
- [ ] **Juicy UI 요구사항 명세**
  - [ ] 완료 피드백 강도 정의
  - [ ] 애니메이션 타이밍 가이드라인
  - [ ] 사용자 경험 시나리오 작성

#### 고객 (사용자)
- [ ] **사용성 테스트**
  - [ ] 입력 속도 측정 (0.5초 목표 달성 여부)
  - [ ] 완료 피드백 만족도 확인
  - [ ] 애니메이션 부드러움 확인
  - [ ] 오프라인 동작 검증

### 📝 세부 작업

#### Phase 1.1: 기본 CRUD 완성
- [x] `todoStore.js`에 `addTodo`, `completeTodo` 구현
- [ ] `todoStore.js`에 `deleteTodo(id)` 함수 추가
- [ ] `todoStore.js`에 `updateTodo(id, updates)` 함수 추가
- [ ] `PlanningMode.svelte`에 삭제 버튼 추가
- [ ] `PlanningMode.svelte`에 수정 기능 추가

#### Phase 1.2: Juicy UI 애니메이션 구현
- [ ] 체크박스 컴포넌트에 애니메이션 적용
- [ ] 파티클 라이브러리 통합 (canvas-confetti 또는 GSAP)
- [ ] Micro Reward 팝업 컴포넌트 생성
- [ ] Svelte transition을 활용한 애니메이션 구현
- [ ] 성능 최적화 (60fps 유지)

### 🔗 관련 문서
- `docs/idea-001.md` 토픽 6: 모드 분리 전략
- `docs/uiuxGuide.md`: Juicy UI 가이드라인
- `docs/issues/dever/Feature-001.md`: 관련 개발 이슈

---

## 🚀 Milestone 2: ToDo 기능 고도화

**목표**: 날짜 지정, 필터링, 히스토리 관리 기능 추가  
**우선순위**: 🔴 High  
**예상 기간**: 2-3주

### 📋 완료 조건

#### 개발자 (@AI_Dever)
- [ ] 할 일 데이터 구조에 `dueDate`, `createdDate`, `completedDate` 필드 추가
- [ ] 날짜 선택 UI 컴포넌트 구현
- [ ] 할 일/완료한 일 필터 UI 구현
- [ ] 완료한 일 히스토리 화면 구현
- [ ] 날짜별 그룹화 표시 로직
- [ ] 오늘/내일/이번주/이번달 필터 구현
- [ ] IndexedDB에 날짜 정보 저장

#### 디자이너 (@AI_Designer)
- [ ] 날짜 선택 UI 디자인 (날짜 피커)
- [ ] 필터 UI 디자인 (탭 또는 버튼)
- [ ] 히스토리 화면 레이아웃 디자인
- [ ] 날짜별 그룹화 시각화 디자인
- [ ] 다크 모드 + 네온 테마 유지

#### 기획자 (@AI_Planner)
- [ ] 날짜 필드 데이터 구조 설계
- [ ] 필터링 로직 명세
- [ ] 히스토리 관리 정책 정의
- [ ] 날짜 그룹화 규칙 정의

#### 고객 (사용자)
- [ ] 날짜 지정 기능 사용성 확인
- [ ] 필터링 기능 편의성 확인
- [ ] 히스토리 화면 유용성 확인

### 📝 세부 작업

#### Phase 2.1: 날짜 기능
- [ ] `todoStore.js` 데이터 구조 확장
- [ ] 날짜 선택 컴포넌트 생성
- [ ] 날짜 표시 UI 구현
- [ ] IndexedDB 스키마 업데이트

#### Phase 2.2: 필터링 및 히스토리
- [ ] 필터 상태 관리 (전체/할 일/완료한 일)
- [ ] 히스토리 화면 컴포넌트 생성
- [ ] 날짜별 그룹화 로직 구현
- [ ] 날짜 필터 로직 구현

### 🔗 관련 문서
- `docs/issues/planner/Feature-Backlog.md`: Milestone 2 기능 목록

---

## 🚀 Milestone 3: 로그인 기능 & ToDo의 '개인화'

**목표**: 사용자 인증을 통한 개인화된 Todo 관리 및 클라우드 동기화  
**우선순위**: 🔴 High  
**예상 기간**: 3-4주

### 📋 완료 조건

#### 개발자 (@AI_Dever)
- [ ] Supabase 클라이언트 설정
- [ ] Google OAuth 로그인 구현
- [ ] 사용자별 데이터 분리 로직
- [ ] 로컬(IndexedDB) ↔ 클라우드(Supabase) 동기화
- [ ] 충돌 해결 전략 구현
- [ ] 오프라인 큐 관리 (오프라인 중 변경사항 큐잉)
- [ ] 사용자 프로필 화면 구현

#### 디자이너 (@AI_Designer)
- [ ] 로그인 화면 디자인
- [ ] 사용자 프로필 화면 디자인
- [ ] 동기화 상태 표시 UI 디자인
- [ ] 충돌 해결 UI 디자인

#### 기획자 (@AI_Planner)
- [ ] 인증 플로우 설계
- [ ] 데이터 동기화 전략 정의
- [ ] 충돌 해결 정책 정의
- [ ] 사용자 프로필 필드 정의

#### 고객 (사용자)
- [ ] 로그인 프로세스 편의성 확인
- [ ] 데이터 동기화 안정성 확인
- [ ] 오프라인 동작 검증

### 📝 세부 작업

#### Phase 3.1: 인증 시스템
- [ ] Supabase 프로젝트 생성 및 설정
- [ ] Google OAuth 설정
- [ ] 로그인/로그아웃 로직 구현
- [ ] 세션 관리 구현

#### Phase 3.2: 데이터 동기화
- [ ] 사용자별 데이터 분리 로직
- [ ] 동기화 큐 시스템 구현
- [ ] 충돌 해결 로직 구현
- [ ] 백그라운드 동기화 구현

### 🔗 관련 문서
- `docs/idea-001.md` 토픽 13: 기술 스택 선택
- `docs/issues/infra/Infra-001.md`: 배포 및 인프라

---

## 🚀 Milestone 4: 보상시스템 구축 (Micro & Macro Reward)

**목표**: 지연된 보상 전략을 포함한 완전한 보상 시스템 구현  
**우선순위**: 🟡 Medium  
**예상 기간**: 3-4주

### 📋 완료 조건

#### 개발자 (@AI_Dever)
- [ ] **Micro Reward 시스템 완성**
  - [ ] Micro Reward 팝업 활성화 및 개선
  - [ ] 즉시 지급 로직 (완료 시 바로 표시)
  - [ ] Flow Energy 표시 애니메이션
  - [ ] 자동 닫기 (2.5초)
- [ ] **Macro Reward 시스템 구현**
  - [ ] 지연 보상 큐 시스템 구현
  - [ ] 지연 시간 계산 로직 (난이도, 동기 기반)
  - [ ] Macro Reward 발생 조건 판단
  - [ ] 보상 종류 결정 로직 (아이템, 보너스 XP, 특수 효과)
  - [ ] Macro Reward 팝업 UI 구현
  - [ ] 지연 시간 시각화 (NEXT EVOLUTION IN 3 DAYS)
- [ ] **보상 데이터 구조 설계**
  - [ ] `rewards_awaiting` 테이블 생성
  - [ ] 보상 아이템 데이터 구조
  - [ ] IndexedDB에 보상 데이터 저장

#### 디자이너 (@AI_Designer)
- [ ] Micro Reward 팝업 디자인 (0.5~1초 짧은 이펙트)
- [ ] Macro Reward 팝업 디자인 (화려한 이펙트)
- [ ] 지연 시간 표시 UI 디자인
- [ ] 보상 아이템 아이콘 디자인
- [ ] 보상 개봉 애니메이션 디자인

#### 기획자 (@AI_Planner)
- [ ] **지연된 보상 전략 명세**
  - [ ] Micro/Macro Reward 분리 기준 정의
  - [ ] 지연 시간 기준 정의 (난이도, 동기별)
  - [ ] 보상 발생 조건 정의
  - [ ] 보상 종류 및 확률 정의
- [ ] **리스크 관리 전략**
  - [ ] 즉각적 동기 상실 방지 전략
  - [ ] 불만 및 피로도 최소화 전략
  - [ ] 공정성 보장 전략

#### 고객 (사용자)
- [ ] Micro Reward 만족도 확인
- [ ] Macro Reward 기대감 확인
- [ ] 지연 시간 공정성 확인

### 📝 세부 작업

#### Phase 4.1: Micro Reward 완성
- [ ] Micro Reward 팝업 컴포넌트 개선
- [ ] 즉시 지급 로직 구현
- [ ] Flow Energy 애니메이션 구현
- [ ] 자동 닫기 타이머 구현

#### Phase 4.2: Macro Reward 시스템
- [ ] 지연 보상 큐 시스템 구현
- [ ] 지연 시간 계산 로직 (AI 또는 규칙 기반)
- [ ] Macro Reward 발생 조건 판단
- [ ] 보상 종류 결정 로직
- [ ] Macro Reward 팝업 UI 구현

#### Phase 4.3: 보상 데이터 관리
- [ ] 보상 데이터 구조 설계
- [ ] IndexedDB 스키마 확장
- [ ] 보상 히스토리 추적

### 🔗 관련 문서
- `docs/idea-001.md` 토픽 9: 지연된 보상 전략
- `docs/idea-001.md` 토픽 10: AI 기반 보상 체계

---

## 🚀 Milestone 5: XP 및 레벨 시스템 구축

**목표**: Focus, Rhythm, Catalyst 스탯별 XP 추적 및 레벨 계산  
**우선순위**: 🟡 Medium  
**예상 기간**: 2-3주

### 📋 완료 조건

#### 개발자 (@AI_Dever)
- [ ] **XP Store 생성 및 관리**
  - [ ] `xpStore.js` 생성
  - [ ] XP 데이터 구조: `{ totalXP, level, focusXP, rhythmXP, catalystXP }`
  - [ ] IndexedDB에 XP 데이터 저장
  - [ ] XP 히스토리 추적
- [ ] **레벨 계산 시스템**
  - [ ] 레벨 계산 공식 정의 및 구현
  - [ ] 레벨업 감지 로직
  - [ ] 레벨업 이벤트 발생
- [ ] **스탯별 XP 추적**
  - [ ] 할 일 완료 시 해당 카테고리 XP 누적
  - [ ] 스탯별 XP 표시
  - [ ] 스탯별 레벨 (선택)
- [ ] **레벨업 화면 및 애니메이션**
  - [ ] 레벨업 화면 UI 구현
  - [ ] 레벨업 애니메이션
  - [ ] 레벨업 보상 표시

#### 디자이너 (@AI_Designer)
- [ ] XP 바 디자인
- [ ] 스탯별 XP 표시 UI 디자인
- [ ] 레벨업 화면 디자인
- [ ] 레벨업 애니메이션 디자인
- [ ] 다크 모드 + 네온 테마 유지

#### 기획자 (@AI_Planner)
- [ ] 레벨 계산 공식 정의
- [ ] 스탯별 XP 가중치 정의
- [ ] 레벨업 보상 정책 정의
- [ ] 레벨업 이벤트 트리거 조건 정의

#### 고객 (사용자)
- [ ] XP 시스템 이해도 확인
- [ ] 레벨업 만족도 확인
- [ ] 스탯 추적 유용성 확인

### 📝 세부 작업

#### Phase 5.1: XP Store 구축
- [ ] `xpStore.js` 생성
- [ ] XP 데이터 구조 정의
- [ ] IndexedDB 스키마 확장
- [ ] XP 누적 로직 구현

#### Phase 5.2: 레벨 시스템
- [ ] 레벨 계산 공식 구현
- [ ] 레벨업 감지 로직
- [ ] 레벨업 이벤트 시스템

#### Phase 5.3: 스탯 추적
- [ ] 스탯별 XP 분리 추적
- [ ] 스탯별 XP 표시 UI
- [ ] 스탯 불균형 분석

### 🔗 관련 문서
- `docs/idea-001.md` 토픽 5: 성장 시스템 재정의
- `docs/idea-001.md` 토픽 10: AI 기반 보상 체계

---

## 🚀 Milestone 6: Reward Mode 연동 및 AI 통합

**목표**: Planning Mode와 Reward Mode 완전 연동, AI 기반 보상 체계 통합  
**우선순위**: 🟡 Medium  
**예상 기간**: 4-5주

### 📋 완료 조건

#### 개발자 (@AI_Dever)
- [ ] **Reward Mode 컴포넌트 활성화**
  - [ ] `RewardMode.svelte` 주석 해제 및 활성화
  - [ ] `+page.svelte`에서 Reward Mode 표시 로직
  - [ ] Planning Mode 완료 이벤트와 연결
- [ ] **Reward Mode 데이터 연동**
  - [ ] XP Store와 Reward Mode 연동
  - [ ] CircularProgress 컴포넌트에 실제 스탯 데이터 전달
  - [ ] 레벨 표시 로직
  - [ ] 레벨업 시 Reward Mode 자동 표시
- [ ] **AI 기반 보상 체계 통합**
  - [ ] AI 프롬프트 엔지니어링 구현
  - [ ] Edge Function 구현 (OpenAI API 호출)
  - [ ] JSON 유효성 검사 로직
  - [ ] 폴백 시스템 구현 (AI 실패 시 기본 보상)
  - [ ] 보상 차등 지급 로직 (난이도 기반)
- [ ] **Reward Mode 전환 애니메이션**
  - [ ] 화면 전환 애니메이션
  - [ ] 보상 화면 닫기 기능
  - [ ] 부드러운 UX

#### 디자이너 (@AI_Designer)
- [ ] Reward Mode 화면 디자인 완성
- [ ] 엔진 시각화 디자인 (Focus, Rhythm, Catalyst 반영)
- [ ] 화면 전환 애니메이션 디자인
- [ ] AI 피드백 표시 UI 디자인

#### 기획자 (@AI_Planner)
- [ ] **AI 프롬프트 설계**
  - [ ] Game Master 프롬프트 작성
  - [ ] 판단 기준 정의 (동기 분류, 난이도, 지연 시간)
  - [ ] 출력 형식 정의 (JSON 스키마)
- [ ] **AI 리스크 관리 전략**
  - [ ] 프롬프트 가드레일 정의
  - [ ] 폴백 시스템 설계
  - [ ] 오류 처리 정책 정의
- [ ] **보상 체계 최종 정리**
  - [ ] 정량적/정성적/심리적 보상 정의
  - [ ] 보상 발생 조건 최종 정의

#### 고객 (사용자)
- [ ] Reward Mode 만족도 확인
- [ ] AI 분류 정확도 확인
- [ ] 화면 전환 부드러움 확인

### 📝 세부 작업

#### Phase 6.1: Reward Mode 활성화
- [ ] `RewardMode.svelte` 활성화
- [ ] 이벤트 연결 로직 구현
- [ ] 데이터 연동 구현

#### Phase 6.2: AI 통합
- [ ] AI 프롬프트 구현
- [ ] Edge Function 구현
- [ ] JSON 검증 로직
- [ ] 폴백 시스템 구현

#### Phase 6.3: 전환 애니메이션
- [ ] 화면 전환 애니메이션 구현
- [ ] UX 개선

### 🔗 관련 문서
- `docs/idea-001.md` 토픽 6: 모드 분리 전략
- `docs/idea-001.md` 토픽 10: AI 기반 보상 체계
- `docs/idea-001.md` 토픽 11: AI 리스크 관리

---

## 🚀 Milestone 7: 배포 및 최적화

**목표**: 프로덕션 환경 배포 준비 및 최적화  
**우선순위**: 🟢 Low  
**예상 기간**: 2-3주

### 📋 완료 조건

#### 개발자 (@AI_Dever)
- [ ] **PWA 완전 설정**
  - [ ] 다양한 크기 PWA 아이콘 생성 (192x192, 512x512)
  - [ ] 스플래시 스크린 이미지
  - [ ] 매니페스트 파일 완성
- [ ] **프로덕션 빌드 최적화**
  - [ ] 프로덕션 빌드 테스트
  - [ ] 번들 크기 최적화
  - [ ] 성능 프로파일링
- [ ] **배포 환경 설정**
  - [ ] 서버 환경 구성 (또는 Vercel/Netlify 설정)
  - [ ] 환경 변수 설정
  - [ ] CI/CD 파이프라인 설정
  - [ ] 도메인 연결
- [ ] **오프라인 동작 검증**
  - [ ] 오프라인 모드 테스트
  - [ ] IndexedDB 동작 검증
  - [ ] Service Worker 동작 검증

#### 디자이너 (@AI_Designer)
- [ ] PWA 아이콘 디자인 (다양한 크기)
- [ ] 스플래시 스크린 디자인
- [ ] 앱 스토어용 스크린샷 (선택)

#### 기획자 (@AI_Planner)
- [ ] 배포 전 체크리스트 작성
- [ ] 사용자 가이드 작성 (선택)
- [ ] 릴리스 노트 작성

#### 고객 (사용자)
- [ ] 프로덕션 환경 테스트
- [ ] 오프라인 동작 검증
- [ ] 성능 확인

### 📝 세부 작업

#### Phase 7.1: PWA 완성
- [ ] 아이콘 생성
- [ ] 매니페스트 완성
- [ ] Service Worker 최적화

#### Phase 7.2: 빌드 및 배포
- [ ] 빌드 최적화
- [ ] 배포 환경 설정
- [ ] CI/CD 설정

### 🔗 관련 문서
- `docs/issues/infra/Infra-001.md`: 배포 및 인프라 시스템 구축
- `docs/idea-001.md` 토픽 13: 기술 스택 선택

---

## 📊 마일스톤 진행 현황

| 마일스톤 | 목표 | 상태 | 진행률 | 우선순위 |
|---------|------|------|-------|---------|
| **Milestone 1** | Planning Mode 기본 구현 | 🚧 진행 중 | 60% | 🔴 최우선 |
| **Milestone 2** | ToDo 기능 고도화 | ❌ 미시작 | 0% | 🔴 High |
| **Milestone 3** | 로그인 & 개인화 | ❌ 미시작 | 0% | 🔴 High |
| **Milestone 4** | 보상시스템 구축 | ⚠️ 부분 구현 | 10% | 🟡 Medium |
| **Milestone 5** | XP/레벨 시스템 | ⚠️ 부분 구현 | 5% | 🟡 Medium |
| **Milestone 6** | Reward Mode 연동 & AI 통합 | ⚠️ 부분 구현 | 20% | 🟡 Medium |
| **Milestone 7** | 배포 및 최적화 | 🚧 진행 중 | 40% | 🟢 Low |

---

## 🔄 마일스톤 간 의존성

```
Milestone 1 (Planning Mode 기본)
    ↓
Milestone 2 (ToDo 고도화)
    ↓
Milestone 3 (로그인 & 개인화)
    ↓
Milestone 4 (보상시스템) ←┐
    ↓                      │
Milestone 5 (XP/레벨)      │ (병렬 진행 가능)
    ↓                      │
Milestone 6 (Reward 연동 & AI) ←┘
    ↓
Milestone 7 (배포)
```

**주의사항**:
- Milestone 1-3은 순차적으로 진행 필요
- Milestone 4-6은 병렬 진행 가능 (단, 5가 6보다 먼저 완료되어야 함)
- Milestone 6의 AI 통합은 Milestone 4-5 완료 후 진행 권장
- Milestone 7은 모든 기능 완성 후 진행

---

## 📌 담당자별 체크리스트 가이드

### 개발자 (@AI_Dever)
각 마일스톤의 "완료 조건 > 개발자" 섹션을 확인하고:
- [ ] 기능 구현 완료
- [ ] 코드 주석 작성
- [ ] IndexedDB 저장 검증
- [ ] 오프라인 동작 테스트
- [ ] 성능 최적화 (60fps 유지)
- [ ] 이슈 파일에 작업 내역 기록

### 디자이너 (@AI_Designer)
각 마일스톤의 "완료 조건 > 디자이너" 섹션을 확인하고:
- [ ] 다크 모드 + 네온 테마 준수
- [ ] CSS 변수 사용 (하드코딩 금지)
- [ ] 애니메이션 타이밍 정의
- [ ] 모바일 최적화 확인
- [ ] 디자인 가이드 문서화

### 기획자 (@AI_Planner)
각 마일스톤의 "완료 조건 > 기획자" 섹션을 확인하고:
- [ ] 요구사항 명세 완료
- [ ] 데이터 구조 설계 완료
- [ ] 정책 및 규칙 정의 완료
- [ ] 관련 문서 업데이트
- [ ] 다음 마일스톤 준비

### 고객 (사용자)
각 마일스톤의 "완료 조건 > 고객" 섹션을 확인하고:
- [ ] 사용성 테스트 완료
- [ ] 만족도 확인
- [ ] 요구사항 충족 여부 확인
- [ ] 다음 단계 승인

---

## 📝 다음 단계

### 즉시 진행할 작업 (Milestone 1 완성)
1. 할 일 삭제 기능 구현
2. 할 일 수정 기능 구현
3. **Juicy Checkbox 애니메이션 구현** (idea-001.md 반영)

### 다음 마일스톤 준비
- Milestone 2: 날짜 필드 데이터 구조 설계
- Milestone 4: 지연된 보상 전략 상세 설계

---

## ⚠️ 주요 변경 사항 요약

### idea-001.md 반영 사항
1. **Juicy UI 강화**: Milestone 1에 애니메이션 요구사항 명시
2. **지연된 보상**: Milestone 4에 Micro/Macro 분리 전략 상세 반영
3. **AI 통합**: Milestone 6에 AI 기반 보상 체계 통합
4. **Focus, Rhythm, Catalyst**: 모든 마일스톤에 3가지 스탯 반영

### Milestone-Basic.md와의 차이점
1. **Milestone 1**: Juicy UI 애니메이션 요구사항 추가
2. **Milestone 4**: 지연된 보상 전략 상세화
3. **Milestone 6**: AI 통합 추가 (기존에는 Reward Mode 연동만)
4. **담당자별 체크리스트**: 각 마일스톤에 담당자별 확인 사항 명시

---

**마지막 업데이트**: 2024년  
**관리자**: @AI_Planner  
**기준 문서**: `docs/idea-001.md`

