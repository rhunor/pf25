import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/AnimatedText";
import TransitionEffect from "@/components/TransitionEffect";
import { GithubIcon } from "@/components/Icons";

import primetrexImg from "/public/images/projects/primetrex.png";

export default function Primetrex() {
  return (
    <>
      <Head>
        <title>Primetrex | John Rhunor</title>
        <meta
          name="description"
          content="Primetrex is a full-stack affiliate platform for a professional copy trading service, featuring Telegram bot integration and payment processing."
        />
      </Head>

      <TransitionEffect />
      <main
        className={`flex w-full flex-col items-center justify-center dark:text-light`}
      >
        <Layout className="pt-16">
          <AnimatedText
            text="Primetrex"
            className="mb-16 !text-8xl !leading-tight lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
          />

          <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
            <div
              className="col-span-4 flex flex-col items-start justify-start xl:col-span-4 md:order-2
            md:col-span-8"
            >
              <h2 className="mb-4 text-2xl font-bold capitalize text-dark/75 dark:text-light/75">
                Primetrex — Copy Trading Affiliate Platform
              </h2>
              <h3 className="mb-4 text-lg font-bold text-primary dark:text-primaryDark">
                Full-Stack Development | Telegram Bot Integration | Payment Processing
              </h3>
              <p>
                Primetrex is a full-stack affiliate platform built for a professional copy trading service. The platform enables users to earn commissions by referring new subscribers to Primetrex&apos;s copy trading program through a seamless onboarding flow and intuitive dashboard.
              </p>
              <p className="my-4">
                Key features include Telegram bot integration for real-time notifications, automated user engagement, and referral tracking — alongside secure payment gateway integration for processing referral payouts. The project showcases proficiency in building end-to-end full-stack applications with third-party API orchestration, automated messaging systems, and payment processing workflows.
              </p>

              <div className="mt-2 flex items-center gap-4 sm:gap-8">
                <Link
                  className="rounded-lg bg-dark p-2 px-6 text-lg font-semibold
                    border-2 border-solid capitalize text-light hover:border-dark hover:bg-transparent hover:text-dark
                    dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light
                    md:p-2 md:px-4 md:text-base"
                  aria-label="Visit Primetrex"
                  href="https://primetrex.vercel.app/"
                  target={"_blank"}
                >
                  Visit Website
                </Link>
                <Link
                  href="https://github.com/rhunor/Primetrex"
                  target={"_blank"}
                  className="w-10"
                  aria-label="Primetrex GitHub repository"
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
                src={primetrexImg}
                alt="Primetrex copy trading affiliate platform"
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
