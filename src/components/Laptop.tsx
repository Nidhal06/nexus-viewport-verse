import { motion } from "framer-motion";
import { Code2, Brain, MessageCircle, Send, Play } from "lucide-react";
import portraitImg from "@/assets/nidhal-portrait.jpg";

type Props = { onEnter: () => void; hovered: boolean; setHovered: (v: boolean) => void };

const orbitIcons = [
    { Icon: Code2, label: "Projects", angle: 0 },
    { Icon: Brain, label: "Skills", angle: 90 },
    { Icon: Send, label: "Contact", angle: 180 },
    { Icon: MessageCircle, label: "Chat", angle: 270 },
];

export function Laptop({ onEnter, hovered, setHovered }: Props) {
    return (
        <div className="relative scene-stage" style={{ width: 720, maxWidth: "92vw" }}>
            {/* Orbit icons */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="relative h-[520px] w-[520px] animate-spin-slow">
                    {orbitIcons.map(({ Icon, label, angle }) => (
                        <div
                            key={label}
                            className="absolute top-1/2 left-1/2"
                            style={{
                                transform: `rotate(${angle}deg) translate(260px) rotate(-${angle}deg)`,
                            }}
                        >
                            <div className="-translate-x-1/2 -translate-y-1/2 animate-pulse-glow">
                                <div className="glass neon-border flex h-14 w-14 items-center justify-center rounded-2xl">
                                    <Icon className="h-6 w-6 text-[var(--neon)]" />
                                </div>
                                <div className="mt-2 text-center text-[10px] tracking-[0.3em] uppercase text-[var(--muted-foreground)]">
                                    {label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Laptop */}
            <motion.div
                className="relative animate-float"
                animate={{
                    rotateX: hovered ? -8 : -14,
                    rotateY: hovered ? 0 : -2,
                    scale: hovered ? 1.04 : 1,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 16 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                <button
                    data-cursor="Enter"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={onEnter}
                    className="group relative block w-full"
                >
                    {/* Screen */}
                    <div
                        className="glass neon-border relative mx-auto aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black"
                        style={{ transform: "translateZ(20px)" }}
                    >
                        {/* Wallpaper */}
                        <img
                            src={portraitImg}
                            alt="Nidhal portrait"
                            className="absolute inset-0 h-full w-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="absolute inset-0 grid-bg opacity-40" />
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[color-mix(in_oklab,var(--neon)_15%,transparent)] to-transparent" />

                        {/* Minimal UI overlay */}
                        <div className="relative flex h-full flex-col justify-between p-5">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-[var(--neon)] animate-pulse-glow" />
                                <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--neon)]">
                                    nidhal.os // v2.6
                                </span>
                            </div>
                            <div className="flex items-end justify-between">
                                <div className="font-mono text-[10px] text-[var(--neon-2)]">
                                    &gt; booting portfolio…
                                    <br />
                                    &gt; mounting scenes…
                                    <br />
                                    &gt; ready.
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <div className="relative h-20 w-20 rounded-full border-3 border-[var(--neon)] animate-spin-slow flex items-center justify-center">
                                        <Play className="text-[var(--neon)]" size={24} />
                                    </div>
                                    <span className="text-[12px] tracking-widest uppercase text-[var(--neon)] font-semibold">
                                        click to enter
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Scanline */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-30"
                            style={{
                                background:
                                    "linear-gradient(transparent 50%, color-mix(in oklab, var(--neon) 20%, transparent) 50%)",
                                backgroundSize: "100% 4px",
                            }}
                        />
                    </div>

                    {/* Hinge + base */}
                    <div className="relative mx-auto mt-1 h-3 w-[103%] -translate-x-[1.5%] rounded-b-xl bg-gradient-to-b from-[oklch(0.3_0.04_270)] to-[oklch(0.18_0.03_270)]" />
                    <div
                        className="relative mx-auto h-4 w-[108%] -translate-x-[4%] rounded-b-3xl bg-gradient-to-b from-[oklch(0.22_0.04_270)] to-[oklch(0.12_0.02_270)]"
                        style={{ transform: "translateZ(-10px) translateX(-4%)" }}
                    />
                    {/* Glow under */}
                    <div
                        className="absolute -bottom-12 left-1/2 h-20 w-3/4 -translate-x-1/2 rounded-[50%] blur-3xl"
                        style={{ background: "var(--glow)" }}
                    />
                </button>
            </motion.div>
        </div>
    );
}
