import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import { Arrow, Eyebrow, Reveal, StatusPill } from "@/components/ui";
import { CONTACT, SOCIAL } from "@/data/social";
import { ResumeButton } from "@/components/ResumeModal";
import TransitionEffect from "@/components/TransitionEffect";

const MAILTO = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Hello from your portfolio")}`;
const WHATSAPP = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hi Rhunor, I found you through your portfolio.")}`;

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3.5 7l8.5 6 8.5-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 01-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36a9.42 9.42 0 01-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.37 9.37 0 012.76 6.68c0 5.2-4.24 9.44-9.45 9.44zm8.04-17.48A11.3 11.3 0 0012.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.7l6.1-1.6a11.33 11.33 0 005.43 1.38h.01c6.26 0 11.36-5.1 11.37-11.37 0-3.03-1.18-5.89-3.33-8.03z" />
  </svg>
);

// One big tappable card per direct channel.
const ChannelCard = ({ index, href, external, icon, label, title, value, hint, children }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-dark/10 bg-light p-6 transition-colors duration-300 hover:border-dark/30 dark:border-light/10 dark:bg-dark dark:hover:border-light/30 sm:p-5">
    <div className="flex items-start justify-between gap-4">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-dark/[0.05] text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-light dark:bg-light/[0.06] dark:text-primaryDark dark:group-hover:bg-primaryDark dark:group-hover:text-dark">
        {icon}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-wider text-dark/40 dark:text-light/40">
        {index} / {label}
      </span>
    </div>
    <p className="mt-6 font-heading text-2xl font-semibold tracking-tight">
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="after:absolute after:inset-0 focus-visible:outline-none"
      >
        {title}
      </a>
    </p>
    <p className="mt-1 break-all text-[15px] text-dark/75 dark:text-light/75">{value}</p>
    <div className="mt-6 flex items-center justify-between gap-3">
      <span className="font-mono text-[11px] leading-snug text-dark/45 dark:text-light/45">{hint}</span>
      <span className="flex items-center gap-2">
        {children}
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-dark/15 transition-colors duration-300 group-hover:border-dark group-hover:bg-dark group-hover:text-light dark:border-light/15 dark:group-hover:border-light dark:group-hover:bg-light dark:group-hover:text-dark">
          <Arrow />
        </span>
      </span>
    </div>
  </div>
);

const CopyEmail = () => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(CONTACT.email);
          setCopied(true);
        } catch {
          window.location.href = MAILTO;
        }
      }}
      className="relative z-10 whitespace-nowrap rounded-full border border-dark/15 px-3.5 py-2 font-mono text-[11px] transition-colors hover:border-dark dark:border-light/15 dark:hover:border-light"
      aria-live="polite"
    >
      {copied ? "Copied ✓" : "Copy address"}
    </button>
  );
};

const CHANNELS = [
  { label: "LinkedIn", value: "john-rhunor", href: SOCIAL.linkedin },
  { label: "X", value: "@rhunorr", href: SOCIAL.x },
  { label: "GitHub", value: "@rhunor", href: SOCIAL.github },
  { label: "Résumé", value: "View or download", resume: true },
];

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact | John Rhunor</title>
        <meta name="description" content="Get in touch with John Rhunor by email or WhatsApp about roles, freelance projects or collaborations." />
      </Head>

      <TransitionEffect />
      <main id="content">
        <section className="relative -mt-[76px] overflow-hidden pt-[76px]">
          <div className="blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
          <Layout className="relative grid grid-cols-12 gap-14 pt-20 lg:flex lg:flex-col lg:gap-10 md:pt-12">
            <Reveal className="col-span-5 lg:col-span-12">
              <Eyebrow index="01">Contact</Eyebrow>
              <h1 className="mt-4 font-heading text-5xl font-semibold leading-[1.06] tracking-tight lg:text-4xl">
                Let&apos;s build something <span className="text-primary dark:text-primaryDark">solid.</span>
              </h1>
              <p className="mt-5 text-[17px] leading-relaxed text-dark/70 dark:text-light/70">
                My inbox is always open. Whether for a question, opportunity, collaboration, or just to say hi, feel free to reach out.
              </p>
              <div className="mt-6">
                <StatusPill />
              </div>

              <ul className="mt-10 divide-y divide-dark/10 border-y border-dark/10 dark:divide-light/10 dark:border-light/10">
                {CHANNELS.map((c) => {
                  const inner = (
                    <>
                      <span className="font-mono text-xs uppercase tracking-wider text-dark/50 dark:text-light/50">{c.label}</span>
                      <span className="flex items-center gap-2 text-[15px] transition-colors group-hover:text-primary dark:group-hover:text-primaryDark">
                        {c.value} <Arrow />
                      </span>
                    </>
                  );
                  const cls = "group flex w-full items-center justify-between py-4";
                  return (
                    <li key={c.label}>
                      {c.resume ? (
                        <ResumeButton className={cls}>{inner}</ResumeButton>
                      ) : (
                        <a href={c.href} target="_blank" rel="noopener noreferrer" className={cls}>
                          {inner}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="col-span-7 lg:col-span-12">
              <div className="corner-ticks rounded-2xl border border-dark/10 bg-paper p-8 dark:border-light/10 dark:bg-ink sm:p-4">
                <p className="font-mono text-[11px] uppercase tracking-wider text-dark/45 dark:text-light/45">Reach me directly</p>
                <div className="mt-4 grid grid-cols-1 gap-4">
                  <ChannelCard
                    index="01"
                    label="Email"
                    href={MAILTO}
                    icon={<MailIcon />}
                    title="Send me an email"
                    value={CONTACT.email}
                    hint="Replies within 1–2 days"
                  >
                    <CopyEmail />
                  </ChannelCard>
                  <ChannelCard
                    index="02"
                    label="WhatsApp"
                    href={WHATSAPP}
                    external
                    icon={<WhatsAppIcon />}
                    title="Chat on WhatsApp"
                    value={CONTACT.whatsappDisplay}
                    hint="Opens WhatsApp · WAT (UTC+1)"
                  />
                </div>
              </div>
            </Reveal>
          </Layout>
        </section>
      </main>
    </>
  );
}
