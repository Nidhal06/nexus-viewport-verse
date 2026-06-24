import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Github, ExternalLink, Github as Gh, Linkedin, Mail, MessageCircle } from "lucide-react";

const projects = [
  {
    name: "EdPath AI",
    desc: "AI-powered learning path generator using Groq API. Creates personalized week-by-week roadmaps with Firebase Auth & Firestore.",
    stack: ["React", "Node.js", "Groq API", "Firebase", "TailwindCSS"],
    github: "https://github.com/Nidhal06/edpath-ai",
    demo: "https://edpath-front.vercel.app/",
    color: "from-[oklch(0.6_0.2_265)] to-[oklch(0.55_0.2_200)]",
  },
  {
    name: "La Maison — Restaurant Web App",
    desc: "Full-stack restaurant platform with admin dashboard, reservations system, real-time analytics charts and Firebase backend built with Next.js 16 and React 19.",
    stack: ["Next.js", "React", "TypeScript", "Firebase", "TailwindCSS", "Recharts"],
    github: "https://github.com/Nidhal06/restaurant-app",
    demo: "https://restaurant-app-pearl-xi.vercel.app/",
    color: "from-[oklch(0.6_0.2_320)] to-[oklch(0.55_0.2_260)]",
  },
  {
    name: "Real-Time Chat",
    desc: "Full-stack realtime chat app with Firebase Auth, Firestore, Socket.IO, Express + TypeScript, and React + Vite frontend.",
    stack: ["React", "TypeScript", "Socket.IO", "Firebase"],
    github: "https://github.com/Nidhal06/Real-Time-Chat",
    demo: "https://real-time-chat-three-jet.vercel.app/",
    color: "from-[oklch(0.65_0.18_180)] to-[oklch(0.55_0.2_240)]",
  },
  {
    name: "Medicare Booking",
    desc: "Healthcare platform frontend built with React, Vite, and TailwindCSS that enables patients to find doctors and book appointments.",
    stack: ["React", "Vite", "TailwindCSS"],
    github: "https://github.com/Nidhal06/Book-An-Appointment",
    demo: "https://book-an-appointment-livid.vercel.app/",
    color: "from-[oklch(0.65_0.2_30)] to-[oklch(0.55_0.2_320)]",
  },
];

export function ProjectsWorld() {
  return (
    <div className="grid h-full grid-cols-1 gap-5 overflow-auto p-2 md:grid-cols-2">
      {projects.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, y: 30, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: i * 0.08, type: "spring", stiffness: 120 }}
          whileHover={{ y: -6, rotateX: 4, rotateY: -4, scale: 1.02 }}
          style={{ transformStyle: "preserve-3d" }}
          className="glass neon-border group relative overflow-hidden rounded-2xl p-5"
          data-cursor="View"
        >
          <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${p.color} opacity-20`} />
          <div className="mb-3 flex items-start justify-between">
            <div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-[var(--neon-2)]">
                Project · 0{i + 1}
              </div>
              <h3 className="mt-1 text-2xl font-bold neon-text">{p.name}</h3>
            </div>
            <div className="flex gap-2 opacity-70 transition-opacity group-hover:opacity-100">
              <a
                data-cursor="GitHub"
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.name} on GitHub`}
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                data-cursor="Live demo"
                href={p.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.name} live demo`}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
          <p className="text-sm text-[var(--muted-foreground)]">{p.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-[var(--border)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--neon)]"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const skills = [
  "React", "Node.js", "Express", "MongoDB", "Tailwind",
  "JavaScript", "TypeScript", "Next.js", "Git", "Docker",
  "OpenAI", "Supabase", "Postman", "Vercel", "Render", "Windows",
];

export function SkillsWorld() {
  const R1 = 140, R2 = 220, R3 = 300;
  const rings = [
    { r: R1, items: skills.slice(0, 5) },
    { r: R2, items: skills.slice(5, 10) },
    { r: R3, items: skills.slice(10) },
  ];
  return (
    <div className="relative grid h-full place-items-center overflow-hidden">
      <div className="relative h-[640px] w-[640px] max-h-[90%] max-w-[90%]">
        {rings.map((ring, ri) => (
          <div
            key={ri}
            className="absolute inset-0 m-auto rounded-full border border-dashed border-[var(--border)]"
            style={{ width: ring.r * 2, height: ring.r * 2, animation: `spin-slow ${30 + ri * 15}s linear ${ri % 2 ? "reverse" : ""} infinite` }}
          >
            {ring.items.map((s, i) => {
              const a = (360 / ring.items.length) * i;
              return (
                <div
                  key={s}
                  className="absolute top-1/2 left-1/2"
                  style={{ transform: `rotate(${a}deg) translate(${ring.r}px) rotate(-${a}deg)` }}
                >
                  <div
                    data-cursor={s}
                    className="glass neon-border -translate-x-1/2 -translate-y-1/2 cursor-none rounded-xl px-3 py-2 font-mono text-xs text-[var(--neon)] hover:scale-110 transition-transform"
                    style={{ animation: `spin-slow ${30 + ri * 15}s linear ${ri % 2 ? "" : "reverse"} infinite` }}
                  >
                    {s}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div className="absolute inset-0 m-auto flex h-24 w-24 items-center justify-center rounded-full neon-border glass">
          <div className="text-center">
            <div className="text-xl font-bold neon-text">N.G</div>
            <div className="text-[8px] tracking-widest uppercase text-[var(--muted-foreground)]">core</div>
          </div>
        </div>
      </div>
    </div>
  );
}





export function ContactWorld() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          email,
          subject,
          message,
          from_name: email,
        }),
      });

      const data = (await response.json()) as { success?: boolean };
      if (data.success) {
        setEmail("");
        setSubject("");
        setMessage("");
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="grid h-full grid-cols-1 gap-5 md:grid-cols-2">
      <div className="glass neon-border rounded-2xl p-5 font-mono text-xs">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[oklch(0.65_0.24_25)]" />
          <div className="h-3 w-3 rounded-full bg-[oklch(0.8_0.18_85)]" />
          <div className="h-3 w-3 rounded-full bg-[oklch(0.7_0.2_150)]" />
          <span className="ml-2 text-[var(--muted-foreground)]">nidhal@portfolio: ~/contact</span>
        </div>
        <div className="space-y-1 text-[var(--neon-2)]">
          <div>$ whoami</div>
          <div className="text-[var(--foreground)]">nidhal gharbi — full-stack developer</div>
          <div>$ status --availability</div>
          <div className="flex items-center gap-2 text-[var(--foreground)]">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse-glow" />
            available for new projects
          </div>
          <div>$ ping --location</div>
          <div className="text-[var(--foreground)]">tunis, tn · remote-friendly · UTC+1</div>
          <div>$ contact --channels</div>
        </div>
        <div className="mt-3 flex gap-3">
          <a data-cursor="GitHub" href="https://github.com/Nidhal06" className="glass neon-border flex h-10 w-10 items-center justify-center rounded-lg"><Gh className="h-4 w-4 text-[var(--neon)]" /></a>
          <a data-cursor="LinkedIn" href="https://www.linkedin.com/in/nidhal-gharbi-536140385/" className="glass neon-border flex h-10 w-10 items-center justify-center rounded-lg"><Linkedin className="h-4 w-4 text-[var(--neon)]" /></a>
          <a data-cursor="Email" href="mailto:nidhalgharbi5@gmail.com" className="glass neon-border flex h-10 w-10 items-center justify-center rounded-lg"><Mail className="h-4 w-4 text-[var(--neon)]" /></a>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="glass neon-border flex flex-col gap-3 rounded-2xl p-5"
      >
        <div className="font-mono text-[10px] tracking-widest uppercase text-[var(--neon-2)]">
          // transmit message
        </div>
        <input
          data-cursor="type"
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.name@domain.io"
          className="glass rounded-lg border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:neon-border"
        />
        <input
          data-cursor="type"
          type="text"
          name="subject"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="subject"
          className="glass rounded-lg border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:neon-border"
        />
        <textarea
          data-cursor="type"
          name="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="your message…"
          rows={6}
          className="glass flex-1 rounded-lg border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:neon-border"
        />
        {status === "success" && (
          <p className="font-mono text-xs text-green-400">Message transmitted. I&apos;ll reply soon.</p>
        )}
        {status === "error" && (
          <p className="font-mono text-xs text-red-400">
            {import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
              ? "Transmission failed. Please try again."
              : "Missing email config. Add VITE_WEB3FORMS_ACCESS_KEY to .env"}
          </p>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          data-cursor="Send"
          className="glass neon-border rounded-lg px-4 py-2 text-sm font-semibold uppercase tracking-widest text-[var(--neon)] transition-transform hover:scale-[1.02] disabled:opacity-50"
        >
          {status === "sending" ? "Transmitting…" : "Transmit ↗"}
        </button>
      </form>
    </div>
  );
}

export function ChatWorld({ open }: { open: () => void }) {
  return (
    <div className="grid h-full place-items-center">
      <div className="glass neon-border max-w-md rounded-2xl p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full neon-border">
          <MessageCircle className="h-7 w-7 text-[var(--neon)]" />
        </div>
        <h2 className="text-2xl font-bold neon-text">Live Chat Portal</h2>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Real conversations. No AI. Typically replies within 1 hour.
        </p>
        <button
          onClick={open}
          data-cursor="Open"
          className="glass neon-border mt-5 rounded-lg px-5 py-2 text-sm font-semibold uppercase tracking-widest text-[var(--neon)]"
        >
          Open Channel
        </button>
      </div>
    </div>
  );
}

