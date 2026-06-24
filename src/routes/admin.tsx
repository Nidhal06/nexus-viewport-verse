import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Send, MessageCircle, Users, Clock, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Conversation {
    id: string;
    visitorId: string;
    visitorName: string;
    messages: Message[];
    createdAt: number;
    updatedAt: number;
}

interface Message {
    id: string;
    sender: "visitor" | "admin";
    text: string;
    timestamp: number;
}

export const Route = createFileRoute("/admin")({
    component: AdminChat,
});

function AdminChat() {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [input, setInput] = useState("");
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleLogin = () => {
        if (password === "7eTu6g2iyHAVdQK") {
            setAuthenticated(true);
        } else {
            alert("Incorrect password");
        }
    };

    useEffect(() => {
        if (!authenticated) return;

        const socketUrl = import.meta.env.VITE_SOCKET_SERVER_URL || "http://localhost:5173";
        const newSocket = io(socketUrl, {
            transports: ["websocket", "polling"],
        });

        newSocket.on("connect", () => {
            setConnected(true);
            console.log("Admin connected to chat server");
            newSocket.emit("admin:join");
        });

        newSocket.on("disconnect", () => {
            setConnected(false);
            console.log("Admin disconnected from chat server");
        });

        newSocket.on("conversations:all", (data: Conversation[]) => {
            setConversations(data);
            if (data.length > 0 && !selectedConversation) {
                setSelectedConversation(data[0]);
            }
        });

        newSocket.on("conversation:update", (updatedConv: Conversation) => {
            setConversations((prev) => {
                const index = prev.findIndex((c) => c.visitorId === updatedConv.visitorId);
                if (index === -1) {
                    return [updatedConv, ...prev];
                }
                const newConvs = [...prev];
                newConvs[index] = updatedConv;
                return newConvs.sort((a, b) => b.updatedAt - a.updatedAt);
            });

            if (selectedConversation?.visitorId === updatedConv.visitorId) {
                setSelectedConversation(updatedConv);
            }
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [authenticated, selectedConversation]);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [selectedConversation]);

    if (!authenticated) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <Card className="w-full max-w-md p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Lock className="h-6 w-6" />
                        <h1 className="text-2xl font-bold">Admin Login</h1>
                    </div>
                    <div className="space-y-4">
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                            placeholder="Enter admin password"
                        />
                        <Button onClick={handleLogin} className="w-full">
                            Login
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    const sendMessage = () => {
        const t = input.trim();
        if (!t || !selectedConversation || !socket) return;

        socket.emit("admin:message", {
            visitorId: selectedConversation.visitorId,
            text: t,
        });
        setInput("");
    };

    const formatTime = (timestamp: number) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString([], { month: "short", day: "numeric" });
    };

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Admin Chat Dashboard</h1>
                    <p className="text-muted-foreground mt-1">
                        {connected ? "Connected" : "Connecting..."} · {conversations.length}{" "}
                        conversations
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
                    {/* Conversations List */}
                    <Card className="lg:col-span-1 p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Users className="h-5 w-5" />
                            <h2 className="font-semibold">Conversations</h2>
                        </div>
                        <ScrollArea className="h-[calc(100%-40px)]">
                            <div className="space-y-2">
                                {conversations.length === 0 ? (
                                    <p className="text-sm text-muted-foreground text-center py-8">
                                        No conversations yet
                                    </p>
                                ) : (
                                    conversations.map((conv) => (
                                        <button
                                            key={conv.visitorId}
                                            onClick={() => setSelectedConversation(conv)}
                                            className={`w-full text-left p-3 rounded-lg transition-colors ${
                                                selectedConversation?.visitorId === conv.visitorId
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-muted hover:bg-muted/80"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-medium truncate max-w-[150px]">
                                                    {conv.visitorName || "Unknown"}
                                                </span>
                                                <span className="text-xs opacity-70 whitespace-nowrap">
                                                    {formatDate(conv.updatedAt)}
                                                </span>
                                            </div>
                                            <div className="text-sm opacity-80 truncate">
                                                {conv.messages[conv.messages.length - 1]?.text ||
                                                    "No messages"}
                                            </div>
                                            <div className="flex items-center gap-1 mt-1 text-xs opacity-60">
                                                <Clock className="h-3 w-3" />
                                                {formatTime(conv.updatedAt)}
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>
                        </ScrollArea>
                    </Card>

                    {/* Chat Area */}
                    <Card className="lg:col-span-2 flex flex-col p-4">
                        {selectedConversation ? (
                            <>
                                <div className="flex items-center gap-3 border-b pb-3 mb-3">
                                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                                        <MessageCircle className="h-5 w-5 text-primary-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">
                                            {selectedConversation.visitorName || "Unknown"}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {selectedConversation.messages.length} messages
                                        </p>
                                    </div>
                                </div>

                                <ScrollArea ref={scrollRef} className="flex-1 mb-3">
                                    <div className="space-y-3 p-2">
                                        {selectedConversation.messages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={`flex ${
                                                    msg.sender === "admin"
                                                        ? "justify-end"
                                                        : "justify-start"
                                                }`}
                                            >
                                                <div
                                                    className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                                                        msg.sender === "admin"
                                                            ? "bg-primary text-primary-foreground"
                                                            : "bg-muted"
                                                    }`}
                                                >
                                                    <p className="text-sm">{msg.text}</p>
                                                    <p className="text-xs opacity-70 mt-1">
                                                        {formatTime(msg.timestamp)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>

                                <div className="flex gap-2">
                                    <Input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                        placeholder="Type your reply..."
                                        disabled={!connected}
                                    />
                                    <Button
                                        onClick={sendMessage}
                                        disabled={!input.trim() || !connected}
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                Select a conversation to start chatting
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
