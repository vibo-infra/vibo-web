"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ApiRequestError } from "@/lib/api/services/appApi";
import { track } from "@/lib/analytics";

type AuthPanelProps = {
  compact?: boolean;
  redirectLabel?: string;
  onSuccess?: () => void;
};

export function AuthPanel({ compact = false, redirectLabel, onSuccess }: AuthPanelProps) {
  const { session, login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [defaultCity, setDefaultCity] = useState("Mumbai");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (session) {
    return (
      <div className="rounded-[28px] border border-line bg-surface p-5 shadow-sm">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-accent">
          Signed in
        </p>
        <div className="mt-2 text-lg font-extrabold text-heading">
          {session.user.firstName || session.user.email}
        </div>
        <p className="mt-1 text-sm text-muted">{session.user.email}</p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/events"
            className="inline-flex justify-center rounded-full bg-heading px-4 py-2 text-sm font-extrabold text-page no-underline"
          >
            Browse events
          </Link>
          <Link
            href="/host"
            className="inline-flex justify-center rounded-full border border-line-strong px-4 py-2 text-sm font-extrabold text-heading no-underline transition hover:border-accent hover:text-accent"
          >
            Host one
          </Link>
        </div>
      </div>
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      if (mode === "login") {
        await login(email, password);
        track("auth_success", "login_form", { source: "web" });
      } else {
        await register({ email, password, firstName, defaultCity });
        track("auth_success", "register_form", { source: "web" });
      }
      onSuccess?.();
    } catch (err) {
      const text =
        err instanceof ApiRequestError
          ? err.message
          : "Could not complete auth. Please try again.";
      setMessage(text);
      track("auth_error", mode, { message: text });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-[28px] border border-line bg-surface p-5 shadow-sm md:p-7">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-accent">
            {redirectLabel ?? "VIBO account"}
          </p>
          <h1
            className={`mt-2 font-display font-light leading-tight tracking-[-0.04em] text-heading ${
              compact ? "text-3xl" : "text-[clamp(34px,5vw,58px)]"
            }`}
          >
            {mode === "login" ? "Welcome back." : "Create your account."}
          </h1>
        </div>
        <div className="flex rounded-full border border-line bg-page p-1 text-xs font-extrabold">
          {(["login", "register"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`rounded-full px-3 py-1.5 capitalize transition ${
                mode === item
                  ? "bg-heading text-page"
                  : "text-muted hover:text-heading"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        {mode === "register" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-bold text-heading">
              First name
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded-2xl border border-line bg-page px-4 py-3 text-sm outline-none transition focus:border-accent"
                placeholder="Vishal"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-bold text-heading">
              City
              <input
                value={defaultCity}
                onChange={(e) => setDefaultCity(e.target.value)}
                className="rounded-2xl border border-line bg-page px-4 py-3 text-sm outline-none transition focus:border-accent"
                placeholder="Mumbai"
                required
              />
            </label>
          </div>
        ) : null}
        <label className="grid gap-1.5 text-sm font-bold text-heading">
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-2xl border border-line bg-page px-4 py-3 text-sm outline-none transition focus:border-accent"
            placeholder="you@example.com"
            type="email"
            required
          />
        </label>
        <label className="grid gap-1.5 text-sm font-bold text-heading">
          Password
          <span className="relative block">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-line bg-page px-4 py-3 pr-20 text-sm outline-none transition focus:border-accent"
              placeholder="Minimum 8 characters"
              type={showPassword ? "text" : "password"}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-xs font-extrabold text-muted transition hover:bg-surface hover:text-heading"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </span>
        </label>
        {message ? (
          <p className="rounded-2xl border border-accent/30 bg-accent-dim px-4 py-3 text-sm font-bold text-heading">
            {message}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-heading px-5 py-3 text-sm font-extrabold text-page transition hover:-translate-y-px hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting
            ? "Please wait..."
            : mode === "login"
              ? "Log in"
              : "Create account"}
        </button>
      </form>
    </div>
  );
}
