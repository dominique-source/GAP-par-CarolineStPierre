import Link from "next/link";
import styles from "./PrimaryAction.module.css";

interface PrimaryActionBaseProps {
  children: React.ReactNode;
  variant?: "mint" | "dark";
}

type PrimaryActionProps =
  | (PrimaryActionBaseProps & { href: string; onClick?: never })
  | (PrimaryActionBaseProps & { href?: never; onClick: () => void });

/** L'unique bouton d'action principal d'un écran GAP. Rendu comme lien ou comme bouton. */
export function PrimaryAction({ children, variant = "mint", ...rest }: PrimaryActionProps) {
  const className = `${styles.action} ${variant === "dark" ? styles.actionDark : ""}`;
  if ("href" in rest && rest.href) {
    return (
      <Link href={rest.href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={className} onClick={"onClick" in rest ? rest.onClick : undefined}>
      {children}
    </button>
  );
}
