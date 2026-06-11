import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/AnimatedText";
import TransitionEffect from "@/components/TransitionEffect";
import { GithubIcon } from "@/components/Icons";

import averisAffiliateImg from "/public/images/projects/averisaffiliate1.png";

export default function AverisAcademyAffiliate() {
  return (
    <>
      <Head>
        <title>Averis Academy Affiliate & Learning Platform | John Rhunor</title>
        <meta
          name="description"
          content="Averis Academy affiliate and learning platform — a full-stack Next.js application with MongoDB, NextAuth, Telegram bot integration, Cloudinary, and an analytics dashboard."
        />
      </Head>

      <TransitionEffect />
      <main className="flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="Averis Academy Platform"
            className="mb-16 !text-8xl !leading-tight lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
          />

          <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
            <div className="col-span-4 flex flex-col items-start justify-start xl:col-span-4 md:order-2 md:col-span-8">
              <h2 className="mb-4 text-2xl font-bold capitalize text-dark/75 dark:text-light/75">
                Averis Academy — Affiliate & Learning Platform
              </h2>
              <h3 className="mb-4 text-lg font-bold text-primary dark:text-primaryDark">
                Next.js | TypeScript | MongoDB | NextAuth | Telegram Bot | Cloudinary
              </h3>
              <p>
                A comprehensive full-stack affiliate and learning management platform for Averis Academy. The system handles student enrollment, affiliate referral tracking, course delivery, and payment verification — all within a single cohesive application.
              </p>
              <p className="my-4">
                Key features include a secure authentication system powered by NextAuth with MongoDB, a Telegram bot (GrammyJS) for automated student notifications and onboarding, Cloudinary for course media management, and Recharts-driven analytics dashboards for admins to monitor revenue, enrollments, and affiliate performance in real time. The platform also includes a reCAPTCHA-protected registration flow and QR code generation for referral links.
              </p>

              <div className="mt-2 flex items-center gap-4 sm:gap-8">
                <Link
                  className="rounded-lg bg-dark p-2 px-6 text-lg font-semibold
                    border-2 border-solid capitalize text-light hover:border-dark hover:bg-transparent hover:text-dark
                    dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light
                    md:p-2 md:px-4 md:text-base"
                  aria-label="Visit Averis Academy Platform"
                  href="https://averisacademy.com"
                  target="_blank"
                >
                  Visit Website
                </Link>
                <Link
                  href="https://github.com/rhunor/averisaffiliate"
                  target="_blank"
                  className="w-10"
                  aria-label="Averis Academy Affiliate Platform GitHub repository"
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
                src={averisAffiliateImg}
                alt="Averis Academy affiliate and learning platform screenshot"
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
