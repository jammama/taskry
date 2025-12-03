# II. 기술 스택 및 개발 가이드

## 영역,기술 스택,가이드라인

### 프론트엔드 : SvelteKit (JavaScript)
-  성능과 애니메이션 구현의 용이성을 최우선으로 합니다. TypeScript는 배제하고 JS 기반으로 개발 속도를 높입니다.

### 백엔드/DB : Supabase 
- 인증 (Google OAuth), 실시간 데이터베이스, 파일 저장소(향후) 용도로 사용.

### 오프라인 지원 : PWA + IndexedDB
- vite-plugin-pwa를 사용해 PWA 구조를 잡고, localforage 또는 idb를 활용하여 오프라인 데이터 캐싱 및 동기화 로직을 구현합니다.

### 디자인/애니메이션 : CSS Keyframes + Svelte Transition
- 과도한 라이브러리 의존을 줄이고, Svelte 고유의 트랜지션을 활용하여 'Juicy UI'를 구현합니다.
- 파티클 효과가 필요한 경우: canvas-confetti 또는 GSAP 사용 가능 (성능 최적화 필수)

### 코드 주석
- 모든 파일과 함수에는 각각 해당 내용의 기능을 설명하는 주석을 제공합니다.
