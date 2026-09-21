"use client";

import { PrimaryAction } from "@/components/ui/PrimaryAction";

/** Met l'équipe au premier plan : déplace le focus clavier sur le premier portrait cliquable. */
export function FocusTeamButton() {
  return (
    <PrimaryAction
      onClick={() => {
        const grid = document.getElementById("equipe");
        const firstPortrait = grid?.querySelector<HTMLAnchorElement>("a");
        firstPortrait?.focus();
        firstPortrait?.scrollIntoView({ block: "center" });
      }}
    >
      Voir les médecins →
    </PrimaryAction>
  );
}
