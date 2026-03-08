import React from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";

// Map of tag names to colors for badges
const tagColors = {
  React: "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200",
  "Next.js": "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  "Node.js": "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200",
  Express: "bg-gray-300 text-gray-900 dark:bg-gray-600 dark:text-gray-100",
  MongoDB: "bg-green-300 text-green-900 dark:bg-green-700 dark:text-green-100",
  "PostgreSQL": "bg-indigo-200 text-indigo-900 dark:bg-indigo-700 dark:text-indigo-200",
  Flask: "bg-white text-black dark:bg-gray-700 dark:text-white",
  Stripe: "bg-purple-200 text-purple-900 dark:bg-purple-700 dark:text-purple-200",
  Axios: "bg-yellow-200 text-yellow-900 dark:bg-yellow-700 dark:text-yellow-200",
  "Material-UI": "bg-teal-200 text-teal-900 dark:bg-teal-700 dark:text-teal-200",
  Javascript: "bg-yellow-300 text-yellow-900 dark:bg-yellow-700 dark:text-yellow-200",
};

const ProjectCard = ({ project }) => {
  if (!project) return null;

  const { title, description, image, tags = [], liveUrl, githubUrl } = project;

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
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className={`px-3 py-1.5 rounded-full text-sm ${
                tagColors[tag] || "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

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