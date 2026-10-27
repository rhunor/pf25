import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { useRouter } from "next/router";
import { GithubIcon, LinkedInIcon, MoonIcon, SunIcon } from "./Icons";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeSwitch } from "./Hooks/useThemeSwitch";

const LINKS = [
  { href: "/", title: "Home" },
  { href: "/projects", title: "Work" },
  { href: "/about", title: "About" },
  { href: "/contact", title: "Contact" },
];

const isActive = (path, href) => (href === "/" ? path === "/" : path.startsWith(href));

const ThemeToggle = ({ mode, setMode }) => (
  <button
    onClick={() => setMode(mode === "light" ? "dark" : "light")}
    className="flex h-9 w-9 items-center justify-center rounded-full border border-dark/10 text-dark transition-colors hover:border-dark/30 dark:border-light/10 dark:text-light dark:hover:border-light/30"
    aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
  >
    <span className="h-5 w-5">{mode === "light" ? <SunIcon className="fill-dark" /> : <MoonIcon className="fill-dark" />}</span>
  </button>
);

const Navbar = () => {
  const [mode, setMode] = useThemeSwitch();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const path = router.asPath.split(/[?#]/)[0];

  useEffect(() => setIsOpen(false), [path]);

  return (
    <header className="sticky top-0 z-40 w-full px-6 pt-4 sm:px-3 sm:pt-3">
      <div
        className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-dark/10 bg-light/75 py-2 pl-5 pr-2
          shadow-[0_8px_30px_-12px_rgba(20,18,16,0.18)] backdrop-blur-md dark:border-light/10 dark:bg-dark/70"
      >
        <Logo />

        <nav className="flex items-center gap-1 lg:hidden" aria-label="Main">
          {LINKS.map(({ href, title }) => {
            const active = isActive(path, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active ? "text-dark dark:text-light" : "text-dark/60 hover:text-dark dark:text-light/60 dark:hover:text-light"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-dark/[0.06] dark:bg-light/[0.08]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {title}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/engr-john-rhunor-resume.pdf"
            download
            className="rounded-full bg-dark px-4 py-2 text-sm font-medium text-light transition-colors hover:bg-primary dark:bg-light dark:text-dark dark:hover:bg-primaryDark sm:hidden"
          >
            Résumé
          </a>
          <ThemeToggle mode={mode} setMode={setMode} />
          <button
            type="button"
            className="hidden h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-dark/10 dark:border-light/10 lg:flex"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((o) => !o)}
          >
            <span className={`block h-px w-4 bg-dark transition-transform dark:bg-light ${isOpen ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`block h-px w-4 bg-dark transition-transform dark:bg-light ${isOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-2 hidden max-w-6xl flex-col rounded-3xl border border-dark/10 bg-light/95 p-3 backdrop-blur-md dark:border-light/10 dark:bg-dark/95 lg:flex"
          >
            {LINKS.map(({ href, title }, i) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium ${
                  isActive(path, href) ? "bg-dark/[0.06] dark:bg-light/[0.08]" : ""
                }`}
              >
                {title}
                <span className="font-mono text-xs text-dark/40 dark:text-light/40">0{i + 1}</span>
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-3 border-t border-dark/10 px-4 pt-4 dark:border-light/10">
              <a href="/engr-john-rhunor-resume.pdf" download className="flex-1 rounded-full bg-dark py-2.5 text-center text-sm font-medium text-light dark:bg-light dark:text-dark">
                Download résumé
              </a>
              <a href="https://github.com/rhunor" target="_blank" rel="noopener noreferrer" className="w-7" aria-label="GitHub">
                <GithubIcon />
              </a>
              <a href="https://www.linkedin.com/in/john-rhunor-ighoshemu-7979a8214" target="_blank" rel="noopener noreferrer" className="w-7 rounded-full bg-light" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
