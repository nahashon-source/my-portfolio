import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Github,
  ExternalLink,
  ArrowUpRight,
  Lock,
  ChevronDown,
  ChevronUp,
  Zap,
  Globe,
  Briefcase,
  FlaskConical,
  User,
  Building2,
  Shield,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: "mazingira",
    title: "Mazingira",
    tagline: "Environmental preservation, reimagined",
    type: "Full Stack",
    status: "live",
    featured: true,
    year: "2024",
    color: "#34d399",
    description:
      "A community-driven environmental preservation platform featuring real-time monitoring, data visualization, and engagement tools that support sustainable conservation initiatives.",
    problem:
      "Local conservation groups lacked accessible tools to coordinate efforts and visualize environmental data in real time.",
    solution:
      "Built a collaborative platform with live monitoring dashboards, community reporting, and geo-tagged initiative tracking.",
    tech: {
      Frontend: ["React", "TypeScript", "Recharts"],
      Backend: ["Flask", "PostgreSQL", "REST API"],
    },
    metrics: [
      { value: "3K+", label: "Active users" },
      { value: "12", label: "Counties covered" },
    ],
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900&h=600&fit=crop",
    live: "https://react-mazingira.vercel.app/",
    github: "https://github.com/nahashon-source/frontend-mazingira.git",
    size: "large",
  },
  {
    id: "fit-logistics",
    title: "Freight In Time Website",
    tagline: "East Africa's logistics, digitized",
    type: "Enterprise",
    status: "live",
    featured: true,
    year: "2024",
    color: "#6366f1",
    description:
      "A full-stack logistics platform serving East African operations with service pages, office locations, customs solutions, quote requests, and AI-powered customer assistance.",
    problem:
      "Manual freight quoting was slow and error-prone, losing leads and frustrating customers across 10 operating countries.",
    solution:
      "Built a quote engine backed by FastAPI + FiT Express API, with reCAPTCHA protection, cold-start handling, and a conversational AI assistant.",
    tech: {
      Frontend: ["React", "Vite", "Tailwind"],
      Backend: ["FastAPI", "Python", "MySQL"],
      Infra: ["Render", "Vercel", "Hostgator"],
    },
    metrics: [
      { value: "10", label: "Countries served" },
      { value: "<2s", label: "Quote response" },
    ],
    image:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=900&h=600&fit=crop",
    live: "https://freightintime.net",
    github: "",
    size: "large",
  },
  {
    id: "azure-idm",
    title: "Azure Identity Management",
    tagline: "Enterprise access control at scale",
    type: "Enterprise",
    status: "production",
    featured: true,
    year: "2023",
    color: "#22d3ee",
    description:
      "Enterprise-grade identity and access management platform handling Azure AD provisioning, role assignments, onboarding workflows, and access control across multiple enterprise systems.",
    problem:
      "IT teams manually provisioned hundreds of accounts monthly, creating security gaps and onboarding delays.",
    solution:
      "Automated the full provisioning lifecycle via Microsoft Graph API — role assignment, group sync, and access expiry in one auditable workflow.",
    tech: {
      Backend: ["Laravel", "PHP", "SQL Server"],
      Identity: ["Azure AD", "Microsoft Graph API"],
    },
    metrics: [
      { value: "90%", label: "Faster provisioning" },
      { value: "0", label: "Manual errors" },
    ],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&h=600&fit=crop",
    live: "https://bizuat.freightintime.com",
    github: "",
    size: "large",
  },
  {
    id: "fit-erp",
    title: "FIT Logistics ERP Portal",
    tagline: "Internal ops platform for regional logistics",
    type: "Corporate",
    status: "production",
    featured: true,
    year: "2023",
    color: "#a78bfa",
    description:
      "An internal ERP and CRM platform for a regional logistics company supporting quotation management, customer interactions, multi-office workflows, and operational processes.",
    problem:
      "Disconnected spreadsheets and emails made it impossible to track shipment status, customer history, or team performance across offices.",
    solution:
      "Unified platform with stored-procedure-driven data layer, role-based dashboards, and real-time job tracking across all branch offices.",
    tech: {
      Backend: ["Laravel", "PHP", "SQL Server", "MySQL"],
      API: ["REST API", "Stored Procedures"],
    },
    metrics: [
      { value: "6", label: "Offices unified" },
      { value: "40%", label: "Less admin time" },
    ],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&h=600&fit=crop",
    live: "https://bizuat.freightintime.com",
    github: "",
    size: "large",
  },
  {
    id: "login-tracker",
    title: "Login Activity Tracker",
    tagline: "Security analytics for enterprise apps",
    type: "Enterprise",
    status: "in-use",
    featured: false,
    year: "2023",
    color: "#f59e0b",
    description:
      "An analytics platform monitoring user sign-ins across enterprise applications, providing usage insights, inactive user detection, and application access reports.",
    tech: { Stack: ["Laravel", "PHP", "SQL Server", "Azure AD"] },
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=450&fit=crop",
    live: "https://bizuat.freightintime.com",
    github: "",
    size: "normal",
  },
  {
    id: "ecommerce",
    title: "E-Commerce 2.0",
    tagline: "Modern storefront with Stripe payments",
    type: "Full Stack",
    status: "live",
    featured: false,
    year: "2024",
    color: "#ec4899",
    description:
      "A modern e-commerce platform featuring secure Stripe payments, inventory management, and real-time order tracking with an optimized shopping experience.",
    tech: { Stack: ["Next.js", "Stripe", "PostgreSQL"] },
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=700&h=450&fit=crop",
    live: "https://e-commerce-2-0-coral.vercel.app/",
    github: "https://github.com/nahashon-source/E-commerce-2.0.git",
    size: "normal",
  },
  {
    id: "fittrack",
    title: "FitTrack",
    tagline: "Personalized home workout platform",
    type: "Personal",
    status: "live",
    featured: false,
    year: "2024",
    color: "#34d399",
    description:
      "A fitness and home workout platform offering personalized exercise plans, progress tracking, and guided workout sessions for users of all fitness levels.",
    tech: { Stack: ["React", "Node.js", "Express", "MongoDB"] },
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=700&h=450&fit=crop",
    live: "https://lucent-malabi-881720.netlify.app/",
    github: "https://github.com/nahashon-source/FItness.git",
    size: "normal",
  },
  {
    id: "moviebox",
    title: "MovieBox",
    tagline: "Cinematic discovery experience",
    type: "Frontend",
    status: "live",
    featured: false,
    year: "2023",
    color: "#f97316",
    description:
      "A movie discovery application allowing users to search movies, explore detailed information, and save favorites using modern UI components and external APIs.",
    tech: { Stack: ["React", "JavaScript", "Axios", "Material-UI"] },
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=700&h=450&fit=crop",
    live: "https://movies-box-t3b2.vercel.app/",
    github: "https://github.com/Willigers1/movies-box.git",
    size: "normal",
  },
  {
    id: "dynamic-parcel",
    title: "Dynamic Parcel EA",
    tagline: "Courier logistics for East Africa",
    type: "Corporate",
    status: "live",
    featured: false,
    year: "2024",
    color: "#22d3ee",
    description:
      "A courier and parcel delivery website serving East Africa with modern interfaces, delivery solutions, and regional logistics services.",
    tech: { Stack: ["TypeScript", "React", "Tailwind CSS"] },
    image:
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=700&h=450&fit=crop",
    live: "https://dynamicparcelea.com/",
    github: "",
    size: "normal",
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

const Ticker = () => {
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
        animate={{ x: ["0%", "-50%"] }}
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

// ─── Featured Case Study Card ──────────────────────────────────────────────────

const FeaturedCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const rgb = hexToRgb(project.color);
  const TypeIcon = TYPE_ICON[project.type] ?? Globe;
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
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
        animate={{ opacity: hovered ? 1 : 0 }}
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
                <TypeIcon size={10} />
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
              className="text-sm mb-5 font-medium"
              style={{ color: project.color, opacity: 0.8 }}
            >
              {project.tagline}
            </p>
            <p
              className="text-[13.5px] leading-relaxed mb-7"
              style={{ color: "rgba(255,255,255,0.38)", maxWidth: 460 }}
            >
              {project.description}
            </p>

            {/* Expandable problem/solution */}
            {(project.problem || project.solution) && (
              <div className="mb-7">
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="flex items-center gap-2 text-[11px] font-medium mb-0 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  style={{ color: "rgba(255,255,255,0.28)" }}
                  aria-expanded={expanded}
                >
                  {expanded ? (
                    <ChevronUp size={12} />
                  ) : (
                    <ChevronDown size={12} />
                  )}
                  {expanded ? "Hide" : "Show"} challenge & approach
                </button>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
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
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium"
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
                <Github size={13} />
                Source code
              </motion.a>
            )}
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.title}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white"
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
                <ArrowUpRight size={13} />
                {project.github ? "Live demo" : "View project"}
              </motion.a>
            )}
            {!project.github && !project.live && (
              <span
                className="flex items-center gap-1.5 text-xs"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                <Lock size={11} />
                Private / NDA
              </span>
            )}
          </div>
        </div>

        {/* Image panel */}
        <div
          className="relative hidden lg:block overflow-hidden flex-shrink-0"
          style={{
            width: 380,
            borderLeft: isEven ? `1px solid rgba(${rgb}, 0.1)` : "none",
            borderRight: !isEven ? `1px solid rgba(${rgb}, 0.1)` : "none",
          }}
        >
          {project.image ? (
            <motion.img
              src={project.image}
              alt={`${project.title} screenshot`}
              className="w-full h-full object-cover"
              style={{ minHeight: 340 }}
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center font-black text-[72px] select-none"
              style={{
                background: `linear-gradient(135deg, rgba(${rgb},0.1), rgba(${rgb},0.02))`,
                color: `rgba(${rgb}, 0.15)`,
                letterSpacing: "-4px",
              }}
            >
              {project.title.slice(0, 2).toUpperCase()}
            </div>
          )}

          {/* Fade edge */}
          <div
            className="absolute inset-y-0 pointer-events-none"
            style={{
              [isEven ? "left" : "right"]: 0,
              width: 80,
              background: isEven
                ? "linear-gradient(to right, rgba(14,20,32,0.95), transparent)"
                : "linear-gradient(to left, rgba(14,20,32,0.95), transparent)",
            }}
          />

          {/* Status overlay */}
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-lg px-3.5 py-2 font-mono text-[10px] whitespace-nowrap"
            style={{
              background: "rgba(6,10,15,0.85)",
              border: `1px solid rgba(${rgb}, 0.18)`,
              color: "rgba(255,255,255,0.45)",
              backdropFilter: "blur(10px)",
            }}
          >
            <span style={{ color: "#818cf8" }}>const </span>
            <span style={{ color: "#67e8f9" }}>
              {project.id.replace(/-/g, "_")}
            </span>
            <span style={{ color: "#94a3b8" }}> = </span>
            <span style={{ color: "#34d399" }}>✓</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// ─── Compact Grid Card ────────────────────────────────────────────────────────

const GridCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const rgb = hexToRgb(project.color);
  const TypeIcon = TYPE_ICON[project.type] ?? Globe;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
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
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: `radial-gradient(ellipse at 50% -20%, rgba(${rgb}, 0.12) 0%, transparent 70%)`,
        }}
      />

      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 180 }}>
        {project.image ? (
          <motion.img
            src={project.image}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center font-black text-5xl select-none"
            style={{
              background: `rgba(${rgb}, 0.06)`,
              color: `rgba(${rgb}, 0.15)`,
            }}
          >
            {project.title.slice(0, 2).toUpperCase()}
          </div>
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 50%, rgba(14,20,32,0.95))",
          }}
        />

        {/* Type badge on image */}
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
            <TypeIcon size={9} />
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
          className="text-xs mb-3 font-medium"
          style={{ color: project.color, opacity: 0.7 }}
        >
          {project.tagline}
        </p>
        <p
          className="text-[12px] leading-relaxed mb-4 flex-1"
          style={{ color: "rgba(255,255,255,0.32)" }}
        >
          {project.description}
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
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-medium"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.35)",
              }}
              whileHover={{ scale: 1.04, color: "#fff" }}
              whileTap={{ scale: 0.96 }}
            >
              <Github size={11} /> Code
            </motion.a>
          )}
          {project.live ? (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title}`}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-white ml-auto"
              style={{
                background: `rgba(${rgb}, 0.15)`,
                border: `1px solid rgba(${rgb}, 0.25)`,
                color: project.color,
              }}
              whileHover={{ scale: 1.04, background: `rgba(${rgb}, 0.22)` }}
              whileTap={{ scale: 0.96 }}
            >
              <ArrowUpRight size={11} /> Visit
            </motion.a>
          ) : (
            <span
              className="flex items-center gap-1 text-[11px] ml-auto"
              style={{ color: "rgba(255,255,255,0.18)" }}
            >
              <Lock size={10} /> Private
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

// ─── Projects Section ─────────────────────────────────────────────────────────

const Projects = () => {
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
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
              Enterprise platforms, logistics tools, and consumer products —
              built to solve real operational problems.
            </p>
          </div>
        </motion.div>

        {/* Tech ticker */}
        <Ticker />

        {/* Currently building */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 rounded-2xl px-5 py-4 mb-12"
          style={{
            background: "rgba(52,211,153,0.04)",
            border: "1px solid rgba(52,211,153,0.12)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
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
              <FeaturedCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}

        {/* ── More work heading ── */}
        {rest.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
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
                <GridCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium"
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
            <Github size={13} />
            github.com/nahashon-source
            <ArrowUpRight size={12} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
