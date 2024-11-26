import React from 'react';
import { motion } from 'framer-motion';
import { CodeIcon, BookOpenIcon, HeartIcon } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
            I'm a passionate full-stack developer with a love for creating elegant solutions to complex problems. 
            With expertise in modern web technologies and a strong foundation in software engineering principles, 
            I bring ideas to life through clean, efficient code.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-green-50 dark:bg-gray-800">
              <CodeIcon className="w-12 h-12 text-green-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Development</h3>
              <p className="text-gray-600 dark:text-gray-400">Full-stack development with modern technologies</p>
            </div>
            
            <div className="p-6 rounded-lg bg-green-50 dark:bg-gray-800">
              <BookOpenIcon className="w-12 h-12 text-green-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Learning</h3>
              <p className="text-gray-600 dark:text-gray-400">Continuous learner and technology enthusiast</p>
            </div>
            
            <div className="p-6 rounded-lg bg-green-50 dark:bg-gray-800">
              <HeartIcon className="w-12 h-12 text-green-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Passion</h3>
              <p className="text-gray-600 dark:text-gray-400">Dedicated to creating impactful solutions</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;