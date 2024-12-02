import React from 'react';
import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon, MailIcon, ArrowDownIcon } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Hi, I'm Nahashon Mwendwa
            </h1>
            <h2 className="text-xl lg:text-2xl text-gray-300 mb-8">
              Full-Stack Developer | React • Flask • PostgreSQL
            </h2>
            <div className="flex justify-center lg:justify-start gap-4 mb-8">
              <a
                href="#projects"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 py-3 rounded-lg transition-colors"
              >
                Contact Me
              </a>
            </div>
            <div className="flex justify-center lg:justify-start gap-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <GithubIcon size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <LinkedinIcon size={24} />
              </a>
              <a
                href="mailto:contact@nahashon.dev"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <MailIcon size={24} />
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop"
              alt="Nahashon Mwendwa"
              className="rounded-full w-64 h-64 lg:w-80 lg:h-80 object-cover mx-auto shadow-xl"
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <a href="#about" className="animate-bounce block">
            <ArrowDownIcon className="text-gray-400" size={32} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
