"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-100 flex h-[60px] items-center px-8 transition-all duration-300 ${
          scrolled
            ? "border-b border-line bg-page"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between">
          <Link
            href="/"
            className="font-display text-[22px] font-extrabold tracking-[-0.04em] text-heading no-underline"
          >
            vi<span className="text-accent">b</span>o
          </Link>

          <ul className="flex items-center gap-8 max-md:hidden">
            {navLinks.map((link) => (
              <li key={link.label} className="list-none">
                {link.href.startsWith("/") ? (
                  <Link
                    href={link.href}
                    className="text-[13px] font-bold tracking-[0.01em] text-muted no-underline transition-colors hover:text-heading"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="text-[13px] font-bold tracking-[0.01em] text-muted no-underline transition-colors hover:text-heading"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#wl"
              className="inline-flex items-center gap-1.5 rounded-full bg-heading px-5 py-2.5 font-body text-[13px] font-extrabold text-page no-underline transition-all hover:opacity-90 hover:-translate-y-px max-md:hidden"
            >
              Get early access →
            </a>
            <button
              className="hidden cursor-pointer border-none bg-transparent p-1 text-heading max-md:flex"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M3 5h14M3 10h14M3 15h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu onClose={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
