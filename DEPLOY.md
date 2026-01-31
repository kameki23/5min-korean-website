# GitHub Pagesデプロイ手順

このフォルダをGitHub Pagesで公開するための詳細な手順書です。

## 📋 前提条件

- GitHubアカウントを持っている
- Gitがインストールされている（確認: `git --version`）

## 🚀 ステップ・バイ・ステップ

### ステップ1: GitHubで新しいリポジトリを作成

1. [GitHub](https://github.com)にログイン
2. 右上の「+」→「New repository」をクリック
3. 以下のように設定：
   - Repository name: `5min-korean-website`
   - Description: `5분韓国語 - 公式ウェブサイト`
   - Public を選択（公開したい場合）
   - ✅ Add a README file は**チェックしない**
4. 「Create repository」をクリック

### ステップ2: ローカルでGitリポジトリを初期化

ターミナル（コマンドプロンプト）を開いて、このフォルダに移動：

```bash
cd /path/to/5min-korean-website
```

Gitリポジトリを初期化：

```bash
git init
```

### ステップ3: ファイルをステージングしてコミット

すべてのファイルを追加：

```bash
git add .
```

最初のコミットを作成：

```bash
git commit -m "Initial commit: 5분韓国語 website"
```

### ステップ4: GitHubリポジトリと接続

GitHubで表示されたコマンドを実行（ユーザー名を置き換えてください）：

```bash
git remote add origin https://github.com/kameki23/5min-korean-website.git
```

メインブランチの名前を設定：

```bash
git branch -M main
```

GitHubにプッシュ：

```bash
git push -u origin main
```

**注意**: GitHubのユーザー名とパスワード（またはPersonal Access Token）を求められます。

### ステップ5: GitHub Pagesを有効化

1. GitHubリポジトリのページに戻る
2. **Settings**（設定）タブをクリック
3. 左メニューから **Pages** を選択
4. **Source** セクションで：
   - Branch: `main`
   - Folder: `/ (root)`
5. **Save** をクリック

### ステップ6: 公開を確認

数分後（通常1-2分）、GitHub Pagesに以下のメッセージが表示されます：

```
Your site is live at https://kameki23.github.io/5min-korean-website/
```

このURLをクリックして、ウェブサイトが正常に表示されることを確認してください。

## ✅ 確認事項

公開後、以下を確認してください：

- [ ] トップページ（index.html）が表示される
- [ ] プライバシーポリシーのリンクが動作する
- [ ] 利用規約のリンクが動作する
- [ ] すべてのセクション（機能、料金など）が表示される
- [ ] スマホでも正常に表示される

## 🔄 ファイルを更新する場合

ファイルを編集した後：

```bash
# 変更をステージング
git add .

# コミット
git commit -m "Update: [変更内容を記述]"

# GitHubにプッシュ
git push
```

数分後、変更がウェブサイトに反映されます。

## 🌐 カスタムドメインの設定（オプション）

独自ドメイン（例: www.5min-korean.com）を使いたい場合：

### 1. ドメインを取得

お名前.com、ムームードメインなどでドメインを購入

### 2. GitHubでカスタムドメインを設定

1. GitHub Pages設定で「Custom domain」に取得したドメインを入力
   - 例: `www.5min-korean.com`
2. **Save**をクリック
3. 「CNAME」ファイルが自動作成されます

### 3. DNSレコードを設定

ドメイン管理画面で以下のレコードを追加：

**Aレコード（@）:**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAMEレコード（www）:**
```
kameki23.github.io
```

### 4. HTTPSを有効化

DNS設定が反映されたら（通常24時間以内）：

1. GitHub Pages設定に戻る
2. 「Enforce HTTPS」にチェック

## 🆘 トラブルシューティング

### 問題1: 404エラーが表示される

**解決方法:**
- GitHub Pagesが有効になっているか確認
- URLが正しいか確認（末尾のスラッシュも含む）
- 数分待ってから再度アクセス

### 問題2: CSSが適用されない

**解決方法:**
- Tailwind CDNのリンクが正しいか確認
- ブラウザのキャッシュをクリア
- 開発者ツール（F12）でエラーを確認

### 問題3: GitHubにプッシュできない

**解決方法:**
- Personal Access Tokenを作成
  1. GitHub Settings → Developer settings → Personal access tokens
  2. Generate new token
  3. repo にチェック
  4. パスワードの代わりにトークンを使用

## 📞 サポート

問題が解決しない場合：
- [GitHub Pages ドキュメント](https://docs.github.com/ja/pages)
- [GitHub Community](https://github.community/)

## 🎉 完了！

おめでとうございます！あなたのウェブサイトが世界中に公開されました！

次のステップ：
1. URLをSNSでシェア
2. App Store/Google Play申請時にURLを使用
3. Google Analyticsを設定して訪問者を追跡
4. SEO対策を実施

---

**作成日**: 2025年1月31日
