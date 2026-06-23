import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  BookOpen,
  HeartHandshake,
  Briefcase,
} from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Development",
    desc: "Building scalable full-stack applications with modern technologies and clean architecture.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    desc: "Exploring new frameworks, tools, and best practices to stay ahead in technology.",
  },
  {
    icon: HeartHandshake,
    title: "User-Focused",
    desc: "Designing intuitive and accessible experiences that solve real-world problems.",
  },
];

const stats = [
  { number: "10+", label: "Projects" },
  { number: "5+", label: "Technologies" },
  { number: "100%", label: "Dedication" },
];

const About = () => {
  return (
    <section
      id="about"
      className="py-24 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-6">

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-green-600 font-semibold mb-3">
              ABOUT ME
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Full-Stack Developer Passionate About Building Modern Web
              Experiences
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
              I'm a full-stack developer specializing in modern web
              technologies including React, JavaScript, and backend systems.
              I enjoy transforming ideas into scalable, efficient, and
              user-friendly digital solutions.
            </p>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              Whether it's building responsive interfaces, designing APIs,
              or optimizing application performance, I focus on creating
              products that deliver real value.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index}>
                  <h3 className="text-3xl font-bold text-green-600">
                    {stat.number}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid gap-6"
          >
            {highlights.map((item, idx) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={idx}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                  }}
                  className="p-7 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-green-600" />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;