import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Download,
  GitBranch,
  GitCommit,
  GitMerge,
  Briefcase,
  GraduationCap,
  Award,
  ExternalLink,
  ChevronRight,
  Terminal,
  Zap,
  Globe,
  Shield,
  Code2,
  Building2,
} from "lucide-react";

// ─── Timeline Data ─────────────────────────────────────────────────────────────
// Replace with your actual import: import { timelineItems } from "../data/resume";

const timelineItems = [
  {
    id: "fit-dev",
    type: "work",
    date: "2025 — Present",
    year: "2025",
    title: "Full Stack Developer",
    company: "Freight In Time Logistics",
    location: "JKIA Airport, Nairobi, Kenya",
    color: "#6366f1",
    branch: "main",
    description:
      "Building and maintaining the FiT Logistics web platform, ERP/quotation portal, and internal tooling supporting freight and logistics operations.",
    highlights: [
      "Built and styled the React/Vite frontend for freightintime.net",
      "Developed and maintained the Laravel ERP/quotation portal, integrating with SQL Server stored procedures",
      "Built a Python/FastAPI backend with Azure AD authentication via Microsoft Graph API",
      "Integrated FiT Express UAT API endpoints for quoting, booking, and authentication",
      "Diagnosed and fixed production issues across IIS/PHP and SQL Server environments",
    ],
    tags: ["React", "FastAPI", "Laravel", "Azure AD", "SQL Server"],
    icon: Building2,
    commit: "a3f9c12",
  },
  {
    id: "freelance",
    type: "work",
    date: "2022 — 2023",
    year: "2022",
    title: "Freelance Full Stack Developer",
    company: "Independent",
    location: "Remote",
    color: "#22d3ee",
    branch: "feature/freelance",
    description:
      "Designed and shipped production-grade web applications for clients across logistics, e-commerce, and entertainment verticals.",
    highlights: [
      "Built Dynamic Parcel EA — courier platform for East African market",
      "Developed MovieBox — React movie discovery app with Material-UI",
      "Delivered E-Commerce 2.0 with Stripe payments and real-time order tracking",
    ],
    tags: ["Next.js", "React", "Stripe", "Node.js", "MongoDB"],
    icon: Globe,
    commit: "7b2e445",
  },
  {
    id: "mazingira",
    type: "project",
    date: "2022",
    year: "2022",
    title: "Lead Developer — Mazingira",
    company: "Open Source / Community",
    location: "Nairobi, Kenya",
    color: "#34d399",
    branch: "feature/mazingira",
    description:
      "Founded and led development of a community environmental preservation platform with monitoring features.",
    highlights: [
      "Architected Flask + PostgreSQL backend with REST API",
      "Built interactive data visualizations for environmental monitoring",
      "Built solutions supporting community environmental monitoring across Kenyan counties",
    ],
    tags: ["React", "Flask", "PostgreSQL", "Data Viz"],
    icon: Code2,
    commit: "c8d1f33",
  },
  {
    id: "degree",
    type: "education",
    date: "2022",
    year: "2022",
    title: "Software Engineering Program",
    company: "Moringa School",
    location: "Nairobi, Kenya",
    color: "#a78bfa",
    branch: "edu/degree",
    description:
      "Completed an intensive, practical software engineering program covering full stack development, backend systems, databases, and core software engineering principles.",
    highlights: [
      "Built full stack applications using Python and JavaScript/React",
      "Practiced backend development, database design, and API integration",
      "Applied software engineering principles: version control, testing, and collaborative development",
    ],
    tags: ["Full Stack", "Python", "JavaScript", "React", "Databases"],
    icon: GraduationCap,
    commit: "0d4a892",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
};

const TYPE_LABEL = { work: "Work", project: "Project", education: "Education" };

// ─── Animated Branch SVG ──────────────────────────────────────────────────────

const BranchGraph = ({ items, activeIndex, onNodeClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Layout constants
  const NODE_Y_START = 60;
  const NODE_GAP = 130;
  const MAIN_X = 40;
  const BRANCH_X = 90;
  const totalHeight = NODE_Y_START + (items.length - 1) * NODE_GAP + 60;

  // Determine x position per item (main branch or feature branch)
  const nodeX = (item) => (item.branch === "main" ? MAIN_X : BRANCH_X);

  return (
    <div
      ref={ref}
      className="relative select-none"
      style={{ width: 130, minHeight: totalHeight }}
    >
      <svg
        width="130"
        height={totalHeight}
        viewBox={`0 0 130 ${totalHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Main trunk */}
        <motion.line
          x1={MAIN_X}
          y1={NODE_Y_START}
          x2={MAIN_X}
          y2={totalHeight - 20}
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Branch connectors for non-main items */}
        {items.map((item, i) => {
          if (item.branch === "main") return null;
          const y = NODE_Y_START + i * NODE_GAP;
          return (
            <motion.path
              key={`branch-${i}`}
              d={`M ${MAIN_X} ${y - 24} Q ${MAIN_X} ${y} ${BRANCH_X} ${y}`}
              stroke={item.color}
              strokeWidth="1"
              strokeOpacity="0.3"
              strokeDasharray="3 3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
            />
          );
        })}

        {/* Commit nodes */}
        {items.map((item, i) => {
          const y = NODE_Y_START + i * NODE_GAP;
          const x = nodeX(item);
          const rgb = hexToRgb(item.color);
          const isActive = activeIndex === i;

          return (
            <g
              key={item.id}
              style={{ cursor: "pointer" }}
              onClick={() => onNodeClick(i)}
            >
              {/* Glow ring */}
              <motion.circle
                cx={x}
                cy={y}
                r={isActive ? 20 : 14}
                fill={`rgba(${rgb}, ${isActive ? 0.1 : 0})`}
                animate={{ r: isActive ? 22 : 14, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              {/* Outer ring */}
              <motion.circle
                cx={x}
                cy={y}
                r={12}
                fill="rgba(6,10,15,1)"
                stroke={item.color}
                strokeWidth={isActive ? 2 : 1}
                strokeOpacity={isActive ? 1 : 0.4}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.4 + i * 0.12,
                  type: "spring",
                  stiffness: 200,
                }}
              />
              {/* Inner dot */}
              <motion.circle
                cx={x}
                cy={y}
                r={isActive ? 5 : 3}
                fill={item.color}
                animate={{ r: isActive ? 5 : 3 }}
                transition={{ duration: 0.25 }}
                initial={{ opacity: 0 }}
                whileAnimationComplete={{ opacity: 1 }}
              />

              {/* Year label */}
              <motion.text
                x={x - 26}
                y={y + 4}
                textAnchor="end"
                fontSize="9"
                fontFamily="monospace"
                fill="rgba(255,255,255,0.2)"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.12 }}
              >
                {item.year}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ─── Commit Hash ──────────────────────────────────────────────────────────────

const CommitHash = ({ hash, color }) => (
  <span
    className="font-mono text-[10px] px-1.5 py-0.5 rounded"
    style={{
      background: `rgba(${hexToRgb(color)}, 0.08)`,
      color: `rgba(${hexToRgb(color)}, 0.6)`,
    }}
  >
    {hash}
  </span>
);

// ─── Experience Card ──────────────────────────────────────────────────────────

const ExperienceCard = ({ item, isActive, onClick }) => {
  const rgb = hexToRgb(item.color);
  const Icon = item.icon;

  return (
    <motion.div
      layout
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: isActive ? `rgba(${rgb}, 0.04)` : "rgba(14,20,32,0.5)",
        border: `1px solid rgba(${rgb}, ${isActive ? 0.28 : 0.08})`,
        transition: "border-color 0.35s, background 0.35s",
      }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
      aria-expanded={isActive}
    >
      {/* Active top bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: item.color }}
        animate={{ opacity: isActive ? 1 : 0, scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />

      {/* Ambient glow */}
      {isActive && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top left, rgba(${rgb}, 0.06) 0%, transparent 65%)`,
          }}
        />
      )}

      <div className="p-5 relative z-10">
        {/* Header */}
        <div className="flex items-start gap-3 mb-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{
              background: `rgba(${rgb}, 0.1)`,
              border: `1px solid rgba(${rgb}, 0.18)`,
            }}
          >
            <Icon size={16} style={{ color: item.color }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                style={{
                  background: `rgba(${rgb}, 0.08)`,
                  color: `rgba(${rgb}, 0.7)`,
                  border: `1px solid rgba(${rgb}, 0.15)`,
                }}
              >
                {item.date}
              </span>
              <CommitHash hash={item.commit} color={item.color} />
              <span
                className="text-[9px] uppercase tracking-wider ml-auto"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                {TYPE_LABEL[item.type]}
              </span>
            </div>
            <h3 className="text-base font-bold text-white leading-tight tracking-tight">
              {item.title}
            </h3>
            <p
              className="text-[12px] font-medium mt-0.5"
              style={{ color: item.color, opacity: 0.75 }}
            >
              {item.company} · {item.location}
            </p>
          </div>

          <motion.div
            animate={{ rotate: isActive ? 90 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex-shrink-0 mt-1"
          >
            <ChevronRight
              size={14}
              style={{ color: "rgba(255,255,255,0.2)" }}
            />
          </motion.div>
        </div>

        {/* Expandable body */}
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div
                className="pt-4 mt-4"
                style={{ borderTop: `1px solid rgba(${rgb}, 0.1)` }}
              >
                <p
                  className="text-[13px] leading-relaxed mb-4"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  {item.description}
                </p>

                {item.highlights && (
                  <ul className="space-y-2 mb-4">
                    {item.highlights.map((h, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.06, duration: 0.3 }}
                        className="flex items-start gap-2.5 text-[12px] leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        <span
                          className="mt-[5px] w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: item.color, opacity: 0.7 }}
                        />
                        {h}
                      </motion.li>
                    ))}
                  </ul>
                )}

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                      style={{
                        background: `rgba(${rgb}, 0.06)`,
                        border: `1px solid rgba(${rgb}, 0.14)`,
                        color: `rgba(${rgb}, 0.7)`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ─── Terminal Header ──────────────────────────────────────────────────────────

const TerminalHeader = () => {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const full = "git log --oneline --graph --all";

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(full.slice(0, i + 1));
      i++;
      if (i >= full.length) clearInterval(timer);
    }, 42);
    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="inline-flex items-center gap-3 rounded-xl px-4 py-2.5 mb-8"
      style={{
        background: "rgba(14,20,32,0.8)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
      </div>
      <span
        className="font-mono text-[12px]"
        style={{ color: "rgba(255,255,255,0.25)" }}
      >
        ~/ <span style={{ color: "rgba(99,102,241,0.8)" }}>nahashon</span>
      </span>
      <span
        className="font-mono text-[12px]"
        style={{ color: "rgba(52,211,153,0.7)" }}
      >
        {displayed}
        <span className="animate-pulse">▌</span>
      </span>
    </div>
  );
};

// ─── Stats Bar ────────────────────────────────────────────────────────────────

const stats = [
  { value: "4+", label: "Years building" },
  { value: "9+", label: "Projects shipped" },
  { value: "5+", label: "Tech stacks" },
  { value: "3", label: "Industries served" },
];

const StatsBar = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="grid grid-cols-2 md:grid-cols-4 gap-px mb-14 rounded-2xl overflow-hidden"
    style={{ border: "1px solid rgba(255,255,255,0.05)" }}
  >
    {stats.map((s, i) => (
      <div
        key={s.label}
        className="flex flex-col items-center justify-center py-5 px-4 text-center"
        style={{ background: "rgba(14,20,32,0.6)" }}
      >
        <span className="text-2xl font-black text-white tracking-tight leading-none mb-1">
          {s.value}
        </span>
        <span
          className="text-[10px] uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.22)" }}
        >
          {s.label}
        </span>
      </div>
    ))}
  </motion.div>
);

// ─── Mobile Timeline ──────────────────────────────────────────────────────────

const MobileTimeline = ({ items, activeIndex, onSelect }) => (
  <div className="relative pl-8">
    {/* Vertical line */}
    <div
      className="absolute left-3 top-0 bottom-0 w-px"
      style={{ background: "rgba(255,255,255,0.06)" }}
    />

    <div className="space-y-4">
      {items.map((item, i) => {
        const rgb = hexToRgb(item.color);
        return (
          <div key={item.id} className="relative">
            {/* Node */}
            <div
              className="absolute -left-5 top-5 w-4 h-4 rounded-full border flex items-center justify-center"
              style={{
                background: "#060A0F",
                borderColor: item.color,
                borderWidth: activeIndex === i ? 2 : 1,
                borderOpacity: activeIndex === i ? 1 : 0.4,
              }}
              onClick={() => onSelect(i)}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: item.color,
                  opacity: activeIndex === i ? 1 : 0.5,
                }}
              />
            </div>
            <ExperienceCard
              item={item}
              isActive={activeIndex === i}
              onClick={() => onSelect(i)}
            />
          </div>
        );
      })}
    </div>
  </div>
);

// ─── Resume Section ───────────────────────────────────────────────────────────

const Resume = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);

  const handleNodeClick = (i) => {
    setActiveIndex((prev) => (prev === i ? -1 : i));
  };

  return (
    <section
      id="resume"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "#060A0F",
        paddingTop: "100px",
        paddingBottom: "120px",
      }}
      aria-label="Career journey and experience"
    >
      {/* Ambient blobs */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: 800,
          height: 500,
          top: "0%",
          left: "-15%",
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.05) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 400,
          bottom: "10%",
          right: "-10%",
          background:
            "radial-gradient(ellipse, rgba(167,139,250,0.04) 0%, transparent 65%)",
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
          className="mb-10"
        >
          <TerminalHeader />

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p
                className="text-[11px] font-mono tracking-[0.22em] uppercase mb-4"
                style={{ color: "rgba(165,180,252,0.5)" }}
              >
                Career journey
              </p>
              <h2
                className="text-5xl md:text-6xl font-black tracking-tight text-white leading-none"
                style={{ letterSpacing: "-2px" }}
              >
                How I got{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #818cf8 0%, #22d3ee 50%, #a78bfa 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  here.
                </span>
              </h2>
            </div>

            {/* Download */}
            <motion.a
              href="/cv/Nahashon-Mwendwa-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Nahashon-Mwendwa-Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white flex-shrink-0 self-start md:self-auto"
              style={{
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(99,102,241,0.15))",
                border: "1px solid rgba(99,102,241,0.35)",
                boxShadow: "0 0 24px rgba(99,102,241,0.15)",
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 36px rgba(99,102,241,0.28)",
              }}
              whileTap={{ scale: 0.96 }}
              aria-label="Download Nahashon Mwendwa's resume PDF"
            >
              <Download size={15} />
              Download CV
            </motion.a>
          </div>
        </motion.div>

        {/* Stats */}
        <StatsBar />

        {/* ── Desktop: branch graph + cards ── */}
        <div className="hidden md:flex gap-8 items-start">
          {/* Branch graph */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0 sticky top-24 self-start"
          >
            <BranchGraph
              items={timelineItems}
              activeIndex={activeIndex}
              onNodeClick={handleNodeClick}
            />
          </motion.div>

          {/* Cards */}
          <div className="flex-1 space-y-3">
            {timelineItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ExperienceCard
                  item={item}
                  isActive={activeIndex === i}
                  onClick={() => handleNodeClick(i)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Mobile: simplified timeline ── */}
        <div className="md:hidden">
          <MobileTimeline
            items={timelineItems}
            activeIndex={activeIndex}
            onSelect={handleNodeClick}
          />
        </div>

        {/* Branch legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center gap-5 mt-12 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span
            className="text-[10px] font-mono uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.15)" }}
          >
            Branch key
          </span>
          <div className="flex flex-wrap gap-4">
            {[
              { label: "main", color: "#6366f1", desc: "Core career path" },
              {
                label: "feature/*",
                color: "#22d3ee",
                desc: "Freelance & side projects",
              },
              { label: "edu/*", color: "#a78bfa", desc: "Education" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-1.5">
                <span
                  className="font-mono text-[10px] px-1.5 py-0.5 rounded"
                  style={{
                    background: `rgba(${hexToRgb(b.color)}, 0.08)`,
                    color: `rgba(${hexToRgb(b.color)}, 0.65)`,
                  }}
                >
                  {b.label}
                </span>
                <span
                  className="text-[10px]"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  {b.desc}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
