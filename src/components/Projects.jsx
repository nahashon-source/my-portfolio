import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

const Projects = () => {
  return (
    <section
      id="projects"
      className="py-24 bg-gradient-to-b from-black to-gray-900"
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
            Portfolio
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Featured Projects
          </h2>

          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A selection of projects showcasing my experience in
            full-stack development, API integration, responsive design,
            and modern web technologies.
          </p>
        </motion.div>

        {/* Empty State */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
              max-w-lg mx-auto
              p-8
              rounded-2xl
              bg-gray-800
              border border-gray-700
              text-center
            "
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              No Projects Available
            </h3>

            <p className="text-gray-400">
              Projects will appear here soon.
            </p>
          </motion.div>
        )}

        {/* Projects Grid */}
        {projects.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="
              grid
              md:grid-cols-2
              xl:grid-cols-3
              gap-8
            "
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400">
            More projects and experiments are continuously being added.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;