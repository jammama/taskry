# 인프라 배포 문서

이 폴더에는 Taskry 프로젝트의 배포 및 인프라 관련 문서가 포함되어 있습니다.

## 📚 문서 목록

### 1. Static-Deployment-Guide.md
**정적 사이트 배포 가이드**
- 로컬 빌드 방법
- 서버 배포 방법
- Nginx/Apache 설정
- SSL/TLS 인증서 설정
- 배포 스크립트 사용법

### 2. User-Setup-Required.md
**사용자 추가 설정 필요 작업**
- 서버 초기 설정
- 웹 서버 설정
- 도메인 및 DNS 설정
- SSL 인증서 발급
- 방화벽 설정
- 배포 전 체크리스트

### 3. Deployment-Comparison.md
**배포 방식 비교 분석**
- Static SSG vs Node.js 서버
- Vercel vs Cloudflare Pages vs Netlify
- 각 방식의 장단점 비교
- Taskry 프로젝트에 대한 추천

## 🚀 빠른 시작

### 1단계: 로컬 빌드
```bash
npm run build
```

### 2단계: 배포 스크립트 사용
```bash
# Linux/Mac
./scripts/deploy-static.sh user@server.com /var/www/taskry

# Windows (WSL 또는 Git Bash)
bash scripts/deploy-static.sh user@server.com /var/www/taskry
```

### 3단계: 서버 설정
`User-Setup-Required.md` 문서를 참고하여 서버 설정을 완료하세요.

## 📝 현재 설정

- **어댑터**: `@sveltejs/adapter-static`
- **빌드 출력**: `build/` 디렉토리
- **배포 방식**: 정적 파일 배포

## 🔗 관련 문서

- `docs/issues/infra/Infra-001.md`: 원본 요구사항
- `docs/issues/infra/Agenda-1.md`: 작업 계획서

---

**작성일**: 2024년 12월
**담당자**: @AI_Infra
