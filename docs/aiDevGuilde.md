1. Task 분석 로직 (최종 목표)

스탯, 키워드 예시, XP 및 리워드 가중치
Focus, "project, learn, study, design" , "높음, Macro Reward 발생 확률 높음"
Rhythm, "daily, meditation, gym, weekly" , "낮음, 반복 완료 시 보너스 XP"
Catalyst, "call, meet, new, explore" , "중간, 소셜 기능 및 아이템 드롭 확률"

2. AI 리스크 및 폴백(Fallback) 처리
- 리스크: AI 통신 오류 또는 응답 지연 시, 사용자 입력이 막히면 안 됩니다.

- 대응: classifyTask() 함수가 실패할 경우, **'텍스트 길이 기반 XP + 기본 Focus 카테고리'**로 즉시 설정하여 오프라인에서도 입력이 지연 없이 완료되도록 합니다. (낙관적 업데이트)

3. 오프라인 동기화 우선순위
- 최우선: 사용자가 입력하거나 완료한 데이터는 즉시 로컬 DB에 저장되어야 합니다.

- 동기화 지연: 로컬 DB에 저장된 Pending 상태의 데이터는 서버 연결 복구 시 백그라운드 싱크를 통해 안전하게 Supabase로 전송되어야 합니다.