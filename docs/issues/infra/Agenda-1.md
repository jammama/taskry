**[Assignee]:** @AI_Infra

**[Issue]:** #Infra-001 (배포 및 인프라 시스템 구축) - 작업 계획서

**[Reference]:** `docs/issues/infra/Infra-001.md`

---

## 📋 요구사항 답안

### 1. 클라우드 서비스 비교 및 추천

#### 서비스 비교 분석

| 서비스 | 초기 비용/월 | 장점 | 단점 | 추천도 |
|--------|------------|------|------|--------|
| **Vercel** | $0 (Hobby) | SvelteKit 최적화, 자동 배포, CDN, SSL 무료 | 서버리스 제한, 대역폭 제한 | ⭐⭐⭐⭐⭐ |
| **Netlify** | $0 (Starter) | Git 연동, 자동 배포, CDN, SSL 무료 | 빌드 시간 제한, 대역폭 제한 | ⭐⭐⭐⭐ |
| **Cloudflare Pages** | $0 | 무료 CDN, 빠른 속도, 무제한 대역폭 | 빌드 시간 제한 | ⭐⭐⭐⭐ |
| **DigitalOcean** | $6~12 | VPS 완전 제어, 확장 용이 | 수동 설정 필요 | ⭐⭐⭐ |
| **AWS Amplify** | $0~15 | AWS 생태계, 확장성 | 복잡한 설정 | ⭐⭐⭐ |
| **Vultr** | $6~12 | 저렴한 VPS, 빠른 속도 | 수동 설정 필요 | ⭐⭐⭐ |

#### 🎯 최종 추천: **Vercel** (1순위) 또는 **Cloudflare Pages** (2순위)

**추천 이유:**
1. **비용 효율성**: 무료 티어로 시작 가능 (초기 트래픽 100명 이하 충분)
2. **SvelteKit 최적화**: Vercel은 SvelteKit 공식 파트너, 자동 최적화
3. **자동 배포**: Git Push만으로 자동 배포 완료
4. **SSL/TLS**: 자동 인증서 관리
5. **CDN**: 글로벌 CDN으로 빠른 속도
6. **확장성**: 트래픽 증가 시 유료 플랜으로 쉽게 전환

**비용 분석:**
- **초기 (무료 티어)**: $0/월
  - Vercel: 100GB 대역폭, 무제한 빌드
  - Cloudflare Pages: 무제한 대역폭, 500 빌드/월
- **성장 단계**: $20/월 (Pro 플랜)
  - 대역폭 확장, 고급 기능

#### 대안: VPS 서버 (DigitalOcean/Vultr)
- **용도**: 완전한 제어가 필요한 경우
- **비용**: $6~12/월 (1GB RAM, 1 vCPU)
- **추가 작업**: 서버 설정, Nginx, SSL 인증서 수동 관리

---

### 2. 서버 사양 제안

#### 옵션 A: 플랫폼 서비스 (Vercel/Netlify/Cloudflare Pages)
- **서버 관리 불필요**: 플랫폼이 자동 관리
- **사양**: 자동 스케일링
- **초기 비용**: $0

#### 옵션 B: VPS 서버 (DigitalOcean/Vultr)
**최소 사양 (초기 운영):**
- CPU: 1 vCPU
- RAM: 1GB
- Storage: 25GB SSD
- Network: 1TB 전송
- **비용**: $6/월

**권장 사양 (안정적 운영):**
- CPU: 2 vCPU
- RAM: 2GB
- Storage: 50GB SSD
- Network: 3TB 전송
- **비용**: $12/월

**확장 계획:**
- 사용자 증가 시: 4GB RAM, 4 vCPU ($24/월)
- 데이터베이스 분리: 별도 DB 서버 추가

---

### 3. CI/CD 플랫폼 비교 및 추천

#### 플랫폼 비교

| 플랫폼 | 무료 티어 | 장점 | 단점 | 추천도 |
|--------|----------|------|------|--------|
| **GitHub Actions** | 2,000분/월 | Git 통합, 무료, 넓은 생태계 | 복잡한 설정 | ⭐⭐⭐⭐⭐ |
| **Vercel/Netlify** | 무제한 | 자동 설정, Git 연동 | 플랫폼 종속 | ⭐⭐⭐⭐⭐ |
| **GitLab CI** | 400분/월 | 통합 플랫폼 | 제한적 무료 | ⭐⭐⭐ |
| **CircleCI** | 6,000분/월 | 강력한 기능 | 복잡함 | ⭐⭐⭐ |

#### 🎯 최종 추천: **Vercel 자동 배포** 또는 **GitHub Actions**

**Vercel 자동 배포 (권장):**
- Git 저장소 연결만으로 자동 배포
- Pull Request 미리보기
- 자동 롤백
- 환경 변수 관리 UI

**GitHub Actions (고급 제어 필요 시):**
- 완전한 커스터마이징
- 테스트 통합
- 다중 환경 배포

---

### 4. SvelteKit 어댑터 선택 가이드

#### 현재 상황
- `@sveltejs/adapter-auto` 사용 중
- PWA 설정 완료 (vite-plugin-pwa)
- IndexedDB 사용 (클라이언트 사이드)

#### 🎯 추천: 배포 플랫폼에 따라 선택

**옵션 1: Vercel 배포 (최우선 추천)**
```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-vercel';
```
- **장점**: 
  - SvelteKit 최적화
  - SSR/SSG 자동 선택
  - Edge Functions 지원
  - 자동 배포
- **설정**: `npm install -D @sveltejs/adapter-vercel`

**옵션 2: Cloudflare Pages 배포**
```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-cloudflare';
```
- **장점**: 
  - 무제한 대역폭
  - 빠른 CDN
  - Workers 지원
- **설정**: `npm install -D @sveltejs/adapter-cloudflare`

**옵션 3: 정적 사이트 (SSG) - 모든 플랫폼 호환**
```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-static';
```
- **장점**: 
  - 모든 플랫폼 호환
  - CDN 최적화
  - 서버 비용 없음
- **단점**: 
  - SSR 불가
  - API 라우트 제한
- **설정**: `npm install -D @sveltejs/adapter-static`

**옵션 4: Node.js 서버 (VPS 배포 시)**
```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-node';
```
- **장점**: 
  - 완전한 SSR
  - API 라우트 지원
  - 서버 제어
- **단점**: 
  - 서버 관리 필요
  - 확장성 제한
- **설정**: `npm install -D @sveltejs/adapter-node`

#### 최종 결정: **Vercel 어댑터** 또는 **Static 어댑터**
- PWA는 정적 파일로도 동작 가능
- IndexedDB는 클라이언트 사이드
- 향후 Supabase 연동 시 API는 Supabase에서 처리

---

### 5. 배포 자동화 전략

#### 전략 A: Vercel 자동 배포 (가장 간단)
1. Vercel 계정 생성
2. GitHub 저장소 연결
3. 자동 배포 완료
4. 환경 변수는 Vercel 대시보드에서 관리

**배포 프로세스:**
```
개발 → Git Push → Vercel 자동 빌드 → 자동 배포 → 확인
```

#### 전략 B: GitHub Actions + Vercel/Cloudflare Pages
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
```

#### 전략 C: 로컬 배포 스크립트 (VPS 배포 시)
```bash
#!/bin/bash
# deploy.sh
npm run build
rsync -avz --delete .output/ user@server:/var/www/taskry/
ssh user@server "pm2 restart taskry"
```

---

## 📝 Phase별 작업 계획

### Phase 1: 환경 분석 및 제안 ✅

#### 완료 항목
- [x] 클라우드 서비스 비교 분석
- [x] 비용 분석 및 추천 (Vercel 우선)
- [x] 서버 사양 제안
- [x] CI/CD 플랫폼 비교

#### 결정 사항
1. **배포 플랫폼**: Vercel (1순위) 또는 Cloudflare Pages (2순위)
2. **어댑터**: `@sveltejs/adapter-vercel` 또는 `@sveltejs/adapter-static`
3. **CI/CD**: Vercel 자동 배포 또는 GitHub Actions

---

### Phase 2: 배포 환경 구성

#### 작업 항목
- [ ] **2.1 SvelteKit 어댑터 변경**
  - 현재: `@sveltejs/adapter-auto`
  - 변경: `@sveltejs/adapter-vercel` 또는 `@sveltejs/adapter-static`
  - 작업 파일: `svelte.config.js`
  - 명령어: `npm install -D @sveltejs/adapter-vercel`

- [ ] **2.2 빌드 설정 확인**
  - `package.json` 빌드 스크립트 확인
  - PWA 빌드 설정 검증
  - 환경 변수 설정 확인

- [ ] **2.3 배포 플랫폼 계정 생성**
  - Vercel 계정 생성 (또는 Cloudflare Pages)
  - 프로젝트 연결 준비

- [ ] **2.4 환경 변수 관리 시스템**
  - 개발/프로덕션 환경 변수 분리
  - `.env.example` 파일 생성
  - 플랫폼별 환경 변수 설정 방법 문서화

#### 예상 소요 시간
- 어댑터 변경: 30분
- 빌드 테스트: 1시간
- 플랫폼 설정: 1시간
- **총 예상 시간**: 2.5시간

---

### Phase 3: 배포 자동화

#### 작업 항목
- [ ] **3.1 Vercel 자동 배포 설정 (권장)**
  - GitHub 저장소 연결
  - 빌드 설정 확인
  - 자동 배포 활성화
  - 배포 URL 확인

- [ ] **3.2 GitHub Actions 파이프라인 (선택)**
  - `.github/workflows/deploy.yml` 생성
  - 빌드 및 테스트 단계 추가
  - 배포 단계 설정
  - 환경 변수 시크릿 설정

- [ ] **3.3 배포 스크립트 작성 (VPS 배포 시)**
  - `scripts/deploy.sh` 생성
  - 빌드 → 전송 → 재시작 프로세스
  - 롤백 스크립트 작성

- [ ] **3.4 배포 프로세스 문서화**
  - 배포 가이드 작성
  - 롤백 절차 문서화
  - 문제 해결 가이드

#### 예상 소요 시간
- Vercel 설정: 1시간
- GitHub Actions (선택): 2시간
- 문서화: 1시간
- **총 예상 시간**: 2-4시간

---

### Phase 4: 모니터링 및 관리

#### 작업 항목
- [ ] **4.1 로그 관리 시스템**
  - Vercel: 내장 로그 확인
  - VPS: PM2 로그 설정 또는 systemd 로그
  - 로그 로테이션 설정

- [ ] **4.2 모니터링 도구 설정 (선택)**
  - Vercel Analytics (무료)
  - Uptime 모니터링 (UptimeRobot 등)
  - 에러 추적 (Sentry 등)

- [ ] **4.3 백업 전략 수립**
  - 코드: Git 저장소 (자동)
  - 환경 변수: 문서화 및 안전한 저장
  - 데이터: IndexedDB는 클라이언트 사이드 (백업 불필요)
  - 향후 Supabase 연동 시: Supabase 백업 활용

- [ ] **4.4 성능 최적화**
  - 빌드 최적화 확인
  - CDN 캐싱 설정
  - 이미지 최적화
  - 번들 크기 분석

#### 예상 소요 시간
- 로그 설정: 1시간
- 모니터링 설정: 2시간
- 백업 전략: 1시간
- **총 예상 시간**: 4시간

---

## 🎯 우선순위 및 실행 계획

### 즉시 실행 (Phase 2)
1. **SvelteKit 어댑터 변경** (30분)
   - Vercel 어댑터 설치 및 설정
   - 빌드 테스트

2. **Vercel 배포 설정** (1시간)
   - 계정 생성 및 프로젝트 연결
   - 첫 배포 실행

### 단기 실행 (Phase 3)
3. **자동 배포 완성** (1-2시간)
   - Git 연동 확인
   - 환경 변수 설정

### 중기 실행 (Phase 4)
4. **모니터링 및 최적화** (4시간)
   - 로그 관리
   - 성능 모니터링

---

## 📚 참고 자료

### 공식 문서
- [SvelteKit Adapters](https://svelte.dev/docs/kit/adapters)
- [Vercel SvelteKit 가이드](https://vercel.com/docs/frameworks/sveltekit)
- [Cloudflare Pages SvelteKit](https://developers.cloudflare.com/pages/framework-guides/sveltekit/)
- [GitHub Actions 문서](https://docs.github.com/en/actions)

### 프로젝트 문서
- `docs/issues/infra/Infra-001.md`: 원본 요구사항
- `docs/devGuideLine.md`: 기술 스택 가이드
- `docs/Milestone-Basic.md`: 마일스톤 7 (배포)

---

## ✅ 체크리스트

### Phase 2 체크리스트
- [ ] 어댑터 패키지 설치 완료
- [ ] `svelte.config.js` 수정 완료
- [ ] 로컬 빌드 테스트 성공
- [ ] 배포 플랫폼 계정 생성 완료
- [ ] 환경 변수 목록 정리 완료

### Phase 3 체크리스트
- [ ] 자동 배포 설정 완료
- [ ] 첫 배포 성공 확인
- [ ] Git Push → 자동 배포 테스트 성공
- [ ] 배포 URL 접근 확인
- [ ] PWA 동작 확인

### Phase 4 체크리스트
- [ ] 로그 확인 경로 파악
- [ ] 모니터링 도구 설정 (선택)
- [ ] 백업 전략 문서화 완료
- [ ] 성능 최적화 확인

---

**작성일**: 2024년 12월
**담당자**: @AI_Infra
**상태**: 📋 Planning → 🚧 Ready for Implementation
