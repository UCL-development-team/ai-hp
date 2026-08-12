# AI Innovation 部 — Light Design System

白ベースに、パープル／ピンク／アンバー／シアンの4色パレットをグラデーションで効かせたビビッドなライトテーマです。
**原本デザインは `docs/index-1-light.html`** で、本デザインシステムはその見た目をトークン化・コンポーネント化したものです。原本の色・サイズ・余白の値をそのまま採用しているため、本システムで組んだページは原本と同じ見た目になります。

実装時の共有トークンは [tokens.css](tokens.css) を、コンポーネントの実装は [components.css](components.css) を参照してください。

> **このフォルダは `docs/plan-2/` 専用のコピーです。**原本は `docs/design-system/` にあり、`plan-2` はこのコピーだけを読み込みます。
> ここを編集しても他の案には影響しません。逆に、原本や他案の変更もここには入ってきません。

### ファイル構成

| ファイル | 役割 |
|---|---|
| [tokens.css](tokens.css) | 色・角丸・スペーシング・タイポグラフィ・モーションのCSSカスタムプロパティ定義 |
| [components.css](components.css) | 本仕様書「6. コンポーネント仕様」のCSS実装。値はすべて `var(--*)` でトークンを参照 |
| [../components.js](../components.js) | CSSだけで完結しない挙動（現状は 6.13 Modal の開閉のみ）。使うページだけ `</body>` 直前で読み込む。**dark と共用**のため `design-system/` 直下に置いている |
| [design-system.md](design-system.md) | 本仕様書 |
| [tokens-usage-sample.html](tokens-usage-sample.html) | トークンとコンポーネントの動作確認用デモ（全コンポーネントのカタログ） |

読み込み順は **tokens.css → components.css** の順（後者が前者の変数に依存）。

```html
<link rel="stylesheet" href="design-system/light/tokens.css">
<link rel="stylesheet" href="design-system/light/components.css">
```

適用例: `docs/index-2-light.html`（`<style>` を持たず、この2ファイルのみで構成）

6.13 Modal を使うページは、加えて `</body>` の直前で [components.js](../components.js) を読み込みます。こちらは配色・寸法を持たない挙動のみのファイルで、`light/` ではなく **`design-system/` 直下**（dark と共用）にあります。

```html
<script src="design-system/components.js" defer></script>
```

---

## 0. ダーク版との関係

`design-system/dark/` のダーク版とは**別系統のデザイン**です。ダーク版はティール＋ブルーの2色アクセント・小さめの角丸・控えめなタイポグラフィを採用しているのに対し、ライト版は白背景に4色パレット・大きな角丸・900ウェイトの大見出しという構成をとります。したがってトークンは色だけでなく、角丸・スペーシング・タイポグラフィの各スケールも異なります。

---

## 1. カラートークン

`:root` で定義されているCSSカスタムプロパティ。色は必ずこの変数経由で参照し、ハードコードしない。

### ベース

| 変数名 | 値 | 用途 |
|---|---|---|
| `--bg` | `#ffffff` | ページ背景（基調） |
| `--bg2` | `#f4f2ff` | セクション背景・pill背景（淡いラベンダー） |
| `--panel` | `#f4f2ff` | feature panel（`.w`）の面背景（= `--bg2`） |
| `--line` | `#e7e3f7` | ボーダー・区切り線 |
| `--ink` | `#0d0b1f` | 反転ブロック（`.big`）の背景 |

### テキスト

| 変数名 | 値 | 用途 |
|---|---|---|
| `--txt` | `#0d0b1f` | 基本テキスト |
| `--muted` | `#5b5776` | 補助テキスト |
| `--txt-on-ink` | `#ffffff` | `--ink` 背景上のテキスト |
| `--muted-on-ink` | `#b7b2d6` | `--ink` 背景上の補助テキスト |
| `--txt-on-accent` | `#ffffff` | カラーカード・CTA・`.btn-p` 上のテキスト |

### パレット（4色アクセント）

| 変数名 | 値 | 主な用途 |
|---|---|---|
| `--p1` | `#7c3aed` | パープル。主アクセント（ロゴ強調・pill文字・btn-p起点・カード1） |
| `--p2` | `#ec4899` | ピンク。eyebrow文字・グラデーション終端・カード2 |
| `--p3` | `#f59e0b` | アンバー。グラデーション文字の3色目・カード3 |
| `--p4` | `#06b6d4` | シアン。カード4 |
| `--p1-light` 〜 `--p4-light` | `#a855f7` `#f472b6` `#fbbf24` `#22d3ee` | 各色の明側。カードグラデーションの終端 |

`--accent` は `--p1`、`--accent2` は `--p2` のセマンティックな別名です。

### グラデーション

| 変数名 | 値 | 用途 |
|---|---|---|
| `--gradient-text` | `linear-gradient(100deg, p1, p2 55%, p3)` | `.gr`（`background-clip:text` の文字グラデーション） |
| `--gradient-btn` | `linear-gradient(100deg, p1, p2)` | `.btn-p` の面 |
| `--gradient-cta` | `linear-gradient(110deg, p1, p2)` | `.cta` の面 |
| `--gradient-card-1`〜`-4` | `linear-gradient(150deg, pN, pN-light)` | `.c1`〜`.c4` のカード面 |

### 背景の装飾

| 変数名 | 用途 |
|---|---|
| `--hero-bg` | ヒーローの3層放射グラデーション（右上=ピンク18%、左中=パープル16%、下中=シアン14%） |

---

## 2. タイポグラフィ

- **フォントファミリー**: `"Helvetica Neue","Hiragino Sans","Noto Sans JP",-apple-system,sans-serif`
- **基本行間**: `1.7`（body / `--line-height-base`）
- **見出し行間**: h1 は `.98`（`--line-height-h1`）、セクション見出し・CTA見出しは `1.05`（`--line-height-heading`）
- **文字間隔**: 大見出しは強い負のletter-spacing（`-2px`／`-1px`）で締める。eyebrowは `1px` で広げる。
- **ウェイト**: 見出し・ボタン・タグは基本 `900`（`.lede` のみ `500`）。ダーク版（800中心）より一段太い。

| 要素 | サイズ | ウェイト | 備考 |
|---|---|---|---|
| `h1`（ヒーロー見出し） | `clamp(42px, 8vw, 88px)` | 900 | `letter-spacing:-2px` |
| `.s-title`（セクション見出し） | `clamp(30px, 5vw, 52px)` | 900 | `letter-spacing:-1px` |
| `.cta h2` | `clamp(30px, 5vw, 52px)` | 900 | `letter-spacing:-1px` |
| `.big .num`（大数値） | `clamp(48px, 9vw, 92px)` | 900 | `letter-spacing:-2px`, `line-height:1` |
| `.lede`（リード文） | `clamp(16px, 2vw, 21px)` | 500 | color: `--muted`, max-width 620px |
| `.s-sub`（セクション補足） | `17px` | 400 | color: `--muted`, max-width 640px |
| `.eyebrow`（ラベル） | `14px` | 900 | `uppercase`, `letter-spacing:1px`, color: `--p2` |
| `.card h3` | `26px` | 900 | `letter-spacing:-.5px` |
| `.card p` | `15.5px` | 400 | `opacity:.95` |
| `.card .n` / `.card .k` | `15px` / `13px` | 900 / 800 | `opacity:.75` / `.9` |
| `.big b` | `20px` | 900 | 反転ブロック内の見出し |
| `.big small` | `15px` | 600 | color: `--muted-on-ink` |
| `.why .w h4` | `20px` | 900 | `letter-spacing:-.3px` |
| `.why .w p` | `15px` | 400 | color: `--muted` |
| `.nav-links a` | `15px` | 600 | color: `--muted` |
| `.logo` | `20px` | 900 | `letter-spacing:-.5px`（footerは `.logo-sm` で17px） |
| `.btn` / `.mtag` / `.pill` | `15px` / `15px` / `14px` | 800 | |

見出し内の強調語には `.gr`（グラデーション文字）を部分適用できる。

---

## 3. スペーシング & レイアウト

- **コンテンツ幅**: `.wrap { max-width:1140px; margin:0 auto; padding:0 24px }`
- **セクション垂直パディング**: `section { padding:100px 0 }`
- **ヒーロー**: `padding:110px 0 90px`
- **ナビ高さ**: `70px`（`--nav-height`） / サブヘッダー版 `52px`（`--nav-height-sub`、`.nav-sub`）
- **グリッド間隔**: `.cards` = 24px（`--gap-grid`） / `.why` = 26px（`--gap-feat`） / `.bigrow` = 40px（`--gap-stats`）
- **内側パディング**: card `40px 34px` / `.big` `70px 48px` / `.why .w` `32px` / `.cta` `72px 40px` / `.btn` `13px 26px`
- **モーダル**: 四方 `24px`（`--modal-gap` = `--content-padding-x`）を空けた領域に、幅上限 `1180px`（`--modal-max-width`）。高さは無制限（`--modal-max-height: none`）で縦を使い切る。詳細は [6.13 Modal](#613-modaldialog)

### グリッドパターン

- `.cards`: 標準は `repeat(2, 1fr)`。`.cards-3` を併記すると `repeat(3, 1fr)`
- `.why`: `repeat(3, 1fr)`
- `.bigrow`: `repeat(3, 1fr)`

### ブレークポイント

`@media (max-width:820px)` の単一ブレークポイントのみ:
- `.nav-links` を非表示（ハンバーガー等は未実装）
- `.cards` / `.cards-3` / `.why` / `.bigrow` を `1fr`（縦積み）に変更、`.bigrow` の gap を 36px に
- `.big` / `.cta` の内側パディングを縮小

---

## 4. 角丸 (Radius) スケール

| 変数名 | 値 | 用途 |
|---|---|---|
| `--radius-sm` | `14px` | 小さい面 |
| `--radius-md` | `22px` | feature panel（`.w`） |
| `--radius-lg` | `26px` | card |
| `--radius-xl` | `32px` | 反転ブロック（`.big`） |
| `--radius-2xl` | `34px` | CTA |
| `--radius-pill` | `999px` | button / pill / mtag |

角丸が全体的に大きいのが本テーマの特徴です（ダーク版は 6〜24px）。

---

## 5. シャドウ & エフェクト

- **プライマリボタンの浮遊感**: `--shadow-btn: 0 10px 30px rgba(124,58,237,.35)`（`--p1` の35%）
- **ホバー時の動き**:
  - `.btn-p:hover { transform:translateY(-2px) scale(1.02) }`
  - `.btn-o:hover { background:var(--txt); color:var(--bg) }`（反転）
  - `.card:hover { transform:translateY(-6px) }`
  - `a.mtag:hover { transform:translateY(-2px) }`
- **backdrop blur**: `nav { background:rgba(255,255,255,.8); backdrop-filter:blur(12px) }`
- **トランジション速度**: ボタン `.2s`（`--transition-fast`）／カード `.25s`（`--transition-base`）
- 本テーマにグロー（`box-shadow` による発光）やアニメーションはありません（ダーク版の `pulse` に相当するものは持たない）。

---

## 6. コンポーネント仕様

実装は [components.css](components.css) にあり、各節の番号がファイル内のコメント見出しと対応しています。

### クラス一覧

| 節 | コンポーネント | 主なクラス |
|---|---|---|
| 6.1 | Navigation | `nav`（`.nav-sub`）/ `.nav-in` / `.nav-links` / `.logo`（`.logo-sm`） |
| 6.2 | Buttons | `.btn` / `.btn-p` / `.btn-o` / `.btn-w` / `.btn-wo` |
| 6.3 | Pill | `.pill` |
| 6.4 | Inverted block | `.big` / `.bigrow`（`.num` `b` `small`） |
| 6.5 | Card | `.cards`（`.cards-3`）/ `.card` + `.c1`〜`.c4`（`.n` `.k`） |
| 6.6 | Marquee tag | `.marquee` / `.mtag` + `.m1`〜`.m4` |
| 6.7 | Feature panel | `.why` / `.w`（`.e` `.n`） |
| 6.8 | CTA | `.cta` |
| 6.9 | Footer | `footer` / `.foot-in` |
| 6.10 | Section header | `.eyebrow` / `.s-title` / `.s-sub` |
| 6.12 | Figure（図版パネル） | `.figure`（`.figure-flush` / `img` / `figcaption`） |
| 6.13 | Modal（`<dialog>`） | `.modal` / `.modal-in` / `.modal-head` / `.modal-title` / `.modal-actions` / `.modal-link` / `.modal-close` / `.modal-body` / `.modal-frame` |
| — | Hero | `.hero` / `.lede` / `.hero-cta` |
| — | Utility | `.wrap` / `.gr` / `.section-alt` / `.section-flush` |

### 6.1 Navigation (`nav`)
- position:sticky, top:0, z-index:50、高さ70px（`--nav-height`）
- 半透明の白背景（80%）+ blur、下ボーダーのみ（`--line`）
- 左ロゴ／中央リンク／右CTAボタンの3分割
- ロゴ: 900ウェイトのテキストのみ。`<span>` で囲んだ語だけ `--p1` に着色（例: `AI <span>Innovation</span> 部`）。フッターでは `.logo-sm` で17pxに縮小

**`.nav-sub`（修飾クラス / `<nav>` に付与）** — 既存サイトのヘッダー配下に差し込むページ用のサブヘッダー。
- 高さ52px（`--nav-height-sub`）、ロゴ17px、リンク14px・gap 24px
- 親サイト側のヘッダーが問い合わせ導線を持つ前提のため、右のCTAボタンは置かずロゴ＋ページ内リンクの2分割にする
- 使用例: [../../index.html](../../index.html)

### 6.2 Buttons
- `.btn`: 基本形（padding `13px 26px`、`--radius-pill`、15px/800）
- `.btn-p`: グラデーション面（`--gradient-btn`）・白文字・紫の影。ホバーで2px上昇＋1.02倍
- `.btn-o`: 2pxの `--txt` ボーダー。ホバーで地色と文字色が反転
- `.btn-w` / `.btn-wo`: CTA（濃色面）上で使う白ボタン／白アウトラインボタン

### 6.3 Pill（ステータスラベル）
- ピル型、`--bg2` 背景 + `--line` ボーダー、文字は `--p1`（14px/800）
- ヒーロー冒頭に配置し、下に28pxのマージン

### 6.4 Inverted block (`.big`)
- `--ink` の濃色面、`--radius-xl`、padding `70px 48px`、中央揃え
- `.bigrow` で3カラム。各カラムは `.num`（大数値、`.gr` を併用してグラデーション化）→ `b`（見出し・任意）→ `small`（説明）の縦構成
- 内部に 6.10 のセクション見出しパターンを置く場合、`.eyebrow` は `--p3`、`.s-sub` は `--muted-on-ink` に自動で切り替わる

### 6.5 Card（カラーカード）
- 4色のグラデーション面（`.c1`〜`.c4`）に白文字。ボーダーなし、`--radius-lg`、padding `40px 34px`
- `.n`（採番）→ `h3`（タイトル）→ `p`（説明）→ `.k`（メタ情報）の縦構成
- `.k` は `# タグA　# タグB` のように `#` 区切りの1行テキストで表現する
- ホバーで6px浮き上がり
- 3枚構成のときは `.cards.cards-3`。色は連続を避けて `c1 / c2 / c4` のように選ぶ

### 6.6 Marquee tag (`.mtag`)
- ピル型の塗りタグ。`.m1`〜`.m4` でパレット4色を割り当てる
- ヒーロー下部のキーワード列に使用。`<a>` にするとホバーで2px上昇

### 6.7 Feature panel (`.why` / `.w`)
- `--panel` 背景 + `--line` ボーダー、`--radius-md`、padding 32px
- 先頭に絵文字アイコン（`.e`、34px）または採番ラベル（`.n`、`--p1`）、その下に `h4` と `p`

### 6.8 CTA セクション
- `--gradient-cta` の濃色面に白文字、`--radius-2xl`、padding `72px 40px`、中央揃え
- 内部に見出し・補足文・ボタン列（`.hero-cta` を中央寄せで再利用）。ボタンは `.btn-w` / `.btn-wo`

### 6.9 Footer
- 上ボーダーのみ（`--line`）、padding `50px 0`、15px/`--muted`
- 左にロゴ（`.logo-sm`）、右にコピーライト。`space-between` でレスポンシブに折り返し

### 6.10 Section header pattern
全セクション共通で以下の3点セット構成:
1. `.eyebrow` — 小さいラベル（英語・uppercase・`--p2`）
2. `.s-title` — セクションの主見出し
3. `.s-sub` — 補足説明（`--muted`、max-width制限で読みやすい行長に）

### 6.11 セクション背景のパターン
ヒーローは `--hero-bg`、通常セクションは `--bg`。変化をつけたいセクションに `.section-alt`（`--bg2`）を付与します。`.big`（濃色ブロック）を挟むセクションには `.section-flush` を付けて上パディングを詰め、直前のセクションと地続きに見せます。

### 6.12 Figure（図版パネル）
- 図版（PNG/SVG）をページ内に置くための枠。`--panel` 背景 + `--line` ボーダー、`--radius-lg`、padding 28px（md以下は16px）
- `<figure class="figure">` に `img` を入れる。`img` は `width:100%` / `height:auto` で枠に追従し、`--radius-sm` で角を丸める
- 説明を添える場合は `figcaption`（14px/800、`--muted`、中央揃え）を `img` の後ろに置く
- `alt` は必須。図が伝える内容を文章で説明する
- 6.10 のセクション見出しパターンの直下に置く想定（`margin-top:56px`）
- `.figure-flush` を併記すると枠・背景・角丸・padding を外す。図版自身が面（背景色）と余白を持っていて、セクション背景と地続きに見せたい場合に使う。padding が無くなる分、図版はコンテンツ幅いっぱいに広がる

### 6.13 Modal（`<dialog>`）

別ページを離脱せずに見せるためのオーバーレイ。ネイティブの `<dialog>` を `showModal()` で開き、中身は `<iframe>`（`.modal-frame`）で対象ページをそのまま表示します。挙動は [../components.js](../components.js)（light / dark 共用）が担当し、このファイルはCSS側の見た目だけを定義します。

- `.modal`（= `<dialog>`）: `--radius-lg`、`--bg` 面、`--shadow-modal`
  - `::backdrop` は `--overlay` + `blur(3px)`。`body:has(dialog[open])` で背後のページのスクロールを止める
  - md以下では全画面（`inset:0`、角丸なし）になり、`.modal-link` は非表示

#### 寸法（inset モデル）

幅・高さを直接指定せず、**四方を `--modal-gap` だけ内側に寄せた領域**を上限トークンで切り取って決めます。

```css
--modal-gap: var(--content-padding-x); /* 四方の余白 */
position:fixed; inset:var(--modal-gap); margin:auto;
width:auto; height:auto;
max-width:var(--modal-max-width);   /* 1180px — 読みやすさのため幅は固定 */
max-height:var(--modal-max-height); /* none  — 高さは制限しない */
```

軸ごとに方針が違います。

- **幅**は `--modal-max-width`（1180px）で固定。広い画面では左右の余白が増える（`margin:auto` で中央寄せ）
- **高さ**は `--modal-max-height: none` で制限しない。`<iframe>` の中身が縦に長いことを前提に、上下は `--modal-gap` だけ空けて縦を使い切る
- `margin:auto` は上限で縮んだときの中央寄せ用。`components.css` 冒頭の `*{margin:0}` reset がブラウザ標準の `margin:auto` を打ち消すため明示している
- 実測値:

  | ビューポート | サイズ | 左右マージン | 上下マージン |
  |---|---|---|---|
  | 1440 × 900 | 1180 × 852 | 130 | 24 |
  | 1920 × 1080 | 1180 × 1032 | 370 | 24 |
  | 2560 × 1440 | 1180 × 1392 | 690 | 24 |
  | 1200 × 800（幅キャップ未達） | 1152 × 752 | 24 | 24 |
  | 1440 × 620（低い画面） | 1180 × 572 | 130 | 24 |
  | 390 × 844（md以下） | 390 × 844 | 0 | 0（全画面） |

#### サイズを表示箇所ごとに変える

上限トークンを、`.modal` の定義ではなく**その `<dialog>` 要素の上で上書き**します。1箇所だけならインライン、複数ページで使い回すなら修飾クラスで指定します。縦を短くしたい箇所では `--modal-max-height` に値を入れます（既定は `none`）。

```html
<!-- 1箇所だけ小さくする（上限で縮んだ分は margin:auto で中央寄せされる） -->
<dialog id="sddkit-modal" class="modal" style="--modal-max-width:820px; --modal-max-height:520px">
```

```css
/* 使い回す場合は修飾クラスを足す（基底クラスは書き換えない） */
.modal-narrow{--modal-max-width:720px;--modal-max-height:480px}
```

- 余白そのものを変えたい場合は `--modal-gap` を上書きする（四方に等しく効く）
- 上書きするのは**上限値だけ**なので、狭いビューポートでは従来どおり余白を除いた全面に収まり、レスポンシブ性は保たれる
- md以下の全画面化は `width`/`height` を直接指定しているルールのため、上限トークンを上書きしてもモバイルの全画面表示は維持される
- 内部構成: `.modal-in`（縦フレックス）→ `.modal-head`（`.modal-title` ／ `.modal-actions` = `.modal-link` + `.modal-close`）＋ `.modal-body`（残り高さいっぱい、`.modal-frame` を敷く）
- マークアップと属性:

  ```html
  <!-- 開くきっかけ。href はJS無効時のフォールバック先（＝モーダルで見せるページ） -->
  <a href="../assets/SDD-Kit/index.html" class="btn btn-wo" data-modal-open="sddkit-modal">SDD-Kitを詳しく見る</a>

  <dialog id="sddkit-modal" class="modal" aria-labelledby="sddkit-modal-title">
    <div class="modal-in">
      <div class="modal-head">
        <div class="modal-title" id="sddkit-modal-title">SDD-Kit</div>
        <div class="modal-actions">
          <a class="modal-link" href="../assets/SDD-Kit/index.html" target="_blank" rel="noopener">新しいタブで開く ↗</a>
          <button type="button" class="modal-close" data-modal-close autofocus aria-label="閉じる">✕</button>
        </div>
      </div>
      <div class="modal-body">
        <iframe class="modal-frame" data-src="../assets/SDD-Kit/index.html" title="SDD-Kit の詳細"></iframe>
      </div>
    </div>
  </dialog>
  ```

  - `data-modal-open="<dialogのid>"` — クリックで対象を開く。`<a>` に付けるのが基本（`.btn` の見た目をそのまま使え、JS無効時は `href` の遷移にフォールバックする）
  - `data-modal-close` — クリックで、自分が属する `<dialog>` を閉じる
  - `<iframe>` の `src` は書かず `data-src` に置く。初回オープン時にだけ `src` へ移されるので、ページ表示時に読み込まれない
  - `aria-labelledby` で `.modal-title` を参照し、`<iframe>` には `title` を必ず付ける
  - `.modal-close` に `autofocus` を付ける。付けないと `showModal()` の初期フォーカスが `.modal-link` に落ち、リンクに既定のフォーカスリング（角枠）が出てしまう。`:focus-visible` のリングは `--p1` の2px アウトラインに整えている
- 閉じ方は3通り: `.modal-close` のクリック／背景（`::backdrop`）のクリック／Esc キー（`<dialog>` の標準挙動）
- `<dialog>` 非対応ブラウザでは components.js が何もしないため、きっかけの `<a href>` がそのまま効いて同じページへ遷移する

適用例: `docs/plan-2/index.html` の CTA（`docs/assets/SDD-Kit/index.html` を表示）

---

## 7. アイコン運用

絵文字をアイコンとして直接使用（外部アイコンライブラリ非依存）:
- 🎯 実装まで、やり切る / 🔒 セキュリティ前提 / 📈 成果で語る

軽量な単一HTMLファイル構成を維持する方針と一致します（[CLAUDE.md](../../../../CLAUDE.md) 参照）。

---

## 8. 既知の未定義領域

デザインシステムとして今後定義が必要な可能性がある要素:
- モバイル用ナビゲーション（ハンバーガーメニュー等）— 現状820px以下で単純非表示
- フォームコンポーネント（input, textarea, select等）
- エラー/成功などのステータスカラー
