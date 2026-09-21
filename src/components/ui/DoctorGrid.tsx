import type { Doctor } from "@/types/gap";
import { DoctorPortrait } from "./DoctorPortrait";
import styles from "./DoctorGrid.module.css";

interface DoctorGridProps {
  doctors: Doctor[];
}

export function DoctorGrid({ doctors }: DoctorGridProps) {
  return (
    <div className={styles.card}>
      <div className={styles.grid}>
        {doctors.map((doctor) => (
          <DoctorPortrait key={doctor.id} doctor={doctor} />
        ))}
      </div>
      <p className={styles.caption}>
        {doctors.length} visages · une équipe
      </p>
    </div>
  );
}
