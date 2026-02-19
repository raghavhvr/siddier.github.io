/* ═══════════════════════════════════════════════
   HUD — Cockpit Overlay, Nav, Progress, Chapter Title
═══════════════════════════════════════════════ */

const HUD = (() => {

  let currentChapter = 0;

  function init() {
    _buildNav();
    _buildProgress();
    _buildBottomHUD();
  }

  // ── Top Navigation ────────────────────────────
  function _buildNav() {
    const nav = document.getElementById('hud-nav');
    if (!nav) return;

    const chapters = CONFIG.chapters;
    nav.innerHTML = '';

    chapters.forEach((ch, i) => {
      const item = document.createElement('div');
      item.className = 'hud-nav-item';
      item.setAttribute('data-chapter', i);
      item.textContent = ch.label;
      item.addEventListener('click', () => Journey.scrollToChapter(i));
      nav.appendChild(item);
    });
  }

  // ── Side Progress Nodes ───────────────────────
  function _buildProgress() {
    const container = document.getElementById('journey-progress');
    if (!container) return;

    container.innerHTML = '';
    CONFIG.chapters.forEach((ch, i) => {
      // Line before each node (except first)
      if (i > 0) {
        const line = document.createElement('div');
        line.className = 'progress-line';
        container.appendChild(line);
      }

      const node = document.createElement('div');
      node.className = 'progress-node';
      node.setAttribute('data-chapter', i);
      node.setAttribute('data-label', ch.label);
      node.style.setProperty('--chapter-color', ch.color);
      node.addEventListener('click', () => Journey.scrollToChapter(i));
      container.appendChild(node);
    });
  }

  // ── Bottom Bar ────────────────────────────────
  function _buildBottomHUD() {
    const bottom = document.getElementById('hud-bottom');
    if (!bottom) return;
    bottom.innerHTML = `
      <span id="chapter-title-hud">${CONFIG.chapters[0].label} · ${CONFIG.chapters[0].planet}</span>
      <span id="hud-coords">LAT 17°22'N · LON 78°28'E</span>
    `;
  }

  // ── Update Active State ───────────────────────
  function setChapter(index) {
    if (currentChapter === index) return;
    currentChapter = index;

    const ch = CONFIG.chapters[index];
    if (!ch) return;

    // Nav items
    document.querySelectorAll('.hud-nav-item').forEach((el, i) => {
      el.classList.toggle('active', i === index);
    });

    // Progress nodes
    document.querySelectorAll('.progress-node').forEach((el, i) => {
      el.classList.toggle('active',  i === index);
      el.classList.toggle('visited', i < index);
      if (i === index) {
        el.style.setProperty('--chapter-color', ch.color);
      }
    });

    // Chapter title
    const titleEl = document.getElementById('chapter-title-hud');
    if (titleEl) {
      titleEl.style.opacity = '0';
      setTimeout(() => {
        titleEl.textContent = `${ch.label} · ${ch.planet}`;
        titleEl.style.opacity = '1';
      }, 300);
    }

    // Update CSS chapter color on chapters
    document.querySelectorAll('.chapter').forEach((el, i) => {
      el.style.setProperty('--chapter-color', CONFIG.chapters[i]?.color || 'var(--gold)');
    });
  }

  return { init, setChapter };

})();

window.HUD = HUD;
