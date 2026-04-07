/**
 * Parse `/#id` or `/path#id` for same-page section navigation.
 */

export function parseHashHref(href: string): { pathname: string; hash: string | null } {
  const i = href.indexOf("#");
  if (i === -1) return { pathname: href, hash: null };
  let pathPart = i === 0 ? "/" : href.slice(0, i);
  if (pathPart === "") pathPart = "/";
  const hash = href.slice(i + 1).trim();
  return { pathname: pathPart, hash: hash || null };
}

export function pathsMatch(current: string, target: string): boolean {
  const c = current === "" ? "/" : current;
  const t = target === "" || target === "/" ? "/" : target;
  return c === t;
}

export function scrollToHashId(hash: string, behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(hash);
  if (!el) return false;
  el.scrollIntoView({ behavior, block: "start" });
  return true;
}

export function replaceHashInUrl(pathname: string, hash: string) {
  const base = pathname === "/" || pathname === "" ? "/" : pathname;
  const url = base === "/" ? `/#${hash}` : `${base}#${hash}`;
  window.history.replaceState(null, "", url);
}
