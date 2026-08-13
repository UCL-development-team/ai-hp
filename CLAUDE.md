# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## このリポジトリについて

これは **AI Innovation 部**（AI Innovation Division）のマーケティング用ホームページ、およびそのデザイン案を検討するためのリポジトリです。ビルドシステムやパッケージマネージャー、フレームワークは一切使用しておらず、プレーンなHTML/CSSだけで構成された静的サイトです。

**公開・編集の対象はすべて [docs/](docs/) 配下です。** GitHub Pages（リポジトリ → Settings → Pages → `/docs`）で配信する想定のため、ページから参照されるもの（CSS・画像・図版）は必ず `docs/` の中に置き、そこを直接編集します。原本／配信用コピーの二重管理はしていません。

**デザイン案は1案＝1ディレクトリです。** 案ごとに独立して育てられるよう、デザインシステムも案の中にコピーを持ちます。

```
docs/
  index.html          デザイン案の一覧ページ（各案ディレクトリへのリンクのみ）
  plan-1-dark/        ┐
  plan-1-light/       │ 各デザイン案（下記の構成）
  plan-2/ … plan-5/   ┘
  design-system/      デザインシステムの原本（どのページからも参照されない）
  assets/             全案で共用するもの（画像・図版、`SDD-Kit/` の紹介ページ）
```

各案ディレクトリの中身:

- `index.html` — ページ本体。
- `index.md` — そのページの**掲載内容（コピー）の正**。文言を変更するときは md と html の両方を同期させる。
- `design-system/` — その案専用のデザインシステム（後述）。インライン `<style>` 型の案（`plan-1-*`）は持たない。
- `custom.css` — その案だけの**個別対応**（後述）。必要な案だけが持つ。
- `timeline.drawio` / `timeline.css` — その案だけで使う図版（持たない案もある）。`plan-5` はマークアップを `index.html` に直接書き、スタイルだけを `timeline.css` に分ける方式（後述）。`plan-4` までは同じ内容をPNGに焼いて `<img>` で貼っていたため、`timeline.html` / `timeline.png` を持つ案もある。

その他:

- [README.md](README.md) — リポジトリの入口。
- `assets/`（リポジトリ直下） — ロゴの原本（`ucl-logo.svg`/`.png`、ダーク背景用の `ucl-logo-black.svg`/`.png`）。ページから参照する場合は `docs/assets/` 側にコピーして使う。

**`plan-1`〜`plan-4` は過去の検討履歴として凍結されており、変更してはいけません。** 文言の統一などリポジトリ全体に関わる指摘であっても、反映先は最新の案（現状は `plan-5`）だけです。

### 各ページの構成方式

2種類が混在しているので、触る前にどちらか確認すること。

- **インライン `<style>` 型** — `plan-1-dark/` / `plan-1-light/`。CSSはファイル冒頭の `<style>` ブロックに閉じており、色は `:root` のカスタムプロパティ（`--bg`、`--panel`、`--accent`、`--accent2` など）経由で管理されている。色をハードコードせず、これらの変数を再利用する。
- **デザインシステム参照型** — `plan-2/` 〜 `plan-5/`。`<style>` ブロックを持たず、**自分のディレクトリ内の** `design-system/light/` の CSS だけで構成されている。このタイプのページの見た目を変えるときは、ページではなくその案のデザインシステム側を編集する。

## デザインシステム

**原本は [docs/design-system/](docs/design-system/)、実際に使われるのは各案の `docs/plan-<N>/design-system/`（原本のコピー）です。** 原本はどのページからも読み込まれません。

- `light/` — ライト版（`tokens.css` / `components.css` / `design-system.md` / `tokens-usage-sample.html`）
- `dark/` — ダーク版（`tokens.css` / `design-system.md` / `tokens-usage-sample.html`）。`components.css` は未整備。原本にのみ存在。
- `components.js` — CSSだけで完結しない挙動（現状は Modal の開閉のみ）。配色・寸法を持たないため **light / dark 共用**で、テーマ別ディレクトリではなく `design-system/` 直下に置く。
- `light-target.html` / `dark-target.html` — トークン化の元になった目標デザイン。原本にのみ存在。

### デザインシステム ＋ 個別対応 ＝ 運用サイト

**デザインシステムには、そのテーマの中で汎用的に使える定義だけを置きます。** 外部サイトとの連携のように性質の違うものは**個別対応**とし、デザインシステムには入れず、案の直下の `custom.css` に書きます。

| | 置き場所 | 例 |
|---|---|---|
| 汎用の定義 | `plan-<N>/design-system/` | ボタン、カード、モーダル、セクション見出し |
| 個別対応 | `plan-<N>/custom.css` | 現行UCLサイトと揃えるための色・タイトル帯・共通フッター・サブヘッダー化した nav |

- 読み込み順は **tokens.css → components.css → custom.css**（個別対応が最後）。
- 判断基準: **他のページでも同じものが使えるか。** 使えるならデザインシステム、特定の連携先に依存するなら個別対応。
- 個別対応の値をデザインシステム側のトークンやクラスに混ぜない。逆に、個別対応から `--p1` などデザインシステムのトークンを参照するのは問題ない。

### ルール

- **編集するのは対象の案の中の `design-system/` だけ。** 原本や他案のコピーには触らない。原本は新しい案を作るときのコピー元としてのみ使う（コピー後の同期は不要）。
- 案のHTMLからの読み込みパスは `design-system/light/...`（**案ディレクトリを基準とした**相対パス）。挙動が必要なページは、加えて `</body>` 直前で `components.js` を読む。
  ```html
  <link rel="stylesheet" href="design-system/light/tokens.css">
  <link rel="stylesheet" href="design-system/light/components.css">
  <!-- Modal 等を使うページだけ、</body> の直前で -->
  <script src="design-system/components.js" defer></script>
  ```
- 読み込み順は **tokens.css → components.css**（後者が前者のカスタムプロパティに依存）。
- 挙動を足すときは、テーマ別の値を `components.js` に持ち込まない。見た目は各テーマの `components.css`、JSはデータ属性（`data-modal-open` 等）でのフックに留めることで共用を保つ。
- `components.css` は1つの案の中で複数箇所が共有している。**既存クラスの定義を変えるとページ全体に波及する。** 一部だけ見た目を変えたいときは、既存クラスを書き換えるのではなく修飾クラスを追加する（例: `.figure` に対する `.figure-flush`、`nav` に対する `.nav-sub`）。
- コンポーネントを追加・変更したら、同じディレクトリの `design-system.md`（仕様書）も更新する。
- ブレークポイントは md（`max-width:820px`）のみ。修飾クラスを足すときは、メディアクエリ内で基底クラスが上書きしている値がないか確認する。

## 図版の作り方

元データは drawio（例: [docs/plan-5/timeline.drawio](docs/plan-5/timeline.drawio)）。それを再構成したHTMLを**ページに直接埋め込みます**（PNGには焼きません）。拡大しても滲まず、テキストが選択・検索・読み上げできます。

- マークアップはページの `<figure class="figure figure-flush">` の中に置く。図版自身が面と余白を持つため、`figure-flush` で枠・背景・paddingを外してセクション背景と地続きに見せる。
- スタイルは図版専用のCSSファイル（例: `timeline.css`）に分け、**すべてのセレクタをルートのクラス配下にスコープする**（例: `.timeline .chip{...}`）。ページ側のコンポーネントと名前が重なっても衝突しない。カスタムプロパティも `:root` ではなくルートのクラスに置き、接頭辞（`--tl-*`）を付ける。
- ルートのクラスに `zoom: var(--<名前>-scale)` を持たせ、**図版全体の大きさを1か所で変えられる**ようにする。`transform: scale()` は見た目だけ縮んで余白が残るため使わない。
- 配色は掲載先ページのトークンに揃える。ただし**地色は持たせない**（セクションの背景をそのまま透かす）。地色を焼き込むと、掲載先セクションの背景色を変えられなくなる。
- 図版のルート要素に `<section>` を使わない（`section{padding:100px 0}` を拾う）。
- 図版のマークアップはページ（`index.html`）にしか置かない。**単体確認用のHTMLを別に持たない**（同じマークアップが2か所にあると必ず食い違うため）。確認はページごとブラウザで開く。

## 作業時の注意

- ビルド・lint・テストの工程はありません。変更を確認するときは対象のHTMLをブラウザで直接開くか、`docs/` を任意の静的ファイルサーバーで配信してください。
- コンテンツは日本語です。コピーを編集するときは、対応する `docs/plan-<N>-<theme>.md` とHTMLの両方を一致させてください。
- 問い合わせ先は案によって異なります。`plan-1-*` はプレースホルダーのメールアドレス（`contact@example.com`）のままで、本番公開前の変更が必要です。`plan-2` 以降は問い合わせフォーム（`https://www.ucl-group.co.jp/contact`）へのリンクになっています。
