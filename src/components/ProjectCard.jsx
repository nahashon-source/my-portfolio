import React from "react";
import { motion } from "framer-motion";
import {
  FiExternalLink,
  FiGithub,
} from "react-icons/fi";

const tagColors = {
  React: "bg-cyan-500/20 text-cyan-300",
  Laravel: "bg-red-500/20 text-red-300",
  PHP: "bg-indigo-500/20 text-indigo-300",
  Python: "bg-yellow-500/20 text-yellow-300",
  FastAPI: "bg-teal-500/20 text-teal-300",
  MySQL: "bg-orange-500/20 text-orange-300",
  PostgreSQL: "bg-blue-500/20 text-blue-300",
  Tailwind: "bg-cyan-500/20 text-cyan-300",
  TypeScript: "bg-blue-500/20 text-blue-300",
};

const ProjectCard = ({ project }) => {
  if (!project) return null;

  const {
    title,
    description,
    image,
    tags = [],
    liveUrl,
    githubUrl,
    featured,
    status,
    type,
  } = project;

  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      className="
        overflow-hidden
        rounded-2xl
        bg-gray-900
        border border-gray-800
        shadow-lg
        hover:border-green-500/50
        transition-all
      "
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">

        <img
          src={image}
          alt={title}
          className="
            w-full h-full object-cover
            transition duration-500
            hover:scale-110
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {featured && (
          <span className="
            absolute top-4 left-4
            px-3 py-1 rounded-full
            bg-green-600 text-white text-xs
          ">
            Featured
          </span>
        )}

        {status && (
          <span className="
            absolute top-4 right-4
            px-3 py-1 rounded-full
            bg-emerald-600 text-white text-xs
          ">
            {status}
          </span>
        )}
      </div>

      <div className="p-6">

        {type && (
          <p className="text-green-400 text-sm mb-2">
            {type}
          </p>
        )}

        <h3 className="text-2xl font-semibold text-white mb-3">
          {title}
        </h3>

        <p className="text-gray-400 leading-relaxed mb-5">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className={`
                px-3 py-1 rounded-full text-sm
                ${tagColors[tag] ||
                  "bg-gray-700 text-gray-300"}
              `}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex-1
                py-3
                rounded-lg
                bg-green-600
                hover:bg-green-700
                text-white
                flex items-center
                justify-center
                gap-2
                transition
              "
            >
              <FiExternalLink />
              Live Demo
            </a>
          )}

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex-1
                py-3
                rounded-lg
                border border-gray-700
                text-gray-300
                hover:border-green-500
                hover:text-white
                flex items-center
                justify-center
                gap-2
                transition
              "
            >
              <FiGithub />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;