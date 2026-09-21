import type { Categorie } from "@/types/gap";

/**
 * Seuils de catégorisation GAP (sur l'écart de visites par rapport à la cible trimestrielle):
 * atteint: écart >= 0 · proche: -20 <= écart <= -1 · à suivre: écart <= -21.
 */
export function categoriser(ecartVisites: number): Categorie {
  if (ecartVisites >= 0) return "atteint";
  if (ecartVisites >= -20) return "proche";
  return "a-suivre";
}

/** Pourcentage de plages publiées par rapport à la cible trimestrielle (0 si la cible est nulle). */
export function progressionPlages(plagesPubliees: number, objectifTrimestre: number): number {
  if (!objectifTrimestre) return 0;
  return (plagesPubliees / objectifTrimestre) * 100;
}

/** Pourcentage de visites admissibles par rapport à la cible trimestrielle (0 si la cible est nulle). */
export function progressionVisites(visitesAdmissibles: number, objectifTrimestre: number): number {
  if (!objectifTrimestre) return 0;
  return (visitesAdmissibles / objectifTrimestre) * 100;
}

/** Nombre de visites qu'il reste à réaliser pour atteindre la cible (jamais négatif). */
export function visitesRestantes(visitesAdmissibles: number, objectifTrimestre: number): number {
  return Math.max(0, objectifTrimestre - visitesAdmissibles);
}

/** Écart de visites par rapport à la cible trimestrielle (négatif = sous la cible). */
export function ecartVisites(visitesAdmissibles: number, objectifTrimestre: number): number {
  return visitesAdmissibles - objectifTrimestre;
}
