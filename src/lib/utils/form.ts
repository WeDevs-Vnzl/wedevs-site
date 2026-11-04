/**
 * Posts the form to the Netlify Function at netlify/functions/contact.mts.
 * Throws an Error whose message is the server error code (e.g. "captcha").
 */
export async function submitContactForm(data: FormData): Promise<void> {
  const res = await fetch("/api/contact", { method: "POST", body: data });
  const body = (await res.json().catch(() => ({ ok: false }))) as {
    ok?: boolean;
    error?: string;
  };
  if (!res.ok || !body.ok) throw new Error(body.error ?? "error");
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Returns the names of required fields that are empty/whitespace-only. */
export function getMissingRequiredFields(
  data: Record<string, string>,
  required: string[],
): string[] {
  return required.filter((field) => !data[field]?.trim());
}
