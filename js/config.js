/* ═══════════════════════════════════════════════
   CONFIG — All Portfolio Content & Data
   Edit this file to update any text, stats, or
   project details across the whole site.
═══════════════════════════════════════════════ */

const CONFIG = {

  person: {
    name:       'Raghavendra Siddi Reddy',
    nameShort:  'Raghavendra',
    nameLast:   'Siddi Reddy',
    title:      'Data Science Consultant',
    tagline:    'Independent consultant turning messy data into decisions that matter.',
    email:      'raghavhvr@outlook.com',
    phone_in:   '+91 98850 65637',
    phone_uae:  '+971 58580 6565',
    linkedin:   'https://linkedin.com/in/siddireddy',
    github:     'https://github.com/raghavhvr',
    location:   'Dubai, UAE  ·  Hyderabad, India',
  },

  stats: [
    { num: '10+',  label: 'Years of Impact'      },
    { num: '$20M+',label: 'Value Generated'       },
    { num: '120+', label: 'Production Pipelines'  },
    { num: '6',    label: 'Global Organizations'  },
  ],

  /* ── The 5 Chapters ── */
  chapters: [
    {
      id:       1,
      slug:     'origin',
      planet:   'Earth',
      color:    '#3b82f6',
      label:    'Origin',
      heading:  'The Beginning',
      sub:      'Every odyssey starts with a spark.',
      body:     `Started as an analyst solving geospatial puzzles with SQL in Hyderabad. Quickly learned that the real value wasn't in the data itself — it was in what you could make people <em>do</em> with it. That single insight has driven every decision since.`,
    },
    {
      id:       2,
      slug:     'rise',
      planet:   'Mars',
      color:    '#f97316',
      label:    'The Rise',
      heading:  'Climbing the Stack',
      sub:      'From analyst to architect.',
      body:     `Three years at Accenture. Then Publicis, Dubai. Built data pipelines for McDonald's that went from 40% reliable to 99.8% clean. Wrote a propensity model for Mercedes that generated $2M in annual pipeline lift. Learned that the best models are ones that get used — and that means earning trust, not just accuracy.`,
    },
    {
      id:       3,
      slug:     'power',
      planet:   'Jupiter',
      color:    '#8b5cf6',
      label:    'Director',
      heading:  'Leading at Scale',
      sub:      'Platform thinking. Cross-functional command.',
      body:     `Became Director of Data & Analytics at Create Group. Built the Customer 360 program from scratch — reducing acquisition cost 18%, growing LTV 22%. Then MAG Group: rewrote the analytics platform with Docker & Terraform, unlocked $4.2M/year in decision intelligence through Power BI. Led teams across engineering, product, and analytics — aligning boards, not just building dashboards.`,
    },
    {
      id:       4,
      slug:     'genai',
      planet:   'Neptune',
      color:    '#10b981',
      label:    'GenAI Era',
      heading:  'The AI Frontier',
      sub:      'LLMs, agents, and production intelligence.',
      body:     `At Axxel Technologies, led the company's GenAI transformation. Deployed a Llama-3 + LangChain SQL agent over Redshift that took stakeholder insight turnaround from hours to minutes. Scaled 120+ production pipelines while cutting latency 40%. Built governance and PII frameworks that achieved full audit readiness — saving $250K in organizational risk.`,
    },
    {
      id:       5,
      slug:     'now',
      planet:   'The Void',
      color:    '#d4a843',
      label:    'Now',
      heading:  'What Comes Next',
      sub:      'The next mission awaits.',
      body:     `Looking for the next challenge: a team building something that matters, with data and AI at the core. Whether that's a Director of Data role, an AI transformation engagement, or a greenfield ML platform — I bring the architecture, the strategy, and the execution.`,
    },
  ],

  /* ── Career Timeline ── */
  career: [
    {
      date:     'Oct 2025 – Present',
      role:     'Freelance Data Science Consultant',
      company:  'Independent · Remote',
      color:    '#d4a843',
      impacts:  [
        'End-to-end ML and data platform consulting for clients across MENA and South Asia',
        'Designing and deploying GenAI solutions, predictive models, and analytics infrastructure',
        'Advisory on data strategy, governance, and AI transformation roadmaps',
      ],
    },
    {
      date:     'Mar 2024 – Sep 2025',
      role:     'Director, Data Architecture',
      company:  'Axxel Technologies · Remote',
      color:    '#10b981',
      impacts:  [
        'Scaled 120+ production pipelines, cut platform latency by 40%',
        'Deployed LLM SQL agent (Llama-3 + LangChain) — hours to minutes',
        'Established PII tagging & IAM governance — $250K risk reduction',
        'Real-time social analytics engine: +30% throughput, -$60K vendor spend',
      ],
    },
    {
      date:     'Oct 2023 – Feb 2024',
      role:     'Head of Analytics',
      company:  'MAG Group · Dubai, UAE',
      color:    '#8b5cf6',
      impacts:  [
        '$4.2M/year unlocked via Power BI decision intelligence',
        'ML pricing microservice: +12% sales velocity, $1.1M quarterly impact',
        'Docker + Terraform modernisation: +30% deployment velocity',
      ],
    },
    {
      date:     'Dec 2021 – Sep 2023',
      role:     'Director, Data & Analytics',
      company:  'Create Group · Dubai, UAE',
      color:    '#f97316',
      impacts:  [
        'Customer 360: -18% acquisition cost, +22% LTV (~$900K annual value)',
        'GA4 → BigQuery marketing stack: $2.3M incremental revenue',
        'Migrated Tableau to AWS Fargate: -28% infra costs (~$180K/year)',
      ],
    },
    {
      date:     'Apr 2020 – Nov 2021',
      role:     'Senior Executive, Data Analysis',
      company:  'Publicis · Dubai, UAE',
      color:    '#ef4444',
      impacts:  [
        'McDonald\'s data pipelines: eliminated 99.8% corruption, $120K/year savings',
        'Mercedes propensity model: +15% conversion, ~$2M annual pipeline lift',
      ],
    },
    {
      date:     'Mar 2018 – Mar 2020',
      role:     'Data Analyst',
      company:  'MRM · Dubai, UAE',
      color:    '#3b82f6',
      impacts:  [
        'Oracle → Tableau analytics hub: -40% reporting time, $75K savings',
        'Python ETL testing framework: -35% data errors, $60K rework saved',
      ],
    },
    {
      date:     'Dec 2014 – Jan 2018',
      role:     'Technical Specialist',
      company:  'Accenture · Hyderabad, India',
      color:    '#6366f1',
      impacts:  [
        'Led 70-person ops team: ad campaign success 40% → 85%',
        'Python automation + Data Studio: -65% support turnaround, $200K savings',
      ],
    },
  ],

  /* ── ML Project Demos ── */
  projects: [
    {
      id:      'attribution',
      num:     '01',
      label:   'Marketing Attribution',
      title:   'ROAS Uplift Modeller',
      desc:    'PySpark uplift model deployed via FastAPI. Adjust channel mix and watch the predicted Return on Ad Spend shift in real time.',
      tags:    ['PySpark', 'FastAPI', 'GA4', 'Salesforce', 'Docker'],
      type:    'sliders',
    },
    {
      id:      'sql-agent',
      num:     '02',
      label:   'Generative AI',
      title:   'NL → SQL Agent',
      desc:    'Llama-3 + LangChain SQL agent over Redshift. Ask business questions in plain English — the agent writes and runs the query.',
      tags:    ['Llama-3', 'LangChain', 'Python', 'Redshift'],
      type:    'terminal',
    },
    {
      id:      'clv',
      num:     '03',
      label:   'Predictive Modelling',
      title:   'CLV Predictor',
      desc:    'BG/NBD + Gamma-Gamma model. Input customer behaviour signals and receive a 3-year Customer Lifetime Value prediction with segment classification.',
      tags:    ['scikit-learn', 'BG/NBD', 'Salesforce', 'Python'],
      type:    'inputs',
    },
  ],

  /* ── Impact Numbers ── */
  impact: [
    { num: '$4.2M',   desc: 'Annual value from Power BI intelligence at MAG Group' },
    { num: '40%',     desc: 'Platform latency reduction across 120+ pipelines' },
    { num: '$2.3M',   desc: 'Incremental revenue from GA4 → BigQuery stack' },
    { num: '99.8%',   desc: 'Data corruption eliminated in McDonald\'s pipelines' },
    { num: '+15%',    desc: 'Conversion lift from Mercedes propensity model' },
    { num: '28%',     desc: 'Infrastructure cost reduction via IaC modernisation' },
    { num: '85%',     desc: 'Campaign success rate, up from 40% at Accenture' },
    { num: 'hrs→min', desc: 'Insight turnaround via LLM-powered SQL agent' },
  ],

  /* ── SQL Demo Queries & Responses ── */
  sqlQueries: [
    {
      q: 'Top 5 revenue customers last quarter',
      r: `Querying Redshift...

customer_id      revenue_q3    yoy_growth
───────────────  ────────────  ──────────
CUST_004821      $284,920      +34%
CUST_001193      $241,440      +18%
CUST_008847      $198,760      +52%
CUST_002205      $176,300      -4%
CUST_007734      $154,880      +29%

5 rows · 0.43s · Generated SQL logged`,
    },
    {
      q: 'Churn risk segments by region',
      r: `Analysing churn signals...

region        risk_level   customers   avg_ltv
────────────  ──────────   ─────────   ───────
MENA          HIGH         1,204       $2,840
South Asia    MEDIUM       2,891       $4,120
Europe        LOW          4,432       $6,780
N. Africa     HIGH         847         $1,960

Signals: recency>60d, tickets>3, nps_score<6
4 rows · 0.61s`,
    },
    {
      q: 'Campaign ROAS by channel this month',
      r: `Pulling attribution data...

channel        spend       roas    vs_last_mo
─────────────  ──────────  ──────  ──────────
Email / CRM    $8,400      7.8x    +0.6x ↑
Paid Search    $42,000     4.2x    +0.3x ↑
Social Media   $28,000     2.1x    -0.4x ↓
Display        $14,200     1.4x    +0.0x

Insight: reallocate $8K from Display → Email
4 rows · 0.38s`,
    },
  ],

};

// Make available globally
window.CONFIG = CONFIG;