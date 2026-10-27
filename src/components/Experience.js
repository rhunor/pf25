import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Reveal, SectionHeading } from "./ui";

const roles = [
  {
    position: "CTO & Head of Technology",
    company: "Reallow",
    companyLink: "https://reallow.co",
    time: "Sep 2026 – Present",
    address: "Nigeria",
    work: "Lead the technology behind Reallow, a direct landlord-to-tenant real estate platform live in Abuja, Port Harcourt and Warri. Own the architecture and engineering of the Next.js, TypeScript and MongoDB platform: role-based dashboards for tenants, landlords and staff, Paystack payments and wallet, NIN identity verification, tenancy e-signatures, map search, and support for six languages.",
  },
  {
    position: "Field Engineer / Laboratory Technician",
    company: "LATEQ Chemical Industries",
    time: "2018 – 2023; 2024 – Present",
    address: "Nigeria",
    work: "Led on-site formulation and blending of demulsifiers and oilfield production chemicals. Conducted field-based testing to evaluate chemical performance during oil-water separation processes. Carried out QA/QC procedures in laboratory settings, optimized dosing rates and blending workflows to enhance production efficiency. Automated lab result documentation using Java-based internal tools.",
  },
  {
    position: "Software Developer & Solutions Architect",
    company: "Huawei Technologies",
    companyLink: "https://www.huawei.com",
    time: "2024",
    address: "Victoria Island, Lagos",
    work: "Developed and maintained responsive web applications using Next.js, React, Redux, Node.js, and MongoDB. Designed and implemented RESTful APIs with Express.js. Wrote optimized SQL queries for PostgreSQL. Utilized Huawei SaaS to manage alarms on telecom sites and implemented automation processes with JavaScript. Built microservices with Spring Boot and Java for scalable backend systems.",
  },
  {
    position: "Mechanical & Automotive Specialist Intern",
    company: "Gladtrico International",
    time: "2023",
    address: "Nigeria",
    work: "Participated in troubleshooting engine, brake, and suspension systems. Conducted inspections in line with national standards for mechanical performance. Worked alongside senior engineers to maintain optimal vehicle performance through repairs and calibrations.",
  },
  {
    position: "Mechanical Engineer & Automobile Specialist Intern",
    company: "RT Briscoe",
    time: "2021",
    address: "Lagos, Nigeria",
    work: "Diagnosed and repaired mechanical faults in automobiles. Conducted preventive maintenance and inspections to improve machine performance. Performed engine overhauls, AC system maintenance, and supported component testing using industry-standard diagnostic tools.",
  },
];

const Experience = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });

  return (
    <section className="mt-28 md:mt-20" aria-labelledby="experience-heading">
      <SectionHeading index="03" eyebrow="Track record" title={<span id="experience-heading">Experience</span>} />

      <div ref={ref} className="relative">
        {/* pipeline: a static rail with a progress "flow" filling it on scroll */}
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-dark/10 dark:bg-light/10" aria-hidden="true" />
        <motion.div
          className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-primary dark:bg-primaryDark"
          style={{ scaleY: scrollYProgress }}
          aria-hidden="true"
        />

        <ol className="space-y-10">
          {roles.map((r) => (
            <Reveal as="li" key={r.company + r.time} className="relative grid grid-cols-12 gap-6 pl-10 md:flex md:flex-col md:gap-2">
              <span
                className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-primary bg-light dark:border-primaryDark dark:bg-dark"
                aria-hidden="true"
              />
              <div className="col-span-3 font-mono text-xs leading-6 text-dark/55 dark:text-light/55 md:col-span-12">
                <p>{r.time}</p>
                <p>{r.address}</p>
              </div>
              <div className="col-span-9 md:col-span-12">
                <h3 className="font-heading text-xl font-semibold">
                  {r.position}{" "}
                  {r.companyLink ? (
                    <a href={r.companyLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline dark:text-primaryDark">
                      @ {r.company}
                    </a>
                  ) : (
                    <span className="text-primary dark:text-primaryDark">@ {r.company}</span>
                  )}
                </h3>
                <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-dark/70 dark:text-light/70">{r.work}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
