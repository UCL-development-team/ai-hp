# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## このリポジトリについて

これは **AI Innovation 部**（AI Innovation Division）のマーケティング用ホームページ、およびそのデザイン案を検討するためのリポジトリです。ビルドシステムやパッケージマネージャー、フレームワークは一切使用しておらず、プレーンなHTML/CSSだけで構成された静的サイトです。

**公開・編集の対象はすべて [docs/](docs/) 配下です。** GitHub Pages（リポジトリ → Settings → Pages → `/docs`）で配信する想定のため、ページから参照されるもの（CSS・画像・図版）は必ず `docs/` の中に置き、そこを直接編集します。原本／配信用コピーの二重管理はしていません。

- [docs/index.html](docs/index.html) — デザイン案の一覧ページ（各 `plan-*.html` へのリンクのみ）。
- `docs/plan-<N>-<theme>.html` — デザイン案のページ本体。
- `docs/plan-<N>-<theme>.md` — 対応するページの**掲載内容（コピー）の正**。文言を変更するときは md と html の両方を同期させる。
- [docs/design-system/](docs/design-system/) — デザインシステム（後述）。
- `docs/assets/` — ページから参照する画像・図版。
- [README.md](README.md) — リポジトリの入口。
- `assets/`（リポジトリ直下） — ロゴの原本（`ucl-logo.svg`/`.png`、ダーク背景用の `ucl-logo-black.svg`/`.png`）。ページから参照する場合は `docs/assets/` 側にコピーして使う。

### 各ページの構成方式

2種類が混在しているので、触る前にどちらか確認すること。

- **インライン `<style>` 型** — `plan-1-dark.html` / `plan-1-light.html`。CSSはファイル冒頭の `<style>` ブロックに閉じており、色は `:root` のカスタムプロパティ（`--bg`、`--panel`、`--accent`、`--accent2` など）経由で管理されている。色をハードコードせず、これらの変数を再利用する。
- **デザインシステム参照型** — `plan-2-light.html` / `plan-3-light.html` / `plan-4-light.html`。`<style>` ブロックを持たず、`docs/design-system/light/` の CSS だけで構成されている。このタイプのページの見た目を変えるときは、ページではなくデザインシステム側を編集する。

## デザインシステム

[docs/design-system/](docs/design-system/) を直接編集します。

- `light/` — ライト版（`tokens.css` / `components.css` / `design-system.md` / `tokens-usage-sample.html`）
- `dark/` — ダーク版（`tokens.css` / `design-system.md` / `tokens-usage-sample.html`）。`components.css` は未整備。
- `components.js` — CSSだけで完結しない挙動（現状は Modal の開閉のみ）。配色・寸法を持たないため **light / dark 共用**で、テーマ別ディレクトリではなく `design-system/` 直下に置く。
- `light-target.html` / `dark-target.html` — トークン化の元になった目標デザイン

### ルール

- `docs/` 内のHTMLからの読み込みパスは `design-system/light/...`（`docs/` を基準とした相対パス）。挙動が必要なページは、加えて `</body>` 直前で共用の `components.js` を読む。
  ```html
  <link rel="stylesheet" href="design-system/light/tokens.css">
  <link rel="stylesheet" href="design-system/light/components.css">
  <!-- Modal 等を使うページだけ、</body> の直前で -->
  <script src="design-system/components.js" defer></script>
  ```
- 読み込み順は **tokens.css → components.css**（後者が前者のカスタムプロパティに依存）。
- 挙動を足すときは、テーマ別の値を `components.js` に持ち込まない。見た目は各テーマの `components.css`、JSはデータ属性（`data-modal-open` 等）でのフックに留めることで共用を保つ。
- `components.css` は複数のページが共有している。**既存クラスの定義を変えると他の案にも波及する。** 1ページだけの見た目を変えたいときは、既存クラスを書き換えるのではなく修飾クラスを追加する（例: `.figure` に対する `.figure-flush`）。
- コンポーネントを追加・変更したら、同じディレクトリの `design-system.md`（仕様書）も更新する。
- ブレークポイントは md（`max-width:820px`）のみ。修飾クラスを足すときは、メディアクエリ内で基底クラスが上書きしている値がないか確認する。

## 図版（PNG）の作り方

`plan-4-light.html` の「AI開発の世代と私たちの立ち位置」で使っている方式です。図版はブラウザでレンダリングしてPNGに焼き、ページには `<img>` として貼ります。

1. 元ネタは drawio（例: [docs/plan-4-timeline.drawio](docs/plan-4-timeline.drawio)）。
2. それを再構成したHTML（例: [docs/plan-4-timeline.html](docs/plan-4-timeline.html)）を作る。**配色は掲載先ページのトークンに揃え、地色は挿入先の面と同色にする**（`plan-4` では `.figure` パネルと同じ `--panel` = `#f4f2ff`）。
3. Chrome ヘッドレスでPNGに焼く。`--window-size` の高さはコンテンツ高に合わせて調整する（ビューポート分しか写らないため、短いと下が切れる）。
   ```sh
   chrome --headless=new --hide-scrollbars --force-device-scale-factor=2 \
     --window-size=1200,838 --virtual-time-budget=3000 \
     --screenshot=docs/plan-4-timeline.png \
     docs/plan-4-timeline.html
   ```
   Windows の Chrome に渡すパスは絶対パス。URLフラグメント（`#evolution`）を付ける場合は `file:///R:/...` 形式にする。
4. ページ側では `<figure class="figure figure-flush">` に入れる。図版自身が面と余白を持つため、`figure-flush` で枠・背景・paddingを外してセクション背景と地続きに見せている。

## 作業時の注意

- ビルド・lint・テストの工程はありません。変更を確認するときは対象のHTMLをブラウザで直接開くか、`docs/` を任意の静的ファイルサーバーで配信してください。
- コンテンツは日本語です。コピーを編集するときは、対応する `docs/plan-<N>-<theme>.md` とHTMLの両方を一致させてください。
- 問い合わせ先は案によって異なります。`plan-1-*` はプレースホルダーのメールアドレス（`contact@example.com`）のままで、本番公開前の変更が必要です。`plan-2` 以降は問い合わせフォーム（`https://www.ucl-group.co.jp/contact`）へのリンクになっています。
