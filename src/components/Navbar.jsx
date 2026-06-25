import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Download, Mail } from "lucide-react";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

// Swap for your actual resume asset path or CMS link.
const RESUME_HREF = "/resume.pdf";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl transition-colors duration-300
        ${
          scrolled
            ? "bg-[#080c10]/90 border-b border-white/[0.06] shadow-[0_1px_0_0_rgba(255,255,255,0.04)]"
            : "bg-[#080c10]/40 border-b border-transparent"
        }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="text-xl font-bold tracking-tight rounded-sm
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
          >
            <span className="text-white/45">Na</span>
            <span className="text-emerald-400">hashon</span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative px-3 py-1.5 text-sm text-white/45 hover:text-white transition-colors rounded-md
                  after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-px after:bg-emerald-400
                  after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={RESUME_HREF}
              download
              className="flex items-center gap-1.5 px-4 py-2 text-sm text-white/55 font-medium
                border border-white/10 rounded-lg
                hover:text-cyan-300 hover:border-cyan-400/25 hover:bg-cyan-500/[0.04]
                transition-all
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              <Download size={14} />
              Download CV
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-4 py-2 text-sm text-[#04140d] font-medium
                bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
            >
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full bg-[#04140d]/50 ${
                    reduceMotion ? "" : "animate-ping"
                  }`}
                />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#04140d]" />
              </span>
              Hire me
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="md:hidden p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden mx-4 mb-4 rounded-2xl border border-white/[0.08] bg-[#0b0f15]/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduceMotion ? 0 : i * 0.04 }}
                  className="block px-3 py-2.5 rounded-lg text-sm text-white/55 hover:text-white hover:bg-white/[0.05] transition-all
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="pt-3 flex flex-col gap-2 border-t border-white/[0.06] mt-3">
                <a
                  href={RESUME_HREF}
                  download
                  className="flex items-center justify-center gap-2 py-2.5 text-sm text-white/60 border border-white/10 rounded-lg
                    hover:border-cyan-400/25 hover:text-cyan-300 transition-all
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                >
                  <Download size={14} />
                  Download CV
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 text-sm text-[#04140d] font-medium
                    bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
                >
                  <Mail size={14} />
                  Hire me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
