import Link from "next/link";
import Avatar from "@/components/Avatar";
import { Icon } from "@/components/icons";
import { ALLERGY_STYLES, type Kid } from "@/data/mock";

interface KidCardProps {
  kid: Kid;
}

export default function KidCard({ kid }: KidCardProps) {
  const parentCount = kid.parents.length;
  const subtitle =
    parentCount === 0
      ? "sin padres vinculados"
      : `${parentCount} ${parentCount === 1 ? "padre" : "padres"} vinculados`;

  return (
    <Link
      href={`/kids/${kid.id}`}
      className="flex items-center gap-[14px] rounded-[18px] bg-surface px-4 py-4 transition-all hover:-translate-y-0.5 hover:border-[#F2A78E]"
      style={{
        border: "1px solid var(--dc-line)",
        boxShadow: "0 4px 14px -12px rgba(120, 90, 60, 0.5)",
      }}
    >
      <Avatar
        avatar={{
          kind: "initials",
          initials: kid.initials,
          bg: kid.avatarBg,
          color: kid.avatarColor,
        }}
        size={48}
      />
      <div className="min-w-0 flex-1">
        <div
          className="font-fredoka font-semibold"
          style={{ fontSize: 16, color: "var(--dc-ink)" }}
        >
          {kid.name}
        </div>
        <div style={{ fontSize: 13, color: "var(--dc-ink-muted)" }}>
          {kid.age} años · {subtitle}
        </div>
      </div>
      {kid.allergies ? (
        <Badge bg="#FBD8CC" color="#D9684A">
          {ALLERGY_STYLES[kid.allergies.kind].badge}
        </Badge>
      ) : parentCount === 0 ? (
        <Badge bg="#F9D2DE" color="#C56486">
          VINCULAR
        </Badge>
      ) : (
        <Icon
          name="chevron-right"
          size={18}
          strokeWidth={2.2}
          style={{ flex: "none", color: "#CBB89F" }}
        />
      )}
    </Link>
  );
}

function Badge({
  bg,
  color,
  children,
}: {
  bg: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className="flex-none text-[11px] font-extrabold"
      style={{
        padding: "5px 9px",
        borderRadius: 999,
        background: bg,
        color,
      }}
    >
      {children}
    </span>
  );
}