import { useState, useRef, useCallback } from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import { Arrow, Eyebrow, Reveal, StatusPill } from "@/components/ui";
import { SOCIAL } from "@/data/social";
import TransitionEffect from "@/components/TransitionEffect";
import { useRouter } from "next/router";
import emailjs from "@emailjs/browser";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

function ContactForm() {
  const router = useRouter();
  const formRef = useRef(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setStatus("idle");
      setErrorMsg("");

      if (!executeRecaptcha) {
        setStatus("error");
        setErrorMsg("reCAPTCHA not ready yet — please wait a moment and try again.");
        setLoading(false);
        return;
      }

      try {
        const token = await executeRecaptcha("contact_form");

        // Verify token server-side
        const verifyRes = await fetch("/api/verify-recaptcha", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const verifyData = await verifyRes.json();

        if (!verifyData.success) {
          throw new Error("reCAPTCHA verification failed — please try again.");
        }

        const templateParams = {
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          to_name: "John Rhunor",
          message: formData.message.trim(),
          "g-recaptcha-response": token,
        };

        const response = await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          templateParams,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        );

        if (response.status === 200) {
          setStatus("success");
          setFormData({ name: "", email: "", message: "" });
          setTimeout(() => router.push("/thanks"), 1800);
        } else {
          throw new Error("Failed to send message");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
        setErrorMsg(err.message || "Something went wrong — please try again.");
      } finally {
        setLoading(false);
      }
    },
    [executeRecaptcha, formData, router]
  );

  const field =
    "w-full rounded-xl border border-dark/15 bg-light px-4 py-3 text-[15px] text-dark transition-colors placeholder:text-dark/35 focus:border-primary dark:border-light/15 dark:bg-dark dark:text-light dark:placeholder:text-light/35 dark:focus:border-primaryDark";
  const label = "mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-dark/55 dark:text-light/55";

  return (
    <form ref={formRef} name="contact-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-1">
        <div>
          <label htmlFor="name" className={label}>
            Name
          </label>
          <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required autoComplete="name" placeholder="Jane Doe" className={field} />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" placeholder="jane@company.com" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder="A role, a project, or a question…"
          className={`${field} resize-y`}
        />
      </div>

      <div aria-live="polite">
        {status === "error" && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-400">{errorMsg}</p>
        )}
        {status === "success" && (
          <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-400">
            Message sent. Redirecting…
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-stretch">
        <p className="font-mono text-[11px] text-dark/45 dark:text-light/45">Protected by reCAPTCHA</p>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-dark px-6 py-3 text-sm font-medium text-light transition-colors hover:bg-primary disabled:opacity-60 dark:bg-light dark:text-dark dark:hover:bg-primaryDark"
        >
          {loading ? "Sending…" : "Send message"}
          {!loading && <Arrow />}
        </button>
      </div>
    </form>
  );
}

const CHANNELS = [
  { label: "LinkedIn", value: "john-rhunor", href: SOCIAL.linkedin },
  { label: "X", value: "@rhunorr", href: SOCIAL.x },
  { label: "GitHub", value: "@rhunor", href: SOCIAL.github },
  { label: "Résumé", value: "Download PDF", href: "/engr-john-rhunor-resume.pdf", download: true },
];

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact | John Rhunor</title>
        <meta name="description" content="Get in touch with John Rhunor about roles, freelance projects or collaborations." />
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
                {CHANNELS.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      download={c.download}
                      target={c.download ? undefined : "_blank"}
                      rel={c.download ? undefined : "noopener noreferrer"}
                      className="group flex items-center justify-between py-4"
                    >
                      <span className="font-mono text-xs uppercase tracking-wider text-dark/50 dark:text-light/50">{c.label}</span>
                      <span className="flex items-center gap-2 text-[15px] transition-colors group-hover:text-primary dark:group-hover:text-primaryDark">
                        {c.value} <Arrow />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[11px] text-dark/45 dark:text-light/45">Usually replies within 1–2 days · WAT (UTC+1)</p>
            </Reveal>

            <Reveal delay={0.1} className="col-span-7 lg:col-span-12">
              <div className="corner-ticks rounded-2xl border border-dark/10 bg-paper p-8 dark:border-light/10 dark:bg-ink sm:p-5">
                <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
                  <ContactForm />
                </GoogleReCaptchaProvider>
              </div>
            </Reveal>
          </Layout>
        </section>
      </main>
    </>
  );
}
