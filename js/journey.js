/* ═══════════════════════════════════════════════
   JOURNEY — Scroll Driver, Chapter Detection, Reveals
═══════════════════════════════════════════════ */

const Journey = (() => {

  let chapterEls = [];
  let activeChapter = -1;
  let ticking = false;

  function init() {
    chapterEls = Array.from(document.querySelectorAll('.chapter'));
    _setupReveal();
    // Small delay to let browser compute layout
    setTimeout(() => {
      _onScroll();
      _forceVisibleInView();
    }, 100);
    window.addEventListener('scroll', _handleScroll, { passive: true });
  }

  // Force any elements already in view to reveal immediately
  function _forceVisibleInView() {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      }
    });
  }

  // ── Scroll Handler ────────────────────────────
  function _handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        _onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  function _onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress  = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

    // Tell the 3D scene how far we've scrolled
    Scene.setScrollProgress(progress);

    // Detect current chapter
    _detectChapter(scrollTop);

    // Trigger reveals
    _checkReveals();
  }

  // ── Chapter Detection ─────────────────────────
  function _detectChapter(scrollTop) {
    const mid = scrollTop + window.innerHeight * 0.45;

    let found = 0;
    chapterEls.forEach((el, i) => {
      const top    = el.offsetTop;
      const bottom = top + el.offsetHeight;
      if (mid >= top && mid < bottom) found = i;
    });

    if (found !== activeChapter) {
      activeChapter = found;
      HUD.setChapter(found);
      _onChapterEnter(found);
    }
  }

  function _onChapterEnter(index) {
    // Could trigger chapter-specific effects here
    const ch = CONFIG.chapters[index];
    if (!ch) return;
    // e.g. animate chapter number
  }

  // ── Scroll-To ─────────────────────────────────
  function scrollToChapter(index) {
    const el = chapterEls[index];
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── Reveal System ─────────────────────────────
  function _setupReveal() {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Small delay for visual polish
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, parseInt(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach(el => observer.observe(el));
  }

  function _checkReveals() {
    // Fallback for browsers without IntersectionObserver
    if (typeof IntersectionObserver !== 'undefined') return;
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.88) {
        el.classList.add('visible');
      }
    });
  }

  return { init, scrollToChapter, _forceVisibleInView };

})();

window.Journey = Journey;