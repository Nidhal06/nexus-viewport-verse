import { useEffect, useState } from "react";

export function Particles() {
  const [seeds, setSeeds] = useState<{ l: number; d: number; s: number; o: number }[]>([]);
  useEffect(() => {
    setSeeds(
      Array.from({ length: 40 }, () => ({
        l: Math.random() * 100,
        d: 8 + Math.random() * 14,
        s: Math.random() * 8,
        o: 0.3 + Math.random() * 0.5,
      })),
    );
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {seeds.map((p, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[var(--neon)]"
          style={{
            left: `${p.l}%`,
            bottom: 0,
            opacity: p.o,
            boxShadow: "0 0 8px var(--neon)",
            animation: `particle-rise ${p.d}s linear ${p.s}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
