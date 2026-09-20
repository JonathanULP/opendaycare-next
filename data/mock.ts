import type { IconName } from "@/components/icons";

export type PostKind = "achievement" | "activity" | "announcement";

export const KIND_STYLES: Record<
  PostKind,
  { label: string; badgeBg: string; dot: string }
> = {
  achievement: { label: "LOGRO", badgeBg: "#CFEBD8", dot: "#3E9B6C" },
  activity: { label: "ACTIVIDAD", badgeBg: "#C7E7F1", dot: "#2E89A6" },
  announcement: { label: "ANUNCIO", badgeBg: "#CCD8F4", dot: "#4E72C8" },
};

export interface AvatarData {
  kind: "initials" | "icon";
  initials?: string;
  icon?: "megaphone";
  bg: string;
  color: string;
}

export interface Post {
  id: string;
  author: string;
  avatar: AvatarData;
  meta: string;
  kind: PostKind;
  audience: string;
  content: string;
  photo?: { title: string };
  likes: number;
  comments: number;
}

export const currentUser = {
  name: "Caro Giménez",
  role: "Maestra · Soles",
  initials: "C",
  avatarBg: "#F2937A",
};

export const posts: Post[] = [
  {
    id: "post-1",
    author: "Mateo",
    avatar: { kind: "initials", initials: "M", bg: "#A9D9E8", color: "#1F7A93" },
    meta: "14:20 · publicado por vos",
    kind: "achievement",
    audience: "Para: familia de Mateo",
    content:
      "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    likes: 3,
    comments: 1,
  },
  {
    id: "post-2",
    author: "Mateo",
    avatar: { kind: "initials", initials: "M", bg: "#A9D9E8", color: "#1F7A93" },
    meta: "09:40 · publicado por vos",
    kind: "activity",
    audience: "Para: familia de Mateo",
    content:
      "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    photo: { title: "Foto · pintando con témperas" },
    likes: 5,
    comments: 2,
  },
  {
    id: "post-3",
    author: "Anuncio general",
    avatar: {
      kind: "icon",
      icon: "megaphone",
      bg: "#CCD8F4",
      color: "#4E72C8",
    },
    meta: "07:50 · publicado por vos",
    kind: "announcement",
    audience: "Para: toda la sala",
    content:
      "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    likes: 8,
    comments: 0,
  },
];

export interface NavItem {
  href: string;
  label: string;
  icon: IconName;
  active: boolean;
}

export const navItems: NavItem[] = [
  { href: "/", label: "Feed", icon: "home", active: true },
  { href: "/kids", label: "Niños", icon: "children", active: false },
  { href: "/notices", label: "Avisos", icon: "bell", active: false },
  { href: "/my-account", label: "Mi cuenta", icon: "user", active: false },
];