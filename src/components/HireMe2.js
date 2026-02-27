import Link from "next/link";
import React from "react";

export const HireMe2 = () => {
  return (
    <div className="fixed left-4 bottom-4 z-10 md:hidden">
      <div className="relative flex items-center justify-center w-36 h-36">

        {/* Spinning SVG circular text */}
        <svg
          viewBox="0 0 150 150"
          className="animate-spin-slow absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <path
              id="hireMeCircle2"
              d="M 75,75 m -58,0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0"
            />
          </defs>
          <text
            className="fill-dark dark:fill-light"
            style={{ fontSize: "11px", fontFamily: "var(--font-dm-sans)", letterSpacing: "0.08em", fontWeight: 500 }}
          >
            <textPath href="#hireMeCircle2" textLength="364">
              HIRE ME • GET IN TOUCH • LET'S WORK •{" "}
            </textPath>
          </text>
        </svg>

        {/* Center button */}
        <Link
          href="/contact"
          aria-label="Contact me — visit the contact page"
          className="flex items-center justify-center w-14 h-14 rounded-full text-[12px] font-semibold
            bg-primary text-light border-2 border-solid border-primary
            hover:bg-transparent hover:text-primary
            dark:bg-primaryDark dark:text-dark dark:border-primaryDark
            dark:hover:bg-transparent dark:hover:text-primaryDark
            transition-colors duration-200 z-10"
        >
          Hire Me
        </Link>
      </div>
    </div>
  );
};
