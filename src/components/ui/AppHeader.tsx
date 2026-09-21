import styles from "./AppHeader.module.css";

interface AppHeaderProps {
  gmfNom: string;
  periode: string;
}

export function AppHeader({ gmfNom, periode }: AppHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.mark} aria-hidden>
          C
        </span>
        <div>
          <p className={styles.gmfName}>{gmfNom.toUpperCase()}</p>
          <p className={styles.gapLabel}>GAP · PAR CAROLINE ST-PIERRE</p>
        </div>
      </div>
      <p className={`tnum ${styles.periode}`}>{periode.toUpperCase()}</p>
    </header>
  );
}
