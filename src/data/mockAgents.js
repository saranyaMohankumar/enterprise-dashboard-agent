export const INITIAL_AGENTS = [
  {
    id: "AGT-FIN-0101",
    name: "FinAudit Sentinel",
    icon: "ShieldCheck",
    publishDate: "2025-08-15",
    version: "v3.2.1",
    revisionDate: "2026-09-21",
    useCase: "Automated real-time general ledger anomaly detection, SOX 404 audit compliance checks, and cross-border vendor invoice verification.",
    persona: "Senior Forensic Accountant with a meticulous, authoritative tone. Adheres strictly to GAAP and IFRS standards.",
    businessLine: "Finance & Accounting",
    tokensUsed: 142500000,
    creditsUsed: 2850.00,
    monthlyBudgetCap: 4500.00,
    status: "Published",
    owner: "Elena Rostova (VP Finance)",
    model: "Gemini 1.5 Pro",
    dataClassification: "Confidential - Financial",
    guardrails: ["PII Redaction", "SOX 404 Compliance Lock", "Audit Trail Logging"],
    revisions: [
      {
        version: "v3.2.1",
        date: "2026-09-21",
        author: "Marcus Vance (Sr. Quant Engine)",
        notes: "Updated FX rate reconciliation model and added support for Q3 tax jurisdiction changes."
      },
      {
        version: "v3.1.0",
        date: "2026-06-10",
        author: "Elena Rostova",
        notes: "Integrated high-value transaction approval workflow triggers."
      },
      {
        version: "v1.0.0",
        date: "2025-08-15",
        author: "Finance AI Team",
        notes: "Initial enterprise release for automated ledger scanning."
      }
    ],
    usageTrend: [
      { month: "Apr 26", tokens: 18000000, cost: 360 },
      { month: "May 26", tokens: 22000000, cost: 440 },
      { month: "Jun 26", tokens: 25000000, cost: 500 },
      { month: "Jul 26", tokens: 24000000, cost: 480 },
      { month: "Aug 26", tokens: 26500000, cost: 530 },
      { month: "Sep 26", tokens: 27000000, cost: 540 }
    ]
  },
  {
    id: "AGT-ITS-0204",
    name: "AutoOps Tier-1 Resolver",
    icon: "Server",
    publishDate: "2025-11-03",
    version: "v2.8.0",
    revisionDate: "2026-09-18",
    useCase: "24/7 autonomous L1/L2 IT ticket triage, password resets, VPN routing issue resolution, and IAM entitlement provisioning.",
    persona: "Empathetic, efficient Tier-3 IT Systems Administrator. Direct, action-oriented, and provides clear step-by-step remediation.",
    businessLine: "Global IT Services",
    tokensUsed: 289400000,
    creditsUsed: 5788.00,
    monthlyBudgetCap: 7500.00,
    status: "Published",
    owner: "David K. Vance (Head of Enterprise IT)",
    model: "Gemini 1.5 Flash",
    dataClassification: "Internal Operations",
    guardrails: ["ServiceNow API Auth Guard", "Zero-Trust Identity Verification", "Action Confirmation Prompts"],
    revisions: [
      {
        version: "v2.8.0",
        date: "2026-09-18",
        author: "Alex Rivera (DevOps Lead)",
        notes: "Added Okta SAML token auto-refresh handling and reduced fallback escalation latency by 40%."
      },
      {
        version: "v2.0.0",
        date: "2026-02-14",
        author: "David K. Vance",
        notes: "Expanded knowledge base connector to support Confluence Enterprise."
      },
      {
        version: "v1.0.0",
        date: "2025-11-03",
        author: "IT Automation Team",
        notes: "Initial launch for IT Helpdesk slack bot integration."
      }
    ],
    usageTrend: [
      { month: "Apr 26", tokens: 38000000, cost: 760 },
      { month: "May 26", tokens: 45000000, cost: 900 },
      { month: "Jun 26", tokens: 51000000, cost: 1020 },
      { month: "Jul 26", tokens: 49000000, cost: 980 },
      { month: "Aug 26", tokens: 53000000, cost: 1060 },
      { month: "Sep 26", tokens: 53400000, cost: 1068 }
    ]
  },
  {
    id: "AGT-LGL-0309",
    name: "LexiGuard Contract Risk Advisor",
    icon: "FileText",
    publishDate: "2026-01-20",
    version: "v1.4.2",
    revisionDate: "2026-09-22",
    useCase: "Enterprise Master Services Agreement (MSA), NDA, and Vendor contract risk scoring, deviation detection against playbook clauses, and redline recommendation.",
    persona: "Senior Corporate Counsel with conservative risk appetite. Concise, objective, highlighting indemnification and liability exposure.",
    businessLine: "Legal & Compliance",
    tokensUsed: 68200000,
    creditsUsed: 1364.00,
    monthlyBudgetCap: 2500.00,
    status: "Published",
    owner: "Samantha Wright (General Counsel)",
    model: "Gemini 1.5 Pro",
    dataClassification: "Highly Confidential - Legal",
    guardrails: ["Privileged Communication Vault", "No External Data Retention", "Redline Sanity Checker"],
    revisions: [
      {
        version: "v1.4.2",
        date: "2026-09-22",
        author: "Legal Tech Ops",
        notes: "Refined EU AI Act liability clause analysis and updated IP assignment risk weights."
      },
      {
        version: "v1.2.0",
        date: "2026-05-19",
        author: "Samantha Wright",
        notes: "Added automatic clause comparisons against standard company playbook v4."
      },
      {
        version: "v1.0.0",
        date: "2026-01-20",
        author: "Legal Innovation Hub",
        notes: "Initial deployment for contract intake triage."
      }
    ],
    usageTrend: [
      { month: "Apr 26", tokens: 8000000, cost: 160 },
      { month: "May 26", tokens: 10500000, cost: 210 },
      { month: "Jun 26", tokens: 12000000, cost: 240 },
      { month: "Jul 26", tokens: 11000000, cost: 220 },
      { month: "Aug 26", tokens: 13200000, cost: 264 },
      { month: "Sep 26", tokens: 13500000, cost: 270 }
    ]
  },
  {
    id: "AGT-HR-0412",
    name: "TalentPath Onboarding Companion",
    icon: "Users",
    publishDate: "2025-09-10",
    version: "v2.1.0",
    revisionDate: "2026-08-30",
    useCase: "Personalized employee onboarding guidance, benefits selection answering, departmental setup walkthroughs, and internal policy assistance.",
    persona: "Warm, encouraging People Operations Partner. Friendly, highly structured, and supportive.",
    businessLine: "Human Resources",
    tokensUsed: 92100000,
    creditsUsed: 1842.00,
    monthlyBudgetCap: 3000.00,
    status: "Published",
    owner: "Priya Patel (Chief People Officer)",
    model: "Gemini 1.5 Flash",
    dataClassification: "Internal - HR",
    guardrails: ["Employee PII Protection", "Benefits Policy Grounding", "Tone Consistency Guard"],
    revisions: [
      {
        version: "v2.1.0",
        date: "2026-08-30",
        author: "HR Digital Team",
        notes: "Integrated 2026 open enrollment benefit FAQs and hybrid work guidelines."
      },
      {
        version: "v2.0.0",
        date: "2026-03-01",
        author: "Priya Patel",
        notes: "Added interactive team introductions and equipment ordering status lookup."
      },
      {
        version: "v1.0.0",
        date: "2025-09-10",
        author: "HR Innovation Team",
        notes: "First release for global new hire pilot."
      }
    ],
    usageTrend: [
      { month: "Apr 26", tokens: 12000000, cost: 240 },
      { month: "May 26", tokens: 14000000, cost: 280 },
      { month: "Jun 26", tokens: 16000000, cost: 320 },
      { month: "Jul 26", tokens: 15500000, cost: 310 },
      { month: "Aug 26", tokens: 17000000, cost: 340 },
      { month: "Sep 26", tokens: 17600000, cost: 352 }
    ]
  },
  {
    id: "AGT-CX-0520",
    name: "OmniCare Resolution Engine",
    icon: "Headphones",
    publishDate: "2025-06-01",
    version: "v4.0.1",
    revisionDate: "2026-09-24",
    useCase: "Customer dispute management, order tracking, complex refund handling, and omnichannel customer retention conversational agent.",
    persona: "Proactive Customer Experience Specialist. Polished, solution-driven, empathetic, and empowered to issue retention incentives.",
    businessLine: "Customer Operations",
    tokensUsed: 420800000,
    creditsUsed: 8416.00,
    monthlyBudgetCap: 10000.00,
    status: "Published",
    owner: "Carlos Mendez (VP Customer Support)",
    model: "Gemini 1.5 Flash",
    dataClassification: "Customer Data - Restricted",
    guardrails: ["PCI-DSS Credit Card Filter", "Sentiment Escalation Trigger", "Refund Cap $250 Enforcement"],
    revisions: [
      {
        version: "v4.0.1",
        date: "2026-09-24",
        author: "CX Tech Squad",
        notes: "Hotfix for sentiment score calculation during multi-language voice-to-text transcriptions."
      },
      {
        version: "v4.0.0",
        date: "2026-08-01",
        author: "Carlos Mendez",
        notes: "Major release adding real-time logistics tracking API integration."
      },
      {
        version: "v1.0.0",
        date: "2025-06-01",
        author: "Customer Ops Team",
        notes: "Initial launch across web chat channels."
      }
    ],
    usageTrend: [
      { month: "Apr 26", tokens: 55000000, cost: 1100 },
      { month: "May 26", tokens: 62000000, cost: 1240 },
      { month: "Jun 26", tokens: 71000000, cost: 1420 },
      { month: "Jul 26", tokens: 75000000, cost: 1500 },
      { month: "Aug 26", tokens: 78000000, cost: 1560 },
      { month: "Sep 26", tokens: 79800000, cost: 1596 }
    ]
  },
  {
    id: "AGT-ENG-0608",
    name: "DevCore Code Reviewer & Security Copilot",
    icon: "Code2",
    publishDate: "2026-02-11",
    version: "v2.1.0-rc",
    revisionDate: "2026-09-15",
    useCase: "Automated Pull Request code reviews, static vulnerability scanning (SAST), performance bottleneck highlighting, and unit test generation.",
    persona: "Staff Software Architect & Security Engineer. Rigorous, technical, constructive, pointing to exact line-item code optimizations.",
    businessLine: "Engineering & R&D",
    tokensUsed: 195000000,
    creditsUsed: 3900.00,
    monthlyBudgetCap: 6000.00,
    status: "Staging",
    owner: "Tariq Mansour (VP Software Engineering)",
    model: "Gemini 1.5 Pro",
    dataClassification: "Proprietary IP Code",
    guardrails: ["Secrets Detection Guard", "License Compliance Checker", "Sandboxed Execution"],
    revisions: [
      {
        version: "v2.1.0-rc",
        date: "2026-09-15",
        author: "Tariq Mansour",
        notes: "Added automated Rust & Go memory safety review guidelines and OWASP Top 10 rule set."
      },
      {
        version: "v1.5.0",
        date: "2026-06-01",
        author: "DevOps Architecture Guild",
        notes: "Integrated GitHub Actions and GitLab CI automated comment status API."
      },
      {
        version: "v1.0.0",
        date: "2026-02-11",
        author: "Dev Core Team",
        notes: "Initial beta release for core backend repositories."
      }
    ],
    usageTrend: [
      { month: "Apr 26", tokens: 20000000, cost: 400 },
      { month: "May 26", tokens: 28000000, cost: 560 },
      { month: "Jun 26", tokens: 34000000, cost: 680 },
      { month: "Jul 26", tokens: 36000000, cost: 720 },
      { month: "Aug 26", tokens: 38000000, cost: 760 },
      { month: "Sep 26", tokens: 39000000, cost: 780 }
    ]
  },
  {
    id: "AGT-SCM-0715",
    name: "SupplyPulse Logistics Predictor",
    icon: "Truck",
    publishDate: "2025-07-22",
    version: "v1.9.4",
    revisionDate: "2026-08-11",
    useCase: "Global supply chain disruption forecasting, port congestion tracking, inventory re-order optimization, and customs document extraction.",
    persona: "Global Supply Chain Operations Analyst. Analytical, quantitative, risk-focused, summarizing lead time variations.",
    businessLine: "Supply Chain & Logistics",
    tokensUsed: 110400000,
    creditsUsed: 2208.00,
    monthlyBudgetCap: 4000.00,
    status: "Published",
    owner: "Helena Berg (Director of Supply Operations)",
    model: "Gemini 1.5 Flash",
    dataClassification: "Internal Operations",
    guardrails: ["Vendor Tariff Database Lock", "Geopolitical Risk Tagging"],
    revisions: [
      {
        version: "v1.9.4",
        date: "2026-08-11",
        author: "Helena Berg",
        notes: "Added air freight weather alert feeds and dynamic route rerouting options."
      },
      {
        version: "v1.0.0",
        date: "2025-07-22",
        author: "Logistics Analytics Team",
        notes: "Initial deployment for North American warehouse network."
      }
    ],
    usageTrend: [
      { month: "Apr 26", tokens: 15000000, cost: 300 },
      { month: "May 26", tokens: 17000000, cost: 340 },
      { month: "Jun 26", tokens: 19000000, cost: 380 },
      { month: "Jul 26", tokens: 18500000, cost: 370 },
      { month: "Aug 26", tokens: 20000000, cost: 400 },
      { month: "Sep 26", tokens: 20900000, cost: 418 }
    ]
  },
  {
    id: "AGT-MKT-0831",
    name: "GrowthCopy Campaign Generator",
    icon: "Megaphone",
    publishDate: "2025-05-19",
    version: "v1.1.0",
    revisionDate: "2026-04-12",
    useCase: "Multichannel marketing copy creation, SEO blog outline generation, social media post crafting, and brand voice consistency checking.",
    persona: "Creative Brand Strategist. Energetic, persuasive, structured, adaptable across B2B and consumer campaign tones.",
    businessLine: "Marketing Operations",
    tokensUsed: 48900000,
    creditsUsed: 978.00,
    monthlyBudgetCap: 2000.00,
    status: "Deprecated",
    owner: "Rachel Green (Marketing Director)",
    model: "Gemini 1.5 Flash",
    dataClassification: "Public Marketing Content",
    guardrails: ["Brand Guidelines Enforcement", "Competitor Trademark Scrub"],
    revisions: [
      {
        version: "v1.1.0",
        date: "2026-04-12",
        author: "Rachel Green",
        notes: "Deprecated in favor of new unified CreativeSuite AI Agent v3.0."
      },
      {
        version: "v1.0.0",
        date: "2025-05-19",
        author: "Growth Marketing Squad",
        notes: "Initial deployment."
      }
    ],
    usageTrend: [
      { month: "Apr 26", tokens: 12000000, cost: 240 },
      { month: "May 26", tokens: 9000000, cost: 180 },
      { month: "Jun 26", tokens: 5000000, cost: 100 },
      { month: "Jul 26", tokens: 2000000, cost: 40 },
      { month: "Aug 26", tokens: 1000000, cost: 20 },
      { month: "Sep 26", tokens: 500000, cost: 10 }
    ]
  }
];

export const BUSINESS_LINES = [
  "All Business Lines",
  "Finance & Accounting",
  "Global IT Services",
  "Legal & Compliance",
  "Human Resources",
  "Customer Operations",
  "Engineering & R&D",
  "Supply Chain & Logistics",
  "Marketing Operations"
];

export const LIFECYCLE_STATUSES = [
  "All Statuses",
  "Published",
  "Staging",
  "Deprecated",
  "Archived",
  "Maintenance"
];

export const AVAILABLE_MODELS = [
  "Gemini 1.5 Pro",
  "Gemini 1.5 Flash",
  "Claude 3.5 Sonnet",
  "Custom Fine-tune v2"
];
