import React from "react";
import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap } from "lucide-react";
import { timelineItems } from "../data/resume";

const Resume = () => {
  return (
    <section
      id="resume"
      className="py-24 bg-gradient-to-b from-gray-900 to-black"
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
          <p className="text-green-500 font-semibold uppercase tracking-widest mb-3">
            Career Journey
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Experience & Education
          </h2>

          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            My academic background, professional experience, and continuous
            growth as a software developer.
          </p>

          <div className="mt-8">
            <a
              href="/cv/Nahashon-Mwendwa-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Nahashon-Mwendwa-Resume.pdf"
              className="
                inline-flex items-center gap-2
                px-7 py-3
                rounded-xl
                bg-green-600
                hover:bg-green-700
                text-white
                font-medium
                shadow-lg
                hover:shadow-green-500/30
                transition-all duration-300
              "
            >
              <Download size={20} />
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">

          {/* Vertical Line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-700" />

          {timelineItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                className="relative pl-16 pb-12"
              >
                {/* Icon */}
                <div className="
                  absolute left-0 top-4
                  w-10 h-10
                  rounded-full
                  bg-green-600
                  flex items-center justify-center
                  shadow-lg shadow-green-500/30
                ">
                  <Icon
                    className="w-5 h-5 text-white"
                    aria-hidden="true"
                  />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{
                    y: -6,
                    scale: 1.01,
                  }}
                  className="
                    bg-white/5
                    backdrop-blur-sm
                    border border-white/10
                    rounded-2xl
                    p-7
                    shadow-lg
                    hover:shadow-2xl
                    transition-all duration-300
                  "
                >
                  {/* Date */}
                  <span className="
                    inline-block
                    px-3 py-1
                    rounded-full
                    bg-green-900/40
                    text-green-400
                    text-sm
                    font-medium
                  ">
                    {item.date}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold text-white mt-4">
                    {item.title}
                  </h3>

                  {/* Company */}
                  <p className="text-green-300 font-medium mt-1">
                    {item.company}
                  </p>

                  {/* Description */}
                  <p className="text-gray-300 mt-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  {item.highlights && (
                    <ul className="mt-5 space-y-2">
                      {item.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start text-gray-300"
                        >
                          <span className="text-green-500 mr-3">•</span>
                          <span>{highlight}</span>
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