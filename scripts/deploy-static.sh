#!/bin/bash

# Static 배포 스크립트
# 사용법: ./scripts/deploy-static.sh user@server.com /var/www/taskry

set -e

SERVER=$1
DEPLOY_PATH=$2

if [ -z "$SERVER" ] || [ -z "$DEPLOY_PATH" ]; then
    echo "❌ 사용법: $0 user@server.com /var/www/taskry"
    echo ""
    echo "예시:"
    echo "  $0 user@192.168.1.100 /var/www/taskry"
    echo "  $0 user@your-domain.com /var/www/taskry"
    exit 1
fi

echo "🔨 빌드 시작..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 빌드 실패"
    exit 1
fi

echo "✅ 빌드 완료"
echo ""
echo "📦 서버로 파일 전송 중..."
echo "   서버: $SERVER"
echo "   경로: $DEPLOY_PATH"
echo ""

rsync -avz --delete \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='.env' \
    build/ \
    $SERVER:$DEPLOY_PATH/

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 배포 완료!"
    echo "🌐 웹사이트에서 확인하세요."
else
    echo ""
    echo "❌ 배포 실패"
    echo "   서버 접속 정보와 경로를 확인하세요."
    exit 1
fi
