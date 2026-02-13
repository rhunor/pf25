import { motion } from "framer-motion";
import React from "react";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "Tailwind CSS"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Spring Boot"],
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "Docker", "Solidity", "Rust", "Java", "REST APIs"],
  },
  {
    title: "Engineering",
    skills: ["AutoCAD", "MATLAB", "Aspen HYSYS", "P&ID", "Mechanical Diagnostics", "QA/QC"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

const Skills = () => {
  return (
    <>
      <h2 className="font-bold text-8xl mt-64 w-full text-center font-heading md:text-6xl md:mt-32">
        Skills
      </h2>
      <motion.div
        className="w-full mt-16 mb-64 md:mb-32 grid grid-cols-2 gap-8 md:grid-cols-1 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {skillCategories.map((category) => (
          <motion.div
            key={category.title}
            variants={categoryVariants}
            className="rounded-2xl border border-dark/10 dark:border-light/10 bg-light dark:bg-dark p-8 md:p-6
              shadow-lg shadow-black/5 dark:shadow-white/5 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-bold mb-6 text-primary dark:text-primaryDark font-heading">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={skillVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="cursor-default px-4 py-2 rounded-lg text-sm font-semibold
                    bg-dark text-light dark:bg-light dark:text-dark
                    transition-colors duration-200"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default Skills;
