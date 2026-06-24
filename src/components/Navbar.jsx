import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Mail } from "lucide-react";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

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
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      role="navigation"
      className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-md
        ${
          scrolled
            ? "bg-gray-950/90 border-b border-white/5 shadow-lg shadow-black/20"
            : "bg-gray-950/70 border-b border-white/[0.04]"
        }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="text-white/50">Na</span>
            <span className="text-green-500">hashon</span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-1.5 rounded-md text-sm text-white/45 hover:text-white hover:bg-white/5 transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="#resume"
              className="
                flex items-center gap-1.5 px-4 py-2
                text-sm text-white/55 font-medium
                border border-white/10 rounded-lg
                hover:text-white hover:border-white/20 hover:bg-white/5
                transition-all
              "
            >
              <Download size={14} />
              Download CV
            </a>
            <a
              href="#contact"
              className="
                flex items-center gap-1.5 px-4 py-2
                text-sm text-white font-medium
                bg-green-700 hover:bg-green-600
                rounded-lg transition-colors
              "
            >
              <Mail size={14} />
              Hire me
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all"
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="md:hidden bg-gray-950 border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3 flex flex-col gap-2 border-t border-white/5 mt-3">
                <a
                  href="#resume"
                  className="flex items-center justify-center gap-2 py-2.5 text-sm text-white/55 border border-white/10 rounded-lg hover:border-white/20 hover:text-white transition-all"
                >
                  <Download size={14} />
                  Download CV
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 text-sm text-white font-medium bg-green-700 hover:bg-green-600 rounded-lg transition-colors"
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
};

export default Navbar;
