**[Assignee]:** @AI_Infra

**[Issue]:** #Infra-001 (Static 배포 가이드)

**[Reference]:** `docs/issues/infra/Infra-001.md`, `docs/issues/infra/Agenda-1.md`

---

## 📋 개요

이 문서는 Taskry 프로젝트를 Static Site Generation (SSG) 방식으로 빌드하고 서버에 배포하는 방법을 설명합니다.

### 현재 설정
- **어댑터**: `@sveltejs/adapter-static`
- **빌드 출력**: `build/` 디렉토리
- **PWA**: 설정 완료 (vite-plugin-pwa)
- **데이터 저장소**: IndexedDB (클라이언트 사이드)

---

## 🔧 1. 로컬 빌드

### 1.1 빌드 실행

```bash
# 프로젝트 루트에서 실행
npm run build
```

### 1.2 빌드 결과 확인

빌드가 성공하면 `build/` 디렉토리가 생성됩니다:

```
build/
├── index.html
├── _app/
│   ├── immutable/
│   │   ├── chunks/
│   │   └── ...
│   └── ...
├── service-worker.js
├── manifest.webmanifest
└── favicon.svg
```

### 1.3 로컬 프리뷰

빌드된 파일을 로컬에서 테스트:

```bash
npm run preview
```

브라우저에서 `http://localhost:4173` 접속하여 확인합니다.

---

## 📦 2. 서버 배포

### 2.1 빌드 파일 준비

빌드가 완료되면 `build/` 디렉토리 전체를 서버로 전송합니다.

### 2.2 서버 디렉토리 구조

서버에 다음과 같은 디렉토리 구조를 권장합니다:

```
/var/www/taskry/          # 또는 원하는 경로
├── build/                 # 빌드된 파일들
│   ├── index.html
│   ├── _app/
│   └── ...
└── .htaccess              # Apache 설정 (선택)
```

### 2.3 파일 전송 방법

#### 방법 A: SCP 사용 (Linux/Mac)

```bash
# build 디렉토리 전체를 서버로 전송
scp -r build/* user@your-server.com:/var/www/taskry/

# 또는 rsync 사용 (권장 - 변경된 파일만 전송)
rsync -avz --delete build/ user@your-server.com:/var/www/taskry/
```

#### 방법 B: SFTP 사용 (FileZilla 등)

1. FileZilla 또는 다른 SFTP 클라이언트 실행
2. 서버 연결 정보 입력
3. 로컬 `build/` 디렉토리 내용을 서버 `/var/www/taskry/`로 업로드

#### 방법 C: Git을 통한 배포

```bash
# 서버에서
cd /var/www/taskry
git pull origin main
npm run build
# build/ 디렉토리를 웹 서버 루트로 복사
```

---

## 🌐 3. 웹 서버 설정

### 3.1 Nginx 설정

#### 기본 설정

`/etc/nginx/sites-available/taskry` 파일 생성:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    root /var/www/taskry/build;
    index index.html;

    # Gzip 압축
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;

    # 정적 파일 캐싱
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA 라우팅 지원 (모든 요청을 index.html로)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Service Worker와 Manifest는 캐싱하지 않음
    location ~* (service-worker\.js|manifest\.webmanifest)$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # 보안 헤더
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

#### 설정 활성화

```bash
# 심볼릭 링크 생성
sudo ln -s /etc/nginx/sites-available/taskry /etc/nginx/sites-enabled/

# 설정 테스트
sudo nginx -t

# Nginx 재시작
sudo systemctl restart nginx
```

### 3.2 Apache 설정

#### .htaccess 파일 생성

`build/.htaccess` 파일 생성:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # SPA 라우팅 지원
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Gzip 압축
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# 캐싱 설정
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType application/x-javascript "access plus 1 year"
    
    # Service Worker와 Manifest는 캐싱하지 않음
    ExpiresByType application/javascript "access plus 0 seconds" env=SW
    ExpiresByType application/manifest+json "access plus 0 seconds"
</IfModule>

# 보안 헤더
<IfModule mod_headers.c>
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

#### Apache Virtual Host 설정

`/etc/apache2/sites-available/taskry.conf`:

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    ServerAlias www.your-domain.com
    
    DocumentRoot /var/www/taskry/build
    
    <Directory /var/www/taskry/build>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/taskry_error.log
    CustomLog ${APACHE_LOG_DIR}/taskry_access.log combined
</VirtualHost>
```

#### 설정 활성화

```bash
# 모듈 활성화
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod expires
sudo a2enmod deflate

# 사이트 활성화
sudo a2ensite taskry.conf

# Apache 재시작
sudo systemctl restart apache2
```

---

## 🔒 4. SSL/TLS 인증서 설정

### 4.1 Let's Encrypt (Certbot) 사용

```bash
# Certbot 설치 (Ubuntu/Debian)
sudo apt update
sudo apt install certbot python3-certbot-nginx
# 또는 Apache용
sudo apt install certbot python3-certbot-apache

# 인증서 발급 (Nginx)
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 인증서 발급 (Apache)
sudo certbot --apache -d your-domain.com -d www.your-domain.com

# 자동 갱신 테스트
sudo certbot renew --dry-run
```

### 4.2 Nginx SSL 설정 자동 업데이트

Certbot이 자동으로 Nginx 설정을 업데이트합니다. 설정 파일은 다음과 같이 변경됩니다:

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # SSL 설정
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # ... 나머지 설정
}

# HTTP를 HTTPS로 리다이렉트
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

---

## 🔄 5. 배포 스크립트

### 5.1 로컬 배포 스크립트

`scripts/deploy-static.sh` 파일 생성:

```bash
#!/bin/bash

# 배포 스크립트
# 사용법: ./scripts/deploy-static.sh user@server.com /var/www/taskry

set -e

SERVER=$1
DEPLOY_PATH=$2

if [ -z "$SERVER" ] || [ -z "$DEPLOY_PATH" ]; then
    echo "사용법: $0 user@server.com /var/www/taskry"
    exit 1
fi

echo "🔨 빌드 시작..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 빌드 실패"
    exit 1
fi

echo "📦 서버로 파일 전송 중..."
rsync -avz --delete \
    --exclude='.git' \
    --exclude='node_modules' \
    build/ \
    $SERVER:$DEPLOY_PATH/

echo "✅ 배포 완료!"
echo "🌐 https://your-domain.com 에서 확인하세요."
```

스크립트 실행 권한 부여:

```bash
chmod +x scripts/deploy-static.sh
```

사용법:

```bash
./scripts/deploy-static.sh user@your-server.com /var/www/taskry
```

### 5.2 Windows 배포 스크립트

`scripts/deploy-static.ps1` 파일 생성:

```powershell
# PowerShell 배포 스크립트
# 사용법: .\scripts\deploy-static.ps1 user@server.com /var/www/taskry

param(
    [Parameter(Mandatory=$true)]
    [string]$Server,
    
    [Parameter(Mandatory=$true)]
    [string]$DeployPath
)

Write-Host "🔨 빌드 시작..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 빌드 실패" -ForegroundColor Red
    exit 1
}

Write-Host "📦 서버로 파일 전송 중..." -ForegroundColor Cyan

# rsync 대신 scp 사용 (Windows에서 rsync가 없는 경우)
# 또는 WSL에서 rsync 사용
scp -r build/* ${Server}:${DeployPath}/

Write-Host "✅ 배포 완료!" -ForegroundColor Green
Write-Host "🌐 https://your-domain.com 에서 확인하세요." -ForegroundColor Green
```

---

## ✅ 6. 배포 확인 체크리스트

배포 후 다음 항목을 확인하세요:

- [ ] 웹사이트 접속 확인
- [ ] 모든 페이지 라우팅 정상 동작
- [ ] PWA 설치 가능 여부 확인
- [ ] Service Worker 정상 동작
- [ ] 오프라인 모드 동작 확인
- [ ] HTTPS 연결 확인
- [ ] 모바일 디바이스에서 테스트
- [ ] 브라우저 콘솔 에러 확인

---

## 🐛 7. 문제 해결

### 7.1 404 에러 발생

**원인**: SPA 라우팅 설정이 안 되어 있음

**해결**:
- Nginx: `try_files $uri $uri/ /index.html;` 설정 확인
- Apache: `.htaccess`의 `RewriteRule` 확인

### 7.2 Service Worker가 업데이트되지 않음

**원인**: Service Worker 캐싱 문제

**해결**:
- 브라우저에서 "Unregister service workers" 실행
- 또는 개발자 도구 > Application > Service Workers > Unregister

### 7.3 빌드 파일이 너무 큼

**해결**:
- `vite.config.js`에서 빌드 최적화 설정 확인
- 불필요한 의존성 제거
- 코드 스플리팅 확인

### 7.4 PWA가 설치되지 않음

**원인**: HTTPS가 아니거나 manifest 설정 문제

**해결**:
- HTTPS 설정 확인 (PWA는 HTTPS 필수)
- `manifest.webmanifest` 파일 확인
- 브라우저 콘솔에서 에러 메시지 확인

---

## 📚 참고 자료

- [SvelteKit Static Adapter 문서](https://svelte.dev/docs/kit/adapter-static)
- [Nginx 설정 가이드](https://nginx.org/en/docs/)
- [Apache 설정 가이드](https://httpd.apache.org/docs/)
- [Let's Encrypt 문서](https://letsencrypt.org/docs/)

---

**작성일**: 2024년 12월
**담당자**: @AI_Infra
