// Ejecutar en client side
function initGlobalOverlayScrollbar() {
  const scroller = document.scrollingElement || document.documentElement;
  const overlay = document.createElement('div');
  overlay.className = 'overlay-scrollbar';
  const thumb = document.createElement('div');
  thumb.className = 'overlay-thumb';
  overlay.appendChild(thumb);
  document.body.appendChild(overlay);

  let hideTimer = null;

  function update() {
    const scrollTop = scroller.scrollTop;
    const clientH = window.innerHeight;
    const scrollH = scroller.scrollHeight;
    if (scrollH <= clientH) {
      thumb.style.opacity = '0';
      return;
    }
    const ratio = clientH / scrollH;
    const h = Math.max(ratio * clientH, 20);
    const maxTop = clientH - h;
    const top = (scrollTop / (scrollH - clientH)) * maxTop || 0;
    thumb.style.height = h + 'px';
    thumb.style.transform = `translateY(${top}px)`;
  }

  function show() {
    thumb.style.opacity = '1';
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => { thumb.style.opacity = '0'; }, 900);
  }

  window.addEventListener('scroll', () => { update(); show(); }, { passive: true });
  window.addEventListener('resize', update);
  update();
}
document.addEventListener('DOMContentLoaded', initGlobalOverlayScrollbar);
