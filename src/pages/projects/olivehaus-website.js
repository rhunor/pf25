import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/AnimatedText";
import TransitionEffect from "@/components/TransitionEffect";
import { GithubIcon } from "@/components/Icons";

import oliveHausSite from "/public/images/projects/olivehauswebsite.png";

export default function OliveHausWebsite() {
  return (
    <>
      <Head>
        <title>OliveHaus Interiors Website</title>
        <meta
          name="description"
          content="A full-stack website for OliveHaus Interiors built with Next.js, TypeScript, MongoDB, and Cloudinary."
        />
      </Head>

      <TransitionEffect />
      <main className="flex flex-col items-center justify-center dark:text-light mb-16">
        <Layout className="pt-16">
          <AnimatedText
            text="OliveHaus Interiors Website"
            className="mb-12 !text-5xl lg:!text-4xl md:!text-3xl"
          />

          <div className="grid w-full grid-cols-8 gap-12 sm:gap-8">
            {/* Text Section */}
            <div className="col-span-4 md:col-span-8">
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                OliveHaus Interiors
              </h2>
              <p className="mt-4 text-base text-neutral-700 dark:text-neutral-300">
                A modern full-stack website built for OliveHaus Interiors, a Lagos-based interior design company. The platform showcases beautiful project galleries, rich animations, and a professional aesthetic.
              </p>

              <p className="mt-4 text-base text-neutral-700 dark:text-neutral-300">
                The system also includes a custom admin dashboard where the OliveHaus team can upload new projects, manage blogs, and update content dynamically. The backend is powered by MongoDB and uses Cloudinary for optimized image storage.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <Link
                  href="https://www.olivehausinteriors.com/"
                  target="_blank"
                  className="px-5 py-2 bg-dark text-light rounded-lg hover:bg-transparent hover:text-dark border-2 border-solid border-dark dark:bg-light dark:text-dark"
                >
                  Visit Website
                </Link>

                <Link href="https://github.com/rhunor/oliehauswebsite" target="_blank" className="w-8">
                  <GithubIcon />
                </Link>
              </div>
            </div>

            {/* Image Section */}
            <div className="col-span-4 md:col-span-8">
              <div className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden shadow-lg">
                <Image
                  src={oliveHausSite}
                  alt="OliveHaus Interiors Screenshot"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
}
