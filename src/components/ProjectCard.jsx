import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  Github, ExternalLink, Lock, Users, Zap,
  ArrowUpRight, ChevronDown, ChevronUp, Circle,
} from "lucide-react";

// ─── Exports (used by FeaturedCard in Projects.jsx) ──────────────────────────

export function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r},${g},${b}`;
}

export const TYPE_META = {
  client:     { label: "Client",      Icon: Lock },
  solo:       { label: "Solo",        Icon: Users },
  opensource: { label: "Open Source", Icon: Zap },
};

export const STATUS_STYLE = {
  active:        { label: "Active",      color: "#34d399" },
  live:          { label: "Live",        color: "#34d399" },
  "in-progress": { label: "In progress", color: "#fbbf24" },
  completed:     { label: "Completed",   color: "#818cf8" },
};

// ─── Browser mockup wrapper ───────────────────────────────────────────────────

const BrowserMockup = ({ children, color }) => {
  const rgb = hexToRgb(color);
  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{
        background: "rgba(10,12,20,0.9)",
        border: `1px solid rgba(${rgb}, 0.15)`,
        borderRadius: "10px",
      }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-1.5 px-3 py-2 flex-shrink-0"
        style={{ background: "rgba(255,255,255,0.03)", borderBottom: `1px solid rgba(${rgb}, 0.08)` }}
      >
        <span className="w-2 h-2 rounded-full bg-red-500/60" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <span className="w-2 h-2 rounded-full bg-green-500/60" />
        <div
          className="ml-2 flex-1 h-4 rounded-md text-[9px] flex items-center px-2"
          style={{
            background: "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.2)",
            maxWidth: 140,
          }}
        >
          freightintime.net
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-hidden relative">{children}</div>
    </div>
  );
};

// ─── Mouse-follow spotlight ───────────────────────────────────────────────────

const CardSpotlight = ({ rgb }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  // attach to parent card
  useEffect(() => {
    const el = ref.current?.closest("article");
    if (!el) return;
    const enter = () => setActive(true);
    const leave = () => setActive(false);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    el.addEventListener("mousemove", handleMouseMove);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      active
        ? `radial-gradient(220px circle at ${x}px ${y}px, rgba(${rgb}, 0.09), transparent 70%)`
        : "none"
  );

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0 rounded-2xl"
      style={{ background }}
    />
  );
};

// ─── 3-D tilt hook ────────────────────────────────────────────────────────────

function useTilt(maxAngle = 10) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxAngle, -maxAngle]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxAngle, maxAngle]), { stiffness: 180, damping: 22 });

  const onMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const onMouseLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return { rotateX, rotateY, onMouseMove, onMouseLeave };
}

// ─── Magnetic button ──────────────────────────────────────────────────────────

const MagButton = ({ href, children, style, className, "aria-label": ariaLabel }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22 });
  const sy = useSpring(y, { stiffness: 260, damping: 22 });
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.28);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.28);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
      style={{ x: sx, y: sy, ...style }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      {children}
    </motion.a>
  );
};

// ─── Animated gradient border ─────────────────────────────────────────────────

const GradientBorder = ({ rgb, hovered }) => (
  <motion.div
    aria-hidden="true"
    className="absolute inset-0 rounded-2xl pointer-events-none"
    style={{ padding: 1, zIndex: 0 }}
    animate={{ opacity: hovered ? 1 : 0 }}
    transition={{ duration: 0.35 }}
  >
    <div
      className="absolute inset-0 rounded-2xl"
      style={{
        background: `linear-gradient(135deg, rgba(${rgb},0.5) 0%, transparent 50%, rgba(${rgb},0.2) 100%)`,
        borderRadius: "inherit",
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        padding: "1px",
      }}
    />
  </motion.div>
);

// ─── Image section with browser mockup + parallax ────────────────────────────

const CardImage = ({ project, hovered, rotateX, rotateY }) => {
  const rgb = hexToRgb(project.color);
  const [loaded, setLoaded] = useState(false);

  // Parallax — image moves slightly opposite to tilt
  const imgX = useTransform(rotateY, [-10, 10], ["4px", "-4px"]);
  const imgY = useTransform(rotateX, [10, -10], ["4px", "-4px"]);

  return (
    <div
      className="relative overflow-hidden flex-shrink-0"
      style={{ height: 188 }}
    >
      {/* Background gradient when no image / while loading */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, rgba(${rgb},0.1) 0%, rgba(${rgb},0.02) 100%)`,
        }}
      />

      <BrowserMockup color={project.color}>
        {project.image ? (
          <>
            {/* Skeleton shimmer */}
            {!loaded && (
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(90deg, rgba(${rgb},0.05) 25%, rgba(${rgb},0.12) 50%, rgba(${rgb},0.05) 75%)`,
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite",
                }}
              />
            )}
            <motion.img
              src={project.image}
              alt={`${project.title} preview`}
              className="w-full h-full object-cover object-top"
              style={{ x: imgX, y: imgY, scale: hovered ? 1.06 : 1 }}
              transition={{ scale: { duration: 0.55, ease: "easeOut" } }}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </>
        ) : (
          // Placeholder — initials with animated gradient
          <div
            className="absolute inset-0 flex items-center justify-center font-black text-4xl select-none tracking-tighter"
            style={{ color: `rgba(${rgb}, 0.22)` }}
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {project.title.slice(0, 2).toUpperCase()}
            </motion.span>
          </div>
        )}
      </BrowserMockup>

      {/* Bottom fade into card body */}
      <div
        className="absolute inset-x-0 bottom-0 h-10 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, rgba(6,10,14,1), transparent)" }}
      />

      {/* Year — top right */}
      <span
        className="absolute top-3 right-3 text-[10px] z-20"
        style={{ color: "rgba(255,255,255,0.28)" }}
      >
        {project.year}
      </span>
    </div>
  );
};

// ─── Badge row ────────────────────────────────────────────────────────────────

const BadgeRow = ({ project }) => {
  const status = STATUS_STYLE[project.status] ?? STATUS_STYLE.completed;
  const meta   = TYPE_META[project.type]   ?? TYPE_META.solo;
  const { Icon: TypeIcon } = meta;
  const sRgb = hexToRgb(status.color);

  return (
    <div className="flex flex-wrap items-center gap-1.5 mb-3">
      {/* Status */}
      <motion.span
        whileHover={{ scale: 1.06 }}
        className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold cursor-default"
        style={{
          background: `rgba(${sRgb}, 0.1)`,
          border: `1px solid rgba(${sRgb}, 0.28)`,
          color: status.color,
        }}
      >
        <motion.span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: status.color }}
          animate={{ opacity: status.label === "Active" || status.label === "Live" ? [1, 0.3, 1] : 1 }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
        {status.label}
      </motion.span>

      {/* Type */}
      <motion.span
        whileHover={{ scale: 1.06 }}
        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium cursor-default"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.09)",
          color: "rgba(255,255,255,0.38)",
        }}
      >
        <TypeIcon size={9} />
        {meta.label}
      </motion.span>
    </div>
  );
};

// ─── Tech chip section ────────────────────────────────────────────────────────

const TechChips = ({ tech, color }) => {
  const rgb  = hexToRgb(color);
  const all  = Object.values(tech ?? {}).flat();
  const show = all.slice(0, 5);
  const rest = all.length - 5;

  return (
    <div className="flex flex-wrap gap-1.5 mb-4">
      {show.map((t) => (
        <motion.span
          key={t}
          whileHover={{ scale: 1.08, y: -1 }}
          transition={{ duration: 0.15 }}
          className="px-2 py-0.5 rounded-full text-[10px] font-medium cursor-default"
          style={{
            background: `rgba(${rgb}, 0.07)`,
            border: `1px solid rgba(${rgb}, 0.2)`,
            color: `rgba(${rgb}, 0.8)`,
          }}
        >
          {t}
        </motion.span>
      ))}
      {rest > 0 && (
        <span
          className="px-2 py-0.5 rounded-full text-[10px] font-medium cursor-default"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "rgba(255,255,255,0.22)",
          }}
        >
          +{rest} more
        </span>
      )}
    </div>
  );
};

// ─── Expandable metrics panel ─────────────────────────────────────────────────

const MetricsPanel = ({ metrics, color, open }) => {
  const rgb = hexToRgb(color);
  return (
    <AnimatePresence initial={false}>
      {open && metrics?.length > 0 && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap gap-2 pt-3 pb-1">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="flex flex-col gap-0.5 px-3 py-2 rounded-xl"
                style={{
                  background: `rgba(${rgb}, 0.06)`,
                  border: `1px solid rgba(${rgb}, 0.14)`,
                }}
              >
                <span
                  className="text-base font-bold leading-none tracking-tight"
                  style={{ color }}
                >
                  {m.value}
                </span>
                <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Action buttons ───────────────────────────────────────────────────────────

const CardActions = ({ project }) => {
  const rgb = hexToRgb(project.color);
  return (
    <div
      className="flex items-center gap-2 pt-3.5 border-t"
      style={{ borderColor: "rgba(255,255,255,0.05)" }}
    >
      {project.github && (
        <MagButton
          href={project.github}
          aria-label={`${project.title} source code on GitHub`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
            color: "rgba(255,255,255,0.42)",
            transition: "color 0.2s, border-color 0.2s",
          }}
        >
          <Github size={12} />
          Code
        </MagButton>
      )}

      {project.live && (
        <MagButton
          href={project.live}
          aria-label={`${project.title} live demo`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-white relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, rgba(${rgb},0.45), rgba(${rgb},0.18))`,
            border: `1px solid rgba(${rgb}, 0.35)`,
            boxShadow: `0 0 16px rgba(${rgb}, 0.18)`,
          }}
        >
          {/* Shine sweep */}
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.12) 50%, transparent 65%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
          />
          <ExternalLink size={12} />
          Live
          <ArrowUpRight size={10} className="opacity-60" />
        </MagButton>
      )}

      {!project.github && !project.live && (
        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.18)" }}>
          Private / NDA
        </span>
      )}
    </div>
  );
};

// ─── ProjectCard ──────────────────────────────────────────────────────────────

const ProjectCard = ({ project }) => {
  const [hovered, setHovered]       = useState(false);
  const [expanded, setExpanded]     = useState(false);
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(8);
  const rgb = hexToRgb(project.color);
  const hasMetrics = project.metrics?.length > 0;

  return (
    <motion.article
      onMouseMove={onMouseMove}
      onMouseLeave={() => { onMouseLeave(); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        // base card colours
        background: "rgba(255,255,255,0.018)",
        border: `1px solid rgba(${rgb}, ${hovered ? 0.0 : 0.1})`,
        transition: "border-color 0.35s, box-shadow 0.35s",
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(${rgb},0.25), 0 0 40px rgba(${rgb},0.08)`
          : "0 2px 20px rgba(0,0,0,0.25)",
      }}
      whileHover={{ y: -6, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
      className="relative h-full flex flex-col rounded-2xl overflow-hidden
                 focus-within:ring-2 focus-within:ring-indigo-500
                 will-change-transform"
      aria-label={`${project.title} — ${project.tagline}`}
    >
      {/* Animated gradient border (replaces static border on hover) */}
      <GradientBorder rgb={rgb} hovered={hovered} />

      {/* Mouse-follow spotlight */}
      <CardSpotlight rgb={rgb} />

      {/* Frosted glass layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{ backdropFilter: "blur(1px)", zIndex: 0 }}
      />

      {/* ── Image ── */}
      <div className="relative z-10 p-2.5 pb-0">
        <CardImage
          project={project}
          hovered={hovered}
          rotateX={rotateX}
          rotateY={rotateY}
        />
      </div>

      {/* ── Body ── */}
      <div className="relative z-10 flex flex-col flex-1 px-5 pt-4 pb-5">
        <BadgeRow project={project} />

        {/* Title + tagline */}
        <h3 className="text-[15px] font-semibold text-white leading-snug mb-0.5">
          {project.title}
        </h3>
        <p
          className="text-xs mb-3 font-medium"
          style={{ color: `rgba(${rgb}, 0.85)` }}
        >
          {project.tagline}
        </p>
        <p
          className="text-[12px] leading-relaxed flex-1 mb-4"
          style={{ color: "rgba(255,255,255,0.38)" }}
        >
          {project.description}
        </p>

        {/* Tech chips */}
        <TechChips tech={project.tech} color={project.color} />

        {/* Expandable metrics */}
        {hasMetrics && (
          <>
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1.5 text-[10px] font-medium mb-1
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded w-fit"
              style={{ color: "rgba(255,255,255,0.3)" }}
              aria-expanded={expanded}
              aria-controls={`metrics-${project.id}`}
            >
              {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
              {expanded ? "Hide" : "Show"} impact metrics
            </button>
            <div id={`metrics-${project.id}`}>
              <MetricsPanel
                metrics={project.metrics}
                color={project.color}
                open={expanded}
              />
            </div>
          </>
        )}

        {/* Actions */}
        <CardActions project={project} />
      </div>
    </motion.article>
  );
};

export default ProjectCard;