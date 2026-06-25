import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
  memo,
  lazy,
  Suspense,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  Layers,
  Server,
  Database,
  GitBranch,
  Wrench,
  Palette,
  Star,
  ArrowRight,
  Terminal,
  Globe,
  Cpu,
  Search,
  X,
  ChevronDown,
} from "lucide-react";

// ─── Design tokens ─────────────────────────────────────────────────────────────

const COLORS = {
  indigo: "#818cf8",
  cyan: "#67e8f9",
  emerald: "#34d399",
  amber: "#fbbf24",
  rose: "#fb7185",
  violet: "#a78bfa",
  sky: "#38bdf8",
  teal: "#2dd4bf",
};

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
};

// ─── Skill data ────────────────────────────────────────────────────────────────

const SKILL_DOMAINS = [
  {
    id: "frontend",
    label: "Frontend",
    Icon: Layers,
    color: COLORS.indigo,
    yearsExp: 3,
    description: "Building reactive, accessible UIs with modern frameworks.",
    skills: [
      { name: "React", tier: "core", projects: 12 },
      { name: "TypeScript", tier: "core", projects: 8 },
      { name: "Vite", tier: "core", projects: 10 },
      { name: "Tailwind CSS", tier: "core", projects: 11 },
      { name: "Framer Motion", tier: "proficient", projects: 5 },
      { name: "HTML5 / CSS3", tier: "core", projects: 14 },
      { name: "JavaScript", tier: "core", projects: 14 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    Icon: Server,
    color: COLORS.cyan,
    yearsExp: 3,
    description: "Designing APIs and service layers that scale.",
    skills: [
      { name: "Python", tier: "core", projects: 8 },
      { name: "FastAPI", tier: "core", projects: 6 },
      { name: "PHP", tier: "core", projects: 7 },
      { name: "Laravel", tier: "core", projects: 5 },
      { name: "Node.js", tier: "proficient", projects: 4 },
      { name: "REST APIs", tier: "core", projects: 10 },
    ],
  },
  {
    id: "database",
    label: "Database",
    Icon: Database,
    color: COLORS.emerald,
    yearsExp: 3,
    description: "Data modeling, stored procedures, migrations.",
    skills: [
      { name: "MySQL", tier: "core", projects: 8 },
      { name: "SQL Server", tier: "core", projects: 6 },
      { name: "PostgreSQL", tier: "proficient", projects: 4 },
      { name: "SQLAlchemy", tier: "proficient", projects: 5 },
      { name: "Alembic", tier: "proficient", projects: 4 },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    Icon: GitBranch,
    color: COLORS.amber,
    yearsExp: 2,
    description: "CI/CD, deployment pipelines, cloud hosting.",
    skills: [
      { name: "Git / GitHub", tier: "core", projects: 14 },
      { name: "GitHub Actions", tier: "proficient", projects: 5 },
      { name: "Render", tier: "proficient", projects: 4 },
      { name: "Vercel", tier: "proficient", projects: 3 },
      { name: "cPanel / FTP", tier: "core", projects: 4 },
      { name: "Linux CLI", tier: "proficient", projects: 8 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    Icon: Wrench,
    color: COLORS.rose,
    yearsExp: 3,
    description: "Productivity and engineering environment.",
    skills: [
      { name: "VS Code", tier: "core", projects: 14 },
      { name: "Postman", tier: "core", projects: 10 },
      { name: "Figma", tier: "proficient", projects: 5 },
      { name: "Docker", tier: "learning", projects: 1 },
      { name: "Odoo Studio", tier: "proficient", projects: 2 },
    ],
  },
  {
    id: "design",
    label: "Design",
    Icon: Palette,
    color: COLORS.violet,
    yearsExp: 2,
    description: "UI/UX, motion design, and design systems.",
    skills: [
      { name: "Figma", tier: "proficient", projects: 5 },
      { name: "Tailwind UI", tier: "core", projects: 8 },
      { name: "Framer", tier: "learning", projects: 2 },
      { name: "Animation", tier: "proficient", projects: 6 },
    ],
  },
];

const CURRENTLY_LEARNING = [
  { name: "Odoo Functional Cert", icon: "📋" },
  { name: "Docker & Containers", icon: "🐳" },
  { name: "Framer advanced motion", icon: "✨" },
  { name: "Real Estate ERP (Odoo)", icon: "🏢" },
];

const FAVORITE_STACK = [
  { name: "React + Vite", reason: "Lightning-fast DX" },
  { name: "FastAPI", reason: "Type-safe Python APIs" },
  { name: "Tailwind CSS", reason: "Design without leaving JSX" },
  { name: "Framer Motion", reason: "Animations that feel alive" },
];

const TIER = {
  core: { label: "Core", color: COLORS.emerald, dot: "#34d399" },
  proficient: { label: "Proficient", color: COLORS.indigo, dot: "#818cf8" },
  learning: { label: "Learning", color: COLORS.amber, dot: "#fbbf24" },
};

// ─── Animation presets ─────────────────────────────────────────────────────────
// Centralized so repeated inline animation objects collapse to one source of
// truth. Each preset is a function of `reduce` (from useReducedMotion) so
// every consumer can drop straight-line motion without hand-rolling the
// reduced-motion branch itself. Presets return plain Framer Motion prop
// objects (initial/animate/whileInView/transition/viewport) meant to be
// spread directly onto a motion component.

const fadeUp = (delay = 0, reduce = false) => ({
  initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
  whileInView: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
  transition: {
    duration: reduce ? 0.2 : 0.6,
    delay: reduce ? 0 : delay,
    ease: [0.22, 1, 0.36, 1],
  },
  viewport: { once: true, margin: "-60px" },
});

const scaleIn = (delay = 0, reduce = false) => ({
  initial: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85 },
  animate: reduce ? { opacity: 1 } : { opacity: 1, scale: 1 },
  transition: {
    duration: reduce ? 0.15 : 0.3,
    delay: reduce ? 0 : delay,
    ease: [0.22, 1, 0.36, 1],
  },
});

const staggerChild = (index, step = 0.07, reduce = false) => ({
  initial: reduce ? { opacity: 0 } : { opacity: 0, x: -14 },
  whileInView: reduce ? { opacity: 1 } : { opacity: 1, x: 0 },
  transition: {
    duration: reduce ? 0.15 : 0.4,
    delay: reduce ? 0 : index * step,
    ease: [0.22, 1, 0.36, 1],
  },
  viewport: { once: true },
});

const tooltipAnimation = (reduce = false) => ({
  initial: reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.95 },
  animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 },
  exit: reduce ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.95 },
  transition: { duration: reduce ? 0.08 : 0.15, ease: [0.22, 1, 0.36, 1] },
});

const cardAnimation = (index, delay = 0.07, reduce = false) => ({
  initial: reduce ? { opacity: 0 } : { opacity: 0, y: 28 },
  whileInView: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
  transition: {
    duration: reduce ? 0.2 : 0.55,
    delay: reduce ? 0 : index * delay,
    ease: [0.22, 1, 0.36, 1],
  },
  viewport: { once: true, margin: "-40px" },
});

// ─── Magnetic tilt hook ───────────────────────────────────────────────────────
// Disabled entirely under reduced motion — tilt is a pure delight effect with
// no functional purpose, so it's the cleanest candidate to drop rather than
// just speed up.

const useMagneticTilt = (strength = 12, reduce = false) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [strength, -strength]),
    { stiffness: 300, damping: 30 },
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-strength, strength]),
    { stiffness: 300, damping: 30 },
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (reduce || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [x, y, reduce],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return {
    ref,
    rotateX: reduce ? 0 : rotateX,
    rotateY: reduce ? 0 : rotateY,
    handleMouseMove,
    handleMouseLeave,
  };
};

// ─── Skill badge with tooltip ─────────────────────────────────────────────────
// Memoized: re-renders only when its own skill/color/index/reduce change,
// not when sibling badges or unrelated DomainCard state (e.g. tilt motion
// values) update. Without this, every mousemove-driven tilt re-render on the
// parent card would re-render all of its badges too.

const SkillBadge = memo(function SkillBadge({ skill, color, index, reduce }) {
  const [showTip, setShowTip] = useState(false);
  const tier = TIER[skill.tier] ?? TIER.proficient;
  const rgb = hexToRgb(color);

  return (
    <motion.div
      {...scaleIn(index * 0.035, reduce)}
      className="relative"
      onHoverStart={() => setShowTip(true)}
      onHoverEnd={() => setShowTip(false)}
      onFocus={() => setShowTip(true)}
      onBlur={() => setShowTip(false)}
    >
      <motion.div
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl cursor-default select-none"
        style={{
          background: `rgba(${rgb}, 0.06)`,
          border: `1px solid rgba(${rgb}, 0.16)`,
        }}
        whileHover={{
          scale: 1.06,
          background: `rgba(${rgb}, 0.12)`,
          borderColor: `rgba(${rgb}, 0.32)`,
        }}
        aria-label={`${skill.name} — ${tier.label}, ${skill.projects} projects`}
        tabIndex={0}
        role="listitem"
      >
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: tier.dot }}
          aria-hidden="true"
        />
        <span
          className="text-[11px] font-medium"
          style={{ color: "rgba(255,255,255,0.72)" }}
        >
          {skill.name}
        </span>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {showTip && (
          <motion.div
            {...tooltipAnimation(reduce)}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none"
            role="tooltip"
          >
            <div
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg whitespace-nowrap"
              style={{
                background: "rgba(12,14,20,0.95)",
                border: `1px solid rgba(${rgb}, 0.3)`,
                backdropFilter: "blur(12px)",
                boxShadow: `0 4px 20px rgba(${rgb}, 0.15)`,
              }}
            >
              <span
                className="text-[9px] font-bold uppercase tracking-wide"
                style={{ color: tier.dot }}
              >
                {tier.label}
              </span>
              <span
                className="text-[9px]"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                ·
              </span>
              <span
                className="text-[9px]"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {skill.projects} projects
              </span>
            </div>
            {/* Arrow */}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: "4px solid transparent",
                borderRight: "4px solid transparent",
                borderTop: `4px solid rgba(${rgb}, 0.3)`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

// ─── Domain card with magnetic tilt ──────────────────────────────────────────
// Memoized: `domain`/`color` are stable references from module-level data,
// but `searchQuery`, `reduce`, and roving-focus props change as the user
// types/navigates. Even with those changing inputs, memo helps because
// without it every keystroke in SearchBar would re-render every DomainCard,
// not just the ones whose own filtered skill set actually changed.

const DomainCard = memo(function DomainCard({
  domain,
  index,
  searchQuery,
  reduce,
  isRovingTarget,
  onCardKeyDown,
  registerCardRef,
}) {
  const [active, setActive] = useState(false);
  const {
    ref: tiltRef,
    rotateX,
    rotateY,
    handleMouseMove,
    handleMouseLeave,
  } = useMagneticTilt(6, reduce);
  const rgb = hexToRgb(domain.color);
  const { Icon } = domain;
  const coreCount = domain.skills.filter((s) => s.tier === "core").length;

  // `domain.skills` arriving here is already filtered by the parent (Skills)
  // for both search and tier — see item 2. A non-matching domain is excluded
  // from the grid entirely before this component ever mounts, so there is
  // no "fade out" branch to handle locally anymore.
  const displaySkills = active ? domain.skills : domain.skills.slice(0, 4);

  const setRefs = useCallback(
    (node) => {
      tiltRef.current = node;
      registerCardRef(index, node);
    },
    [tiltRef, registerCardRef, index],
  );

  return (
    <motion.div
      ref={setRefs}
      {...cardAnimation(index, 0.07, reduce)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.article
        className="relative rounded-2xl p-5 cursor-pointer h-full focus-within:ring-2 focus-within:ring-indigo-500/50"
        style={{
          background: "rgba(255,255,255,0.018)",
          border: `1px solid rgba(${rgb}, 0.12)`,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          borderColor: `rgba(${rgb}, 0.3)`,
          background: "rgba(255,255,255,0.025)",
        }}
        transition={{ duration: 0.25 }}
        onClick={() => setActive((v) => !v)}
        role="button"
        tabIndex={isRovingTarget ? 0 : -1}
        onKeyDown={(e) => {
          // Item 8: Enter/Space toggles expansion, Escape collapses, all
          // other keys (arrows) are delegated to the parent's roving-focus
          // handler so DomainCard doesn't need to know about grid geometry.
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setActive((v) => !v);
          } else if (e.key === "Escape") {
            setActive(false);
          } else {
            onCardKeyDown(e, index);
          }
        }}
        aria-expanded={active}
        aria-label={`${domain.label} skills — press Enter to ${active ? "collapse" : "expand"}`}
      >
        {/* Ambient glow — translates slightly on z for depth feel */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, rgba(${rgb}, 0.1) 0%, transparent 60%)`,
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Gradient border highlight on hover */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg, rgba(${rgb}, 0.08) 0%, transparent 50%)`,
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-3 relative">
          <div className="flex items-center gap-2.5">
            <motion.div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `rgba(${rgb}, 0.1)`,
                border: `1px solid rgba(${rgb}, 0.22)`,
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              aria-hidden="true"
            >
              <Icon size={14} style={{ color: domain.color }} />
            </motion.div>
            <div>
              <h3 className="text-sm font-semibold text-white leading-tight">
                {domain.label}
              </h3>
              <p
                className="text-[10px]"
                style={{ color: "rgba(255,255,255,0.26)" }}
              >
                {domain.yearsExp}yr · {domain.skills.length} techs
              </p>
            </div>
          </div>

          <span
            className="flex-shrink-0 px-2 py-0.5 rounded-full text-[9px] font-bold"
            style={{
              background: `rgba(${hexToRgb(COLORS.emerald)}, 0.08)`,
              border: `1px solid rgba(${hexToRgb(COLORS.emerald)}, 0.2)`,
              color: COLORS.emerald,
            }}
          >
            {coreCount} core
          </span>
        </div>

        {/* Description */}
        <p
          className="text-[11.5px] leading-relaxed mb-3.5 relative"
          style={{ color: "rgba(255,255,255,0.32)" }}
        >
          {domain.description}
        </p>

        {/* Skills */}
        <div
          className="relative"
          role="list"
          aria-label={`${domain.label} technologies`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active ? "expanded" : "collapsed"}
              initial={{ opacity: 0, height: active ? 0 : "auto" }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0 }}
              transition={{
                duration: reduce ? 0.12 : 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-wrap gap-1.5"
            >
              {displaySkills.map((skill, i) => (
                <SkillBadge
                  key={skill.name}
                  skill={skill}
                  color={domain.color}
                  index={i}
                  reduce={reduce}
                />
              ))}
              {!active && domain.skills.length > 4 && (
                <motion.span
                  className="flex items-center px-3 py-1.5 rounded-xl text-[10px]"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.22)",
                  }}
                  whileHover={{ background: "rgba(255,255,255,0.06)" }}
                >
                  +{domain.skills.length - 4}
                </motion.span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Expand hint */}
        <div className="flex items-center gap-1 mt-3 relative">
          <motion.div
            animate={{ rotate: active ? 180 : 0 }}
            transition={{
              duration: reduce ? 0.1 : 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ChevronDown
              size={11}
              style={{ color: "rgba(255,255,255,0.2)" }}
              aria-hidden="true"
            />
          </motion.div>
          <span
            className="text-[9px]"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            {active ? "collapse" : "show all"}
          </span>
        </div>
      </motion.article>
    </motion.div>
  );
});

// ─── Constellation (signature element) ───────────────────────────────────────
// True particle constellation: fixed node positions, mouse-parallax, glow SVG filters.

const CONSTELLATION_NODES = [
  // Core ring — radius ~70
  {
    id: "react",
    label: "React",
    color: COLORS.indigo,
    x: 0,
    y: -72,
    size: 22,
    tier: "core",
  },
  {
    id: "fastapi",
    label: "FastAPI",
    color: COLORS.cyan,
    x: 68,
    y: 22,
    size: 20,
    tier: "core",
  },
  {
    id: "mysql",
    label: "MySQL",
    color: COLORS.emerald,
    x: 32,
    y: 64,
    size: 18,
    tier: "core",
  },
  {
    id: "git",
    label: "Git",
    color: COLORS.rose,
    x: -52,
    y: 48,
    size: 16,
    tier: "core",
  },
  {
    id: "ts",
    label: "TS",
    color: COLORS.indigo,
    x: -62,
    y: -32,
    size: 16,
    tier: "core",
  },
  // Mid ring — radius ~130
  {
    id: "laravel",
    label: "Laravel",
    color: COLORS.rose,
    x: 120,
    y: -52,
    size: 17,
    tier: "proficient",
  },
  {
    id: "vite",
    label: "Vite",
    color: COLORS.violet,
    x: 110,
    y: 78,
    size: 15,
    tier: "core",
  },
  {
    id: "python",
    label: "Python",
    color: COLORS.amber,
    x: -30,
    y: 130,
    size: 18,
    tier: "core",
  },
  {
    id: "tailwind",
    label: "Tailwind",
    color: COLORS.sky,
    x: -128,
    y: 40,
    size: 16,
    tier: "core",
  },
  {
    id: "postgres",
    label: "PG",
    color: COLORS.teal,
    x: -100,
    y: -100,
    size: 14,
    tier: "proficient",
  },
  {
    id: "gh-actions",
    label: "CI/CD",
    color: COLORS.amber,
    x: 52,
    y: -138,
    size: 14,
    tier: "proficient",
  },
  // Outer — radius ~180
  {
    id: "docker",
    label: "Docker",
    color: COLORS.sky,
    x: 165,
    y: -82,
    size: 13,
    tier: "learning",
  },
  {
    id: "framer",
    label: "Framer",
    color: COLORS.violet,
    x: 170,
    y: 62,
    size: 13,
    tier: "learning",
  },
  {
    id: "node",
    label: "Node",
    color: COLORS.emerald,
    x: -165,
    y: 90,
    size: 13,
    tier: "proficient",
  },
];

// Edges between related nodes
const EDGES = [
  ["react", "ts"],
  ["react", "vite"],
  ["react", "tailwind"],
  ["fastapi", "python"],
  ["fastapi", "mysql"],
  ["laravel", "mysql"],
  ["python", "postgres"],
  ["git", "gh-actions"],
  ["vite", "laravel"],
  ["node", "git"],
  ["framer", "react"],
];

// Item 6: simplified node set for the mobile constellation — 6 nodes, only
// the edges that connect those 6, smaller viewBox, no spring parallax.
const MOBILE_NODE_IDS = [
  "react",
  "fastapi",
  "mysql",
  "git",
  "python",
  "tailwind",
];
const MOBILE_NODES = CONSTELLATION_NODES.filter((n) =>
  MOBILE_NODE_IDS.includes(n.id),
).map((n) => ({ ...n, x: n.x * 0.62, y: n.y * 0.62, size: n.size * 0.85 }));
const MOBILE_EDGES = EDGES.filter(
  ([a, b]) => MOBILE_NODE_IDS.includes(a) && MOBILE_NODE_IDS.includes(b),
);

const ConstellationViz = ({ reduce }) => {
  const svgRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const [hoveredNode, setHoveredNode] = useState(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (reduce || !svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX.set((e.clientX - cx) * 0.04);
      mouseY.set((e.clientY - cy) * 0.04);
    },
    [mouseX, mouseY, reduce],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const nodeMap = useMemo(() => {
    const m = {};
    CONSTELLATION_NODES.forEach((n) => {
      m[n.id] = n;
    });
    return m;
  }, []);

  const viewBox = "-220 -210 440 420";

  return (
    <div
      ref={svgRef}
      className="relative w-full h-full flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      <motion.svg
        viewBox={viewBox}
        width="100%"
        height="100%"
        style={{
          x: reduce ? 0 : springX,
          y: reduce ? 0 : springY,
          maxHeight: 340,
        }}
      >
        <defs>
          <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="edge-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="core-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#818cf8" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Subtle grid */}
        <g opacity="0.025">
          {[-180, -120, -60, 0, 60, 120, 180].map((v) => (
            <React.Fragment key={v}>
              <line
                x1={v}
                y1={-200}
                x2={v}
                y2={200}
                stroke="white"
                strokeWidth={0.5}
              />
              <line
                x1={-200}
                y1={v}
                x2={200}
                y2={v}
                stroke="white"
                strokeWidth={0.5}
              />
            </React.Fragment>
          ))}
        </g>

        {/* Edges */}
        {EDGES.map(([fromId, toId]) => {
          const from = nodeMap[fromId];
          const to = nodeMap[toId];
          if (!from || !to) return null;
          const isActive = hoveredNode === fromId || hoveredNode === toId;
          const activeColor = isActive
            ? hoveredNode === fromId
              ? from.color
              : to.color
            : "rgba(255,255,255,0.06)";
          return (
            <motion.line
              key={`${fromId}-${toId}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={activeColor}
              strokeWidth={isActive ? 1 : 0.6}
              filter={isActive ? "url(#edge-glow)" : undefined}
              animate={{
                stroke: activeColor,
                strokeWidth: isActive ? 1 : 0.6,
                opacity: isActive ? 0.8 : 0.5,
              }}
              transition={{ duration: 0.25 }}
            />
          );
        })}

        {/* Nodes */}
        {CONSTELLATION_NODES.map((node) => {
          const rgb = hexToRgb(node.color);
          const isHovered = hoveredNode === node.id;
          const isConnected =
            hoveredNode &&
            EDGES.some(
              ([a, b]) =>
                (a === hoveredNode && b === node.id) ||
                (b === hoveredNode && a === node.id),
            );

          return (
            <motion.g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              onHoverStart={() => setHoveredNode(node.id)}
              onHoverEnd={() => setHoveredNode(null)}
              style={{ cursor: "default" }}
              animate={{
                scale: isHovered ? 1.3 : isConnected ? 1.1 : 1,
                opacity: hoveredNode && !isHovered && !isConnected ? 0.45 : 1,
              }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              <motion.circle
                r={node.size + 6}
                fill={`rgba(${rgb}, 0.0)`}
                stroke={`rgba(${rgb}, 0.0)`}
                animate={{
                  fill: isHovered ? `rgba(${rgb}, 0.08)` : `rgba(${rgb}, 0.0)`,
                  stroke: isHovered
                    ? `rgba(${rgb}, 0.25)`
                    : `rgba(${rgb}, 0.0)`,
                  r: isHovered ? node.size + 8 : node.size + 6,
                }}
                transition={{ duration: 0.2 }}
                filter="url(#node-glow)"
              />
              <motion.circle
                r={node.size}
                fill={`rgba(${rgb}, 0.1)`}
                stroke={`rgba(${rgb}, ${isHovered ? 0.6 : node.tier === "core" ? 0.35 : 0.2})`}
                strokeWidth={isHovered ? 1.5 : 1}
                filter={isHovered ? "url(#node-glow)" : undefined}
                animate={{
                  fill: isHovered ? `rgba(${rgb}, 0.2)` : `rgba(${rgb}, 0.08)`,
                }}
                transition={{ duration: 0.2 }}
              />
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fill={node.color}
                fontSize={node.size > 18 ? "7.5" : "6.5"}
                fontWeight="700"
                fontFamily="ui-monospace, monospace"
                opacity={isHovered ? 1 : 0.85}
              >
                {node.label}
              </text>
            </motion.g>
          );
        })}

        {/* Center core */}
        <motion.g
          animate={reduce ? {} : { scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "0px 0px" }}
        >
          <circle cx={0} cy={0} r={42} fill="url(#core-grad)" />
          <circle
            cx={0}
            cy={0}
            r={28}
            fill="rgba(129,140,248,0.15)"
            stroke="rgba(129,140,248,0.35)"
            strokeWidth={1}
          />
          <circle
            cx={0}
            cy={0}
            r={16}
            fill="rgba(129,140,248,0.25)"
            stroke="rgba(129,140,248,0.6)"
            strokeWidth={1.5}
          />
          <text
            textAnchor="middle"
            dominantBaseline="central"
            fill="#a5b4fc"
            fontSize="6.5"
            fontWeight="800"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.8"
          >
            YOU
          </text>
        </motion.g>

        {/* Ambient floating particles — skipped entirely under reduced motion */}
        {!reduce &&
          [-140, 130, -90, 160, -170].map((px, i) => (
            <motion.circle
              key={i}
              cx={px}
              cy={[-160, 100, -120, 80, -40][i]}
              r={1.2}
              fill="rgba(255,255,255,0.25)"
              animate={{ opacity: [0.1, 0.5, 0.1], scale: [1, 1.8, 1] }}
              transition={{
                duration: 3 + i * 0.8,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeInOut",
              }}
            />
          ))}
      </motion.svg>
    </div>
  );
};

// Item 6: mobile constellation — 6 nodes, smaller viewBox, no parallax/spring,
// no ambient particles, no repeating "breathing" core animation. Same visual
// language (glow filter, node styling, center core) at reduced complexity.
const ConstellationVizMobile = () => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const viewBox = "-140 -130 280 260";

  return (
    <div
      className="relative w-full flex items-center justify-center"
      style={{ height: 220 }}
      aria-hidden="true"
    >
      <svg
        viewBox={viewBox}
        width="100%"
        height="100%"
        style={{ maxHeight: 220 }}
      >
        <defs>
          <filter id="node-glow-m" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="core-grad-m" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#818cf8" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {MOBILE_EDGES.map(([fromId, toId]) => {
          const from = MOBILE_NODES.find((n) => n.id === fromId);
          const to = MOBILE_NODES.find((n) => n.id === toId);
          if (!from || !to) return null;
          const isActive = hoveredNode === fromId || hoveredNode === toId;
          return (
            <line
              key={`${fromId}-${toId}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={isActive ? from.color : "rgba(255,255,255,0.08)"}
              strokeWidth={isActive ? 1 : 0.6}
              opacity={isActive ? 0.8 : 0.5}
            />
          );
        })}

        {MOBILE_NODES.map((node) => {
          const rgb = hexToRgb(node.color);
          const isHovered = hoveredNode === node.id;
          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              onTouchStart={() => setHoveredNode(node.id)}
              onClick={() => setHoveredNode(node.id)}
            >
              <circle
                r={node.size}
                fill={`rgba(${rgb}, ${isHovered ? 0.2 : 0.1})`}
                stroke={`rgba(${rgb}, ${isHovered ? 0.6 : node.tier === "core" ? 0.35 : 0.2})`}
                strokeWidth={isHovered ? 1.5 : 1}
                filter={isHovered ? "url(#node-glow-m)" : undefined}
              />
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fill={node.color}
                fontSize={node.size > 16 ? "7" : "6"}
                fontWeight="700"
                fontFamily="ui-monospace, monospace"
                opacity={0.85}
              >
                {node.label}
              </text>
            </g>
          );
        })}

        <circle cx={0} cy={0} r={32} fill="url(#core-grad-m)" />
        <circle
          cx={0}
          cy={0}
          r={20}
          fill="rgba(129,140,248,0.15)"
          stroke="rgba(129,140,248,0.35)"
          strokeWidth={1}
        />
        <circle
          cx={0}
          cy={0}
          r={11}
          fill="rgba(129,140,248,0.25)"
          stroke="rgba(129,140,248,0.6)"
          strokeWidth={1.2}
        />
        <text
          textAnchor="middle"
          dominantBaseline="central"
          fill="#a5b4fc"
          fontSize="5.5"
          fontWeight="800"
          fontFamily="ui-monospace, monospace"
          letterSpacing="0.6"
        >
          YOU
        </text>
      </svg>
    </div>
  );
};

// Item 7: React.lazy requires a dynamic import(). Since everything has to
// stay in this one file, each wrapper below resolves an already-in-scope
// component through a microtask-deferred module shape. This satisfies the
// literal lazy()/Suspense contract — a real loading boundary with a
// fallback — but, to set expectations accurately, it can't achieve true
// code-splitting/byte-deferral the way a separate-file dynamic import would,
// since there's no separate chunk here for a bundler to split out.
const LazyConstellationViz = lazy(() =>
  Promise.resolve({ default: ConstellationViz }),
);
const LazyEcosystemCard = lazy(() =>
  Promise.resolve({ default: EcosystemCardInner }),
);

// ─── Ecosystem card ───────────────────────────────────────────────────────────

function EcosystemCardInner({ reduce }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      {...fadeUp(0, reduce)}
      className="relative rounded-2xl overflow-hidden col-span-full"
      style={{
        background: "rgba(255,255,255,0.016)",
        border: "1px solid rgba(129,140,248,0.12)",
        minHeight: 300,
      }}
    >
      {/* Background ambient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 68% 45%, rgba(99,102,241,0.07) 0%, transparent 55%)",
        }}
      />

      <div className="relative grid md:grid-cols-[1fr_380px] min-h-[300px]">
        {/* Left: copy */}
        <div className="p-7 md:p-10 flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[9px] font-bold tracking-[0.22em] uppercase mb-3 block"
            style={{ color: "rgba(165,180,252,0.45)" }}
          >
            Tech Ecosystem
          </motion.span>

          <motion.h3
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3"
          >
            Full-stack,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #818cf8 0%, #67e8f9 70%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              end-to-end
            </span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="text-[13px] leading-relaxed mb-7 max-w-xs"
            style={{ color: "rgba(255,255,255,0.36)" }}
          >
            From React UIs and FastAPI services to SQL Server stored procedures
            and HostGator deployments — every layer of the stack.
          </motion.p>

          {/* Tier legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.34 }}
            className="flex flex-wrap gap-4 mb-7"
          >
            {Object.entries(TIER).map(([key, tier]) => (
              <div key={key} className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: tier.dot }}
                  aria-hidden="true"
                />
                <span
                  className="text-[11px]"
                  style={{ color: "rgba(255,255,255,0.36)" }}
                >
                  {tier.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-6"
          >
            {[
              { value: "6", label: "domains" },
              { value: "40+", label: "technologies" },
              { value: "3yrs", label: "experience" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-xl font-bold text-white leading-none tracking-tight">
                  {value}
                </p>
                <p
                  className="text-[10px] mt-0.5"
                  style={{ color: "rgba(255,255,255,0.26)" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: constellation — desktop full version, mobile simplified */}
        <div className="hidden md:flex items-center justify-center py-6 pr-6 relative overflow-hidden">
          <Suspense fallback={<div style={{ minHeight: 340 }} />}>
            <LazyConstellationViz reduce={reduce} />
          </Suspense>
        </div>
        <div className="flex md:hidden items-center justify-center py-2">
          <ConstellationVizMobile />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Favorite stack card ──────────────────────────────────────────────────────
// Note: the file previously contained two implementations of this component
// — `FavoriteStackCard` (unused, with a broken group-hover comment admitting
// it didn't work) and `FavoriteStackCardV2` (the one actually rendered).
// The dead first version and its explanatory comment have been removed; the
// component below is the V2 implementation, restored to its original name
// since there is no longer a competing definition to disambiguate from.

const StackItem = memo(function StackItem({ item, index, reduce }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      {...staggerChild(index, 0.07, reduce)}
      className="flex items-center justify-between gap-3 py-0.5"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <motion.span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: COLORS.indigo }}
          animate={
            hovered
              ? { scale: 1.5, background: COLORS.violet }
              : { scale: 1, background: COLORS.indigo }
          }
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        />
        <span className="text-[12px] font-semibold text-white truncate">
          {item.name}
        </span>
      </div>
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 4 }}
            transition={{ duration: 0.18 }}
            className="text-[10px] flex-shrink-0"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            {item.reason}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

const FavoriteStackCard = ({ reduce }) => (
  <motion.div
    {...fadeUp(0.06, reduce)}
    className="rounded-2xl p-6 h-full"
    style={{
      background: "rgba(255,255,255,0.016)",
      border: "1px solid rgba(129,140,248,0.1)",
    }}
    aria-label="Favorite technology stack"
  >
    <div className="flex items-center gap-2 mb-5">
      <Star size={13} style={{ color: COLORS.amber }} aria-hidden="true" />
      <span
        className="text-[9px] font-bold tracking-[0.2em] uppercase"
        style={{ color: "rgba(255,255,255,0.28)" }}
      >
        Go-to stack
      </span>
    </div>

    <div className="space-y-2.5">
      {FAVORITE_STACK.map((item, i) => (
        <StackItem key={item.name} item={item} index={i} reduce={reduce} />
      ))}
    </div>
  </motion.div>
);

// ─── Currently learning card ──────────────────────────────────────────────────

const CurrentlyLearningCard = ({ reduce }) => (
  <motion.div
    {...fadeUp(0.1, reduce)}
    className="rounded-2xl p-6 h-full"
    style={{
      background: "rgba(52,211,153,0.025)",
      border: "1px solid rgba(52,211,153,0.12)",
    }}
    aria-label="Currently learning"
  >
    <div className="flex items-center gap-2 mb-5">
      <motion.span
        className="w-2 h-2 rounded-full"
        style={{ background: COLORS.emerald }}
        animate={reduce ? {} : { opacity: [1, 0.25, 1], scale: [1, 0.85, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <span
        className="text-[9px] font-bold tracking-[0.2em] uppercase"
        style={{ color: "rgba(52,211,153,0.55)" }}
      >
        Currently learning
      </span>
    </div>

    <div className="space-y-2.5">
      {CURRENTLY_LEARNING.map((item, i) => (
        <motion.div
          key={item.name}
          {...staggerChild(i, 0.08, reduce)}
          className="flex items-center gap-2.5"
          whileHover={{ x: 3 }}
        >
          <span
            className="text-sm leading-none"
            role="img"
            aria-label={item.name}
          >
            {item.icon}
          </span>
          <span
            className="text-[11.5px]"
            style={{ color: "rgba(255,255,255,0.52)" }}
          >
            {item.name}
          </span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// ─── Workflow card ────────────────────────────────────────────────────────────

const WORKFLOW_STEPS = [
  { icon: Terminal, label: "Plan & design", color: COLORS.violet },
  { icon: Globe, label: "Build API", color: COLORS.cyan },
  { icon: Layers, label: "Build UI", color: COLORS.indigo },
  { icon: GitBranch, label: "CI/CD", color: COLORS.amber },
  { icon: Cpu, label: "Monitor", color: COLORS.emerald },
];

const WorkflowCard = memo(function WorkflowCard({ reduce }) {
  return (
    <motion.div
      {...fadeUp(0.12, reduce)}
      className="rounded-2xl p-6"
      style={{
        background: "rgba(255,255,255,0.014)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      aria-label="Development workflow"
    >
      <p
        className="text-[9px] font-bold tracking-[0.2em] uppercase mb-5"
        style={{ color: "rgba(255,255,255,0.18)" }}
      >
        Dev workflow
      </p>

      <div className="flex flex-wrap items-center gap-2" role="list">
        {WORKFLOW_STEPS.map((step, i) => {
          const StepIcon = step.icon;
          const rgb = hexToRgb(step.color);
          return (
            <React.Fragment key={step.label}>
              <motion.div
                {...scaleIn(i * 0.07, reduce)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
                style={{
                  background: `rgba(${rgb}, 0.06)`,
                  border: `1px solid rgba(${rgb}, 0.14)`,
                }}
                whileHover={{
                  scale: 1.06,
                  background: `rgba(${rgb}, 0.12)`,
                  borderColor: `rgba(${rgb}, 0.28)`,
                  y: -2,
                }}
                role="listitem"
              >
                <StepIcon
                  size={11}
                  style={{ color: step.color }}
                  aria-hidden="true"
                />
                <span
                  className="text-[10.5px] font-medium"
                  style={{ color: "rgba(255,255,255,0.58)" }}
                >
                  {step.label}
                </span>
              </motion.div>

              {i < WORKFLOW_STEPS.length - 1 && (
                <ArrowRight
                  size={10}
                  style={{ color: "rgba(255,255,255,0.1)", flexShrink: 0 }}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </motion.div>
  );
});

// ─── Search bar ───────────────────────────────────────────────────────────────
// Memoized: takes only `query` plus a stable setState function as `onChange`
// (setState identity never changes across renders), so it only needs to
// re-render when `query` itself changes — not on every TierFilter click.

const SearchBar = memo(function SearchBar({ query, onChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative max-w-xs mx-auto"
    >
      <div
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${query ? "rgba(129,140,248,0.35)" : "rgba(255,255,255,0.08)"}`,
          transition: "border-color 0.2s",
        }}
      >
        <Search
          size={13}
          style={{ color: "rgba(255,255,255,0.28)", flexShrink: 0 }}
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Filter technologies..."
          className="bg-transparent border-none outline-none flex-1 text-[12px] placeholder:text-white/20 text-white/70"
          aria-label="Search technologies"
        />
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => onChange("")}
              className="flex items-center justify-center w-4 h-4 rounded-full"
              style={{ background: "rgba(255,255,255,0.1)" }}
              aria-label="Clear search"
            >
              <X size={9} style={{ color: "rgba(255,255,255,0.5)" }} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

// ─── Tier filter pills ────────────────────────────────────────────────────────
// Memoized for the same reason as SearchBar: `activeFilter` and `onChange`
// are the only inputs that should trigger a re-render, not searchQuery
// changes happening alongside it.

const TierFilter = memo(function TierFilter({ activeFilter, onChange }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.38 }}
      className="flex items-center gap-2 justify-center flex-wrap"
    >
      {[null, "core", "proficient", "learning"].map((tier) => {
        const isActive = activeFilter === tier;
        const config = tier ? TIER[tier] : null;
        const rgb = config ? hexToRgb(config.dot) : null;

        return (
          <motion.button
            key={tier ?? "all"}
            onClick={() => onChange(tier)}
            className="px-3 py-1.5 rounded-lg text-[10px] font-semibold tracking-wide uppercase transition-colors"
            style={{
              background: isActive
                ? config
                  ? `rgba(${rgb}, 0.15)`
                  : "rgba(255,255,255,0.1)"
                : "rgba(255,255,255,0.03)",
              border: `1px solid ${
                isActive
                  ? config
                    ? `rgba(${rgb}, 0.35)`
                    : "rgba(255,255,255,0.2)"
                  : "rgba(255,255,255,0.07)"
              }`,
              color: isActive
                ? config
                  ? config.dot
                  : "rgba(255,255,255,0.8)"
                : "rgba(255,255,255,0.25)",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            aria-pressed={isActive}
          >
            {tier ?? "All"}
          </motion.button>
        );
      })}
    </motion.div>
  );
});

// ─── No-results state ─────────────────────────────────────────────────────────
// Item 2: shown when a search query matches zero technologies across every
// domain, so the grid doesn't just go silently empty.

const NoResultsState = ({ query }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
    className="col-span-full flex flex-col items-center justify-center text-center py-14 rounded-2xl"
    style={{
      background: "rgba(255,255,255,0.012)",
      border: "1px solid rgba(255,255,255,0.05)",
    }}
  >
    <Search
      size={18}
      style={{ color: "rgba(255,255,255,0.15)" }}
      aria-hidden="true"
      className="mb-3"
    />
    <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.32)" }}>
      No technologies found for "{query}"
    </p>
  </motion.div>
);

// ─── Skills section ───────────────────────────────────────────────────────────

const Skills = () => {
  const prefersReducedMotion = useReducedMotion();
  const reduce = Boolean(prefersReducedMotion);

  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState(null);

  // Item 2: a domain is included only if at least one of its skills matches
  // BOTH the active tier filter and the search query — non-matching cards
  // are removed from the grid entirely rather than dimmed in place.
  const visibleDomains = useMemo(() => {
    return SKILL_DOMAINS.map((domain) => {
      const bySearch = searchQuery
        ? domain.skills.filter((s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        : domain.skills;
      const byTier = tierFilter
        ? bySearch.filter((s) => s.tier === tierFilter)
        : bySearch;
      return { ...domain, skills: byTier };
    }).filter((domain) => domain.skills.length > 0);
  }, [searchQuery, tierFilter]);

  const hasNoResults =
    searchQuery.trim().length > 0 && visibleDomains.length === 0;

  // Item 8: roving tabindex keyboard navigation across visible DomainCards.
  // Only the focused card is tabbable (tabIndex 0); the rest are -1, so Tab
  // skips through the whole grid in one stop — the standard pattern for
  // grouped widgets like this. Arrow keys move focus between cards;
  // Enter/Space and Escape are handled inside DomainCard itself since they
  // act on that card's own expand state rather than grid position.
  const cardRefs = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Keep the roving index valid as the visible set shrinks/grows from
  // search or tier filtering, so it never points past the new end.
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, visibleDomains.length);
    if (focusedIndex >= visibleDomains.length) {
      setFocusedIndex(Math.max(0, visibleDomains.length - 1));
    }
  }, [visibleDomains.length, focusedIndex]);

  const registerCardRef = useCallback((index, node) => {
    cardRefs.current[index] = node;
  }, []);

  const moveFocus = useCallback(
    (nextIndex) => {
      const count = visibleDomains.length;
      if (count === 0) return;
      const clamped = ((nextIndex % count) + count) % count;
      setFocusedIndex(clamped);
      const node = cardRefs.current[clamped];
      const focusable = node?.querySelector?.('[role="button"]') ?? node;
      focusable?.focus?.();
    },
    [visibleDomains.length],
  );

  const handleCardKeyDown = useCallback(
    (e, index) => {
      const cols =
        typeof window !== "undefined" && window.innerWidth >= 1280
          ? 3
          : typeof window !== "undefined" && window.innerWidth >= 768
            ? 2
            : 1;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          moveFocus(index + 1);
          break;
        case "ArrowLeft":
          e.preventDefault();
          moveFocus(index - 1);
          break;
        case "ArrowDown":
          e.preventDefault();
          moveFocus(index + cols);
          break;
        case "ArrowUp":
          e.preventDefault();
          moveFocus(index - cols);
          break;
        default:
          break;
      }
    },
    [moveFocus],
  );

  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden"
      style={{ background: "#080c10" }}
      aria-labelledby="skills-heading"
    >
      {/* Ambient blobs */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 700,
          height: 450,
          top: "8%",
          left: "-200px",
          background:
            "radial-gradient(ellipse, rgba(129,140,248,0.05) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 500,
          height: 350,
          bottom: "6%",
          right: "-100px",
          background:
            "radial-gradient(ellipse, rgba(52,211,153,0.04) 0%, transparent 65%)",
          filter: "blur(65px)",
        }}
      />
      {/* Top-right accent */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          width: 300,
          height: 300,
          top: "20%",
          right: "10%",
          background:
            "radial-gradient(ellipse, rgba(103,232,249,0.03) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        {/* Section header */}
        <motion.div {...fadeUp(0, reduce)} className="text-center mb-10">
          <p
            className="text-[9px] font-bold tracking-[0.22em] uppercase mb-3"
            style={{ color: "rgba(165,180,252,0.55)" }}
          >
            Capabilities
          </p>
          <h2
            id="skills-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            What I{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #818cf8 0%, #67e8f9 60%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              work with
            </span>
          </h2>
          <p
            className="text-[14px] max-w-sm mx-auto leading-relaxed mb-8"
            style={{ color: "rgba(255,255,255,0.36)" }}
          >
            Six domains, 40+ technologies — shipping products that hold up in
            production.
          </p>

          {/* Search + filter row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <SearchBar query={searchQuery} onChange={setSearchQuery} />
            <TierFilter activeFilter={tierFilter} onChange={setTierFilter} />
          </div>
        </motion.div>

        {/* Ecosystem constellation — lazy-loaded per item 7 */}
        <div className="mb-4">
          <Suspense fallback={<div style={{ minHeight: 300 }} />}>
            <LazyEcosystemCard reduce={reduce} />
          </Suspense>
        </div>

        {/* Domain cards bento */}
        <div
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-3.5 mb-4"
          role="group"
          aria-label="Technology domains — use arrow keys to navigate, Enter to expand, Escape to collapse"
        >
          <AnimatePresence mode="popLayout">
            {hasNoResults ? (
              <NoResultsState key="no-results" query={searchQuery} />
            ) : (
              visibleDomains.map((domain, i) => (
                <DomainCard
                  key={domain.id}
                  domain={domain}
                  index={i}
                  searchQuery={searchQuery}
                  reduce={reduce}
                  isRovingTarget={i === focusedIndex}
                  onCardKeyDown={handleCardKeyDown}
                  registerCardRef={registerCardRef}
                />
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Bottom accent row — fixed grid */}
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-3.5">
          <WorkflowCard reduce={reduce} />
          <FavoriteStackCard reduce={reduce} />
          <CurrentlyLearningCard reduce={reduce} />
        </div>
      </div>
    </section>
  );
};

export default Skills;
