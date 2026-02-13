import { useState, useRef, useCallback } from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import AnimatedText from "@/components/AnimatedText";
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

  return (
    <div className="grid w-full grid-cols-8 gap-16 lg:gap-12 md:grid-cols-1 md:gap-10">
      {/* Left side - intro text */}
      <div className="col-span-4 flex flex-col items-start justify-start md:col-span-8 md:order-1">
        <h2 className="mb-6 text-3xl font-bold capitalize text-primary dark:text-primaryDark font-heading md:text-2xl">
          What&apos;s Next?
        </h2>
        <p className="mb-4 text-lg leading-relaxed">
          My inbox is always open. Whether for a question, opportunity,
          collaboration, or just to say hi — feel free to reach out.
        </p>
        <p className="text-base text-dark/70 dark:text-light/70">
          Usually reply within 1-2 days.
        </p>
      </div>

      {/* Right side - form */}
      <div className="relative col-span-4 h-max md:col-span-8 md:order-2">
        <div className="rounded-2xl border border-solid border-dark bg-light p-8 shadow-lg dark:border-light dark:bg-dark xs:p-6">
          <form
            ref={formRef}
            name="contact-form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-light">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className="w-full rounded-md border border-dark/30 bg-light px-4 py-2.5 text-dark outline-none focus:border-primaryDark dark:border-light/30 dark:bg-dark dark:text-light dark:focus:border-primaryDark"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-light">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="w-full rounded-md border border-dark/30 bg-light px-4 py-2.5 text-dark outline-none focus:border-primaryDark dark:border-light/30 dark:bg-dark dark:text-light dark:focus:border-primaryDark"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-light">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full rounded-md border border-dark/30 bg-light px-4 py-2.5 text-dark outline-none focus:border-primaryDark dark:border-light/30 dark:bg-dark dark:text-light dark:focus:border-primaryDark"
              />
            </div>

            {status === "error" && (
              <p className="rounded-md bg-red-100 p-3 text-center text-red-700 dark:bg-red-900/30 dark:text-red-400">
                {errorMsg}
              </p>
            )}

            {status === "success" && (
              <p className="rounded-md bg-green-100 p-3 text-center text-green-700 dark:bg-green-900/30 dark:text-green-400">
                Message sent successfully! Redirecting...
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`mt-2 rounded-md border-2 border-dark px-8 py-3 font-semibold uppercase tracking-wide transition disabled:opacity-50 dark:border-light ${
                loading
                  ? "bg-dark/70 text-light dark:bg-light/70 dark:text-dark"
                  : "bg-dark text-light hover:bg-transparent hover:text-dark dark:bg-light dark:text-dark dark:hover:bg-transparent dark:hover:text-light"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact | John Rhunor</title>
        <meta name="description" content="Get in touch with John Rhunor" />
      </Head>

      <TransitionEffect />
      <main className="flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="Begin Today, I'm One Message Away"
            className="mb-16 !text-8xl !leading-tight lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
          />

          <div className="relative flex w-full flex-col items-center justify-center rounded-2xl rounded-br-2xl border border-solid border-dark bg-light p-8 shadow-2xl dark:border-light dark:bg-dark xs:p-4">
            <div className="absolute top-0 -right-5 -z-10 h-[103%] w-[101.5%] rounded-[2.5rem] rounded-br-3xl bg-dark dark:bg-light md:-right-2 md:w-[101%] xs:rounded-[1.5rem]" />

            <GoogleReCaptchaProvider
              reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            >
              <ContactForm />
            </GoogleReCaptchaProvider>
          </div>
        </Layout>
      </main>
    </>
  );
}
