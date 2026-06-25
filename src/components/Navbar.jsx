import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Download, Mail } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Constants                                                           */
/* ------------------------------------------------------------------ */

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const RESUME_HREF = "/resume.pdf";

// Section ids derived from NAV_ITEMS — single source of truth.
const SECTION_IDS = NAV_ITEMS.map((item) => item.href.replace("#", ""));

/* ------------------------------------------------------------------ */
/*  Animation variants                                                  */
/* ------------------------------------------------------------------ */

const MOBILE_MENU_VARIANTS = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
  },
};

// Staggered nav item slide-in.
function mobileItemVariants(index) {
  return {
    hidden: { opacity: 0, x: -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: index * 0.04 },
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Shared focus-visible ring utility                                   */
/* ------------------------------------------------------------------ */

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400";

/* ------------------------------------------------------------------ */
/*  Hook: active section via Intersection Observer                      */
/* ------------------------------------------------------------------ */

function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    // Track which sections are currently intersecting and pick
    // the one highest on the page (lowest index in sectionIds).
    const visible = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        });

        // Prefer the section that appears first in nav order.
        const active = sectionIds.find((id) => visible.has(id));
        if (active) setActiveId(active);
      },
      {
        // Trigger when section occupies at least 20% of the viewport.
        threshold: 0.2,
        // Negative top margin so the highlight fires slightly before
        // the section reaches the very top of the viewport.
        rootMargin: "-10% 0px -60% 0px",
      },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}

/* ------------------------------------------------------------------ */
/*  Hook: focus trap for mobile menu                                    */
/* ------------------------------------------------------------------ */

function useFocusTrap(containerRef, isActive) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;

    function getFocusable() {
      return Array.from(
        container.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
    }

    function handleKeyDown(e) {
      if (e.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: wrap from first → last.
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab: wrap from last → first.
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [containerRef, isActive]);
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

const DesktopNavLinks = React.memo(function DesktopNavLinks({ activeId }) {
  return (
    <div className="hidden md:flex items-center gap-1" role="list">
      {NAV_ITEMS.map((item) => {
        const sectionId = item.href.replace("#", "");
        const isActive = activeId === sectionId;

        return (
          <a
            key={item.label}
            href={item.href}
            role="listitem"
            aria-current={isActive ? "page" : undefined}
            className={`relative px-3 py-1.5 text-sm rounded-md transition-colors
              after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-px after:bg-emerald-400
              after:origin-left after:transition-transform after:duration-300
              ${FOCUS_RING}
              ${
                isActive
                  ? "text-white after:scale-x-100"
                  : "text-white/45 hover:text-white after:scale-x-0 hover:after:scale-x-100"
              }`}
          >
            {item.label}
          </a>
        );
      })}
    </div>
  );
});

const DesktopCTA = React.memo(function DesktopCTA({ reduceMotion }) {
  return (
    <div className="hidden md:flex items-center gap-2">
      <a
        href={RESUME_HREF}
        download
        className={`flex items-center gap-1.5 px-4 py-2 text-sm text-white/55 font-medium
          border border-white/10 rounded-lg
          hover:text-cyan-300 hover:border-cyan-400/25 hover:bg-cyan-500/[0.04]
          transition-all ${FOCUS_RING.replace("emerald-400", "cyan-400")}`}
      >
        <Download size={14} />
        Download CV
      </a>
      <a
        href="#contact"
        className={`flex items-center gap-2 px-4 py-2 text-sm text-[#04140d] font-medium
          bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors
          ${FOCUS_RING.replace("outline-offset-2", "outline-offset-2").replace("emerald-400", "emerald-200")}`}
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
  );
});

/* ------------------------------------------------------------------ */
/*  Navbar                                                              */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const activeId = useActiveSection(SECTION_IDS);

  // Ref for the mobile menu container (focus trap + outside click).
  const menuRef = useRef(null);
  // Ref for the toggle button so focus returns after closing.
  const toggleRef = useRef(null);

  useFocusTrap(menuRef, isMenuOpen);

  // ── Scroll detection ────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Body scroll lock ────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // ── Outside click ────────────────────────────────────────────────────
  useEffect(() => {
    if (!isMenuOpen) return;

    function handlePointerDown(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
      ) {
        closeMenu();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isMenuOpen]);

  // ── Escape key ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") closeMenu();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  // ── Helpers ──────────────────────────────────────────────────────────
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    // Return focus to the toggle button after the menu closes.
    requestAnimationFrame(() => toggleRef.current?.focus());
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((open) => !open);
  }, []);

  // ── Arrow-key navigation within mobile menu ─────────────────────────
  const handleMenuKeyDown = useCallback((e) => {
    if (!["ArrowDown", "ArrowUp"].includes(e.key)) return;
    e.preventDefault();

    const focusable = Array.from(
      menuRef.current?.querySelectorAll("a[href], button:not([disabled])") ??
        [],
    );
    const current = focusable.indexOf(document.activeElement);
    if (current === -1) return;

    const next =
      e.key === "ArrowDown"
        ? (current + 1) % focusable.length
        : (current - 1 + focusable.length) % focusable.length;

    focusable[next]?.focus();
  }, []);

  // Memoise mobile items so they don't rerender on every scroll tick.
  const mobileNavItems = useMemo(
    () =>
      NAV_ITEMS.map((item, i) => {
        const sectionId = item.href.replace("#", "");
        const isActive = activeId === sectionId;

        return (
          <motion.a
            key={item.label}
            href={item.href}
            onClick={closeMenu}
            variants={mobileItemVariants(i)}
            aria-current={isActive ? "page" : undefined}
            className={`block px-3 py-2.5 rounded-lg text-sm transition-all ${FOCUS_RING}
              ${
                isActive
                  ? "text-white bg-white/[0.06]"
                  : "text-white/55 hover:text-white hover:bg-white/[0.05]"
              }`}
          >
            {item.label}
          </motion.a>
        );
      }),
    [activeId, closeMenu],
  );

  return (
    <nav
      aria-label="Main navigation"
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
            aria-label="Nahashon — back to top"
            className={`text-xl font-bold tracking-tight rounded-sm ${FOCUS_RING}`}
          >
            <span className="text-white/45">Na</span>
            <span className="text-emerald-400">hashon</span>
          </a>

          <DesktopNavLinks activeId={activeId} />
          <DesktopCTA reduceMotion={reduceMotion} />

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
            className={`md:hidden p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all ${FOCUS_RING}`}
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
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            variants={reduceMotion ? undefined : MOBILE_MENU_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            onKeyDown={handleMenuKeyDown}
            className="md:hidden mx-4 mb-4 rounded-2xl border border-white/[0.08] bg-[#0b0f15]/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {mobileNavItems}

              <div className="pt-3 flex flex-col gap-2 border-t border-white/[0.06] mt-3">
                <a
                  href={RESUME_HREF}
                  download
                  className={`flex items-center justify-center gap-2 py-2.5 text-sm text-white/60
                    border border-white/10 rounded-lg hover:border-cyan-400/25 hover:text-cyan-300
                    transition-all ${FOCUS_RING.replace("emerald-400", "cyan-400")}`}
                >
                  <Download size={14} />
                  Download CV
                </a>
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className={`flex items-center justify-center gap-2 py-2.5 text-sm text-[#04140d] font-medium
                    bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors
                    ${FOCUS_RING.replace("emerald-400", "emerald-200")}`}
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
