1. Task 분석 로직 (최종 목표)

스탯, 키워드 예시, XP 및 리워드 가중치
- Focus: "project, learn, study, design" → 높은 XP, Macro Reward 발생 확률 높음
- Rhythm: "daily, meditation, gym, weekly" → 낮은 XP, 반복 완료 시 보너스 XP
- Catalyst: "call, meet, new, explore" → 중간 XP, 소셜 기능 및 아이템 드롭 확률

2. AI 리스크 및 폴백(Fallback) 처리
- 리스크: AI 통신 오류 또는 응답 지연 시, 사용자 입력이 막히면 안 됩니다.
- 대응: classifyTask() 함수가 실패할 경우, **'텍스트 길이 기반 XP (최소 20 XP) + 기본 Focus 카테고리'**로 즉시 설정하여 오프라인에서도 입력이 지연 없이 완료되도록 합니다. (낙관적 업데이트)
- AI 프롬프트 엔지니어링: JSON 스키마 강제, ENUM 및 범위 제한, 서버 측 유효성 검사 필수
- 폴백 보상: AI 실패 시 Micro Reward는 즉시 지급, Macro Reward는 "시스템 분석 오류로 지연" 메시지 표시

3. 지연된 보상 전략
- Micro Reward: 즉시 지급 (완료 시 바로 표시, 0.5~1초 짧은 이펙트)
- Macro Reward: 지연 지급 (기본 20분~최대 1주일, 난이도/동기 기반)
- 지연 시간 기준: Rhythm 짧게, Focus/Catalyst 길게, 랜덤 ±10% 추가

4. 오프라인 동기화 우선순위
- 최우선: 사용자가 입력하거나 완료한 데이터는 즉시 로컬 DB에 저장되어야 합니다.
- 동기화 지연: 로컬 DB에 저장된 Pending 상태의 데이터는 서버 연결 복구 시 백그라운드 싱크를 통해 안전하게 Supabase로 전송되어야 합니다.