# 5분韓国語（ごふん） - 公式ウェブサイト

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?logo=github)](https://github.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

毎日5分で韓国語が話せるようになる学習アプリの公式ウェブサイト

## 🌐 公開URL

GitHub Pagesで公開後、以下のURLでアクセスできます：
```
https://kameki23.github.io/5min-korean-website/
```

## 📱 アプリについて

**5분韓国語（ごふん）** は、1日たった5分で韓国語が話せるようになる革新的な学習アプリです。

### 主な特徴
- ⏱️ 1日5分で完結
- 💝 推し活・韓ドラ・K-POPで楽しく学習
- 🎯 100日で完全マスター
- 🎤 AI発音チェック
- 📚 自分だけの例文帳
- 🔥 連続記録でモチベーション維持

### 料金
- 無料プラン: 基本機能
- プレミアム: 月額980円 / 年額9,800円
- 🎁 3日間無料トライアル

## 📂 ファイル構成

```
5min-korean-website/
├── index.html          # メインランディングページ
├── privacy.html        # プライバシーポリシー
├── terms.html          # 利用規約
├── app.jsx            # アプリのデモ（React）
└── README.md          # このファイル
```

## 🚀 GitHub Pagesでの公開方法

### 1. GitHubリポジトリの作成

```bash
# 1. このフォルダをローカルにダウンロード
# 2. Gitリポジトリを初期化
git init

# 3. すべてのファイルを追加
git add .

# 4. 最初のコミット
git commit -m "Initial commit: 5분韓国語 website"

# 5. GitHubで新しいリポジトリを作成（ブラウザで）
# リポジトリ名: 5min-korean-website

# 6. リモートリポジトリを追加
git remote add origin https://github.com/kameki23/5min-korean-website.git

# 7. プッシュ
git branch -M main
git push -u origin main
```

### 2. GitHub Pagesの有効化

1. GitHubリポジトリページで **Settings** をクリック
2. 左メニューから **Pages** を選択
3. **Source** で `main` ブランチを選択
4. **Save** をクリック
5. 数分待つとURLが表示されます

### 3. カスタムドメインの設定（オプション）

1. ドメインを取得（例: 5min-korean.com）
2. GitHub Pages設定で **Custom domain** に入力
3. DNSレコードを設定
   ```
   CNAME: www → kameki23.github.io
   A: @ → 185.199.108.153
   A: @ → 185.199.109.153
   A: @ → 185.199.110.153
   A: @ → 185.199.111.153
   ```

## 🛠️ ローカルでの開発

### 簡易サーバーの起動

**Python 3の場合:**
```bash
python -m http.server 8000
```

**Node.jsの場合:**
```bash
npx http-server
```

ブラウザで `http://localhost:8000` を開く

## 📝 編集方法

### テキストの変更
各HTMLファイルを直接編集してください。

### 色の変更
Tailwind CSSを使用しているため、クラス名を変更：
```html
<!-- 紫色を青色に変更 -->
<div class="from-purple-500 to-pink-500">
↓
<div class="from-blue-500 to-cyan-500">
```

### 画像の追加
1. `images/` フォルダを作成
2. 画像を配置
3. HTMLで参照
```html
<img src="images/screenshot.png" alt="スクリーンショット">
```

## 🔒 プライバシーとセキュリティ

- プライバシーポリシー: `/privacy.html`
- 利用規約: `/terms.html`
- お問い合わせ: support@turtlefit.jp

## 📱 アプリストア申請時の設定

### App Store Connect
- マーケティングURL: `https://kameki23.github.io/5min-korean-website/`
- プライバシーポリシーURL: `https://kameki23.github.io/5min-korean-website/privacy.html`
- サポートURL: `https://kameki23.github.io/5min-korean-website/`

### Google Play Console
- ウェブサイト: `https://kameki23.github.io/5min-korean-website/`
- プライバシーポリシー: `https://kameki23.github.io/5min-korean-website/privacy.html`

## 🎨 デザインシステム

### カラーパレット
- メインカラー: Purple (#9c27b0) → Pink (#ec407a)
- アクセント: Orange (#ff9800)
- 背景: Gray-50 (#fafafa)
- テキスト: Gray-900 (#212121)

### フォント
- 日本語: Noto Sans JP
- 英数字: システムフォント

## 🌟 機能追加のアイデア

- [ ] ブログセクション
- [ ] FAQページ
- [ ] チュートリアル動画
- [ ] ユーザー登録フォーム
- [ ] 多言語対応
- [ ] ダークモード

## 📊 アナリティクス設定

Google Analyticsを追加する場合：

```html
<!-- index.htmlの</head>の前に追加 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🤝 貢献

改善提案やバグ報告は Issues でお願いします。

## 📄 ライセンス

© 2025 5분韓国語. All rights reserved.

## 📞 お問い合わせ

- サポート: support@turtlefit.jp
- プライバシー: support@turtlefit.jp

---

**Made with ❤️ for Korean language learners**
