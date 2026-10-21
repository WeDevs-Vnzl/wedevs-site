/** Numera un ítem dentro de su sección con el formato "SS.II", p. ej. itemIndex("03", 0) → "03.01". */
export function itemIndex(section: string, i: number): string {
  return `${section}.${String(i + 1).padStart(2, "0")}`;
}
