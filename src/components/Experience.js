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
        <p className="font-medium w-full md:text-sm"> {work}</p>
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
      <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">
        Experience
      </h2>

      <div ref={ref} className="relative w-[75%] mx-auto lg:w-[90%] md:w-full">
        <motion.div
          className="absolute left-9 top-0 w-[4px] md:w-[2px] md:left-[30px] xs:left-[20px] h-full bg-primaryDark shadow-3xl 
            origin-top  dark:bg-primaryDark dark:shadow-3xl"
          style={{ scaleY: scrollYProgress }}
        />

        <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
          <Details
            position="Developer & Solutions Architect"
            company="Huawei Technologies"
            time="2024"
            address="victoria island, Lagos"
            companyLink="https://www.huawei.com"
            work=" Develop and maintain responsive web applications using Next,
React, Redux, Node.js, and MongoDB.
• Design and implement RESTful APIs using Node.js, Express.js,
and MongoDB.
• Write optimized SQL queries for efficient database operations.
• Participate in code reviews and contribute to the development of
coding standards and best practices.
• Implement automated testing and continuous integration
processes to ensure high-quality code and timely delivery of
software solutions.
• Utilize Huawei SaaS to manage alarms on sites in the Tele-
communication sector and used java script to implement
processes "
          />

          <Details
            position="Developer & Oil Chemical Consultant"
            company="Lechem Tech"
            time="2017 - 2022"
            address="83 effurun road, Warri"
            companyLink="https://www.lechemtech.com"
            work="Utilized expertise in chemical mixing and blending to supply critical production chemicals for oil separation processes in a fast-paced production plant environment.

*Key Responsibilities:*

- Mixed and blended various chemicals to create specialized production chemicals (demulsifiers) for oil separation
- Ensured accurate formulation and quality control of chemical solutions
- Supported oil production processes by providing timely and efficient delivery of production chemicals
- Facilitated separation of oil from dirt, water, and other impurities
- Contributed to the success of downstream processes, including fractional distillation

Demulsifiers (chemicals that separate oil from water and other impurities) "
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
        {/* <Link
          href="/articles/"
          target={"_self"}
          className={`flex items-center rounded-lg border-2 border-solid bg-dark p-2.5 px-6 text-lg font-semibold
            capitalize text-light hover:border-dark hover:bg-transparent hover:text-dark 
            dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light
            md:p-2 md:px-4 md:text-base
             `}
        >
          View Articles
        </Link> */}
      </div>
    </div>
  );
};

export default Experience;
