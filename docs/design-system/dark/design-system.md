# AI Innovation 部 — Dark Design System

`ai-innovation_sample_dark.html` から逆算して抽出したデザインシステムです。
このファイル自体は仕様書であり、元のサンプルHTMLは変更していません。
実装時の共有トークンは [tokens.css](tokens.css) を参照してください。

CSSだけで完結しない挙動（現状は Modal の開閉のみ）は [../components.js](../components.js) にあり、**light版と共用**です。配色・寸法を持たずデータ属性とDOM操作だけで動くため、ダーク版のページからもそのまま読み込めます。ただし見た目（`.modal` 系クラス）を定義する `components.css` はダーク版では未整備なので、使う場合はCSSを先に用意する必要があります（[8. 既知の未定義領域](#8-既知の未定義領域サンプルに含まれないもの) 参照）。

```html
<script src="design-system/components.js" defer></script>
```

---

## 1. カラートークン

`:root` で定義されているCSSカスタムプロパティ。色は必ずこの変数経由で参照し、ハードコードしない。

| 変数名 | 値 | 用途 |
|---|---|---|
| `--bg` | `#0a0e17` | ページ背景（基調） |
| `--bg2` | `#0e1420` | セクション背景（濃淡差をつける2色目。ゼブラ配置に使用） |
| `--panel` | `#121a2b` | カード・チップ・statなどの面（パネル）背景 |
| `--line` | `#1f2b42` | ボーダー・区切り線・グリッド線 |
| `--txt` | `#e8edf6` | 基本テキスト色 |
| `--muted` | `#9aa9c4` | 補助テキスト（本文説明・キャプション） |
| `--accent` | `#38e1c0` | アクセント1（ティール系）。CTA・ロゴドット・eyebrow・数値強調 |
| `--accent2` | `#5b8cff` | アクセント2（ブルー系）。グラデーション終端に使用 |
| `--glow` | `rgba(56,225,192,.35)` | アクセントのグロー（box-shadow・背景放射光） |

### グラデーション
- **テキスト/ボタン用グラデーション**: `linear-gradient(120deg, var(--accent), var(--accent2))`
  - `.grad`（テキストにグラデーションをかける、`background-clip:text`）
  - `.btn-primary`（プライマリボタン背景）
- **CTAセクション背景**: `linear-gradient(120deg, rgba(56,225,192,.12), rgba(91,140,255,.12))`
- **カード背景**: `linear-gradient(180deg, var(--panel), var(--bg2))`

### 背景の装飾（放射グラデーション）
- Hero背景: `radial-gradient(600px 340px at 78% 8%, rgba(91,140,255,.18), transparent 60%)` と `radial-gradient(560px 320px at 8% 88%, rgba(56,225,192,.14), transparent 60%)` を重ねる
- グリッド背景（`.grid-bg`）: `--line` 色の1pxライン格子（52px間隔）を `opacity:.25` + 放射マスクでフェードアウト

---

## 2. タイポグラフィ

- **フォントファミリー**: `"Helvetica Neue","Hiragino Sans","Noto Sans JP",-apple-system,sans-serif`
- **基本行間**: `line-height:1.75`（body）
- **見出し行間**: `1.12`（h1）
- **文字間隔**: 見出しは負のletter-spacing（`-.5px`〜`-.3px`）で締める。eyebrowラベルは`letter-spacing:2px`で広げる。

| 要素 | サイズ | ウェイト | 備考 |
|---|---|---|---|
| `h1`（ヒーロー見出し） | `clamp(34px, 5.6vw, 62px)` | 800 | `letter-spacing:-.5px` |
| `.s-title`（セクション見出し） | `clamp(26px, 3.4vw, 38px)` | 800 | `letter-spacing:-.3px` |
| `.lede`（リード文） | `clamp(15px, 1.8vw, 19px)` | 400 | color: `--muted` |
| `.eyebrow`（ラベル） | `13px` | 700 | `uppercase`, `letter-spacing:2px`, color: `--accent` |
| `.s-sub`（セクション補足） | 標準 | 400 | color: `--muted` |
| `.card h3` | `20px` | 800 | |
| `.card p` | `15px` | 400 | color: `--muted` |
| `.feat h4` | `17px` | 800 | |
| `.feat p` | `14px` | 400 | color: `--muted` |
| `.stat b`（統計数値） | `26px` | 800 | color: `--accent` |
| `.stat span` | `13px` | 400 | color: `--muted` |
| `.chip` | `14px` | 600 | `.chip small`は`--muted`・400 |
| `.nav-links a` | `14px` | 400 | color: `--muted` |
| `.btn` | `14px` | 700 | |

すべての見出しにグラデーション文字（`.grad`）を部分適用できる（h1内の強調語など）。

---

## 3. スペーシング & レイアウト

- **コンテンツ幅**: `.wrap { max-width:1120px; margin:0 auto; padding:0 24px }`
- **セクション垂直パディング**: `section { padding:96px 0 }`
- **ヒーロー**: `padding:120px 0 96px`
- **カードグリッド間隔**: `gap:22px`
- **統計(stats)グリッド間隔**: `gap:18px`
- **CTA内側パディング**: `56px`
- **ボタン内側パディング**: `11px 22px`

### グリッドパターン
- `.stats`: `repeat(3, 1fr)`, max-width 760px
- `.cards`: 標準は `repeat(2, 1fr)`。3カードセクション（取り組み領域）では `repeat(3, 1fr)` に上書き
- `.feat`: `repeat(3, 1fr)`

### ブレークポイント
- `@media (max-width:820px)` の単一ブレークポイントのみ:
  - `.nav-links` を非表示（ハンバーガー等は未実装）
  - `.stats` / `.cards` / `.feat` を `1fr`（縦積み）に変更

---

## 4. 角丸 (Radius) スケール

| 用途 | 値 |
|---|---|
| ボタン | `10px` |
| stat / chip | `10px`〜`14px` |
| feature card (`.f`) | `16px` |
| card / cta アイコン | `12px` |
| card (`.card`) | `18px` |
| CTAセクション | `24px` |
| ロゴドット・pulse・バッジ | `50%` / `999px`（完全な円/ピル） |

---

## 5. シャドウ & エフェクト

- **アクセントグロー**: `box-shadow:0 0 14px var(--glow)`（ロゴドット）、`0 0 10px var(--accent)`（pulseドット）
- **プライマリボタンの浮遊感**: `box-shadow:0 6px 24px var(--glow)`
- **ホバー時の浮き上がり**:
  - `.btn-primary:hover { transform:translateY(-2px) }`
  - `.card:hover { transform:translateY(-4px); border-color:var(--accent) }`
- **backdrop blur**: `nav { background:rgba(10,14,23,.72); backdrop-filter:blur(12px) }`
- **トランジション速度**: ボタン `.2s`、カード `.25s`
- **アニメーション**: `@keyframes pulse`（opacity 1→.35、1.8s infinite）— ステータスバッジの生存感を出す用途

---

## 6. コンポーネント仕様

### 6.1 Navigation (`nav`)
- position:sticky, top:0, z-index:50
- 半透明背景 + blur、下ボーダーのみ（`--line`）
- 高さ66px、左ロゴ／中央リンク／右CTAボタンの3分割
- ロゴ: アクセントカラーのドット + テキスト（部門名の「部」だけmutedカラー・normalウェイトで軽く）

### 6.2 Buttons
- `.btn`: 基本形（padding, radius, weight, transition）
- `.btn-primary`: グラデーション背景・濃色テキスト(`#04121a`)・グロー影。ホバーで上に2px移動
- `.btn-ghost`: 透明背景・`--line`ボーダー。ホバーで`--accent`ボーダーに変化

### 6.3 Badge（ステータスバッジ）
- ピル型（`border-radius:999px`）、`--panel`背景+`--line`ボーダー
- 左に鼓動する小ドット（`.pulse`、アニメーション付き）
- テキスト色は`--accent`

### 6.4 Stat（統計カード）
- `--panel`背景 + `--line`ボーダー、radius 14px、padding 22px
- 数値（`b`）: 26px/800/accent色、ラベル（`span`）: 13px/muted

### 6.5 Card（取り組み領域カード等）
- 縦グラデーション背景（panel→bg2）、`--line`ボーダー、radius 18px、padding 32px
- 上部にアイコンバッジ（46×46、radius 12px、accentの薄い背景10%、`--line`ボーダー）
- タイトル→説明文→タグ群（`.tag`）の縦構成
- ホバーで4px浮き上がり + ボーダーがaccent化

### 6.6 Tag / Chip
- `.tag`: インラインの小ラベル。`--accent`テキスト、`--line`ボーダー、radius 6px、小さめpadding。カードのメタ情報に使用
- `.chip`: より大きめのピル状ボックス。`--panel`背景、`--line`ボーダー、radius 10px。技術スタック表示に使用。`small`子要素で補足テキストをmuted化

### 6.7 Feature item (`.f` / `.feat`)
- `--panel`背景、`--line`ボーダー、radius 16px、padding 28px
- 上部に採番ラベル（`.num`: 13px/700/accent2色、letter-spacing 1px）— 「01」「STEP 1」のように連番・ステップ表現の両方に流用
- その下に見出し(h4)と説明(p)

### 6.8 CTA セクション
- 2色の薄いグラデーション背景、`--line`ボーダー、radius 24px、padding 56px、中央揃え
- 内部に見出し・補足文・ボタン列（`.hero-cta`を中央寄せで再利用）

### 6.9 Footer
- 上ボーダーのみ（`--line`）、padding 44px 0
- 左にロゴ（小さめ）、右にコピーライト。`space-between`でレスポンシブに折り返し

### 6.10 Section header pattern（共通見出しパターン）
全セクション共通で以下の3点セット構成:
1. `.eyebrow` — 小さいラベル（英語・uppercase・accent色）
2. `.s-title` — セクションの主見出し
3. `.s-sub` — 補足説明（muted色、max-width制限で読みやすい行長に）

### 6.11 セクション背景のゼブラパターン
奇数セクション（mission, why, flow）は `background:var(--bg2)` を明示指定し、偶数セクション（hero, service, stack, contact）は`--bg`のまま。単調な同色の連続を避けるための交互配色ルール。

---

## 7. アイコン運用

絵文字をアイコンとして直接使用（外部アイコンライブラリ非依存）:
- 🛠️ AI支援型開発 / ⚡ AI自律型開発 / 🤝 AI人材支援

軽量な単一HTMLファイル構成を維持する方針と一致する（[CLAUDE.md](../../CLAUDE.md)参照）。

---

## 8. 既知の未定義領域（サンプルに含まれないもの）

デザインシステムとして今後定義が必要な可能性がある要素（サンプルHTMLには存在しない）:
- `components.css` 全体 — ダーク版は未整備。ライト版の [components.css](../light/components.css) 相当をトークン差し替えで用意する想定
- Modal（`.modal` 系クラス）— 挙動は共用の [../components.js](../components.js) で動くが、ダーク版のCSSが無い。ライト版 design-system.md「6.13 Modal」を参照し、`--overlay` / `--shadow-modal` / `--modal-max-width` / `--modal-max-height` のトークン追加から始める
- モバイル用ナビゲーション（ハンバーガーメニュー等）— 現状820px以下で単純非表示
- フォームコンポーネント（input, textarea, select等）
- エラー/成功などのステータスカラー
