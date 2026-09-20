import Link from "next/link";
import Avatar from "@/components/Avatar";
import { Icon } from "@/components/icons";
import { currentUser } from "@/data/mock";

export default function FeedComposer() {
  return (
    <Link
      href="/create-post"
      className="mb-6 flex items-center gap-[14px] rounded-[18px] bg-surface px-[18px] py-[14px]"
      style={{
        border: "1px solid var(--dc-line)",
        boxShadow: "0 4px 14px -10px rgba(120, 90, 60, 0.4)",
      }}
    >
      <Avatar
        avatar={{
          kind: "initials",
          initials: currentUser.initials,
          bg: currentUser.avatarBg,
          color: "#fff",
        }}
        size={40}
      />
      <span
        className="flex-1"
        style={{ fontSize: 15, color: "var(--dc-ink-muted)" }}
      >
        Compartí un momento…
      </span>
      <span
        className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-xl"
        style={{
          background: "var(--dc-accent-surface)",
          color: "var(--dc-accent)",
        }}
      >
        <Icon name="camera" size={19} />
      </span>
    </Link>
  );
}