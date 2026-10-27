import Image from "next/image";
import Link from "next/link";
import { Arrow, Tag } from "./ui";

// `featured` renders the wide two-column variant used for the lead project.
const ProjectCard = ({ project, index, featured = false, priority = false }) => {
  const { slug, title, tagline, type, year, image, stack, summary, metrics } = project;
  const href = `/projects/${slug}`;

  return (
    <article
      className={`group relative flex h-full overflow-hidden rounded-2xl border border-dark/10 bg-paper transition-colors duration-300 hover:border-dark/25
        dark:border-light/10 dark:bg-ink dark:hover:border-light/25 ${featured ? "flex-row lg:flex-col" : "flex-col"}`}
    >
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className={`relative block overflow-hidden border-dark/10 bg-dark/[0.03] dark:border-light/10 dark:bg-light/[0.03] ${
          featured ? "flex w-[58%] items-center border-r p-8 lg:w-full lg:border-b lg:border-r-0 sm:p-4" : "border-b"
        }`}
      >
        {featured ? (
          // whole screenshot at its natural aspect, framed, so nothing gets cropped off
          <>
            <div className="blueprint absolute inset-0 opacity-70" aria-hidden="true" />
            <div className="relative w-full overflow-hidden rounded-lg border border-dark/10 shadow-[0_24px_48px_-24px_rgba(20,18,16,0.45)] transition-transform duration-500 ease-out group-hover:-translate-y-1 dark:border-light/10">
              <Image src={image} alt="" priority={priority} sizes="(max-width: 1023px) 100vw, 600px" className="h-auto w-full" />
            </div>
          </>
        ) : (
          <Image
            src={image}
            alt=""
            priority={priority}
            sizes="(max-width: 767px) 100vw, 560px"
            className="aspect-[16/9] w-full object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}
      </Link>

      <div className={`flex flex-1 flex-col p-6 sm:p-5 ${featured ? "justify-between p-8" : ""}`}>
        <div>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em] text-dark/50 dark:text-light/50">
            {index && <span className="text-primary dark:text-primaryDark">{index}</span>}
            <span>{type}</span>
            {year && <span>· {year}</span>}
            {featured && (
              <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-primary dark:bg-primaryDark/15 dark:text-primaryDark">Latest</span>
            )}
          </p>
          <h3 className={`mt-3 font-heading font-semibold tracking-tight ${featured ? "text-3xl md:text-2xl" : "text-xl"}`}>
            <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
              {title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-dark/60 dark:text-light/60">{tagline}</p>
          {featured && <p className="mt-4 text-[15px] leading-relaxed text-dark/75 dark:text-light/75">{summary}</p>}
        </div>

        {featured && metrics && (
          <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-dark/10 py-4 dark:border-light/10">
            {metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd className="font-heading text-2xl font-semibold">{m.value}</dd>
                <dd className="font-mono text-[11px] text-dark/50 dark:text-light/50">{m.label}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-5 flex items-end justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {stack.slice(0, featured ? 6 : 4).map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-dark/15 transition-colors duration-300 group-hover:border-dark group-hover:bg-dark group-hover:text-light dark:border-light/15 dark:group-hover:border-light dark:group-hover:bg-light dark:group-hover:text-dark">
            <Arrow />
          </span>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
