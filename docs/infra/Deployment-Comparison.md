**[Assignee]:** @AI_Infra

**[Issue]:** #Infra-001 (배포 방식 비교 분석)

**[Reference]:** `docs/issues/infra/Infra-001.md`, `docs/infra/Static-Deployment-Guide.md`

---

## 📋 배포 방식 비교 분석

Taskry 프로젝트에 적합한 배포 방식을 비교 분석합니다.

---

## 1. Static Site Generation (SSG) - 현재 설정

### 현재 구성
- **어댑터**: `@sveltejs/adapter-static`
- **빌드 출력**: 정적 HTML/CSS/JS 파일
- **배포 대상**: 모든 웹 서버 (Nginx, Apache, CDN 등)

### 장점 ✅
1. **간단한 배포**: 빌드된 파일만 서버에 업로드하면 됨
2. **빠른 속도**: 정적 파일이므로 매우 빠름
3. **비용 효율적**: 서버 리소스 최소화, CDN 활용 가능
4. **확장성**: CDN을 통한 글로벌 배포 용이
5. **보안**: 서버 사이드 코드가 없어 공격 면적 최소화
6. **PWA 호환**: 정적 파일로 PWA 완벽 지원
7. **오프라인 지원**: Service Worker와 함께 완벽한 오프라인 동작

### 단점 ❌
1. **SSR 불가**: 서버 사이드 렌더링 불가능
2. **API 라우트 제한**: SvelteKit의 `+server.ts` API 라우트 사용 불가
3. **동적 콘텐츠 제한**: 빌드 시점에 모든 페이지가 생성되어야 함
4. **SEO 제한**: 완전한 SSR만큼 SEO 최적화는 아님 (하지만 충분히 좋음)

### 적합한 경우
- ✅ PWA 앱 (현재 Taskry 프로젝트)
- ✅ 클라이언트 사이드 데이터 저장 (IndexedDB)
- ✅ 외부 API 사용 (Supabase 등)
- ✅ 서버 관리 최소화 원하는 경우
- ✅ 비용 최소화 원하는 경우

### 비용
- **서버**: $0~6/월 (VPS 사용 시)
- **CDN**: $0~20/월 (Cloudflare 무료 또는 유료)
- **총 예상**: $0~26/월

---

## 2. Node.js 서버 배포

### 구성
- **어댑터**: `@sveltejs/adapter-node`
- **빌드 출력**: Node.js 서버 애플리케이션
- **배포 대상**: Node.js 런타임이 있는 서버

### 장점 ✅
1. **완전한 SSR**: 서버 사이드 렌더링 지원
2. **API 라우트**: SvelteKit의 `+server.ts` API 라우트 사용 가능
3. **동적 콘텐츠**: 런타임에 동적으로 페이지 생성
4. **SEO 최적화**: 완전한 SSR로 SEO에 유리
5. **서버 사이드 로직**: 복잡한 서버 로직 구현 가능

### 단점 ❌
1. **서버 관리 필요**: Node.js 프로세스 관리 필요 (PM2 등)
2. **리소스 사용**: 서버 CPU/메모리 지속적 사용
3. **확장성 제한**: 단일 서버의 성능에 제한
4. **비용 증가**: 서버 리소스 필요
5. **복잡한 설정**: Nginx 리버스 프록시, PM2 설정 등 필요

### 적합한 경우
- ✅ 서버 사이드 API가 필요한 경우
- ✅ 실시간 데이터 처리 필요
- ✅ 사용자별 동적 콘텐츠 생성 필요
- ✅ SEO가 매우 중요한 경우

### 비용
- **서버**: $12~24/월 (2GB RAM 이상 권장)
- **모니터링**: $0~10/월 (선택)
- **총 예상**: $12~34/월

### 설정 예시

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-node';

export default {
  kit: {
    adapter: adapter({
      out: 'build',
      precompress: false,
      envPrefix: ''
    })
  }
};
```

```bash
# PM2 설정
npm install -g pm2
pm2 start build/index.js --name taskry
pm2 save
pm2 startup
```

---

## 3. Vercel 배포

### 구성
- **어댑터**: `@sveltejs/adapter-vercel`
- **빌드**: Vercel 플랫폼에서 자동 빌드
- **배포**: Git Push만으로 자동 배포

### 장점 ✅
1. **자동 배포**: Git 연동으로 완전 자동화
2. **SvelteKit 최적화**: 공식 파트너로 최적화됨
3. **Edge Functions**: 서버리스 함수 지원
4. **CDN 자동**: 글로벌 CDN 자동 제공
5. **SSL 자동**: Let's Encrypt 자동 관리
6. **Preview 배포**: PR별 미리보기 배포
7. **무료 티어**: 초기에는 무료로 시작 가능

### 단점 ❌
1. **플랫폼 종속**: Vercel에 종속됨
2. **비용 증가**: 트래픽 증가 시 비용 증가
3. **서버 제어 제한**: 서버 설정 제어 제한적
4. **대역폭 제한**: 무료 티어는 100GB/월

### 적합한 경우
- ✅ 빠른 배포 원하는 경우
- ✅ 자동화된 CI/CD 원하는 경우
- ✅ 서버 관리 없이 배포 원하는 경우
- ✅ 초기 비용 최소화

### 비용
- **무료 티어**: $0/월 (100GB 대역폭)
- **Pro 플랜**: $20/월 (1TB 대역폭)
- **총 예상**: $0~20/월

### 설정 예시

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-vercel';

export default {
  kit: {
    adapter: adapter({
      // Edge Functions 사용 시
      runtime: 'nodejs18.x'
    })
  }
};
```

---

## 4. Cloudflare Pages 배포

### 구성
- **어댑터**: `@sveltejs/adapter-cloudflare`
- **빌드**: Cloudflare Pages에서 자동 빌드
- **배포**: Git 연동 자동 배포

### 장점 ✅
1. **무제한 대역폭**: 무료 티어에서도 무제한
2. **빠른 CDN**: Cloudflare 글로벌 네트워크
3. **Workers 지원**: Edge Computing 지원
4. **비용 효율적**: 무료 티어가 매우 관대함
5. **DDoS 보호**: 자동 DDoS 보호
6. **SSL 자동**: 자동 SSL 인증서

### 단점 ❌
1. **빌드 시간 제한**: 무료 티어는 500 빌드/월
2. **플랫폼 종속**: Cloudflare에 종속
3. **서버 제어 제한**: 서버 설정 제어 제한적

### 적합한 경우
- ✅ 대역폭이 중요한 경우
- ✅ 글로벌 사용자 대상
- ✅ 비용 최소화
- ✅ 빠른 CDN 필요

### 비용
- **무료 티어**: $0/월 (무제한 대역폭, 500 빌드/월)
- **Pro 플랜**: $20/월 (무제한 빌드)
- **총 예상**: $0~20/월

---

## 5. Netlify 배포

### 구성
- **어댑터**: `@sveltejs/adapter-netlify`
- **빌드**: Netlify에서 자동 빌드
- **배포**: Git 연동 자동 배포

### 장점 ✅
1. **간단한 설정**: 매우 쉬운 설정
2. **Forms 지원**: 내장 폼 처리
3. **Functions 지원**: 서버리스 함수
4. **Split Testing**: A/B 테스트 지원
5. **무료 티어**: 관대한 무료 티어

### 단점 ❌
1. **빌드 시간 제한**: 무료 티어는 300분/월
2. **대역폭 제한**: 무료 티어는 100GB/월
3. **플랫폼 종속**: Netlify에 종속

### 비용
- **무료 티어**: $0/월 (100GB 대역폭, 300분 빌드)
- **Pro 플랜**: $19/월
- **총 예상**: $0~19/월

---

## 📊 비교 표

| 배포 방식 | 초기 비용 | 확장성 | 관리 복잡도 | SSR | API 라우트 | 추천도 |
|----------|---------|--------|------------|-----|-----------|--------|
| **Static (현재)** | $0~6 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ❌ | ❌ | ⭐⭐⭐⭐⭐ |
| **Node.js 서버** | $12~24 | ⭐⭐⭐ | ⭐⭐ | ✅ | ✅ | ⭐⭐⭐ |
| **Vercel** | $0~20 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| **Cloudflare Pages** | $0~20 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| **Netlify** | $0~19 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ | ✅ | ⭐⭐⭐⭐ |

---

## 🎯 Taskry 프로젝트에 대한 추천

### 현재 상황 분석
- ✅ PWA 앱 (오프라인 우선)
- ✅ IndexedDB 사용 (클라이언트 사이드)
- ✅ 향후 Supabase 연동 예정 (외부 API)
- ✅ 서버 사이드 API 라우트 불필요
- ✅ 비용 최소화 필요

### 추천 순위

#### 1순위: **Static 배포 (현재 설정)** ⭐⭐⭐⭐⭐
**이유:**
- PWA는 정적 파일로 완벽하게 동작
- IndexedDB는 클라이언트 사이드이므로 서버 불필요
- Supabase는 외부 API이므로 서버 사이드 라우트 불필요
- 비용 최소화
- 서버 관리 최소화

**단점 보완:**
- SEO: 정적 파일도 충분히 SEO에 좋음 (메타 태그, 구조화된 데이터)
- 동적 콘텐츠: Supabase를 통한 클라이언트 사이드 처리

#### 2순위: **Vercel 배포** ⭐⭐⭐⭐⭐
**이유:**
- 자동 배포로 개발 속도 향상
- SvelteKit 최적화
- 무료 티어로 시작 가능
- 필요시 Edge Functions 사용 가능

**전환 시점:**
- 자동 배포가 필요할 때
- 서버 관리 시간을 줄이고 싶을 때

#### 3순위: **Cloudflare Pages** ⭐⭐⭐⭐
**이유:**
- 무제한 대역폭
- 빠른 CDN
- 비용 효율적

**전환 시점:**
- 대역폭이 중요한 경우
- 글로벌 사용자 대상일 때

#### 비추천: **Node.js 서버 배포** ⭐⭐⭐
**이유:**
- 현재 프로젝트에 서버 사이드 로직이 불필요
- 비용 증가
- 관리 복잡도 증가
- 장점을 활용할 필요가 없음

**필요 시점:**
- 향후 서버 사이드 API가 필요할 때
- 실시간 기능이 필요할 때

---

## 🔄 배포 방식 전환 가이드

### Static → Vercel 전환

```bash
# 1. 어댑터 변경
npm install -D @sveltejs/adapter-vercel
npm uninstall @sveltejs/adapter-static

# 2. svelte.config.js 수정
import adapter from '@sveltejs/adapter-vercel';

# 3. Vercel 계정 생성 및 프로젝트 연결
# vercel.com에서 GitHub 저장소 연결
```

### Static → Cloudflare Pages 전환

```bash
# 1. 어댑터 변경
npm install -D @sveltejs/adapter-cloudflare
npm uninstall @sveltejs/adapter-static

# 2. svelte.config.js 수정
import adapter from '@sveltejs/adapter-cloudflare';

# 3. Cloudflare Pages에서 프로젝트 연결
```

### Static → Node.js 서버 전환

```bash
# 1. 어댑터 변경
npm install -D @sveltejs/adapter-node
npm uninstall @sveltejs/adapter-static

# 2. svelte.config.js 수정
import adapter from '@sveltejs/adapter-node';

# 3. PM2 설치 및 설정
npm install -g pm2
pm2 start build/index.js --name taskry
```

---

## 💡 최종 권장사항

### 현재 단계 (초기 배포)
**Static 배포 유지** ✅
- 비용 최소화
- 서버 관리 최소화
- PWA 완벽 지원
- 충분한 성능

### 성장 단계 (트래픽 증가)
**Vercel 또는 Cloudflare Pages로 전환 고려**
- 자동 배포로 개발 속도 향상
- CDN을 통한 성능 향상
- 무료/저렴한 티어 활용

### 확장 단계 (서버 로직 필요 시)
**Node.js 서버 추가 고려**
- 서버 사이드 API 필요 시
- 실시간 기능 필요 시
- 복잡한 서버 로직 필요 시

---

## 📚 참고 자료

- [SvelteKit Adapters 공식 문서](https://svelte.dev/docs/kit/adapters)
- [Vercel SvelteKit 가이드](https://vercel.com/docs/frameworks/sveltekit)
- [Cloudflare Pages SvelteKit](https://developers.cloudflare.com/pages/framework-guides/sveltekit/)
- [Static vs SSR 비교](https://svelte.dev/docs/kit/adapters#comparison)

---

**작성일**: 2024년 12월
**담당자**: @AI_Infra
**상태**: 분석 완료
