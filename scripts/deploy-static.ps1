# PowerShell 배포 스크립트
# 사용법: .\scripts\deploy-static.ps1 -Server "user@server.com" -DeployPath "/var/www/taskry"

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

Write-Host "✅ 빌드 완료" -ForegroundColor Green
Write-Host ""
Write-Host "📦 서버로 파일 전송 중..." -ForegroundColor Cyan
Write-Host "   서버: $Server" -ForegroundColor Gray
Write-Host "   경로: $DeployPath" -ForegroundColor Gray
Write-Host ""

# Windows에서 rsync가 없는 경우 scp 사용
# WSL이나 Git Bash에서 rsync 사용 권장
# 또는 WinSCP, FileZilla 같은 GUI 도구 사용

# scp를 사용하는 경우 (단, 디렉토리 전체 복사는 제한적)
# scp -r build/* ${Server}:${DeployPath}/

Write-Host "⚠️  Windows에서는 다음 방법 중 하나를 사용하세요:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. WSL에서 rsync 사용:" -ForegroundColor Cyan
Write-Host "   wsl rsync -avz --delete build/ ${Server}:${DeployPath}/" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Git Bash에서 deploy-static.sh 스크립트 사용" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. WinSCP 또는 FileZilla 같은 SFTP 클라이언트 사용" -ForegroundColor Cyan
Write-Host "   - 로컬: build/ 디렉토리" -ForegroundColor Gray
Write-Host "   - 서버: $DeployPath" -ForegroundColor Gray
Write-Host ""

# WSL이 있는 경우 자동 실행 시도
if (Get-Command wsl -ErrorAction SilentlyContinue) {
    $useWsl = Read-Host "WSL에서 rsync를 사용하시겠습니까? (y/n)"
    if ($useWsl -eq "y" -or $useWsl -eq "Y") {
        Write-Host "WSL rsync 실행 중..." -ForegroundColor Cyan
        wsl rsync -avz --delete build/ ${Server}:${DeployPath}/
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✅ 배포 완료!" -ForegroundColor Green
            Write-Host "🌐 웹사이트에서 확인하세요." -ForegroundColor Green
        } else {
            Write-Host ""
            Write-Host "❌ 배포 실패" -ForegroundColor Red
            Write-Host "   서버 접속 정보와 경로를 확인하세요." -ForegroundColor Yellow
            exit 1
        }
    }
}
