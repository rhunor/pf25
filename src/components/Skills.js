import React from "react";
import { Reveal, SectionHeading } from "./ui";

const skillCategories = [
  {
    code: "FE",
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "Tailwind CSS"],
  },
  {
    code: "BE",
    title: "Backend",
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Spring Boot"],
  },
  {
    code: "OPS",
    title: "Tools & DevOps",
    skills: ["Git", "Docker", "Solidity", "Rust", "Java", "REST APIs"],
  },
  {
    code: "ENG",
    title: "Engineering",
    skills: ["AutoCAD", "MATLAB", "Aspen HYSYS", "P&ID", "Mechanical Diagnostics", "QA/QC"],
  },
];

const Skills = () => {
  return (
    <section className="mt-28 md:mt-20" aria-labelledby="skills-heading">
      <SectionHeading index="02" eyebrow="Toolkit" title={<span id="skills-heading">Skills</span>} />
      <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-dark/10 dark:border-light/10 md:grid-cols-1">
        {skillCategories.map((category, i) => (
          <Reveal
            key={category.title}
            delay={i * 0.05}
            className={`bg-paper p-7 dark:bg-ink md:p-5 ${i % 2 ? "border-l border-dark/10 dark:border-light/10 md:border-l-0" : ""} ${
              i > 1 ? "border-t border-dark/10 dark:border-light/10" : ""
            } ${i > 0 ? "md:border-t" : ""}`}
          >
            <div className="flex items-baseline justify-between">
              <h3 className="font-heading text-lg font-semibold">{category.title}</h3>
              <span className="font-mono text-[11px] text-primary dark:text-primaryDark">{category.code}</span>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-lg border border-dark/10 px-3 py-1.5 text-sm text-dark/80 transition-colors hover:border-primary hover:text-primary dark:border-light/10 dark:text-light/80 dark:hover:border-primaryDark dark:hover:text-primaryDark"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Skills;
