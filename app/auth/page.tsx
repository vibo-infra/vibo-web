import type { Metadata } from "next";
import { AuthPanel } from "@/components/auth/AuthPanel";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Login or Join",
  description: "Create a VIBO account to join events or host your own.",
};

export default function AuthPage() {
  return (
    <Container className="pt-32 pb-20">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_0.82fr] lg:items-center lg:justify-between">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-accent">
            VIBO account
          </p>
          <h1 className="mt-4 max-w-[680px] font-display text-[clamp(42px,7vw,78px)] font-light leading-[0.95] tracking-[-0.06em] text-heading">
            Join or host nearby plans.
          </h1>
          <p className="mt-6 max-w-[460px] text-[16px] font-medium leading-relaxed text-body">
            Use the web preview to apply for events, host one, and help shape
            the VIBO app before launch.
          </p>
        </div>
        <AuthPanel />
      </div>
    </Container>
  );
}
