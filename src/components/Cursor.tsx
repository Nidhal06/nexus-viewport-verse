import { useEffect, useState } from "react";

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState<string | null>(null);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = (e.target as HTMLElement)?.closest("[data-cursor]") as HTMLElement | null;
      if (el) {
        setLabel(el.dataset.cursor || null);
        setHot(true);
      } else {
        setLabel(null);
        setHot(false);
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--neon)] transition-transform"
        style={{ left: pos.x, top: pos.y, boxShadow: "0 0 12px var(--neon), 0 0 24px var(--neon)" }}
      />
      <div
        className="pointer-events-none fixed z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--neon)] transition-all duration-200 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          width: hot ? 56 : 32,
          height: hot ? 56 : 32,
          borderColor: hot ? "var(--neon-2)" : "var(--neon)",
          boxShadow: hot ? "0 0 30px var(--glow)" : "0 0 12px var(--glow)",
          mixBlendMode: "screen",
        }}
      />
      {label && (
        <div
          className="pointer-events-none fixed z-[9999] -translate-y-1/2 translate-x-6 rounded-full bg-[var(--popover)] px-3 py-1 text-xs font-medium tracking-wider uppercase text-[var(--neon)] neon-border"
          style={{ left: pos.x, top: pos.y }}
        >
          {label}
        </div>
      )}
    </>
  );
}
