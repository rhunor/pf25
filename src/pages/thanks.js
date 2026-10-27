import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
import Head from "next/head";
import React from "react";
import { Button, Eyebrow } from "@/components/ui";

const Thanks = () => {
  return (
    <>
      <Head>
        <title>Thank you | John Rhunor</title>
        <meta name="robots" content="noindex" />
      </Head>
      <TransitionEffect />
      <main id="content" className="relative -mt-[76px] overflow-hidden pt-[76px]">
        <div className="blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
        <Layout className="relative flex min-h-[70vh] flex-col items-center justify-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <Eyebrow className="mt-6">Message received</Eyebrow>
          <h1 className="mt-3 font-heading text-5xl font-semibold tracking-tight sm:text-4xl">Thank you. I&apos;ll be in touch.</h1>
          <p className="mt-4 max-w-md text-dark/65 dark:text-light/65">I usually reply within 1–2 days.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/projects">Browse projects</Button>
            <Button href="/" variant="secondary">
              Back to home
            </Button>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default Thanks;
