import Image from "next/image";
import Link from "next/link";
import { AppHeader } from "@/components/ui/AppHeader";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { TemporaryPortraitNotice } from "@/components/ui/TemporaryPortraitNotice";
import { SlotsButton } from "./SlotsButton";
import { formatNombre, formatPourcent } from "@/lib/format";
import type { Doctor, GapCollectif } from "@/types/gap";
import styles from "./PersonalGapDashboard.module.css";

interface PersonalGapDashboardProps {
  doctor: Doctor;
  collectif: GapCollectif;
}

export function PersonalGapDashboard({ doctor, collectif }: PersonalGapDashboardProps) {
  return (
    <div className={styles.screen}>
      <AppHeader gmfNom={collectif.gmfNom} periode={collectif.periode} />

      <div className={styles.main}>
        <div className={styles.portraitFrame}>
          <Image
            src={doctor.portrait.src}
            alt={doctor.portrait.alt}
            fill
            sizes="320px"
            style={{ objectFit: "cover" }}
            unoptimized
          />
          <span className={styles.portraitBadge} aria-hidden />
        </div>

        <div className={styles.ringCell}>
          <ProgressRing
            pourcentage={doctor.progressionVisites}
            color="var(--gap-coral)"
            trackColor="var(--gap-track-light)"
            label="Visites"
            sousLabel={`${formatNombre(doctor.visitesAdmissibles)} / ${formatNombre(doctor.objectifTrimestre)}`}
            size={260}
          />
        </div>

        <div className={styles.gmfCard}>
          <p className={styles.gmfEyebrow}>Le GMF</p>
          <div className={styles.gmfBody}>
            <ProgressRing
              pourcentage={collectif.progressionVisites}
              color="var(--gap-mint)"
              trackColor="rgba(244, 247, 255, 0.25)"
              label="Visites"
              size={150}
              strokeWidth={12}
            />
            <div className={styles.gmfMetrics}>
              <div>
                <p className={styles.gmfMetricLabel}>Plages</p>
                <p className={`tnum ${styles.gmfMetricValue}`}>{formatPourcent(collectif.progressionPlages)}</p>
                <div className={styles.gmfBar}>
                  <div
                    className={styles.gmfBarFill}
                    style={{ width: `${Math.min(100, collectif.progressionPlages)}%` }}
                  />
                </div>
              </div>
              <div>
                <p className={styles.gmfMetricLabel}>Visites</p>
                <p className="tnum" style={{ fontWeight: 800, fontSize: "1.15rem" }}>
                  {formatNombre(collectif.visitesAdmissiblesTotal)} / {formatNombre(collectif.cibleTrimestrielle)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.nameCell}>
          <p style={{ fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--gap-cobalt)" }}>
            Mon GAP
          </p>
          <p className={styles.name}>{doctor.nom}</p>
          <p className={styles.role}>Médecin de famille</p>
          <TemporaryPortraitNotice />
        </div>

        <div className={styles.todoCell}>
          <p className={styles.todoEyebrow}>À faire</p>
          <p className={`tnum ${styles.todoNumber}`}>{formatNombre(doctor.visitesRestantes)}</p>
          <div className={styles.todoText}>
            <p className={styles.todoLabel}>Visites à compléter</p>
            <p className={styles.todoNote}>
              {doctor.progressionPlages >= 100 ? "Vos plages sont suffisantes." : "Publiez davantage de plages."}
            </p>
          </div>
          <SlotsButton
            nom={doctor.nom}
            periode={collectif.periode}
            objectifTrimestre={doctor.objectifTrimestre}
            plagesPubliees={doctor.plagesPubliees}
          />
        </div>
      </div>

      <div style={{ padding: "0 clamp(24px, 4vw, 48px) 18px" }}>
        <Link href="/" className={styles.gapLink}>
          ← GAP du GMF
        </Link>
      </div>
    </div>
  );
}
