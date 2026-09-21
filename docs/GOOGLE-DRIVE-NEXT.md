# Prochaine étape : source de données Google Sheets / Drive

Ce prototype lit les données T17 depuis un fichier CSV local
(`src/data/t17-medecins.csv`) via `LocalCsvGapDataProvider`
(`src/data/gap-data-provider.ts`), derrière l'interface `GapDataProvider`.
Une future implémentation peut lire un Google Sheet sans changer un seul
composant d'affichage : il suffit d'écrire une nouvelle classe qui
implémente `GapDataProvider` (`getDoctors`, `getDoctorBySlug`,
`getCollectif`) et de la brancher à la place de `LocalCsvGapDataProvider`.

## Données à synchroniser

- Une ligne par médecin : nom, objectif annuel, objectif trimestriel,
  plages publiées, visites admissibles, volume annuel final.
- La cible trimestrielle collective du GMF (actuellement la constante
  `CIBLE_TRIMESTRIELLE_GMF` — voir la note dans `gap-data-provider.ts` : ce
  n'est **pas** la somme des cibles individuelles, c'est un chiffre négocié
  séparément).
- Le chemin ou l'identifiant de la vraie photo de chaque médecin (pour
  remplacer les portraits temporaires — voir `assignPortrait` dans
  `gap-data-provider.ts`).

## Rôle du Google Sheet

Le Sheet devient la source de vérité éditable par Caroline (ou son équipe),
sans nécessiter un déploiement de code pour chaque mise à jour trimestrielle.
L'application lit le Sheet en lecture seule ; elle ne le modifie jamais.

## Fréquence de synchronisation possible

- T17 est une période fixe (trimestrielle) : une synchronisation manuelle ou
  automatique une fois par jour est largement suffisante.
- Pas besoin de temps réel : ces données ne changent pas pendant que le
  médecin consulte l'écran.

## Validations nécessaires avant la connexion

- Vérifier que la somme des plages publiées et des visites admissibles du
  Sheet correspond aux totaux publiés officiellement (7 096 / 6 752 pour T17).
- Valider le format des noms (accents, tirets) pour que la génération de
  slug (`slugify`) reste stable et unique.
- Définir qui a le droit d'éditer le Sheet source, et un processus de
  relecture avant publication.

## Corrections manuelles

- Prévoir une colonne « note » ou un onglet séparé dans le Sheet pour
  documenter une correction ponctuelle (ex. erreur de saisie RAMQ) sans
  perdre la traçabilité du chiffre d'origine.

## Historique

- Le Sheet (ou un export périodique) doit être versionné trimestre par
  trimestre (un onglet ou un fichier par période T) pour permettre de
  comparer l'évolution d'un médecin ou du GMF d'un trimestre à l'autre.

## Futur dashboard protégé de Caroline

- Un dashboard distinct, protégé par authentification, permettra à Caroline
  de voir des informations de gestion que les médecins ne voient pas
  (comparaisons individuelles détaillées, historique, corrections en
  attente de validation).
- Ce dashboard consommera la même interface `GapDataProvider`, avec des
  méthodes supplémentaires si nécessaire (ex. historique multi-trimestre).

## Avant une intégration RAMQ

- Confirmer le format exact des exports RAMQ (ou de l'outil intermédiaire
  utilisé par le GMF) et la correspondance des colonnes avec le schéma
  actuel (`Doctor` / `RawDoctorRow`).
- Clarifier les règles officielles de facturation et de calcul des cibles
  (actuellement fournies par Caroline St-Pierre pour ce prototype) pour
  s'assurer qu'elles sont appliquées de façon identique côté RAMQ et côté
  application.
- Définir la politique de confidentialité et de conservation des données
  avant de connecter une source contenant des données de facturation réelles.
