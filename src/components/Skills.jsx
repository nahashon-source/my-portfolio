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

// Map icon names to actual components
const iconMap = {
  Palette,
  Terminal,
  Database,
  Settings,
  Code2,
  Globe,
};

// Motion variants for parent container and cards
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0 },
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-20 bg-white dark:bg-gray-900"
      aria-labelledby="skills-heading"
    >
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2
            id="skills-heading"
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Skills & Expertise
          </h2>

          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and tools used in
            building scalable full-stack applications.
          </p>
        </motion.div>

        {/* Skill Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
          role="list"
        >
          {skillCategories.map((category) => {
            const Icon = iconMap[category.icon];

            return (
              <motion.div
                key={category.title}
                variants={cardVariants}
                className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                role="listitem"
              >
                {/* Header */}
                <div className="flex items-center mb-5">
                  <span
                    className={`p-3 rounded-lg mr-3 ${
                      category.color || "bg-green-100 dark:bg-green-900"
                    }`}
                  >
                    <Icon
                      size={24}
                      className="text-green-600 dark:text-green-400"
                    />
                  </span>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      {/* Skill Label */}
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full bg-green-500 rounded-full"
                        />
                      </div>
                    </div>
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