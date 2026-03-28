import Link from "next/link";
import { Container } from "@/components/ui/Container";

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
            <a
              href="#how"
              className="text-[13px] text-muted no-underline transition-colors hover:text-heading"
            >
              How it works
            </a>
            <a
              href="#price"
              className="text-[13px] text-muted no-underline transition-colors hover:text-heading"
            >
              Pricing
            </a>
            <Link
              href="/terms"
              className="text-[13px] text-muted no-underline transition-colors hover:text-heading"
            >
              Terms & Conditions
            </Link>
            <a
              href="mailto:hello@vibo.in"
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
