"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { rooms } from "@/data/mock";
import { isFutureIsoDate } from "@/lib/kids";

export interface NewKidDraft {
  fullName: string;
  birthDate: string;
  roomShort: string;
  allergyTags: string;
  medicalNotes: string;
}

type DraftField = keyof NewKidDraft;

type FieldErrors = Partial<Record<DraftField, string>>;

const EMPTY_DRAFT: NewKidDraft = {
  fullName: "",
  birthDate: "",
  roomShort: rooms[0]?.short ?? "",
  allergyTags: "",
  medicalNotes: "",
};

const REQUIRED_FIELDS: DraftField[] = ["fullName", "birthDate", "roomShort"];

const controlClass =
  "w-full rounded-[14px] border-[1.5px] bg-white px-4 py-[13px] text-[15px] text-ink outline-none placeholder:text-[#B6A99B]";

interface AddKidModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (draft: NewKidDraft) => void;
}

export default function AddKidModal({ isOpen, onClose, onSave }: AddKidModalProps) {
  const [draft, setDraft] = useState<NewKidDraft>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isRoomListOpen, setIsRoomListOpen] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const roomPickerRef = useRef<HTMLDivElement>(null);
  const fieldId = useId();

  const selectedRoom = rooms.find((room) => room.short === draft.roomShort);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      nameInputRef.current?.focus();
      return;
    }

    if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const targets = [
      document.documentElement,
      document.body,
      ...document.querySelectorAll<HTMLElement>("[data-scroll-lock]"),
    ];
    const previousOverflow = targets.map((target) => target.style.overflowY);
    for (const target of targets) {
      target.style.overflowY = "hidden";
    }

    return () => {
      targets.forEach((target, index) => {
        target.style.overflowY = previousOverflow[index];
      });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isRoomListOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!roomPickerRef.current?.contains(event.target as Node)) {
        setIsRoomListOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isRoomListOpen]);

  function updateField(field: DraftField, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  }

  function handleSelectRoom(roomShort: string) {
    setIsRoomListOpen(false);
    updateField("roomShort", roomShort);
  }

  function handleClose() {
    setDraft(EMPTY_DRAFT);
    setErrors({});
    setIsRoomListOpen(false);
    onClose();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: FieldErrors = {};
    if (!draft.fullName.trim()) {
      nextErrors.fullName = "Este campo es obligatorio";
    }
    if (!draft.birthDate) {
      nextErrors.birthDate = "Seleccioná la fecha de nacimiento";
    } else if (isFutureIsoDate(draft.birthDate)) {
      nextErrors.birthDate = "La fecha de nacimiento no puede ser futura";
    }
    if (!draft.roomShort) {
      nextErrors.roomShort = "Elegí una sala";
    }

    setErrors(nextErrors);
    if (REQUIRED_FIELDS.some((field) => nextErrors[field])) {
      return;
    }

    onSave({
      ...draft,
      fullName: draft.fullName.trim(),
      medicalNotes: draft.medicalNotes.trim(),
    });
    setDraft(EMPTY_DRAFT);
    setErrors({});
  }

  function handleCancelDialog(event: React.SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    if (isRoomListOpen) {
      setIsRoomListOpen(false);
      return;
    }
    handleClose();
  }

  function handleDialogClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) {
      handleClose();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancelDialog}
      onClick={handleDialogClick}
      aria-labelledby={`${fieldId}-title`}
      className="dc-modal m-auto w-[calc(100vw-32px)] max-w-[520px] max-h-[90vh] overflow-hidden rounded-[24px] bg-canvas-warm p-0"
      style={{
        border: "1px solid var(--dc-line)",
        boxShadow: "0 20px 50px -24px rgba(63, 54, 46, 0.35)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex max-h-[90vh] flex-col"
        noValidate
      >
        <div
          className="flex flex-none items-center justify-between px-[26px] py-5"
          style={{ borderBottom: "1px solid var(--dc-line)" }}
        >
          <button
            type="button"
            onClick={handleClose}
            className="font-bold"
            style={{ fontSize: 15, color: "var(--dc-ink-soft)" }}
          >
            Cancelar
          </button>
          <span
            id={`${fieldId}-title`}
            className="font-fredoka font-semibold"
            style={{ fontSize: 18, color: "var(--dc-ink)" }}
          >
            Agregar niño
          </span>
          <button
            type="submit"
            className="font-extrabold"
            style={{ fontSize: 15, color: "var(--dc-accent-heading)" }}
          >
            Guardar
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-[26px] py-6">
          <Field
            label="NOMBRE COMPLETO"
            fieldId={`${fieldId}-name`}
            htmlFor={`${fieldId}-name`}
            isRequired
            error={errors.fullName}
          >
            <input
              id={`${fieldId}-name`}
              ref={nameInputRef}
              type="text"
              value={draft.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              placeholder="Ej. Martina López"
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? `${fieldId}-name-error` : undefined}
              className={controlClass + borderClass(Boolean(errors.fullName))}
            />
          </Field>

          <div className="mb-[18px] flex flex-col gap-[14px] min-[480px]:flex-row">
            <Field
              label="FECHA DE NACIMIENTO"
              fieldId={`${fieldId}-birth`}
              htmlFor={`${fieldId}-birth`}
              isRequired
              error={errors.birthDate}
              className="flex-1"
            >
              <input
                id={`${fieldId}-birth`}
                type="date"
                value={draft.birthDate}
                onChange={(event) => updateField("birthDate", event.target.value)}
                aria-invalid={Boolean(errors.birthDate)}
                aria-describedby={
                  errors.birthDate ? `${fieldId}-birth-error` : undefined
                }
                className={controlClass + borderClass(Boolean(errors.birthDate))}
              />
            </Field>

            <Field
              label="SALA"
              fieldId={`${fieldId}-room`}
              htmlFor={`${fieldId}-room`}
              isRequired
              error={errors.roomShort}
              className="flex-1"
            >
              <div ref={roomPickerRef} className="relative">
                <button
                  id={`${fieldId}-room`}
                  type="button"
                  onClick={() => setIsRoomListOpen((current) => !current)}
                  aria-haspopup="listbox"
                  aria-expanded={isRoomListOpen}
                  aria-describedby={
                    errors.roomShort ? `${fieldId}-room-error` : undefined
                  }
                  className={
                    controlClass +
                    " flex items-center font-bold " +
                    borderClass(Boolean(errors.roomShort))
                  }
                >
                  <span className="flex-1 text-left">
                    {selectedRoom?.short ?? "Elegí una sala"}
                  </span>
                  <Icon
                    name="chevron-down"
                    size={16}
                    strokeWidth={2.2}
                    style={{ flex: "none", color: "#B0A290" }}
                  />
                </button>

                {isRoomListOpen && (
                  <ul
                    role="listbox"
                    aria-label="Salas"
                    className="absolute top-[calc(100%+6px)] right-0 left-0 z-10 rounded-[12px] bg-surface py-1"
                    style={{
                      border: "1px solid var(--dc-line)",
                      boxShadow: "0 12px 24px -16px rgba(63, 54, 46, 0.45)",
                    }}
                  >
                    {rooms.map((room) => (
                      <li key={room.short}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={room.short === draft.roomShort}
                          onClick={() => handleSelectRoom(room.short)}
                          className="w-full px-4 py-[10px] text-left font-bold"
                          style={{ fontSize: 14.5, color: "var(--dc-ink)" }}
                        >
                          {room.short}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Field>
          </div>

          <Field
            label="ALERGIAS (ETIQUETAS)"
            fieldId={`${fieldId}-allergies`}
            htmlFor={`${fieldId}-allergies`}
          >
            <input
              id={`${fieldId}-allergies`}
              type="text"
              value={draft.allergyTags}
              onChange={(event) => updateField("allergyTags", event.target.value)}
              placeholder="Ej. Maní, Lactosa"
              className={controlClass + borderClass(false)}
            />
          </Field>

          <Field
            label="NOTAS MÉDICAS"
            fieldId={`${fieldId}-notes`}
            htmlFor={`${fieldId}-notes`}
          >
            <textarea
              id={`${fieldId}-notes`}
              value={draft.medicalNotes}
              onChange={(event) => updateField("medicalNotes", event.target.value)}
              placeholder="Indicaciones, medicación, contactos…"
              className={
                controlClass + " min-h-[90px] resize-y leading-[1.5] " + borderClass(false)
              }
            />
          </Field>
        </div>
      </form>
    </dialog>
  );
}

function borderClass(hasError: boolean): string {
  return hasError
    ? " border-[#D9583C]"
    : " border-[#EADFD0] focus:border-[#F2A78E]";
}

interface FieldProps {
  label: string;
  fieldId: string;
  htmlFor?: string;
  isRequired?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

function Field({
  label,
  fieldId,
  htmlFor,
  isRequired = false,
  error,
  className = "",
  children,
}: FieldProps) {
  return (
    <div className={"mb-[18px] " + className}>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-[12px] font-extrabold tracking-[0.7px]"
        style={{ color: "var(--dc-ink-soft)" }}
      >
        {label}
        {isRequired && (
          <span style={{ color: "var(--dc-accent-heading)" }}> *</span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`${fieldId}-error`}
          role="alert"
          className="m-0 mt-2 text-[12.5px] font-bold"
          style={{ color: "var(--dc-accent-heading)" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
