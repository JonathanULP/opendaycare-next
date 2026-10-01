import KidsScreen from "@/components/KidsScreen";
import Sidebar from "@/components/Sidebar";
import { kids } from "@/data/mock";

export default function KidsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas lg:flex-row">
      <Sidebar />
      <main
        data-scroll-lock
        className="min-w-0 flex-1 lg:h-screen lg:overflow-y-auto"
      >
        <KidsScreen initialKids={kids} />
      </main>
    </div>
  );
}
