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

    <!-- iframe の src は data-src に置く。開いたときに毎回 src へ入れ直されるので、
         ページ表示時には読み込まれず、かつ開くたびに初期状態から表示される -->


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
      // iframe はオープン時に読み込む（ページ表示時のコストを避ける）。
      // 2回目以降も毎回 src を入れ直して読み込み直す。閉じたときの状態
      // （スクロール位置、中のページで閉じたバナー等）を持ち越さず、
      // 開くたびに必ず初期状態から見せるため
      var frame = dialog.querySelector('iframe[data-src]');
      if (frame) frame.setAttribute('src', frame.getAttribute('data-src'));
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
  6.16 Disclosure — ページ内リンクの飛び先が閉じた <details> なら開いてから移動する

  開閉そのものは <details>/<summary> の標準挙動なのでJSは不要。ここが面倒を見るのは
  「目次のリンクを押したら、その分類が閉じていても開いた状態で着地する」ケースだけ。
  リンク先が <details> 自身でも、その中の要素でも動く（祖先をすべて開く）。
  読み込み時とハッシュ変更時にも同じ処理を通すため、URL直打ちや戻る操作でも開く。
*/
(function () {
  'use strict';

  function openAncestors(el) {
    for (var node = el; node; node = node.parentElement) {
      if (node.tagName === 'DETAILS') node.open = true;
    }
  }

  function openByHash(hash) {
    if (!hash || hash.length < 2) return;
    var target = null;
    try { target = document.getElementById(decodeURIComponent(hash.slice(1))); } catch (e) { return; }
    if (target) openAncestors(target);
  }

  document.addEventListener('click', function (ev) {
    if (!(ev.target instanceof Element)) return;
    var link = ev.target.closest('a[href^="#"]');
    if (!link) return;
    // 既定のスクロールより先に開く。開いた後の位置へブラウザが飛んでくれる
    openByHash(link.getAttribute('href'));
  });

  window.addEventListener('hashchange', function () { openByHash(location.hash); });
  openByHash(location.hash);

  /*
    一括開閉ボタン:
      <button class="cat-toggle" data-details-toggle="<器のid>"
              data-label-open="全て開く" data-label-close="全て閉じる">全て閉じる</button>
    器の中の <details> をまとめて開閉する。1つでも開いていれば「閉じる」、
    全部閉じていれば「開く」に切り替わる。個別の開閉にも toggle イベントで追従する。
  */
  function detailsIn(button) {
    var box = document.getElementById(button.getAttribute('data-details-toggle'));
    return box ? box.querySelectorAll('details') : [];
  }

  function syncLabel(button, items) {
    var anyOpen = Array.prototype.some.call(items, function (d) { return d.open; });
    button.textContent = anyOpen
      ? button.getAttribute('data-label-close')
      : button.getAttribute('data-label-open');
    button.setAttribute('aria-expanded', String(anyOpen));
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-details-toggle]'), function (button) {
    var items = detailsIn(button);
    if (!items.length) return;

    button.addEventListener('click', function () {
      var anyOpen = Array.prototype.some.call(items, function (d) { return d.open; });
      Array.prototype.forEach.call(items, function (d) { d.open = !anyOpen; });
      syncLabel(button, items);
    });

    Array.prototype.forEach.call(items, function (d) {
      d.addEventListener('toggle', function () { syncLabel(button, items); });
    });

    syncLabel(button, items);
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
