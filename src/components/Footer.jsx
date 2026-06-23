import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  ArrowUp,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/nahashon",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/nahashon",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/nahashon",
    icon: Twitter,
  },
  {
    name: "Email",
    href: "mailto:nashonmwendwa04@gmail.com",
    icon: Mail,
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-black text-white pt-20 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-6">

        <div className="grid lg:grid-cols-3 gap-12 mb-14">

          {/* Brand */}
          <div>
            <h3 className="text-3xl font-bold text-green-500 mb-4">
              Nahashon Mwendwa
            </h3>

            <p className="text-gray-400 leading-relaxed mb-6">
              Full-stack developer passionate about building scalable web
              applications and meaningful digital experiences.
            </p>

            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-900/30 text-green-400 text-sm mb-6">
              <MapPin size={16} className="mr-2" />
              Available for opportunities
            </div>

            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      y: -4,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    aria-label={link.name}
                    className="
                      w-11 h-11
                      rounded-xl
                      bg-gray-900
                      border border-gray-800
                      flex items-center justify-center
                      text-gray-400
                      hover:text-green-400
                      hover:border-green-500
                      transition-all
                    "
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-5">
              Navigation
            </h4>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="
                      text-gray-400
                      hover:text-green-400
                      transition-colors
                    "
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-5">
              Contact
            </h4>

            <div className="space-y-4 text-gray-400">
              <p>Nairobi, Kenya</p>

              <a
                href="tel:+254748495724"
                className="block hover:text-green-400 transition"
              >
                +254 748 495 724
              </a>

              <a
                href="mailto:nashonmwendwa04@gmail.com"
                className="block break-all hover:text-green-400 transition"
              >
                nashonmwendwa04@gmail.com
              </a>

              <p className="text-sm text-gray-500 pt-3">
                Usually responds within 24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {["React", "Tailwind CSS", "Framer Motion", "Vite"].map(
            (tech) => (
              <span
                key={tech}
                className="
                  px-4 py-2
                  rounded-full
                  bg-gray-900
                  border border-gray-800
                  text-sm text-gray-300
                "
              >
                {tech}
              </span>
            )
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {currentYear} Nahashon Mwendwa. All rights reserved.
          </p>

          <p className="text-gray-500 text-sm">
            Built with React & Tailwind CSS
          </p>

          <button
            onClick={scrollTop}
            aria-label="Scroll to top"
            className="
              w-10 h-10
              rounded-full
              bg-green-600
              hover:bg-green-700
              flex items-center justify-center
              transition
            "
          >
            <ArrowUp size={18} />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;