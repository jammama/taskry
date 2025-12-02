**[Assignee]:** @AI_Infra

**[Issue]:** #Infra-001 (배포 및 인프라 시스템 구축)

**[Requirement]:** 
Taskry 프로젝트를 배포하고 관리하기 위한 인프라 시스템을 구축하시오. 현재 프로젝트는 SvelteKit 기반 PWA 웹앱이며, 오프라인 우선 설계로 IndexedDB를 사용합니다.

---

## 📋 프로젝트 현황

### 기술 스택
- **프레임워크**: SvelteKit (v2.48.5)
- **빌드 도구**: Vite (v7.2.2)
- **런타임**: Node.js (ES Modules)
- **PWA**: vite-plugin-pwa 설정 완료
- **데이터 저장소**: IndexedDB (localforage) - 클라이언트 사이드
- **백엔드**: Supabase (향후 연동 예정)

### 현재 빌드 설정
- **빌드 명령어**: `npm run build`
- **어댑터**: `@sveltejs/adapter-auto` (자동 감지)
- **출력 디렉토리**: `.output/`
- **프리뷰 명령어**: `npm run preview`

### 프로젝트 구조
```
taskry/
├── src/                    # 소스 코드
├── static/                 # 정적 파일
├── package.json            # 의존성 및 스크립트
├── vite.config.js          # Vite 설정 (PWA 포함)
├── svelte.config.js        # SvelteKit 설정
└── .output/                # 빌드 출력 (생성됨)
```

---

## 🎯 요구사항

### 1. 배포 서버 구축

#### 현재 상황
- **테스트 환경**: 오라클 클라우드 무료 티어
  - RAM: 1GB
  - Storage: 100GB
  - 용도: 개발/테스트 전용 (실사용 부족)

#### 요구사항
1. **실사용을 위한 클라우드 서비스 제안**
   - 예상 트래픽: 초기 소규모 (동시 사용자 100명 이하)
   - 예상 데이터: 사용자별 IndexedDB (클라이언트 사이드), Supabase 연동 예정
   - 비용 효율적인 솔루션 우선
   - 확장 가능한 구조

2. **서버 사양 제안**
   - 최소 사양 (초기 운영)
   - 권장 사양 (안정적 운영)
   - 확장 계획

3. **서버 환경 구성**
   - OS: Linux (Ubuntu LTS 권장)
   - 웹 서버: Nginx 또는 Apache
   - Node.js 런타임 환경
   - SSL/TLS 인증서 (Let's Encrypt)

#### 제안 요청 사항
- 클라우드 서비스 비교 (AWS, GCP, Azure, DigitalOcean, Vultr 등)
- 비용 분석 (월 예상 비용)
- 설정 가이드 제공

---

### 2. 자동 배포 시스템

#### 목표
- 로컬에서 코드 작성 후 **단일 스크립트 실행**으로 배포 완료
- 개발 → 배포 속도 최대화
- 수동 작업 최소화

#### 현재 가능한 방법 검토
1. **로컬 빌드 + 스크립트 배포**
   - 로컬에서 `npm run build` 실행
   - 빌드 결과물을 서버로 전송 (SCP/RSYNC)
   - 서버에서 서비스 재시작
   - **가능 여부**: 가능하나, CI/CD가 더 효율적

2. **CI/CD 파이프라인** (권장)
   - Git Push → 자동 빌드 → 자동 배포
   - GitHub Actions, GitLab CI, CircleCI 등
   - **장점**: 자동화, 롤백 가능, 테스트 통합 가능

#### 요구사항
1. **배포 스크립트 작성**
   - 로컬 배포 스크립트 (선택 사항)
   - CI/CD 파이프라인 설정 (권장)

2. **배포 프로세스 설계**
   ```
   개발 → Git Push → 자동 빌드 → 테스트 → 배포 → 확인
   ```

3. **환경 변수 관리**
   - 개발/스테이징/프로덕션 환경 분리
   - 환경 변수 보안 관리

#### 제안 요청 사항
- CI/CD 플랫폼 추천 및 비교
- 배포 스크립트 예시 코드
- 롤백 전략
- 무중단 배포 가능 여부

---

### 3. 실행 환경 구성

#### 요구사항
1. **Node.js 환경**
   - Node.js 버전: 18.x 이상 (LTS 권장)
   - npm 또는 pnpm 패키지 매니저

2. **웹 서버 설정**
   - SvelteKit은 SSR(Server-Side Rendering) 또는 SSG(Static Site Generation) 지원
   - 현재 `adapter-auto` 사용 중 → 배포 환경에 맞는 어댑터 필요
   - **옵션**:
     - `@sveltejs/adapter-node`: Node.js 서버
     - `@sveltejs/adapter-static`: 정적 사이트 (SSG)
     - `@sveltejs/adapter-vercel`: Vercel 배포
     - `@sveltejs/adapter-netlify`: Netlify 배포

3. **프로세스 관리**
   - PM2 또는 systemd를 통한 프로세스 관리
   - 자동 재시작 설정
   - 로그 관리

4. **리버스 프록시**
   - Nginx 또는 Apache 설정
   - SSL/TLS 설정
   - 정적 파일 캐싱
   - Gzip 압축

#### 제안 요청 사항
- SvelteKit 어댑터 선택 가이드
- Node.js 서버 vs 정적 사이트 비교
- PM2 설정 예시
- Nginx 설정 예시

---

## 📝 구체적 작업 항목

### Phase 1: 환경 분석 및 제안
- [ ] 클라우드 서비스 비교 분석
- [ ] 비용 분석 및 추천
- [ ] 서버 사양 제안
- [ ] CI/CD 플랫폼 비교

### Phase 2: 배포 환경 구성
- [ ] 서버 초기 설정 (OS, Node.js, Nginx)
- [ ] SvelteKit 어댑터 선택 및 설정
- [ ] 환경 변수 관리 시스템
- [ ] SSL/TLS 인증서 설정

### Phase 3: 배포 자동화
- [ ] CI/CD 파이프라인 설정
- [ ] 배포 스크립트 작성
- [ ] 롤백 스크립트 작성
- [ ] 배포 프로세스 문서화

### Phase 4: 모니터링 및 관리
- [ ] 로그 관리 시스템
- [ ] 모니터링 도구 설정 (선택)
- [ ] 백업 전략 수립

---

## 🔧 기술적 고려사항

### 1. SvelteKit 어댑터 선택
현재 `adapter-auto`를 사용 중이므로, 배포 환경에 맞는 어댑터로 변경 필요:

**옵션 1: Node.js 서버 (VPS/클라우드 서버)**
```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-node';
```
- SSR 지원
- API 라우트 사용 가능
- 서버 관리 필요

**옵션 2: 정적 사이트 (SSG)**
```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-static';
```
- 정적 파일만 배포
- CDN 활용 가능
- 서버 관리 불필요
- **단점**: SSR 불가, API 라우트 제한

**옵션 3: 플랫폼별 어댑터**
- Vercel: `@sveltejs/adapter-vercel`
- Netlify: `@sveltejs/adapter-netlify`
- Cloudflare Pages: `@sveltejs/adapter-cloudflare`

### 2. PWA 고려사항
- Service Worker는 정적 파일로 배포되어야 함
- HTTPS 필수 (PWA 요구사항)
- 매니페스트 파일 접근 가능해야 함

### 3. 오프라인 우선 설계
- IndexedDB는 클라이언트 사이드이므로 서버 영향 없음
- 향후 Supabase 연동 시 백엔드 API 필요

---

## 📚 참고 문서

- `docs/masterRule.md`: 프로젝트 개요
- `docs/devGuideLine.md`: 기술 스택 가이드
- `docs/Milestone-Basic.md`: 마일스톤 7 (배포)
- `package.json`: 프로젝트 의존성
- `vite.config.js`: 빌드 설정
- `svelte.config.js`: SvelteKit 설정

---

## ✅ 완료 조건 (Definition of Done)

- [ ] 클라우드 서비스 선택 및 서버 구축 완료
- [ ] SvelteKit 어댑터 설정 완료
- [ ] CI/CD 파이프라인 구축 완료
- [ ] 배포 스크립트 작성 및 테스트 완료
- [ ] SSL/TLS 인증서 설정 완료
- [ ] 배포 프로세스 문서화 완료
- [ ] 테스트 배포 성공 확인

---

## 🎯 우선순위

1. **🔴 최우선**: 서버 환경 구성 및 기본 배포 설정
2. **🟡 High**: CI/CD 파이프라인 구축
3. **🟢 Medium**: 모니터링 및 최적화

---

**작성일**: 2024년 (현재 날짜)
**담당자**: @AI_Infra

