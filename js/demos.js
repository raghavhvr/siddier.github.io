/* ═══════════════════════════════════════════════
   DEMOS — Interactive ML Projects
   Rewritten: wireEvents() separate from compute()
   so events bind on DOM ready, values compute later
═══════════════════════════════════════════════ */

const Demos = (() => {

  let sqlTyping = null;

  // ── Called immediately after DOM build ────────
  // Binds all event listeners
  function wireEvents() {
    // ROAS sliders
    ['slider-search','slider-social','slider-email'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', _updateROAS);
    });

    // SQL query buttons — use event delegation on the container
    // so it works even if buttons are added/removed
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.query-btn');
      if (!btn) return;
      const index = parseInt(btn.dataset.index || 0);
      document.querySelectorAll('.query-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      _runQuery(index);
    });

    // CLV inputs
    ['clv-purchases','clv-aov','clv-recency','clv-tenure'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', _updateCLV);
    });
  }

  // ── Called after entry dismissed & DOM visible ─
  // Populates initial computed values + auto-runs SQL
  function compute() {
    _updateROAS();
    _updateCLV();
    // Auto-run first SQL query after short delay
    setTimeout(() => _runQuery(0), 400);
  }

  // Legacy init() keeps demos.js backward-compatible
  function init() {
    wireEvents();
    compute();
  }

  // ─────────────────────────────────────────────
  // ROAS UPLIFT
  // ─────────────────────────────────────────────
  function _updateROAS() {
    const search = parseInt(document.getElementById('slider-search')?.value ?? 42);
    const social = parseInt(document.getElementById('slider-social')?.value ?? 28);
    const email  = parseInt(document.getElementById('slider-email')?.value  ?? 6) / 10;

    const sv = document.getElementById('slider-search-val');
    const sv2 = document.getElementById('slider-social-val');
    const ev = document.getElementById('slider-email-val');
    if (sv)  sv.textContent  = `$${search}K`;
    if (sv2) sv2.textContent = `$${social}K`;
    if (ev)  ev.textContent  = email.toFixed(1);

    const BASE   = 2.67;
    const budget = search + social;
    const dimRet = budget / 700;
    const synergy = (search > 50 && social > 40) ? 0.28 : 0;
    const roas = Math.max(0.8, Math.min(8,
      BASE + (search/100)*1.75*0.42 + (social/80)*0.92*0.30 + email*0.23 - dimRet + synergy
    ));
    const delta = ((roas - BASE) / BASE * 100).toFixed(0);

    const re = document.getElementById('roas-value');
    const de = document.getElementById('roas-delta');
    if (re) re.textContent = roas.toFixed(2) + 'x';
    if (de) {
      de.textContent = (delta >= 0 ? '+' : '') + delta + '%';
      de.style.color = delta >= 0 ? '#4ade80' : '#f87171';
    }
  }

  // ─────────────────────────────────────────────
  // NL → SQL AGENT
  // ─────────────────────────────────────────────
  function _runQuery(index) {
    const output = document.getElementById('sql-output-text');
    const cursor = document.getElementById('sql-cursor');
    if (!output) return;

    const queries = CONFIG.sqlQueries;
    if (!queries[index]) return;

    output.textContent = '';
    if (cursor) cursor.style.display = 'inline-block';
    if (sqlTyping) clearInterval(sqlTyping);

    const text = queries[index].r;
    let i = 0;
    sqlTyping = setInterval(() => {
      output.textContent += text[i];
      i++;
      const terminal = output.closest('.terminal');
      if (terminal) terminal.scrollTop = terminal.scrollHeight;
      if (i >= text.length) {
        clearInterval(sqlTyping);
        if (cursor) cursor.style.display = 'none';
      }
    }, 10);
  }

  // ─────────────────────────────────────────────
  // CLV PREDICTOR
  // ─────────────────────────────────────────────
  function _updateCLV() {
    const purchases = Math.max(1,  parseInt(document.getElementById('clv-purchases')?.value) || 8);
    const aov       = Math.max(10, parseInt(document.getElementById('clv-aov')?.value)       || 320);
    const recency   = Math.max(1,  parseInt(document.getElementById('clv-recency')?.value)   || 14);
    const tenure    = Math.max(1,  parseInt(document.getElementById('clv-tenure')?.value)    || 18);

    const freq        = purchases / Math.max(tenure / 3, 1);
    const recencyMult = Math.max(0.15, 1 - (recency / 365));
    const tenureMult  = Math.min(1.45, 1 + (tenure / 36));
    const clv         = Math.round(freq * recencyMult * tenureMult * 36 * aov);

    const valEl = document.getElementById('clv-value');
    const segEl = document.getElementById('clv-segment');
    if (valEl) valEl.textContent = '$' + clv.toLocaleString();
    if (segEl) {
      if      (clv > 25000) { segEl.textContent = '◆ PLATINUM';    segEl.style.color = '#d4a843'; }
      else if (clv > 10000) { segEl.textContent = '● HIGH VALUE';  segEl.style.color = '#38c8e8'; }
      else if (clv > 4000)  { segEl.textContent = '● GROWING';     segEl.style.color = '#4ade80'; }
      else                  { segEl.textContent = '▽ AT RISK';     segEl.style.color = '#f87171'; }
    }
  }

  return { init, wireEvents, compute };

})();

window.Demos = Demos;