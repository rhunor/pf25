import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/AnimatedText";
import TransitionEffect from "@/components/TransitionEffect";
import { GithubIcon } from "@/components/Icons";

import averisWebsiteImg from "/public/images/projects/averiswebsite1.png";

export default function AverisAcademyWebsite() {
  return (
    <>
      <Head>
        <title>Averis Academy Website | John Rhunor</title>
        <meta
          name="description"
          content="Averis Academy is a professional marketing website built with Next.js, TypeScript, Framer Motion, and Lenis for smooth scrolling and rich animations."
        />
      </Head>

      <TransitionEffect />
      <main className="flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="Averis Academy Website"
            className="mb-16 !text-8xl !leading-tight lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
          />

          <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
            <div className="col-span-4 flex flex-col items-start justify-start xl:col-span-4 md:order-2 md:col-span-8">
              <h2 className="mb-4 text-2xl font-bold capitalize text-dark/75 dark:text-light/75">
                Averis Academy — Marketing & Landing Website
              </h2>
              <h3 className="mb-4 text-lg font-bold text-primary dark:text-primaryDark">
                Next.js | TypeScript | Framer Motion | Lenis | Tailwind CSS
              </h3>
              <p>
                Averis Academy&apos;s marketing website is a high-performance landing platform designed to showcase the academy&apos;s courses, programs, and brand identity. Built with Next.js and TypeScript, the site delivers a fast and polished experience that converts visitors into enrolled students.
              </p>
              <p className="my-4">
                The site features smooth scroll animations powered by Lenis alongside rich UI transitions driven by Framer Motion — creating an immersive browsing experience. Sections include a hero, about, services, proof of results, and a compelling call-to-action flow, all styled with Tailwind CSS for a clean and responsive layout across all devices.
              </p>

              <div className="mt-2 flex items-center gap-4 sm:gap-8">
                <Link
                  className="rounded-lg bg-dark p-2 px-6 text-lg font-semibold
                    border-2 border-solid capitalize text-light hover:border-dark hover:bg-transparent hover:text-dark
                    dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light
                    md:p-2 md:px-4 md:text-base"
                  aria-label="Visit Averis Academy Website"
                  href="https://averishq.com"
                  target="_blank"
                >
                  Visit Website
                </Link>
                <Link
                  href="https://github.com/rhunor/averiswebsite"
                  target="_blank"
                  className="w-10"
                  aria-label="Averis Academy Website GitHub repository"
                >
                  <GithubIcon />
                </Link>
              </div>
            </div>

            <div
              className="relative col-span-4 h-max rounded-2xl border-2 border-solid border-dark
              bg-light p-8 dark:border-light dark:bg-dark
              xl:col-span-4 md:col-span-8 md:order-1"
            >
              <div
                className="absolute top-0 -right-3 -z-10 h-[103%] w-[102%] rounded-[2rem] rounded-br-3xl
                bg-dark dark:bg-light"
              />
              <Image
                className="h-auto w-full rounded-2xl"
                src={averisWebsiteImg}
                alt="Averis Academy marketing website screenshot"
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
              />
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
}
