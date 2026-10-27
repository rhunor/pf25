import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import TransitionEffect from "@/components/TransitionEffect";
import { GithubIcon } from "@/components/Icons";
import { Arrow, BrowserFrame, Button, Eyebrow, Reveal, Tag } from "@/components/ui";
import { getProject, projects } from "@/data/projects";

export function getStaticPaths() {
  return { paths: projects.map((p) => ({ params: { slug: p.slug } })), fallback: false };
}

// Image imports can't cross the props boundary, so only the slug is passed and the page
// looks the project up again on render.
export function getStaticProps({ params }) {
  return { props: { slug: params.slug } };
}

const Meta = ({ label, children }) => (
  <div className="border-t border-dark/10 pt-3 dark:border-light/10">
    <dt className="font-mono text-[11px] uppercase tracking-wider text-dark/45 dark:text-light/45">{label}</dt>
    <dd className="mt-1 text-sm">{children}</dd>
  </div>
);

export default function CaseStudy({ slug }) {
  const project = getProject(slug);
  const i = projects.indexOf(project);
  const next = projects[(i + 1) % projects.length];
  const { title, tagline, type, year, role, url, urlLabel, github, privateRepo, image, gallery, stack, summary, metrics, overview, highlights } = project;

  return (
    <>
      <Head>
        <title>{`${title} | John Rhunor`}</title>
        <meta name="description" content={`${title}: ${summary}`} />
        <meta property="og:image" content={image.src} />
      </Head>

      <TransitionEffect />
      <main id="content">
        <section className="relative -mt-[76px] overflow-hidden pt-[76px]">
          <div className="blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
          <Layout className="relative pt-14 md:pt-10">
            <Link href="/projects" className="inline-flex items-center gap-2 font-mono text-xs text-dark/55 transition-colors hover:text-dark dark:text-light/55 dark:hover:text-light">
              <span aria-hidden="true">←</span> All projects
            </Link>

            <div className="mt-8 grid grid-cols-12 gap-10 lg:flex lg:flex-col lg:gap-8">
              <Reveal className="col-span-8 lg:col-span-12">
                <Eyebrow index={`${String(i + 1).padStart(2, "0")}/${String(projects.length).padStart(2, "0")}`}>Case study</Eyebrow>
                <h1 className="mt-4 font-heading text-6xl font-semibold leading-[1.04] tracking-tight lg:text-5xl sm:text-4xl">{title}</h1>
                <p className="mt-2 font-heading text-2xl text-dark/45 dark:text-light/45 sm:text-xl">{tagline}</p>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dark/75 dark:text-light/75 sm:text-base">{summary}</p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {url && (
                    <Button href={url} external>
                      Visit {urlLabel} <Arrow />
                    </Button>
                  )}
                  {github && (
                    <Button href={github} external variant="secondary">
                      <span className="w-4">
                        <GithubIcon />
                      </span>
                      Source
                    </Button>
                  )}
                  {privateRepo && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-dark/20 px-4 py-2.5 font-mono text-xs text-dark/60 dark:border-light/20 dark:text-light/60">
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <rect x="3" y="7" width="10" height="7" rx="1.5" />
                        <path d="M5.5 7V5a2.5 2.5 0 015 0v2" />
                      </svg>
                      Private repo, code walkthrough on request
                    </span>
                  )}
                </div>
              </Reveal>

              <Reveal delay={0.1} as="dl" className="col-span-4 grid grid-cols-1 content-start gap-4 lg:col-span-12 lg:grid-cols-3 sm:grid-cols-2">
                <Meta label="Role">{role}</Meta>
                <Meta label="Type">{type}</Meta>
                {year && <Meta label="Year">{year}</Meta>}
                <Meta label="Stack">
                  <span className="mt-1 flex flex-wrap gap-1.5">
                    {stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </span>
                </Meta>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="mt-14 md:mt-10">
              <BrowserFrame src={image} alt={`${title} screenshot`} label={urlLabel} priority sizes="(max-width: 1200px) 100vw, 1100px" />
            </Reveal>
          </Layout>
        </section>

        <Layout className="mt-20 md:mt-14">
          {metrics && (
            <Reveal as="dl" className="mb-16 grid grid-cols-3 overflow-hidden rounded-2xl border border-dark/10 bg-paper dark:border-light/10 dark:bg-ink sm:grid-cols-1">
              {metrics.map((m, k) => (
                <div key={m.label} className={`flex flex-col-reverse border-dark/10 px-6 py-5 dark:border-light/10 ${k > 0 ? "border-l sm:border-l-0 sm:border-t" : ""}`}>
                  <dt className="mt-1 font-mono text-[11px] uppercase tracking-wider text-dark/50 dark:text-light/50">{m.label}</dt>
                  <dd className="font-heading text-4xl font-semibold">{m.value}</dd>
                </div>
              ))}
            </Reveal>
          )}

          <div className="grid grid-cols-12 gap-10 lg:flex lg:flex-col lg:gap-12">
            <Reveal className="col-span-5 lg:col-span-12">
              <Eyebrow>Overview</Eyebrow>
              <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-dark/80 dark:text-light/80">
                {overview.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.08} className="col-span-7 lg:col-span-12">
              <Eyebrow>Engineering highlights</Eyebrow>
              <ol className="mt-4 divide-y divide-dark/10 border-y border-dark/10 dark:divide-light/10 dark:border-light/10">
                {highlights.map((h, k) => (
                  <li key={h} className="flex gap-5 py-4 text-[15px] leading-relaxed">
                    <span className="pt-0.5 font-mono text-xs text-primary dark:text-primaryDark">{String(k + 1).padStart(2, "0")}</span>
                    <span className="text-dark/80 dark:text-light/80">{h}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          {gallery && (
            <section className="mt-20" aria-label="Screenshots">
              <Eyebrow>Screens</Eyebrow>
              <div className="mt-6 grid grid-cols-3 gap-5 md:grid-cols-1">
                {gallery.map((img, k) => (
                  <Reveal key={k} delay={k * 0.06}>
                    <div className="overflow-hidden rounded-xl border border-dark/10 dark:border-light/10">
                      <Image src={img} alt={`${title} screenshot ${k + 1}`} sizes="(max-width: 767px) 100vw, 33vw" className="h-auto w-full" />
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          <Link
            href={`/projects/${next.slug}`}
            className="group mt-24 flex items-center justify-between gap-6 rounded-2xl border border-dark/10 p-8 transition-colors hover:border-dark/30 dark:border-light/10 dark:hover:border-light/30 sm:p-6"
          >
            <div>
              <Eyebrow>Next project</Eyebrow>
              <p className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-2xl">{next.title}</p>
              <p className="mt-1 text-sm text-dark/55 dark:text-light/55">{next.tagline}</p>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-dark/15 transition-colors group-hover:bg-dark group-hover:text-light dark:border-light/15 dark:group-hover:bg-light dark:group-hover:text-dark">
              <Arrow className="h-4 w-4" />
            </span>
          </Link>
        </Layout>
      </main>
    </>
  );
}
