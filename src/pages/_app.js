import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { DM_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", weight: ["300", "400", "500", "600", "700"] });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", weight: ["400", "500", "600", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });

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
        <Navbar />
        <AnimatePresence initial={false} mode="wait">
          <Component key={router.asPath} {...pageProps} />
        </AnimatePresence>
        <Footer />
      </div>
    </>
  );
}
