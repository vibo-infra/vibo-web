"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Footer note: correct “vai-bo” vs common “vee-bo” — playful, not preachy.
 */
export function BrandPronunciation() {
  const reduce = useReducedMotion();

  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="m-0 max-w-md text-[14px] leading-[1.65] text-body sm:text-[15px] sm:leading-[1.7]"
    >
      <span className="text-muted">It&apos;s </span>
      <motion.span
        className="font-display text-[1.05em] font-semibold tracking-wide text-accent sm:text-[1.12em]"
        {...(reduce
          ? {}
          : {
              animate: { opacity: [0.78, 1, 0.78] },
              transition: {
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
              },
            })}
      >
        vai-bo
      </motion.span>
      <span className="text-muted"> — not </span>
      <span className="text-muted line-through decoration-line-strong/60">
        vee-bo
      </span>
      <span className="text-muted">
        . Totally fine if you said it wrong — we&apos;re only a little hurt. 😉
      </span>
    </motion.p>
  );
}
