import Link from "next/link";
import React from "react";
import Layout from "./Layout";

const Footer = () => {
  return (
    <footer
      className="w-full border-t border-dark/10 dark:border-light/10
        font-mont text-sm dark:text-light"
    >
      <Layout className="py-8 flex flex-col items-center gap-5 text-center sm:py-6">

        {/* Quick nav */}
        <nav
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-dark/70 dark:text-light/70"
          aria-label="Footer navigation"
        >
          <Link href="/" className="hover:text-primary dark:hover:text-primaryDark transition-colors duration-200">
            Home
          </Link>
          <Link href="/about" className="hover:text-primary dark:hover:text-primaryDark transition-colors duration-200">
            About
          </Link>
          <Link href="/projects" className="hover:text-primary dark:hover:text-primaryDark transition-colors duration-200">
            Projects
          </Link>
          <Link href="/contact" className="hover:text-primary dark:hover:text-primaryDark transition-colors duration-200">
            Contact
          </Link>
        </nav>

        {/* External links */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <a
            href="https://github.com/rhunor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primaryDark transition-colors duration-200"
            aria-label="GitHub"
          >
            GitHub
          </a>
          <span className="text-dark/30 dark:text-light/30">/</span>
          <a
            href="https://www.linkedin.com/in/john-rhunor-ighoshemu-7979a8214"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primaryDark transition-colors duration-200"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
          <span className="text-dark/30 dark:text-light/30">/</span>
          <a
            href="/engr-john-rhunor-resume.pdf"
            download
            className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primaryDark transition-colors duration-200"
            aria-label="Download Resume"
          >
            Resume
          </a>
        </div>

        {/* Copyright */}
        <span className="text-dark/40 dark:text-light/40 text-xs tracking-wide">
          &copy; {new Date().getFullYear()} John Rhunor Ighoshemu. All rights reserved.
        </span>
      </Layout>
    </footer>
  );
};

export default Footer;
