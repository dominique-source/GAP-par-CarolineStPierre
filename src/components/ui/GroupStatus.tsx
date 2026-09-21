import type { GapCollectif } from "@/types/gap";

const ROWS: Array<{ key: keyof Pick<GapCollectif, "atteints" | "proches" | "aSuivre">; label: string; color: string }> = [
  { key: "atteints", label: "atteints", color: "var(--gap-positive)" },
  { key: "proches", label: "proches", color: "var(--gap-amber)" },
  { key: "aSuivre", label: "à suivre", color: "var(--gap-coral)" },
];

export function GroupStatus({ collectif }: { collectif: GapCollectif }) {
  return (
    <div
      style={{
        background: "var(--gap-night-2)",
        borderRadius: "var(--gap-radius)",
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        minWidth: 220,
      }}
    >
      <p style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--gap-slate)" }}>
        {collectif.nombreMedecins} médecins
      </p>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
        {ROWS.map(({ key, label, color }) => (
          <li key={key} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              aria-hidden
              style={{ width: 16, height: 16, borderRadius: "50%", background: color, flexShrink: 0 }}
            />
            <span className="tnum" style={{ fontSize: "1.5rem", fontWeight: 800 }}>
              {collectif[key]}
            </span>
            <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--gap-white)" }}>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
