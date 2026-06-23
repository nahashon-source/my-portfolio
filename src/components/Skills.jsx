// src/components/Skills.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Palette,
  Terminal,
  Settings,
  Globe,
} from "lucide-react";
import skillCategories from "../data/skills";

const iconMap = {
  Palette,
  Terminal,
  Database,
  Settings,
  Code2,
  Globe,
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-24 bg-gray-50 dark:bg-gray-900"
      aria-labelledby="skills-heading"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-green-600 font-semibold uppercase tracking-wider mb-2">
            Technical Skills
          </p>

          <h2
            id="skills-heading"
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-5"
          >
            Skills & Expertise
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Technologies, frameworks, and tools I use to design, build, and
            deploy modern web applications.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {skillCategories.map((category) => {
            const Icon = iconMap[category.icon];

            return (
              <motion.div
                key={category.title}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="
                  group relative overflow-hidden
                  rounded-2xl
                  border border-gray-200 dark:border-gray-700
                  bg-white dark:bg-gray-800
                  p-7
                  shadow-md
                  hover:shadow-2xl
                  transition-all duration-300
                "
              >
                {/* Background Glow */}
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-green-100 dark:bg-green-900/20 blur-3xl opacity-50" />

                {/* Header */}
                <div className="relative flex items-center mb-6">
                  <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-4">
                    <Icon className="w-7 h-7 text-green-600 dark:text-green-400" />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {category.title}
                    </h3>

                    {category.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>

                        <span className="text-gray-500 dark:text-gray-400 font-medium">
                          Advanced
                        </span>
                      </div>

                      <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${skill.level}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            ease: "easeOut",
                          }}
                          className="
                            h-full rounded-full
                            bg-gradient-to-r
                            from-green-500
                            to-emerald-400
                          "
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="
                        px-3 py-1
                        text-xs font-medium
                        rounded-full
                        bg-green-100
                        text-green-700
                        dark:bg-green-900/30
                        dark:text-green-300
                      "
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
