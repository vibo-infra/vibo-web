"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { homeSectionLinks, navLinks } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

type MobileMenuProps = {
  onClose: () => void;
};

export function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-90 flex flex-col bg-page px-8 pt-20 pb-10"
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-6 cursor-pointer border-none bg-transparent p-1 text-heading"
        aria-label="Close menu"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M5 5l10 10M15 5l-10 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div className="flex flex-col gap-8">
        {navLinks.map((link, i) => (
          <motion.div
            key={link.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.3 }}
          >
            <Link
              href={link.href}
              onClick={onClose}
              className="font-display border-b border-line-strong py-2 text-[30px] font-extrabold tracking-[-0.02em] text-heading no-underline transition-colors hover:text-highlight"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-4">
        <Link
          href={homeSectionLinks.waitlist}
          onClick={onClose}
          className="flex h-12 items-center justify-center rounded-xl bg-heading text-center text-sm font-extrabold text-page no-underline transition-opacity hover:opacity-90"
        >
          Get early access →
        </Link>
        <div className="flex items-center gap-2.5">
          <span className="text-[13px] text-muted">Switch theme</span>
          <ThemeToggle />
        </div>
      </div>
    </motion.div>
  );
}
