(function () {
  const yearEl = document.getElementById("year");
  const header = document.querySelector(".site-header");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  window.addEventListener(
    "scroll",
    () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 8);
    },
    { passive: true }
  );

  const scriptEl = document.querySelector('script[src*="main.js"]');
  const scriptSrc = scriptEl?.getAttribute("src") || "js/main.js";
  const assetBase = scriptSrc.includes("../") ? "../" : "";
  const qrSrc = `${assetBase}images/wechat-qr.jpg`;

  const modal = document.createElement("div");
  modal.className = "wechat-modal";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="wechat-modal-backdrop" data-wechat-close></div>
    <div class="wechat-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="wechat-modal-title">
      <button type="button" class="wechat-modal-close" data-wechat-close aria-label="关闭">×</button>
      <p class="wechat-modal-title" id="wechat-modal-title">微信扫码添加</p>
      <p class="wechat-modal-id">微信号：aifuwu020</p>
      <img class="wechat-modal-qr" src="${qrSrc}" alt="微信二维码 aifuwu020" width="280" height="280" />
      <p class="wechat-modal-tip">长按或扫码添加好友</p>
    </div>
  `;
  document.body.appendChild(modal);

  function openWechatModal() {
    modal.hidden = false;
    document.body.classList.add("wechat-modal-open");
  }

  function closeWechatModal() {
    modal.hidden = true;
    document.body.classList.remove("wechat-modal-open");
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-wechat]");
    if (trigger) {
      event.preventDefault();
      openWechatModal();
      return;
    }
    if (event.target.closest("[data-wechat-close]")) {
      closeWechatModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeWechatModal();
    }
  });
})();
