import Link from "next/link";
import Avatar from "@/components/Avatar";
import { Icon, Logo } from "@/components/icons";
import { invitation } from "@/data/mock";

const inputClassName =
  "w-full rounded-[14px] bg-white px-4 py-[14px] text-[15px] text-ink outline-none";

export default function ActivateAccountPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas-warm px-7 py-10">
      <div className="w-full max-w-[440px]">
        <div
          className="mb-[22px] flex h-[58px] w-[58px] items-center justify-center rounded-[18px]"
          style={{
            background: "linear-gradient(155deg, #F8C3A8, #F2937A)",
            boxShadow: "0 12px 26px -10px rgba(238, 129, 100, 0.65)",
          }}
        >
          <Logo width={30} height={30} />
        </div>

        <h1 className="m-0 mb-2 font-fredoka text-[32px] font-semibold leading-[1.15] text-ink">
          Bienvenida a OpenDayCare
        </h1>
        <p className="m-0 mb-[26px] text-[15.5px] leading-[1.55] text-ink-soft">
          Te invitaron a seguir el día de tu hijo. Creá tu contraseña para
          activar la cuenta.
        </p>

        <div
          className="mb-[22px] flex items-center gap-[14px] rounded-2xl bg-white px-4 py-[14px]"
          style={{ border: "1.5px solid #EADFD0" }}
        >
          <Avatar
            avatar={{
              kind: "initials",
              initials: invitation.kidInitials,
              bg: invitation.avatarBg,
              color: invitation.avatarColor,
            }}
            size={44}
          />
          <div className="min-w-0">
            <div className="text-[13px] text-ink-soft">
              Te invitaron a seguir a
            </div>
            <div className="font-fredoka text-[17px] font-semibold text-ink">
              {invitation.kidName} · {invitation.room}
            </div>
          </div>
        </div>

        <label
          htmlFor="invitation-code"
          className="mb-2 block text-[12px] font-bold tracking-[0.7px] text-ink-soft"
        >
          CÓDIGO DE INVITACIÓN
        </label>
        <input
          id="invitation-code"
          name="invitationCode"
          type="text"
          defaultValue={invitation.code}
          className={`${inputClassName} mb-[18px] font-fredoka text-[18px] font-bold tracking-[3px]`}
          style={{ border: "1.5px solid #EADFD0" }}
        />

        <label
          htmlFor="email"
          className="mb-2 block text-[12px] font-bold tracking-[0.7px] text-ink-soft"
        >
          EMAIL
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={invitation.email}
          className={`${inputClassName} mb-[18px]`}
          style={{ border: "1.5px solid #EADFD0" }}
        />

        <label
          htmlFor="password"
          className="mb-2 block text-[12px] font-bold tracking-[0.7px] text-ink-soft"
        >
          CREAR CONTRASEÑA
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          className={inputClassName}
          style={{ border: "1.5px solid #F2A78E" }}
        />

        <label className="mb-6 flex cursor-pointer items-start gap-3 rounded-[14px] bg-[#FBF1D6] px-4 py-[14px]">
          <input
            type="checkbox"
            name="photoConsent"
            defaultChecked
            className="peer sr-only"
          />
          <span
            className="mt-[1px] flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-[#DCD5C3] text-transparent transition-colors peer-checked:bg-[#5FB97E] peer-checked:text-white"
            aria-hidden="true"
          >
            <Icon name="check" size={15} strokeWidth={3} />
          </span>
          <span
            className="text-[14px] leading-[1.45]"
            style={{ color: "#8A7234" }}
          >
            Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro
            de la app.
          </span>
        </label>

        <Link
          href="/family-feed"
          className="block w-full rounded-[15px] py-[15px] text-center font-extrabold text-[16px] text-white"
          style={{
            background:
              "linear-gradient(180deg, var(--dc-brand-mid), var(--dc-brand-deep))",
            boxShadow: "0 10px 22px -8px rgba(238, 129, 100, 0.7)",
          }}
        >
          Activar mi cuenta
        </Link>

        <p className="mt-[22px] mb-0 text-center text-[14.5px] text-ink-soft">
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="font-extrabold text-accent-deep">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
