import Link from "next/link";

export default function MedecinNotFound() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        background: "var(--gap-night)",
        color: "var(--gap-white)",
        textAlign: "center",
        padding: 24,
      }}
    >
      <p style={{ fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--gap-coral)" }}>
        Médecin introuvable
      </p>
      <h1 style={{ fontFamily: "var(--gap-font-serif)", fontSize: "2rem" }}>Ce profil n&apos;existe pas</h1>
      <p style={{ color: "var(--gap-slate)" }}>Vérifiez le lien ou revenez au GAP du GMF.</p>
      <Link
        href="/"
        style={{
          marginTop: 12,
          minHeight: 44,
          display: "inline-flex",
          alignItems: "center",
          padding: "0 28px",
          borderRadius: 999,
          background: "var(--gap-mint)",
          color: "var(--gap-night)",
          fontWeight: 800,
        }}
      >
        Voir le GAP du GMF
      </Link>
    </div>
  );
}
