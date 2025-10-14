
  (function () {
    var redirectUrl = '/oauth2/login'; // 依需要修改

    function isAnonymous() {
      try {
        return !drupalSettings || !drupalSettings.user || drupalSettings.user.member_id === "anonymous";
      } catch (e) {
        return true;
      }
    }


    function shouldBlock() {
      return isAnonymous();
    }

    function showModal(options) {
      var message = options.message || '您尚未登入。';
      var ctaText = options.ctaText || '登入';
      var ctaHref = options.ctaHref || '/';

      var overlay = document.createElement('div');
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.background = 'rgba(0,0,0,0.5)';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.zIndex = '9999';

      var modal = document.createElement('div');
      modal.style.background = '#fff';
      modal.style.maxWidth = '420px';
      modal.style.width = '90%';
      modal.style.borderRadius = '8px';
      modal.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
      modal.style.overflow = 'hidden';
      modal.style.fontFamily = 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif';

      var body = document.createElement('div');
      body.style.padding = '20px';
      body.innerHTML = '<div style="font-size:16px; color:#111; line-height:1.45;">' + message + '</div>';

      var footer = document.createElement('div');
      footer.style.display = 'flex';
      footer.style.gap = '10px';
      footer.style.justifyContent = 'flex-end';
      footer.style.padding = '16px 20px';
      footer.style.background = '#f6f6f6';

      var closeBtn = document.createElement('button');
      closeBtn.type = 'button';
      closeBtn.textContent = '關閉';
      closeBtn.style.border = '1px solid #ccc';
      closeBtn.style.background = '#fff';
      closeBtn.style.color = '#333';
      closeBtn.style.padding = '8px 12px';
      closeBtn.style.borderRadius = '6px';
      closeBtn.style.cursor = 'pointer';

      var ctaBtn = document.createElement('a');
      ctaBtn.href = ctaHref;
      ctaBtn.textContent = ctaText;
      ctaBtn.style.display = 'inline-block';
      ctaBtn.style.textDecoration = 'none';
      ctaBtn.style.background = '#0d6efd';
      ctaBtn.style.color = '#fff';
      ctaBtn.style.padding = '8px 12px';
      ctaBtn.style.borderRadius = '6px';
      ctaBtn.style.cursor = 'pointer';

      function removeModal() {
        if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
        document.removeEventListener('keydown', onKeyDown);
      }

      function onKeyDown(e) {
        if (e.key === 'Escape') removeModal();
      }

      closeBtn.addEventListener('click', removeModal);
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) removeModal();
      });
      document.addEventListener('keydown', onKeyDown);

      footer.appendChild(closeBtn);
      footer.appendChild(ctaBtn);
      modal.appendChild(body);
      modal.appendChild(footer);
      overlay.appendChild(modal);
      document.body.appendChild(overlay);
      closeBtn.focus();
    }

    function onClickHandler(e) {
      if (!shouldBlock()) return;

      e.preventDefault();
      e.stopPropagation();

      showModal({
        message: '您尚未登入。請先登入以繼續。',
        ctaText: '登入',
        ctaHref: redirectUrl
      });
    }

    function attach() {
      var trigger = document.getElementById('free-apply-button');
      if (!trigger) return;
      if (trigger.dataset.expireHandlerAttached === '1') return;
      trigger.dataset.expireHandlerAttached = '1';
      trigger.addEventListener('click', onClickHandler);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', attach);
    } else {
      attach();
    }
  })();
