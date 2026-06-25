import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Github,
  ArrowUpRight,
  Lock,
  ChevronDown,
  ChevronUp,
  Zap,
  Globe,
  User,
  Building2,
  Shield,
  Terminal,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
//
// Data model notes:
// - `screenshot` replaces the old `image` field. No stock photography —
//   if it's null/missing, the UI renders a designed code-pattern panel,
//   never a placeholder photo.
// - `role`, `duration`, `client`, `myContributions` exist so the section
//   reads as a case study (what did you actually do) rather than a
//   gallery (here's a picture of a website).
// - `outcome` is a single plain-language result sentence, distinct from
//   `metrics` (which stays numeric/scannable).
// - NDA/private rendering currently falls back to the same code-pattern
//   panel used for "no screenshot yet" — a dedicated redacted-document
//   treatment is intentionally deferred (see PrivateState stub below).

const projects = [
  {
    id: "mazingira",
    title: "Mazingira",
    type: "Full Stack",
    status: "live",
    featured: true,
    year: "2024",
    color: "#34d399",
    role: "Solo developer",
    duration: "3 months",
    client: "Independent / community conservation groups",
    context:
      "A platform for local conservation groups to coordinate environmental initiatives and track impact across counties.",
    problem:
      "Conservation groups lacked a shared tool to coordinate efforts or see environmental data in real time — work was scattered across spreadsheets and WhatsApp groups.",
    solution:
      "Built a collaborative platform with live monitoring dashboards, community-submitted reports, and geo-tagged initiative tracking.",
    myContributions: [
      "Designed and built the full REST API in Flask, including report submission and geo-tagging endpoints",
      "Built the data visualization layer in Recharts for county-level impact tracking",
      "Set up PostgreSQL schema and query optimization for time-series environmental data",
    ],
    outcome:
      "Adopted by community groups across 12 counties, with 3,000+ active users coordinating initiatives through the platform.",
    tech: {
      Frontend: ["React", "TypeScript", "Recharts"],
      Backend: ["Flask", "PostgreSQL", "REST API"],
    },
    metrics: [
      { value: "3K+", label: "Active users" },
      { value: "12", label: "Counties covered" },
    ],
    screenshot: null,
    screenshotAlt:
      "Mazingira dashboard showing county-level environmental data",
    live: "https://react-mazingira.vercel.app/",
    github: "https://github.com/nahashon-source/frontend-mazingira.git",
  },
  {
    id: "fit-logistics",
    title: "Freight In Time Website",
    type: "Enterprise",
    status: "live",
    featured: true,
    year: "2024",
    color: "#6366f1",
    role: "Solo developer",
    duration: "4 months",
    client: "Freight In Time (regional logistics company)",
    context:
      "Public-facing site and quoting system for a logistics company operating across 10 East African countries.",
    problem:
      "Manual freight quoting was slow and error-prone, losing leads and frustrating customers across 10 operating countries.",
    solution:
      "Built a quote engine backed by FastAPI and the FiT Express API, with reCAPTCHA abuse protection, cold-start handling for the hosting tier, and a conversational AI assistant for common customer questions.",
    myContributions: [
      "Built the FastAPI quote engine and integrated it with the FiT Express API",
      "Handled cold-start latency on the free hosting tier with a warm-up strategy to keep quote response under 2 seconds",
      "Implemented reCAPTCHA and rate-limiting to stop quote-form abuse",
    ],
    outcome:
      "Quote requests now return in under 2 seconds across all 10 served countries, replacing a manual email-based process.",
    tech: {
      Frontend: ["React", "Vite", "Tailwind"],
      Backend: ["FastAPI", "Python", "MySQL"],
      Infra: ["Render", "Vercel", "Hostgator"],
    },
    metrics: [
      { value: "10", label: "Countries served" },
      { value: "<2s", label: "Quote response" },
    ],
    screenshot: null,
    screenshotAlt: "Freight In Time quote request interface",
    live: "https://freightintime.net",
    github: "",
  },
  {
    id: "azure-idm",
    title: "Azure Identity Management",
    type: "Enterprise",
    status: "production",
    featured: true,
    year: "2023",
    color: "#22d3ee",
    role: "Solo developer",
    duration: "2 months",
    client: "Freight In Time (internal IT)",
    context:
      "Internal tool automating Azure AD account provisioning and access control for a multi-office company.",
    problem:
      "IT manually provisioned hundreds of accounts monthly across offices, creating security gaps and onboarding delays of several days per hire.",
    solution:
      "Automated the full provisioning lifecycle through the Microsoft Graph API — role assignment, group sync, and access expiry in one auditable workflow.",
    myContributions: [
      "Integrated Microsoft Graph API for automated AD account provisioning",
      "Built role-assignment and group-sync logic with full audit logging",
      "Designed access-expiry rules to remove the manual offboarding step",
    ],
    outcome:
      "Cut account provisioning time by roughly 90% and eliminated manual provisioning errors.",
    tech: {
      Backend: ["Laravel", "PHP", "SQL Server"],
      Identity: ["Azure AD", "Microsoft Graph API"],
    },
    metrics: [
      { value: "90%", label: "Faster provisioning" },
      { value: "0", label: "Manual errors" },
    ],
    screenshot: null,
    screenshotAlt: null,
    live: "https://bizuat.freightintime.com",
    github: "",
    private: true,
  },
  {
    id: "fit-erp",
    title: "FIT Logistics ERP Portal",
    type: "Corporate",
    status: "production",
    featured: true,
    year: "2023",
    color: "#a78bfa",
    role: "Solo developer",
    duration: "6 months",
    client: "Freight In Time (6 branch offices)",
    context:
      "Internal ERP/CRM unifying quotation management, customer history, and job tracking across branch offices.",
    problem:
      "Disconnected spreadsheets and emails made it impossible to track shipment status, customer history, or team performance across offices.",
    solution:
      "Built a unified platform on a stored-procedure-driven data layer, with role-based dashboards and real-time job tracking across all branches.",
    myContributions: [
      "Designed the role-based dashboard system used by all 6 offices",
      "Worked within existing stored procedures for the data layer rather than duplicating logic in application code",
      "Built real-time job-status tracking across branch offices",
    ],
    outcome:
      "Unified operations across 6 offices and cut administrative overhead by roughly 40%.",
    tech: {
      Backend: ["Laravel", "PHP", "SQL Server", "MySQL"],
      API: ["REST API", "Stored Procedures"],
    },
    metrics: [
      { value: "6", label: "Offices unified" },
      { value: "40%", label: "Less admin time" },
    ],
    screenshot: null,
    screenshotAlt: null,
    live: "https://bizuat.freightintime.com",
    github: "",
    private: true,
  },
  {
    id: "login-tracker",
    title: "Login Activity Tracker",
    type: "Enterprise",
    status: "in-use",
    featured: false,
    year: "2023",
    color: "#f59e0b",
    role: "Solo developer",
    duration: "3 weeks",
    client: "Freight In Time (internal IT)",
    context:
      "Sign-in analytics across enterprise apps to flag inactive accounts and surface access patterns for security review.",
    outcome:
      "Gave IT visibility into inactive accounts that previously went unnoticed for months.",
    myContributions: [
      "Built sign-in event aggregation across multiple enterprise applications",
      "Added inactive-user detection to flag stale accounts for review",
    ],
    tech: { Stack: ["Laravel", "PHP", "SQL Server", "Azure AD"] },
    screenshot: null,
    screenshotAlt: null,
    live: "https://bizuat.freightintime.com",
    github: "",
    private: true,
  },
  {
    id: "ecommerce",
    title: "E-Commerce 2.0",
    type: "Full Stack",
    status: "live",
    featured: false,
    year: "2024",
    color: "#ec4899",
    role: "Solo developer",
    duration: "6 weeks",
    client: "Personal project",
    context:
      "A storefront built to practice production-grade payment handling and order state management.",
    outcome:
      "Fully functional checkout flow with real Stripe payments and live order tracking.",
    myContributions: [
      "Integrated Stripe Checkout and webhook-driven order status updates",
      "Built inventory management with stock-level guards on checkout",
    ],
    tech: { Stack: ["Next.js", "Stripe", "PostgreSQL"] },
    screenshot: null,
    screenshotAlt: "E-Commerce 2.0 storefront",
    live: "https://e-commerce-2-0-coral.vercel.app/",
    github: "https://github.com/nahashon-source/E-commerce-2.0.git",
  },
  {
    id: "fittrack",
    title: "FitTrack",
    type: "Personal",
    status: "live",
    featured: false,
    year: "2024",
    color: "#34d399",
    role: "Solo developer",
    duration: "4 weeks",
    client: "Personal project",
    context:
      "A home workout app with personalized plans and session tracking, built to explore MongoDB schema design for user progress data.",
    outcome: "Working plan-generation and progress-tracking flow end to end.",
    myContributions: [
      "Designed the MongoDB schema for workout plans and progress history",
      "Built the session-tracking and progress-visualization flow",
    ],
    tech: { Stack: ["React", "Node.js", "Express", "MongoDB"] },
    screenshot: null,
    screenshotAlt: "FitTrack workout tracking interface",
    live: "https://lucent-malabi-881720.netlify.app/",
    github: "https://github.com/nahashon-source/FItness.git",
  },
  {
    id: "moviebox",
    title: "MovieBox",
    type: "Frontend",
    status: "live",
    featured: false,
    year: "2023",
    color: "#f97316",
    role: "Solo developer",
    duration: "2 weeks",
    client: "Personal project",
    context:
      "A movie discovery app built to practice consuming a third-party API cleanly and handling its rate limits.",
    outcome:
      "Search, detail views, and saved favorites against a live external API.",
    myContributions: [
      "Built search and favorites against a rate-limited external movie API",
      "Handled API error and empty states across the UI",
    ],
    tech: { Stack: ["React", "JavaScript", "Axios", "Material-UI"] },
    screenshot: null,
    screenshotAlt: "MovieBox movie search interface",
    live: "https://movies-box-t3b2.vercel.app/",
    github: "https://github.com/Willigers1/movies-box.git",
  },
  {
    id: "dynamic-parcel",
    title: "Dynamic Parcel EA",
    type: "Corporate",
    status: "live",
    featured: false,
    year: "2024",
    color: "#22d3ee",
    role: "Solo developer",
    duration: "5 weeks",
    client: "Dynamic Parcel (East Africa courier service)",
    context:
      "Public site for a courier and parcel delivery service operating across East Africa.",
    outcome: "Live regional site handling delivery service inquiries.",
    myContributions: [
      "Built the responsive marketing site and service pages in TypeScript/React",
      "Implemented the Tailwind design system used across all pages",
    ],
    tech: { Stack: ["TypeScript", "React", "Tailwind CSS"] },
    screenshot: null,
    screenshotAlt: "Dynamic Parcel EA homepage",
    live: "https://dynamicparcelea.com/",
    github: "",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  live: { label: "Live", color: "#34d399", pulse: true },
  production: { label: "Production", color: "#6366f1", pulse: true },
  "in-use": { label: "In Use", color: "#f59e0b", pulse: false },
  completed: { label: "Completed", color: "#94a3b8", pulse: false },
};

const TYPE_ICON = {
  "Full Stack": Globe,
  Enterprise: Shield,
  Corporate: Building2,
  Frontend: Zap,
  Personal: User,
};

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
};

// ─── Ticker ───────────────────────────────────────────────────────────────────

const ALL_TAGS = [
  "React",
  "TypeScript",
  "FastAPI",
  "Python",
  "Laravel",
  "PHP",
  "PostgreSQL",
  "MySQL",
  "SQL Server",
  "Azure AD",
  "Next.js",
  "Stripe",
  "Node.js",
  "MongoDB",
  "Tailwind CSS",
  "Framer Motion",
  "Microsoft Graph API",
  "Vite",
  "REST API",
  "Flask",
];

const Ticker = ({ reduceMotion }) => {
  const duplicated = [...ALL_TAGS, ...ALL_TAGS];
  return (
    <div
      className="relative overflow-hidden py-3 mb-16"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
      aria-hidden="true"
    >
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={reduceMotion ? {} : { x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {duplicated.map((tag, i) => (
          <span
            key={i}
            className="text-[11px] font-mono tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.12)" }}
          >
            {tag}
            <span className="ml-6" style={{ color: "rgba(255,255,255,0.05)" }}>
              ·
            </span>
          </span>
        ))}
      </motion.div>
      <div
        className="absolute inset-y-0 left-0 w-24 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #060A0F, transparent)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-24 pointer-events-none"
        style={{ background: "linear-gradient(to left, #060A0F, transparent)" }}
      />
    </div>
  );
};

// ─── Status Badge ─────────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.completed;
  const rgb = hexToRgb(cfg.color);
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
      style={{
        background: `rgba(${rgb}, 0.08)`,
        border: `1px solid rgba(${rgb}, 0.22)`,
        color: cfg.color,
      }}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.pulse ? "animate-pulse" : ""}`}
        style={{ background: cfg.color }}
      />
      {cfg.label}
    </span>
  );
};

// ─── Tech Pills ───────────────────────────────────────────────────────────────

const TechPills = ({ tech, color }) => {
  const rgb = hexToRgb(color);
  const allTags = Object.values(tech).flat();
  return (
    <div className="flex flex-wrap gap-1.5">
      {allTags.map((tag) => (
        <span
          key={tag}
          className="px-2 py-0.5 rounded-full text-[10px] font-medium"
          style={{
            background: `rgba(${rgb}, 0.06)`,
            border: `1px solid rgba(${rgb}, 0.15)`,
            color: `rgba(${rgb}, 0.75)`,
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

// ─── Code-pattern fallback panel ───────────────────────────────────────────────
//
// Renders in place of a screenshot whenever `screenshot` is null — covers
// both "no screenshot captured yet" and "private/NDA" cases for now.
// Deliberately code-flavored rather than a generic placeholder icon, since
// it should look like a designed choice, not a missing asset.
//
// NOTE: dedicated NDA/redacted-document treatment is pending — see plan.
// This is the shared fallback both cases currently use.

const CodePatternPanel = ({ project }) => {
  const rgb = hexToRgb(project.color);
  const isPrivate = Boolean(project.private);

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center px-8 py-10"
      style={{
        background: `linear-gradient(135deg, rgba(${rgb},0.08), rgba(${rgb},0.015))`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(${rgb},0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(${rgb},0.6) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <Terminal
        size={22}
        style={{ color: `rgba(${rgb}, 0.4)` }}
        className="mb-4 relative z-10"
        aria-hidden="true"
      />

      <p
        className="font-mono text-[11px] text-center leading-relaxed relative z-10"
        style={{ color: "rgba(255,255,255,0.3)", maxWidth: 220 }}
      >
        {isPrivate ? (
          <>
            <span style={{ color: `rgba(${rgb}, 0.55)` }}>access:</span>{" "}
            restricted
            <br />
            <span style={{ color: `rgba(${rgb}, 0.55)` }}>reason:</span> client
            NDA
          </>
        ) : (
          <>
            <span style={{ color: `rgba(${rgb}, 0.55)` }}>screenshot:</span>{" "}
            pending
            <br />
            <span style={{ color: `rgba(${rgb}, 0.55)` }}>
              visit live site →
            </span>
          </>
        )}
      </p>
    </div>
  );
};

// ─── Engineering notes (replaces image-side trivia in featured card) ──────────

const EngineeringNotes = ({ project }) => {
  const rgb = hexToRgb(project.color);
  if (!project.myContributions?.length) return null;

  return (
    <div
      className="h-full flex flex-col p-7"
      style={{ background: `rgba(${rgb}, 0.03)` }}
    >
      <div className="mb-5">
        <p
          className="text-[9px] font-bold tracking-[0.18em] uppercase mb-3"
          style={{ color: `rgba(${rgb}, 0.5)` }}
        >
          Engineering notes
        </p>
        <ul className="space-y-3">
          {project.myContributions.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[12px] leading-relaxed">
              <span
                className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full"
                style={{ background: project.color }}
                aria-hidden="true"
              />
              <span style={{ color: "rgba(255,255,255,0.45)" }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="mt-auto pt-5 grid grid-cols-2 gap-3"
        style={{ borderTop: `1px solid rgba(${rgb}, 0.1)` }}
      >
        <div>
          <p
            className="text-[9px] font-bold tracking-[0.15em] uppercase mb-1"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Role
          </p>
          <p
            className="text-[12px]"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {project.role}
          </p>
        </div>
        <div>
          <p
            className="text-[9px] font-bold tracking-[0.15em] uppercase mb-1"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Duration
          </p>
          <p
            className="text-[12px]"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {project.duration}
          </p>
        </div>
        {project.client && (
          <div className="col-span-2">
            <p
              className="text-[9px] font-bold tracking-[0.15em] uppercase mb-1"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Client
            </p>
            <p
              className="text-[12px]"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {project.client}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Featured Case Study Card ──────────────────────────────────────────────────

const FeaturedCard = ({ project, index, reduceMotion }) => {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const rgb = hexToRgb(project.color);
  const TypeIcon = TYPE_ICON[project.type] ?? Globe;
  const isEven = index % 2 === 0;
  const panelId = `${project.id}-challenge-panel`;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden"
      style={{
        background: "rgba(14,20,32,0.6)",
        border: `1px solid rgba(${rgb}, ${hovered ? 0.28 : 0.08})`,
        transition: "border-color 0.4s ease",
      }}
      aria-label={`Featured project: ${project.title}`}
    >
      {/* Ambient glow */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered && !reduceMotion ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: isEven
            ? `radial-gradient(ellipse 60% 50% at 20% 50%, rgba(${rgb}, 0.07) 0%, transparent 70%)`
            : `radial-gradient(ellipse 60% 50% at 80% 50%, rgba(${rgb}, 0.07) 0%, transparent 70%)`,
        }}
      />

      {/* Index watermark */}
      <div
        aria-hidden
        className="absolute top-6 right-8 font-black text-[100px] leading-none select-none pointer-events-none"
        style={{ color: `rgba(${rgb}, 0.04)`, letterSpacing: "-6px" }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div
        className={`flex flex-col lg:flex-row ${!isEven ? "lg:flex-row-reverse" : ""}`}
      >
        {/* Content */}
        <div className="flex-1 p-8 lg:p-10 flex flex-col justify-between relative z-10">
          <div>
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-2 mb-7">
              <span
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase"
                style={{
                  background: `rgba(${rgb}, 0.1)`,
                  border: `1px solid rgba(${rgb}, 0.25)`,
                  color: project.color,
                }}
              >
                ✦ Featured
              </span>
              <StatusBadge status={project.status} />
              <span
                className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                <TypeIcon size={10} aria-hidden="true" />
                {project.type}
              </span>
              <span
                className="ml-auto font-mono text-xs"
                style={{ color: "rgba(255,255,255,0.18)" }}
              >
                {project.year}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight mb-1 tracking-tight">
              {project.title}
            </h3>
            <p
              className="text-[13px] mb-5"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {project.role}
              {project.duration ? ` · ${project.duration}` : ""}
            </p>
            <p
              className="text-[13.5px] leading-relaxed mb-7"
              style={{ color: "rgba(255,255,255,0.38)", maxWidth: 460 }}
            >
              {project.context}
            </p>

            {/* Outcome line — promoted result, not buried in metrics */}
            {project.outcome && (
              <div
                className="mb-7 pl-4"
                style={{ borderLeft: `2px solid rgba(${rgb}, 0.35)` }}
              >
                <p
                  className="text-[13px] leading-relaxed italic"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {project.outcome}
                </p>
              </div>
            )}

            {/* Expandable problem/solution */}
            {(project.problem || project.solution) && (
              <div className="mb-7">
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="flex items-center gap-2 text-[11px] font-medium mb-0 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1420] focus-visible:ring-indigo-400"
                  style={{ color: "rgba(255,255,255,0.28)" }}
                  aria-expanded={expanded}
                  aria-controls={panelId}
                >
                  {expanded ? (
                    <ChevronUp size={12} aria-hidden="true" />
                  ) : (
                    <ChevronDown size={12} aria-hidden="true" />
                  )}
                  {expanded ? "Hide" : "Show"} challenge & approach
                </button>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      id={panelId}
                      role="region"
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={
                        reduceMotion
                          ? { opacity: 1 }
                          : { height: "auto", opacity: 1 }
                      }
                      exit={
                        reduceMotion
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid sm:grid-cols-2 gap-3 mt-4">
                        {project.problem && (
                          <div
                            className="rounded-xl p-4"
                            style={{
                              background: "rgba(251,191,36,0.04)",
                              border: "1px solid rgba(251,191,36,0.1)",
                            }}
                          >
                            <p
                              className="text-[9px] font-bold tracking-[0.18em] uppercase mb-2"
                              style={{ color: "rgba(251,191,36,0.45)" }}
                            >
                              Challenge
                            </p>
                            <p
                              className="text-[12px] leading-relaxed"
                              style={{ color: "rgba(255,255,255,0.38)" }}
                            >
                              {project.problem}
                            </p>
                          </div>
                        )}
                        {project.solution && (
                          <div
                            className="rounded-xl p-4"
                            style={{
                              background: `rgba(${rgb}, 0.04)`,
                              border: `1px solid rgba(${rgb}, 0.1)`,
                            }}
                          >
                            <p
                              className="text-[9px] font-bold tracking-[0.18em] uppercase mb-2"
                              style={{ color: `rgba(${rgb}, 0.45)` }}
                            >
                              Approach
                            </p>
                            <p
                              className="text-[12px] leading-relaxed"
                              style={{ color: "rgba(255,255,255,0.38)" }}
                            >
                              {project.solution}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Tech */}
            <div className="mb-7">
              <TechPills tech={project.tech} color={project.color} />
            </div>

            {/* Metrics */}
            {project.metrics?.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-7">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex flex-col gap-0.5 px-4 py-3 rounded-xl"
                    style={{
                      background: `rgba(${rgb}, 0.05)`,
                      border: `1px solid rgba(${rgb}, 0.1)`,
                    }}
                  >
                    <span
                      className="text-xl font-bold leading-none tracking-tight"
                      style={{ color: project.color }}
                    >
                      {m.value}
                    </span>
                    <span
                      className="text-[10px]"
                      style={{ color: "rgba(255,255,255,0.28)" }}
                    >
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div
            className="flex flex-wrap items-center gap-2 pt-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1420] focus-visible:ring-indigo-400 focus:outline-none"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.42)",
                }}
                whileHover={{
                  scale: 1.04,
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.2)",
                }}
                whileTap={{ scale: 0.96 }}
              >
                <Github size={13} aria-hidden="true" />
                Source code
              </motion.a>
            )}
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.title}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1420] focus-visible:ring-indigo-400 focus:outline-none"
                style={{
                  background: `linear-gradient(135deg, rgba(${rgb}, 0.5), rgba(${rgb}, 0.2))`,
                  border: `1px solid rgba(${rgb}, 0.32)`,
                  boxShadow: `0 0 20px rgba(${rgb}, 0.15)`,
                }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: `0 0 32px rgba(${rgb}, 0.3)`,
                }}
                whileTap={{ scale: 0.96 }}
              >
                <ArrowUpRight size={13} aria-hidden="true" />
                {project.github ? "Live demo" : "View project"}
              </motion.a>
            )}
            {!project.github && !project.live && (
              <span
                className="flex items-center gap-1.5 text-xs"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                <Lock size={11} aria-hidden="true" />
                Private / NDA
              </span>
            )}
          </div>
        </div>

        {/* Side panel — screenshot, code-pattern fallback, or engineering notes */}
        <div
          className="relative hidden lg:block overflow-hidden flex-shrink-0"
          style={{
            width: 380,
            borderLeft: isEven ? `1px solid rgba(${rgb}, 0.1)` : "none",
            borderRight: !isEven ? `1px solid rgba(${rgb}, 0.1)` : "none",
          }}
        >
          {project.screenshot ? (
            <motion.img
              src={project.screenshot}
              alt={project.screenshotAlt || `${project.title} screenshot`}
              className="w-full h-full object-cover"
              style={{ minHeight: 340 }}
              animate={{ scale: hovered && !reduceMotion ? 1.05 : 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div style={{ minHeight: 340, height: "100%" }}>
              <EngineeringNotes project={project} />
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};

// ─── Compact Grid Card ────────────────────────────────────────────────────────

const GridCard = ({ project, index, reduceMotion }) => {
  const [hovered, setHovered] = useState(false);
  const rgb = hexToRgb(project.color);
  const TypeIcon = TYPE_ICON[project.type] ?? Globe;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-xl overflow-hidden flex flex-col h-full group"
      style={{
        background: "rgba(14,20,32,0.6)",
        border: `1px solid rgba(${rgb}, ${hovered ? 0.25 : 0.07})`,
        transition: "border-color 0.35s ease",
      }}
      aria-label={`Project: ${project.title}`}
    >
      {/* Ambient top glow */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        animate={{ opacity: hovered && !reduceMotion ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: `radial-gradient(ellipse at 50% -20%, rgba(${rgb}, 0.12) 0%, transparent 70%)`,
        }}
      />

      {/* Image / fallback */}
      <div className="relative overflow-hidden" style={{ height: 160 }}>
        {project.screenshot ? (
          <motion.img
            src={project.screenshot}
            alt={project.screenshotAlt || `${project.title} preview`}
            className="w-full h-full object-cover"
            animate={{ scale: hovered && !reduceMotion ? 1.07 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <CodePatternPanel project={project} />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 50%, rgba(14,20,32,0.95))",
          }}
        />

        <div className="absolute top-3 left-3">
          <span
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium"
            style={{
              background: "rgba(6,10,15,0.75)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(8px)",
            }}
          >
            <TypeIcon size={9} aria-hidden="true" />
            {project.type}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <StatusBadge status={project.status} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-1.5">
          <h3 className="text-base font-bold text-white leading-tight tracking-tight">
            {project.title}
          </h3>
          <span
            className="font-mono text-[10px] ml-2 flex-shrink-0 mt-0.5"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            {project.year}
          </span>
        </div>
        <p
          className="text-[11px] mb-3"
          style={{ color: "rgba(255,255,255,0.28)" }}
        >
          {project.role}
          {project.duration ? ` · ${project.duration}` : ""}
        </p>

        {/* Outcome-first copy, replaces marketing tagline */}
        <p
          className="text-[12px] leading-relaxed mb-4 flex-1"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {project.outcome || project.context}
        </p>

        <TechPills tech={project.tech} color={project.color} />

        {/* Footer actions */}
        <div
          className="flex items-center gap-2 mt-4 pt-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub`}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1420] focus-visible:ring-indigo-400 focus:outline-none"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.35)",
              }}
              whileHover={{ scale: 1.04, color: "#fff" }}
              whileTap={{ scale: 0.96 }}
            >
              <Github size={11} aria-hidden="true" /> Code
            </motion.a>
          )}
          {project.live ? (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title}`}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold ml-auto focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1420] focus-visible:ring-indigo-400 focus:outline-none"
              style={{
                background: `rgba(${rgb}, 0.15)`,
                border: `1px solid rgba(${rgb}, 0.25)`,
                color: project.color,
              }}
              whileHover={{ scale: 1.04, background: `rgba(${rgb}, 0.22)` }}
              whileTap={{ scale: 0.96 }}
            >
              <ArrowUpRight size={11} aria-hidden="true" /> Visit
            </motion.a>
          ) : (
            <span
              className="flex items-center gap-1 text-[11px] ml-auto"
              style={{ color: "rgba(255,255,255,0.18)" }}
            >
              <Lock size={10} aria-hidden="true" /> Private
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

// ─── Projects Section ─────────────────────────────────────────────────────────

const Projects = () => {
  const reduceMotion = useReducedMotion();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="relative overflow-hidden"
      style={{
        background: "#060A0F",
        paddingTop: "100px",
        paddingBottom: "120px",
      }}
      aria-label="Projects portfolio"
    >
      {/* Background blobs */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: 900,
          height: 600,
          top: "-10%",
          right: "-20%",
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.05) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 500,
          bottom: "5%",
          left: "-10%",
          background:
            "radial-gradient(ellipse, rgba(34,211,238,0.04) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p
            className="text-[11px] font-mono tracking-[0.22em] uppercase mb-4"
            style={{ color: "rgba(165,180,252,0.5)" }}
          >
            Selected work
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="text-5xl md:text-6xl font-black tracking-tight text-white leading-none"
              style={{ letterSpacing: "-2px" }}
            >
              Things I've{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #818cf8 0%, #22d3ee 50%, #a78bfa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                shipped.
              </span>
            </h2>
            <p
              className="text-[14px] leading-relaxed max-w-xs"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Built solo, end to end — from API design to production deploys,
              for real operational problems across East Africa.
            </p>
          </div>
        </motion.div>

        {/* Tech ticker */}
        <Ticker reduceMotion={reduceMotion} />

        {/* Currently building */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 rounded-2xl px-5 py-4 mb-12"
          style={{
            background: "rgba(52,211,153,0.04)",
            border: "1px solid rgba(52,211,153,0.12)",
          }}
        >
          <span
            className={`w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 ${
              reduceMotion ? "" : "animate-pulse"
            }`}
            aria-hidden="true"
          />
          <span
            className="text-[13px]"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Currently building —{" "}
            <span
              className="font-semibold"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              Freight In Time logistics platform
            </span>{" "}
            and{" "}
            <span
              className="font-semibold"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              Fundi artisan marketplace
            </span>
          </span>
        </motion.div>

        {/* ── Featured projects ── */}
        {featured.length > 0 && (
          <div className="space-y-5 mb-16">
            {featured.map((project, i) => (
              <FeaturedCard
                key={project.id}
                project={project}
                index={i}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        )}

        {/* ── More work heading ── */}
        {rest.length > 0 && (
          <>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={reduceMotion ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-7"
            >
              <span
                className="text-[10px] font-mono tracking-[0.2em] uppercase"
                style={{ color: "rgba(255,255,255,0.18)" }}
              >
                More work
              </span>
              <div
                className="flex-1 h-px"
                style={{ background: "rgba(255,255,255,0.04)" }}
              />
            </motion.div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {rest.map((project, i) => (
                <GridCard
                  key={project.id}
                  project={project}
                  index={i}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </>
        )}

        {/* Footer */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mt-16 flex flex-col items-center gap-4"
        >
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.18)" }}>
            More experiments and internal tools on GitHub
          </p>
          <motion.a
            href="https://github.com/nahashon-source"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060A0F] focus-visible:ring-indigo-400 focus:outline-none"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.35)",
            }}
            whileHover={{
              background: "rgba(99,102,241,0.08)",
              borderColor: "rgba(99,102,241,0.25)",
              color: "#a5b4fc",
              scale: 1.03,
            }}
            whileTap={{ scale: 0.97 }}
          >
            <Github size={13} aria-hidden="true" />
            github.com/nahashon-source
            <ArrowUpRight size={12} aria-hidden="true" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
