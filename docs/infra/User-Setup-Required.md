**[Assignee]:** @AI_Infra

**[Issue]:** #Infra-001 (사용자 추가 설정 필요 작업)

**[Reference]:** `docs/infra/Static-Deployment-Guide.md`

---

## ⚠️ 사용자 추가 설정 필요 작업

이 문서는 서버 배포 시 사용자가 직접 수행해야 하는 작업들을 정리합니다.

---

## 1. 서버 접속 및 기본 설정

### 1.1 서버 접속 정보 확인
- [ ] 서버 IP 주소 또는 도메인 확인
- [ ] SSH 접속 정보 (사용자명, 비밀번호 또는 SSH 키)
- [ ] 서버 OS 버전 확인 (Ubuntu, Debian, CentOS 등)

### 1.2 서버 초기 설정 (최초 1회)

```bash
# 서버에 SSH 접속
ssh user@your-server.com

# 시스템 업데이트
sudo apt update && sudo apt upgrade -y  # Ubuntu/Debian
# 또는
sudo yum update -y  # CentOS/RHEL

# 필수 패키지 설치
sudo apt install -y nginx  # 또는 apache2
sudo apt install -y git
sudo apt install -y curl
```

---

## 2. 웹 서버 디렉토리 생성

### 2.1 배포 디렉토리 생성

```bash
# 배포 디렉토리 생성
sudo mkdir -p /var/www/taskry

# 소유권 변경 (현재 사용자로)
sudo chown -R $USER:$USER /var/www/taskry

# 권한 설정
chmod -R 755 /var/www/taskry
```

---

## 3. 웹 서버 설정 파일 생성

### 3.1 Nginx 설정 파일 생성

```bash
# 설정 파일 생성
sudo nano /etc/nginx/sites-available/taskry
```

위 파일에 `Static-Deployment-Guide.md`의 3.1 섹션 내용을 복사하여 붙여넣기

```bash
# 심볼릭 링크 생성
sudo ln -s /etc/nginx/sites-available/taskry /etc/nginx/sites-enabled/

# 기본 설정 비활성화 (선택)
sudo rm /etc/nginx/sites-enabled/default

# 설정 테스트
sudo nginx -t

# Nginx 재시작
sudo systemctl restart nginx
```

### 3.2 Apache 설정 파일 생성

```bash
# 설정 파일 생성
sudo nano /etc/apache2/sites-available/taskry.conf
```

위 파일에 `Static-Deployment-Guide.md`의 3.2 섹션 내용을 복사하여 붙여넣기

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

## 4. 도메인 및 DNS 설정

### 4.1 도메인 구매 및 DNS 설정

- [ ] 도메인 구매 (예: Namecheap, GoDaddy 등)
- [ ] DNS A 레코드 설정
  - 호스트: `@` 또는 `www`
  - 값: 서버 IP 주소
  - TTL: 3600 (또는 기본값)

### 4.2 DNS 전파 확인

```bash
# DNS 전파 확인
nslookup your-domain.com
# 또는
dig your-domain.com
```

---

## 5. SSL/TLS 인증서 설정

### 5.1 Certbot 설치 및 인증서 발급

```bash
# Certbot 설치
sudo apt update
sudo apt install -y certbot python3-certbot-nginx
# 또는 Apache용
sudo apt install -y certbot python3-certbot-apache

# 인증서 발급 (Nginx)
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 인증서 발급 (Apache)
sudo certbot --apache -d your-domain.com -d www.your-domain.com
```

**중요**: 인증서 발급 시 이메일 주소 입력 및 약관 동의 필요

### 5.2 자동 갱신 설정 확인

```bash
# 자동 갱신 테스트
sudo certbot renew --dry-run

# Certbot 타이머 확인
sudo systemctl status certbot.timer
```

---

## 6. 방화벽 설정

### 6.1 UFW (Ubuntu Firewall) 설정

```bash
# UFW 상태 확인
sudo ufw status

# HTTP, HTTPS 포트 허용
sudo ufw allow 'Nginx Full'
# 또는
sudo ufw allow 'Apache Full'

# 또는 개별 포트 허용
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# SSH 포트 허용 (중요!)
sudo ufw allow 22/tcp

# 방화벽 활성화
sudo ufw enable

# 상태 확인
sudo ufw status verbose
```

### 6.2 iptables 설정 (선택)

```bash
# HTTP, HTTPS 허용
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# 규칙 저장 (Ubuntu/Debian)
sudo netfilter-persistent save
```

---

## 7. SSH 키 설정 (선택, 보안 강화)

### 7.1 SSH 키 생성 (로컬)

```bash
# SSH 키 생성
ssh-keygen -t ed25519 -C "your-email@example.com"

# 공개키 복사
cat ~/.ssh/id_ed25519.pub
```

### 7.2 서버에 SSH 키 등록

```bash
# 서버에 접속
ssh user@your-server.com

# .ssh 디렉토리 생성
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# 공개키 추가
nano ~/.ssh/authorized_keys
# 위에서 복사한 공개키를 붙여넣기

# 권한 설정
chmod 600 ~/.ssh/authorized_keys
```

---

## 8. 배포 스크립트 사용 전 설정

### 8.1 SSH 키 기반 인증 설정 (rsync/scp 사용 시)

로컬에서 서버로 비밀번호 없이 접속하려면:

```bash
# SSH 키 복사
ssh-copy-id user@your-server.com

# 접속 테스트
ssh user@your-server.com
```

### 8.2 배포 스크립트 변수 수정

`scripts/deploy-static.sh` 또는 `scripts/deploy-static.ps1` 파일에서:

- [ ] `SERVER` 변수에 실제 서버 주소 입력
- [ ] `DEPLOY_PATH` 변수에 실제 배포 경로 입력
- [ ] 도메인 주소 확인

---

## 9. 첫 배포 실행

### 9.1 로컬에서 빌드 및 배포

```bash
# 빌드
npm run build

# 파일 전송 (방법 선택)
# 방법 1: rsync 사용
rsync -avz --delete build/ user@your-server.com:/var/www/taskry/

# 방법 2: scp 사용
scp -r build/* user@your-server.com:/var/www/taskry/

# 방법 3: 배포 스크립트 사용
./scripts/deploy-static.sh user@your-server.com /var/www/taskry
```

### 9.2 서버에서 권한 확인

```bash
# 서버에 접속
ssh user@your-server.com

# 파일 권한 확인
ls -la /var/www/taskry

# 필요시 권한 수정
sudo chown -R www-data:www-data /var/www/taskry
sudo chmod -R 755 /var/www/taskry
```

---

## 10. 배포 후 확인

### 10.1 웹사이트 접속 확인

- [ ] `http://your-domain.com` 접속 확인
- [ ] `https://your-domain.com` 접속 확인 (SSL 설정 후)
- [ ] 모든 페이지 라우팅 확인

### 10.2 서버 로그 확인

```bash
# Nginx 로그
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Apache 로그
sudo tail -f /var/log/apache2/access.log
sudo tail -f /var/log/apache2/error.log
```

### 10.3 PWA 동작 확인

- [ ] 브라우저 개발자 도구 > Application > Manifest 확인
- [ ] Service Worker 등록 확인
- [ ] 오프라인 모드 테스트

---

## 11. 자동 배포 설정 (선택)

### 11.1 GitHub Actions 설정

`.github/workflows/deploy.yml` 파일 생성 (추후 작업)

### 11.2 Cron을 이용한 자동 배포 (선택)

```bash
# crontab 편집
crontab -e

# 매일 자정에 자동 배포 (예시)
0 0 * * * cd /path/to/taskry && git pull && npm run build && rsync -avz --delete build/ /var/www/taskry/
```

---

## 📝 체크리스트 요약

배포 전 확인사항:

- [ ] 서버 접속 정보 확인
- [ ] 웹 서버 (Nginx/Apache) 설치 및 설정
- [ ] 배포 디렉토리 생성 및 권한 설정
- [ ] 도메인 DNS 설정 완료
- [ ] SSL 인증서 발급 완료
- [ ] 방화벽 설정 완료
- [ ] 첫 배포 실행 완료
- [ ] 웹사이트 접속 확인 완료

---

## 🆘 문제 발생 시

### 일반적인 문제

1. **권한 오류**: `sudo chown -R www-data:www-data /var/www/taskry` 실행
2. **포트 차단**: 방화벽 설정 확인
3. **DNS 미전파**: 24-48시간 대기 또는 DNS 서비스 확인
4. **SSL 인증서 오류**: Certbot 로그 확인 (`/var/log/letsencrypt/`)

### 로그 확인 명령어

```bash
# Nginx 에러 로그
sudo tail -50 /var/log/nginx/error.log

# 시스템 로그
sudo journalctl -u nginx -n 50
sudo journalctl -u apache2 -n 50
```

---

**작성일**: 2024년 12월
**담당자**: @AI_Infra
**상태**: 사용자 작업 필요
