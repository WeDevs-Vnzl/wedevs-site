/**
 * Scroll-spy for the section index shown beside long-form content (case
 * studies and blog posts). Every `[data-index-link="<id>"]` link lights up
 * while the element with that id crosses the middle band of the viewport.
 * Layouts call this on load and again after each ClientRouter swap.
 */
export function initSectionIndex(): void {
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>("[data-index-link]"),
  );
  const ids = [...new Set(links.map((l) => l.dataset.indexLink!))];
  const targets = ids
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => !!el);
  if (!links.length || !targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        links
          .filter((l) => l.dataset.indexLink === entry.target.id)
          .forEach((l) =>
            l.classList.toggle("is-active", entry.isIntersecting),
          );
      });
    },
    { rootMargin: "-30% 0px -60% 0px" },
  );
  targets.forEach((target) => observer.observe(target));
}
