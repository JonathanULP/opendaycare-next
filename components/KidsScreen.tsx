"use client";

import { useState } from "react";
import AddKidModal, { type NewKidDraft } from "@/components/AddKidModal";
import KidsList from "@/components/KidsList";
import { Icon } from "@/components/icons";
import { rooms, type Kid } from "@/data/mock";
import {
  buildKidId,
  calculateAge,
  formatBirthDate,
  getKidInitials,
  KID_AVATAR_PALETTE,
  parseAllergyKind,
  slugifyKidName,
} from "@/lib/kids";

interface KidsScreenProps {
  initialKids: Kid[];
}

export default function KidsScreen({ initialKids }: KidsScreenProps) {
  const [kids, setKids] = useState(initialKids);
  const [isAddKidOpen, setIsAddKidOpen] = useState(false);

  function handleSaveKid(draft: NewKidDraft) {
    setKids((currentKids) => [...currentKids, buildKid(draft, currentKids)]);
    setIsAddKidOpen(false);
  }

  return (
    <>
      <div className="mx-auto w-full max-w-[880px] px-5 pt-[34px] pb-20 sm:px-10">
        <div className="mb-[22px] flex items-start justify-between gap-4 sm:items-end">
          <div>
            <p className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-accent-heading">
              GESTIÓN
            </p>
            <h1 className="m-0 font-fredoka text-[30px] font-semibold text-ink">
              Niños
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setIsAddKidOpen(true)}
            className="flex items-center gap-2 rounded-[14px] px-[18px] py-[11px] font-extrabold text-white"
            style={{
              fontSize: "14.5px",
              background: "linear-gradient(180deg, var(--dc-brand-mid), var(--dc-brand-deep))",
              boxShadow: "0 8px 18px -8px rgba(238, 129, 100, 0.7)",
            }}
          >
            <Icon name="plus" size={17} />
            Agregar niño
          </button>
        </div>

        <KidsList kids={kids} />
      </div>

      <AddKidModal
        isOpen={isAddKidOpen}
        onClose={() => setIsAddKidOpen(false)}
        onSave={handleSaveKid}
      />
    </>
  );
}

function buildKid(draft: NewKidDraft, currentKids: Kid[]): Kid {
  const room = rooms.find((item) => item.short === draft.roomShort) ?? rooms[0];
  const palette =
    KID_AVATAR_PALETTE[currentKids.length % KID_AVATAR_PALETTE.length];
  const allergyKind = parseAllergyKind(draft.allergyTags);
  const medicalNotes = draft.medicalNotes.trim();

  return {
    id: buildKidId(
      slugifyKidName(draft.fullName),
      currentKids.map((kid) => kid.id)
    ),
    name: draft.fullName,
    age: calculateAge(draft.birthDate),
    room: room.name,
    roomShort: room.short,
    birthDate: formatBirthDate(draft.birthDate),
    admission: "—",
    initials: getKidInitials(draft.fullName),
    avatarBg: palette.bg,
    avatarColor: palette.color,
    allergies: allergyKind ? { kind: allergyKind, note: "" } : undefined,
    medicalNotes: medicalNotes || undefined,
    parents: [],
  };
}
