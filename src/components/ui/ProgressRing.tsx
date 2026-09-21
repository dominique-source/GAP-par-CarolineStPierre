import { formatPourcent } from "@/lib/format";

interface ProgressRingProps {
  pourcentage: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  trackColor?: string;
  label: string;
  sousLabel?: string;
  valueClassName?: string;
}

/**
 * Anneau de progression en SVG natif, sans animation. La valeur est toujours
 * affichée en texte au centre (jamais uniquement par la couleur/forme de l'anneau).
 */
export function ProgressRing({
  pourcentage,
  size = 220,
  strokeWidth = 18,
  color,
  trackColor = "var(--gap-track-dark)",
  label,
  sousLabel,
  valueClassName,
}: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(100, pourcentage));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);
  const center = size / 2;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "grid",
        placeItems: "center",
      }}
      role="img"
      aria-label={`${label} : ${formatPourcent(pourcentage)}`}
    >
      <svg width={size} height={size} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
        <circle cx={center} cy={center} r={radius} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div style={{ textAlign: "center", padding: `0 ${strokeWidth + 6}px` }}>
        <div
          className={`tnum ${valueClassName ?? ""}`}
          style={{ fontSize: Math.round(size * 0.185), fontWeight: 800, lineHeight: 1, whiteSpace: "nowrap" }}
        >
          {formatPourcent(pourcentage)}
        </div>
        <div style={{ fontSize: Math.max(11, Math.round(size * 0.06)), fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 6, opacity: 0.85 }}>
          {label}
        </div>
        {sousLabel && (
          <div className="tnum" style={{ fontSize: Math.max(12, Math.round(size * 0.065)), fontWeight: 700, marginTop: 6 }}>
            {sousLabel}
          </div>
        )}
      </div>
    </div>
  );
}
