# ポモドーロタイマー

## 概要

作業時間と休憩時間をカスタマイズできる、Webベースのシンプルなポモドーロタイマーです。
完了したポモドーロ（作業セッション）のサイクル数をカウントする機能や、休憩後に自動で次のタイマーを開始する機能があります。

## 主な機能

- 作業時間と休憩時間のタイマー機能
- タイマー終了を知らせるアラーム音
- 完了したサイクル数のカウント
- 休憩後の自動スタート機能（ON/OFF切り替え可能）
- 音量調整

## 技術スタック

- HTML
- CSS
- TypeScript

## ディレクトリ構成

```
pomodoro-timer/
├── docs/              # GitHub Pagesで公開されるディレクトリ
│   ├── index.html     # メインのHTMLファイル
│   ├── style.css      # スタイルシート
│   ├── chime.mp3      # アラーム音
│   └── dist/
│       └── script.js  # TypeScriptからコンパイルされたJS
├── src/
│   └── script.ts      # TypeScriptのソースコード
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
└── tsconfig.json
```

## 開発

このプロジェクトをローカルでセットアップして開発を進めるには、以下の手順に従ってください。

1. **依存関係のインストール:**
   プロジェクトのルートディレクトリで、以下のコマンドを実行して必要なパッケージをインストールします。
   ```bash
   npm install
   ```

2. **開発サーバーの起動:**
   `docs` ディレクトリをルートとして、ローカルサーバーを起動します。
   ```bash
   # docsディレクトリに移動して
   cd docs
   # サーバーを起動
   python3 -m http.server
   ```
   その後、ブラウザで `http://localhost:8000` を開きます。

3. **TypeScriptのビルド:**
   `src/script.ts` ファイルを変更した後は、プロジェクトのルートディレクトリで以下のコマンドを実行して、JavaScriptにコンパイルする必要があります。
   ```bash
   npm run build
   ```
   これにより、`docs/dist/script.js` が更新されます。ファイルを変更するたびにこのコマンドの実行が必要です。

## デプロイ

このプロジェクトは、GitHub Pagesで公開されています。
`main` ブランチにプッシュすると、`docs` ディレクトリの内容が自動的にデプロイされます。

**公開URL:** https://medi-y-sato.github.io/pomodoro-timer/