import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, MapPin } from "lucide-react";

const SOCIAL_LINKS = [
  {
    href: "https://github.com/nahashon-source",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://linkedin.com/in/Nahashon-Mwendwa",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "mailto:nashonmwendwa0@gmail.com",
    label: "Email",
    icon: Mail,
  },
];

const TECH_STACK = [
  "React", "TypeScript", "FastAPI", "Laravel", "PostgreSQL", "Docker",
];

const STATS = [
  { value: "9+", label: "Projects" },
  { value: "2+", label: "Years exp." },
  { value: "15+", label: "Technologies" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#080c10]">

      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* Green ambient glow */}
      <div className="absolute top-[-100px] right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)" }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#080c10]/60" />

      <div className="relative z-10 container mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>

            {/* Availability badge */}
            <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/8 border border-green-500/20 text-green-400 text-xs mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <MapPin size={12} />
              Nairobi, Kenya · Available for opportunities
            </motion.div>

            <motion.p {...fadeUp(0.05)} className="text-xs font-medium text-green-400 tracking-widest uppercase mb-3">
              Hello, I'm
            </motion.p>

            <motion.h1 {...fadeUp(0.1)} className="text-5xl md:text-6xl lg:text-[68px] font-bold leading-[1.04] tracking-tight text-white mb-3">
              Nahashon<br />
              <span className="text-green-500">Mwendwa</span>
            </motion.h1>

            <motion.p {...fadeUp(0.15)} className="text-xl text-white/35 font-light mb-5 tracking-tight">
              Full-Stack Developer
            </motion.p>

            <motion.p {...fadeUp(0.2)} className="text-[15px] text-white/40 leading-relaxed max-w-md mb-9">
              Building scalable web applications, enterprise systems, APIs, and digital
              experiences using modern technologies and clean architecture.
            </motion.p>

            {/* Stats */}
            <motion.div {...fadeUp(0.25)} className="flex items-center gap-8 mb-9">
              {STATS.map((stat, i) => (
                <React.Fragment key={stat.label}>
                  <div>
                    <p className="text-3xl font-bold text-green-500 tracking-tight leading-none">{stat.value}</p>
                    <p className="text-xs text-white/30 mt-1 tracking-wide">{stat.label}</p>
                  </div>
                  {i < STATS.length - 1 && (
                    <div className="w-px self-stretch bg-white/[0.07]" />
                  )}
                </React.Fragment>
              ))}
            </motion.div>

            {/* Action buttons */}
            <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-3 mb-8">
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-600 text-white text-sm font-medium rounded-xl transition-colors"
              >
                View projects
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3 text-white/55 text-sm border border-white/10 rounded-xl hover:text-white hover:border-white/20 hover:bg-white/[0.03] transition-all"
              >
                Get in touch
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div {...fadeUp(0.35)} className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="
                    w-9 h-9 flex items-center justify-center
                    rounded-lg border border-white/[0.07]
                    bg-white/[0.03] text-white/35
                    hover:text-green-400 hover:border-green-500/30 hover:bg-green-500/[0.06]
                    transition-all
                  "
                >
                  <Icon size={16} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — profile card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-[280px]">

              {/* Profile image */}
              <div className="relative w-[200px] h-[200px] mx-auto mb-5">
                {/* Rings */}
                <div className="absolute inset-[-12px] rounded-full border border-green-500/15" />
                <div className="absolute inset-[-24px] rounded-full border border-green-500/6" />

                <img
                  src="/images/profile.jpeg"
                  alt="Nahashon Mwendwa"
                  className="w-full h-full rounded-full object-cover border-2 border-green-500/30"
                  // Fallback: shows initials if image fails
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling.style.display = "flex";
                  }}
                />
                {/* Initials fallback */}
                <div
                  className="w-full h-full rounded-full border-2 border-green-500/30 bg-[#0f2419] items-center justify-center text-4xl font-bold text-green-500/50 tracking-tighter absolute inset-0"
                  style={{ display: "none" }}
                >
                  NM
                </div>

                {/* Floating chips */}
                <div className="absolute top-2 -right-8 flex items-center gap-1.5 px-3 py-1.5 bg-[#080c10]/90 border border-white/8 rounded-lg text-[11px] text-white/55 backdrop-blur-sm whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Open to work
                </div>

                <div className="absolute bottom-4 -left-12 flex items-center gap-1.5 px-3 py-1.5 bg-[#080c10]/90 border border-white/8 rounded-lg text-[11px] text-white/55 backdrop-blur-sm whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  React · FastAPI · Laravel
                </div>
              </div>

              {/* Tech stack card */}
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
                <p className="text-[10px] tracking-widest uppercase text-white/20 mb-3">Core stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {TECH_STACK.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[11px] text-green-400/70 bg-green-500/[0.06] border border-green-500/15 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <div className="w-px h-10 bg-gradient-to-b from-green-500/40 to-transparent" />
        <p className="text-[10px] tracking-widest uppercase text-white/20">Scroll</p>
      </motion.div>
    </section>
  );
};

export default Hero;