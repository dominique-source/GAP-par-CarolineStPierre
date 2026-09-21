# Prompt pour Claude

Tu travailles dans le dépôt suivant:

https://github.com/dominique-source/GAP-par-CarolineStPierre.git

Avant de modifier quoi que ce soit:

1. Inspecte toute la structure du dépôt.
2. Lis les fichiers de configuration, les dépendances, les composants et les styles existants.
3. Exécute le projet localement.
4. Présente un plan court des fichiers que tu vas modifier.
5. Ne supprime aucune fonction existante sans expliquer pourquoi.

## Objectif

Construire le premier prototype desktop de « GAP par Caroline St-Pierre » pour le GMF Place de la Cité à Québec.

La plateforme doit permettre à un médecin de comprendre rapidement:

- sa cible GAP;
- ses plages publiées;
- ses visites admissibles;
- le nombre restant;
- la situation collective du GMF;
- l’action à accomplir maintenant.

Le produit doit aussi préparer une future plateforme de communication, de recrutement, de gestion et de facturation pour les GMF.

## Références obligatoires

Analyse les fichiers fournis avec ce prompt:

- `mockups/01-mon-gap-yves.png`
- `mockups/02-gap-pour-tous.png`
- `docs/DESIGN-SYSTEM.md`
- `data/t17-medecins.csv`
- `source/Facturation-GAP-T17.pdf`

Les deux PNG représentent la direction visuelle approuvée. Reproduis leur qualité, leur hiérarchie, leurs proportions et leurs couleurs. Ne retourne pas vers un tableau administratif beige ou une grille générique de logiciel SaaS.

## Pages à construire en premier

### 1. GAP pour tous

Afficher sans défilement:

- 100,7 % de plages publiées;
- 7 096 plages publiées sur une cible de 7 046;
- 95,8 % de visites admissibles;
- 6 752 visites sur 7 046;
- 19 médecins;
- 8 atteints;
- 8 proches;
- 3 à suivre;
- les portraits de l’équipe;
- un seul appel à l’action: « Voir les médecins ».

Un clic sur un médecin ouvre sa page personnelle.

### 2. Mon GAP

Construire le composant avec des données dynamiques. La référence visuelle montre Yves Bolduc:

- objectif trimestriel: 1 000;
- plages publiées: 1 001;
- visites admissibles: 937;
- progression des visites: 93,7 %;
- visites restantes: 63;
- objectif annuel initial: 5 000;
- volume annuel final après redistribution: 5 005;
- comparaison GMF: 100,7 % de plages et 95,8 % de visites;
- appel à l’action unique: « Voir mes plages ».

Les données des autres médecins se trouvent dans `data/t17-medecins.csv`.

## Règles d’expérience

- Desktop en premier.
- Aucun défilement sur les deux écrans GAP.
- Aucun mouvement ou animation.
- Maximum deux clics.
- Un seul bouton principal par écran.
- Très peu de texte.
- Grands chiffres.
- Graphiques lisibles instantanément.
- Visages visibles.
- Contraste élevé.
- Responsive prévu dans la structure, mais ne réalise pas encore la version mobile.
- Aucune donnée patient nominative.
- Les pages des médecins restent sans mot de passe dans ce prototype.
- Prévoir une architecture qui permettra plus tard une connexion Google Drive et un dashboard protégé pour Caroline.

## Portraits

Les images fournies sont des portraits fictifs temporaires. Ajoute un mécanisme simple pour remplacer chaque portrait par la vraie photo du médecin. Ne présente jamais ces portraits comme authentiques.

## Données et logique

- Place les données T17 dans une structure centrale typée.
- Ne duplique pas les chiffres dans plusieurs composants.
- Calcule les pourcentages à partir des valeurs sources.
- Sépare les données brutes, les calculs et l’affichage.
- Prépare un adaptateur futur pour Google Sheets ou Google Drive.
- N’implémente aucune connexion externe dans cette première étape.

## Qualité attendue

- Respecte les conventions du dépôt.
- Composants réutilisables.
- Noms clairs.
- TypeScript si le dépôt le permet.
- Accessibilité clavier.
- Contrastes conformes.
- Aucune erreur dans la console.
- Aucun contenu inventé présenté comme une donnée officielle.
- Tests des calculs principaux.

## Livrable demandé

1. Implémente les deux écrans.
2. Ajoute les données T17.
3. Ajoute les portraits temporaires avec une mention claire dans le code.
4. Vérifie le rendu desktop aux formats 1440 × 900 et 1600 × 1000.
5. Fournis des captures PNG finales.
6. Résume les fichiers modifiés.
7. Liste les décisions qui devront être validées par Caroline avant la connexion Google Drive.

Commence par l’audit du dépôt et le plan. Attends mon approbation avant d’écrire le code.
