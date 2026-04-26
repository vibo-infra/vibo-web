"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { HiOutlineMapPin, HiOutlineSparkles, HiOutlineUserGroup } from "react-icons/hi2";

const points = [
  {
    icon: HiOutlineSparkles,
    title: "Start small",
    text: "A walk, jam, game, class, or coffee meetup is enough.",
  },
  {
    icon: HiOutlineMapPin,
    title: "Add the spot",
    text: "Tell people where it is and help nearby members find it.",
  },
  {
    icon: HiOutlineUserGroup,
    title: "See who joins",
    text: "If people like it, we learn what to build deeper in the app.",
  },
] as const;

export function HostFirstEventSection() {
  return (
    <section className="py-16 sm:py-20 md:py-[96px]" id="host-first">
      <Container>
        <div className="overflow-hidden rounded-[34px] border border-line bg-surface">
          <div className="grid gap-0 lg:grid-cols-[1.02fr_0.98fr]">
            <FadeIn className="p-6 sm:p-8 md:p-10">
              <SectionEyebrow text="Host your first event" />
              <h2 className="mt-5 font-display text-[clamp(34px,8vw,64px)] font-light leading-[0.98] tracking-[-0.06em] text-heading">
                Let people around you find it.
              </h2>
              <p className="mt-5 max-w-[560px] text-[15px] font-medium leading-relaxed text-body sm:text-base">
                Put one simple plan on VIBO. If it feels useful, tell us. If it
                needs work, tell us that too.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/host"
                  className="inline-flex justify-center rounded-full bg-heading px-6 py-3 text-sm font-extrabold text-page no-underline transition hover:-translate-y-px hover:opacity-90"
                >
                  Host an event
                </Link>
                <Link
                  href="/events"
                  className="inline-flex justify-center rounded-full border border-line-strong px-6 py-3 text-sm font-extrabold text-heading no-underline transition hover:border-accent hover:text-accent"
                >
                  See events
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.06} className="border-t border-line bg-page p-5 sm:p-6 lg:border-t-0 lg:border-l">
              <div className="grid gap-3">
                {points.map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="flex gap-4 rounded-[24px] border border-line bg-surface p-4 sm:p-5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-dim text-xl text-accent">
                      <Icon />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-heading">{title}</h3>
                      <p className="mt-1 text-sm font-medium leading-relaxed text-body">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
