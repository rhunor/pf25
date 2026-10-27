import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import preview from "/public/images/resume-preview.jpg";

// The résumé opens in a pop-up offering "view" or "download" instead of downloading on click.
// Any component can open it with `const openResume = useResume()`.

const RESUME_URL = "/engr-john-rhunor-resume.pdf";
const RESUME_FILE = "John-Rhunor-Ighoshemu-Resume.pdf";
const RESUME_META = "PDF · 2 pages · 152 KB";

const ResumeContext = createContext(() => {});
export const useResume = () => useContext(ResumeContext);

// Drop-in trigger; pass the same className you'd give a link or button.
export const ResumeButton = ({ children, className = "", ...rest }) => {
  const open = useResume();
  return (
    <button type="button" onClick={open} aria-haspopup="dialog" className={className} {...rest}>
      {children}
    </button>
  );
};

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M4 19h16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Option = ({ href, icon, title, hint, shortcut, download, primary, linkRef, onDone }) => (
  <a
    ref={linkRef}
    href={href}
    download={download}
    target={download ? undefined : "_blank"}
    rel={download ? undefined : "noopener noreferrer"}
    onClick={onDone}
    className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 ${
      primary
        ? "border-transparent bg-dark text-light hover:shadow-[0_16px_32px_-16px_rgba(155,118,64,0.7)] dark:bg-light dark:text-dark"
        : "border-dark/15 hover:border-dark/40 dark:border-light/15 dark:hover:border-light/40"
    }`}
  >
    {/* sheen sweeping across on hover */}
    <span
      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-[300%]"
      aria-hidden="true"
    />
    <span
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
        primary ? "bg-light/10 text-primaryDark dark:bg-dark/10 dark:text-primary" : "bg-dark/[0.05] text-primary dark:bg-light/[0.06] dark:text-primaryDark"
      }`}
    >
      {icon}
    </span>
    <span className="flex-1">
      <span className="block font-heading text-base font-semibold">{title}</span>
      <span className={`block text-sm ${primary ? "text-light/60 dark:text-dark/60" : "text-dark/55 dark:text-light/55"}`}>{hint}</span>
    </span>
    <kbd
      className={`rounded-md border px-2 py-0.5 font-mono text-[11px] sm:hidden ${
        primary ? "border-light/20 text-light/60 dark:border-dark/20 dark:text-dark/60" : "border-dark/15 text-dark/50 dark:border-light/15 dark:text-light/50"
      }`}
    >
      {shortcut}
    </kbd>
  </a>
);

const ResumeModal = ({ onClose }) => {
  const reduce = useReducedMotion();
  const firstRef = useRef(null);
  const panelRef = useRef(null);
  const viewRef = useRef(null);
  const downloadRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") return onClose();
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "v" || e.key === "V") viewRef.current?.click();
      if (e.key === "d" || e.key === "D") downloadRef.current?.click();
      // keep Tab cycling inside the dialog
      if (e.key === "Tab") {
        const nodes = panelRef.current.querySelectorAll("a[href], button");
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, [onClose]);

  // sheet follows the pointer a little, like holding a drawing up to the light
  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 });
  };

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center p-6 sm:items-end sm:p-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-dark/60 backdrop-blur-md" onClick={onClose} aria-hidden="true" />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
        initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="relative grid w-full max-w-4xl grid-cols-[1fr_1.1fr] overflow-hidden rounded-3xl border border-dark/10 bg-light shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] dark:border-light/10 dark:bg-dark md:grid-cols-1"
      >
        {/* ── Drawing-board side: the sheet ───────────────────── */}
        <div
          className="relative flex items-center justify-center overflow-hidden border-r border-dark/10 bg-paper px-10 py-12 dark:border-light/10 dark:bg-ink md:hidden"
          style={{ perspective: 1200 }}
          onPointerMove={onMove}
          onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        >
          <div className="blueprint absolute inset-0" aria-hidden="true" />
          {/* dimension line: sheet width */}
          <div className="absolute left-10 right-10 top-5 flex items-center gap-2 font-mono text-[10px] text-primary dark:text-primaryDark" aria-hidden="true">
            <span className="h-2 w-px bg-current" />
            <span className="h-px flex-1 bg-current opacity-50" />
            <span>A4 · 210 mm</span>
            <span className="h-px flex-1 bg-current opacity-50" />
            <span className="h-2 w-px bg-current" />
          </div>

          {/* a sheet stacked behind, for the 2-page feel */}
          <motion.div
            className="relative w-full max-w-[290px]"
            initial={reduce ? false : { y: 60, rotateX: 25, opacity: 0 }}
            animate={{ y: 0, rotateX: tilt.y * -6, rotateY: tilt.x * 8 - 10, rotateZ: -1.5, opacity: 1 }}
            transition={{ type: "spring", stiffness: 140, damping: 18, mass: 0.6 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute inset-0 rounded-md border border-dark/10 bg-white/80 dark:border-light/10 dark:bg-light/15"
              style={{ transform: "translate3d(10px, 9px, -30px) rotate(3deg)" }}
              aria-hidden="true"
            />
            <div className="corner-ticks relative overflow-hidden rounded-md bg-white shadow-[0_30px_60px_-20px_rgba(20,18,16,0.5)]">
              <Image src={preview} alt="Preview of the first page of John Rhunor's résumé" sizes="290px" className="h-auto w-full" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white via-white/70 to-transparent" aria-hidden="true" />
              {/* engineering drawing title block */}
              <div className="absolute bottom-2 right-2 grid grid-cols-2 border border-dark/60 bg-white font-mono text-[8px] uppercase leading-tight text-dark/80">
                <span className="col-span-2 border-b border-dark/60 px-1.5 py-0.5 font-semibold text-dark">J. R. Ighoshemu: CV</span>
                <span className="border-r border-dark/60 px-1.5 py-0.5">Dwg JR-CV-01</span>
                <span className="px-1.5 py-0.5">Sheet 1/2</span>
              </div>
            </div>
          </motion.div>

          <p className="absolute bottom-4 left-0 right-0 text-center font-mono text-[10px] text-dark/40 dark:text-light/40" aria-hidden="true">
            fig. CV: move cursor to inspect
          </p>
        </div>

        {/* ── Options side ─────────────────────────────────────── */}
        <div className="relative flex flex-col p-10 sm:p-6">
          <button
            ref={firstRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-dark/10 text-dark/60 transition-colors hover:border-dark/30 hover:text-dark dark:border-light/10 dark:text-light/60 dark:hover:border-light/30 dark:hover:text-light"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M3.5 3.5l9 9m0-9l-9 9" strokeLinecap="round" />
            </svg>
          </button>

          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary dark:text-primaryDark">
            <span className="text-dark/40 dark:text-light/40">Rev. 2026 — </span>Résumé
          </p>
          <h2 id="resume-title" className="mt-3 pr-10 font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-2xl">
            John Rhunor Ighoshemu
          </h2>
          <p className="mt-1 text-dark/60 dark:text-light/60">Full-stack engineer · Mechanical engineer · Oil &amp; chemical</p>

          <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-dark/10 bg-dark/10 font-mono text-[11px] dark:border-light/10 dark:bg-light/10">
            {[
              ["Format", "PDF"],
              ["Pages", "2"],
              ["Size", "152 KB"],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col-reverse bg-light px-3 py-2.5 dark:bg-dark">
                <dt className="uppercase tracking-wider text-dark/45 dark:text-light/45">{k}</dt>
                <dd className="text-sm text-dark dark:text-light">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-col gap-3">
            <Option
              linkRef={viewRef}
              href={RESUME_URL}
              icon={<EyeIcon />}
              title="View online"
              hint="Opens in a new tab"
              shortcut="V"
              primary
              onDone={onClose}
            />
            <Option
              linkRef={downloadRef}
              href={RESUME_URL}
              download={RESUME_FILE}
              icon={<DownloadIcon />}
              title="Download PDF"
              hint={RESUME_META}
              shortcut="D"
              onDone={onClose}
            />
          </div>

          <p className="mt-auto pt-6 font-mono text-[11px] text-dark/40 dark:text-light/40 sm:hidden">
            Press <kbd className="rounded border border-dark/15 px-1 dark:border-light/15">Esc</kbd> to close
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ResumeProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);
  return (
    <ResumeContext.Provider value={show}>
      {children}
      <AnimatePresence>{open && <ResumeModal onClose={hide} />}</AnimatePresence>
    </ResumeContext.Provider>
  );
};
