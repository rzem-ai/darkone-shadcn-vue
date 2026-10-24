/** The schemes a link drawn from agent or model output may carry. */
const SAFE = new Set(['http:', 'https:']);

/**
 * A URL that came from data, such as a source the model cited, made safe to bind to an
 * href: http(s) only, so a `javascript:` URL in the data cannot run when clicked.
 * Anything else is undefined, which leaves the anchor without a link.
 */
export function safeHref(url: string | undefined): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    return SAFE.has(parsed.protocol) ? parsed.href : undefined;
  } catch {
    return undefined;
  }
}
