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
    { name: "Profile", href: "#executive-profile" },
    { name: "Ventures", href: "#ventures" },
    { name: "Services", href: "#services" },
    { name: "Leadership", href: "#leadership" },
    { name: "Expertise", href: "#competencies" },
    { name: "Contact", href: "#contact" },
];

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const heroTagline = "Founder · Operator · Architect";

export const typewriterText =
    "Serial entrepreneur and developer with 11 years of experience building custom apps and websites, engineering AI-powered solutions, and creating automated workflows that scale businesses effortlessly.";

export const heroExpertise = [
    "Full-Stack App & Website Development",
    "Custom AI Solutions & Integrations",
    "Automated Workflows & Process Engineering",
];

export const heroNumbers = [
    "11+ Years of Entrepreneurial Experience",
    "4 High-Growth Ventures Founded",
    "Hundreds of Hours Saved via Automation",
];

// ---------------------------------------------------------------------------
// Executive Profile
// ---------------------------------------------------------------------------

export const stats: Stat[] = [
    { value: 11, suffix: "+", prefix: "", label: "Years of Experience" },
    { value: 4, prefix: "", label: "Ventures Founded" },
    { value: 50, prefix: "", suffix: "+", label: "Automated Workflows" },
    { value: 100, prefix: "", suffix: "%", label: "Custom Solutions" },
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
            "Personal brand and creative studio of Abdullah Mirza — a hub for products, writing, and experiments at the intersection of AI and product engineering.",
        color: "#0066ff",
    },
    {
        title: "SourceKom",
        domain: "sourcekom.com",
        url: "https://sourcekom.com",
        description:
            "Enterprise-grade asset booking & exchange platform connecting industrial suppliers with procurement teams across Saudi Arabia.",
        logo: "/logos/sourcekom.png",
        color: "var(--color-electric-blue)",
        image: "/generated_images/venture-sourcekom.png",
    },
    {
        title: "HabibiStay",
        domain: "habibistay.com",
        url: "https://habibistay.com",
        description:
            "AI-enhanced hospitality marketplace transforming short-term rentals in KSA. Powered by SARA — an intelligent booking concierge.",
        logo: "/logos/habibistay.webp",
        color: "var(--color-muted-gold)",
        image: "/generated_images/venture-habibistay.png",
    },
    {
        title: "Newomen",
        domain: "newomen.com",
        url: "https://newomen.com",
        description:
            "Modern lifestyle and commerce destination crafted for the new-generation woman — curated products, content, and community in one experience.",
        color: "#f472b6",
    },
    {
        title: "DaddysCart",
        domain: "daddyscart.com",
        url: "https://daddyscart.com",
        description:
            "Full-stack e-commerce venture engineering next-generation digital retail experiences for the Saudi consumer.",
        logo: "/logos/daddyscart.png",
        color: "#34d399",
        image: "/generated_images/venture-daddyscart.png",
    },
    {
        title: "Arabclue",
        domain: "arabclue.com",
        url: "https://arabclue.com",
        description:
            "AI-powered digital intelligence engine turning regional market data into actionable business insights.",
        logo: "/logos/arabclue.png",
        color: "#a855f7",
        image: "/generated_images/venture-arabclue.png",
    },
    {
        title: "MSAN AI",
        domain: "msanai.com",
        url: "https://msanai.com",
        description:
            "Applied AI studio building bespoke agents, RAG pipelines, and intelligent automations for ambitious businesses across the region.",
        color: "#22d3ee",
    },
];

export const ventureBulletPoints = [
    "Engineering scalable Apps, Websites & SaaS platforms",
    "Integrating AI to unlock operational efficiency",
    "Automating workflows to reduce manual overhead",
    "Full product lifecycle — from ideation to deployment",
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
            "Architecting AI-first digital platforms for enterprise clients across KSA",
            "Closed $10M+ in strategic B2B software and automation partnerships",
            "Generated $1M+ incremental annual revenue through new SaaS verticals",
            "Leading cross-functional engineering teams for government & enterprise RFPs",
            "Deployed automated workflows resulting in 40% systemic optimization",
        ],
    },
    {
        company: "Hubex (Noon.com 3PL Partner)",
        role: "Chief Operating Officer",
        period: "Feb 2021 – Sep 2022",
        points: [
            "Directed technology infrastructure across 9 macro-facilities spanning ~1M sqft",
            "Orchestrated software systems handling 30K–45K daily e-commerce transactions",
            "Built and led cross-functional technical and operations teams",
            "Implemented end-to-end cloud infrastructure for nationwide 3PL operations",
            "Achieved 99.2% system uptime and SLA compliance under global peak surges",
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
            "Spearheading regional technical operations, SaaS P&L ownership, and digital growth initiatives",
            "Establishing software go-to-market frameworks for new service verticals",
        ],
    },
    {
        role: "Regional Operations Manager",
        company: "Safe Arrival",
        highlights: [
            "Launched a 32,000 m² automated fulfillment center powered by custom software systems",
            "Scaled digital transaction volume by 200% within the first quarter",
            "Delivered 30% YoY revenue growth through software-driven excellence",
            "Eliminated 75% of process backlogs via technical re-engineering and automation",
        ],
    },
    {
        role: "Operations Manager",
        company: "SLS Express",
        highlights: [
            "Managed high-volume digital delivery networks spanning multiple cities",
            "Architected real-time fleet tracking apps and AI-driven route optimization algorithms",
        ],
    },
    {
        role: "Operations Supervisor",
        company: "SLS Express",
        highlights: [
            "Supervised API integrations for cross-dock operations with 300+ daily systemic movements",
            "Reduced average data processing time by 18% through workflow automation scripts",
        ],
    },
    {
        role: "Inventory Supervisor",
        company: "Jollychic",
        highlights: [
            "Led tech implementation for staff across large-scale e-commerce warehouse operations",
            "Maintained 99.5% systemic data accuracy across 500K+ digital SKUs via custom dashboards",
        ],
    },
    {
        role: "Inbound Supervisor",
        company: "Jollychic",
        highlights: [
            "Directed staff training on custom ERPs ensuring 99%+ automated SLA compliance",
            "Automated processing for 50K+ units daily during peak technical promotional periods",
        ],
    },
    {
        role: "Direct Sales Supervisor",
        company: "Callem Middle East",
        highlights: [
            "Built and managed high-performance SaaS B2C acquisition teams",
            "Exceeded quarterly software revenue targets by 25% consistently",
        ],
    },
];

// ---------------------------------------------------------------------------
// Competencies (icons remain in the component — they are JSX)
// ---------------------------------------------------------------------------

export const competencyNames = [
    "Full-Stack App & Website Development",
    "AI Solutions & GPT Integrations",
    "Automated Workflows (Make, Zapier, n8n)",
    "SaaS Architecture & Infrastructure",
    "E-Commerce Scaling & Platforms",
    "Operational Process Engineering",
    "Business Intelligence & Analytics",
];

export const professionalStrengths = [
    "Builds elegant, high-performing websites and mobile apps",
    "Automates repetitive tasks to save hundreds of hours",
    "Integrates cutting-edge AI to solve complex business problems",
    "Architects scalable infrastructure from zero-to-one",
    "Pairs technical execution with deep entrepreneurial strategy",
];

// ---------------------------------------------------------------------------
// Education & Certifications
// ---------------------------------------------------------------------------

export const certifications = [
    "CPSM",
    "Harvard Business School Online – Leadership & Management",
    "Six Sigma Black Belt",
    "Six Sigma Green Belt",
    "Project Management Professional (PMP)",
    "Business Analyst Certification",
    "Full-Stack Web Development Bootcamp",
    "BI Specialist",
    "Digital Transformation",
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
export const EMAIL_ADDRESS = "Abdullah@mirxaa.com";

export const whatsappCtaMessage =
    "Hi Abdullah, I'd like to discuss a project with you.";

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
        label: "WhatsApp",
        value: WHATSAPP_NUMBER,
        displayValue: WHATSAPP_DISPLAY,
        href: buildWhatsappLink(),
    },
    {
        type: "phone",
        label: "Direct Line",
        value: WHATSAPP_NUMBER,
        displayValue: WHATSAPP_DISPLAY,
        href: `tel:${WHATSAPP_NUMBER}`,
    },
    {
        type: "location",
        label: "Location",
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
        href: "https://www.linkedin.com/in/abdullahmirxa/",
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
            "Pixel-perfect, blazing-fast marketing sites engineered for conversion, SEO, and brand storytelling.",
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
            "Full-stack web platforms with authentication, dashboards, integrations, and production-grade infrastructure.",
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
            "React Native and native iOS/Android apps with offline support, push notifications, and store-ready polish.",
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
            "Custom AI agents, RAG pipelines, GPT integrations, and intelligent copilots embedded into your product.",
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
            "Automate operations end-to-end. Save hundreds of hours with custom workflows across every tool you use.",
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
            "Conversion-tuned online stores, headless commerce, and custom marketplaces engineered to scale.",
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
            "End-to-end product engineering — from validation to scaled architecture, billing, and enterprise readiness.",
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
