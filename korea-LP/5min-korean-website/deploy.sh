#!/bin/bash
# GitHub Pagesへのデプロイスクリプト
# このファイルの使い方: chmod +x deploy.sh && ./deploy.sh

echo "🚀 5분韓国語 ウェブサイトをGitHub Pagesにデプロイします"
echo ""

# GitHubユーザー名を設定
username="kameki23"
echo "✅ GitHubユーザー名: $username"

echo ""
echo "📋 以下のコマンドを実行します："
echo ""

# Gitリポジトリの初期化
echo "1️⃣ Gitリポジトリを初期化..."
git init

echo ""
echo "2️⃣ すべてのファイルをステージング..."
git add .

echo ""
echo "3️⃣ 最初のコミットを作成..."
git commit -m "Initial commit: 5분韓国語 website"

echo ""
echo "4️⃣ リモートリポジトリを設定..."
git remote add origin https://github.com/$username/5min-korean-website.git

echo ""
echo "5️⃣ メインブランチを設定..."
git branch -M main

echo ""
echo "6️⃣ GitHubにプッシュ..."
echo "⚠️  GitHubのユーザー名とパスワード（またはトークン）を入力してください"
git push -u origin main

echo ""
echo "✅ デプロイ完了！"
echo ""
echo "📝 次のステップ："
echo "1. https://github.com/$username/5min-korean-website にアクセス"
echo "2. Settings → Pages でGitHub Pagesを有効化"
echo "3. 数分後に https://$username.github.io/5min-korean-website/ で公開されます"
echo ""
echo "🎉 お疲れ様でした！"
