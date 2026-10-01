import Link from "next/link";
import { Logo } from "@/components/icons";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-canvas-warm lg:grid-cols-[1.05fr_1fr]">
      <section
        className="relative flex flex-col justify-between overflow-hidden px-7 py-8 text-white lg:px-[60px] lg:py-[56px]"
        style={{
          background:
            "linear-gradient(155deg, #F6A98E 0%, #F2937A 45%, #EC7E62 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute h-[420px] w-[420px] rounded-full"
          style={{
            top: -140,
            right: -120,
            background: "rgba(255, 255, 255, 0.12)",
          }}
        />
        <div
          className="pointer-events-none absolute h-[300px] w-[300px] rounded-full"
          style={{
            bottom: -110,
            left: -80,
            background: "rgba(255, 255, 255, 0.10)",
          }}
        />

        <div className="relative flex items-center gap-[13px]">
          <div
            className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-[14px]"
            style={{ background: "rgba(255, 255, 255, 0.22)" }}
          >
            <Logo width={26} height={26} />
          </div>
          <span
            className="font-fredoka font-semibold"
            style={{ fontSize: 21, letterSpacing: "0.5px" }}
          >
            OpenDayCare
          </span>
        </div>

        <div className="relative">
          <h1
            className="m-0 mb-[18px] font-fredoka font-semibold leading-[1.12] text-[27px] lg:text-[42px]"
          >
            El día de cada niño,
            <br />
            compartido con su familia.
          </h1>
          <p
            className="m-0 max-w-[430px] text-[15px] leading-[1.6] lg:text-[17px]"
            style={{ color: "rgba(255, 255, 255, 0.92)" }}
          >
            Publicá momentos, gestioná las salas y mantené a las familias
            cerca, desde un solo lugar.
          </p>
        </div>

        <div
          className="relative text-[14px]"
          style={{ color: "rgba(255, 255, 255, 0.9)" }}
        >
          🌿 Guardería Sala Soles
        </div>
      </section>

      <section className="flex items-center justify-center px-7 py-10 lg:px-10">
        <div className="w-full max-w-[392px]">
          <h2 className="m-0 mb-[6px] font-fredoka text-[30px] font-semibold text-ink">
            Iniciar sesión
          </h2>
          <p className="m-0 mb-7 text-[15px] text-ink-soft">
            Ingresá para ver el día de hoy.
          </p>

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
            className="mb-[18px] w-full rounded-[14px] bg-white px-4 py-[14px] text-[15px] text-ink outline-none"
            style={{ border: "1.5px solid #EADFD0" }}
          />

          <label
            htmlFor="password"
            className="mb-2 block text-[12px] font-bold tracking-[0.7px] text-ink-soft"
          >
            CONTRASEÑA
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className="w-full rounded-[14px] bg-white px-4 py-[14px] text-[15px] text-ink outline-none"
            style={{ border: "1.5px solid #EADFD0" }}
          />

          <div className="mb-5 mt-[10px] text-right">
            <Link
              href="/forgot-password"
              className="text-[13.5px] font-bold text-accent-deep"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <Link
            href="/"
            className="block w-full rounded-[15px] py-[15px] text-center font-extrabold text-white text-[16px]"
            style={{
              background:
                "linear-gradient(180deg, var(--dc-brand-mid), var(--dc-brand-deep))",
              boxShadow: "0 10px 22px -8px rgba(238, 129, 100, 0.7)",
            }}
          >
            Iniciar sesión
          </Link>

          <p className="mt-6 mb-0 text-center text-[14.5px] text-ink-soft">
            ¿Te invitó la guardería?{" "}
            <Link href="/activate-account" className="font-extrabold text-accent-deep">
              Activá tu cuenta
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
