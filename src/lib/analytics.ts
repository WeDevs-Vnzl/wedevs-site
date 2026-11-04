/**
 * GA4 measurement ID. `PUBLIC_GA_ID` is the documented name; `G_TAG` is the
 * legacy name kept so existing Netlify configs keep working.
 */
export const gaId: string | undefined =
  import.meta.env.PUBLIC_GA_ID || import.meta.env.G_TAG || undefined;

/** Analytics only loads in production builds, so dev visits never count. */
export const analyticsEnabled = import.meta.env.PROD && Boolean(gaId);
