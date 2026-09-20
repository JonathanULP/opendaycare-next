import Link from "next/link";
import KidsList from "@/components/KidsList";
import Sidebar from "@/components/Sidebar";
import { Icon } from "@/components/icons";
import { kids } from "@/data/mock";

export default function KidsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas lg:flex-row">
      <Sidebar />
      <main className="min-w-0 flex-1 lg:h-screen lg:overflow-y-auto">
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
            <Link
              href="/add-child"
              className="flex items-center gap-2 rounded-[14px] px-[18px] py-[11px] font-extrabold text-white"
              style={{
                fontSize: "14.5px",
                background:
                  "linear-gradient(180deg, var(--dc-brand-mid), var(--dc-brand-deep))",
                boxShadow: "0 8px 18px -8px rgba(238, 129, 100, 0.7)",
              }}
            >
              <Icon name="plus" size={17} />
              Agregar niño
            </Link>
          </div>

          <KidsList kids={kids} />
        </div>
      </main>
    </div>
  );
}