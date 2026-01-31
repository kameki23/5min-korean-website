@echo off
REM GitHub Pagesへのデプロイスクリプト（Windows用）
REM このファイルをダブルクリックして実行

echo.
echo ========================================
echo 5분韓国語 ウェブサイトをGitHub Pagesにデプロイ
echo ========================================
echo.

REM GitHubユーザー名を設定
set username=kameki23
echo GitHubユーザー名: %username%

echo.
echo 以下のコマンドを実行します...
echo.

echo 1. Gitリポジトリを初期化...
git init

echo.
echo 2. すべてのファイルをステージング...
git add .

echo.
echo 3. 最初のコミットを作成...
git commit -m "Initial commit: 5분韓国語 website"

echo.
echo 4. リモートリポジトリを設定...
git remote add origin https://github.com/%username%/5min-korean-website.git

echo.
echo 5. メインブランチを設定...
git branch -M main

echo.
echo 6. GitHubにプッシュ...
echo 注意: GitHubのユーザー名とパスワード（またはトークン）を入力してください
git push -u origin main

echo.
echo ========================================
echo デプロイ完了！
echo ========================================
echo.
echo 次のステップ:
echo 1. https://github.com/%username%/5min-korean-website にアクセス
echo 2. Settings → Pages でGitHub Pagesを有効化
echo 3. 数分後に https://%username%.github.io/5min-korean-website/ で公開されます
echo.

pause
