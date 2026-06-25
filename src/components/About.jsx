import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Code2,
  BookOpen,
  HeartHandshake,
  MapPin,
  Zap,
  Terminal,
  Globe,
  ArrowRight,
  Coffee,
  Network,
} from "lucide-react";
import CountUp from "react-countup";

// ─── Data ─────────────────────────────────────────────────────────────────────

const TIMELINE = [
  {
    year: "2021",
    title: "Started the journey",
    desc: "Wrote my first lines of code and got hooked on building things.",
    color: "#818cf8",
  },
  {
    year: "2022",
    title: "Moringa School",
    desc: "Completed an intensive Software Engineering program — full-stack development, databases, and APIs.",
    color: "#67e8f9",
  },
  {
    year: "2025",
    title: "Internship at Freight In Time",
    desc: "One-year internship at FIT (JKIA) — Laravel development, logistics systems, and IT support.",
    color: "#a78bfa",
  },
  {
    year: "2026",
    title: "Growing as a developer",
    desc: "Building backend-focused full-stack applications and open to new opportunities.",
    color: "#34d399",
  },
];

const HIGHLIGHTS = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    desc: "Building apps end-to-end with React, Laravel, FastAPI, and SQL databases.",
    color: "#818cf8",
  },
  {
    icon: Globe,
    title: "Backend & APIs",
    desc: "Comfortable designing REST APIs and backend logic for real-world systems.",
    color: "#67e8f9",
  },
  {
    icon: Network,
    title: "IT & Systems Support",
    desc: "Hands-on experience with networking, system setup, and internal IT support.",
    color: "#a78bfa",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    desc: "Always learning — currently deepening backend and systems engineering skills.",
    color: "#34d399",
  },
];

const STATS = [
  { value: 4, suffix: "+", label: "Projects shipped" },
  { value: 3, suffix: "+", label: "Years building" },
  { value: 8, suffix: "+", label: "Technologies" },
  { value: 100, suffix: "%", label: "Dedication" },
];

const STACK_CHIPS = [
  "React",
  "JavaScript",
  "Laravel",
  "FastAPI",
  "PHP",
  "PostgreSQL",
  "MySQL",
  "Tailwind CSS",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true },
});

// ─── Animated stat ────────────────────────────────────────────────────────────

const AnimatedStat = ({ value, suffix, label, color, delay }) => {
  const [started, setStarted] = useState(false);
  return (
    <motion.div
      {...fadeUp(delay)}
      onViewportEnter={() => setStarted(true)}
      className="flex flex-col gap-1"
    >
      <span
        className="text-3xl font-bold leading-none tracking-tight"
        style={{ color }}
      >
        {started ? (
          <CountUp end={value} duration={2} suffix={suffix} />
        ) : (
          `0${suffix}`
        )}
      </span>
      <span
        className="text-xs tracking-wide"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        {label}
      </span>
    </motion.div>
  );
};

// ─── Tilt card (CSS-only, no extra lib) ──────────────────────────────────────

const TiltCard = ({ children, className, style }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

// ─── Highlight card ───────────────────────────────────────────────────────────

const HighlightCard = ({ icon: Icon, title, desc, color, delay }) => (
  <motion.div {...fadeUp(delay)}>
    <TiltCard
      className="h-full rounded-2xl p-5 cursor-default"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
        style={{
          background: `rgba(${hexToRgb(color)}, 0.1)`,
          border: `1px solid rgba(${hexToRgb(color)}, 0.2)`,
        }}
      >
        <Icon size={17} style={{ color }} />
      </div>
      <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
      <p
        className="text-xs leading-relaxed"
        style={{ color: "rgba(255,255,255,0.38)" }}
      >
        {desc}
      </p>
    </TiltCard>
  </motion.div>
);

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

// ─── About ────────────────────────────────────────────────────────────────────

const About = () => {
  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
      style={{ background: "#060a0d" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 600,
          height: 600,
          top: "-100px",
          left: "-100px",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 500,
          height: 500,
          bottom: "-100px",
          right: "-50px",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        {/* Section label */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ color: "rgba(165,180,252,0.6)" }}
          >
            About me
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            The developer behind
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #818cf8 0%, #67e8f9 60%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              the work
            </span>
          </h2>
        </motion.div>

        {/* ── BENTO GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
          {/* ── Bio card — wide ── */}
          <motion.div
            {...fadeUp(0.05)}
            className="md:col-span-2 rounded-2xl p-7 relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Floating code snippet */}
            <div
              aria-hidden="true"
              className="absolute top-5 right-5 rounded-xl px-3 py-2 text-[11px] font-mono hidden lg:block"
              style={{
                background: "rgba(99,102,241,0.07)",
                border: "1px solid rgba(99,102,241,0.15)",
                color: "rgba(165,180,252,0.6)",
                lineHeight: 1.8,
              }}
            >
              <span style={{ color: "#818cf8" }}>const</span> dev = {"{"}
              <br />
              &nbsp;&nbsp;name:{" "}
              <span style={{ color: "#67e8f9" }}>"Nahashon"</span>,<br />
              &nbsp;&nbsp;focus:{" "}
              <span style={{ color: "#67e8f9" }}>"full-stack"</span>,<br />
              &nbsp;&nbsp;status:{" "}
              <span style={{ color: "#34d399" }}>"open"</span>
              <br />
              {"}"};
            </div>

            <div className="flex items-center gap-2 mb-5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(34,211,238,0.1))",
                  border: "1px solid rgba(99,102,241,0.3)",
                  color: "#a5b4fc",
                }}
              >
                N
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Nahashon Mwendwa
                </p>
                <div
                  className="flex items-center gap-1.5 text-[11px]"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  <MapPin size={10} />
                  Nairobi, Kenya
                  <span className="w-1 h-1 rounded-full bg-white/20 inline-block" />
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                  <span style={{ color: "rgba(134,239,172,0.8)" }}>
                    Available
                  </span>
                </div>
              </div>
            </div>

            <p
              className="text-[15px] leading-relaxed mb-4 max-w-lg"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              I'm a full-stack developer from Nairobi, Kenya, and a graduate of
              Moringa School's Software Engineering program. During a one-year
              internship at Freight In Time (FIT) at JKIA, I worked on Laravel
              applications, logistics-related systems, and hands-on IT support —
              from networking and system configuration to building internal
              tools. I care about writing code that{" "}
              <span className="text-white font-medium">
                solves real problems
              </span>
              .
            </p>
            <p
              className="text-[14px] leading-relaxed max-w-lg"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              I enjoy working across the stack — React on the frontend, Laravel
              and FastAPI on the backend — but I'm especially drawn to backend
              development, APIs, and enterprise systems. I'm currently building
              logistics and business applications, and open to full-time
              opportunities.
            </p>
          </motion.div>

          {/* ── Stats card ── */}
          <motion.div
            {...fadeUp(0.1)}
            className="rounded-2xl p-6 flex flex-col justify-between"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p
              className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-5"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              By the numbers
            </p>
            <div className="grid grid-cols-2 gap-5">
              {STATS.map((stat, i) => {
                const colors = ["#818cf8", "#67e8f9", "#a78bfa", "#34d399"];
                return (
                  <AnimatedStat
                    key={stat.label}
                    {...stat}
                    color={colors[i]}
                    delay={0.15 + i * 0.05}
                  />
                );
              })}
            </div>
            <div
              className="mt-6 flex items-center gap-2 text-xs"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              <Coffee size={12} />
              Powered by curiosity (and coffee)
            </div>
          </motion.div>
        </div>

        {/* ── Row 2: Philosophy + Timeline ── */}
        <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr] gap-4 mb-4">
          {/* Philosophy / mission */}
          <motion.div
            {...fadeUp(0.12)}
            className="rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(34,211,238,0.03))",
              border: "1px solid rgba(99,102,241,0.15)",
            }}
          >
            <div>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
                style={{
                  background: "rgba(99,102,241,0.12)",
                  border: "1px solid rgba(99,102,241,0.2)",
                }}
              >
                <Zap size={15} style={{ color: "#818cf8" }} />
              </div>
              <p
                className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-3"
                style={{ color: "rgba(165,180,252,0.4)" }}
              >
                Philosophy
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                "Good software is invisible — it just works. My job is to make
                the complex feel effortless for the people who use it."
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {STACK_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                  style={{
                    background: "rgba(99,102,241,0.07)",
                    border: "1px solid rgba(99,102,241,0.15)",
                    color: "rgba(165,180,252,0.65)",
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Developer journey timeline */}
          <motion.div
            {...fadeUp(0.14)}
            className="rounded-2xl p-6"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p
              className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-6"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Developer journey
            </p>

            <div className="relative">
              {/* Vertical track */}
              <div
                className="absolute left-[15px] top-0 bottom-0 w-px"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />

              <div className="space-y-6">
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.2 + i * 0.08,
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    viewport={{ once: true }}
                    className="relative pl-10 flex items-start gap-3"
                  >
                    {/* Node */}
                    <div
                      className="absolute left-[9px] top-1.5 w-3 h-3 rounded-full"
                      style={{
                        background: item.color,
                        boxShadow: `0 0 8px ${item.color}80`,
                      }}
                    />
                    <div
                      className="text-xs font-bold tabular-nums flex-shrink-0 mt-0.5"
                      style={{ color: item.color, minWidth: 36 }}
                    >
                      {item.year}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white leading-none mb-1">
                        {item.title}
                      </p>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Row 3: Highlight cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
          {HIGHLIGHTS.map((item, i) => (
            <HighlightCard key={item.title} {...item} delay={0.08 * i} />
          ))}
        </div>

        {/* ── Row 4: "What I build" + CTA ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* What I build */}
          <motion.div
            {...fadeUp(0.18)}
            className="rounded-2xl p-6"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Terminal size={14} style={{ color: "#818cf8" }} />
              <p
                className="text-[10px] font-semibold tracking-[0.18em] uppercase"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                What I build
              </p>
            </div>
            <div className="space-y-3">
              {[
                ["Web applications", "React · JavaScript · Tailwind CSS"],
                ["APIs & backends", "Laravel · FastAPI · PHP"],
                ["Database systems", "PostgreSQL · MySQL"],
                [
                  "IT & networking support",
                  "Windows · routers · network setup",
                ],
              ].map(([cat, stack]) => (
                <div
                  key={cat}
                  className="flex items-center justify-between py-2.5 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.05)" }}
                >
                  <span className="text-sm text-white/60">{cat}</span>
                  <span
                    className="text-xs"
                    style={{ color: "rgba(165,180,252,0.55)" }}
                  >
                    {stack}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA card */}
          <motion.div
            {...fadeUp(0.2)}
            className="rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(34,211,238,0.04))",
              border: "1px solid rgba(99,102,241,0.18)",
            }}
          >
            {/* BG glow */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at top right, rgba(99,102,241,0.1) 0%, transparent 60%)",
              }}
            />

            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span
                  className="text-xs"
                  style={{ color: "rgba(134,239,172,0.8)" }}
                >
                  Available for opportunities
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                Let's build something worth building.
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.38)" }}
              >
                Open to full-time roles and full-stack/backend opportunities
                where I can keep learning, contribute to real systems, and grow
                as an engineer.
              </p>
            </div>

            <div className="relative mt-6 flex flex-col sm:flex-row gap-3">
              <motion.a
                href="#contact"
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #0891b2)",
                  boxShadow: "0 0 20px rgba(99,102,241,0.3)",
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 30px rgba(99,102,241,0.45)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                Get in touch
                <ArrowRight size={14} />
              </motion.a>
              <motion.a
                href="#projects"
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.5)",
                }}
                whileHover={{
                  background: "rgba(99,102,241,0.08)",
                  borderColor: "rgba(99,102,241,0.3)",
                  color: "#a5b4fc",
                  scale: 1.03,
                }}
                whileTap={{ scale: 0.97 }}
              >
                View work
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
