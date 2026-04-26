"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileStickyCTA() {
  const pathname = usePathname();
  if (pathname === "/events" || pathname === "/host" || pathname === "/auth") {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[120] border-t border-line bg-page/95 px-4 py-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-[420px] gap-2">
        <Link
          href="/events"
          className="flex flex-1 items-center justify-center rounded-full bg-heading px-4 py-3 text-sm font-extrabold text-page no-underline"
        >
          Browse
        </Link>
        <Link
          href="/host"
          className="flex flex-1 items-center justify-center rounded-full border border-line-strong bg-surface px-4 py-3 text-sm font-extrabold text-heading no-underline"
        >
          Host
        </Link>
      </div>
    </div>
  );
}
