/* ═══════════════════════════════════════════════
   DEMOS — Interactive ML Project Logic
   1. ROAS Uplift (sliders)
   2. NL → SQL Agent (terminal typewriter)
   3. CLV Predictor (number inputs)
═══════════════════════════════════════════════ */

const Demos = (() => {

  // ─────────────────────────────────────────────
  // 1. ROAS UPLIFT MODELLER
  // ─────────────────────────────────────────────
  function initROAS() {
    const searchEl = document.getElementById('slider-search');
    const socialEl = document.getElementById('slider-social');
    const emailEl  = document.getElementById('slider-email');
    if (!searchEl) return;

    [searchEl, socialEl, emailEl].forEach(el => {
      el.addEventListener('input', updateROAS);
    });
    updateROAS();
  }

  function updateROAS() {
    const search = parseInt(document.getElementById('slider-search')?.value || 42);
    const social = parseInt(document.getElementById('slider-social')?.value || 28);
    const email  = parseInt(document.getElementById('slider-email')?.value  || 6) / 10;

    const searchV = document.getElementById('slider-search-val');
    const socialV = document.getElementById('slider-social-val');
    const emailV  = document.getElementById('slider-email-val');
    if (searchV) searchV.textContent = `$${search}K`;
    if (socialV) socialV.textContent = `$${social}K`;
    if (emailV)  emailV.textContent  = email.toFixed(1);

    // Simplified BG-NBD-inspired uplift model
    const BASE   = 2.67;
    const budget = search + social;
    const dimRet = budget / 700;           // diminishing returns
    const synergy = (search > 50 && social > 40) ? 0.28 : 0;

    const roas = BASE
      + (search / 100) * 1.75 * 0.42
      + (social / 80)  * 0.92 * 0.30
      + email * 0.23
      - dimRet
      + synergy;

    const clampedROAS = Math.max(0.8, Math.min(8, roas));
    const delta = ((clampedROAS - BASE) / BASE * 100).toFixed(0);

    const roasEl  = document.getElementById('roas-value');
    const deltaEl = document.getElementById('roas-delta');
    if (roasEl)  roasEl.textContent  = clampedROAS.toFixed(2) + 'x';
    if (deltaEl) {
      deltaEl.textContent = (delta >= 0 ? '+' : '') + delta + '%';
      deltaEl.style.color = delta >= 0 ? '#4ade80' : '#f87171';
    }
  }

  // ─────────────────────────────────────────────
  // 2. NL → SQL AGENT (Terminal typewriter)
  // ─────────────────────────────────────────────
  let sqlTyping = null;
  let activeBtn = null;

  function initSQL() {
    const btns = document.querySelectorAll('.query-btn');
    if (!btns.length) return;
    btns.forEach((btn, i) => {
      btn.addEventListener('click', () => runQuery(i, btn));
    });
    // Auto-run first query
    setTimeout(() => runQuery(0, btns[0]), 600);
  }

  function runQuery(index, btn) {
    // Update active button
    document.querySelectorAll('.query-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeBtn = btn;

    const output  = document.getElementById('sql-output-text');
    const cursor  = document.getElementById('sql-cursor');
    if (!output) return;

    output.textContent = '';
    if (cursor) cursor.style.display = 'inline-block';

    if (sqlTyping) clearInterval(sqlTyping);

    const queries = CONFIG.sqlQueries;
    if (!queries[index]) return;

    const text = queries[index].r;
    let i = 0;
    sqlTyping = setInterval(() => {
      output.textContent += text[i];
      i++;
      // Auto-scroll terminal
      const terminal = output.closest('.terminal');
      if (terminal) terminal.scrollTop = terminal.scrollHeight;

      if (i >= text.length) {
        clearInterval(sqlTyping);
        if (cursor) cursor.style.display = 'none';
      }
    }, 11);
  }

  // ─────────────────────────────────────────────
  // 3. CLV PREDICTOR
  // ─────────────────────────────────────────────
  function initCLV() {
    const inputs = ['clv-purchases','clv-aov','clv-recency','clv-tenure'];
    inputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', updateCLV);
    });
    updateCLV();
  }

  function updateCLV() {
    const purchases = Math.max(1, parseInt(document.getElementById('clv-purchases')?.value) || 8);
    const aov       = Math.max(10, parseInt(document.getElementById('clv-aov')?.value) || 320);
    const recency   = Math.max(1, parseInt(document.getElementById('clv-recency')?.value) || 14);
    const tenure    = Math.max(1, parseInt(document.getElementById('clv-tenure')?.value) || 18);

    // BG/NBD + Gamma-Gamma approximation
    const freq        = purchases / Math.max(tenure / 3, 1);
    const recencyMult = Math.max(0.15, 1 - (recency / 365));
    const tenureMult  = Math.min(1.45, 1 + (tenure / 36));
    const predictedTx = freq * recencyMult * tenureMult * 36;     // 3-year horizon
    const clv         = Math.round(predictedTx * aov);

    const valEl = document.getElementById('clv-value');
    const segEl = document.getElementById('clv-segment');
    if (valEl) valEl.textContent = '$' + clv.toLocaleString();

    if (segEl) {
      if      (clv > 25000) { segEl.textContent = '◆ PLATINUM';   segEl.style.color = '#d4a843'; }
      else if (clv > 10000) { segEl.textContent = '● HIGH VALUE'; segEl.style.color = '#38c8e8'; }
      else if (clv > 4000)  { segEl.textContent = '● GROWING';    segEl.style.color = '#4ade80'; }
      else                  { segEl.textContent = '▽ AT RISK';    segEl.style.color = '#f87171'; }
    }
  }

  // ─────────────────────────────────────────────
  // Boot all demos
  // ─────────────────────────────────────────────
  function init() {
    initROAS();
    initSQL();
    initCLV();
  }

  // Expose updateROAS globally for inline oninput fallback
  window.updateROAS = updateROAS;
  window.updateCLV  = updateCLV;
  window.runQuery   = runQuery;

  return { init };

})();

window.Demos = Demos;
