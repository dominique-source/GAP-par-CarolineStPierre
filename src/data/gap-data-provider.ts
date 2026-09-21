import fs from "node:fs";
import path from "node:path";
import { categoriser, ecartVisites, progressionPlages, progressionVisites, visitesRestantes } from "@/lib/gap-calculations";
import { slugify } from "@/lib/slug";
import type { Doctor, GapCollectif, RawDoctorRow } from "@/types/gap";

/**
 * Cible trimestrielle collective négociée pour le GMF (T17). Ce n'est PAS la somme des
 * cibles individuelles (celles-ci totalisent 6 691 -- des redistributions internes font
 * que la cible publiée du groupe diffère de la somme brute). Valeur fournie par la
 * source de préparation (docs/CLAUDE-PROMPT.md), à valider par Caroline St-Pierre.
 */
const CIBLE_TRIMESTRIELLE_GMF = 7046;
const GMF_NOM = "GMF Place de la Cité";
const PERIODE = "T17 · juin-août 2026";

const ATLAS_TILE_COUNT = 20;
const YVES_SLUG = "yves-bolduc";

/**
 * Fournit les données GAP du GMF. L'implémentation actuelle lit un CSV local
 * (`src/data/t17-medecins.csv`). Une future implémentation Google Sheets/Drive
 * peut respecter la même interface sans changer les composants d'affichage.
 */
export interface GapDataProvider {
  getDoctors(): Doctor[];
  getDoctorBySlug(slug: string): Doctor | undefined;
  getCollectif(): GapCollectif;
}

function parseCsv(raw: string): RawDoctorRow[] {
  const [headerLine, ...lines] = raw.trim().split(/\r?\n/);
  const headers = headerLine.split(",");
  return lines
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      const cells = line.split(",");
      const row = Object.fromEntries(headers.map((h, i) => [h, cells[i]])) as Record<string, string>;
      return {
        medecin: row.medecin,
        objectif_annuel: Number(row.objectif_annuel),
        objectif_trimestre: Number(row.objectif_trimestre),
        plages_publiees: Number(row.plages_publiees),
        visites_admissibles: Number(row.visites_admissibles),
        ecart_visites: Number(row.ecart_visites),
        volume_annuel_final: Number(row.volume_annuel_final),
      };
    });
}

/**
 * Portrait temporaire assigné à chaque médecin. Provient d'un atlas de visages fictifs
 * (voir _reference/gap-design-package) -- aucun ne représente le vrai médecin. Yves
 * Bolduc, le profil de démonstration, utilise son portrait dédié de la maquette; les
 * autres médecins piochent dans l'atlas par index stable (dérivé de leur position dans
 * le CSV), en sautant la tuile qui correspond visuellement à Yves.
 */
function assignPortrait(slug: string, indexInCsv: number): Doctor["portrait"] {
  if (slug === YVES_SLUG) {
    return { src: "/portraits/yves-bolduc.jpg", alt: "Portrait temporaire de Yves Bolduc", temporaire: true };
  }
  const skippedTile = 1; // tuile utilisée par le portrait dédié de Yves dans l'atlas
  let tile = indexInCsv % ATLAS_TILE_COUNT;
  if (tile >= skippedTile) tile += 1;
  tile = tile % ATLAS_TILE_COUNT;
  return {
    src: `/portraits/atlas-${String(tile).padStart(2, "0")}.jpg`,
    alt: "Portrait temporaire du médecin (visage fictif, pour démonstration uniquement)",
    temporaire: true,
  };
}

function toDoctor(row: RawDoctorRow, indexInCsv: number): Doctor {
  const slug = slugify(row.medecin);
  const ecart = ecartVisites(row.visites_admissibles, row.objectif_trimestre);
  return {
    id: slug,
    slug,
    nom: row.medecin,
    objectifAnnuel: row.objectif_annuel,
    objectifTrimestre: row.objectif_trimestre,
    plagesPubliees: row.plages_publiees,
    visitesAdmissibles: row.visites_admissibles,
    volumeAnnuelFinal: row.volume_annuel_final,
    progressionPlages: progressionPlages(row.plages_publiees, row.objectif_trimestre),
    progressionVisites: progressionVisites(row.visites_admissibles, row.objectif_trimestre),
    visitesRestantes: visitesRestantes(row.visites_admissibles, row.objectif_trimestre),
    ecartVisites: ecart,
    categorie: categoriser(ecart),
    portrait: assignPortrait(slug, indexInCsv),
  };
}

let cachedDoctors: Doctor[] | null = null;

class LocalCsvGapDataProvider implements GapDataProvider {
  getDoctors(): Doctor[] {
    if (cachedDoctors) return cachedDoctors;
    const csvPath = path.join(process.cwd(), "src/data/t17-medecins.csv");
    const raw = fs.readFileSync(csvPath, "utf-8");
    cachedDoctors = parseCsv(raw).map(toDoctor);
    return cachedDoctors;
  }

  getDoctorBySlug(slug: string): Doctor | undefined {
    return this.getDoctors().find((d) => d.slug === slug);
  }

  getCollectif(): GapCollectif {
    const doctors = this.getDoctors();
    const plagesPublieesTotal = doctors.reduce((sum, d) => sum + d.plagesPubliees, 0);
    const visitesAdmissiblesTotal = doctors.reduce((sum, d) => sum + d.visitesAdmissibles, 0);
    return {
      periode: PERIODE,
      gmfNom: GMF_NOM,
      cibleTrimestrielle: CIBLE_TRIMESTRIELLE_GMF,
      plagesPublieesTotal,
      visitesAdmissiblesTotal,
      progressionPlages: progressionPlages(plagesPublieesTotal, CIBLE_TRIMESTRIELLE_GMF),
      progressionVisites: progressionVisites(visitesAdmissiblesTotal, CIBLE_TRIMESTRIELLE_GMF),
      nombreMedecins: doctors.length,
      atteints: doctors.filter((d) => d.categorie === "atteint").length,
      proches: doctors.filter((d) => d.categorie === "proche").length,
      aSuivre: doctors.filter((d) => d.categorie === "a-suivre").length,
    };
  }
}

export const gapDataProvider: GapDataProvider = new LocalCsvGapDataProvider();
