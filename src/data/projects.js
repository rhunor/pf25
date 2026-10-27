// Single source of truth for every project shown on the site. The projects index, the home
// page's "selected work" and each /projects/[slug] case study all read from here.

import reallow from "/public/images/projects/reallow.png";
import primetrex from "/public/images/projects/primetrex.png";
import oliveHausSite from "/public/images/projects/olivehauswebsite.png";
import oliveHausPMA from "/public/images/projects/olivehauspma1.png";
import pma1 from "/public/images/projects/olivehauspma.png";
import pma2 from "/public/images/projects/olivehauspma2.png";
import pma3 from "/public/images/projects/olivehauspma3.png";
import averisWebsite from "/public/images/projects/averiswebsite1.png";
import averisAffiliate from "/public/images/projects/averisaffiliate1.png";
import gha from "/public/images/projects/gha.png";

// `category` drives the filter on /projects: "platform" = full-stack product, "website" = marketing/content site.
export const projects = [
  {
    slug: "reallow",
    title: "Reallow",
    tagline: "Direct landlord-to-tenant real estate platform for Nigeria",
    category: "platform",
    type: "Full-stack platform",
    year: "2026",
    role: "CTO & Head of Technology: architecture, backend, frontend",
    url: "https://reallow.co",
    urlLabel: "reallow.co",
    privateRepo: true,
    image: reallow,
    stack: ["Next.js 16", "React 19", "TypeScript", "MongoDB", "Auth.js", "Paystack", "Cloudinary", "MapLibre", "Tailwind v4"],
    summary:
      "A rent-and-buy platform that removes the traditional agent. Tenants browse verified listings, apply, book inspections, sign and pay, with every naira shown upfront. Live in Abuja, Port Harcourt and Warri.",
    metrics: [
      { value: "26k+", label: "lines of TypeScript" },
      { value: "5", label: "user roles" },
      { value: "6", label: "languages" },
    ],
    overview: [
      "Renting in Nigeria usually means paying an agent's fee to reach a landlord you can't verify. Reallow cuts that out. Every listing is physically inspected by Reallow staff before it goes live, and all coordination between tenants and landlords runs through the platform. There is deliberately no peer-to-peer chat.",
      "I designed and built the whole product: the listing pipeline (draft → paid verification → field inspection → admin approval → published), tenancy agreements with e-signatures, escrow-style rent and deposit payments, identity verification, and separate dashboards for tenants, landlords, admins, support and field staff.",
    ],
    highlights: [
      "Role-based access for 5 roles via Auth.js v5, with an edge-safe config gating every dashboard route.",
      "Paystack payments that settle into Reallow's account, with idempotent webhooks guarding against duplicate delivery.",
      "E-signatures for tenancy agreements: a SHA-256 hash, timestamp and IP audit trail for each signer.",
      "NIN identity verification that unlocks a verified badge, enforced server-side before landlords can list or tenants can book.",
      "Geofenced field-inspection check-in that flags staff who check in more than 500 m from the listing (haversine).",
      "MapLibre map search with automatic geocoding, plus saved-search alerts when a matching listing is approved.",
      "Wallet with atomic conditional debits, so concurrent payments can't spend the same naira twice.",
      "Translated into English, Hausa, Igbo, Yoruba, Pidgin and Urhobo.",
    ],
  },
  {
    slug: "primetrex",
    title: "Primetrex Affiliate System",
    tagline: "Affiliate platform for a copy trading service",
    category: "platform",
    type: "Full-stack web application",
    role: "Full-stack developer",
    url: "https://primetrexaffiliates.com/",
    urlLabel: "primetrexaffiliates.com",
    github: "https://github.com/rhunor/Primetrex",
    image: primetrex,
    stack: ["Next.js", "Telegram Bot API", "Payment integration"],
    summary:
      "A full-stack affiliate platform where users earn commission by referring subscribers to Primetrex's copy trading program, through a simple onboarding flow and dashboard.",
    overview: [
      "Primetrex is a full-stack affiliate platform built for a professional copy trading service. The platform enables users to earn commissions by referring new subscribers to Primetrex's copy trading program through a seamless onboarding flow and intuitive dashboard.",
      "The project brings together several third-party APIs, automated messaging and payment processing in one end-to-end application.",
    ],
    highlights: [
      "Telegram bot integration for real-time notifications and automated user engagement.",
      "Referral tracking from signup through to commission.",
      "Secure payment gateway integration for processing referral payouts.",
    ],
  },
  {
    slug: "averis-academy-affiliate",
    title: "Averis Academy Platform",
    tagline: "Affiliate & learning management platform",
    category: "platform",
    type: "Full-stack application",
    role: "Full-stack developer",
    url: "https://averisacademy.com",
    urlLabel: "averisacademy.com",
    github: "https://github.com/rhunor/averisaffiliate",
    image: averisAffiliate,
    stack: ["Next.js", "TypeScript", "MongoDB", "NextAuth", "GrammyJS", "Cloudinary", "Recharts"],
    summary:
      "Enrollment, affiliate referral tracking, course delivery and payment verification for Averis Academy, all in one application.",
    overview: [
      "A comprehensive full-stack affiliate and learning management platform for Averis Academy. The system handles student enrollment, affiliate referral tracking, course delivery, and payment verification, all within a single cohesive application.",
    ],
    highlights: [
      "Secure authentication with NextAuth and MongoDB.",
      "Telegram bot (GrammyJS) for automated student notifications and onboarding.",
      "Recharts analytics dashboards for revenue, enrollments and affiliate performance in real time.",
      "Cloudinary for course media, reCAPTCHA-protected registration and QR codes for referral links.",
    ],
  },
  {
    slug: "olivehaus-daily-manager",
    title: "OliveHaus Daily Manager",
    tagline: "Real-time client project management platform",
    category: "platform",
    type: "Full-stack application",
    role: "Full-stack developer",
    url: "https://olivehausdailymanager.com/",
    urlLabel: "olivehausdailymanager.com",
    github: "https://github.com/rhunor/oliehauspma",
    image: oliveHausPMA,
    gallery: [pma1, pma2, pma3],
    stack: ["Next.js", "TypeScript", "Realtime"],
    summary:
      "OliveHaus clients log in to follow project progress live, submit feedback, request changes and message their project manager.",
    overview: [
      "A full-stack project management platform built for OliveHaus clients. Users can securely log in, monitor project progress in real time, submit feedback, request changes, and communicate directly with project managers through an integrated messaging system.",
      "It was built around how OliveHaus's clients and project teams actually work together, and to scale as the client base grows.",
    ],
    highlights: [
      "Secure client authentication and per-client project views.",
      "Real-time progress tracking.",
      "Feedback and change-request workflows.",
      "Integrated messaging between clients and project managers.",
    ],
  },
  {
    slug: "olivehaus-website",
    title: "OliveHaus Interiors",
    tagline: "Website + CMS for a Lagos interior design studio",
    category: "website",
    type: "Full-stack website",
    role: "Full-stack developer",
    url: "https://www.olivehausinteriors.com/",
    urlLabel: "olivehausinteriors.com",
    github: "https://github.com/rhunor/oliehauswebsite",
    image: oliveHausSite,
    stack: ["Next.js", "TypeScript", "MongoDB", "Cloudinary"],
    summary:
      "A portfolio website for OliveHaus Interiors, a Lagos-based interior design studio, with a custom admin dashboard for managing projects and blog posts.",
    overview: [
      "A modern full-stack website built for OliveHaus Interiors, a Lagos-based interior design company. The platform showcases beautiful project galleries, rich animations, and a professional aesthetic.",
    ],
    highlights: [
      "Custom admin dashboard so the team can upload projects and manage blogs without a developer.",
      "MongoDB-backed dynamic content.",
      "Cloudinary for optimised image storage and delivery.",
    ],
  },
  {
    slug: "averis-academy-website",
    title: "Averis Academy Website",
    tagline: "Marketing & landing website",
    category: "website",
    type: "Web development",
    role: "Frontend developer",
    url: "https://averishq.com",
    urlLabel: "averishq.com",
    github: "https://github.com/rhunor/averiswebsite",
    image: averisWebsite,
    stack: ["Next.js", "TypeScript", "Framer Motion", "Lenis", "Tailwind CSS"],
    summary:
      "A fast, animated marketing site that presents the academy's courses and programs and turns visitors into enrolled students.",
    overview: [
      "Averis Academy's marketing website is a high-performance landing platform designed to showcase the academy's courses, programs, and brand identity. Built with Next.js and TypeScript, the site delivers a fast and polished experience that converts visitors into enrolled students.",
    ],
    highlights: [
      "Smooth scrolling with Lenis and UI transitions with Framer Motion.",
      "Hero, about, services, proof-of-results and call-to-action sections.",
      "Responsive Tailwind CSS layout that works on every screen size.",
    ],
  },
  {
    slug: "giftedhomes",
    title: "Gifted Homes & Apartments",
    tagline: "Real estate listings website",
    category: "website",
    type: "Design & development",
    role: "Designer & developer",
    url: "https://www.giftedhomesandapartments.com/",
    urlLabel: "giftedhomesandapartments.com",
    github: "https://github.com/rhunor/GHA1",
    image: gha,
    stack: ["Next.js", "React", "MongoDB", "Tailwind CSS"],
    summary:
      "A real estate website for browsing property listings, viewing details and connecting with agents.",
    overview: [
      "Gifted Homes and Apartments is a real estate website designed to provide users with a seamless experience in exploring property listings, viewing details, and connecting with real estate agents. The platform is built with modern web technologies to ensure responsiveness and user-friendliness.",
    ],
    highlights: [
      "Content, web design, UX/UI and development, all done in-house.",
      "Listing and property detail views.",
      "Fully responsive layout.",
    ],
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
