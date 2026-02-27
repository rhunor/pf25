import AnimatedText from "@/components/AnimatedText";
import { HireMe } from "@/components/HireMe";
import Layout from "@/components/Layout";
import Head from "next/head";
import Link from "next/link";
import TransitionEffect from "@/components/TransitionEffect";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <Head>
        <title>John Rhunor | Engineer & Web Developer</title>
        <meta
          name="description"
          content="John Rhunor Ighoshemu — Mechanical Engineer, Oil Chemical Consultant, and Full-Stack Web Developer based in Lagos, Nigeria."
        />
      </Head>

      <TransitionEffect />
      <article className="flex min-h-screen items-center text-dark dark:text-light sm:items-start">
        <Layout className="!pt-16 md:!pt-12 sm:!pt-16">
          <div className="flex w-full items-center justify-between md:flex-col pt-6 pb-16 sm:pb-10">
            <div className="flex w-full flex-col items-start self-center">

              {/* Eyebrow label */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-primary dark:text-primaryDark"
              >
                Engineer · Developer · Consultant
              </motion.span>

              <AnimatedText
                text="Hello, I'm Rhunor"
                className="!text-left !text-7xl !leading-tight xl:!text-6xl lg:!text-5xl md:!text-5xl sm:!text-4xl xs:!text-3xl"
              />

              {/* Subtitle */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-4 font-heading font-semibold italic text-2xl xl:text-xl lg:text-xl md:text-lg sm:text-base
                  animate-text bg-gradient-to-r from-primary via-primaryDark to-slideGreen bg-clip-text text-transparent"
              >
                Mechanical Engineer, Oil Chemical Consultant &amp; Web Developer
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="my-6 text-base font-normal leading-relaxed text-dark/80 dark:text-light/80 max-w-2xl md:text-sm sm:text-sm sm:my-4"
              >
                I build full-stack web applications and bring an engineer&apos;s precision
                to every project. With a background in mechanical engineering and years
                of experience in oil chemical consulting, I deliver digital solutions
                that are robust, thoughtful, and impactful.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="flex items-center gap-4 flex-wrap"
              >
                <Link
                  href="/about/"
                  className="flex items-center rounded-lg border-2 border-solid border-dark bg-dark
                    p-2.5 px-6 text-sm font-semibold tracking-wide uppercase text-light
                    hover:border-primary hover:bg-primary hover:text-light
                    dark:border-light dark:bg-light dark:text-dark
                    dark:hover:border-primaryDark dark:hover:bg-primaryDark dark:hover:text-dark
                    transition-colors duration-200 md:p-2 md:px-4 md:text-xs sm:p-2 sm:px-3"
                >
                  About Me
                </Link>
                <Link
                  href="/projects/"
                  className="flex items-center rounded-lg border-2 border-solid border-dark
                    p-2.5 px-6 text-sm font-semibold tracking-wide uppercase text-dark
                    hover:border-primary hover:bg-primary hover:text-light
                    dark:border-light dark:text-light
                    dark:hover:border-primaryDark dark:hover:bg-primaryDark dark:hover:text-dark
                    transition-colors duration-200 md:p-2 md:px-4 md:text-xs sm:p-2 sm:px-3"
                >
                  View Projects
                </Link>
              </motion.div>

              {/* Stat strip — wraps on small screens */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 sm:mt-8 sm:gap-x-6"
              >
                <div className="flex flex-col">
                  <span className="font-heading text-4xl font-bold text-primary dark:text-primaryDark sm:text-3xl">5+</span>
                  <span className="text-xs font-medium uppercase tracking-wider text-dark/60 dark:text-light/60 mt-1">Years Exp.</span>
                </div>
                <div className="w-px h-8 bg-dark/20 dark:bg-light/20 sm:hidden" />
                <div className="flex flex-col">
                  <span className="font-heading text-4xl font-bold text-primary dark:text-primaryDark sm:text-3xl">20+</span>
                  <span className="text-xs font-medium uppercase tracking-wider text-dark/60 dark:text-light/60 mt-1">Projects</span>
                </div>
                <div className="w-px h-8 bg-dark/20 dark:bg-light/20 sm:hidden" />
                <div className="flex flex-col">
                  <span className="font-heading text-4xl font-bold text-primary dark:text-primaryDark sm:text-3xl">3</span>
                  <span className="text-xs font-medium uppercase tracking-wider text-dark/60 dark:text-light/60 mt-1">Industries</span>
                </div>
              </motion.div>
            </div>
          </div>
        </Layout>
        <HireMe />
      </article>
    </>
  );
}
