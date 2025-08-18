// import React from 'react';
// import { motion } from 'framer-motion';
// import { ExternalLink, Github } from 'lucide-react';

// const ProjectCard = ({ project }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       viewport={{ once: true }}
//       className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
//     >
//       <div className="relative group">
//         <img
//           src={project.image}
//           alt={project.title}
//           className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
//           <a
//             href={project.liveUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="p-2 bg-white rounded-full hover:bg-green-100 transition-colors"
//           >
//             <ExternalLink size={20} className="text-gray-900" />
//           </a>
//           <a
//             href={project.githubUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="p-2 bg-white rounded-full hover:bg-green-100 transition-colors"
//           >
//             <Github size={20} className="text-gray-900" />
//           </a>
//         </div>
//       </div>
      
//       <div className="p-6">
//         <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
//           {project.title}
//         </h3>
//         <p className="text-gray-600 dark:text-gray-300 mb-4">
//           {project.description}
//         </p>
//         <div className="flex flex-wrap gap-2">
//           {project.tags.map((tag) => (
//             <span
//               key={tag}
//               className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-sm rounded-full"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProjectCard;






// src/components/ProjectCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";

const ProjectCard = ({ project }) => {
  if (!project) return null; // safeguard

  const {
    title = "Untitled Project",
    description = "No description available.",
    image = "/placeholder.png",
    tags = [],
    liveUrl,
    githubUrl,
  } = project;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          onError={(e) => (e.target.src = "/placeholder.png")}
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2 flex-grow">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-4 mt-5">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <FiExternalLink /> Live
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
            >
              <FiGithub /> Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
