import Layout from "@/components/Layout";
import Head from "next/head";
import FlipPortrait from "@/components/FlipPortrait";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import TransitionEffect from "@/components/TransitionEffect";
import { Arrow, Button, Eyebrow, Reveal, StatusPill } from "@/components/ui";
import { useResume } from "@/components/ResumeModal";

const GLANCE = [
  { label: "Based in", value: "Abuja, Nigeria (WAT, UTC+1)" },
  { label: "Focus", value: "Full-stack web: Next.js, React, TypeScript, Node.js" },
  { label: "Currently", value: "CTO & Head of Technology at Reallow · Field engineer & lab consultant at LATEQ" },
  { label: "Background", value: "Mechanical engineer by training" },
  { label: "Exploring", value: "Cybersecurity & cloud computing" },
];

export default function About() {
  const openResume = useResume();
  return (
    <>
      <Head>
        <title>About | John Rhunor</title>
        <meta
          name="description"
          content="About John Rhunor Ighoshemu: full-stack web engineer, mechanical engineer and oil chemical consultant based in Abuja."
        />
      </Head>

      <TransitionEffect />
      <main id="content">
        <section className="relative -mt-[76px] overflow-hidden pt-[76px]">
          <div className="blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
          <Layout className="relative grid grid-cols-12 gap-14 pt-20 lg:flex lg:flex-col lg:gap-10 md:pt-12">
            <Reveal className="col-span-7 lg:col-span-12">
              <Eyebrow index="01">About</Eyebrow>
              <h1 className="mt-4 font-heading text-5xl font-semibold leading-[1.06] tracking-tight lg:text-4xl">
                An engineer first. <span className="text-dark/45 dark:text-light/45">Software is where I build now.</span>
              </h1>
              <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-dark/75 dark:text-light/75">
                <p>
                  Hi, I&apos;m Rhunor, a full-stack web developer specializing in web applications with technologies like Next.js, React,
                  TypeScript, Node.js, and database management. With a Mechanical Engineering background, I bring analytical thinking and
                  problem-solving to software development.
                </p>
                <p>
                  Currently, I&apos;m CTO and Head of Technology at{" "}
                  <a href="https://reallow.co" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline dark:text-primaryDark">
                    Reallow
                  </a>
                  , a direct landlord-to-tenant real estate platform. I&apos;m also the lead software engineer and laboratory/field
                  consultant at an oil and chemical supply company, creating innovative solutions that enhance efficiency. I also work on freelance web apps, collaborating with clients and
                  honing my skills.
                </p>
                <p>
                  I&apos;m passionate about cybersecurity and cloud computing, constantly exploring these fields to expand my expertise. My
                  goal is to deliver impactful digital solutions that exceed expectations.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button onClick={openResume} aria-haspopup="dialog">
                  View résumé
                </Button>
                <Button href="/contact" variant="secondary">
                  Get in touch <Arrow />
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="col-span-5 lg:col-span-12 lg:mx-auto lg:w-full lg:max-w-md">
              <figure>
                <div className="corner-ticks relative rounded-2xl border border-dark/10 bg-paper p-8 dark:border-light/10 dark:bg-ink sm:p-5">
                  <div className="blueprint absolute inset-0 rounded-2xl" aria-hidden="true" />
                  <span className="absolute left-4 top-3 font-mono text-[10px] uppercase tracking-wider text-dark/40 dark:text-light/40" aria-hidden="true">
                    ↻ <span className="lg:hidden">Hover</span>
                    <span className="hidden lg:inline">Tap</span> to flip
                  </span>
                  <FlipPortrait />
                </div>
                <figcaption className="mt-3 flex items-center justify-between font-mono text-[11px] text-dark/45 dark:text-light/45">
                  <span>John Rhunor Ighoshemu</span>
                  <StatusPill className="!py-0.5" />
                </figcaption>
              </figure>
            </Reveal>
          </Layout>
        </section>

        <Layout>
          <Reveal className="mt-16">
            <Eyebrow>At a glance</Eyebrow>
            <dl className="mt-4 divide-y divide-dark/10 border-y border-dark/10 dark:divide-light/10 dark:border-light/10">
              {GLANCE.map((g) => (
                <div key={g.label} className="grid grid-cols-12 gap-4 py-3.5 md:flex md:flex-col md:gap-1">
                  <dt className="col-span-3 font-mono text-xs uppercase tracking-wider text-dark/50 dark:text-light/50 md:col-span-12">{g.label}</dt>
                  <dd className="col-span-9 text-[15px] md:col-span-12">{g.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Skills />
          <Experience />

          <Reveal className="mt-20 flex items-center justify-between gap-6 rounded-2xl border border-dark/10 p-8 dark:border-light/10 md:flex-col md:items-start sm:p-6">
            <p className="font-heading text-2xl font-semibold tracking-tight">See what I&apos;ve shipped.</p>
            <Button href="/projects">
              View projects <Arrow />
            </Button>
          </Reveal>
        </Layout>
      </main>
    </>
  );
}
