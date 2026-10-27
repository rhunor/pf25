import Layout from "@/components/Layout";
import Head from "next/head";
import dynamic from "next/dynamic";
import TransitionEffect from "@/components/TransitionEffect";
import ProjectCard from "@/components/ProjectCard";
import { motion, useReducedMotion } from "framer-motion";
import { Arrow, Button, Eyebrow, Reveal, SectionHeading, StatusPill, Tag } from "@/components/ui";
import { GithubIcon, LinkedInIcon, XIcon } from "@/components/Icons";
import { SOCIAL } from "@/data/social";
import { useResume } from "@/components/ResumeModal";
import { projects } from "@/data/projects";

// canvas-only, nothing to server-render
const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

const FACTS = [
  { value: "5+", label: "Years building" },
  { value: "20+", label: "Projects shipped" },
  { value: "3", label: "Disciplines" },
  { value: "WAT", label: "Abuja · UTC+1" },
];

const DISCIPLINES = [
  {
    mesh: "network",
    fig: "fig. 02 — icosahedral node graph",
    title: "Software Engineering",
    body: "Full-stack products end to end: data model, APIs, auth, payments, and the UI people actually use.",
    tags: ["Next.js", "TypeScript", "Node.js", "MongoDB", "PostgreSQL"],
  },
  {
    mesh: "gear",
    fig: "fig. 03 — 12-tooth spur gear",
    title: "Mechanical Engineering",
    body: "Trained as a mechanical engineer: diagnostics, preventive maintenance and systems thinking. I design software for failure modes too.",
    tags: ["AutoCAD", "MATLAB", "Diagnostics", "P&ID"],
  },
  {
    mesh: "benzene",
    fig: "fig. 04 — benzene, C₆H₆",
    title: "Oil & Chemical",
    body: "Field engineer and lab consultant formulating demulsifiers and oilfield production chemicals, with QA/QC built in.",
    tags: ["Demulsifiers", "QA/QC", "Aspen HYSYS", "Field testing"],
  },
];

const fade = (reduce, delay) => ({
  initial: reduce ? false : { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Home() {
  const reduce = useReducedMotion();
  const openResume = useResume();
  const [lead, ...rest] = projects;

  return (
    <>
      <Head>
        <title>John Rhunor | Full-Stack Engineer</title>
        <meta
          name="description"
          content="John Rhunor Ighoshemu: full-stack web engineer with a mechanical engineering and oilfield chemicals background, based in Abuja, Nigeria."
        />
      </Head>

      <TransitionEffect />
      <main id="content">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative -mt-[76px] overflow-hidden pt-[76px]">
          <div className="blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
          <Layout className="relative grid grid-cols-12 items-center gap-8 pb-20 pt-20 lg:flex lg:flex-col lg:items-stretch lg:gap-12 lg:pt-12 md:pb-14">
            <div className="col-span-7 lg:col-span-12">
              <motion.div {...fade(reduce, 0.05)}>
                <StatusPill />
              </motion.div>
              <motion.h1 {...fade(reduce, 0.12)} className="mt-6 font-heading text-6xl font-semibold leading-[1.02] tracking-tight xl:text-5xl sm:text-[2.6rem]">
                John Rhunor.
                <span className="block text-dark/45 dark:text-light/45">
                  Full-stack developer with an <span className="text-primary dark:text-primaryDark">engineer&apos;s</span> discipline.
                </span>
              </motion.h1>
              <motion.p {...fade(reduce, 0.2)} className="mt-6 max-w-xl text-lg leading-relaxed text-dark/70 dark:text-light/70 sm:text-base">
                I design and ship production web platforms with Next.js, TypeScript and Node. Before software I worked as a
                mechanical engineer and oilfield chemicals consultant. I still approach code that way: measure, test, then build
                to last.
              </motion.p>
              <motion.div {...fade(reduce, 0.28)} className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="/projects">
                  View my work <Arrow />
                </Button>
                <Button onClick={openResume} variant="secondary" aria-haspopup="dialog">
                  Résumé
                </Button>
                <span className="ml-2 flex items-center gap-3">
                  <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="w-6 opacity-70 transition-opacity hover:opacity-100" aria-label="GitHub">
                    <GithubIcon />
                  </a>
                  <a
                    href={SOCIAL.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-6 rounded-full bg-light opacity-70 transition-opacity hover:opacity-100"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </a>
                  <a href={SOCIAL.x} target="_blank" rel="noopener noreferrer" className="w-5 opacity-70 transition-opacity hover:opacity-100" aria-label="X (Twitter)">
                    <XIcon />
                  </a>
                </span>
              </motion.div>
            </div>

            <motion.figure
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-5 lg:col-span-12 lg:mx-auto lg:w-full lg:max-w-sm"
            >
              <div className="corner-ticks aspect-square w-full">
                <Scene3D mesh="surfactant" interactive speed={0.22} label="Rotating 3D model of a surfactant molecule" />
              </div>
              <figcaption className="mt-3 flex justify-between font-mono text-[11px] text-dark/45 dark:text-light/45">
                <span>fig. 01: alkylbenzene sulfonate</span>
                <span className="sm:hidden">surfactant · C₁₂H₁₇SO₃⁻</span>
              </figcaption>
            </motion.figure>
          </Layout>

          {/* spec-sheet facts strip */}
          <Layout className="relative">
            <dl className="grid grid-cols-4 overflow-hidden rounded-2xl border border-dark/10 bg-paper/80 backdrop-blur-sm dark:border-light/10 dark:bg-ink/80 md:grid-cols-2">
              {FACTS.map((f, i) => (
                <div
                  key={f.label}
                  className={`flex flex-col-reverse border-dark/10 px-6 py-5 dark:border-light/10 ${i > 0 ? "border-l" : ""} md:border-l-0 md:[&:nth-child(2n)]:border-l md:[&:nth-child(n+3)]:border-t`}
                >
                  <dt className="mt-1 font-mono text-[11px] uppercase tracking-wider text-dark/50 dark:text-light/50">{f.label}</dt>
                  <dd className="font-heading text-3xl font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Layout>
        </section>

        {/* ── Selected work ────────────────────────────────── */}
        <section className="pt-28 md:pt-20" aria-labelledby="work-heading">
          <Layout>
            <SectionHeading index="01" eyebrow="Selected work" title={<span id="work-heading">Things I&apos;ve built and shipped</span>}>
              <Button href="/projects" variant="secondary">
                All projects <Arrow />
              </Button>
            </SectionHeading>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-1">
              <Reveal className="col-span-2 md:col-span-1">
                <ProjectCard project={lead} index="01" featured priority />
              </Reveal>
              {rest.slice(0, 4).map((p, i) => (
                <Reveal key={p.slug} delay={(i % 2) * 0.08}>
                  <ProjectCard project={p} index={`0${i + 2}`} />
                </Reveal>
              ))}
            </div>
          </Layout>
        </section>

        {/* ── Disciplines ──────────────────────────────────── */}
        <section className="pt-28 md:pt-20" aria-labelledby="disciplines-heading">
          <Layout>
            <SectionHeading index="02" eyebrow="What I bring" title={<span id="disciplines-heading">Three disciplines, one way of working</span>} />
            <div className="grid grid-cols-3 gap-6 lg:grid-cols-1">
              {DISCIPLINES.map((d, i) => (
                <Reveal key={d.title} delay={i * 0.08} className="flex flex-col rounded-2xl border border-dark/10 bg-paper p-6 dark:border-light/10 dark:bg-ink">
                  <div className="flex items-start gap-5 lg:flex-row-reverse lg:justify-between">
                    <div className="h-28 w-28 shrink-0 rounded-xl border border-dashed border-dark/15 dark:border-light/15">
                      <Scene3D mesh={d.mesh} speed={0.35} tilt={0.5} label={d.fig} />
                    </div>
                    <p className="font-mono text-[11px] text-dark/45 dark:text-light/45 lg:mt-1">{d.fig}</p>
                  </div>
                  <h3 className="mt-6 font-heading text-xl font-semibold">{d.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-dark/70 dark:text-light/70">{d.body}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {d.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </Layout>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="pt-28 md:pt-20">
          <Layout>
            <Reveal className="relative overflow-hidden rounded-3xl bg-dark px-12 py-14 text-light dark:bg-light dark:text-dark md:px-6 md:py-10">
              <div className="blueprint pointer-events-none absolute inset-0 opacity-40 invert dark:invert-0" aria-hidden="true" />
              <div className="relative flex items-end justify-between gap-8 md:flex-col md:items-start">
                <div>
                  <Eyebrow className="!text-primaryDark dark:!text-primary">03 · Next step</Eyebrow>
                  <h2 className="mt-3 max-w-xl font-heading text-4xl font-semibold tracking-tight md:text-3xl">
                    Hiring, or have a product that needs building?
                  </h2>
                  <p className="mt-3 max-w-lg text-light/65 dark:text-dark/65">I usually reply within 1–2 days.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button href="/contact" className="!bg-primaryDark !text-dark hover:!bg-light dark:!bg-primary dark:!text-light dark:hover:!bg-dark">
                    Get in touch <Arrow />
                  </Button>
                  <Button href="/about" variant="secondary" className="!border-light/25 !text-light hover:!border-light dark:!border-dark/25 dark:!text-dark dark:hover:!border-dark">
                    More about me
                  </Button>
                </div>
              </div>
            </Reveal>
          </Layout>
        </section>
      </main>
    </>
  );
}
