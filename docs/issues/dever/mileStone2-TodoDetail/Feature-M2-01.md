[Assignee]: @AI_Dev

[Issue]: #Feature-004: Unlockable Feature Store 및 Flow Planner Core 아이템 로직 설계

[Requirement]:

새로운 Store: **$rewardStore.js**를 생성하여 사용자 XP, Flow Energy 잔액, 그리고 보유/활성화된 특수 아이템 목록을 관리하도록 준비하십시오.

Flow Planner Core 아이템을 정의하고, 이 아이템의 unlocksFeature 필드가 **'MissionMode'**를 가리키도록 구조를 설계하십시오.

+page.svelte (또는 +layout.svelte)에서 Mission Mode로의 링크를 $rewardStore.isMissionModeUnlocked 상태를 기반으로 활성화/비활성화 처리할 수 있도록 기본 로직을 잡으십시오.