import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import photo from "/public/images/profile/Rhunor.jpeg";
import render3d from "/public/images/profile/rhunor3d.jpg";

const FACES = [
  { key: "photo", label: "Photo", src: photo, alt: "Photo of John Rhunor Ighoshemu", priority: true, imgClass: "scale-[1.08]" },
  { key: "3d", label: "3D render", src: render3d, alt: "3D character render of John Rhunor Ighoshemu", imgClass: "" },
];

const INTERVAL_MS = 4500;

// Portrait that flips like a coin between the real photo and the 3D render. It alternates on its
// own, hovering shows the other side (and pauses the cycle), and tapping flips it on touch screens.
// Rhunor.jpeg is already a circle on black, so both faces share a circular mask and the photo is
// scaled up slightly to push its black ring out of view.
export default function FlipPortrait() {
  const reduce = useReducedMotion();
  const [base, setBase] = useState(0);
  const [hovered, setHovered] = useState(false);
  const shown = hovered ? 1 - base : base;

  useEffect(() => {
    if (reduce || hovered) return;
    const id = setInterval(() => {
      if (document.visibilityState === "visible") setBase((b) => 1 - b);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduce, hovered]);

  const other = FACES[1 - shown];

  return (
    <button
      type="button"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
      onClick={() => setBase((b) => 1 - b)}
      aria-label={`Show ${other.label.toLowerCase()}`}
      className="group relative block w-full cursor-pointer rounded-full"
      style={{ perspective: 1400 }}
    >
      <motion.div
        className="relative aspect-square w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={reduce ? undefined : { rotateY: shown * 180 }}
        transition={{ type: "spring", stiffness: 90, damping: 14, mass: 0.9 }}
      >
        {FACES.map((f, i) => (
          <div
            key={f.key}
            aria-hidden={i !== shown}
            className="absolute inset-0 overflow-hidden rounded-full ring-1 ring-dark/10 transition-opacity duration-500 dark:ring-light/10"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: i === 1 && !reduce ? "rotateY(180deg)" : undefined,
              opacity: reduce ? (i === shown ? 1 : 0) : 1,
            }}
          >
            <Image
              src={f.src}
              alt={f.alt}
              fill
              priority={f.priority}
              loading={f.priority ? undefined : "eager"}
              sizes="(max-width: 1023px) 420px, 400px"
              className={`object-cover ${f.imgClass}`}
            />
            {/* soft sheen over both faces */}
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" aria-hidden="true" />
          </div>
        ))}
      </motion.div>

      {/* which side is up */}
      <span className="pointer-events-none absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-dark/10 bg-light/90 p-1 font-mono text-[10px] uppercase tracking-wider shadow-sm backdrop-blur dark:border-light/10 dark:bg-dark/90">
        {FACES.map((f, i) => (
          <span
            key={f.key}
            className={`rounded-full px-2.5 py-1 transition-colors duration-300 ${
              i === shown ? "bg-dark text-light dark:bg-light dark:text-dark" : "text-dark/50 dark:text-light/50"
            }`}
          >
            {f.label}
          </span>
        ))}
      </span>
    </button>
  );
}
