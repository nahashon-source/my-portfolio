import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ArrowDown,
  MapPin,
} from "lucide-react";

const socialLinks = [
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

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover brightness-50"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className="text-center lg:text-left">

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="
                inline-flex items-center
                px-4 py-2
                rounded-full
                bg-green-500/10
                border border-green-500/20
                text-green-400
                mb-6
              "
            >
              <MapPin size={16} className="mr-2" />
              Nairobi, Kenya • Available for opportunities
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-400 font-medium mb-3"
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="
                text-5xl md:text-6xl lg:text-7xl
                font-bold text-white mb-4
              "
            >
              Nahashon
              <span className="text-green-500">
                {" "}Mwendwa
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="
                text-2xl md:text-3xl
                text-gray-300 mb-6
              "
            >
              Full-Stack Developer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="
                text-lg text-gray-400
                max-w-xl leading-relaxed mb-8
              "
            >
              I build scalable web applications, enterprise systems,
              APIs, and digital experiences using modern technologies
              and clean architecture.
            </motion.p>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-8 mb-8">
              <div>
                <h3 className="text-3xl font-bold text-green-500">
                  9+
                </h3>
                <p className="text-gray-400 text-sm">
                  Projects
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-green-500">
                  2+
                </h3>
                <p className="text-gray-400 text-sm">
                  Years Learning
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-green-500">
                  15+
                </h3>
                <p className="text-gray-400 text-sm">
                  Technologies
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <a
                href="#projects"
                className="
                  px-7 py-4
                  rounded-xl
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  font-medium
                  shadow-lg
                  transition
                "
              >
                View Projects
              </a>

              <a
                href="#contact"
                className="
                  px-7 py-4
                  rounded-xl
                  border border-green-500
                  text-green-400
                  hover:bg-green-600
                  hover:text-white
                  transition
                "
              >
                Contact Me
              </a>
            </div>

            {/* Social */}
            <div className="flex justify-center lg:justify-start gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-12 h-12
                      rounded-full
                      bg-white/5
                      border border-gray-700
                      flex items-center justify-center
                      text-gray-300
                      hover:text-green-400
                      hover:border-green-400
                      transition
                    "
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center"
          >
            <div className="relative">

              <div className="
                absolute inset-0
                rounded-full
                bg-green-500/30
                blur-3xl
              " />

              <img
                src="/images/profile.jpeg"
                alt="Nahashon Mwendwa"
                className="
                  relative
                  w-72 h-72 lg:w-96 lg:h-96
                  rounded-full
                  object-cover
                  border-4 border-green-500
                  shadow-2xl
                "
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="
            absolute bottom-8 left-1/2
            -translate-x-1/2
          "
        >
          <a href="#about">
            <ArrowDown
              className="text-green-500 animate-bounce"
              size={36}
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;