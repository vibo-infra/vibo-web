import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BrandPronunciation } from "@/components/ui/BrandPronunciation";
import { homeSectionLinks } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-line py-12 sm:py-14">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-0">
          {/* Brand + pronunciation — fixed readable column */}
          <div className="lg:col-span-5 xl:col-span-4">
            <Link
              href="/"
              className="inline-block font-display text-xl font-extrabold tracking-[-0.03em] text-heading no-underline sm:text-2xl"
            >
              vi<span className="text-accent">b</span>o
            </Link>
            <div className="mt-4 sm:mt-5">
              <BrandPronunciation />
            </div>
          </div>

          {/* Nav — aligned to top, even with brand block */}
          <nav
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2 lg:col-span-4 lg:justify-center lg:pt-1 xl:col-span-5"
            aria-label="Footer"
          >
            <Link
              href={homeSectionLinks.howItWorks}
              className="text-[14px] text-muted no-underline transition-colors hover:text-heading"
            >
              How it works
            </Link>
            <Link
              href={homeSectionLinks.pricing}
              className="text-[14px] text-muted no-underline transition-colors hover:text-heading"
            >
              Pricing
            </Link>
            <Link
              href="/tnc"
              className="text-[14px] text-muted no-underline transition-colors hover:text-heading"
            >
              Terms & Conditions
            </Link>
            <a
              href="mailto:sayhellovibo@gmail.com"
              className="text-[14px] text-muted no-underline transition-colors hover:text-heading"
            >
              Contact
            </a>
          </nav>

          {/* Legal line */}
          <div className="text-[13px] leading-snug text-faint lg:col-span-3 lg:max-w-[220px] lg:justify-self-end lg:pt-1 lg:text-right">
            © {new Date().getFullYear()} VIBO Technologies · Made in Mumbai
          </div>
        </div>
      </Container>
    </footer>
  );
}
