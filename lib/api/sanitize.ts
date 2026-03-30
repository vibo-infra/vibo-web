/**
 * Hardening for values that become path segments or request bodies.
 */

const REF_CODE_MAX = 64;
const REF_CODE_RE = /^[a-zA-Z0-9_-]+$/;

export function sanitizeReferralCode(raw: string | null | undefined): string | null {
  if (raw == null) return null;
  const t = raw.trim();
  if (!t || t.length > REF_CODE_MAX || !REF_CODE_RE.test(t)) return null;
  return t;
}

/** Safe text for display (strip control chars) */
export function safeDisplayText(input: string, maxLen = 2000): string {
  return input
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .slice(0, maxLen);
}

const EMAIL_MAX = 320;

export function sanitizeEmail(raw: string): string {
  return raw.trim().slice(0, EMAIL_MAX);
}
