import Link from "next/link";
import { notFound } from "next/navigation";
import Avatar from "@/components/Avatar";
import Sidebar from "@/components/Sidebar";
import { Icon, Logo } from "@/components/icons";
import { ALLERGY_STYLES, kids } from "@/data/mock";

export default async function KidProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const kid = kids.find((item) => item.id === id);

  if (!kid) {
    notFound();
  }

  const allergyStyle = kid.allergies
    ? ALLERGY_STYLES[kid.allergies.kind]
    : null;

  return (
    <div className="flex min-h-screen flex-col bg-canvas lg:flex-row">
      <Sidebar />
      <main className="min-w-0 flex-1 lg:h-screen lg:overflow-y-auto">
        <div className="mx-auto w-full max-w-[820px] px-5 pt-[34px] pb-20 sm:px-10">
          <Link
            href="/kids"
            className="mb-5 flex w-fit items-center gap-[7px] font-bold"
            style={{ fontSize: 14, color: "var(--dc-ink-soft)" }}
          >
            <Icon name="chevron-left" size={18} strokeWidth={2.2} />
            Volver a Niños
          </Link>

          <div
            className="flex flex-col md:flex-row"
            style={{ gap: 26, alignItems: "flex-start" }}
          >
            <div className="w-full md:w-auto md:min-w-[300px] md:flex-1">
              <div className="flex items-center gap-[18px]">
                <Avatar
                  avatar={{
                    kind: "initials",
                    initials: kid.initials,
                    bg: kid.avatarBg,
                    color: kid.avatarColor,
                  }}
                  size={84}
                />
                <div className="min-w-0 flex-1">
                  <h1
                    className="m-0 font-fredoka font-semibold"
                    style={{ fontSize: 28, color: "var(--dc-ink)" }}
                  >
                    {kid.name}
                  </h1>
                  <p
                    className="m-0 mt-[3px]"
                    style={{ fontSize: 15, color: "var(--dc-ink-soft)" }}
                  >
                    {kid.age} años · {kid.room}
                  </p>
                </div>
                <Link
                  href="/add-child"
                  className="flex-none rounded-xl px-4 py-[9px] font-bold"
                  style={{
                    fontSize: 14,
                    border: "1.5px solid var(--dc-line)",
                    background: "var(--dc-surface)",
                    color: "var(--dc-ink-nav)",
                  }}
                >
                  Editar
                </Link>
              </div>

              {allergyStyle && kid.allergies && (
                <div
                  className="mt-[18px] flex items-start gap-[14px] rounded-2xl px-[18px] py-4"
                  style={{ background: allergyStyle.bannerBg }}
                >
                  <div
                    className="flex h-10 w-10 flex-none items-center justify-center rounded-[11px]"
                    style={{ background: allergyStyle.bannerColor }}
                  >
                    <Icon
                      name="alert-triangle"
                      size={22}
                      strokeWidth={2.2}
                      className="text-white"
                    />
                  </div>
                  <div className="min-w-0">
                    <span
                      className="flex w-fit text-[11px] font-extrabold"
                      style={{
                        padding: "5px 9px",
                        borderRadius: 999,
                        background: "#FBD8CC",
                        color: "#D9684A",
                      }}
                    >
                      {allergyStyle.badge}
                    </span>
                    {kid.allergies.note && (
                      <p
                        className="m-0 mt-2"
                        style={{
                          fontSize: "14.5px",
                          lineHeight: 1.5,
                          color: allergyStyle.bannerColor,
                        }}
                      >
                        {kid.allergies.note}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div
                className="mt-[18px] overflow-hidden rounded-2xl bg-surface"
                style={{ border: "1px solid var(--dc-line)" }}
              >
                <DataRow label="Fecha de nacimiento" value={kid.birthDate} />
                <DataRow label="Sala" value={kid.roomShort} />
                <DataRow label="Ingreso" value={kid.admission} isLast />
              </div>

              {kid.medicalNotes && (
                <div
                  className="mt-[18px] rounded-2xl bg-surface px-[18px] py-4"
                  style={{ border: "1px solid var(--dc-line)" }}
                >
                  <div
                    className="mb-2 text-[12.5px] font-extrabold tracking-[0.8px]"
                    style={{ color: "var(--dc-ink-label)" }}
                  >
                    NOTAS MÉDICAS
                  </div>
                  <p
                    className="m-0"
                    style={{
                      fontSize: "14.5px",
                      lineHeight: 1.5,
                      color: "var(--dc-ink-body)",
                    }}
                  >
                    {kid.medicalNotes}
                  </p>
                </div>
              )}
            </div>

            <div className="flex w-full flex-none flex-col gap-[14px] md:w-[300px]">
              <Link
                href="/day-summary"
                className="flex w-full items-center justify-center gap-[9px] rounded-[14px] py-[13px] font-extrabold text-white"
                style={{ fontSize: 15, background: "var(--dc-ink)" }}
              >
                <Logo width="18" height="18" />
                Resumen del día
              </Link>

              <div
                className="rounded-2xl bg-surface px-[18px] py-4"
                style={{ border: "1px solid var(--dc-line)" }}
              >
                <div
                  className="mb-[14px] text-[12.5px] font-extrabold tracking-[0.8px]"
                  style={{ color: "var(--dc-ink-label)" }}
                >
                  {kid.parents.length} · PADRES VINCULADOS
                </div>
                <div className="flex flex-col gap-[14px]">
                  {kid.parents.map((parent) => {
                    const isActive = parent.status === "active";
                    return (
                      <div key={parent.name} className="flex items-center gap-3">
                        <Avatar
                          avatar={{
                            kind: "initials",
                            initials: parent.initials,
                            bg: parent.avatarBg,
                            color: parent.avatarColor,
                          }}
                          size={40}
                        />
                        <div className="min-w-0 flex-1">
                          <div
                            className="font-extrabold"
                            style={{ fontSize: "14.5px", color: "var(--dc-ink)" }}
                          >
                            {parent.name}
                          </div>
                          <div
                            style={{
                              fontSize: "12.5px",
                              color: "var(--dc-ink-muted)",
                            }}
                          >
                            {parent.role} · {isActive ? "ACTIVA" : "PENDIENTE"}
                          </div>
                        </div>
                        <span
                          className="flex-none text-[10.5px] font-extrabold"
                          style={{
                            padding: "4px 9px",
                            borderRadius: 999,
                            background: isActive ? "#CFEBD8" : "#F7E7A6",
                            color: isActive ? "#3E9B6C" : "#9A7B1E",
                          }}
                        >
                          {isActive ? "ACTIVA" : "PENDIENTE"}
                        </span>
                      </div>
                    );
                  })}
                  <Link
                    href="/link-parent"
                    className="flex items-center gap-3 pt-2"
                  >
                    <span
                      className="flex h-10 w-10 flex-none items-center justify-center rounded-full"
                      style={{
                        border: "1.5px dashed #D8CBBA",
                        color: "#B0A290",
                      }}
                    >
                      <Icon name="plus" size={18} strokeWidth={2.2} />
                    </span>
                    <span
                      className="font-extrabold"
                      style={{ fontSize: "14.5px", color: "#C5503A" }}
                    >
                      Vincular otro padre
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function DataRow({
  label,
  value,
  isLast = false,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between px-[18px] py-[15px]"
      style={
        isLast ? undefined : { borderBottom: "1px solid var(--dc-line-card)" }
      }
    >
      <span style={{ fontSize: "14.5px", color: "var(--dc-ink-soft)" }}>
        {label}
      </span>
      <span
        className="font-extrabold"
        style={{ fontSize: "14.5px", color: "var(--dc-ink)" }}
      >
        {value}
      </span>
    </div>
  );
}