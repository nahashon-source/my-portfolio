import React from "react";
import { motion } from "framer-motion";
import { Code, BookOpen, Heart } from "lucide-react";

const highlights = [
  {
    icon: Code,
    title: "Development",
    desc: "Building scalable full-stack applications with modern tools and clean architecture.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    desc: "Always exploring new technologies, frameworks, and industry best practices.",
  },
  {
    icon: Heart,
    title: "User-Focused",
    desc: "Creating digital experiences that are intuitive, accessible, and impactful.",
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="py-24 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>

          <p className="text-green-600 font-medium mb-6">
            Full-Stack Developer • React • Backend Systems • APIs
          </p>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            I’m a full-stack developer passionate about building fast,
            scalable web applications and transforming complex ideas into
            clean, user-friendly products. I enjoy designing robust backend
            systems, crafting intuitive front-end interfaces, and writing
            maintainable code that stands the test of time.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {highlights.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-green-50/60 dark:bg-gray-800 shadow-sm hover:shadow-xl transition-all"
              >
                <Icon className="w-10 h-10 text-green-600 mb-4" />

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;