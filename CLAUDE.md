# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## このリポジトリについて

これは **AI Innovation 部**（AI Innovation Division）のマーケティング用ホームページです。ビルドシステムやパッケージマネージャー、フレームワークは一切使用しておらず、インラインCSSを含む単一のHTMLファイルだけで構成された静的サイトです。

- [docs/index.html](docs/index.html) — サイト本体一式（ナビ、ヒーロー、ミッション、取り組み領域カード、強み、活用技術、進め方、お問い合わせ、フッター）。CSSはすべて `<style>` ブロック内にインラインで記述されており、JSフレームワークやバンドラーは使用していません。
- [README.md](README.md) — サイトの日本語コピー原稿。セクションごと（ヒーロー、ミッション、取り組み領域、強み、進め方、CTA、フッター）に整理されています。**文言・コピーの正**として扱い、コピーを変更する際は `README.md` と `docs/index.html` 内の該当テキストの両方を同期させてください。
- `assets/` — ロゴファイル（`ucl-logo.svg`/`.png` と、ダーク背景用の `ucl-logo-black.svg`/`.png`）。

`docs/` というフォルダ名は、GitHub Pages（リポジトリ → Settings → Pages → `/docs`）での公開を想定していることを示唆しています。

## 作業時の注意

- ビルド・lint・テストの工程はありません。プレーンなHTML/CSSのみです。変更を確認する際は、[docs/index.html](docs/index.html) をブラウザでそのまま開くか、`docs/` を任意の静的ファイルサーバーで配信してください。
- スタイルはすべて `docs/index.html` の `<style>` ブロック冒頭、`:root` で定義されたCSSカスタムプロパティ（`--bg`、`--panel`、`--accent`、`--accent2` など）経由で管理されています。サイトはダークテーマ（README記載の `ai-innovation_sample-A_dark` 案を採用）です。色をハードコードせず、これらの変数を再利用してください。
- コンテンツは日本語です。コピーを編集する際は `README.md` と `docs/index.html` の内容を一致させてください。
- 両ファイル内の問い合わせ用メールアドレスはプレースホルダー（`contact@example.com`）です。README内でも本番公開前に `←（要変更）`（要変更）と明記されています。
