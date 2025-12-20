/**
 * Configuration for routes that should display the bottom navbar
 * 
 * Supports:
 * - Exact paths: '/explore'
 * - Path patterns: '/event/:eventId' (matches /event/123, /event/abc, etc.)
 * - Wildcards: '/profile/*' (matches /profile/anything)
 */

export const NAVBAR_VISIBLE_ROUTES = [
  '/',
  '/explore',
  '/host-event',
] as const;

/**
 * Check if a path matches a route pattern
 * Handles dynamic segments like :eventId
 */
export const matchRoute = (pathname: string, pattern: string): boolean => {
  // Convert pattern to regex
  // Replace :paramName with [^/]+ (matches any non-slash characters)
  const regexPattern = pattern
    .replace(/:[^/]+/g, '[^/]+')
    .replace(/\*/g, '.*');
  
  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(pathname);
};

/**
 * Check if navbar should be visible for a given pathname
 */
export const shouldShowNavbar = (pathname: string): boolean => {
  return NAVBAR_VISIBLE_ROUTES.some(route => matchRoute(pathname, route));
};
