import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "dark" | "light" | null;
    const initial =
      stored ?? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    apply(initial);
    setTheme(initial);
  }, []);

  const apply = (t: "dark" | "light") => {
    document.documentElement.classList.toggle("light", t === "light");
    document.documentElement.classList.toggle("dark", t === "dark");
  };

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    apply(next);
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  return (
    <button
      data-cursor="toggle"
      onClick={toggle}
      className="glass neon-border fixed top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full transition-transform hover:scale-110"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Moon className="h-5 w-5 text-[var(--neon)]" />
      ) : (
        <Sun className="h-5 w-5 text-[var(--neon)]" />
      )}
    </button>
  );
}
