// Single source of truth for every project shown on the site. The projects index, the home
// page's "selected work" and each /projects/[slug] case study all read from here.

import reallow from "/public/images/projects/reallow.png";
import dealRadar from "/public/images/projects/fintech-deal-radar.png";
import profitex from "/public/images/projects/profitex.png";
import primetrex from "/public/images/projects/primetrex.png";
import oliveHausSite from "/public/images/projects/olivehauswebsite.png";
import oliveHausPMA from "/public/images/projects/olivehauspma1.png";
import pma1 from "/public/images/projects/olivehauspma.png";
import pma2 from "/public/images/projects/olivehauspma2.png";
import pma3 from "/public/images/projects/olivehauspma3.png";
import averisWebsite from "/public/images/projects/averiswebsite1.png";
import averisAffiliate from "/public/images/projects/averisaffiliate1.png";
import gha from "/public/images/projects/gha.png";

// `category` drives the filter on /projects: "platform" = full-stack product, "automation" = bot / agent,
// "website" = marketing/content site.
export const projects = [
  {
    slug: "reallow",
    title: "Reallow",
    featured: true, // the wide lead card with the "Latest" tag, on home and /projects
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
    slug: "fintech-deal-radar",
    title: "Fintech Deal Radar",
    tagline: "AI news agent for US & Canadian fintech deals, on Telegram",
    category: "automation",
    type: "Telegram bot · AI agent",
    year: "2026",
    role: "Sole engineer, built for a Canadian client",
    github: "https://github.com/rhunor/fintechradarfinder",
    image: dealRadar,
    stack: ["Next.js 16", "TypeScript", "MongoDB", "Google Gemini", "grammY", "Vercel", "Vitest"],
    summary:
      "A monitoring agent built for a Canadian client. It watches 40+ newswire, regulatory and fintech press feeds, uses AI to pick out US and Canadian fintech funding rounds and acquisitions, and posts them to Telegram within minutes, at zero running cost.",
    metrics: [
      { value: "40+", label: "news feeds" },
      { value: "211", label: "automated tests" },
      { value: "$0", label: "monthly running cost" },
    ],
    overview: [
      "The client needed to hear about fintech deals as they happen without reading dozens of news sites. Fintech Deal Radar polls official RSS and Atom feeds every minute (PR Newswire, GlobeNewswire, SEC EDGAR filings, TechCrunch, BetaKit, Financial Post and more), filters out everything that isn't a tracked event, and sends a formatted alert to a Telegram channel.",
      "The hard constraint was cost: it runs entirely on free tiers (Vercel Hobby, MongoDB Atlas M0 and Gemini). Every stage is deadline-aware and metered, so the system projects its own monthly usage and warns before it gets near a limit.",
    ],
    highlights: [
      "Serverless poll cycle triggered every minute: the route answers in about 10 ms and finishes the work in the background, behind a lease so cycles never overlap.",
      "Conditional GET (ETag / Last-Modified) on every feed, with a body-hash fallback, so most cycles skip parsing entirely.",
      "A cheap keyword prefilter in front of the AI, then one batched Gemini call per cycle with a hard deadline and resilient JSON parsing.",
      "Six event types (funding, acquisition, launch, expansion, rebrand, partnership), each with its own confidence threshold and repeat window.",
      "Exactly-once alerts: unique indexes on URL and title hashes plus an atomic claim, so a deal is never sent twice even when several wires report it.",
      "Graceful degradation: switches to a second model at the daily quota, and keeps keyword-only matches out of the public channel, labelled as unverified.",
      "Meters CPU and wall-clock time against Vercel's free limits and sends a Telegram warning once usage is projected past 70%.",
      "Admin commands in Telegram (/status, /stats, /sources, /pause, /resume) and 211 tests, including a live AI classification test.",
    ],
  },
  {
    slug: "profitex",
    title: "Profitex Subscription Bot",
    tagline: "Automated paid-membership bot for a forex trading academy",
    category: "automation",
    type: "Telegram bot · Payments",
    year: "2026",
    role: "Sole engineer",
    privateRepo: true,
    image: profitex,
    stack: ["TypeScript", "Node.js", "grammY", "MongoDB", "Express", "Paystack", "Flutterwave", "Vercel"],
    summary:
      "Runs the whole paid-membership lifecycle for Profitable Forex Trading Academy's private Telegram community: payment, a single-use invite link, renewal reminders, and automatic removal when a subscription lapses.",
    metrics: [
      { value: "2", label: "payment gateways" },
      { value: "3", label: "renewal reminders" },
      { value: "60 min", label: "single-use invite links" },
    ],
    overview: [
      "Profitex sells access to a private Telegram community for its forex trading academy. A member picks a plan inside the bot, pays by card, bank transfer or USSD through Paystack or Flutterwave, and receives a private invite link the moment the payment is verified.",
      "From there the bot tracks every subscription: it reminds members before they expire, extends access when they renew early, and removes them automatically when they lapse. The academy's team runs everything (plans, members, broadcasts and manual grants) from an admin menu inside Telegram, with no web dashboard.",
    ],
    highlights: [
      "Every payment is confirmed by calling the gateway's API directly, never by trusting a redirect, a webhook body or a screenshot.",
      "Exactly-once fulfilment: retried webhooks, refreshed redirects and the \"I have paid\" button share one code path guarded by database-level locks, so a payment can only ever create one subscription.",
      "Signed webhooks from both gateways: HMAC-SHA512 for Paystack and verif-hash for Flutterwave.",
      "Single-use invite links (one member, 60-minute expiry), revoked as soon as a newer one is issued.",
      "Early renewals extend the end date instead of restarting it, and reset the reminder schedule.",
      "Reminders at 7 days, 3 days and 24 hours that land correctly even on a once-a-day cron, with time-budgeted, resumable passes that chain into fresh invocations when there's a backlog.",
      "Recovery for payments whose webhook never arrives, and a free-month trial for members of a partner community.",
      "Telegram admin console with member lists, payment history, plan management, throttled broadcasts and manual grant/revoke, covered by a smoke test and a full lifecycle integration test against an in-memory MongoDB.",
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
