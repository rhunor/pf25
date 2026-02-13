import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import TransitionEffect from "@/components/TransitionEffect";
import { motion } from "framer-motion";

// Project Images
import youtube from "../../public/images/projects/youtube.png";
import gha from "/public/images/projects/gha.png";
import oliveHausSite from "/public/images/projects/olivehauswebsite.png";
import oliveHausPMA from "/public/images/projects/olivehauspma1.png";
import primetrex from "/public/images/projects/primetrex.png";

const FramerImage = motion(Image);

const ProjectCard = ({ title, type, img, link, tools }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center
      bg-neutral-50 dark:bg-neutral-900
      border border-neutral-200/40 dark:border-neutral-800
      shadow-lg shadow-black/5
      rounded-2xl p-6
      hover:shadow-xl transition-all duration-300"
    >
      <Link href={link} className="w-full cursor-pointer overflow-hidden rounded-lg">
        <FramerImage
          src={img}
          alt={title}
          className="w-full h-auto"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
        />
      </Link>

      <div className="mt-4 w-full">
        <span className="text-md font-medium text-primary dark:text-primaryDark">
          {type}
        </span>

        <span className="text-md font-medium text-secondary dark:text-secondaryDark block">
          {tools}
        </span>

        <Link href={link}>
          <h3 className="mt-2 text-2xl font-bold underline-offset-2 hover:underline">
            {title}
          </h3>
        </Link>

        <Link
          href={link}
          className="mt-3 inline-block px-4 py-2
          bg-dark text-light rounded-lg
          hover:bg-transparent hover:text-dark
          border-2 border-solid border-dark
          dark:bg-light dark:text-dark
          dark:hover:bg-dark dark:hover:text-light"
        >
          View Project
        </Link>
      </div>
    </motion.article>
  );
};

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects | By John Rhunor</title>
        <meta
          name="description"
          content="A curated collection of professional web applications and digital products built by John Rhunor."
        />
      </Head>

      <TransitionEffect />

      <main className="flex flex-col items-center justify-center dark:text-light mb-16">
        <Layout className="pt-16">
          <AnimatedText
            text="Imagination Transforms the World ✨"
            className="mb-16 !text-7xl lg:!text-6xl md:!text-5xl sm:!text-4xl xs:!text-3xl"
          />

          <div className="grid grid-cols-12 gap-10 lg:gap-8 md:gap-6">

            <div className="col-span-6 md:col-span-12">
              <ProjectCard
                type="Full-Stack Web Application"
                tools="Next.js | Telegram Bot API | Payment Integration"
                title="Primetrex"
                img={primetrex}
                link="/projects/primetrex"
              />
            </div>

            <div className="col-span-6 md:col-span-12">
              <ProjectCard
                type="Full-Stack Web Development"
                tools="Next.js | TypeScript | MongoDB | Cloudinary"
                title="OliveHaus Interiors Website"
                img={oliveHausSite}
                link="/projects/olivehaus-website"
              />
            </div>

            <div className="col-span-6 md:col-span-12">
              <ProjectCard
                type="Full-Stack Application"
                tools="Next.js | TypeScript | Realtime Features"
                title="OliveHaus Daily Manager"
                img={oliveHausPMA}
                link="/projects/olivehaus-daily-manager"
              />
            </div>

            <div className="col-span-6 md:col-span-12">
              <ProjectCard
                type="Design & Development"
                tools="Next | React | Tailwind"
                title="RhunorTube"
                img={youtube}
                link="/projects/rhunortube"
              />
            </div>

            <div className="col-span-6 md:col-span-12">
              <ProjectCard
                type="Design & Development"
                tools="Next | React | Tailwind"
                title="Gifted Homes & Apartments"
                img={gha}
                link="/projects/giftedhomes"
              />
            </div>

          </div>
        </Layout>
      </main>
    </>
  );
}
