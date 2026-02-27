import { motion, useReducedMotion } from "framer-motion";
import React from "react";

const AnimatedText = ({ text, className = "" }) => {
  const shouldReduceMotion = useReducedMotion();

  const quote = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: shouldReduceMotion ? 0 : 0.5,
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const singleWord = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.01 : 1 },
    },
  };

  return (
    <div
      className="py-2 w-full mx-auto flex flex-col items-center justify-center text-center overflow-hidden sm:py-0"
    >
      <motion.h1
        className={`inline-block text-dark dark:text-light
          text-8xl font-bold w-full capitalize font-heading
          [text-wrap:balance] ${className} xl:text-6xl`}
        variants={quote}
        initial="hidden"
        animate="visible"
      >
        {text.split(" ").map((word, index) => (
          <motion.span
            className="inline-block"
            key={word + "-" + index}
            variants={singleWord}
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

export default AnimatedText;
