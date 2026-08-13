/*
  AI Innovation 部 — Components (behavior)

  CSS だけで完結しない挙動をここに集約する。現状の対象は「6.13 Modal」と「6.15 Reveal」。

  **light / dark 共用。** 配色・寸法は一切持たず、データ属性とDOM操作だけで動くため、
  どちらのテーマからでも同じファイルを読み込む。見た目（.modal 系クラス）は各テーマの
  components.css 側で定義する（dark は components.css 自体が未整備）。

  使い方（</body> の直前で読み込む。テーマのCSSより後であれば順序は問わない）:
    <script src="design-system/components.js" defer></script>

  マークアップ:
    <!-- 開くきっかけ。href はフォールバック先（＝モーダルで見せるページ） -->
    <a href="SDD-Kit/index.html" class="btn btn-wo" data-modal-open="sddkit-modal">SDD-Kitを詳しく見る</a>

    <dialog id="sddkit-modal" class="modal" aria-labelledby="sddkit-modal-title">
      <div class="modal-in">
        <div class="modal-head">
          <div class="modal-title" id="sddkit-modal-title">SDD-Kit</div>
          <div class="modal-actions">
            <a class="modal-link" href="SDD-Kit/index.html" target="_blank" rel="noopener">新しいタブで開く ↗</a>
            <button type="button" class="modal-close" data-modal-close autofocus aria-label="閉じる">✕</button>
          </div>
        </div>
        <div class="modal-body">
          <iframe class="modal-frame" data-src="SDD-Kit/index.html" title="SDD-Kit の詳細"></iframe>
        </div>
      </div>
    </dialog>

  閉じ方: ✕ ボタン／背景クリック／Esc キー（Esc は <dialog> の標準挙動）。
  JavaScript が無効、または <dialog> 非対応のブラウザでは何もしないので、
  きっかけの <a href> がそのまま効いて同じページへ遷移する。
*/
(function () {
  'use strict';

  // <dialog> 非対応ならリンク本来の遷移に任せる
  if (typeof HTMLDialogElement === 'undefined' ||
      typeof HTMLDialogElement.prototype.showModal !== 'function') return;

  document.addEventListener('click', function (ev) {
    if (!(ev.target instanceof Element)) return;

    // 開く
    var opener = ev.target.closest('[data-modal-open]');
    if (opener) {
      var dialog = document.getElementById(opener.getAttribute('data-modal-open'));
      if (!dialog) return; // 対象が無ければリンクの遷移に任せる
      ev.preventDefault();
      // iframe は初回オープン時にだけ読み込む（ページ表示時のコストを避ける）
      var frame = dialog.querySelector('iframe[data-src]');
      if (frame && !frame.getAttribute('src')) frame.setAttribute('src', frame.getAttribute('data-src'));
      dialog.showModal();
      return;
    }

    // ✕ ボタンで閉じる
    var closer = ev.target.closest('[data-modal-close]');
    if (closer) {
      var owner = closer.closest('dialog');
      if (owner) owner.close();
      return;
    }

    // 背景クリックで閉じる。中身は .modal-in が全面を覆っているため、
    // <dialog> 自身がクリック対象になるのは ::backdrop 上のときだけ
    if (ev.target.tagName === 'DIALOG' && ev.target.open) ev.target.close();
  });
})();

/*
  6.15 Reveal — スクロールで要素をフェードインさせる

  マークアップ:
    <h2 class="s-title" data-reveal>…</h2>       <!-- 遅延なし -->
    <p class="s-sub" data-reveal="2">…</p>       <!-- 1〜4 で段差をつける -->

  見た目（初期状態・遷移・遅延）は各テーマの components.css が持ち、ここでは
  data-reveal を持つ要素が画面に入ったら .is-visible を付けるだけ。
  初期状態のCSSは <html class="js-reveal"> に限定してあるため、JSが動かない環境や
  prefers-reduced-motion の環境では要素は最初から見えたままになる。
*/
(function () {
  'use strict';

  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  document.documentElement.classList.add('js-reveal');

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target); // 一度出したら戻さない
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

  Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
})();
