// import React from 'react';
// import { motion } from 'framer-motion';
// import ProjectCard from './ProjectCard';
// import { projects } from '../data/projects';

// const Projects = () => {
//   return (
//     <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
//           <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//             Here are some of my recent projects that showcase my skills in full-stack development,
//             from environmental platforms to fitness applications.
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {projects.map((project) => (
//             <ProjectCard key={project.id} project={project} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Projects;






// src/components/Projects.jsx
import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            A showcase of my real-world projects, from web apps to logistics
            platforms. Each project highlights my skills in both frontend and
            backend development.
          </p>
        </motion.div>

        {/* Grid of projects */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(projects) && projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              🚧 No projects available at the moment.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
