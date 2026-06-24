import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { timelineItems } from "../data/resume";

const Resume = () => {
  return (
    <section id="resume" className="py-24 bg-[#080c10]">
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
            Career Journey
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Experience & Education
          </h2>

          <p className="text-[15px] text-white/40 max-w-xl mx-auto leading-relaxed mb-8">
            My academic background, professional experience, and continuous
            growth as a software developer.
          </p>

          <a
            href="/cv/Nahashon-Mwendwa-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Nahashon-Mwendwa-Resume.pdf"
            className="
              inline-flex items-center gap-2
              px-5 py-2.5 rounded-xl
              bg-green-700 hover:bg-green-600
              text-white text-sm font-medium
              transition-colors
            "
          >
            <Download size={15} />
            Download Resume
          </a>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-[18px] top-0 bottom-0 w-px bg-white/[0.06]" />

          {timelineItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
                viewport={{ once: true }}
                className="relative pl-14 pb-10 last:pb-0"
              >
                {/* Node */}
                <div
                  className="
                  absolute left-0 top-5
                  w-9 h-9 rounded-full
                  bg-green-700/80 border border-green-500/30
                  flex items-center justify-center
                "
                >
                  <Icon className="w-4 h-4 text-white" aria-hidden="true" />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -3 }}
                  className="
                    p-6 rounded-2xl
                    bg-white/[0.02] border border-white/[0.06]
                    hover:border-green-500/15 hover:bg-white/[0.035]
                    transition-all duration-300
                  "
                >
                  <span className="inline-block px-2.5 py-1 rounded-full bg-green-500/8 border border-green-500/15 text-green-400 text-xs font-medium mb-3">
                    {item.date}
                  </span>

                  <h3 className="text-lg font-semibold text-white mb-0.5">
                    {item.title}
                  </h3>

                  <p className="text-sm text-green-400/80 mb-3">
                    {item.company}
                  </p>

                  <p className="text-sm text-white/40 leading-relaxed">
                    {item.description}
                  </p>

                  {item.highlights && (
                    <ul className="mt-4 space-y-1.5">
                      {item.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-white/40"
                        >
                          <span className="text-green-500 mt-0.5 flex-shrink-0">
                            •
                          </span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Resume;
