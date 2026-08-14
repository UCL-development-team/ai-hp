/*
  AI Innovation 部 — Components (behavior)

  CSS だけで完結しない挙動をここに集約する。現状の対象は「6.13 Modal」のみ。

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
