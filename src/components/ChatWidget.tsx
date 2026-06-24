import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { io, Socket } from "socket.io-client";

type Msg = { id: string; sender: "visitor" | "admin"; text: string; timestamp: number };

function formatTime(timestamp: number) {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function ChatWidget({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
    const [msgs, setMsgs] = useState<Msg[]>([
        {
            id: "welcome",
            sender: "admin",
            text: "Hello — I'm Nidhal. Ask me about my work, skills, or journey.",
            timestamp: Date.now(),
        },
    ]);
    const [input, setInput] = useState("");
    const [visitorName, setVisitorName] = useState("");
    const [visitorId] = useState(() => {
        const stored = localStorage.getItem("chat_visitor_id");
        if (stored) return stored;
        const newId = "visitor_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
        localStorage.setItem("chat_visitor_id", newId);
        return newId;
    });
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedName = localStorage.getItem("chat_visitor_name");
        if (savedName) setVisitorName(savedName);
    }, []);

    useEffect(() => {
        if (!open) return;

        const newSocket = io("http://localhost:5173", {
            transports: ["websocket", "polling"],
        });

        newSocket.on("connect", () => {
            setConnected(true);
            console.log("Connected to chat server");

            if (visitorName) {
                newSocket.emit("visitor:join", { visitorId, visitorName });
            }
        });

        newSocket.on("disconnect", () => {
            setConnected(false);
            console.log("Disconnected from chat server");
        });

        newSocket.on("conversation:history", (conversation: any) => {
            setMsgs(conversation.messages || []);
        });

        newSocket.on("message:new", (message: Msg) => {
            setMsgs((prev) => [...prev, message]);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [open, visitorId, visitorName]);

    useEffect(() => {
        if (visitorName && socket && connected) {
            socket.emit("visitor:join", { visitorId, visitorName });
            localStorage.setItem("chat_visitor_name", visitorName);
        }
    }, [visitorName, socket, connected, visitorId]);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [msgs]);

    const send = () => {
        const t = input.trim();
        if (!t || !visitorName.trim() || !socket) return;

        socket.emit("visitor:message", { visitorId, text: t });
        setInput("");
    };

    return (
        <>
            <button
                data-cursor="Chat"
                onClick={() => setOpen(!open)}
                className="glass neon-border fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full transition-transform hover:scale-110"
                aria-label="Chat"
            >
                {open ? (
                    <X className="h-5 w-5 text-[var(--neon)]" />
                ) : (
                    <MessageCircle className="h-5 w-5 text-[var(--neon)]" />
                )}
                {!open && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400 animate-pulse-glow" />
                )}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 200, damping: 22 }}
                        className="glass neon-border fixed bottom-24 right-6 z-50 flex h-[480px] w-[360px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl"
                    >
                        <div className="flex items-center gap-3 border-b border-[var(--border)] p-3">
                            <div className="relative">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full neon-border text-sm font-bold text-[var(--neon)]">
                                    💬
                                </div>
                                <span
                                    className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-[var(--background)] ${connected ? "bg-green-400" : "bg-red-400"}`}
                                />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-semibold">Live Chat</div>
                                <div className="text-[10px] text-[var(--muted-foreground)]">
                                    {connected ? "Online" : "Connecting..."}
                                </div>
                            </div>
                        </div>

                        <div ref={scrollRef} className="flex-1 space-y-2 overflow-auto p-3">
                            {!visitorName && (
                                <div className="text-center text-xs text-[var(--muted-foreground)] py-4">
                                    Enter your name below to start chatting
                                </div>
                            )}
                            {msgs.map((m) => (
                                <div
                                    key={m.id}
                                    className={`flex ${m.sender === "visitor" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className="max-w-[80%]">
                                        <div
                                            className={`rounded-2xl px-3 py-2 text-sm ${
                                                m.sender === "visitor"
                                                    ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                                                    : "glass text-[var(--foreground)]"
                                            }`}
                                        >
                                            {m.text}
                                            <div className="mt-0.5 text-[9px] opacity-60">
                                                {formatTime(m.timestamp)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-[var(--border)] p-2">
                            <input
                                data-cursor="type"
                                value={visitorName}
                                onChange={(e) => setVisitorName(e.target.value)}
                                placeholder="Your name..."
                                className="glass mb-2 w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:neon-border"
                            />
                            <div className="flex gap-2">
                                <input
                                    data-cursor="type"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && send()}
                                    placeholder="Type a message…"
                                    disabled={!visitorName || !connected}
                                    className="glass flex-1 rounded-lg border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:neon-border disabled:opacity-50"
                                />
                                <button
                                    data-cursor="Send"
                                    onClick={send}
                                    disabled={!input.trim() || !visitorName || !connected}
                                    className="glass neon-border flex h-10 w-10 items-center justify-center rounded-lg disabled:opacity-50"
                                >
                                    <Send className="h-4 w-4 text-[var(--neon)]" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
