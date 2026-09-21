/** Statut GAP d'un médecin, dérivé de l'écart de visites par rapport à la cible trimestrielle. */
export type Categorie = "atteint" | "proche" | "a-suivre";

/** Une ligne brute du fichier source `data/t17-medecins.csv`. */
export interface RawDoctorRow {
  medecin: string;
  objectif_annuel: number;
  objectif_trimestre: number;
  plages_publiees: number;
  visites_admissibles: number;
  ecart_visites: number;
  volume_annuel_final: number;
}

/** Un médecin du GMF avec ses valeurs brutes et ses métriques calculées, prêt pour l'affichage. */
export interface Doctor {
  id: string;
  slug: string;
  nom: string;
  objectifAnnuel: number;
  objectifTrimestre: number;
  plagesPubliees: number;
  visitesAdmissibles: number;
  volumeAnnuelFinal: number;
  progressionPlages: number;
  progressionVisites: number;
  visitesRestantes: number;
  ecartVisites: number;
  categorie: Categorie;
  portrait: {
    src: string;
    alt: string;
    temporaire: true;
  };
}

/** Sommaire collectif du GMF pour la période T17 en cours. */
export interface GapCollectif {
  periode: string;
  gmfNom: string;
  cibleTrimestrielle: number;
  plagesPublieesTotal: number;
  visitesAdmissiblesTotal: number;
  progressionPlages: number;
  progressionVisites: number;
  nombreMedecins: number;
  atteints: number;
  proches: number;
  aSuivre: number;
}
