# 🎯 Taskry 프로젝트 상세 마일스톤

**프로젝트**: Taskry (타스크리)  
**목표**: "Your Personal Flow Engine" - 게이미피케이션 기반 To-Do 웹앱  
**기준 문서**: `docs/idea-001.md` (기획 회의록)  
**작성일**: 2024년

> **참고**: 전체적인 마일스톤 구조는 `docs/Milestone-Basic.md`를 참고하세요.

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

---

## ⚠️ 기획 변경 사항

### 변경 사항
1. **우선순위 재조정**: 배포 및 인증을 최우선으로 변경 (기존: 구현 → 배포 → 인증)
2. **Phase 구조 반영**: Phase 0(환경 구축), Phase 1(UX 개선), Phase 2(게이미피케이션) 순서 적용
3. **Milestone 1 유지**: 지금까지 진행된 Planning Mode 기본 구현 내용은 그대로 유지

---

## 🚀 Milestone 1: Planning Mode 기본 구현 (CRUD + Juicy UI)

**목표**: 간결하고 빠른 입력, 화려한 완료 피드백을 갖춘 Planning Mode 완성  
**우선순위**: 🔴 최우선  
**예상 기간**: 2-3주  
**상태**: 🚧 진행 중 (75%)

### 📋 완료 조건

#### 개발자 (@AI_Dever)
- [x] 할 일 추가 (Create) - `NewTaskInput` 컴포넌트
- [x] 할 일 목록 조회 (Read) - `todos` store 구독
- [x] 할 일 완료/토글 (Update) - `completeTodo` 함수
- [x] 할 일 삭제 (Delete) - `deleteTodo` 함수
- [x] 할 일 수정/편집 (Update) - 인라인 편집
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

### 📝 세부 작업

#### Phase 1.1: 기본 CRUD 완성 ✅
- [x] `todoStore.js`에 `addTodo`, `completeTodo` 구현
- [x] `todoStore.js`에 `deleteTodo(id)` 함수 추가
- [x] `todoStore.js`에 `updateTodo(id, updates)` 함수 추가
- [x] `PlanningMode.svelte`에 삭제 기능 추가
- [x] `PlanningMode.svelte`에 수정 기능 추가

#### Phase 1.2: Juicy UI 애니메이션 구현 🚧
- [ ] 체크박스 컴포넌트에 애니메이션 적용
- [ ] 파티클 라이브러리 통합 (canvas-confetti 또는 GSAP)
- [ ] Micro Reward 팝업 컴포넌트 생성
- [ ] Svelte transition을 활용한 애니메이션 구현
- [ ] 성능 최적화 (60fps 유지)

### 🔗 관련 문서
- `docs/Milestone-1.md` - Milestone 1 상세 문서
- `docs/uiuxGuide.md`: Juicy UI 가이드라인
- `docs/idea-001.md` 토픽 6: 모드 분리 전략

---

## 🚀 Milestone 2: 환경 구축 및 서버 연동 (Phase 0)

**목표**: 앱을 실제 환경에 배포하고, 사용자별 데이터 관리를 시작합니다.  
**우선순위**: 🔴 최우선  
**예상 기간**: 2-3주  
**상태**: ❌ 미시작 (0%)

### 📋 완료 조건

#### 개발자 (@AI_Dever)
- [ ] **M2.1: 프로젝트 배포 환경 구축**
  - [ ] Vercel 배포 파이프라인 설정
  - [ ] 자동화된 배포 프로세스 구성
  - [ ] 환경 변수 설정
  - [ ] 도메인 연결 (선택)
- [ ] **M2.2: Supabase DB 초기 설정**
  - [ ] Supabase 프로젝트 생성
  - [ ] `tasks` 테이블 생성 및 스키마 정의
  - [ ] `users` 테이블 생성 및 스키마 정의
  - [ ] `goals` 테이블 생성 및 스키마 정의
  - [ ] `rewards` 테이블 생성 및 스키마 정의
  - [ ] RLS (Row Level Security) 정책 설정
- [ ] **M2.3: Google OAuth (로그인) 통합**
  - [ ] Supabase Auth 설정
  - [ ] Google OAuth 클라이언트 설정
  - [ ] 로그인/로그아웃 UI 구현
  - [ ] 세션 관리 구현
- [ ] **M2.4: 로컬/서버 동기화 로직 전환**
  - [ ] 기존 IndexedDB 데이터 마이그레이션 로직
  - [ ] Supabase 클라이언트 통합
  - [ ] Tasks CRUD 로직 재구성 (IndexedDB → Supabase)
  - [ ] 오프라인 큐 시스템 구현
  - [ ] 충돌 해결 전략 구현

#### 디자이너 (@AI_Designer)
- [ ] 로그인 화면 디자인
- [ ] 동기화 상태 표시 UI 디자인
- [ ] 다크 모드 + 네온 테마 유지

#### 기획자 (@AI_Planner)
- [ ] 데이터베이스 스키마 설계
- [ ] 동기화 전략 정의
- [ ] 충돌 해결 정책 정의
- [ ] 마이그레이션 계획 수립

#### 고객 (사용자)
- [ ] 배포된 환경에서 앱 사용 확인
- [ ] 로그인 프로세스 편의성 확인
- [ ] 데이터 동기화 안정성 확인

### 📝 세부 작업

#### Phase 2.1: 배포 환경 구축
- [ ] Vercel 프로젝트 생성 및 연결
- [ ] GitHub Actions 또는 Vercel 자동 배포 설정
- [ ] 환경 변수 관리 시스템 구축
- [ ] 빌드 및 배포 테스트

#### Phase 2.2: Supabase 설정
- [ ] Supabase 프로젝트 생성
- [ ] 데이터베이스 스키마 설계 및 생성
- [ ] RLS 정책 설정
- [ ] API 키 및 연결 정보 관리

#### Phase 2.3: 인증 시스템
- [ ] Google OAuth 클라이언트 생성
- [ ] Supabase Auth 설정
- [ ] 로그인/로그아웃 로직 구현
- [ ] 세션 관리 및 보안

#### Phase 2.4: 데이터 동기화
- [ ] Supabase 클라이언트 통합
- [ ] 기존 데이터 마이그레이션 스크립트 작성
- [ ] CRUD 로직 전환
- [ ] 오프라인 지원 로직 구현

### 🔗 관련 문서
- `docs/idea-001.md` 토픽 13: 기술 스택 선택
- `docs/issues/infra/Infra-001.md`: 배포 및 인프라 (예정)

---

## 🚀 Milestone 3: MVP 사용성 및 QoL 개선 (Phase 1)

**목표**: PM(사용자님)이 불편함 없이 앱을 일상적으로 사용할 수 있도록 기본적인 UX 문제를 해결합니다.  
**우선순위**: 🔴 High  
**예상 기간**: 2-3주  
**상태**: ❌ 미시작 (0%)

### 📋 완료 조건

#### 개발자 (@AI_Dever)
- [ ] **M3.1: 입력 UI 위치 조정**
  - [ ] `NewTaskInput.svelte` 컴포넌트를 화면 최하단에 고정
  - [ ] 스크롤 시에도 입력창이 항상 보이도록 구현
  - [ ] 모바일 키보드 대응
- [ ] **M3.2: Goals 상기 기능 통합**
  - [ ] Planning Mode에 Goals List 팝업 버튼 추가
  - [ ] Goals 목록 표시 UI 구현
  - [ ] Goals 선택 및 연동 로직 (선택적 기능)
- [ ] **M3.3: Tasks UI 세부 조정**
  - [ ] Task 글자수 제한 구현 (예: 80자)
  - [ ] 글자수 초과 시 처리 방식 결정 및 구현
  - [ ] 아이콘 및 FRC 스탯의 위치와 크기 재조정
  - [ ] 단순함 유지 (UI 복잡도 최소화)
- [ ] **M3.4: 완료된 Task의 History 로직**
  - [ ] 완료된 Task는 24시간 후 Planning Mode에서 자동 필터링
  - [ ] History View 준비 (별도 화면 또는 섹션)
  - [ ] History 조회 기능 구현

#### 디자이너 (@AI_Designer)
- [ ] 입력창 고정 위치 디자인
- [ ] Goals 팝업 UI 디자인
- [ ] Task 글자수 제한 시 표시 방법 디자인
- [ ] History View 레이아웃 디자인
- [ ] 다크 모드 + 네온 테마 유지

#### 기획자 (@AI_Planner)
- [ ] 입력 UI 위치 및 동작 방식 정의
- [ ] Goals 기능 요구사항 명세
- [ ] Task 글자수 제한 정책 정의
- [ ] History 관리 정책 정의 (24시간 규칙 등)

#### 고객 (사용자)
- [ ] 입력 UI 편의성 확인
- [ ] Goals 기능 유용성 확인
- [ ] Task UI 가독성 확인
- [ ] History 기능 유용성 확인

### 📝 세부 작업

#### Phase 3.1: 입력 UI 개선
- [ ] `NewTaskInput.svelte` 위치 변경 (최하단 고정)
- [ ] CSS `position: fixed` 또는 `sticky` 적용
- [ ] 스크롤 동작 테스트

#### Phase 3.2: Goals 기능
- [ ] Goals 데이터 구조 정의
- [ ] Goals 팝업 컴포넌트 생성
- [ ] Planning Mode와 연동

#### Phase 3.3: Tasks UI 조정
- [ ] 글자수 제한 로직 구현
- [ ] 아이콘/FRC 스탯 위치 재조정
- [ ] UI 간소화

#### Phase 3.4: History 로직
- [ ] 완료 시간 추적 로직
- [ ] 24시간 필터링 로직
- [ ] History View 구현

### 🔗 관련 문서
- `docs/idea-001.md` - 프로젝트 기획 회의록

---

## 🚀 Milestone 4: 게이미피케이션 몰입도 강화 (Phase 2)

**목표**: Taskry의 'Juicy'한 감성을 완성하고, Reward 시스템을 위한 기초 데이터 구조를 확립합니다.  
**우선순위**: 🟡 Medium  
**예상 기간**: 2-3주  
**상태**: ❌ 미시작 (0%)

### 📋 완료 조건

#### 개발자 (@AI_Dever)
- [ ] **M4.1: 사운드 이펙트 통합 (Juicy Audio)**
  - [ ] Task 완료 시 효과음 추가
  - [ ] 체크박스 탭 시 효과음 추가
  - [ ] Svelte Audio Context 사용 (권장)
  - [ ] 사운드 on/off 설정 기능
- [ ] **M4.2: Flow Engine 스탯 추적 데이터 설계**
  - [ ] `users` 테이블에 `xp_total` 필드 추가
  - [ ] `users` 테이블에 `flow_energy_balance` 필드 추가
  - [ ] FRC 스탯 추적 로직 준비
  - [ ] 스탯 업데이트 로직 구현
- [ ] **M4.3: Flow Planner Core 데이터 정의**
  - [ ] 아이템 테이블에 'Flow Planner Core' 아이템 등록
  - [ ] `unlocked_mission_mode: boolean` 상태 필드 관리 로직
  - [ ] 아이템 해금 시스템 기초 구조

#### 디자이너 (@AI_Designer)
- [ ] 사운드 설정 UI 디자인
- [ ] 스탯 표시 UI 디자인
- [ ] 아이템 해금 UI 디자인
- [ ] 다크 모드 + 네온 테마 유지

#### 기획자 (@AI_Planner)
- [ ] 사운드 이펙트 정책 정의
- [ ] Flow Engine 스탯 시스템 설계
- [ ] 아이템 시스템 정책 정의
- [ ] 해금 조건 정의

#### 고객 (사용자)
- [ ] 사운드 이펙트 만족도 확인
- [ ] 스탯 추적 유용성 확인
- [ ] 아이템 시스템 재미 요소 확인

### 📝 세부 작업

#### Phase 4.1: 사운드 이펙트
- [ ] 효과음 파일 준비 또는 생성
- [ ] Audio Context 통합
- [ ] 사운드 재생 로직 구현
- [ ] 설정 UI 구현

#### Phase 4.2: 스탯 추적
- [ ] 데이터베이스 스키마 확장
- [ ] 스탯 업데이트 로직 구현
- [ ] 스탯 표시 UI 구현

#### Phase 4.3: 아이템 시스템
- [ ] 아이템 데이터 구조 정의
- [ ] 해금 로직 구현
- [ ] 아이템 표시 UI 구현

### 🔗 관련 문서
- `docs/idea-001.md` 토픽 5: 성장 시스템 재정의

---

## 🚀 Milestone 5: 보상시스템 구축

**목표**: 지연된 보상 전략을 포함한 완전한 보상 시스템 구현  
**우선순위**: 🟡 Medium  
**예상 기간**: 3-4주  
**상태**: ⚠️ 부분 구현 (10%)

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

### 📝 세부 작업

#### Phase 5.1: Micro Reward 완성
- [ ] Micro Reward 팝업 컴포넌트 개선
- [ ] 즉시 지급 로직 구현
- [ ] Flow Energy 애니메이션 구현
- [ ] 자동 닫기 타이머 구현

#### Phase 5.2: Macro Reward 시스템
- [ ] 지연 보상 큐 시스템 구현
- [ ] 지연 시간 계산 로직 (AI 또는 규칙 기반)
- [ ] Macro Reward 발생 조건 판단
- [ ] 보상 종류 결정 로직
- [ ] Macro Reward 팝업 UI 구현

#### Phase 5.3: 보상 데이터 관리
- [ ] 보상 데이터 구조 설계
- [ ] IndexedDB 스키마 확장
- [ ] 보상 히스토리 추적

### 🔗 관련 문서
- `docs/idea-001.md` 토픽 9: 지연된 보상 전략
- `docs/idea-001.md` 토픽 10: AI 기반 보상 체계

---

## 🚀 Milestone 6: XP 및 레벨 시스템 구축

**목표**: Focus, Rhythm, Catalyst 스탯별 XP 추적 및 레벨 계산  
**우선순위**: 🟡 Medium  
**예상 기간**: 2-3주  
**상태**: ⚠️ 부분 구현 (5%)

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

### 📝 세부 작업

#### Phase 6.1: XP Store 구축
- [ ] `xpStore.js` 생성
- [ ] XP 데이터 구조 정의
- [ ] IndexedDB 스키마 확장
- [ ] XP 누적 로직 구현

#### Phase 6.2: 레벨 시스템
- [ ] 레벨 계산 공식 구현
- [ ] 레벨업 감지 로직
- [ ] 레벨업 이벤트 시스템

#### Phase 6.3: 스탯 추적
- [ ] 스탯별 XP 분리 추적
- [ ] 스탯별 XP 표시 UI
- [ ] 스탯 불균형 분석

### 🔗 관련 문서
- `docs/idea-001.md` 토픽 5: 성장 시스템 재정의

---

## 🚀 Milestone 7: Reward Mode 연동 및 AI 통합

**목표**: Planning Mode와 Reward Mode 완전 연동, AI 기반 보상 체계 통합  
**우선순위**: 🟡 Medium  
**예상 기간**: 4-5주  
**상태**: ⚠️ 부분 구현 (20%)

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

### 📝 세부 작업

#### Phase 7.1: Reward Mode 활성화
- [ ] `RewardMode.svelte` 활성화
- [ ] 이벤트 연결 로직 구현
- [ ] 데이터 연동 구현

#### Phase 7.2: AI 통합
- [ ] AI 프롬프트 구현
- [ ] Edge Function 구현
- [ ] JSON 검증 로직
- [ ] 폴백 시스템 구현

#### Phase 7.3: 전환 애니메이션
- [ ] 화면 전환 애니메이션 구현
- [ ] UX 개선

### 🔗 관련 문서
- `docs/idea-001.md` 토픽 6: 모드 분리 전략
- `docs/idea-001.md` 토픽 10: AI 기반 보상 체계
- `docs/idea-001.md` 토픽 11: AI 리스크 관리

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

## 📌 담당자별 체크리스트 가이드

### 개발자 (@AI_Dever)
각 마일스톤의 "완료 조건 > 개발자" 섹션을 확인하고:
- [ ] 기능 구현 완료
- [ ] 코드 주석 작성
- [ ] 데이터 저장 검증
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
1. Juicy UI 애니메이션 효과 강화
2. 완료된 할 일 분리 표시
3. 수정 기능 UI 개선

### 다음 마일스톤 준비 (Milestone 2)
- 배포 환경 구축 준비
- Supabase 프로젝트 설정
- Google OAuth 설정 준비

---

## ⚠️ 주요 변경 사항 요약

### 기존 구조에서 변경된 사항
1. **우선순위 재조정**: 배포 및 인증을 최우선으로 변경
2. **Phase 구조 반영**: Phase 0(환경 구축), Phase 1(UX 개선), Phase 2(게이미피케이션) 순서 적용
3. **Milestone 1 유지**: 지금까지 진행된 Planning Mode 기본 구현 내용은 그대로 유지
4. **Milestone 재구성**: 
   - Milestone 2: 환경 구축 및 서버 연동 (기존 Milestone 7의 배포 + Milestone 3의 로그인 통합)
   - Milestone 3: MVP 사용성 개선 (새로 추가)
   - Milestone 4: 게이미피케이션 몰입도 강화 (새로 추가)
   - Milestone 5-7: 기존 내용 유지 (보상시스템, XP/레벨, Reward Mode 연동)

---

**마지막 업데이트**: 2024년  
**관리자**: @AI_Planner  
**기준 문서**: `docs/idea-001.md`
