import Link from "next/link";
import React from "react";

// Wordmark with a benzene-ring mark: a hexagon with the aromatic inner circle.
const Logo = () => {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="John Rhunor, home">
      <svg viewBox="0 0 32 32" className="h-7 w-7 text-dark transition-transform duration-500 group-hover:rotate-[60deg] dark:text-light" aria-hidden="true">
        <path d="M16 3l11.26 6.5v13L16 29 4.74 22.5v-13z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="16" cy="16" r="5.2" fill="none" className="stroke-primary dark:stroke-primaryDark" strokeWidth="2" />
      </svg>
      <span className="font-heading text-[17px] font-semibold tracking-tight">
        rhunor<span className="text-primary dark:text-primaryDark">.</span>
      </span>
    </Link>
  );
};

export default Logo;
