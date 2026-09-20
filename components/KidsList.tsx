"use client";

import { useMemo, useState } from "react";
import KidCard from "@/components/KidCard";
import { Icon } from "@/components/icons";
import type { Kid } from "@/data/mock";

interface KidsListProps {
  kids: Kid[];
}

export default function KidsList({ kids }: KidsListProps) {
  const [query, setQuery] = useState("");

  const filteredKids = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? kids.filter((kid) => kid.name.toLowerCase().includes(q))
      : kids;
  }, [kids, query]);

  return (
    <div className="flex flex-col gap-0">
      <div
        className="mb-[22px] flex items-center gap-[11px] rounded-[14px] bg-surface px-4 py-3"
        style={{ border: "1px solid var(--dc-line)" }}
      >
        <Icon name="search" size={18} style={{ flex: "none", color: "#B0A290" }} />
        <input
          type="search"
          placeholder="Buscar niño…"
          aria-label="Buscar niño"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none"
          style={{ border: "none", background: "none", padding: 0 }}
        />
      </div>

      <div className="mb-[14px] flex items-center gap-3">
        <span
          className="text-[12.5px] font-extrabold tracking-[0.8px]"
          style={{ color: "var(--dc-ink)" }}
        >
          SALA SOLES
        </span>
        <span style={{ fontSize: 13, color: "var(--dc-ink-muted)" }}>
          {kids.length} niños
        </span>
        <span className="flex-1" style={{ height: 1, background: "#E7DAC8" }} />
      </div>

      <div className="grid grid-cols-1 gap-[14px] min-[480px]:grid-cols-2">
        {filteredKids.map((kid) => (
          <KidCard key={kid.id} kid={kid} />
        ))}
      </div>
    </div>
  );
}