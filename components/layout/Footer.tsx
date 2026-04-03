import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { homeSectionLinks } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="font-display text-lg font-extrabold tracking-[-0.03em] text-heading no-underline"
          >
            vi<span className="text-accent">b</span>o
          </Link>

          <div className="flex flex-wrap gap-6">
            <Link
              href={homeSectionLinks.howItWorks}
              className="text-[13px] text-muted no-underline transition-colors hover:text-heading"
            >
              How it works
            </Link>
            <Link
              href={homeSectionLinks.pricing}
              className="text-[13px] text-muted no-underline transition-colors hover:text-heading"
            >
              Pricing
            </Link>
            <Link
              href="/tnc"
              className="text-[13px] text-muted no-underline transition-colors hover:text-heading"
            >
              Terms & Conditions
            </Link>
            <a
              href="mailto:sayhellovibo@gmail.com"
              className="text-[13px] text-muted no-underline transition-colors hover:text-heading"
            >
              Contact
            </a>
          </div>

          <div className="text-xs text-faint">
            © {new Date().getFullYear()} VIBO Technologies · Made in Mumbai
          </div>
        </div>
      </Container>
    </footer>
  );
}
