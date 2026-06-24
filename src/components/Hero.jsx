"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ArrowDown,
  Sparkles,
  Code2,
  Zap,
} from "lucide-react";
import CountUp from "react-countup";
import Tilt from "react-parallax-tilt";

// ─── Constants ────────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  { href: "https://github.com/nahashon-source", label: "GitHub", icon: Github },
  {
    href: "https://linkedin.com/in/Nahashon-Mwendwa",
    label: "LinkedIn",
    icon: Linkedin,
  },
  { href: "mailto:nashonmwendwa0@gmail.com", label: "Email", icon: Mail },
];

const STATS = [
  { value: 9, suffix: "+", label: "Projects shipped" },
  { value: 2, suffix: "+", label: "Years building" },
  { value: 15, suffix: "+", label: "Technologies" },
];

const TECH_STACK = [
  "React",
  "TypeScript",
  "FastAPI",
  "Laravel",
  "PostgreSQL",
  "Docker",
];

const ORBIT_ITEMS = [
  { label: "React", angle: 0, color: "#61dafb", symbol: "⚛" },
  { label: "TypeScript", angle: 60, color: "#3178c6", symbol: "TS" },
  { label: "FastAPI", angle: 120, color: "#009688", symbol: "⚡" },
  { label: "Laravel", angle: 180, color: "#ff2d20", symbol: "L" },
  { label: "Postgres", angle: 240, color: "#336791", symbol: "🐘" },
  { label: "Docker", angle: 300, color: "#2496ed", symbol: "🐳" },
];

const ORBIT_RADIUS = 148;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0, duration = 0.6) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
});

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

// ─── Mouse spotlight ──────────────────────────────────────────────────────────

const MouseSpotlight = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: useTransform(
          [springX, springY],
          ([cx, cy]) =>
            `radial-gradient(600px circle at ${cx}px ${cy}px, rgba(99,102,241,0.07), transparent 70%)`
        ),
      }}
    />
  );
};

// ─── Background mesh ──────────────────────────────────────────────────────────

const BackgroundMesh = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 overflow-hidden"
  >
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 700,
        height: 700,
        top: "-200px",
        left: "-150px",
        background:
          "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)",
        filter: "blur(40px)",
      }}
      animate={{ x: [0, 40, 0], y: [0, 60, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 500,
        height: 500,
        top: "10%",
        right: "-100px",
        background:
          "radial-gradient(circle, rgba(34,211,238,0.09) 0%, transparent 65%)",
        filter: "blur(50px)",
      }}
      animate={{ x: [0, -50, 0], y: [0, 80, 0] }}
      transition={{
        duration: 22,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 3,
      }}
    />
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 600,
        height: 400,
        bottom: "-100px",
        left: "30%",
        background:
          "radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 65%)",
        filter: "blur(60px)",
      }}
      animate={{ x: [0, 30, 0], y: [0, -40, 0] }}
      transition={{
        duration: 26,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 6,
      }}
    />
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "56px 56px",
        maskImage:
          "radial-gradient(ellipse 90% 80% at 50% 50%, black 10%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 90% 80% at 50% 50%, black 10%, transparent 100%)",
      }}
    />
  </div>
);

// ─── Orbit badge ──────────────────────────────────────────────────────────────

const OrbitBadge = ({ label, angle, color, symbol, radius }) => {
  const rad = (angle * Math.PI) / 180;
  return (
    <motion.div
      aria-label={label}
      title={label}
      className="absolute flex items-center justify-center rounded-xl select-none"
      style={{
        width: 38,
        height: 38,
        left: "50%",
        top: "50%",
        marginLeft: -19,
        marginTop: -19,
        background: `rgba(${hexToRgb(color)}, 0.12)`,
        border: `1px solid rgba(${hexToRgb(color)}, 0.3)`,
        backdropFilter: "blur(8px)",
        fontSize: "11px",
        fontWeight: 700,
        color,
        zIndex: 10,
      }}
      animate={{ x: Math.cos(rad) * radius, y: Math.sin(rad) * radius }}
      transition={{ type: "spring", stiffness: 60, damping: 14 }}
      whileHover={{ scale: 1.2 }}
    >
      {symbol}
    </motion.div>
  );
};

// ─── Profile card ─────────────────────────────────────────────────────────────

const ProfileCard = () => {
  const [orbitAngle, setOrbitAngle] = useState(0);

  useEffect(() => {
    let frame;
    const tick = () => {
      setOrbitAngle((a) => (a + 0.18) % 360);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 340, height: 340 }}
    >
      {/* Orbit ring */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `rotate(${orbitAngle}deg)`,
          willChange: "transform",
        }}
      >
        {ORBIT_ITEMS.map((item) => (
          <OrbitBadge key={item.label} {...item} radius={ORBIT_RADIUS} />
        ))}
      </div>

      {/* Glow ring */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ inset: 20 }}
        animate={{
          boxShadow: [
            "0 0 0 1px rgba(99,102,241,0.2), 0 0 30px rgba(99,102,241,0.06)",
            "0 0 0 1px rgba(99,102,241,0.35), 0 0 50px rgba(99,102,241,0.14)",
            "0 0 0 1px rgba(99,102,241,0.2), 0 0 30px rgba(99,102,241,0.06)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Spinning rings */}
      <motion.div
        aria-hidden="true"
        className="absolute rounded-full border pointer-events-none"
        style={{ inset: 20, borderColor: "rgba(99,102,241,0.2)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute rounded-full border border-dashed pointer-events-none"
        style={{ inset: 30, borderColor: "rgba(34,211,238,0.15)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Tilt card */}
      <Tilt
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        perspective={800}
        glareEnable
        glareMaxOpacity={0.08}
        glareColor="#6366f1"
        glarePosition="all"
        scale={1.03}
        transitionSpeed={600}
        style={{ borderRadius: "50%" }}
      >
        <div className="relative" style={{ width: 176, height: 176 }}>
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(34,211,238,0.08))",
              backdropFilter: "blur(20px)",
              border: "1.5px solid rgba(255,255,255,0.1)",
            }}
          />
          <img
            src="/images/profile.jpeg"
            alt="Nahashon Mwendwa — Full-Stack Developer"
            className="absolute inset-0 w-full h-full rounded-full object-cover"
            style={{ border: "2px solid rgba(99,102,241,0.4)" }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling.style.display = "flex";
            }}
          />
          <div
            className="absolute inset-0 rounded-full items-center justify-center text-4xl font-bold"
            style={{
              display: "none",
              background: "linear-gradient(135deg, #1e1b4b, #0c1a2e)",
              color: "rgba(99,102,241,0.6)",
              border: "2px solid rgba(99,102,241,0.3)",
            }}
          >
            NM
          </div>
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)",
            }}
          />
        </div>
      </Tilt>

      {/* Status chip */}
      <motion.div
        className="absolute flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-medium"
        style={{
          top: 40,
          right: -12,
          background: "rgba(5,8,16,0.85)",
          border: "1px solid rgba(34,197,94,0.25)",
          backdropFilter: "blur(12px)",
          color: "rgba(134,239,172,0.9)",
        }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        Open to work
      </motion.div>

      {/* Stack chip */}
      <motion.div
        className="absolute flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-medium whitespace-nowrap"
        style={{
          bottom: 50,
          left: -20,
          background: "rgba(5,8,16,0.85)",
          border: "1px solid rgba(99,102,241,0.25)",
          backdropFilter: "blur(12px)",
          color: "rgba(165,180,252,0.9)",
        }}
        animate={{ y: [0, 4, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Zap size={11} style={{ color: "#818cf8" }} />
        React · FastAPI · Laravel
      </motion.div>
    </div>
  );
};

// ─── Stat card ────────────────────────────────────────────────────────────────

const StatCard = ({ value, suffix, label, delay }) => {
  const [started, setStarted] = useState(false);
  return (
    <motion.div
      {...fadeUp(delay)}
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true }}
      className="flex flex-col gap-1"
    >
      <span
        className="text-3xl font-bold leading-none tracking-tight"
        style={{
          background: "linear-gradient(135deg, #a5b4fc, #67e8f9)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
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

// ─── Magnetic button ──────────────────────────────────────────────────────────

const MagneticButton = ({ children, className, href, style, ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });

  const handleMouseMove = useCallback(
    (e) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
      y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY, ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Tag>
  );
};

// ─── Social icon with tooltip ─────────────────────────────────────────────────

const SocialIcon = ({ href, label, icon: Icon }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="relative">
      <MagneticButton
        href={href}
        target={label !== "Email" ? "_blank" : undefined}
        rel="noopener noreferrer"
        aria-label={label}
        className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        style={{
          background: hovered
            ? "rgba(99,102,241,0.12)"
            : "rgba(255,255,255,0.04)",
          border: hovered
            ? "1px solid rgba(99,102,241,0.35)"
            : "1px solid rgba(255,255,255,0.08)",
          boxShadow: hovered ? "0 0 16px rgba(99,102,241,0.2)" : "none",
          color: hovered ? "#a5b4fc" : "rgba(255,255,255,0.35)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon size={17} />
      </MagneticButton>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap pointer-events-none z-20"
            style={{
              background: "rgba(15,16,28,0.95)",
              border: "1px solid rgba(99,102,241,0.25)",
              color: "#a5b4fc",
            }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Scroll indicator ─────────────────────────────────────────────────────────

const ScrollIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.4 }}
    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
    aria-hidden="true"
  >
    <div
      className="w-6 h-9 rounded-full flex items-start justify-center pt-2"
      style={{ border: "1.5px solid rgba(99,102,241,0.35)" }}
    >
      <motion.div
        className="w-1 h-1.5 rounded-full"
        style={{ background: "#818cf8" }}
        animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
    <motion.div
      animate={{ y: [0, 4, 0] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <ArrowDown size={13} style={{ color: "rgba(99,102,241,0.5)" }} />
    </motion.div>
  </motion.div>
);

// ─── Hero ─────────────────────────────────────────────────────────────────────

const Hero = () => (
  <section
    className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    style={{ background: "#050810" }}
    aria-label="Hero section"
  >
    <MouseSpotlight />
    <BackgroundMesh />

    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      style={{ opacity: 0.06, mixBlendMode: "luminosity" }}
      aria-hidden="true"
    >
      <source src="/video/hero.mp4" type="video/mp4" />
    </video>

    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(5,8,16,0.7) 100%)",
      }}
    />

    <div className="relative z-10 container mx-auto px-6 py-28">
      <div className="grid lg:grid-cols-[1fr_380px] gap-20 items-center">
        {/* Left */}
        <div className="max-w-xl">
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 mb-8"
          >
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: "rgba(99,102,241,0.08)",
                border: "1px solid rgba(99,102,241,0.22)",
                color: "#a5b4fc",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <MapPin size={11} />
              Nairobi, Kenya
              <span style={{ color: "rgba(165,180,252,0.4)" }}>·</span>
              Available for opportunities
            </div>
          </motion.div>

          <motion.p
            {...fadeUp(0.07)}
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "rgba(165,180,252,0.6)" }}
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            {...fadeUp(0.12)}
            className="font-bold leading-[1.02] tracking-tight mb-4"
            style={{ fontSize: "clamp(48px, 7vw, 80px)" }}
          >
            <span className="text-white">Nahashon</span>
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #818cf8 0%, #67e8f9 55%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Mwendwa
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.18)}
            className="text-xl font-light mb-5 tracking-tight"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Full-Stack Developer
          </motion.p>

          <motion.p
            {...fadeUp(0.23)}
            className="text-[15px] leading-relaxed mb-10"
            style={{ color: "rgba(255,255,255,0.38)", maxWidth: "440px" }}
          >
            Building scalable web applications, enterprise systems, APIs, and
            digital experiences using modern technologies and clean
            architecture.
          </motion.p>

          {/* Stats */}
          <motion.div
            {...fadeUp(0.28)}
            className="flex items-center gap-8 mb-10"
          >
            {STATS.map((stat, i) => (
              <React.Fragment key={stat.label}>
                <StatCard {...stat} delay={0.28 + i * 0.06} />
                {i < STATS.length - 1 && (
                  <div
                    className="w-px self-stretch"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  />
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.35)}
            className="flex flex-wrap items-center gap-3 mb-9"
          >
            <MagneticButton
              href="#projects"
              className="relative flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #0891b2)",
                boxShadow:
                  "0 0 24px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
              whileHover={{
                scale: 1.03,
                boxShadow:
                  "0 0 36px rgba(99,102,241,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              />
              <Sparkles size={15} />
              View projects
            </MagneticButton>

            <MagneticButton
              href="#contact"
              className="flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.55)",
              }}
              whileHover={{
                background: "rgba(99,102,241,0.08)",
                borderColor: "rgba(99,102,241,0.3)",
                color: "#a5b4fc",
                scale: 1.03,
              }}
              whileTap={{ scale: 0.97 }}
            >
              Get in touch
            </MagneticButton>
          </motion.div>

          {/* Socials */}
          <motion.div {...fadeUp(0.4)} className="flex items-center gap-2">
            {SOCIAL_LINKS.map((link) => (
              <SocialIcon key={link.label} {...link} />
            ))}
          </motion.div>
        </div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <ProfileCard />

          {/* Tech stack */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="rounded-2xl p-4 w-full"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
            }}
          >
            <p
              className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-3"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Core stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {TECH_STACK.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  whileHover={{ scale: 1.06 }}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium cursor-default"
                  style={{
                    background: "rgba(99,102,241,0.07)",
                    border: "1px solid rgba(99,102,241,0.2)",
                    color: "rgba(165,180,252,0.75)",
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Currently building card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex items-center gap-3 w-full rounded-xl px-4 py-3"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              <Code2 size={15} style={{ color: "#818cf8" }} />
            </div>
            <div>
              <p
                className="text-xs font-medium"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Currently building
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                Logistics platform · FIT
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span
                className="text-[10px]"
                style={{ color: "rgba(134,239,172,0.7)" }}
              >
                Active
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>

    <ScrollIndicator />
  </section>
);

export default Hero;
