// Receives the contact form, verifies Cloudflare Turnstile server-side and
// emails the message through Resend. Required env vars (Netlify → Project
// configuration → Environment variables):
//   TURNSTILE_SECRET_KEY   Turnstile widget secret key
//   RESEND_API_KEY         Resend API key with "Sending access"
//   CONTACT_TO_EMAIL       Inbox that receives the messages
//   CONTACT_FROM_EMAIL     Verified Resend sender, e.g. "Wedevs <info@we-devs.com>"

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async (req: Request, context: { ip?: string }) => {
  if (req.method !== "POST")
    return json({ ok: false, error: "method_not_allowed" }, 405);

  const {
    TURNSTILE_SECRET_KEY,
    RESEND_API_KEY,
    CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL,
  } = process.env;
  if (
    !TURNSTILE_SECRET_KEY ||
    !RESEND_API_KEY ||
    !CONTACT_TO_EMAIL ||
    !CONTACT_FROM_EMAIL
  ) {
    console.error("Contact form environment variables are missing");
    return json({ ok: false, error: "server_config" }, 500);
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }
  const get = (key: string) => String(form.get(key) ?? "").trim();
  const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ");

  // Honeypot: a bot filled the hidden field. Pretend success, send nothing.
  if (get("company_website")) return json({ ok: true });

  const name = oneLine(get("name"));
  const email = get("email");
  const projectType = oneLine(get("project-type"));
  const budget = oneLine(get("budget"));
  const message = get("message");
  const token = get("cf-turnstile-response");
  const lang = get("lang") === "es" ? "es" : "en";

  if (!token) return json({ ok: false, error: "captcha" }, 400);
  if (!name || !email || !message)
    return json({ ok: false, error: "missing_fields" }, 400);
  if (
    !EMAIL_RE.test(email) ||
    name.length > 100 ||
    email.length > 200 ||
    projectType.length > 100 ||
    budget.length > 100 ||
    message.length > 5000
  ) {
    return json({ ok: false, error: "invalid_fields" }, 400);
  }

  // 1. Verify the Turnstile token server-side.
  const verifyBody = new URLSearchParams({
    secret: TURNSTILE_SECRET_KEY,
    response: token,
  });
  if (context?.ip) verifyBody.set("remoteip", context.ip);

  try {
    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: verifyBody },
    );
    const verify = (await verifyRes.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };
    if (!verify.success) {
      console.warn("Turnstile rejected:", verify["error-codes"]);
      return json({ ok: false, error: "captcha" }, 403);
    }
  } catch (err) {
    console.error("Turnstile verification failed:", err);
    return json({ ok: false, error: "captcha_unavailable" }, 502);
  }

  // 2. Send the email through Resend.
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Project type: ${projectType || "-"}`,
    `Budget: ${budget || "-"}`,
    `Site language: ${lang.toUpperCase()}`,
    "",
    message,
  ].join("\n");

  try {
    const sendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: email, // "Reply" answers the visitor directly
        subject: `New contact from ${name} · we-devs.com`,
        text,
      }),
    });
    if (!sendRes.ok) {
      console.error("Resend error:", sendRes.status, await sendRes.text());
      return json({ ok: false, error: "send_failed" }, 502);
    }
  } catch (err) {
    console.error("Resend request failed:", err);
    return json({ ok: false, error: "send_failed" }, 502);
  }

  return json({ ok: true });
};

export const config = { path: "/api/contact" };
