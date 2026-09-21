/** Transforme un nom de médecin en identifiant d'URL stable (ex. "Yves Bolduc" -> "yves-bolduc"). */
export function slugify(nom: string): string {
  return nom
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
