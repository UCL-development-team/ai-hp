# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## このリポジトリについて

これは **AI Innovation 部**（AI Innovation Division）のマーケティング用ホームページです。ビルドシステムやパッケージマネージャー、フレームワークは一切使用しておらず、インラインCSSを含む単一のHTMLファイルだけで構成された静的サイトです。

- [docs/index.html](docs/index.html) — サイト本体一式（ナビ、ヒーロー、ミッション、取り組み領域カード、強み、活用技術、進め方、お問い合わせ、フッター）。CSSはすべて `<style>` ブロック内にインラインで記述されており、JSフレームワークやバンドラーは使用していません。
- [README.md](README.md) — サイトの日本語コピー原稿。セクションごと（ヒーロー、ミッション、取り組み領域、強み、進め方、CTA、フッター）に整理されています。**文言・コピーの正**として扱い、コピーを変更する際は `README.md` と `docs/index.html` 内の該当テキストの両方を同期させてください。
- `assets/` — ロゴファイル（`ucl-logo.svg`/`.png` と、ダーク背景用の `ucl-logo-black.svg`/`.png`）。

`docs/` というフォルダ名は、GitHub Pages（リポジトリ → Settings → Pages → `/docs`）での公開を想定していることを示唆しています。

## デザインシステム（原本とコピーの関係）

デザインシステムは **[design-system/](design-system/) が原本**です。`docs/design-system/` は GitHub Pages 配信のために原本を**コピーしただけのもの**であり、原本ではありません。

- [design-system/](design-system/) — **原本。編集はここだけで行う。**
  - `light/` — ライト版（`tokens.css` / `components.css` / `design-system.md` / `tokens-usage-sample.html`）
  - `dark/` — ダーク版（`tokens.css` / `design-system.md` / `tokens-usage-sample.html`）
  - `light-target.html` / `dark-target.html` — トークン化の元になった目標デザイン
- `docs/design-system/` — **配信用コピー。直接編集しない。** GitHub Pages は `docs/` 配下しか公開しないため、`docs/` 内のHTMLから参照できるようここに複製している。

### ルール

- デザインシステムを変更するときは、必ず `design-system/` 側を編集し、その後 `docs/design-system/` へコピーして同期させる。逆方向（コピー側を編集）は禁止。
- コピー側を直接編集してしまうと、原本を次に反映した時点で変更が失われる。
- 同期の確認例:
  ```sh
  diff -r design-system/light docs/design-system/light
  ```
- `docs/` 内のHTMLからの読み込みパスは `design-system/light/...` になる（`docs/` を基準とした相対パス）。
  ```html
  <link rel="stylesheet" href="design-system/light/tokens.css">
  <link rel="stylesheet" href="design-system/light/components.css">
  ```
- 読み込み順は **tokens.css → components.css**（後者が前者のカスタムプロパティに依存）。
- 現在 `docs/design-system/` に複製しているのは `light/` のみ（`docs/index-2-light.html` が参照）。ダーク版を配信で使う場合は `dark/` も同様にコピーする。

## 作業時の注意

- ビルド・lint・テストの工程はありません。プレーンなHTML/CSSのみです。変更を確認する際は、[docs/index.html](docs/index.html) をブラウザでそのまま開くか、`docs/` を任意の静的ファイルサーバーで配信してください。
- スタイルはすべて `docs/index.html` の `<style>` ブロック冒頭、`:root` で定義されたCSSカスタムプロパティ（`--bg`、`--panel`、`--accent`、`--accent2` など）経由で管理されています。サイトはダークテーマ（README記載の `ai-innovation_sample-A_dark` 案を採用）です。色をハードコードせず、これらの変数を再利用してください。
- ただし [docs/index-2-light.html](docs/index-2-light.html) は例外で、`<style>` ブロックを持たず、外部のデザインシステム（`design-system/light/tokens.css` と `components.css`）だけで構成されています。このページのスタイルを変更する場合は、上記「デザインシステム（原本とコピーの関係）」に従い原本側を編集してください。
- コンテンツは日本語です。コピーを編集する際は `README.md` と `docs/index.html` の内容を一致させてください。
- 両ファイル内の問い合わせ用メールアドレスはプレースホルダー（`contact@example.com`）です。README内でも本番公開前に `←（要変更）`（要変更）と明記されています。
