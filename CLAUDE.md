# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## このリポジトリについて

これは **AI Innovation 部**（AI Innovation Division）のマーケティング用ホームページ、およびそのデザイン案を検討するためのリポジトリです。ビルドシステムやパッケージマネージャー、フレームワークは一切使用しておらず、プレーンなHTML/CSSだけで構成された静的サイトです。

**公開・編集の対象はすべて [docs/](docs/) 配下です。** GitHub Pages（リポジトリ → Settings → Pages → `/docs`）で配信する想定のため、ページから参照されるもの（CSS・画像・図版）は必ず `docs/` の中に置き、そこを直接編集します。原本／配信用コピーの二重管理はしていません。

**運用サイト本体は `docs/` 直下です。** 採用した案（`plan-5`）を `docs/` 直下へ昇格させたもので、編集するのはここです。`plan-*/` は過去の検討履歴として凍結されています。

```
docs/
  index.html          運用サイト本体（旧 plan-5）
  index.md            掲載内容（コピー）の正
  custom.css          個別対応（後述）
  timeline.drawio     図版の元データ
  timeline.css        図版のスタイル（マークアップは index.html の中）
  design-system/      デザインシステム（原本。index.html がここを直接参照する）
  assets/             画像・図版・ロゴ、`SDD-Kit/` の紹介ページ
  plan-1-dark/        ┐
  plan-1-light/       │ 過去の検討履歴（凍結。下記の構成）
  plan-2/ … plan-5/   ┘
```

- `index.html` — ページ本体。
- `index.md` — そのページの**掲載内容（コピー）の正**。文言を変更するときは md と html の両方を同期させる。
- `custom.css` — **個別対応**（後述）。
- `timeline.drawio` / `timeline.css` — 図版（後述）。マークアップは `index.html` に直接書き、スタイルだけを `timeline.css` に分ける。`plan-4` までは同じ内容をPNGに焼いて `<img>` で貼っていたため、`timeline.html` / `timeline.png` を持つ案もある。

その他:

- [README.md](README.md) — リポジトリの入口。

**`plan-1`〜`plan-5` は過去の検討履歴として凍結されており、変更してはいけません。** 各案は自分のディレクトリの中に当時のデザインシステムのコピーを抱えており、それによって当時の見た目のまま固定されています。文言の統一などリポジトリ全体に関わる指摘であっても、反映先は `docs/` 直下の運用サイトだけです。

各案には `docs/plan-1-dark/` のような直接URLでアクセスします（一覧ページはありません）。

### 各ページの構成方式

2種類が混在しているので、触る前にどちらか確認すること。

- **インライン `<style>` 型** — `plan-1-dark/` / `plan-1-light/`。CSSはファイル冒頭の `<style>` ブロックに閉じており、色は `:root` のカスタムプロパティ（`--bg`、`--panel`、`--accent`、`--accent2` など）経由で管理されている。色をハードコードせず、これらの変数を再利用する。
- **デザインシステム参照型** — `docs/` 直下の運用サイトと `plan-2/` 〜 `plan-5/`。`<style>` ブロックを持たず、`design-system/light/` の CSS だけで構成されている。このタイプのページの見た目を変えるときは、ページではなくデザインシステム側を編集する。

## デザインシステム

**原本は [docs/design-system/](docs/design-system/) の1つだけで、運用サイト（`docs/index.html`）はこれを直接参照します。** 凍結された `plan-*/design-system/` は当時のコピーであり、原本とは切り離されています。

- `light/` — ライト版（`tokens.css` / `components.css` / `design-system.md` / `tokens-usage-sample.html`）。運用サイトが使うのはこちら。
- `dark/` — ダーク版（`tokens.css` / `design-system.md` / `tokens-usage-sample.html`）。`components.css` は未整備。原本にのみ存在。
- `components.js` — CSSだけで完結しない挙動（Modal の開閉、Reveal、Disclosure）。配色・寸法を持たないため **light / dark 共用**で、テーマ別ディレクトリではなく `design-system/` 直下に置く。
- `light-target.html` / `dark-target.html` — トークン化の元になった目標デザイン。原本にのみ存在。

### デザインシステム ＋ 個別対応 ＝ 運用サイト

**デザインシステムには、そのテーマの中で汎用的に使える定義だけを置きます。** 外部サイトとの連携のように性質の違うものは**個別対応**とし、デザインシステムには入れず、`custom.css` に書きます。

| | 置き場所 | 例 |
|---|---|---|
| 汎用の定義 | `docs/design-system/` | ボタン、カード、モーダル、セクション見出し |
| 個別対応 | `docs/custom.css` | 現行UCLサイトと揃えるための色・タイトル帯・共通フッター・サブヘッダー化した nav |

- 読み込み順は **tokens.css → components.css → custom.css**（個別対応が最後）。
- 判断基準: **他のページでも同じものが使えるか。** 使えるならデザインシステム、特定の連携先に依存するなら個別対応。
- 個別対応の値をデザインシステム側のトークンやクラスに混ぜない。逆に、個別対応から `--p1` などデザインシステムのトークンを参照するのは問題ない。

### ルール

- **大原則: 編集するのは原本（`docs/design-system/`）だけ。** 汎用的に使えるものは必ず原本に入れる。運用サイトは原本を直接読み込むので、コピーも同期作業も発生しない。
- **凍結された `plan-*/design-system/` には触らない。** そこは当時の見た目を保存するためのスナップショットであり、原本の更新を配って回る対象ではない（配ると凍結が壊れる）。
- HTMLからの読み込みパスは `design-system/light/...`（**ページと同じ階層を基準とした**相対パス）。挙動が必要なページは、加えて `</body>` 直前で `components.js` を読む。
  ```html
  <link rel="stylesheet" href="design-system/light/tokens.css">
  <link rel="stylesheet" href="design-system/light/components.css">
  <!-- Modal 等を使うページだけ、</body> の直前で -->
  <script src="design-system/components.js" defer></script>
  ```
- 読み込み順は **tokens.css → components.css**（後者が前者のカスタムプロパティに依存）。
- 挙動を足すときは、テーマ別の値を `components.js` に持ち込まない。見た目は各テーマの `components.css`、JSはデータ属性（`data-modal-open` 等）でのフックに留めることで共用を保つ。
- `components.css` はページ内の複数箇所が共有している。**既存クラスの定義を変えるとページ全体に波及する。** 一部だけ見た目を変えたいときは、既存クラスを書き換えるのではなく修飾クラスを追加する（例: `.figure` に対する `.figure-flush`、`nav` に対する `.nav-sub`）。
- コンポーネントを追加・変更したら、同じディレクトリの `design-system.md`（仕様書）も更新する。
- ブレークポイントは md（`max-width:820px`）のみ。修飾クラスを足すときは、メディアクエリ内で基底クラスが上書きしている値がないか確認する。

## 図版の作り方

元データは drawio（[docs/timeline.drawio](docs/timeline.drawio)）。それを再構成したHTMLを**ページに直接埋め込みます**（PNGには焼きません）。拡大しても滲まず、テキストが選択・検索・読み上げできます。

- マークアップはページの `<figure class="figure figure-flush">` の中に置く。図版自身が面と余白を持つため、`figure-flush` で枠・背景・paddingを外してセクション背景と地続きに見せる。
- スタイルは図版専用のCSSファイル（例: `timeline.css`）に分け、**すべてのセレクタをルートのクラス配下にスコープする**（例: `.timeline .chip{...}`）。ページ側のコンポーネントと名前が重なっても衝突しない。カスタムプロパティも `:root` ではなくルートのクラスに置き、接頭辞（`--tl-*`）を付ける。
- ルートのクラスに `zoom: var(--<名前>-scale)` を持たせ、**図版全体の大きさを1か所で変えられる**ようにする。`transform: scale()` は見た目だけ縮んで余白が残るため使わない。
- 配色は掲載先ページのトークンに揃える。ただし**地色は持たせない**（セクションの背景をそのまま透かす）。地色を焼き込むと、掲載先セクションの背景色を変えられなくなる。
- 図版のルート要素に `<section>` を使わない（`section{padding:100px 0}` を拾う）。
- 図版のマークアップはページ（`index.html`）にしか置かない。**単体確認用のHTMLを別に持たない**（同じマークアップが2か所にあると必ず食い違うため）。確認はページごとブラウザで開く。

## 作業時の注意

- ビルド・lint・テストの工程はありません。変更を確認するときは対象のHTMLをブラウザで直接開くか、`docs/` を任意の静的ファイルサーバーで配信してください。
- コンテンツは日本語です。コピーを編集するときは、[docs/index.md](docs/index.md) と [docs/index.html](docs/index.html) の両方を一致させてください。
- 問い合わせ先は問い合わせフォーム（`https://www.ucl-group.co.jp/contact`）へのリンクです。凍結された `plan-1-*` だけはプレースホルダーのメールアドレス（`contact@example.com`）のままですが、公開対象ではないため変更不要です。
- ページ内の画像・図版・ロゴ・`SDD-Kit/` は `docs/assets/` にあります。`docs/index.html` からは `assets/...`（`../` を付けない）で参照します。
- ヘッダーのロゴは `docs/assets/ucl-logo.png`（本体サイトと同じPNG）です。リポジトリ直下に原本のコピーは置きません。過去に手起こしのSVG版（`ucl-logo.svg` / `ucl-logo-black.svg`）がありましたが、ロゴアイコン部の再現が不正確で社名がアウトライン化されていない（`<text>` のまま）ため廃止しました。
