import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Palette, Terminal, Settings, Globe } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: <Palette size={24} />,
    skills: ['React', 'Tailwind CSS', 'JavaScript', 'HTML/CSS', ''],
  },
  {
    title: 'Backend',
    icon: <Terminal size={24} />,
    skills: ['Python', 'Flask', 'Node.js', 'REST APIs', ''],
  },
  {
    title: 'Database',
    icon: <Database size={24} />,
    skills: ['PostgreSQL', 'MySQL', 'SQL', '', ''],
  },
  {
    title: 'DevOps',
    icon: <Settings size={24} />,
    skills: ['CI/CD', '', '', '', ''],
  },
  {
    title: 'Tools',
    icon: <Code2 size={24} />,
    skills: ['Git', 'VS Code', 'Postman', 'Figma', 'Jest'],
  },
  {
    title: 'Languages',
    icon: <Globe size={24} />,
    skills: ['JavaScript', 'Python', 'SQL', 'HTML', 'CSS'],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Skills & Expertise</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and areas of expertise in full-stack development and related technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center mb-4">
                <span className="p-2 bg-green-100 dark:bg-gray-700 rounded-lg mr-3">
                  {category.icon}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.filter(skill => skill).map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-green-50 dark:bg-gray-700 rounded-full text-sm text-gray-800 dark:text-gray-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
