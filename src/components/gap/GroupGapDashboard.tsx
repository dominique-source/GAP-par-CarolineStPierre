import { AppHeader } from "@/components/ui/AppHeader";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { GroupStatus } from "@/components/ui/GroupStatus";
import { DoctorGrid } from "@/components/ui/DoctorGrid";
import { FocusTeamButton } from "./FocusTeamButton";
import { formatNombre, formatPourcent } from "@/lib/format";
import type { Doctor, GapCollectif } from "@/types/gap";
import styles from "./GroupGapDashboard.module.css";

interface GroupGapDashboardProps {
  collectif: GapCollectif;
  doctors: Doctor[];
}

export function GroupGapDashboard({ collectif, doctors }: GroupGapDashboardProps) {
  return (
    <div className={styles.screen}>
      <AppHeader gmfNom={collectif.gmfNom} periode={collectif.periode} />

      <div className={styles.main}>
        <div className={styles.plagesCol}>
          <p className={styles.eyebrow}>GAP du GMF</p>
          <div>
            <div className={`tnum ${styles.plagesValue}`}>{formatPourcent(collectif.progressionPlages)}</div>
            <p className={styles.plagesLabel}>Plages publiées</p>
            <p className={`tnum ${styles.plagesFraction}`}>
              {formatNombre(collectif.plagesPublieesTotal)} / {formatNombre(collectif.cibleTrimestrielle)}
            </p>
          </div>
          <div className={styles.ringWrap}>
            <ProgressRing
              pourcentage={collectif.progressionVisites}
              color="var(--gap-cobalt)"
              label="Visites"
              sousLabel={`${formatNombre(collectif.visitesAdmissiblesTotal)} / ${formatNombre(collectif.cibleTrimestrielle)}`}
              size={230}
            />
          </div>
        </div>

        <div style={{ marginTop: "clamp(60px, 14vh, 140px)" }}>
          <GroupStatus collectif={collectif} />
        </div>

        <div className={styles.portraitCol} id="equipe">
          <DoctorGrid doctors={doctors} />
          <div className={styles.actionRow}>
            <FocusTeamButton />
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <p className={styles.signature}>Une expérience by Dominique Soucy</p>
        <p className={styles.slogan}>100 % pour le patient</p>
      </div>
    </div>
  );
}
