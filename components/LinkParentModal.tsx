"use client";

import { useEffect, useId, useRef, useState } from "react";
import { borderClass, controlClass, Field } from "@/components/FormField";
import { Icon } from "@/components/icons";
import { PARENT_RELATIONSHIPS, type ParentRelationship } from "@/data/mock";
import { getKidFirstName } from "@/lib/kids";

export interface NewParentDraft {
  fullName: string;
  email: string;
  relationship: ParentRelationship;
}

type DraftField = keyof NewParentDraft;

type FieldErrors = Partial<Record<DraftField, string>>;

type SendStatus = "idle" | "sent";

const EMAIL_PATTERN = /^[^\s@]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

const EMPTY_DRAFT: NewParentDraft = {
  fullName: "",
  email: "",
  relationship: PARENT_RELATIONSHIPS[0],
};

interface LinkParentModalProps {
  kidName: string;
  invitationCode: string;
}

export default function LinkParentModal({
  kidName,
  invitationCode,
}: LinkParentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sendStatus, setSendStatus] = useState<SendStatus>("idle");
  const [draft, setDraft] = useState<NewParentDraft>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<FieldErrors>({});

  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const doneButtonRef = useRef<HTMLButtonElement>(null);
  const fieldId = useId();

  const kidFirstName = getKidFirstName(kidName);
  const relationshipIds = PARENT_RELATIONSHIPS.map(
    (_, index) => `${fieldId}-relationship-${index}`,
  );

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
    if (sendStatus === "sent") {
      doneButtonRef.current?.focus();
    }
  }, [sendStatus]);

  function updateField(field: DraftField, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) =>
      current[field] ? { ...current, [field]: undefined } : current,
    );
  }

  function handleSelectRelationship(relationship: ParentRelationship) {
    setDraft((current) => ({ ...current, relationship }));
  }

  function handleClose() {
    setIsOpen(false);
    setSendStatus("idle");
    setDraft(EMPTY_DRAFT);
    setErrors({});
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: FieldErrors = {};
    const fullName = draft.fullName.trim();
    const email = draft.email.trim();

    if (!fullName) {
      nextErrors.fullName = "Este campo es obligatorio";
    }
    if (!email) {
      nextErrors.email = "Ingresá el email";
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = "Ingresá un email válido";
    }

    setErrors(nextErrors);
    if (nextErrors.fullName || nextErrors.email) {
      return;
    }

    setDraft((current) => ({ ...current, fullName, email }));
    setSendStatus("sent");
  }

  function handleCancel(event: React.SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    handleClose();
  }

  function handleDialogClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) {
      handleClose();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center gap-3 pt-2 text-left"
      >
        <span
          className="flex h-10 w-10 flex-none items-center justify-center rounded-full"
          style={{ border: "1.5px dashed #D8CBBA", color: "#B0A290" }}
        >
          <Icon name="plus" size={18} strokeWidth={2.2} />
        </span>
        <span
          className="font-extrabold"
          style={{ fontSize: "14.5px", color: "#C5503A" }}
        >
          Vincular otro padre
        </span>
      </button>

      <dialog
        ref={dialogRef}
        onCancel={handleCancel}
        onClick={handleDialogClick}
        aria-labelledby={`${fieldId}-title`}
        className="dc-modal m-auto w-[calc(100vw-32px)] max-w-[480px] max-h-[90vh] overflow-hidden rounded-[24px] bg-canvas-warm p-0"
        style={{
          border: "1px solid var(--dc-line)",
          boxShadow: "0 20px 50px -24px rgba(63, 54, 46, 0.35)",
        }}
      >
        <div className="flex max-h-[90vh] flex-col">
          <div
            className="flex flex-none items-center justify-between px-[26px] py-5"
            style={{ borderBottom: "1px solid var(--dc-line)" }}
          >
            <div>
              <div
                id={`${fieldId}-title`}
                className="font-fredoka font-semibold"
                style={{ fontSize: 18, color: "var(--dc-ink)" }}
              >
                Vincular padre
              </div>
              <div
                className="mt-[2px] text-[13px]"
                style={{ color: "var(--dc-ink-muted)" }}
              >
                a {kidName}
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Cerrar"
              className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-[10px]"
              style={{ background: "#F0E6D8", color: "var(--dc-ink-soft)" }}
            >
              <Icon name="x" size={18} strokeWidth={2.2} />
            </button>
          </div>

          {sendStatus === "sent" ? (
            <div
              aria-live="polite"
              className="min-h-0 flex-1 overflow-y-auto px-[26px] py-[22px]"
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="flex h-[58px] w-[58px] items-center justify-center rounded-full"
                  style={{ background: "#CFEBD8" }}
                >
                  <Icon
                    name="check"
                    size={30}
                    strokeWidth={2.6}
                    style={{ color: "#3E9B6C" }}
                  />
                </div>
                <div
                  className="mt-[18px] font-fredoka font-semibold"
                  style={{ fontSize: 20, color: "var(--dc-ink)" }}
                >
                  Invitación enviada
                </div>
                <p
                  className="m-0 mt-[10px]"
                  style={{
                    fontSize: "14.5px",
                    lineHeight: 1.5,
                    color: "var(--dc-ink-body)",
                  }}
                >
                  Le enviamos un correo a <b>{draft.email}</b> con el código{" "}
                  <b>{invitationCode}</b> para que active su cuenta. Solo verá
                  el feed de {kidFirstName}.
                </p>
                <p
                  className="m-0 mt-[8px]"
                  style={{ fontSize: 13, color: "var(--dc-ink-muted)" }}
                >
                  El código vence en 7 días.
                </p>
                <button
                  ref={doneButtonRef}
                  type="button"
                  onClick={handleClose}
                  className="mt-[22px] w-full rounded-[14px] py-[14px] font-extrabold text-white"
                  style={{
                    fontSize: 15.5,
                    background:
                      "linear-gradient(180deg, #F4977E, #EE8164)",
                    boxShadow: "0 10px 22px -8px rgba(238, 129, 100, 0.7)",
                  }}
                >
                  Listo
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="min-h-0 flex-1 overflow-y-auto px-[26px] py-[22px]">
                <div
                  className="mb-[20px] flex gap-[11px] rounded-[14px] px-4 py-[13px]"
                  style={{ background: "#E3ECFB" }}
                >
                  <Icon
                    name="info"
                    size={20}
                    strokeWidth={2}
                    style={{ flex: "none", marginTop: 1, color: "#4E72C8" }}
                  />
                  <span
                    className="text-[13.5px]"
                    style={{ color: "#3F5694", lineHeight: 1.45 }}
                  >
                    Le enviaremos un correo con un código para que active su
                    cuenta. Solo verá el feed de {kidFirstName}.
                  </span>
                </div>

                <Field
                  label="NOMBRE DEL PADRE/MADRE"
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
                    onChange={(event) =>
                      updateField("fullName", event.target.value)
                    }
                    placeholder="Ej. Diego Fernández"
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={
                      errors.fullName ? `${fieldId}-name-error` : undefined
                    }
                    className={controlClass + borderClass(Boolean(errors.fullName))}
                  />
                </Field>

                <Field
                  label="EMAIL"
                  fieldId={`${fieldId}-email`}
                  htmlFor={`${fieldId}-email`}
                  isRequired
                  error={errors.email}
                >
                  <input
                    id={`${fieldId}-email`}
                    type="email"
                    value={draft.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="correo@ejemplo.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? `${fieldId}-email-error` : undefined
                    }
                    className={controlClass + borderClass(Boolean(errors.email))}
                  />
                </Field>

                <Field
                  label="PARENTESCO"
                  fieldId={relationshipIds[0]}
                  className="mb-[20px]"
                >
                  <div
                    role="radiogroup"
                    aria-label="Parentesco"
                    className="flex gap-[9px]"
                  >
                    {PARENT_RELATIONSHIPS.map((relationship, index) => {
                      const isSelected = draft.relationship === relationship;
                      return (
                        <label key={relationship} className="flex-1">
                          <input
                            id={relationshipIds[index]}
                            type="radio"
                            name={`${fieldId}-relationship`}
                            value={relationship}
                            checked={isSelected}
                            onChange={() =>
                              handleSelectRelationship(relationship)
                            }
                            className="peer sr-only"
                          />
                          <span
                            className={
                              "flex items-center justify-center rounded-full border-[1.5px] px-[11px] py-[11px] text-center text-[14px] font-extrabold peer-focus-visible:outline-2 " +
                              (isSelected
                                ? "border-[#9FB8EC] bg-[#CCD8F4] text-[#4E72C8]"
                                : "border-[#ECE0D0] bg-[#FFFDF9] text-[#6E6359]")
                            }
                          >
                            {relationship}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </Field>

                <div
                  className="mb-[20px] rounded-[16px] bg-[#FBF1D6] px-[18px] py-[18px] text-center"
                  style={{ border: "1.5px dashed #E6D08A" }}
                >
                  <div
                    className="mb-2 text-[12px] font-extrabold tracking-[0.7px]"
                    style={{ color: "#A88526" }}
                  >
                    CÓDIGO DE INVITACIÓN
                  </div>
                  <div
                    className="font-fredoka text-[34px] font-semibold tracking-[7px]"
                    style={{ color: "#8A7234" }}
                  >
                    {invitationCode}
                  </div>
                  <div
                    className="mt-[6px] text-[13px]"
                    style={{ color: "#A88526" }}
                  >
                    Vence en 7 días
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-[9px] rounded-[14px] py-[14px] font-extrabold text-white"
                  style={{
                    fontSize: 15.5,
                    background:
                      "linear-gradient(180deg, #F4977E, #EE8164)",
                    boxShadow: "0 10px 22px -8px rgba(238, 129, 100, 0.7)",
                  }}
                >
                  <Icon name="send" size={19} strokeWidth={2} />
                  Enviar invitación
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
