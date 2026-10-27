import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
import Head from "next/head";
import dynamic from "next/dynamic";
import React from "react";
import { Button, Eyebrow } from "@/components/ui";

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

const NotFound = () => {
  return (
    <>
      <Head>
        <title>404: Page not found | John Rhunor</title>
      </Head>
      <TransitionEffect />
      <main id="content" className="relative -mt-[76px] overflow-hidden pt-[76px]">
        <div className="blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
        <Layout className="relative flex min-h-[70vh] flex-col items-center justify-center text-center">
          <div className="h-40 w-40">
            <Scene3D mesh="gear" speed={0.6} tilt={0.5} interactive label="Spinning gear" />
          </div>
          <Eyebrow className="mt-6">Error 404 · part not found</Eyebrow>
          <h1 className="mt-3 font-heading text-5xl font-semibold tracking-tight sm:text-4xl">This page isn&apos;t in the assembly.</h1>
          <p className="mt-4 max-w-md text-dark/65 dark:text-light/65">The link may be old, or the page was moved during the redesign.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/">Back to home</Button>
            <Button href="/projects" variant="secondary">
              View projects
            </Button>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default NotFound;
