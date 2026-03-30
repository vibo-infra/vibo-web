import Link from "next/link";
import type { TncSection } from "@/lib/api/types";

const EMAIL = "hello@vibo.in";

function ParagraphWithEmail({ text }: { text: string }) {
  if (!text.includes(EMAIL)) {
    return (
      <p className="text-[15px] font-light leading-[1.8] text-body whitespace-pre-line">
        {text}
      </p>
    );
  }
  const parts = text.split(EMAIL);
  return (
    <p className="text-[15px] font-light leading-[1.8] text-body whitespace-pre-line">
      {parts[0]}
      <a
        href={`mailto:${EMAIL}`}
        className="text-accent no-underline hover:underline"
      >
        {EMAIL}
      </a>
      {parts.slice(1).join(EMAIL)}
    </p>
  );
}

export function TncContent({ sections }: { sections: TncSection[] }) {
  if (sections.length === 0) {
    return (
      <>
        <p className="mb-12 text-[15px] font-light leading-relaxed text-body">
          Terms are not available from the server yet. Add rows to{" "}
          <code className="text-sm">web_tnc_sections</code> or check your API
          connection.
        </p>
        <div className="my-12 h-px w-full bg-line" />
        <Link
          href="/"
          className="text-sm font-medium text-accent no-underline hover:underline"
        >
          ← Back to VIBO
        </Link>
      </>
    );
  }

  return (
    <>
      {sections.map((section) => (
        <article key={section.id} className="mb-12">
          <h2 className="mb-3 font-display text-[22px] font-normal text-heading">
            {section.title}
          </h2>
          <ParagraphWithEmail text={section.content} />
          {section.has_highlight && section.highlight_text ? (
            <div className="my-3 rounded-r-lg border-l-[3px] border-accent bg-accent-dim px-[18px] py-3.5 text-sm font-light leading-relaxed text-body">
              {section.highlight_text}
            </div>
          ) : null}
        </article>
      ))}

      <div className="my-12 h-px w-full bg-line" />

      <Link
        href="/"
        className="text-sm font-medium text-accent no-underline hover:underline"
      >
        ← Back to VIBO
      </Link>
    </>
  );
}
