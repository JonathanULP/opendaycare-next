import NoticeRow from "@/components/NoticeRow";
import { notices } from "@/data/mock";

export default function NoticeList() {
  return (
    <div className="flex flex-col gap-3">
      {notices.map((notice) => (
        <NoticeRow key={notice.id} notice={notice} />
      ))}
    </div>
  );
}