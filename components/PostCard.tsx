import Link from "next/link";
import Avatar from "@/components/Avatar";
import { Icon } from "@/components/icons";
import { KIND_STYLES, type Post } from "@/data/mock";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const kindStyle = KIND_STYLES[post.kind];

  return (
    <article
      className="rounded-[20px] bg-surface px-[22px] py-5"
      style={{
        border: "1px solid var(--dc-line)",
        boxShadow: "0 4px 16px -12px rgba(120, 90, 60, 0.5)",
      }}
    >
      <div className="mb-[14px] flex items-center gap-3">
        <Avatar avatar={post.avatar} size={44} />
        <div className="min-w-0 flex-1">
          <div
            className="font-fredoka font-semibold"
            style={{ fontSize: "16.5px", color: "var(--dc-ink)" }}
          >
            {post.author}
          </div>
          <div style={{ fontSize: "12.5px", color: "var(--dc-ink-muted)" }}>
            {post.meta}
          </div>
        </div>
        <div
          className="flex flex-none items-center gap-[7px] rounded-full px-3 py-1.5"
          style={{ background: kindStyle.badgeBg }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: kindStyle.dot }}
          />
          <span
            className="font-extrabold tracking-[0.5px]"
            style={{ fontSize: 12, color: kindStyle.dot }}
          >
            {kindStyle.label}
          </span>
        </div>
      </div>

      <div style={{ fontSize: "12.5px", color: "var(--dc-ink-muted)" }} className="mb-[10px]">
        {post.audience}
      </div>

      <p
        style={{
          fontSize: "15.5px",
          lineHeight: 1.55,
          color: "var(--dc-ink-body)",
        }}
        className="m-0"
      >
        {post.content}
      </p>

      {post.photo && (
        <Link
          href="/photo"
          className="mt-[14px] flex h-[200px] flex-col items-center justify-center gap-2 rounded-2xl"
          style={{
            border: "1.5px dashed var(--dc-line-dashed)",
            background: "var(--dc-surface-soft)",
            color: "var(--dc-ink-faint)",
          }}
        >
          <Icon name="photo" size={30} strokeWidth={1.7} />
          <span style={{ fontSize: "13.5px" }}>{post.photo.title}</span>
        </Link>
      )}

      <div
        className="mt-4 flex items-center gap-[18px] pt-[14px]"
        style={{ borderTop: "1px solid var(--dc-line-card)" }}
      >
        <span
          className="flex items-center gap-[7px] font-bold"
          style={{ fontSize: 14, color: "var(--dc-accent)" }}
        >
          <Icon name="heart" size={19} filled />
          {post.likes}
        </span>
        <Link
          href="/post-detail"
          className="flex items-center gap-[7px] font-bold"
          style={{ fontSize: 14, color: "var(--dc-ink-soft)" }}
        >
          <Icon name="comment" size={18} />
          {post.comments}
        </Link>
        <span className="flex-1" />
        <Link
          href="/create-post"
          className="font-extrabold"
          style={{ fontSize: 14, color: "var(--dc-accent-deep)" }}
        >
          Editar
        </Link>
      </div>
    </article>
  );
}