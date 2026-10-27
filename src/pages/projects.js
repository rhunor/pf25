import Layout from "@/components/Layout";
import Head from "next/head";
import { useState } from "react";
import TransitionEffect from "@/components/TransitionEffect";
import ProjectCard from "@/components/ProjectCard";
import { Eyebrow, Reveal } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "platform", label: "Full-stack platforms" },
  { id: "website", label: "Websites" },
];

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const shown = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <>
      <Head>
        <title>Projects | John Rhunor</title>
        <meta
          name="description"
          content="Full-stack platforms and websites built by John Rhunor: Reallow, Primetrex, Averis Academy, OliveHaus and more."
        />
      </Head>

      <TransitionEffect />

      <main id="content">
        <section className="relative -mt-[76px] overflow-hidden pt-[76px]">
          <div className="blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
          <Layout className="relative pb-12 pt-20 md:pt-12">
            <Reveal>
              <Eyebrow index={String(projects.length).padStart(2, "0")}>Projects</Eyebrow>
              <h1 className="mt-4 max-w-3xl font-heading text-6xl font-semibold leading-[1.04] tracking-tight lg:text-5xl sm:text-4xl">
                Production work, <span className="text-dark/45 dark:text-light/45">built for real users and real money.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-dark/70 dark:text-light/70 sm:text-base">
                Each project has a short case study: what it does, how it&apos;s built, and the engineering decisions that matter.
              </p>
            </Reveal>

            <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
              {FILTERS.map((f) => {
                const count = projects.filter((p) => f.id === "all" || p.category === f.id).length;
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                      active
                        ? "border-dark bg-dark text-light dark:border-light dark:bg-light dark:text-dark"
                        : "border-dark/15 text-dark/70 hover:border-dark/40 dark:border-light/15 dark:text-light/70 dark:hover:border-light/40"
                    }`}
                  >
                    {f.label} <span className="ml-1 font-mono text-xs opacity-60">{count}</span>
                  </button>
                );
              })}
            </div>
          </Layout>
        </section>

        <Layout>
          <motion.div layout className="grid grid-cols-2 gap-6 md:grid-cols-1">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((p, i) => {
                const featured = p.slug === "reallow";
                return (
                  <motion.div
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className={featured ? "col-span-2 md:col-span-1" : ""}
                  >
                    <ProjectCard project={p} index={String(projects.indexOf(p) + 1).padStart(2, "0")} featured={featured} priority={i < 2} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </Layout>
      </main>
    </>
  );
}
