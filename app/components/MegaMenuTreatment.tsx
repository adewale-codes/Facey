"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Tile = { title: string; href: string; imgSrc: string; alt?: string };

const TILES: Tile[] = [
  { title: "Face", href: "/face", imgSrc: "/mega/1.webp" },
  { title: "Body", href: "/body", imgSrc: "/mega/2.webp" },
  { title: "Hair", href: "/hair", imgSrc: "/mega/3.webp" },
  { title: "Hands", href: "/hands", imgSrc: "/mega/4.webp" },
  { title: "Wellness", href: "/wellness", imgSrc: "/mega/5.jpg" },
  {
    title: "Concerns",
    href: "/concerns",
    imgSrc: "/mega/6.webp",
  },
];

export default function MegaMenuTreatment() {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const openNow = () => {
    if (timerRef.current) clearTimeout(timerRef.current!);
    setOpen(true);
  };
  const closeSoon = () => {
    timerRef.current = window.setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      ref={wrapRef}
      className="relative hidden lg:block"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      {/* Trigger */}
      <button
        className="px-4 text-sm uppercase tracking-wide hover:opacity-80 focus:outline-none"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        Treatment
      </button>

      {/* Panel: Full-width fixed below navbar */}
      <div
        className={`fixed top-16 left-0 z-50 w-screen bg-white/90 shadow-2xl ring-1 ring-black/5 backdrop-blur transition-all duration-200 ${
          open
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-1"
        }`}
        role="menu"
        aria-label="Treatment mega menu"
      >
        {/* 6 equal-width columns */}
        <div className="grid grid-cols-6 py-2 pl-2 pr-6 gap-2">
          {TILES.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group relative h-48 overflow-hidden"
              role="menuitem"
            >
              <Image
                src={t.imgSrc}
                alt={t.alt ?? t.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
              <span className="absolute bottom-2 left-3 text-sm font-semibold uppercase tracking-wide text-white drop-shadow">
                {t.title}
              </span>
              <div className="absolute inset-0 rounded-xl ring-0 ring-white/0 transition group-hover:ring-2 group-hover:ring-white/70" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
