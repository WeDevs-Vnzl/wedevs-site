/** Blog entries are stored as `<lang>/<slug>.md`; routing only needs the slug. */
export function getPostSlug(id: string): string {
  return id.split("/").slice(1).join("/");
}
