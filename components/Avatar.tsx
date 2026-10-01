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
  const icon = avatar.icon;

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
      {avatar.kind === "icon" && icon ? (
        <Icon name={icon} size={size * 0.45} filled={icon === "heart"} />
      ) : (
        avatar.initials
      )}
    </div>
  );
}