import React from "react";
import { motion } from "framer-motion";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  ArrowDownIcon,
} from "lucide-react";

const socialLinks = [
  {
    href: "https://github.com/nahashon-source",
    label: "GitHub",
    icon: GithubIcon,
  },
  {
    href: "https://linkedin.com/in/Nahashon-Mwendwa",
    label: "LinkedIn",
    icon: LinkedinIcon,
  },
  {
    href: "mailto:contact@nashonmwendwa0@gmail.com",
    label: "Email",
    icon: MailIcon,
  },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0 brightness-50"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-gray-900/60 to-black/80 z-10" />

      <div className="relative z-20 container mx-auto px-6 py-16">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Text */}
          <div className="lg:w-1/2 text-center lg:text-left">

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-green-400 font-medium mb-3"
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold text-white mb-4"
            >
              Nahashon Mwendwa
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl lg:text-2xl text-gray-300 mb-6"
            >
              Full-Stack Developer • React • Flask • PostgreSQL
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 mb-8 max-w-lg"
            >
              I build fast, scalable web applications and APIs with modern
              technologies and clean architecture.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center lg:justify-start gap-4 mb-8"
            >
              <a
                href="#projects"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition transform hover:scale-105"
              >
                View Projects
              </a>

              <a
                href="#contact"
                className="border-2 border-green-500 text-green-400 hover:bg-green-600 hover:text-white px-6 py-3 rounded-lg font-medium transition transform hover:scale-105"
              >
                Contact Me
              </a>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center lg:justify-start gap-5"
            >
              {socialLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-500 text-gray-300 hover:text-green-400 hover:border-green-400 transition transform hover:scale-110"
                  >
                    <Icon size={22} />
                  </a>
                );
              })}
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:w-1/2"
          >
            <img
              src="/images/profile.jpeg"
              alt="Nahashon Mwendwa"
              loading="lazy"
              className="rounded-full w-64 h-64 lg:w-80 lg:h-80 object-cover mx-auto shadow-xl border-4 border-green-500 animate-[float_6s_ease-in-out_infinite]"
            />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a
            href="#about"
            aria-label="Scroll down"
            className="animate-bounce hover:scale-110 transition"
          >
            <ArrowDownIcon size={36} className="text-green-400" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;