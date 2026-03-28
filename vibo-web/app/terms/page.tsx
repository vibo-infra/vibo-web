import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { tncSections } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "VIBO Terms & Conditions — We wrote this to be read, not to protect us from you.",
  alternates: {
    canonical: "https://vibo.app/terms",
  },
};

export default function TermsPage() {
  return (
    <Container>
      <div className="mx-auto max-w-[720px] pt-[120px] pb-20">
        <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-muted before:h-px before:w-5 before:bg-faint before:content-['']">
          Last updated: December 2025
        </span>

        <h1 className="mt-4 mb-3 font-display text-[clamp(32px,4vw,52px)] font-light leading-[1.15] tracking-tight text-heading">
          Terms & Conditions
        </h1>

        <p className="mb-16 text-base font-light leading-relaxed text-body">
          We wrote this to be read — not to protect us from you, but to make
          sure we&apos;re both clear on what VIBO is, what we promise, and what
          we ask of you.
        </p>

        <div className="mb-16 h-px w-full bg-line" />

        {tncSections.map((section, i) => (
          <article key={i} className="mb-12">
            <h2 className="mb-3 font-display text-[22px] font-normal text-heading">
              {section.title}
            </h2>
            <p className="text-[15px] font-light leading-[1.8] text-body">
              {section.content}
              {section.email && (
                <>
                  {" "}
                  <a
                    href={`mailto:${section.email}`}
                    className="text-accent no-underline hover:underline"
                  >
                    {section.email}
                  </a>
                  .{" "}
                </>
              )}
              {section.contentAfter && ` ${section.contentAfter}`}
            </p>
            {section.callout && (
              <div className="my-3 rounded-r-lg border-l-[3px] border-accent bg-accent-dim px-[18px] py-3.5 text-sm font-light leading-relaxed text-body">
                {section.callout}
              </div>
            )}
          </article>
        ))}

        <div className="my-12 h-px w-full bg-line" />

        <Link
          href="/"
          className="text-sm font-medium text-accent no-underline hover:underline"
        >
          ← Back to VIBO
        </Link>
      </div>
    </Container>
  );
}
