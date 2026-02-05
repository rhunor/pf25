import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/AnimatedText";
import TransitionEffect from "@/components/TransitionEffect";
import { GithubIcon } from "@/components/Icons";

import pma1 from "/public/images/projects/olivehauspma.png";
import pma2 from "/public/images/projects/olivehauspma2.png";
import pma3 from "/public/images/projects/olivehauspma3.png";

export default function OliveHausDailyManager() {
  return (
    <>
      <Head>
        <title>OliveHaus Daily Manager</title>
        <meta
          name="description"
          content="OliveHaus Daily Manager — a full-stack real-time project management platform."
        />
      </Head>

      <TransitionEffect />

      <main className="flex flex-col items-center justify-center dark:text-light mb-16">
        <Layout className="pt-16">

          <AnimatedText
            text="OliveHaus Daily Manager"
            className="mb-12 !text-5xl lg:!text-4xl md:!text-3xl"
          />

          <div className="grid w-full grid-cols-8 gap-12 sm:gap-8">

            {/* Text */}
            <div className="col-span-4 md:col-span-8">

              <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                OliveHaus Daily Manager
              </h2>

              <p className="mt-4 text-neutral-700 dark:text-neutral-300">
                A robust full-stack project management platform built for OliveHaus clients. Users can securely log in, monitor project progress in real time, submit feedback, request changes, and communicate directly with project managers through an integrated messaging system.
              </p>

              <p className="mt-4 text-neutral-700 dark:text-neutral-300">
                The application was designed with scalability and real-world workflows in mind, delivering a seamless collaboration experience between clients and project teams.
              </p>

              <div className="mt-6 flex items-center gap-4">

                <Link
                  href="https://olivehausdailymanager.com/"
                  target="_blank"
                  className="px-5 py-2
                  bg-dark text-light rounded-lg
                  hover:bg-transparent hover:text-dark
                  border-2 border-solid border-dark
                  dark:bg-light dark:text-dark
                  dark:hover:bg-dark dark:hover:text-light"
                >
                  Visit Website
                </Link>

                <Link
                  href="https://github.com/rhunor/oliehauspma"
                  target="_blank"
                  className="w-8"
                >
                  <GithubIcon />
                </Link>

              </div>
            </div>

            {/* Gallery */}
            <div className="col-span-4 md:col-span-8 grid grid-cols-1 gap-6">

              {[pma1, pma2, pma3].map((img, idx) => (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden shadow-lg"
                >
                  <Image
                    src={img}
                    alt={`OliveHaus Manager screenshot ${idx + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}

            </div>

          </div>
        </Layout>
      </main>
    </>
  );
}
