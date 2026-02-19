/* ═══════════════════════════════════════════════
   JOURNEY — Scroll, Chapter Detection, Reveals
   Rewritten: single init, no double-registration
═══════════════════════════════════════════════ */

const Journey = (() => {

  let chapterEls = [];
  let activeChapter = -1;
  let scrollListenerAdded = false;

  // Called once, after entry is dismissed
  function init() {
    // Prevent double-init if called more than once
    if (scrollListenerAdded) {
      // Still re-reveal in case DOM changed
      _revealAll();
      return;
    }
    scrollListenerAdded = true;

    chapterEls = Array.from(document.querySelectorAll('.chapter'));

    // Reveal elements — simple timeout stagger, no IntersectionObserver
    _revealAll();

    // Scroll tracking
    window.addEventListener('scroll', _onScroll, { passive: true });

    // Run once immediately to set initial state
    _onScroll();
  }

  function _revealAll() {
    document.querySelectorAll('.reveal').forEach((el) => {
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => el.classList.add('visible'), delay + 80);
    });
  }

  function _onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress  = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

    if (window.Scene) Scene.setScrollProgress(progress);
    _detectChapter(scrollTop);
  }

  function _detectChapter(scrollTop) {
    let found = 0;
    chapterEls.forEach((el, i) => {
      if (scrollTop + 10 >= el.offsetTop) found = i;
    });

    if (found !== activeChapter) {
      activeChapter = found;
      if (window.HUD) HUD.setChapter(found);
    }
  }

  function scrollToChapter(index) {
    const el = chapterEls[index];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return { init, scrollToChapter };

})();

window.Journey = Journey;