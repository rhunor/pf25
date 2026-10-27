import Link from "next/link";
import React from "react";
import Layout from "./Layout";
import { SOCIAL } from "@/data/social";
import { ResumeButton } from "./ResumeModal";

const LINKS = [
  { href: SOCIAL.github, label: "GitHub", external: true },
  { href: SOCIAL.linkedin, label: "LinkedIn", external: true },
  { href: SOCIAL.x, label: "X", external: true },
  { label: "Résumé", resume: true },
  { href: "/contact", label: "Contact" },
];

const Footer = () => {
  return (
    <footer className="mt-24 w-full border-t border-dark/10 dark:border-light/10">
      <Layout className="flex items-center justify-between gap-6 py-8 font-mono text-xs text-dark/55 dark:text-light/55 md:flex-col md:items-start">
        <div className="flex flex-col gap-1">
          <span>© {new Date().getFullYear()} John Rhunor Ighoshemu</span>
          <span className="text-dark/40 dark:text-light/40">Engineered in Abuja, Nigeria · 9.0765° N, 7.3986° E</span>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Footer">
          {LINKS.map(({ href, label, external, download, resume }) =>
            resume ? (
              <ResumeButton key={label} className="transition-colors hover:text-primary dark:hover:text-primaryDark">
                {label}
              </ResumeButton>
            ) : external || download ? (
              <a
                key={label}
                href={href}
                download={download}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="transition-colors hover:text-primary dark:hover:text-primaryDark"
              >
                {label}
                {external && " ↗"}
              </a>
            ) : (
              <Link key={label} href={href} className="transition-colors hover:text-primary dark:hover:text-primaryDark">
                {label}
              </Link>
            )
          )}
        </nav>
      </Layout>
    </footer>
  );
};

export default Footer;
