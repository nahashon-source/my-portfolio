import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Download } from 'lucide-react';

const timelineItems = [];

const Resume = () => {
  return (
    <section id="resume" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Experience & Education</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            My journey and academic background in technology and software development.
          </p>
          <a
            href="/resume.pdf"
            className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Download size={20} className="mr-2" />
            Download Resume
          </a>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative pl-8 pb-8 border-l-2 border-green-200 dark:border-gray-700 last:pb-0"
            >
              <div className="absolute left-[-9px] p-1 bg-white dark:bg-gray-800 rounded-full border-2 border-green-200 dark:border-gray-700">
                {item.icon}
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  {item.date}
                </span>
                <h3 className="text-xl font-semibold mt-1">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {item.company}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resume;