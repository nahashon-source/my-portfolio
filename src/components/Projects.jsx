import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-[#080c10]">
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
            Portfolio
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Featured Projects
          </h2>

          <p className="text-[15px] text-white/40 max-w-xl mx-auto leading-relaxed">
            A selection of projects showcasing my experience in full-stack
            development, API integration, and modern web technologies.
          </p>
        </motion.div>

        {/* Empty state */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-sm mx-auto p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center"
          >
            <h3 className="text-base font-medium text-white mb-2">
              No projects yet
            </h3>
            <p className="text-sm text-white/35">
              Projects will appear here soon.
            </p>
          </motion.div>
        )}

        {/* Grid */}
        {projects.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer note */}
        {projects.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center text-sm text-white/25 mt-14"
          >
            More projects are continuously being added.
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default Projects;
