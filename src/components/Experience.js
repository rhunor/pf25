import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import LiIcon from "./LiIcon";
import Link from "next/link";

const Details = ({ position, company, companyLink, time, address, work }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-start justify-between md:w-[80%]"
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">
          {position}{" "}
          <a
            className="capitalize text-slideGreen dark:text-primaryDark"
            href={companyLink}
            target={"_blank"}
          >
            @{company}
          </a>
        </h3>
        <span className="capitalize text-dark/75 font-medium dark:text-light/50 xs:text-sm">
          {time} | {address}
        </span>
        <p className="font-medium w-full md:text-sm">{work}</p>
      </motion.div>
    </li>
  );
};

const Experience = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  return (
    <div className="my-64">
      <h2 className="font-bold text-8xl mb-32 w-full text-center font-heading md:text-6xl xs:text-4xl md:mb-16">
        Experience
      </h2>

      <div ref={ref} className="relative w-[75%] mx-auto lg:w-[90%] md:w-full">
        <motion.div
          className="absolute left-9 top-0 w-[4px] md:w-[2px] md:left-[30px] xs:left-[20px] h-full bg-primaryDark shadow-3xl
            origin-top dark:bg-primaryDark dark:shadow-3xl"
          style={{ scaleY: scrollYProgress }}
        />

        <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
          <Details
            position="Field Engineer / Laboratory Technician"
            company="LATEQ Chemical Industries"
            time="2018 - 2023; 2024 - Present"
            address="Nigeria"
            companyLink="#"
            work="Led on-site formulation and blending of demulsifiers and oilfield production chemicals. Conducted field-based testing to evaluate chemical performance during oil-water separation processes. Carried out QA/QC procedures in laboratory settings, optimized dosing rates and blending workflows to enhance production efficiency. Automated lab result documentation using Java-based internal tools."
          />

          <Details
            position="Software Developer & Solutions Architect"
            company="Huawei Technologies"
            time="2024"
            address="Victoria Island, Lagos"
            companyLink="https://www.huawei.com"
            work="Developed and maintained responsive web applications using Next.js, React, Redux, Node.js, and MongoDB. Designed and implemented RESTful APIs with Express.js. Wrote optimized SQL queries for PostgreSQL. Utilized Huawei SaaS to manage alarms on telecom sites and implemented automation processes with JavaScript. Built microservices with Spring Boot and Java for scalable backend systems."
          />

          <Details
            position="Mechanical Engineer & Automobile Specialist Intern"
            company="RT Briscoe"
            time="2021"
            address="Lagos, Nigeria"
            companyLink="#"
            work="Diagnosed and repaired mechanical faults in automobiles. Conducted preventive maintenance and inspections to improve machine performance. Performed engine overhauls, AC system maintenance, and supported component testing using industry-standard diagnostic tools."
          />

          <Details
            position="Mechanical & Automotive Specialist Intern"
            company="Gladtrico International"
            time="2023"
            address="Nigeria"
            companyLink="#"
            work="Participated in troubleshooting engine, brake, and suspension systems. Conducted inspections in line with national standards for mechanical performance. Worked alongside senior engineers to maintain optimal vehicle performance through repairs and calibrations."
          />
        </ul>
      </div>
      <div className="mt-40 flex items-center justify-between gap-3 grid-cols-2">
        <Link
          href="/projects/"
          target={"_self"}
          className={`flex items-center rounded-lg border-2 border-solid bg-light p-2.5 px-6 text-lg font-semibold
            capitalize text-dark hover:border-light hover:bg-dark hover:text-light
            dark:bg-dark dark:text-light dark:hover:bg-light dark:hover:text-dark
            md:p-2 md:px-4 md:text-base
             `}
        >
          View Projects
        </Link>
      </div>
    </div>
  );
};

export default Experience;
