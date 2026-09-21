import Image from "next/image";
import Link from "next/link";
import type { Doctor } from "@/types/gap";
import styles from "./DoctorPortrait.module.css";

interface DoctorPortraitProps {
  doctor: Doctor;
  linked?: boolean;
}

export function DoctorPortrait({ doctor, linked = true }: DoctorPortraitProps) {
  const frame = (
    <div className={styles.frame}>
      <Image
        src={doctor.portrait.src}
        alt={doctor.portrait.alt}
        fill
        sizes="120px"
        className={styles.img}
        style={{ objectFit: "cover" }}
        unoptimized
      />
    </div>
  );

  if (!linked) return frame;

  return (
    <Link
      href={`/medecins/${doctor.slug}`}
      className={styles.link}
      aria-label={`Voir la page GAP de ${doctor.nom}`}
    >
      {frame}
    </Link>
  );
}
