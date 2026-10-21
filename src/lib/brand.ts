// Single source for the studio's contact channels.
// TODO(brand): switch to the brand inbox (e.g. hola@wedevs.page) and add
// Instagram and TikTok once the team confirms them.
export const brandEmail = "eliezermeza.dev@gmail.com";
export const brandMailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${brandEmail}`;

// wa.me expects the number in international format, digits only.
export const brandWhatsapp = "+58 424-2118468";
export const brandWhatsappHref = `https://wa.me/${brandWhatsapp.replace(/\D/g, "")}`;

// Founders' public profiles (LinkedIn only). `id` keys the i18n role/bio
// under aboutPage.founders and the schema.org Person @id.
export const founders = [
  {
    id: "eliezer-meza",
    name: "Eliezer Meza",
    initials: "EM",
    linkedin: "https://www.linkedin.com/in/eliezer-a-meza/",
  },
  {
    id: "williams-velazquez",
    name: "Williams Velazquez",
    initials: "WV",
    linkedin: "https://www.linkedin.com/in/williams-velasquez-19258a261",
  },
] as const;

export type Founder = (typeof founders)[number];

// Writes the blog posts; shown on the blog author card.
export const blogAuthor: Founder = founders[0];
