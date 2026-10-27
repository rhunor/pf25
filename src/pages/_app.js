import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ResumeProvider } from "@/components/ResumeModal";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import localFont from "next/font/local";
import Head from "next/head";
import { useRouter } from "next/router";

// Self-hosted variable fonts (latin subset from Google Fonts). Fetching from Google at build
// time broke Vercel builds when it served extension-less font URLs next/font couldn't parse.
const dmSans = localFont({ src: "../fonts/dm-sans-latin.woff2", variable: "--font-dm-sans", weight: "300 700", display: "swap" });
const grotesk = localFont({ src: "../fonts/space-grotesk-latin.woff2", variable: "--font-grotesk", weight: "400 700", display: "swap" });
const mono = localFont({ src: "../fonts/jetbrains-mono-latin.woff2", variable: "--font-mono", weight: "400 500", display: "swap" });

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${dmSans.variable} ${grotesk.variable} ${mono.variable} font-mont bg-light text-dark dark:bg-dark dark:text-light w-full min-h-screen h-full`}
      >
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-dark focus:px-4 focus:py-2 focus:text-light"
        >
          Skip to content
        </a>
        <ResumeProvider>
          <Navbar />
          <AnimatePresence initial={false} mode="wait">
            <Component key={router.asPath} {...pageProps} />
          </AnimatePresence>
          <Footer />
        </ResumeProvider>
      </div>
    </>
  );
}
