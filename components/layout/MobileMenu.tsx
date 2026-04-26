"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { homeSectionLinks, navLinks } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SectionHashLink } from "@/components/ui/SectionHashLink";
import { useWaitlistSpot } from "@/context/WaitlistSpotContext";
import { fetchWaitlistCountClient } from "@/lib/api/services/webApi";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

type MobileMenuProps = {
  onClose: () => void;
};

export function MobileMenu({ onClose }: MobileMenuProps) {
  const { userPosition } = useWaitlistSpot();
  const { session } = useAuth();
  const [lineCount, setLineCount] = useState<number | null>(null);

  useEffect(() => {
    void fetchWaitlistCountClient().then((n) => {
      if (n != null) setLineCount(n);
    });
  }, []);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[130] flex flex-col bg-page px-6 pt-[max(5rem,env(safe-area-inset-top)+3.25rem)] pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-8"
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-10 flex h-11 w-11 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-line-strong bg-surface text-heading shadow-sm transition-colors hover:border-accent hover:bg-surface-alt hover:text-accent active:scale-[0.98]"
        aria-label="Close menu"
      >
        <IoClose className="h-6 w-6 shrink-0" aria-hidden />
      </button>

      <div className="flex flex-col gap-8">
        {navLinks.map((link, i) => (
          <motion.div
            key={link.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.3 }}
          >
            <SectionHashLink
              href={link.href}
              onInteract={onClose}
              className="font-display border-b border-line-strong py-2 text-[30px] font-extrabold tracking-[-0.02em] text-heading no-underline transition-colors hover:text-highlight"
            >
              {link.label}
            </SectionHashLink>
          </motion.div>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-4">
        <p className="text-center text-[13px] font-semibold text-muted">
          {userPosition != null ? (
            <>
              Your spot{" "}
              <span className="font-extrabold text-accent">
                #{userPosition.toLocaleString("en-IN")}
              </span>
            </>
          ) : lineCount != null ? (
            <>
              <span className="font-extrabold text-body">
                {lineCount.toLocaleString("en-IN")}
              </span>{" "}
              people in line
            </>
          ) : (
            <>
              <span className="font-extrabold text-body">0</span> people in
              line
            </>
          )}
        </p>
        <SectionHashLink
          href={homeSectionLinks.waitlist}
          onInteract={onClose}
          className="flex h-12 items-center justify-center rounded-xl bg-heading text-center text-sm font-extrabold text-page no-underline transition-opacity hover:opacity-90"
        >
          Get early access →
        </SectionHashLink>
        {!session ? (
          <Link
            href="/auth"
            onClick={onClose}
            className="flex h-12 items-center justify-center rounded-xl border border-line-strong text-center text-sm font-extrabold text-heading no-underline transition-colors hover:border-accent hover:text-accent"
          >
            Login
          </Link>
        ) : null}
        <div className="flex items-center gap-2.5">
          <span className="text-[13px] text-muted">Switch theme</span>
          <ThemeToggle />
        </div>
      </div>
    </motion.div>
  );
}
