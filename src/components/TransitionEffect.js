import { motion } from "framer-motion";
import React from "react";

// Quick, light page transition: a hairline sweeps across the top while the page fades in.
// Kept short so recruiters clicking between pages are never kept waiting.
const TransitionEffect = () => {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-primary dark:bg-primaryDark"
      initial={{ scaleX: 0, opacity: 1 }}
      animate={{ scaleX: 1, opacity: 0 }}
      transition={{ scaleX: { duration: 0.5, ease: "easeOut" }, opacity: { delay: 0.45, duration: 0.25 } }}
    />
  );
};

export default TransitionEffect;
