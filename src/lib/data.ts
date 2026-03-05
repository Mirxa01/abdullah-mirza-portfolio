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
} from "./types";

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const navLinks: NavLink[] = [
    { name: "Profile", href: "#executive-profile" },
    { name: "Ventures", href: "#ventures" },
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
        title: "SourceKom",
        description:
            "Enterprise-grade asset booking & exchange platform connecting industrial suppliers with procurement teams across Saudi Arabia.",
        logo: "/logos/sourcekom.png",
        color: "var(--color-electric-blue)",
        image: "/generated_images/venture-sourcekom.png",
    },
    {
        title: "HabibiStay",
        description:
            "AI-enhanced hospitality marketplace transforming short-term rentals in KSA. Powered by SARA — an intelligent booking concierge.",
        logo: "/logos/habibistay.webp",
        color: "var(--color-muted-gold)",
        image: "/generated_images/venture-habibistay.png",
    },
    {
        title: "Arabclue",
        description:
            "AI-powered digital intelligence engine turning regional market data into actionable business insights.",
        logo: "/logos/arabclue.png",
        color: "#a855f7",
        image: "/generated_images/venture-arabclue.png",
    },
    {
        title: "DaddysCart",
        description:
            "Full-stack e-commerce venture engineering next-generation digital retail experiences for the Saudi consumer.",
        logo: "/logos/daddyscart.png",
        color: "#34d399",
        image: "/generated_images/venture-daddyscart.png",
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
        period: "Sep 2022 – Present",
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

export const contactInfo: ContactInfo[] = [
    {
        type: "email",
        label: "Email",
        value: "abdullahmirxa786@gmail.com",
        displayValue: "abdullahmirxa786@gmail.com",
    },
    {
        type: "phone",
        label: "Direct Line",
        value: "+966599996575",
        displayValue: "+966 59 999 6575",
    },
    {
        type: "location",
        label: "Location",
        value: "Riyadh, Saudi Arabia",
        displayValue: "Riyadh, Saudi Arabia",
    },
];
