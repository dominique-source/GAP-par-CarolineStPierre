# GAP par Caroline St-Pierre

Prototype fonctionnel du suivi GAP (facturation T17) pour le GMF Place de la
Cité. Next.js (App Router, TypeScript).

## Développement

```bash
npm install
npm run dev
```

- `npm run build` — build de production.
- `npm run lint` — ESLint.
- `npm run test` — tests unitaires (Vitest).

## Structure

- `src/data/t17-medecins.csv` — source de données des 19 médecins (T17).
- `src/data/gap-data-provider.ts` — lecture du CSV + calculs, derrière
  l'interface `GapDataProvider` (voir `docs/GOOGLE-DRIVE-NEXT.md` pour la
  suite Google Sheets/Drive).
- `src/lib/gap-calculations.ts` — formules de progression, écart, catégorie.
- `src/components/gap/` — écrans « GAP du GMF » (`/`) et « Mon GAP »
  (`/medecins/[slug]`).
- `src/components/ui/` — primitives réutilisables (anneau de progression,
  portraits, bouton d'action principal, panneau « Voir mes plages », etc.).
- `public/portraits/` — portraits **temporaires et fictifs**, découpés de
  l'atlas de démonstration fourni. À remplacer par les vraies photos.
- `_reference/gap-design-package/` — maquettes PNG/SVG approuvées, données
  source et règles fonctionnelles fournies en préparation (non modifié).

## Routes

- `/` — GAP du GMF (vue collective).
- `/medecins/[slug]` — GAP personnel d'un médecin (ex. `/medecins/yves-bolduc`).

Le prototype est marqué `noindex, nofollow` et n'est protégé par aucune
authentification (voir `docs/GOOGLE-DRIVE-NEXT.md` pour la suite prévue).
