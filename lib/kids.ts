import type { AllergyKind } from "@/data/mock";

export const KID_AVATAR_PALETTE: { bg: string; color: string }[] = [
  { bg: "#A9D9E8", color: "#1F7A93" },
  { bg: "#F4B8CC", color: "#C44A7A" },
  { bg: "#B9DEC4", color: "#3E8B62" },
  { bg: "#F4DC8E", color: "#9A7B1E" },
  { bg: "#C9B6E8", color: "#7B5FC0" },
];

const MONTHS_SHORT = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

const ALLERGY_TAGS: Record<string, AllergyKind> = {
  mani: "peanut",
  cacahuete: "peanut",
  lactosa: "lactose",
  lacteos: "lactose",
};

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/["']/g, "")
    .trim()
    .toLowerCase();
}

function parseIsoDate(iso: string): Date | null {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }
  return new Date(year, month - 1, day);
}

export function isFutureIsoDate(iso: string): boolean {
  return Boolean(iso) && iso > toIsoDate(new Date());
}

export function toIsoDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function formatBirthDate(iso: string): string {
  const date = parseIsoDate(iso);
  if (!date) {
    return iso;
  }
  const day = String(date.getDate()).padStart(2, "0");
  return `${day} ${MONTHS_SHORT[date.getMonth()]} ${date.getFullYear()}`;
}

export function calculateAge(iso: string, today: Date = new Date()): number {
  const date = parseIsoDate(iso);
  if (!date) {
    return 0;
  }
  const hasHadBirthday =
    today.getMonth() > date.getMonth() ||
    (today.getMonth() === date.getMonth() && today.getDate() >= date.getDate());
  return today.getFullYear() - date.getFullYear() - (hasHadBirthday ? 0 : 1);
}

export function slugifyKidName(fullName: string): string {
  return normalize(fullName)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildKidId(baseId: string, existingIds: string[]): string {
  if (!existingIds.includes(baseId)) {
    return baseId;
  }
  let suffix = 2;
  while (existingIds.includes(`${baseId}-${suffix}`)) {
    suffix += 1;
  }
  return `${baseId}-${suffix}`;
}

export function getKidInitials(fullName: string): string {
  return fullName.trim().charAt(0).toUpperCase();
}

export function getKidFirstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName.trim();
}

export function parseAllergyKind(tags: string): AllergyKind | undefined {
  for (const tag of tags.split(",")) {
    const kind = ALLERGY_TAGS[normalize(tag)];
    if (kind) {
      return kind;
    }
  }
  return undefined;
}
