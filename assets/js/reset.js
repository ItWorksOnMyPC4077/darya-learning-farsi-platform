(() => {
  const resetDarya = () => {
    Object.keys(localStorage).filter(key => key.startsWith('darya-')).forEach(key => localStorage.removeItem(key));
    sessionStorage.removeItem('darya-placement-result');
    const toast = document.createElement('div');
    toast.textContent = 'اطلاعات آزمایشی داریا پاک شد؛ سایت ریست می‌شود.';
    toast.style.cssText = 'position:fixed;right:20px;bottom:22px;z-index:9999;background:#101a3c;color:#fff;padding:13px 17px;border-radius:12px;font:600 12px Estedad,Arial,sans-serif;box-shadow:0 12px 30px #0004';
    document.body.appendChild(toast);
    setTimeout(() => { location.href = location.pathname.includes('/pages/') ? '../index.html' : 'index.html'; }, 650);
  };
  window.addEventListener('keydown', event => {
    const tag = document.activeElement?.tagName;
    if (event.key.toLowerCase() === 'n' && !event.ctrlKey && !event.metaKey && !event.altKey && !['INPUT','TEXTAREA','SELECT'].includes(tag)) {
      event.preventDefault();
      resetDarya();
    }
  });
})();
