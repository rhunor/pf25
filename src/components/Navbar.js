import Link from "next/link";
import React, { useState } from "react";
import Logo from "./Logo";
import { useRouter } from "next/router";
import {
  GithubIcon,
  LinkedInIcon,
  ResumeIcon,
  MoonIcon,
  SunIcon,
} from "./Icons";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeSwitch } from "./Hooks/useThemeSwitch";

const CustomLink = ({ href, title }) => {
  const router = useRouter();

  return (
    <Link
      href={href}
      className="relative group text-sm font-medium tracking-wide uppercase
        text-dark dark:text-light transition-colors duration-200"
    >
      {title}
      <span
        className={`
          absolute left-0 -bottom-0.5 h-[1px] bg-primary dark:bg-primaryDark
          transition-[width] ease duration-300
          ${router.asPath === href ? "w-full" : "w-0"}
          group-hover:w-full
        `}
      >
        &nbsp;
      </span>
    </Link>
  );
};

const CustomMobileLink = ({ href, title, toggle }) => {
  const router = useRouter();

  const handleClick = () => {
    toggle();
    router.push(href);
  };

  return (
    <button
      className="relative group text-base font-medium tracking-widest uppercase
        text-light dark:text-dark transition-colors duration-200 py-1"
      onClick={handleClick}
    >
      {title}
      <span
        className={`
          absolute left-0 -bottom-0.5 h-[1px] bg-primaryDark
          transition-[width] ease duration-300
          ${router.asPath === href ? "w-full" : "w-0"}
          group-hover:w-full
        `}
      >
        &nbsp;
      </span>
    </button>
  );
};

const Navbar = () => {
  const [mode, setMode] = useThemeSwitch();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header
        className="w-full sticky top-0 z-40
          flex items-center justify-between px-32 py-4 font-medium
          bg-light/90 dark:bg-dark/90 backdrop-blur-sm
          border-b border-dark/8 dark:border-light/8
          xl:px-24 lg:px-16 md:px-12 sm:px-8
        "
      >
        {/* Hamburger — mobile/tablet only */}
        <button
          type="button"
          className="flex-col items-center justify-center hidden lg:flex"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={handleClick}
        >
          <span
            className={`bg-dark dark:bg-light block h-0.5 w-6 rounded-sm transition-all duration-300 ease-out ${
              isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
            }`}
          />
          <span
            className={`bg-dark dark:bg-light block h-0.5 w-6 rounded-sm transition-all duration-300 ease-out my-0.5 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`bg-dark dark:bg-light block h-0.5 w-6 rounded-sm transition-all duration-300 ease-out ${
              isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
            }`}
          />
        </button>

        {/* Desktop nav — hidden on lg and below */}
        <div className="w-full flex justify-between items-center lg:hidden">
          <nav className="flex items-center gap-8">
            <CustomLink href="/" title="Home" />
            <CustomLink href="/about" title="About" />
            <CustomLink href="/projects" title="Projects" />
            <CustomLink href="/contact" title="Contact" />
          </nav>

          <nav className="flex items-center gap-4">
            <motion.a
              target="_blank"
              rel="noopener noreferrer"
              className="w-6"
              href="https://github.com/rhunor"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Visit my GitHub profile"
            >
              <GithubIcon />
            </motion.a>

            <motion.a
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 bg-light rounded-full"
              href="https://www.linkedin.com/in/john-rhunor-ighoshemu-7979a8214"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Visit my LinkedIn profile"
            >
              <LinkedInIcon />
            </motion.a>

            <motion.a
              href="/engr-john-rhunor-resume.pdf"
              download
              className="w-6"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Download my resume as PDF"
              title="Download Resume"
            >
              <ResumeIcon />
            </motion.a>

            <button
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              className={`w-7 h-7 ml-1 flex items-center justify-center rounded-full p-1
                ${mode === "light" ? "bg-dark text-light" : "bg-light text-dark"}
              `}
              aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
            >
              {mode === "light" ? (
                <SunIcon className="fill-dark" />
              ) : (
                <MoonIcon className="fill-dark" />
              )}
            </button>
          </nav>
        </div>

        {/* Logo — centered absolutely */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Logo />
        </div>

        {/* Mobile right side: theme toggle only */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            className={`w-7 h-7 flex items-center justify-center rounded-full p-1
              ${mode === "light" ? "bg-dark text-light" : "bg-light text-dark"}
            `}
            aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
          >
            {mode === "light" ? (
              <SunIcon className="fill-dark" />
            ) : (
              <MoonIcon className="fill-dark" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu — full-screen overlay, outside header so it doesn't inherit sticky */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center
              bg-dark/95 dark:bg-light/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Close button */}
            <button
              onClick={handleClick}
              className="absolute top-6 right-8 text-light dark:text-dark"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <nav className="flex flex-col items-center gap-8 mb-12">
              <CustomMobileLink toggle={handleClick} href="/" title="Home" />
              <CustomMobileLink toggle={handleClick} href="/about" title="About" />
              <CustomMobileLink toggle={handleClick} href="/projects" title="Projects" />
              <CustomMobileLink toggle={handleClick} href="/contact" title="Contact" />
            </nav>

            <nav className="flex items-center gap-6">
              <motion.a
                target="_blank"
                rel="noopener noreferrer"
                className="w-7"
                href="https://github.com/rhunor"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Visit my GitHub profile"
              >
                <GithubIcon />
              </motion.a>

              <motion.a
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 bg-light rounded-full"
                href="https://www.linkedin.com/in/john-rhunor-ighoshemu-7979a8214"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Visit my LinkedIn profile"
              >
                <LinkedInIcon />
              </motion.a>

              <motion.a
                href="/engr-john-rhunor-resume.pdf"
                download
                className="w-7"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Download my resume as PDF"
                title="Download Resume"
              >
                <ResumeIcon />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
