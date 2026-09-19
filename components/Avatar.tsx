import { Icon } from "@/components/icons";
import type { AvatarData } from "@/data/mock";

interface AvatarProps {
  avatar: AvatarData;
  size?: number;
  className?: string;
}

export default function Avatar({
  avatar,
  size = 44,
  className,
}: AvatarProps) {
  return (
    <div
      className={`flex flex-none items-center justify-center rounded-full font-fredoka font-semibold ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        background: avatar.bg,
        color: avatar.color,
        fontSize: size * 0.38,
      }}
    >
      {avatar.kind === "icon" ? (
        <Icon name="megaphone" size={size * 0.45} />
      ) : (
        avatar.initials
      )}
    </div>
  );
}