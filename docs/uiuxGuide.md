# 디자인 및 UX 가이드

1. 디자인 철학: Dark Mode + Neon Glow
- 톤앤매너: 심플하고 세련된 다크 모드 기반의 미래지향적/사이버펑크 룩.

- 핵심 레퍼런스: 제공된 /assets 폴더 내의 디자인 목록

색상 팔레트:

- 배경: #0f0f13 (매우 어두운 남색/검정)

- Surface (카드/패널): #1c1c24

- Focus (성장): 네온 시안 계열 (#00f0ff)

- Rhythm (반복): 네온 핑크/퍼플 계열

- Catalyst (변화): 네온 골드/오렌지 계열

UX 요구사항 (Juicy UI):

- 체크박스: 완료 시 Bounce, Scale, Glow 효과를 동반한 화려한 애니메이션 필수 (0.5~1초 짧은 이펙트).
- Micro Reward 팝업: 화면 중앙에서 부드럽게 등장하며 네온 빛이 감도는 디자인, 자동 닫기 2.5초.
- Macro Reward 팝업: 지연 시간 표시 (NEXT EVOLUTION IN 3 DAYS), 화려한 개봉 애니메이션.

2. 레이아웃 및 모드 분리

Planning Mode (효율 우선):
- 모바일 최적화: max-width: 420px의 단일 열 모바일 앱 레이아웃.
- 구성 요소: 헤더, 입력창 (NewTaskInput.svelte), To-Do 리스트 (TodoItem.svelte).
- 목표: 간결하고 빠른 입력 (0.5초 목표), 완료 시 짧은 이펙트만.

Reward Mode (몰입 우선):
- 엔진 시각화, 보상 개봉, AI 스토리텔링.
- 진입: 투두 화면 상단 알림 또는 일정 시간 간격 푸시 알림.