"use client";

import { useState } from "react";
import { PrimaryAction } from "@/components/ui/PrimaryAction";
import { SlotsPanel } from "@/components/ui/SlotsPanel";

interface SlotsButtonProps {
  nom: string;
  periode: string;
  objectifTrimestre: number;
  plagesPubliees: number;
}

export function SlotsButton({ nom, periode, objectifTrimestre, plagesPubliees }: SlotsButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PrimaryAction onClick={() => setOpen(true)}>Voir mes plages →</PrimaryAction>
      {open && (
        <SlotsPanel
          nom={nom}
          periode={periode}
          objectifTrimestre={objectifTrimestre}
          plagesPubliees={plagesPubliees}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
