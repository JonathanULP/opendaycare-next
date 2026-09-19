import FeedComposer from "@/components/FeedComposer";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import { posts } from "@/data/mock";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />
      <main className="min-w-0 flex-1 lg:h-screen lg:overflow-y-auto">
        <div className="mx-auto w-full max-w-[760px] px-5 pt-[34px] pb-20 sm:px-10">
          <div className="mb-6">
            <p className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-accent-heading">
              GUARDERÍA · SALA SOLES
            </p>
            <h1 className="m-0 font-fredoka text-[30px] font-semibold text-ink">
              Buenas, Caro
            </h1>
            <p className="mt-[5px] text-[14.5px] text-ink-soft">
              12 niños · martes 17 jun
            </p>
          </div>

          <FeedComposer />

          <div className="mb-[14px] flex items-center gap-[14px]">
            <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-ink-label">
              PUBLICADO HOY
            </span>
            <span className="h-px flex-1" style={{ background: "var(--dc-line-soft)" }} />
          </div>

          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}