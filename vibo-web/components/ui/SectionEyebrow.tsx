import { FadeIn } from "./FadeIn";

type SectionEyebrowProps = {
  text: string;
};

export function SectionEyebrow({ text }: SectionEyebrowProps) {
  return (
    <FadeIn>
      <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted before:h-[2px] before:w-5 before:bg-highlight before:content-['']">
        {text}
      </span>
    </FadeIn>
  );
}
