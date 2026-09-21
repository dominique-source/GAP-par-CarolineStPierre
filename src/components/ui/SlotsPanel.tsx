"use client";

import { useEffect, useRef } from "react";
import { formatNombre } from "@/lib/format";
import styles from "./SlotsPanel.module.css";

interface SlotsPanelProps {
  nom: string;
  periode: string;
  objectifTrimestre: number;
  plagesPubliees: number;
  onClose: () => void;
}

/** Panneau « Voir mes plages » : objectif, plages publiées, écart, période T17. */
export function SlotsPanel({ nom, periode, objectifTrimestre, plagesPubliees, onClose }: SlotsPanelProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const ecart = plagesPubliees - objectifTrimestre;
  const cibleAtteinte = ecart >= 0;

  useEffect(() => {
    closeRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="slots-panel-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="slots-panel-title" className={styles.title}>
          Mes plages · {nom}
        </h2>
        <p className={`tnum ${styles.periode}`}>{periode}</p>

        <div className={styles.row}>
          <span className={styles.rowLabel}>Objectif de plages</span>
          <span className={`tnum ${styles.rowValue}`}>{formatNombre(objectifTrimestre)}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Plages publiées</span>
          <span className={`tnum ${styles.rowValue}`}>{formatNombre(plagesPubliees)}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Écart</span>
          <span className={`tnum ${styles.rowValue}`}>
            {ecart >= 0 ? "+" : ""}
            {formatNombre(ecart)}
          </span>
        </div>

        <p className={`${styles.statut} ${cibleAtteinte ? "" : styles.statutASuivre}`}>
          {cibleAtteinte ? "Cible atteinte" : "Cible non atteinte"}
        </p>

        <button ref={closeRef} type="button" className={styles.close} onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
}
