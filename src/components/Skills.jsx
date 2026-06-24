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

const iconMap = { Palette, Terminal, Database, Settings, Code2, Globe };

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-24 bg-[#060a0d]"
      aria-labelledby="skills-heading"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium text-green-500 uppercase tracking-widest mb-3">
            Technical Skills
          </p>

          <h2
            id="skills-heading"
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4"
          >
            Skills & Expertise
          </h2>

          <p className="text-[15px] text-white/40 max-w-xl mx-auto leading-relaxed">
            Technologies, frameworks, and tools I use to design, build, and
            deploy modern web applications.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => {
            const Icon = iconMap[category.icon];

            return (
              <motion.div
                key={category.title}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="
                  relative overflow-hidden rounded-2xl p-6
                  bg-white/[0.02] border border-white/[0.06]
                  hover:border-green-500/20 hover:bg-white/[0.035]
                  transition-all duration-300
                "
              >
                {/* Subtle glow */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-green-500/5 blur-2xl pointer-events-none" />

                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-green-500/8 border border-green-500/15 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {category.title}
                    </h3>
                    {category.description && (
                      <p className="text-xs text-white/30 mt-0.5">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Skill bars */}
                <div className="space-y-3 mb-5">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1.5 text-xs">
                        <span className="text-white/55">{skill.name}</span>
                        <span className="text-white/25">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-green-600 to-green-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.05]">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-2 py-0.5 text-[11px] text-green-400/70 bg-green-500/[0.06] border border-green-500/15 rounded-full"
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
