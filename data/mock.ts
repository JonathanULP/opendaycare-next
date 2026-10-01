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

export type ParentStatus = "active" | "pending";

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