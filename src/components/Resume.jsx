import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { timelineItems } from "../data/resume";

const Resume = () => {
  return (
    <section id="resume" className="py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Experience & Education
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            A snapshot of my academic background, technical experience, and
            professional development in software engineering.
          </p>
          <a
            href="/cv/NASHON-RESUME-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Nahashon-Mwendwa-Resume.pdf"
            aria-label="Download resume"
            className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition shadow-md hover:shadow-lg"
          >
            <Download size={20} className="mr-2" />
            Download Resume
          </a>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {timelineItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative pl-10 pb-10 border-l-2 border-gray-700 last:pb-0"
              >
                <div className="absolute -left-3 p-2 bg-black rounded-full border-2 border-gray-700 shadow">
                  <Icon className="text-green-600 w-5 h-5" aria-hidden="true" />
                </div>
                <div className="bg-black p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-800">
                  <span className="text-sm text-green-400 font-medium">
                    {item.date}
                  </span>
                  <h3 className="text-xl font-semibold mt-1 text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 font-medium">
                    {item.company}
                  </p>
                  <p className="text-gray-300 mt-3">
                    {item.description}
                  </p>
                  {item.highlights && (
                    <ul className="list-disc list-inside mt-3 space-y-2 text-gray-300">
                      {item.highlights.map((highlight, idx) => (
                        <li key={idx} className="ml-4">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Resume;