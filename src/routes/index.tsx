import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Code2, Brain, Briefcase, Send, MessageCircle, Power } from "lucide-react";
import { Cursor } from "@/components/Cursor";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Particles } from "@/components/Particles";
import { Laptop } from "@/components/Laptop";
import { ChatWidget } from "@/components/ChatWidget";
import {
    ProjectsWorld,
    SkillsWorld,
    ContactWorld,
    ChatWorld,
} from "@/components/Worlds";

export const Route = createFileRoute("/")({
    head: () => ({
        meta: [
            { title: "Nidhal Gharbi · Full-Stack Developer" },
            {
                name: "description",
                content:
                    "Cinematic interactive portfolio of Nidhal Gharbi — a full-stack developer crafting futuristic digital experiences.",
            },
            { property: "og:title", content: "Nidhal Gharbi · Full-Stack Developer" },
            {
                property: "og:description",
                content: "Enter a futuristic developer universe through the laptop portal.",
            },
        ],
    }),
    component: Experience,
});

type Scene = "home" | "dashboard" | "projects" | "skills" | "experience" | "contact" | "chat";

const cards = [
    { id: "projects", label: "Projects", desc: "Selected work & experiments", Icon: Code2 },
    { id: "skills", label: "Skills", desc: "Tech orbit & expertise", Icon: Brain },
    { id: "contact", label: "Contact", desc: "Open transmission line", Icon: Send },
    { id: "chat", label: "Live Chat", desc: "Real human conversation", Icon: MessageCircle },
] as const;

function Experience() {
    const [scene, setScene] = useState<Scene>("home");
    const [hovered, setHovered] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);

    const go = (s: Scene) => setScene(s);
    const backTo = (s: Scene) => setScene(s);

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <Cursor />
            <ThemeToggle />

            {/* Persistent background */}
            <div className="absolute inset-0 grid-bg opacity-30" />
            <Particles />

            {/* Top brand */}
            <div className="pointer-events-none absolute top-6 left-6 z-40 font-mono text-[10px] tracking-[0.4em] uppercase text-[var(--muted-foreground)]">
                nidhal.gharbi <span className="text-[var(--neon)]">// full-stack developer</span>
            </div>

            <AnimatePresence mode="wait">
                {scene === "home" && (
                    <HomeScene
                        key="home"
                        onEnter={() => go("dashboard")}
                        hovered={hovered}
                        setHovered={setHovered}
                    />
                )}
                {scene === "dashboard" && (
                    <Dashboard key="dashboard" onPick={go} onPower={() => go("home")} />
                )}
                {scene !== "home" && scene !== "dashboard" && (
                    <SceneShell
                        key={scene}
                        title={titleOf(scene)}
                        onBack={() => backTo("dashboard")}
                    >
                        {scene === "projects" && <ProjectsWorld />}
                        {scene === "skills" && <SkillsWorld />}
                        {scene === "contact" && <ContactWorld />}
                        {scene === "chat" && <ChatWorld open={() => setChatOpen(true)} />}
                    </SceneShell>
                )}
            </AnimatePresence>

            <ChatWidget open={chatOpen} setOpen={setChatOpen} />
        </div>
    );
}

function titleOf(s: Scene) {
    return (
        {
            projects: "Projects",
            skills: "Skills",
            contact: "Contact",
            chat: "Live Chat",
        }[s as "projects"] ?? ""
    );
}

function HomeScene({
    onEnter,
    hovered,
    setHovered,
}: {
    onEnter: () => void;
    hovered: boolean;
    setHovered: (v: boolean) => void;
}) {
    return (
        <motion.section
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.4, filter: "blur(20px)" }}
            transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center"
        >
            <div className="mb-10 text-center">
                <div className="font-mono text-[10px] tracking-[0.6em] uppercase text-[var(--neon-2)]">
                    welcome to my
                </div>
                <h1 className="mt-2 text-5xl font-bold tracking-tight neon-text md:text-7xl">
                    Portfolio
                </h1>
                <div className="mt-3 text-sm text-[var(--muted-foreground)]">
                    Click the laptop to enter the portal
                </div>
            </div>
            <Laptop onEnter={onEnter} hovered={hovered} setHovered={setHovered} />
        </motion.section>
    );
}

function Dashboard({ onPick, onPower }: { onPick: (s: Scene) => void; onPower: () => void }) {
    return (
        <motion.section
            key="dashboard"
            initial={{ opacity: 0, scale: 1.6, filter: "blur(30px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
            className="absolute inset-0 grid place-items-center p-8"
        >
            <div className="glass neon-border relative flex h-[88vh] w-[92vw] max-w-6xl flex-col overflow-hidden rounded-3xl p-6">
                {/* Header */}
                <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.65_0.24_25)]" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.8_0.18_85)]" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.2_150)]" />
                        </div>
                        <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-[var(--muted-foreground)]">
                            nidhal.os // main hub
                        </div>
                    </div>
                    <button
                        data-cursor="Exit"
                        onClick={onPower}
                        className="glass flex h-9 w-9 items-center justify-center rounded-full neon-border"
                    >
                        <Power className="h-4 w-4 text-[var(--neon)]" />
                    </button>
                </div>

                {/* Greeting */}
                <div className="mb-6">
                    <div className="text-3xl font-bold neon-text">Welcome back, Visitor.</div>
                    <div className="text-sm text-[var(--muted-foreground)]">
                        Select a node to dive into a world.
                    </div>
                </div>

                {/* Cards grid */}
                <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                    {cards.map((c, i) => (
                        <motion.button
                            key={c.id}
                            data-cursor="Enter"
                            onClick={() => onPick(c.id as Scene)}
                            initial={{ opacity: 0, y: 30, rotateX: -15 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 140 }}
                            whileHover={{ y: -8, rotateX: 6, rotateY: -6, scale: 1.03 }}
                            style={{ transformStyle: "preserve-3d" }}
                            className="glass neon-border group relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 text-left"
                        >
                            <div
                                className="absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100"
                                style={{
                                    background:
                                        "radial-gradient(circle at 50% 0%, color-mix(in oklab, var(--neon) 30%, transparent), transparent 70%)",
                                }}
                            />
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl neon-border">
                                <c.Icon className="h-5 w-5 text-[var(--neon)]" />
                            </div>
                            <div className="mt-6">
                                <div className="font-mono text-[10px] tracking-widest uppercase text-[var(--neon-2)]">
                                    Node · 0{i + 1}
                                </div>
                                <div className="mt-1 text-2xl font-bold">{c.label}</div>
                                <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                                    {c.desc}
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between text-[10px] tracking-widest uppercase text-[var(--neon)]">
                                <span>Enter ↗</span>
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon)] animate-pulse-glow" />
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}

function SceneShell({
    title,
    onBack,
    children,
}: {
    title: string;
    onBack: () => void;
    children: React.ReactNode;
}) {
    return (
        <motion.section
            initial={{ opacity: 0, scale: 1.3, filter: "blur(24px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
            className="absolute inset-0 grid place-items-center p-6"
        >
            <div className="glass neon-border relative flex h-[90vh] w-[94vw] max-w-7xl flex-col overflow-hidden rounded-3xl p-6">
                <div className="mb-4 flex items-center justify-between">
                    <button
                        data-cursor="Back"
                        onClick={onBack}
                        className="glass flex items-center gap-2 rounded-full neon-border px-4 py-2 text-xs uppercase tracking-widest text-[var(--neon)]"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" /> Hub
                    </button>
                    <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-[var(--muted-foreground)]">
                        world // <span className="text-[var(--neon)]">{title}</span>
                    </div>
                    <div className="h-9 w-9" />
                </div>
                <div className="flex-1 overflow-hidden">{children}</div>
            </div>
        </motion.section>
    );
}
