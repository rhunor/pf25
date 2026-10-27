import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

// Small shared building blocks for the redesigned pages.

export const Reveal = ({ children, delay = 0, className = "", as = "div" }) => {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Tag>
  );
};

// `// 02 — Selected work` style eyebrow
export const Eyebrow = ({ index, children, className = "" }) => (
  <p className={`font-mono text-xs uppercase tracking-[0.18em] text-primary dark:text-primaryDark ${className}`}>
    {index && <span className="text-dark/40 dark:text-light/40">{index} — </span>}
    {children}
  </p>
);

export const SectionHeading = ({ index, eyebrow, title, children, className = "" }) => (
  <Reveal className={`mb-10 flex items-end justify-between gap-6 md:flex-col md:items-start ${className}`}>
    <div>
      <Eyebrow index={index}>{eyebrow}</Eyebrow>
      <h2 className="mt-3 font-heading text-4xl font-semibold tracking-tight md:text-3xl">{title}</h2>
    </div>
    {children}
  </Reveal>
);

const BUTTON = {
  primary:
    "bg-dark text-light hover:bg-primary dark:bg-light dark:text-dark dark:hover:bg-primaryDark border border-transparent",
  secondary:
    "border border-dark/20 text-dark hover:border-dark dark:border-light/20 dark:text-light dark:hover:border-light",
};

export const Button = ({ href, children, variant = "primary", external, className = "", ...rest }) => {
  const cls = `inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${BUTTON[variant]} ${className}`;
  if (external || rest.download !== undefined)
    return (
      <a href={href} className={cls} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} {...rest}>
        {children}
      </a>
    );
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
};

export const Arrow = ({ className = "" }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className={`h-3.5 w-3.5 ${className}`} aria-hidden="true">
    <path d="M4 12L12 4M6 4h6v6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Tag = ({ children }) => (
  <span className="rounded-md border border-dark/10 bg-dark/[0.03] px-2 py-0.5 font-mono text-[11px] text-dark/70 dark:border-light/10 dark:bg-light/[0.04] dark:text-light/70">
    {children}
  </span>
);

// Screenshot wrapped in minimal browser chrome
export const BrowserFrame = ({ src, alt, label, priority, sizes = "(max-width: 767px) 100vw, 50vw", className = "", imgClassName = "" }) => (
  <div className={`overflow-hidden rounded-xl border border-dark/10 bg-paper shadow-[0_1px_0_rgba(0,0,0,0.03),0_20px_40px_-24px_rgba(20,18,16,0.35)] dark:border-light/10 dark:bg-ink ${className}`}>
    <div className="flex items-center gap-1.5 border-b border-dark/10 px-3 py-2 dark:border-light/10">
      <span className="h-2 w-2 rounded-full bg-dark/15 dark:bg-light/15" />
      <span className="h-2 w-2 rounded-full bg-dark/15 dark:bg-light/15" />
      <span className="h-2 w-2 rounded-full bg-dark/15 dark:bg-light/15" />
      {label && <span className="ml-2 truncate font-mono text-[11px] text-dark/45 dark:text-light/45">{label}</span>}
    </div>
    <Image src={src} alt={alt} sizes={sizes} priority={priority} className={`h-auto w-full ${imgClassName}`} />
  </div>
);

export const StatusPill = ({ className = "" }) => (
  <span className={`inline-flex items-center gap-2 rounded-full border border-dark/10 bg-paper/70 px-3 py-1 font-mono text-[11px] text-dark/70 dark:border-light/10 dark:bg-ink/70 dark:text-light/70 ${className}`}>
    <span className="status-dot h-1.5 w-1.5 rounded-full bg-emerald-500" />
    Open to roles &amp; freelance
  </span>
);
