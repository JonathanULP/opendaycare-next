import Link from "next/link";
import Avatar from "@/components/Avatar";
import type { AvatarData } from "@/data/mock";
import { NOTICE_KINDS, type Notice } from "@/data/mock";

interface NoticeRowProps {
  notice: Notice;
}

const rowClassName =
  "flex items-start gap-[13px] rounded-[16px] bg-surface px-[18px] py-4";

const rowStyle = { border: "1px solid var(--dc-line)" } as const;

export default function NoticeRow({ notice }: NoticeRowProps) {
  const kind = NOTICE_KINDS[notice.kind];

  const avatar: AvatarData = kind.icon
    ? { kind: "icon", icon: kind.icon, bg: kind.bg, color: kind.color }
    : {
        kind: "initials",
        initials: notice.actor?.initials ?? "",
        bg: kind.bg,
        color: kind.color,
      };

  const body = (
    <>
      <Avatar avatar={avatar} size={40} />
      <div className="min-w-0 flex-1">
        <div style={{ fontSize: "14.5px", color: "var(--dc-ink-body)" }}>
          {notice.actor ? (
            <>
              <b>{notice.actor.name}</b> {notice.text}
            </>
          ) : (
            <>
              {notice.text} <b>{notice.highlight}</b> {notice.trailing}
            </>
          )}
        </div>
        <div
          style={{
            fontSize: "12.5px",
            color: "var(--dc-ink-muted)",
            marginTop: "3px",
          }}
        >
          {notice.time}
        </div>
      </div>
    </>
  );

  if (notice.href) {
    return (
      <Link href={notice.href} className={rowClassName} style={rowStyle}>
        {body}
      </Link>
    );
  }

  return (
    <div className={rowClassName} style={rowStyle}>
      {body}
    </div>
  );
}