/** Submits to the Netlify Forms endpoint registered via public/forms/__forms.html. */
export async function submitContactForm(
  data: Record<string, string>,
): Promise<void> {
  const res = await fetch("/forms/__forms.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ "form-name": "contact", ...data }).toString(),
  });
  if (!res.ok) throw new Error(`Form submission failed: ${res.status}`);
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
