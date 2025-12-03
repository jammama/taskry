# ⚠️ 마일스톤 충돌 및 상충 사항 분석

**기준 문서**: `docs/idea-001.md` vs `docs/Milestone-Basic.md`  
**작성일**: 2024년

---

## 🔍 주요 충돌 및 상충 사항

### 1. Juicy UI 애니메이션 우선순위

#### 충돌 내용
- **idea-001.md**: "입력은 간결하게, 피드백은 화려하게" - Juicy UI가 핵심 요구사항
- **Milestone-Basic.md**: Milestone 1에 Juicy UI 명시 없음, CRUD만 강조

#### 해결 방안
- ✅ **해결됨**: `Milestone-Basic(Detail).md`에서 Milestone 1에 "Juicy Checkbox 애니메이션" 명시적으로 추가
- Milestone 1 완료 조건에 체크박스 애니메이션, 파티클 효과, Micro Reward 팝업 포함

#### 영향
- Milestone 1 완료 시간이 2-3주로 증가 (기존 1-2주 예상보다 길어짐)
- 하지만 핵심 가치인 "화려한 피드백"을 확보하여 프로젝트 정체성 강화

---

### 2. 지연된 보상 전략의 상세도

#### 충돌 내용
- **idea-001.md**: 지연된 보상 전략이 매우 상세하게 정의됨 (Micro/Macro 분리, 20분~1주일 지연, 아이템으로 단축)
- **Milestone-Basic.md**: Milestone 4에 "Micro/Macro Reward 시스템"만 간략히 언급

#### 해결 방안
- ✅ **해결됨**: `Milestone-Basic(Detail).md`에서 Milestone 4에 지연된 보상 전략 상세 반영
- Micro Reward 즉시 지급, Macro Reward 지연 지급 명시
- 지연 시간 기준, 아이템 설계 등 상세 요구사항 포함

#### 영향
- Milestone 4 복잡도 증가 (3-4주 예상)
- 하지만 사용자 중독성과 기대감 관리에 핵심적인 기능

---

### 3. AI 기능 통합 시점

#### 충돌 내용
- **idea-001.md**: AI 기능이 핵심 기능으로 강조 (투두 자동 분류, 보상 체계 결정)
- **Milestone-Basic.md**: AI 기능이 별도 마일스톤으로 분리되어 있지 않음 (Milestone 4-5에 간략히 언급)

#### 해결 방안
- ✅ **해결됨**: `Milestone-Basic(Detail).md`에서 Milestone 6에 "AI 통합" 추가
- AI 프롬프트 엔지니어링, Edge Function, JSON 검증, 폴백 시스템 포함
- Milestone 4-5에서 기본 보상 체계 구축 후, Milestone 6에서 AI로 고도화

#### 영향
- Milestone 6 기간이 4-5주로 증가 (기존 2-3주 예상보다 길어짐)
- 하지만 AI 기능이 앱의 차별화 포인트이므로 필수

---

### 4. 스탯 시스템 정의

#### 충돌 내용
- **idea-001.md**: Focus, Rhythm, Catalyst 3가지 스탯으로 재정의 (기존 STR, INT, CHA, WIS 대체)
- **Milestone-Basic.md**: 스탯 시스템 언급 없음

#### 해결 방안
- ✅ **해결됨**: 모든 마일스톤에 Focus, Rhythm, Catalyst 스탯 반영
- Milestone 1부터 Task 분류에 3가지 스탯 사용
- Milestone 5에서 스탯별 XP 추적 명시

#### 영향
- 기존 RPG 스타일 스탯 대신 Personal Flow Engine 컨셉에 맞는 스탯으로 통일
- 다양한 삶의 양식을 포괄할 수 있게 됨

---

### 5. Planning Mode vs Reward Mode 분리

#### 충돌 내용
- **idea-001.md**: Planning Mode와 Reward Mode를 명확히 분리 (시간 분할과 맥락 분리 전략)
- **Milestone-Basic.md**: 모드 분리 전략이 명시적으로 없음

#### 해결 방안
- ✅ **해결됨**: Milestone 1에서 Planning Mode 완성, Milestone 6에서 Reward Mode 연동
- 각 모드의 목표와 특징을 명확히 구분
- Planning Mode: 효율성 우선, Reward Mode: 몰입감 우선

#### 영향
- 모드 분리로 인해 사용자 경험이 더 명확해짐
- 개발 복잡도는 증가하나, 사용자 만족도 향상 기대

---

### 6. 배포 시점

#### 충돌 내용
- **idea-001.md**: "구글 로그인 적용 → 배포 서버 및 도메인 구성 → 보상 시스템 구현" 순서
- **Milestone-Basic.md**: Milestone 7이 모든 기능 완성 후 배포

#### 해결 방안
- ✅ **해결됨**: Milestone 3에서 로그인 구현, Milestone 7에서 최종 배포
- 중간 단계에서 테스트 배포 가능하도록 유연성 확보
- 최종 배포는 모든 기능 완성 후 진행

#### 영향
- 중간 단계 테스트 배포로 조기 피드백 가능
- 최종 배포는 안정성 확보 후 진행

---

## 📋 해결되지 않은 잠재적 충돌

### 1. AI 기능의 점진적 도입

#### 문제
- idea-001.md에서는 AI 기능이 핵심이지만, Milestone 6에서만 통합
- Milestone 1-5에서는 AI 없이 기본 보상만 제공

#### 권장 사항
- Milestone 4-5에서 AI 없이 규칙 기반 보상 시스템 먼저 구축
- Milestone 6에서 AI로 고도화하는 것이 리스크 관리에 유리
- 단, 사용자 경험 일관성을 위해 AI 폴백 시스템을 Milestone 4부터 준비

### 2. 오프라인 우선 vs 클라우드 동기화

#### 문제
- idea-001.md: 오프라인 우선 설계 강조
- Milestone 3: 클라우드 동기화 필수

#### 권장 사항
- Milestone 1-2: 완전 오프라인 (IndexedDB만 사용)
- Milestone 3: 클라우드 동기화 추가하되, 오프라인 우선 원칙 유지
- 오프라인 중 변경사항은 큐에 저장 후 온라인 시 동기화

---

## ✅ 최종 권장 사항

### 우선순위 조정
1. **Milestone 1 완성도 높이기**: Juicy UI 애니메이션을 포함하여 핵심 가치 확보
2. **Milestone 4 상세화**: 지연된 보상 전략을 명확히 정의하여 중독성 확보
3. **Milestone 6 AI 통합**: AI 기능을 별도 마일스톤으로 분리하여 리스크 관리

### 개발 순서 최적화
- Milestone 1-3: 순차 진행 (기본 기능 완성)
- Milestone 4-5: 병렬 진행 가능 (보상 시스템과 XP 시스템)
- Milestone 6: Milestone 4-5 완료 후 진행 (AI 통합)
- Milestone 7: 모든 기능 완성 후 진행

---

**작성일**: 2024년  
**관리자**: @AI_Planner

