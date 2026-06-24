import React from "react";
import { Github, Linkedin, Mail, Twitter, ArrowUp, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const QUICK_LINKS = [
  { name: "About",    href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills",   href: "#skills" },
  { name: "Resume",   href: "#resume" },
  { name: "Contact",  href: "#contact" },
];

const SOCIAL_LINKS = [
  { name: "GitHub",   href: "https://github.com/nahashon-source",          icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/Nahashon-Mwendwa",    icon: Linkedin },
  { name: "Twitter",  href: "https://twitter.com/nahashon",                icon: Twitter },
  { name: "Email",    href: "mailto:nashonmwendwa0@gmail.com",              icon: Mail },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#040710] border-t border-white/[0.05] pt-16 pb-8">
      <div className="container mx-auto px-6">

        <div className="grid lg:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <a href="#" className="text-xl font-bold tracking-tight">
              <span className="text-white/40">Na</span>
              <span className="text-green-500">hashon</span>
            </a>

            <p className="text-sm text-white/35 leading-relaxed mt-4 mb-5 max-w-xs">
              Full-stack developer passionate about building scalable web
              applications and meaningful digital experiences.
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/8 border border-green-500/15 text-green-400 text-xs mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <MapPin size={11} />
              Available for opportunities
            </div>

            <div className="flex gap-2">
              {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                <motion.a
                  key={name}
                  href={href}
                  target={name !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={name}
                  className="
                    w-8 h-8 rounded-lg flex items-center justify-center
                    bg-white/[0.03] border border-white/[0.07] text-white/35
                    hover:text-green-400 hover:border-green-500/25 hover:bg-green-500/[0.06]
                    transition-all
                  "
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-medium text-white/25 uppercase tracking-widest mb-5">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/40 hover:text-green-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium text-white/25 uppercase tracking-widest mb-5">
              Contact
            </h4>
            <div className="space-y-2.5 text-sm text-white/40">
              <p>Nairobi, Kenya</p>
              <a href="tel:+254748495724" className="block hover:text-green-400 transition-colors">
                +254 748 495 724
              </a>
              <a href="mailto:nashonmwendwa0@gmail.com" className="block break-all hover:text-green-400 transition-colors">
                nashonmwendwa0@gmail.com
              </a>
              <p className="text-white/20 text-xs pt-2">
                Usually responds within 24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Built-with tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["React", "Tailwind CSS", "Framer Motion", "Vite"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-white/30"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20 text-center md:text-left">
            © {currentYear} Nahashon Mwendwa. All rights reserved.
          </p>

          <p className="text-xs text-white/20">
            Built with React & Tailwind CSS
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="
              w-8 h-8 rounded-lg flex items-center justify-center
              bg-green-700 hover:bg-green-600
              text-white transition-colors
            "
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;