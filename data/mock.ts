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

export type AvatarIconName = Extract<
  IconName,
  "megaphone" | "check" | "heart" | "bell"
>;

export interface AvatarData {
  kind: "initials" | "icon";
  initials?: string;
  icon?: AvatarIconName;
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

export type ParentStatus = "active" | "pending";

export interface Room {
  name: string;
  short: string;
}

export const rooms: Room[] = [{ name: "Sala Soles", short: "Soles" }];

export type AllergyKind = "peanut" | "lactose";

export const ALLERGY_STYLES: Record<
  AllergyKind,
  { badge: string; bannerBg: string; bannerColor: string }
> = {
  peanut: { badge: "MANÍ", bannerBg: "#FBE3D8", bannerColor: "#D9583C" },
  lactose: { badge: "LACTOSA", bannerBg: "#F9EDCF", bannerColor: "#B5871E" },
};

export interface KidParent {
  name: string;
  role: string;
  status: ParentStatus;
  initials: string;
  avatarBg: string;
  avatarColor: string;
}

export interface Kid {
  id: string;
  name: string;
  age: number;
  room: string;
  roomShort: string;
  birthDate: string;
  admission: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
  allergies?: { kind: AllergyKind; note: string };
  medicalNotes?: string;
  parents: KidParent[];
}

export const kids: Kid[] = [
  {
    id: "mateo-fernandez",
    name: "Mateo Fernández",
    age: 3,
    room: "Sala Soles",
    roomShort: "Soles",
    birthDate: "12 mar 2022",
    admission: "feb 2025",
    initials: "M",
    avatarBg: "#A9D9E8",
    avatarColor: "#1F7A93",
    allergies: {
      kind: "peanut",
      note: "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
    },
    parents: [
      {
        name: "Lucía Fernández",
        role: "Mamá",
        status: "active",
        initials: "L",
        avatarBg: "#C9B6E8",
        avatarColor: "#fff",
      },
      {
        name: "Diego Fernández",
        role: "Papá",
        status: "pending",
        initials: "D",
        avatarBg: "#A9C7E8",
        avatarColor: "#fff",
      },
    ],
  },
  {
    id: "sofia-mendez",
    name: "Sofía Méndez",
    age: 2,
    room: "Sala Soles",
    roomShort: "Soles",
    birthDate: "05 oct 2023",
    admission: "feb 2025",
    initials: "S",
    avatarBg: "#F4B8CC",
    avatarColor: "#C44A7A",
    parents: [
      {
        name: "Camila Méndez",
        role: "Mamá",
        status: "active",
        initials: "C",
        avatarBg: "#A9C7E8",
        avatarColor: "#fff",
      },
    ],
  },
  {
    id: "benjamin-ruiz",
    name: "Benjamín Ruiz",
    age: 3,
    room: "Sala Soles",
    roomShort: "Soles",
    birthDate: "18 jul 2022",
    admission: "mar 2025",
    initials: "B",
    avatarBg: "#B9DEC4",
    avatarColor: "#3E8B62",
    parents: [
      {
        name: "Valeria Ruiz",
        role: "Mamá",
        status: "active",
        initials: "V",
        avatarBg: "#F4B8CC",
        avatarColor: "#fff",
      },
      {
        name: "Martín Ruiz",
        role: "Papá",
        status: "active",
        initials: "M",
        avatarBg: "#C9B6E8",
        avatarColor: "#fff",
      },
    ],
  },
  {
    id: "valentina-soto",
    name: "Valentina Soto",
    age: 2,
    room: "Sala Soles",
    roomShort: "Soles",
    birthDate: "23 ene 2024",
    admission: "feb 2025",
    initials: "V",
    avatarBg: "#F4DC8E",
    avatarColor: "#9A7B1E",
    parents: [],
  },
  {
    id: "tomas-diaz",
    name: "Tomás Díaz",
    age: 3,
    room: "Sala Soles",
    roomShort: "Soles",
    birthDate: "07 abr 2022",
    admission: "feb 2025",
    initials: "T",
    avatarBg: "#C9B6E8",
    avatarColor: "#7B5FC0",
    allergies: {
      kind: "lactose",
      note: "Intolerancia a la lactosa. Sustituir lácteos por alternativas sin lactosa.",
    },
    parents: [
      {
        name: "Paula Díaz",
        role: "Mamá",
        status: "active",
        initials: "P",
        avatarBg: "#B9DEC4",
        avatarColor: "#fff",
      },
    ],
  },
  {
    id: "emma-castro",
    name: "Emma Castro",
    age: 2,
    room: "Sala Soles",
    roomShort: "Soles",
    birthDate: "14 nov 2023",
    admission: "mar 2025",
    initials: "E",
    avatarBg: "#F4B8CC",
    avatarColor: "#C44A7A",
    parents: [
      {
        name: "Julián Castro",
        role: "Papá",
        status: "active",
        initials: "J",
        avatarBg: "#A9D9E8",
        avatarColor: "#fff",
      },
    ],
  },
  {
    id: "lucas-romero",
    name: "Lucas Romero",
    age: 3,
    room: "Sala Soles",
    roomShort: "Soles",
    birthDate: "02 may 2022",
    admission: "feb 2025",
    initials: "L",
    avatarBg: "#A9D9E8",
    avatarColor: "#1F7A93",
    parents: [
      {
        name: "Florencia Romero",
        role: "Mamá",
        status: "active",
        initials: "F",
        avatarBg: "#F4DC8E",
        avatarColor: "#fff",
      },
    ],
  },
  {
    id: "olivia-vega",
    name: "Olivia Vega",
    age: 2,
    room: "Sala Soles",
    roomShort: "Soles",
    birthDate: "28 feb 2024",
    admission: "mar 2025",
    initials: "O",
    avatarBg: "#B9DEC4",
    avatarColor: "#3E8B62",
    parents: [
      {
        name: "Manuel Vega",
        role: "Papá",
        status: "active",
        initials: "M",
        avatarBg: "#A9C7E8",
        avatarColor: "#fff",
      },
    ],
  },
];

export interface Invitation {
  code: string;
  email: string;
  kidName: string;
  kidInitials: string;
  room: string;
  avatarBg: string;
  avatarColor: string;
}

export const invitation: Invitation = {
  code: "7K4P9",
  email: "lucia.fernandez@gmail.com",
  kidName: "Mateo",
  kidInitials: "M",
  room: "Sala Soles",
  avatarBg: "#A9D9E8",
  avatarColor: "#1F7A93",
};

export type NoticeKind = "comment" | "parent-activated" | "reaction" | "reminder";

export const NOTICE_KINDS: Record<
  NoticeKind,
  { icon: AvatarIconName | null; bg: string; color: string; isClickable: boolean }
> = {
  comment: {
    icon: null,
    bg: "#C9B6E8",
    color: "#fff",
    isClickable: true,
  },
  "parent-activated": {
    icon: "check",
    bg: "#CFEBD8",
    color: "#3E9B6C",
    isClickable: false,
  },
  reaction: {
    icon: "heart",
    bg: "#FBD8CC",
    color: "#D9684A",
    isClickable: true,
  },
  reminder: {
    icon: "bell",
    bg: "#F4DC8E",
    color: "#9A7B1E",
    isClickable: false,
  },
};

export interface Notice {
  id: string;
  kind: NoticeKind;
  actor?: { name: string; initials: string };
  text: string;
  highlight?: string;
  trailing?: string;
  time: string;
  href?: string;
}

export const notices: Notice[] = [
  {
    id: "notice-1",
    kind: "comment",
    actor: { name: "Lucía Fernández", initials: "L" },
    text: "comentó en la publicación de Mateo.",
    time: "Hace 12 min",
    href: "/post-detail",
  },
  {
    id: "notice-2",
    kind: "parent-activated",
    actor: { name: "Diego Fernández", initials: "D" },
    text: "activó su cuenta y ya sigue a Mateo.",
    time: "Hace 1 h",
  },
  {
    id: "notice-3",
    kind: "reaction",
    actor: { name: "Carla Méndez", initials: "C" },
    text: "reaccionó a la publicación de Sofía.",
    time: "Hace 2 h",
    href: "/post-detail",
  },
  {
    id: "notice-4",
    kind: "reminder",
    text: "Recordá enviar el",
    highlight: "resumen del día",
    trailing: "de la sala Soles.",
    time: "Hoy 17:00",
  },
];