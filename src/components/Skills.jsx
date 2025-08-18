// // components/Skills.jsx

// import React from 'react';
// import { motion } from 'framer-motion';
// import {
//   Code2,
//   Database,
//   Palette,
//   Terminal,
//   Settings,
//   Globe,
// } from 'lucide-react';
// import skillCategories from '../data/skills';

// // Map of icon names to their actual JSX components
// const iconMap = {
//   Palette: <Palette size={24} />,
//   Terminal: <Terminal size={24} />,
//   Database: <Database size={24} />,
//   Settings: <Settings size={24} />,
//   Code2: <Code2 size={24} />,
//   Globe: <Globe size={24} />,
// };

// const Skills = () => {
//   return (
//     <section id="skills" className="py-20 bg-white dark:bg-gray-900">
//       <div className="container mx-auto px-4">
//         {/* Section heading with animation */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
//             Skills & Expertise
//           </h2>
//           <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//             A comprehensive overview of my technical skills and areas of
//             expertise in full-stack development and related technologies.
//           </p>
//         </motion.div>

//         {/* Skill category cards */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {skillCategories.map((category, index) => (
//             <motion.div
//               key={category.title}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//               className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
//             >
//               {/* Title and icon */}
//               <div className="flex items-center mb-4">
//                 <span className="p-2 bg-green-100 dark:bg-gray-700 rounded-lg mr-3">
//                   {iconMap[category.icon]}
//                 </span>
//                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                   {category.title}
//                 </h3>
//               </div>

//               {/* List of skills */}
//               <div className="flex flex-wrap gap-2">
//                 {category.skills.map((skill, idx) => (
//                   <span
//                     key={idx}
//                     className="px-4 py-2 bg-green-50 dark:bg-gray-700 rounded-full text-sm text-gray-800 dark:text-gray-200"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Skills;







// components/Skills.jsx

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

// Map of icon names to their actual JSX components
const iconMap = {
  Palette: <Palette size={24} />,
  Terminal: <Terminal size={24} />,
  Database: <Database size={24} />,
  Settings: <Settings size={24} />,
  Code2: <Code2 size={24} />,
  Globe: <Globe size={24} />,
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section heading with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Expertise
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and areas of
            expertise in full-stack development and related technologies.
          </p>
        </motion.div>

        {/* Skill category cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              {/* Title and icon */}
              <div className="flex items-center mb-4">
                <span
                  className={`p-3 rounded-lg mr-3 ${
                    category.color ||
                    "bg-green-100 dark:bg-green-800" /* fallback */
                  }`}
                >
                  {iconMap[category.icon]}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              {/* List of skills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-green-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-200 hover:bg-green-200 dark:hover:bg-gray-600 transition-all hover:translate-y-[-2px] hover:shadow-md"
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
