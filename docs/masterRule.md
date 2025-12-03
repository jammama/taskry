#🚀 Taskry 프로젝트 마스터 가이드라인

## I. 프로젝트 개요 및 목표
## 프로젝트 명: Taskry (타스크리)

슬로건: "Your Personal Flow Engine" (나만의 몰입 엔진)

MVP 목표: Planning Mode (할 일 입력 및 관리), Micro Reward (즉각 보상), Macro Reward (지연 보상) 시스템의 완벽한 구현.

핵심 철학: Gamification을 통해 To-Do List의 지속적인 사용 동기를 부여하고, 성장 엔진 테마를 통해 사용자의 자기계발을 시각화합니다.

오프라인 대응 필수: 핵심 기능(To-Do 입력, 완료, 읽기)은 PWA와 IndexedDB를 통해 서버 연결 없이도 완벽하게 동작해야 합니다.

### Git & 협업 : Git 저장소 중심
- 모든 작업은 이슈(Issue) 생성 후, 기능별 Feature Branch를 통해 진행하고, 최종 결과물은 Pull Request로 제출합니다. 권한이 없는 경우 프롬프트 사용자에게 권한 요청, 혹은 산출물을 복사 > 붙여넣기 가능한 형태로 제공합니다.
- 작업시에는 masterRule.md, devGuideLine.md의 규칙을 따르고, 프롬프트 사용자가 제안하는 ref문서들을 참조하여 작업을 진행하세요. 
- 해당 규칙과 사용자의 제안이 어긋나는 경우, 사용자에게 규칙과 제안의 미스매치를 설명 한 뒤 이후 입력되는 사용자의 추가적인 대처 방안을 우선시하여 진행합니다.