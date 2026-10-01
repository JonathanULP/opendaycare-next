import NoticeList from "@/components/NoticeList";
import Sidebar from "@/components/Sidebar";

export default function NoticesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas lg:flex-row">
      <Sidebar />
      <main className="min-w-0 flex-1 lg:h-screen lg:overflow-y-auto">
        <div className="mx-auto w-full max-w-[680px] px-5 pt-[34px] pb-20 sm:px-10">
          <div className="mb-[22px]">
            <p className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-accent-heading">
              ACTIVIDAD
            </p>
            <h1 className="m-0 font-fredoka text-[30px] font-semibold text-ink">
              Avisos
            </h1>
          </div>

          <NoticeList />
        </div>
      </main>
    </div>
  );
}