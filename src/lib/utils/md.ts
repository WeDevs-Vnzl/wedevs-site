/** Convierte un subconjunto de markdown (negrita, cursiva, enlaces) a HTML seguro. */
export function md(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="underline">$1</a>');
}
