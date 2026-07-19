/**
 * Centralized content data for the portfolio.
 * All hardcoded content has been extracted here for maintainability.
 * Components import from this module instead of defining data inline.
 */
import type {
    NavLink,
    Venture,
    TimelineEvent,
    Stat,
    ContactInfo,
    SocialLink,
    Service,
} from "./types";

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const navLinks: NavLink[] = [
    { name: "About", href: "#executive-profile" },
    { name: "Ventures", href: "#ventures" },
    { name: "Services", href: "#services" },
    { name: "Leadership", href: "#leadership" },
    { name: "Expertise", href: "#competencies" },
    { name: "Contact", href: "#contact" },
];

// ---------------------------------------------------------------------------
// Brand / positioning (kept consistent across navbar, hero, footer, print CV)
// ---------------------------------------------------------------------------

export const PROFESSIONAL_TITLE = "Founder · Builder · Operator";

export const SITE_URL = "https://abdullahmirza.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/abdullahmirxa/";

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const heroTagline = PROFESSIONAL_TITLE;

export const heroHeadline = {
    lead: "I build",
    accent: "software people enjoy",
    rest: "— and businesses rely on.",
};

export const typewriterText =
    "Hi — I'm Abdullah. Founders and operators across Saudi Arabia bring me in to ship apps, AI tools, and automations that cut busywork and feel calm to use. 11+ years hands-on. 7 live products. From first sketch to launch day.";

export const heroExpertise = [
    "Apps, websites & SaaS products",
    "Custom AI agents & integrations",
    "Workflow automation that saves real hours",
];

export const heroNumbers = [
    "11+ years building & operating",
    "7 products and brands shipped",
    "50+ workflows automated for teams",
];

/** Hero portrait availability chip. */
export const heroAvailability = "Available for new collaborations";

/** Short executive summary used by the printable CV. */
export const cvSummary =
    "Founder-operator and full-stack builder based in Riyadh with 11+ years of experience. I design and ship AI-enabled products, commerce platforms, and operational systems — pairing hands-on engineering with enterprise logistics experience.";

// ---------------------------------------------------------------------------
// Executive Profile
// ---------------------------------------------------------------------------

export const executiveProfileLead =
    "I turn messy operations and half-formed product ideas into clear software — apps, practical AI, and automations that give teams their time back. 11+ years across logistics, commerce, and SaaS, still shipping hands-on.";

/** Intro under the Corporate Leadership section heading. */
export const leadershipIntro =
    "Before founding my own products, I led technology and operations inside high-volume logistics and 3PL teams — shipping platforms, hitting SLAs, and closing enterprise deals.";

export const stats: Stat[] = [
    { value: 11, suffix: "+", prefix: "", label: "Years Building" },
    { value: 7, prefix: "", label: "Products & Brands" },
    { value: 50, prefix: "", suffix: "+", label: "Workflows Automated" },
    { value: 12, prefix: "", label: "Certifications" },
];

// ---------------------------------------------------------------------------
// Ventures
// ---------------------------------------------------------------------------

export const ventures: Venture[] = [
    {
        title: "Mirxaa",
        domain: "mirxaa.com",
        url: "https://mirxaa.com",
        description:
            "Studio hub for AI-product experiments, writing, and shipping — where thoughtful design meets useful automation.",
        color: "#0066ff",
    },
    {
        title: "SourceKom",
        domain: "sourcekom.com",
        url: "https://sourcekom.com",
        description:
            "Industrial asset booking & exchange — helping suppliers and procurement teams collaborate across Saudi Arabia.",
        logo: "/logos/sourcekom.png",
        color: "var(--color-electric-blue)",
        image: "/generated_images/venture-sourcekom.png",
    },
    {
        title: "HabibiStay",
        domain: "habibistay.com",
        url: "https://habibistay.com",
        description:
            "Short-stay marketplace for KSA, powered by SARA — a warm AI concierge that helps guests book with confidence.",
        logo: "/logos/habibistay.webp",
        color: "var(--color-muted-gold)",
        image: "/generated_images/venture-habibistay.png",
    },
    {
        title: "Newomen",
        domain: "newomen.com",
        url: "https://newomen.com",
        description:
            "Lifestyle commerce for modern women — curated products, stories, and community in one calm experience.",
        color: "#f472b6",
    },
    {
        title: "DaddysCart",
        domain: "daddyscart.com",
        url: "https://daddyscart.com",
        description:
            "Saudi-first e-commerce — clear discovery, smooth checkout, and a retail feel that feels local.",
        logo: "/logos/daddyscart.png",
        color: "#34d399",
        image: "/generated_images/venture-daddyscart.png",
    },
    {
        title: "Arabclue",
        domain: "arabclue.com",
        url: "https://arabclue.com",
        description:
            "Regional market intelligence — turning complex data into plain-language insights teams can act on.",
        logo: "/logos/arabclue.png",
        color: "#a855f7",
        image: "/generated_images/venture-arabclue.png",
    },
    {
        title: "MSAN AI",
        domain: "msanai.com",
        url: "https://msanai.com",
        description:
            "Applied AI studio — custom agents, RAG systems, and automations for ambitious teams in the region.",
        color: "#22d3ee",
    },
];

export const ventureBulletPoints = [
    "Start with the outcome — then pick the stack that fits",
    "Ship a usable first version, then iterate with real users",
    "Keep scope honest so launch dates stay real",
    "Stay with you from first idea through launch and iteration",
];

// ---------------------------------------------------------------------------
// Corporate Leadership (icons must remain in the component — they are JSX)
// ---------------------------------------------------------------------------

export const leadershipRoles = [
    {
        company: "5S Logistics",
        role: "Head of Business Development",
        period: "Sep 2022 – 2025",
        points: [
            "Built AI-first digital platforms for enterprise clients across KSA",
            "Closed $10M+ in strategic B2B software and automation partnerships",
            "Added $1M+ in annual revenue through new SaaS service lines",
            "Led cross-functional engineering teams on government and enterprise RFPs",
            "Rolled out automations that cut manual processing time by ~40%",
        ],
    },
    {
        company: "Hubex (Noon.com 3PL Partner)",
        role: "Chief Operating Officer",
        period: "Feb 2021 – Sep 2022",
        points: [
            "Owned technology across 9 large-scale fulfillment facilities (~1M sqft)",
            "Ran software systems supporting 30K–45K daily e-commerce orders",
            "Built and mentored cross-functional tech and operations teams",
            "Stood up cloud infrastructure for nationwide 3PL operations",
            "Held 99.2% uptime and SLA compliance through seasonal peak volumes",
        ],
    },
];

// ---------------------------------------------------------------------------
// Career Timeline
// ---------------------------------------------------------------------------

export const timelineEvents: TimelineEvent[] = [
    {
        role: "General Manager",
        company: "SafeBox",
        highlights: [
            "Led regional technical operations, SaaS P&L, and digital growth programs",
            "Built go-to-market playbooks for new software-enabled service lines",
        ],
    },
    {
        role: "Regional Operations Manager",
        company: "Safe Arrival",
        highlights: [
            "Launched a 32,000 m² automated fulfillment center with custom software",
            "Grew digital transaction volume by 200% in the first quarter",
            "Delivered 30% YoY revenue growth through better systems and process design",
            "Cleared 75% of process backlogs with re-engineering and automation",
        ],
    },
    {
        role: "Operations Manager",
        company: "SLS Express",
        highlights: [
            "Ran multi-city digital delivery networks at high daily volume",
            "Built real-time fleet tracking apps and AI-assisted route optimization",
        ],
    },
    {
        role: "Operations Supervisor",
        company: "SLS Express",
        highlights: [
            "Oversaw API integrations for cross-dock ops with 300+ daily movements",
            "Cut average data processing time by 18% with automation scripts",
        ],
    },
    {
        role: "Inventory Supervisor",
        company: "Jollychic",
        highlights: [
            "Rolled out warehouse tech tooling and training for large e-commerce ops",
            "Kept 99.5% data accuracy across 500K+ SKUs with custom dashboards",
        ],
    },
    {
        role: "Inbound Supervisor",
        company: "Jollychic",
        highlights: [
            "Trained teams on ERP workflows and held 99%+ automated SLA compliance",
            "Automated inbound processing for 50K+ units daily during peak promotions",
        ],
    },
    {
        role: "Direct Sales Supervisor",
        company: "Callem Middle East",
        highlights: [
            "Built and coached high-performing B2C acquisition teams",
            "Consistently beat quarterly revenue targets by 25%",
        ],
    },
];

// ---------------------------------------------------------------------------
// Competencies (icons remain in the component — they are JSX)
// ---------------------------------------------------------------------------

export const competencyNames = [
    "Full-stack apps & websites",
    "AI solutions & GPT integrations",
    "Workflow automation (Make, Zapier, n8n)",
    "SaaS architecture & infrastructure",
    "E-commerce platforms & scaling",
    "Operations & process design",
    "Business intelligence & analytics",
];

export const professionalStrengths = [
    "Writes clear interfaces people understand on the first try",
    "Prefers calm systems over clever complexity",
    "Owns delivery end-to-end — design, build, launch, iterate",
    "Builds sturdy infrastructure from the first prototype onward",
    "Pairs technical craft with practical founder experience",
];

// ---------------------------------------------------------------------------
// Education & Certifications
// ---------------------------------------------------------------------------

export const education = {
    degree: "Bachelor of Business Administration (BBA)",
    institution: "University of the Punjab",
    location: "Lahore, Pakistan",
};

export const certifications = [
    "CPSM — Certified Professional in Supply Management",
    "Harvard Business School Online – Leadership & Management",
    "Six Sigma Black Belt",
    "Six Sigma Green Belt",
    "Project Management Professional (PMP)",
    "Business Analyst Certification",
    "Full-Stack Web Development Bootcamp",
    "Business Intelligence Specialist",
    "Digital Transformation Certificate",
    "AWS Certified Solutions Architect",
    "Advanced Workflow Automation (Make/Zapier)",
    "AI Solutions & Prompt Engineering",
];

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

export const WHATSAPP_NUMBER = "+966599996575";
export const WHATSAPP_NUMBER_RAW = "966599996575"; // wa.me format
export const WHATSAPP_DISPLAY = "+966 59 999 6575";
export const EMAIL_ADDRESS = "abdullah@mirxaa.com";

export const whatsappCtaMessage =
    "Hi Abdullah — I'd love to chat about a project.";

/** Prefill used when sharing an Aria-generated PRD over WhatsApp */
export const buildWhatsappPrdMessage = (summary: string): string =>
    `Hi Abdullah — here's a PRD I shaped with Aria:\n\n${summary}\n\nCan we discuss next steps?`;

/** Builds a wa.me deep link with a prefilled message */
export const buildWhatsappLink = (message: string = whatsappCtaMessage): string =>
    `https://wa.me/${WHATSAPP_NUMBER_RAW}?text=${encodeURIComponent(message)}`;

export const contactInfo: ContactInfo[] = [
    {
        type: "email",
        label: "Email",
        value: EMAIL_ADDRESS,
        displayValue: EMAIL_ADDRESS,
        href: `mailto:${EMAIL_ADDRESS}`,
    },
    {
        type: "whatsapp",
        label: "WhatsApp / Phone",
        value: WHATSAPP_NUMBER,
        displayValue: WHATSAPP_DISPLAY,
        href: buildWhatsappLink(),
    },
    {
        type: "location",
        label: "Based in",
        value: "Riyadh, Saudi Arabia",
        displayValue: "Riyadh, Saudi Arabia",
    },
];

// ---------------------------------------------------------------------------
// Social Links
// ---------------------------------------------------------------------------

export const socialLinks: SocialLink[] = [
    {
        name: "LinkedIn",
        href: LINKEDIN_URL,
        handle: "abdullahmirxa",
    },
    {
        name: "WhatsApp",
        href: buildWhatsappLink(),
        handle: WHATSAPP_DISPLAY,
    },
    {
        name: "Email",
        href: `mailto:${EMAIL_ADDRESS}`,
        handle: EMAIL_ADDRESS,
    },
];

// ---------------------------------------------------------------------------
// Services & Pricing (single source of truth for Services section + chat agent)
// USD base — SAR auto-derived (USD * 3.75) inside the pricing engine.
// ---------------------------------------------------------------------------

export const SAR_PER_USD = 3.75;

export const services: Service[] = [
    {
        id: "landing",
        title: "Landing & Marketing Sites",
        tagline: "Conversion-focused web presence",
        description:
            "Fast, conversion-minded marketing sites — clear storytelling, strong SEO foundations, and a polished brand feel.",
        icon: "Globe",
        color: "var(--color-electric-blue)",
        tiers: [
            {
                name: "MVP",
                description: "Single-page launch site with core sections",
                usdMin: 1500,
                usdMax: 2500,
                weeksMin: 1,
                weeksMax: 2,
                features: ["Responsive design", "SEO basics", "Contact form", "Analytics"],
            },
            {
                name: "Standard",
                description: "Multi-page site with CMS and animations",
                usdMin: 2500,
                usdMax: 4000,
                weeksMin: 2,
                weeksMax: 3,
                features: ["CMS integration", "Custom animations", "Blog", "Lead capture"],
            },
            {
                name: "Enterprise",
                description: "Brand site with personalization & A/B testing",
                usdMin: 4000,
                usdMax: 8000,
                weeksMin: 3,
                weeksMax: 5,
                features: ["A/B testing", "Personalization", "Multi-language", "CRM sync"],
            },
        ],
    },
    {
        id: "web_app",
        title: "Web Applications",
        tagline: "SaaS, dashboards & internal tools",
        description:
            "Full-stack web platforms with auth, dashboards, integrations, and infrastructure you can trust in production.",
        icon: "Layers",
        color: "var(--color-electric-blue)",
        tiers: [
            {
                name: "MVP",
                description: "Lean MVP with core feature set & auth",
                usdMin: 5000,
                usdMax: 12000,
                weeksMin: 4,
                weeksMax: 8,
                features: ["Auth", "Database", "Core CRUD", "Basic dashboard"],
            },
            {
                name: "Standard",
                description: "Production app with payments & integrations",
                usdMin: 12000,
                usdMax: 25000,
                weeksMin: 8,
                weeksMax: 14,
                features: [
                    "Payments",
                    "Role-based access",
                    "API integrations",
                    "Admin panel",
                    "Email automation",
                ],
            },
            {
                name: "Enterprise",
                description: "Multi-tenant SaaS with advanced workflows",
                usdMin: 25000,
                usdMax: 60000,
                weeksMin: 14,
                weeksMax: 26,
                features: [
                    "Multi-tenant",
                    "SSO / SAML",
                    "Audit logs",
                    "Advanced analytics",
                    "Webhook ecosystem",
                ],
            },
        ],
    },
    {
        id: "mobile_app",
        title: "Mobile Apps (iOS & Android)",
        tagline: "Cross-platform native experiences",
        description:
            "Cross-platform iOS and Android apps with offline support, push notifications, and store-ready polish.",
        icon: "Smartphone",
        color: "var(--color-muted-gold)",
        tiers: [
            {
                name: "MVP",
                description: "Cross-platform MVP, single store launch",
                usdMin: 8000,
                usdMax: 18000,
                weeksMin: 6,
                weeksMax: 10,
                features: ["iOS + Android", "Auth", "Push notifications", "Core flows"],
            },
            {
                name: "Standard",
                description: "Production app with payments & API backend",
                usdMin: 18000,
                usdMax: 35000,
                weeksMin: 10,
                weeksMax: 18,
                features: ["In-app purchases", "Backend API", "Offline mode", "Deep linking"],
            },
            {
                name: "Enterprise",
                description: "Complex app with native modules & integrations",
                usdMin: 35000,
                usdMax: 80000,
                weeksMin: 18,
                weeksMax: 32,
                features: [
                    "Native modules",
                    "Real-time sync",
                    "AR / camera SDKs",
                    "Enterprise auth",
                    "Multi-region",
                ],
            },
        ],
    },
    {
        id: "ai_integration",
        title: "AI Integrations & Custom Agents",
        tagline: "GPT, RAG, agents & copilots",
        description:
            "Custom AI agents, RAG pipelines, GPT features, and copilots woven gently into the products your team already uses.",
        icon: "Sparkles",
        color: "#a855f7",
        tiers: [
            {
                name: "MVP",
                description: "Chatbot or single AI feature",
                usdMin: 4000,
                usdMax: 10000,
                weeksMin: 3,
                weeksMax: 6,
                features: ["GPT integration", "Prompt engineering", "Basic UI"],
            },
            {
                name: "Standard",
                description: "RAG system or multi-step agent",
                usdMin: 10000,
                usdMax: 25000,
                weeksMin: 6,
                weeksMax: 12,
                features: ["RAG / vector DB", "Tool use", "Streaming", "Eval suite"],
            },
            {
                name: "Enterprise",
                description: "Production AI platform with agents & guardrails",
                usdMin: 25000,
                usdMax: 70000,
                weeksMin: 12,
                weeksMax: 24,
                features: [
                    "Multi-agent",
                    "Fine-tuning",
                    "Guardrails",
                    "Cost tracking",
                    "Compliance",
                ],
            },
        ],
    },
    {
        id: "automation",
        title: "Workflow Automation",
        tagline: "n8n, Make, Zapier & custom",
        description:
            "End-to-end ops automation that quietly removes busywork — across Make, Zapier, n8n, and custom scripts.",
        icon: "Zap",
        color: "#34d399",
        tiers: [
            {
                name: "MVP",
                description: "Single critical workflow",
                usdMin: 1000,
                usdMax: 4000,
                weeksMin: 1,
                weeksMax: 3,
                features: ["1–3 integrations", "Basic logic", "Notifications"],
            },
            {
                name: "Standard",
                description: "Multi-workflow operations stack",
                usdMin: 4000,
                usdMax: 10000,
                weeksMin: 3,
                weeksMax: 6,
                features: ["5–10 workflows", "Error handling", "Dashboards", "AI steps"],
            },
            {
                name: "Enterprise",
                description: "Enterprise automation platform",
                usdMin: 10000,
                usdMax: 30000,
                weeksMin: 6,
                weeksMax: 14,
                features: [
                    "Custom n8n nodes",
                    "Self-hosted infra",
                    "SLA monitoring",
                    "Audit trail",
                ],
            },
        ],
    },
    {
        id: "ecommerce",
        title: "E-Commerce Platforms",
        tagline: "Shopify, custom & headless",
        description:
            "Online stores and marketplaces tuned for conversion — Shopify, headless, or fully custom when you need it.",
        icon: "ShoppingCart",
        color: "#f59e0b",
        tiers: [
            {
                name: "MVP",
                description: "Branded store on Shopify or similar",
                usdMin: 6000,
                usdMax: 15000,
                weeksMin: 4,
                weeksMax: 8,
                features: ["Theme customization", "Payments", "Inventory", "Email flows"],
            },
            {
                name: "Standard",
                description: "Custom storefront with integrations",
                usdMin: 15000,
                usdMax: 35000,
                weeksMin: 8,
                weeksMax: 16,
                features: [
                    "Headless storefront",
                    "ERP integration",
                    "Loyalty",
                    "Multi-currency",
                ],
            },
            {
                name: "Enterprise",
                description: "Multi-vendor marketplace platform",
                usdMin: 35000,
                usdMax: 90000,
                weeksMin: 16,
                weeksMax: 30,
                features: [
                    "Multi-vendor",
                    "Custom checkout",
                    "Fulfillment integrations",
                    "Analytics suite",
                ],
            },
        ],
    },
    {
        id: "saas",
        title: "Custom SaaS Platforms",
        tagline: "Zero-to-one product engineering",
        description:
            "Zero-to-one product engineering — from validation and MVP through billing, scale, and enterprise readiness.",
        icon: "Rocket",
        color: "var(--color-electric-blue)",
        tiers: [
            {
                name: "MVP",
                description: "Validated MVP ready for first customers",
                usdMin: 8000,
                usdMax: 20000,
                weeksMin: 6,
                weeksMax: 12,
                features: ["Auth", "Billing", "Core product", "Onboarding"],
            },
            {
                name: "Standard",
                description: "Funded-stage SaaS with full feature set",
                usdMin: 20000,
                usdMax: 50000,
                weeksMin: 12,
                weeksMax: 24,
                features: [
                    "Subscription billing",
                    "Team accounts",
                    "Integrations marketplace",
                    "Analytics",
                ],
            },
            {
                name: "Enterprise",
                description: "Enterprise-ready SaaS with compliance",
                usdMin: 50000,
                usdMax: 150000,
                weeksMin: 24,
                weeksMax: 48,
                features: [
                    "SSO / SAML",
                    "SOC2 readiness",
                    "Multi-region",
                    "Custom SLAs",
                    "Dedicated infra",
                ],
            },
        ],
    },
];
