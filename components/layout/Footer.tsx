import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHashLink } from "@/components/ui/SectionHashLink";
import { BrandPronunciation } from "@/components/ui/BrandPronunciation";
import { navLinks, siteConfig } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface/50">
      <Container className="py-14 lg:py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          {/* Brand + pronunciation */}
          <div className="max-w-md shrink-0">
            <Link
              href="/"
              className="inline-block font-display text-2xl font-extrabold tracking-[-0.03em] text-heading no-underline transition-opacity hover:opacity-85"
            >
              vi<span className="text-accent">b</span>o
            </Link>
            <p className="mt-2 text-[13px] font-medium leading-snug text-muted">
              {siteConfig.tagline}
            </p>
            <div className="mt-6">
              <BrandPronunciation />
            </div>
          </div>

          {/* Links — one column, right-aligned on large screens */}
          <nav
            className="flex min-w-0 flex-col gap-0.5 lg:min-w-[200px] lg:items-end lg:pt-0.5"
            aria-label="Footer"
          >
            {navLinks.map((link) => (
              <SectionHashLink
                key={link.href}
                href={link.href}
                className="py-1.5 text-[13px] font-semibold tracking-[0.01em] text-body no-underline transition-colors hover:text-accent lg:py-1 lg:text-right"
              >
                {link.label}
              </SectionHashLink>
            ))}
            <a
              href={`mailto:${siteConfig.email}`}
              className="py-1.5 text-[13px] font-semibold tracking-[0.01em] text-body no-underline transition-colors hover:text-accent lg:py-1 lg:text-right"
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="mt-12 border-t border-line pt-8">
          <p className="text-center text-[12px] font-medium leading-relaxed text-faint lg:text-left">
            <span className="text-muted">© {year} VIBO Technologies</span>
            <span className="mx-2 text-line" aria-hidden>
              ·
            </span>
            <span className="text-muted">Made in Mumbai</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
