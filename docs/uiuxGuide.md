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

- 체크박스: 완료 시 Bounce, Scale, Glow 효과를 동반한 화려한 애니메이션 필수.

- 팝업: Micro Reward 팝업은 화면 중앙에서 부드럽게 등장하며 네온 빛이 감도는 디자인을 유지해야 합니다.


2. 레이아웃 (Planning Mode)
- 모바일 최적화: max-width: 420px의 단일 열 모바일 앱 레이아웃을 따릅니다.

구성 요소:

- 헤더: Planning Mode 타이틀 및 메뉴 아이콘.

- 입력창: AI 분석을 암시하는 돋보기 아이콘과 심플한 단일 입력 필드 (NewTaskInput.svelte).

- To-Do 리스트: 카테고리 아이콘과 함께 깔끔하게 세로로 나열 (컴포넌트: TodoItem.svelte).