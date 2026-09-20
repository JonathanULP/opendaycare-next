"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatar from "@/components/Avatar";
import { Icon, Logo } from "@/components/icons";
import { currentUser, navItems } from "@/data/mock";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleSidebar = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);

  const isItemActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className="flex items-center gap-3 bg-surface px-4 py-3 lg:hidden"
        style={{ borderBottom: "1px solid var(--dc-line)" }}
      >
        <button
          type="button"
          onClick={handleToggleSidebar}
          aria-label="Abrir menú"
          aria-expanded={isOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-ink-soft"
        >
          <Icon name="menu" size={22} />
        </button>
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-[10px]"
            style={{
              background:
                "linear-gradient(155deg, var(--dc-brand-light), var(--dc-brand))",
            }}
          >
            <Logo width="17" height="17" />
          </div>
          <span
            className="font-fredoka font-semibold"
            style={{ fontSize: 17, color: "var(--dc-ink)", lineHeight: 1 }}
          >
            OpenDayCare
          </span>
        </div>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          onClick={handleClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col bg-surface px-4 py-6 transition-transform duration-200 lg:sticky lg:top-0 lg:z-0 lg:h-screen lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ borderRight: "1px solid var(--dc-line)" }}
      >
        <Link
          href="/"
          onClick={handleClose}
          className="flex items-center gap-[11px] px-2 pb-[22px] pt-1"
        >
          <div
            className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-xl"
            style={{
              background:
                "linear-gradient(155deg, var(--dc-brand-light), var(--dc-brand))",
            }}
          >
            <Logo />
          </div>
          <div>
            <div
              className="font-fredoka font-semibold"
              style={{ fontSize: 17, color: "var(--dc-ink)", lineHeight: 1 }}
            >
              OpenDayCare
            </div>
            <div
              style={{ fontSize: "11.5px", color: "var(--dc-ink-muted)" }}
              className="mt-0.5"
            >
              Sala Soles
            </div>
          </div>
        </Link>

        <Link
          href="/create-post"
          onClick={handleClose}
          className="mb-[18px] flex w-full items-center justify-center gap-2 rounded-[14px] px-3 py-3 font-extrabold text-white"
          style={{
            fontSize: "14.5px",
            background:
              "linear-gradient(180deg, var(--dc-brand-mid), var(--dc-brand-deep))",
            boxShadow: "0 8px 18px -8px rgba(238, 129, 100, 0.75)",
          }}
        >
          <Icon name="plus" size={17} />
          Nueva publicación
        </Link>

        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => {
            const isActive = isItemActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleClose}
                className="flex items-center gap-3 rounded-xl px-3 py-[11px]"
                style={{
                  fontSize: "14.5px",
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? "var(--dc-accent-heading)" : "var(--dc-ink-nav)",
                  background: isActive ? "var(--dc-accent-surface)" : "transparent",
                }}
              >
                <Icon name={item.icon} size={19} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div
          className="mt-[10px] pt-[14px]"
          style={{ borderTop: "1px solid var(--dc-line)" }}
        >
          <div className="flex items-center gap-[11px] px-2 py-1.5">
            <Avatar
              avatar={{
                kind: "initials",
                initials: currentUser.initials,
                bg: currentUser.avatarBg,
                color: "#fff",
              }}
              size={38}
            />
            <div className="min-w-0 flex-1">
              <div
                className="font-extrabold"
                style={{ fontSize: 14, color: "var(--dc-ink)" }}
              >
                {currentUser.name}
              </div>
              <div style={{ fontSize: 12, color: "var(--dc-ink-muted)" }}>
                {currentUser.role}
              </div>
            </div>
            <Link
              href="/login"
              title="Cerrar sesión"
              className="flex h-8 w-8 flex-none items-center justify-center rounded-[10px]"
              style={{ background: "var(--dc-canvas)", color: "var(--dc-ink-soft)" }}
            >
              <Icon name="logout" size={16} />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}