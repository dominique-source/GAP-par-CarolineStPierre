const nombreFr = new Intl.NumberFormat("fr-CA");
const pourcentFr = new Intl.NumberFormat("fr-CA", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

/** Formate un entier au format québécois (ex. 7096 -> "7 096"). */
export function formatNombre(valeur: number): string {
  return nombreFr.format(Math.round(valeur));
}

/** Formate un pourcentage à une décimale, virgule française (ex. 100.7 -> "100,7 %"). */
export function formatPourcent(valeur: number): string {
  return `${pourcentFr.format(valeur)} %`;
}
