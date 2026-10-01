import type { ReactNode } from "react";

export const controlClass =
  "w-full rounded-[14px] border-[1.5px] bg-white px-4 py-[13px] text-[15px] text-ink outline-none placeholder:text-[#B6A99B]";

export function borderClass(hasError: boolean): string {
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
  children: ReactNode;
}

export function Field({
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
      {htmlFor ? (
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
      ) : (
        <span
          className="mb-2 block text-[12px] font-extrabold tracking-[0.7px]"
          style={{ color: "var(--dc-ink-soft)" }}
        >
          {label}
          {isRequired && (
            <span style={{ color: "var(--dc-accent-heading)" }}> *</span>
          )}
        </span>
      )}
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
