"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, type ReactNode } from "react";
import {
  parseHashHref,
  pathsMatch,
  replaceHashInUrl,
  scrollToHashId,
} from "@/lib/hashNav";

type SectionHashLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  /** Runs on every click (e.g. close mobile menu) */
  onInteract?: () => void;
};

export function SectionHashLink({
  href,
  className,
  children,
  onInteract,
}: SectionHashLinkProps) {
  const pathname = usePathname() || "/";

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onInteract?.();

      const { pathname: targetPath, hash } = parseHashHref(href);
      if (!hash) return;

      const onTargetPage = pathsMatch(pathname, targetPath);

      if (onTargetPage) {
        e.preventDefault();
        scrollToHashId(hash);
        replaceHashInUrl(targetPath, hash);
      }
    },
    [href, pathname, onInteract]
  );

  return (
    <Link
      href={href}
      className={className}
      scroll={false}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
