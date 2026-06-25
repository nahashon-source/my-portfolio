import React, { useCallback } from "react";
import { Github, Linkedin, Mail, Twitter, ArrowUp, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Constants                                                           */
/* ------------------------------------------------------------------ */

const QUICK_LINKS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com/nahashon-source", icon: Github },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/Nahashon-Mwendwa",
    icon: Linkedin,
  },
  { name: "Twitter", href: "https://twitter.com/nahashon", icon: Twitter },
  { name: "Email", href: "mailto:nashonmwendwa0@gmail.com", icon: Mail },
];

const BUILT_WITH = ["React", "Tailwind CSS", "Framer Motion", "Vite"];

/* ------------------------------------------------------------------ */
/*  Shared utilities                                                    */
/* ------------------------------------------------------------------ */

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400";

/* ------------------------------------------------------------------ */
/*  SocialIcon                                                          */
/*  Reusable icon button / link used in both brand column and          */
/*  any future nav sections.                                            */
/* ------------------------------------------------------------------ */

const SocialIcon = React.memo(function SocialIcon({
  name,
  href,
  icon: Icon,
  reduceMotion,
}) {
  const isEmail = name === "Email";

  return (
    <motion.a
      href={href}
      target={isEmail ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label={`${name}${isEmail ? "" : " (opens in new tab)"}`}
      // Disable positional hover animation when reduced motion is preferred;
      // color transitions (CSS) are still allowed per WCAG 2.3.3 guidance.
      whileHover={reduceMotion ? undefined : { y: -3 }}
      whileTap={reduceMotion ? undefined : { scale: 0.95 }}
      className={`w-8 h-8 rounded-lg flex items-center justify-center
        bg-white/[0.03] border border-white/[0.07] text-white/35
        hover:text-green-400 hover:border-green-500/25 hover:bg-green-500/[0.06]
        transition-all ${FOCUS_RING}`}
    >
      <Icon size={15} aria-hidden="true" />
    </motion.a>
  );
});

/* ------------------------------------------------------------------ */
/*  ScrollToTop                                                         */
/* ------------------------------------------------------------------ */

const ScrollToTop = React.memo(function ScrollToTop({ reduceMotion }) {
  const handleClick = useCallback(() => {
    if (reduceMotion) {
      // Instant jump — respects user's motion preference.
      window.scrollTo({ top: 0 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [reduceMotion]);

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll back to top of page"
      className={`w-8 h-8 rounded-lg flex items-center justify-center
        bg-green-700 hover:bg-green-600 text-white transition-colors ${FOCUS_RING}`}
    >
      <ArrowUp size={15} aria-hidden="true" />
    </button>
  );
});

/* ------------------------------------------------------------------ */
/*  BrandColumn                                                         */
/* ------------------------------------------------------------------ */

const BrandColumn = React.memo(function BrandColumn({ reduceMotion }) {
  return (
    <div>
      <a
        href="#"
        aria-label="Nahashon — back to top"
        className={`text-xl font-bold tracking-tight rounded-sm ${FOCUS_RING}`}
      >
        <span className="text-white/40">Na</span>
        <span className="text-green-500">hashon</span>
      </a>

      <p className="text-sm text-white/35 leading-relaxed mt-4 mb-5 max-w-xs">
        Full-stack developer passionate about building scalable web applications
        and meaningful digital experiences.
      </p>

      <div
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
          bg-green-500/8 border border-green-500/15 text-green-400 text-xs mb-6"
        aria-label="Currently available for opportunities"
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"
          aria-hidden="true"
        />
        <MapPin size={11} aria-hidden="true" />
        Available for opportunities
      </div>

      <div className="flex gap-2" role="list" aria-label="Social links">
        {SOCIAL_LINKS.map((link) => (
          <div key={link.name} role="listitem">
            <SocialIcon {...link} reduceMotion={reduceMotion} />
          </div>
        ))}
      </div>
    </div>
  );
});

/* ------------------------------------------------------------------ */
/*  NavColumn                                                           */
/* ------------------------------------------------------------------ */

const NavColumn = React.memo(function NavColumn() {
  return (
    <nav aria-label="Footer navigation">
      <h4 className="text-xs font-medium text-white/25 uppercase tracking-widest mb-5">
        Navigation
      </h4>
      <ul className="space-y-2.5">
        {QUICK_LINKS.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className={`text-sm text-white/40 hover:text-green-400 transition-colors rounded-sm ${FOCUS_RING}`}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
});

/* ------------------------------------------------------------------ */
/*  ContactColumn                                                       */
/* ------------------------------------------------------------------ */

const ContactColumn = React.memo(function ContactColumn() {
  return (
    <address className="not-italic">
      <h4 className="text-xs font-medium text-white/25 uppercase tracking-widest mb-5">
        Contact
      </h4>
      <div className="space-y-2.5 text-sm text-white/40">
        <p>Nairobi, Kenya</p>
        <a
          href="tel:+254748495724"
          className={`block hover:text-green-400 transition-colors rounded-sm ${FOCUS_RING}`}
        >
          +254 748 495 724
        </a>
        <a
          href="mailto:nashonmwendwa0@gmail.com"
          className={`block break-all hover:text-green-400 transition-colors rounded-sm ${FOCUS_RING}`}
        >
          nashonmwendwa0@gmail.com
        </a>
        <p className="text-white/20 text-xs pt-2">
          Usually responds within 24 hours.
        </p>
      </div>
    </address>
  );
});

/* ------------------------------------------------------------------ */
/*  Footer                                                              */
/* ------------------------------------------------------------------ */

const Footer = React.memo(function Footer() {
  const reduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className="bg-[#040710] border-t border-white/[0.05] pt-16 pb-8"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          <BrandColumn reduceMotion={reduceMotion} />
          <NavColumn />
          <ContactColumn />
        </div>

        {/* Built-with tags */}
        <ul aria-label="Built with" className="flex flex-wrap gap-2 mb-8">
          {BUILT_WITH.map((tech) => (
            <li
              key={tech}
              className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-white/30"
            >
              {tech}
            </li>
          ))}
        </ul>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20 text-center md:text-left">
            © {currentYear} Nahashon Mwendwa. All rights reserved.
          </p>

          <p className="text-xs text-white/20">
            Built with React &amp; Tailwind CSS
          </p>

          <ScrollToTop reduceMotion={reduceMotion} />
        </div>
      </div>
    </footer>
  );
});

export default Footer;
