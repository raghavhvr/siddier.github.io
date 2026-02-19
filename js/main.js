/* ═══════════════════════════════════════════════
   MAIN — DOM Builder, Cursor, Entry Screen
   Rewritten: clean boot order, no race conditions
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // Step 1: Build all HTML from CONFIG
  DOM.build();

  // Step 2: Cursor (works immediately)
  Cursor.init();

  // Step 3: Wire demo events (DOM exists now)
  Demos.wireEvents();

  // Step 4: Entry screen (locks scroll, shows launch)
  Entry.init();

});

// ═══════════════════════════════════════════════
// DOM BUILDER — generates all page HTML from CONFIG
// ═══════════════════════════════════════════════
const DOM = {

  build() {
    this._buildEntry();
    this._buildHUDShell();
    this._buildChapters();
    this._buildFooter();
  },

  _buildEntry() {
    const el = document.getElementById('entry');
    if (!el) return;
    const p = CONFIG.person;
    el.innerHTML = `
      <p class="entry-title">An Odyssey Through Data &amp; AI</p>
      <h1 class="entry-name">
        ${p.nameShort}<br><span>${p.nameLast}</span>
      </h1>
      <p class="entry-subtitle">${p.title} &nbsp;·&nbsp; ${p.location}</p>
      <button class="launch-btn" id="launch-btn">
        <span>Begin the Odyssey &nbsp;›</span>
      </button>
      <div style="font-size:0.56rem;letter-spacing:0.2em;color:var(--text-dim);margin-top:-24px;">
        or scroll to explore
      </div>
    `;
  },

  _buildHUDShell() {
    const hud = document.getElementById('hud');
    if (!hud) return;
    hud.innerHTML = `
      <div id="hud-top">
        <div id="hud-logo" onclick="Journey.scrollToChapter(0)" style="cursor:pointer;">R · S · R</div>
        <nav id="hud-nav"></nav>
        <a href="mailto:${CONFIG.person.email}"
           style="pointer-events:all;font-size:0.58rem;letter-spacing:0.15em;
                  color:var(--gold);text-transform:uppercase;border:1px solid rgba(212,168,67,0.3);
                  padding:8px 18px;transition:background 0.3s;cursor:pointer;"
           onmouseover="this.style.background='rgba(212,168,67,0.1)'"
           onmouseout="this.style.background='transparent'">
          Hire Me
        </a>
      </div>
      <div id="hud-bottom"></div>
    `;
  },

  _buildChapters() {
    const container = document.getElementById('scroll-container');
    if (!container) return;
    container.innerHTML =
      this._chapterHero() +
      this._chapterAbout() +
      this._chapterJourney() +
      this._chapterProjects() +
      this._chapterImpact() +
      this._chapterContact();
  },

  _chapterHero() {
    const p = CONFIG.person;
    const stats = CONFIG.stats.map(s => `
      <div class="stat-block">
        <span class="num">${s.num}</span>
        <span class="label">${s.label}</span>
      </div>`).join('');
    return `
    <section class="chapter" id="chapter-0" data-chapter="0" style="min-height:100vh;--chapter-color:var(--ch1-color)">
      <div class="chapter-inner" style="padding-top:80px;">
        <div class="reveal">
          <p class="section-eyebrow">Chapter I · Origin Point</p>
          <h1 class="section-heading" style="font-size:clamp(3.5rem,9vw,9rem);margin-bottom:var(--space-md);">
            ${p.nameShort}<br><em>${p.nameLast}</em>
          </h1>
          <p style="font-family:var(--font-display);font-size:clamp(1.1rem,2vw,1.6rem);
                    font-style:italic;color:var(--text-secondary);max-width:560px;margin-bottom:var(--space-xl);">
            ${p.tagline}
          </p>
        </div>
        <div class="stats-row stagger reveal" data-delay="200">${stats}</div>
        <div class="scroll-hint reveal" data-delay="400">
          <span>Scroll to begin</span>
          <div class="scroll-line"></div>
        </div>
      </div>
      <div class="chapter-number">I</div>
    </section>`;
  },

  _chapterAbout() {
    const pills = ['GenAI & LLMs','ML Engineering','Data Architecture','MLOps & DevOps','Cloud Platforms','Data Governance']
      .map(x => `<div class="expertise-pill"><span>${x}</span></div>`).join('');
    return `
    <section class="chapter" id="chapter-1" data-chapter="0" style="--chapter-color:var(--ch1-color)">
      <div class="chapter-inner">
        <div class="grid-2">
          <div style="height:420px;position:relative;">
            <canvas id="orb-canvas" style="width:100%;height:100%;display:block;"></canvas>
          </div>
          <div class="reveal">
            <p class="section-eyebrow">About</p>
            <h2 class="section-heading">Where Strategy<br><em>Meets Engineering</em></h2>
            <p class="section-body">
              I have spent over a decade at the frontier where <strong>data architecture,
              machine learning, and executive strategy</strong> converge — building systems
              that do not just analyse the past, but shape what comes next.
            </p>
            <p class="section-body" style="margin-top:16px;">
              From modernising McDonald's data pipelines to deploying GenAI SQL agents that
              compress analyst turnaround from hours to minutes — I operate with one principle:
              <strong>data that does not change decisions is not worth building.</strong>
            </p>
            <div class="expertise-grid stagger">${pills}</div>
          </div>
        </div>
      </div>
      <div class="chapter-number">II</div>
    </section>`;
  },

  _chapterJourney() {
    const items = CONFIG.career.map(job => `
      <div class="timeline-item reveal">
        <div class="timeline-date">${job.date}</div>
        <div class="timeline-role">${job.role}</div>
        <div class="timeline-company">${job.company}</div>
        <div class="timeline-impact">
          ${job.impacts.map(i => `<div class="impact-line">${i}</div>`).join('')}
        </div>
      </div>`).join('');
    return `
    <section class="chapter" id="chapter-2" data-chapter="1" style="--chapter-color:var(--ch2-color)">
      <div class="chapter-inner">
        <div class="reveal" style="margin-bottom:var(--space-xl)">
          <p class="section-eyebrow">Chapter II · The Rise</p>
          <h2 class="section-heading">A Decade of<br><em>Compounding Impact</em></h2>
        </div>
        <div class="grid-2">
          <div class="timeline">${items}</div>
          <div class="reveal" style="position:sticky;top:120px;align-self:start;">
            <p class="section-eyebrow">Career Arc</p>
            <h3 class="section-heading" style="font-size:clamp(1.8rem,3vw,3rem);">
              Analyst → Architect → Director
            </h3>
            <p class="section-body">
              Six organizations. Four countries. One through-line:
              <strong>turning raw data into competitive advantage</strong> at every level
              of the stack — from Python scripts to boardroom roadmaps.
            </p>
          </div>
        </div>
      </div>
      <div class="chapter-number">III</div>
    </section>`;
  },

  _chapterProjects() {
    return `
    <section class="chapter" id="chapter-3" data-chapter="2" style="--chapter-color:var(--ch3-color)">
      <div class="chapter-inner">
        <div class="reveal" style="margin-bottom:var(--space-xl);text-align:center;">
          <p class="section-eyebrow" style="justify-content:center;">Chapter III · Arsenal</p>
          <h2 class="section-heading">Live ML <em>Demos</em></h2>
          <p class="section-body" style="margin:0 auto;text-align:center;">
            Not just descriptions — real, interactive models. Play with the inputs.
          </p>
        </div>
        <div class="grid-3">
          ${this._demoROAS()}
          ${this._demoSQL()}
          ${this._demoCLV()}
        </div>
      </div>
      <div class="chapter-number">IV</div>
    </section>`;
  },

  _demoROAS() {
    return `
    <div class="project-card reveal">
      <div class="card-head">
        <div class="card-num">01 · Marketing Attribution</div>
        <div class="card-title">ROAS Uplift Modeller</div>
        <div class="card-desc">PySpark uplift model via FastAPI. Adjust channel spend and watch predicted Return on Ad Spend shift live.</div>
      </div>
      <div class="card-tags">
        <span class="tag">PySpark</span><span class="tag">FastAPI</span>
        <span class="tag">GA4</span><span class="tag">Docker</span>
      </div>
      <div class="demo-wrap">
        <div class="demo-header"><div class="demo-dot"></div><span class="demo-label">Live Simulator</span></div>
        <div class="slider-group">
          <div class="slider-label">Paid Search Budget <span id="slider-search-val">$42K</span></div>
          <input type="range" id="slider-search" min="10" max="100" value="42">
        </div>
        <div class="slider-group">
          <div class="slider-label">Social Media Budget <span id="slider-social-val">$28K</span></div>
          <input type="range" id="slider-social" min="5" max="80" value="28">
        </div>
        <div class="slider-group">
          <div class="slider-label">Email / CRM Weight <span id="slider-email-val">0.6</span></div>
          <input type="range" id="slider-email" min="1" max="10" value="6">
        </div>
        <div class="result-box cyan-accent">
          <div>
            <div class="result-label">Predicted ROAS</div>
            <div class="result-value" id="roas-value">—</div>
          </div>
          <div style="text-align:right">
            <div class="result-label">vs. baseline</div>
            <span class="result-delta" id="roas-delta">—</span>
          </div>
        </div>
      </div>
    </div>`;
  },

  _demoSQL() {
    const btns = CONFIG.sqlQueries.map((q, i) =>
      `<button class="query-btn${i===0?' active':''}" data-index="${i}">${q.q}</button>`
    ).join('');
    return `
    <div class="project-card reveal">
      <div class="card-head">
        <div class="card-num">02 · Generative AI</div>
        <div class="card-title">NL → SQL Agent</div>
        <div class="card-desc">Llama-3 + LangChain over Redshift. Ask in plain English. The agent writes and executes the query.</div>
      </div>
      <div class="card-tags">
        <span class="tag">Llama-3</span><span class="tag">LangChain</span>
        <span class="tag">Redshift</span><span class="tag">Python</span>
      </div>
      <div class="demo-wrap">
        <div class="demo-header"><div class="demo-dot"></div><span class="demo-label">Query Interface</span></div>
        <div class="query-list">${btns}</div>
        <div class="terminal">
          <div class="terminal-content">
            <span id="sql-output-text"></span><span class="cursor-blink" id="sql-cursor"></span>
          </div>
        </div>
      </div>
    </div>`;
  },

  _demoCLV() {
    return `
    <div class="project-card reveal">
      <div class="card-head">
        <div class="card-num">03 · Predictive Modelling</div>
        <div class="card-title">CLV Predictor</div>
        <div class="card-desc">BG/NBD + Gamma-Gamma model. Enter customer behaviour signals for a 3-year CLV prediction with segment classification.</div>
      </div>
      <div class="card-tags">
        <span class="tag">scikit-learn</span><span class="tag">BG/NBD</span>
        <span class="tag">Python</span><span class="tag">Salesforce</span>
      </div>
      <div class="demo-wrap">
        <div class="demo-header"><div class="demo-dot"></div><span class="demo-label">Predict CLV</span></div>
        <div class="input-grid">
          <div class="input-field"><label>Purchases (12mo)</label><input type="number" id="clv-purchases" value="8" min="1" max="100"></div>
          <div class="input-field"><label>Avg Order ($)</label><input type="number" id="clv-aov" value="320" min="10" max="5000"></div>
          <div class="input-field"><label>Days Since Last</label><input type="number" id="clv-recency" value="14" min="1" max="365"></div>
          <div class="input-field"><label>Tenure (months)</label><input type="number" id="clv-tenure" value="18" min="1" max="120"></div>
        </div>
        <div class="result-box gold-accent">
          <div>
            <div class="result-label">3-Year Predicted CLV</div>
            <div class="result-value gold" id="clv-value">—</div>
          </div>
          <div>
            <div class="result-label">&nbsp;</div>
            <span class="result-delta" id="clv-segment" style="color:var(--cyan);">—</span>
          </div>
        </div>
      </div>
    </div>`;
  },

  _chapterImpact() {
    const cells = CONFIG.impact.map(item => `
      <div class="impact-cell reveal">
        <span class="impact-num">${item.num}</span>
        <p class="impact-desc">${item.desc}</p>
      </div>`).join('');
    return `
    <section class="chapter" id="chapter-4" data-chapter="3" style="--chapter-color:var(--ch4-color)">
      <div class="chapter-inner">
        <div class="reveal" style="text-align:center;margin-bottom:var(--space-xl)">
          <p class="section-eyebrow" style="justify-content:center;">Chapter IV · Evidence</p>
          <h2 class="section-heading" style="text-align:center;">The <em>Numbers</em></h2>
        </div>
        <div class="impact-grid">${cells}</div>
      </div>
      <div class="chapter-number">V</div>
    </section>`;
  },

  _chapterContact() {
    const p = CONFIG.person;
    return `
    <section class="chapter" id="chapter-5" data-chapter="4"
             style="min-height:80vh;--chapter-color:var(--ch5-color);
                    display:flex;align-items:center;justify-content:center;text-align:center;">
      <div class="chapter-inner">
        <div class="reveal">
          <p class="section-eyebrow" style="justify-content:center;">Chapter V · The Signal</p>
          <h2 class="section-heading" style="text-align:center;font-size:clamp(3rem,7vw,7rem);">
            Let's Build<br><em>Something Real</em>
          </h2>
          <p class="section-body" style="margin:0 auto var(--space-xl);text-align:center;max-width:500px;">
            Open to freelance data science and ML consulting engagements, advisory roles,
            and AI transformation partnerships. Two continents. Always reachable.
          </p>
          <div class="contact-links" style="justify-content:center;">
            <a class="contact-link" href="mailto:${p.email}"><span>Email Me</span></a>
            <a class="contact-link" href="${p.linkedin}" target="_blank"><span>LinkedIn</span></a>
            <a class="contact-link" href="${p.github}" target="_blank"><span>GitHub</span></a>
          </div>
          <p style="margin-top:var(--space-xl);font-size:0.62rem;color:var(--text-dim);letter-spacing:0.1em;">
            ${p.phone_uae} &nbsp;·&nbsp; ${p.phone_in}
          </p>
        </div>
      </div>
      <div class="chapter-number" style="opacity:0.02;">∞</div>
    </section>`;
  },

  _buildFooter() {
    const footer = document.getElementById('footer');
    if (!footer) return;
    const p = CONFIG.person;
    footer.innerHTML = `
      <span>© 2025 ${p.name}</span>
      <span>${p.title} · ${p.location}</span>
    `;
  },

};

// ═══════════════════════════════════════════════
// CURSOR
// ═══════════════════════════════════════════════
const Cursor = {
  dot: null, ring: null,
  mx: 0, my: 0, rx: 0, ry: 0,

  init() {
    this.dot  = document.getElementById('cursor-dot');
    this.ring = document.getElementById('cursor-ring');
    if (!this.dot) return;

    document.addEventListener('mousemove', (e) => {
      this.mx = e.clientX;
      this.my = e.clientY;
      this.dot.style.left = e.clientX + 'px';
      this.dot.style.top  = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => this.ring?.classList.add('clicking'));
    document.addEventListener('mouseup',   () => this.ring?.classList.remove('clicking'));

    // Add hover effect to interactive elements (re-runs after DOM build)
    const addHover = () => {
      document.querySelectorAll('a, button, input, .project-card, .query-btn, .hud-nav-item').forEach(el => {
        el.addEventListener('mouseenter', () => this.ring?.classList.add('hovering'));
        el.addEventListener('mouseleave', () => this.ring?.classList.remove('hovering'));
      });
    };
    addHover();
    // Re-apply after entry dismissed and new content appears
    setTimeout(addHover, 2000);

    this._tick();
  },

  _tick() {
    this.rx += (this.mx - this.rx) * 0.11;
    this.ry += (this.my - this.ry) * 0.11;
    if (this.ring) {
      this.ring.style.left = this.rx + 'px';
      this.ring.style.top  = this.ry + 'px';
    }
    requestAnimationFrame(() => this._tick());
  }
};

// ═══════════════════════════════════════════════
// ENTRY SCREEN
// ═══════════════════════════════════════════════
const Entry = {
  dismissed: false,

  init() {
    const el  = document.getElementById('entry');
    const btn = document.getElementById('launch-btn');
    if (!el) return;

    // Lock body scroll so user cannot scroll behind entry screen
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    if (btn) {
      btn.addEventListener('click', () => this._dismiss(el));
    }

    // Auto dismiss after 10s
    setTimeout(() => this._dismiss(el), 10000);
  },

  _dismiss(el) {
    if (this.dismissed) return;
    this.dismissed = true;

    // Unlock scroll first, snap to top
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    window.scrollTo(0, 0);

    // Animate entry out
    el.classList.add('launched');

    setTimeout(() => {
      el.style.display = 'none';

      // NOW boot scroll tracking and reveals
      Journey.init();

      // Compute initial demo values
      Demos.compute();

      // Init 3D orb now that canvas is visible
      Scene.initOrb();

    }, 1400);
  }
};