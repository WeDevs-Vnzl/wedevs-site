// Single source for the studio's contact channels.
// TODO(brand): add Instagram and TikTok once the team confirms them.
// CONTACT_EMAIL and CONTACT_PHONE are read at build time (set them in .env
// locally and in Netlify's environment variables); the literals are fallbacks.
export const brandEmail: string =
  import.meta.env.CONTACT_EMAIL || "info@we-devs.com";
// A plain mailto: opens the visitor's own mail client; no third-party webmail.
export const brandMailHref = `mailto:${brandEmail}`;

// Public profiles of the studio itself (schema.org Organization.sameAs).
export const brandSameAs: string[] = [];

// wa.me expects the number in international format, digits only.
export const brandWhatsapp: string =
  import.meta.env.CONTACT_PHONE || "+58 424-2118468";
export const brandWhatsappHref = `https://wa.me/${brandWhatsapp.replace(/\D/g, "")}`;

// Founders' public profiles (LinkedIn only). `id` keys the i18n role/bio
// under aboutPage.founders and the schema.org Person @id.
export const founders = [
  {
    id: "williams-velazquez",
    name: "Williams Velazquez",
    initials: "WV",
    linkedin: "https://www.linkedin.com/in/williams-velasquez-19258a261",
  },
  {
    id: "eliezer-meza",
    name: "Eliezer Meza",
    initials: "EM",
    linkedin: "https://www.linkedin.com/in/eliezer-a-meza/",
  },
] as const;

export type Founder = (typeof founders)[number];

// Writes the blog posts; shown on the blog author card.
export const blogAuthor: Founder = founders[0];
