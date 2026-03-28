"use client";

import { useTheme } from "@/context/ThemeProvider";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <button
        className={`relative h-6 w-[42px] shrink-0 cursor-pointer rounded-full border border-line-strong bg-surface-alt transition-colors ${className ?? ""}`}
        aria-label="Toggle theme"
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative h-6 w-[42px] shrink-0 cursor-pointer rounded-full border border-line-strong bg-surface-alt transition-colors ${className ?? ""}`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      role="switch"
      aria-checked={theme === "dark"}
    >
      <span
        className={`absolute top-[3px] left-[3px] h-4 w-4 rounded-full transition-all duration-300 ${
          theme === "dark"
            ? "translate-x-[18px] bg-highlight"
            : "translate-x-0 bg-body"
        }`}
      />
    </button>
  );
}
