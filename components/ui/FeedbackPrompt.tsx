"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

type FeedbackPromptProps = {
  eventName: string;
  element: string;
  question?: string;
};

export function FeedbackPrompt({
  eventName,
  element,
  question = "Was this easy?",
}: FeedbackPromptProps) {
  const [answered, setAnswered] = useState<string | null>(null);

  function answer(value: "yes" | "not_really") {
    setAnswered(value);
    track(eventName, element, { answer: value });
  }

  return (
    <div className="mt-4 rounded-2xl border border-line bg-page p-4">
      {answered ? (
        <p className="text-sm font-extrabold text-heading">
          Thanks. This helps us shape VIBO.
        </p>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-extrabold text-heading">{question}</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => answer("yes")}
              className="rounded-full bg-heading px-4 py-2 text-xs font-extrabold text-page"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => answer("not_really")}
              className="rounded-full border border-line-strong px-4 py-2 text-xs font-extrabold text-heading"
            >
              Not really
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
