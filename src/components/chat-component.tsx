import { useState, useEffect, useRef } from "react";
import { sendMessage, fetchMessages } from "../lib/chat-server";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
}

export function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sender, setSender] = useState("");
  const [lastTimestamp, setLastTimestamp] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch initial messages
  useEffect(() => {
    fetchMessages({}).then((msgs) => {
      setMessages(msgs);
      if (msgs.length > 0) {
        setLastTimestamp(msgs[msgs.length - 1].timestamp);
      }
    });
  }, []);

  // Poll for new messages every 1 second
  useEffect(() => {
    const interval = setInterval(async () => {
      if (lastTimestamp > 0) {
        const newMessages = await fetchMessages({ since: lastTimestamp });
        if (newMessages.length > 0) {
          setMessages((prev) => [...prev, ...newMessages]);
          setLastTimestamp(newMessages[newMessages.length - 1].timestamp);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastTimestamp]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !sender.trim()) return;

    const message = await sendMessage({ text: input, sender });
    setMessages((prev) => [...prev, message]);
    setLastTimestamp(message.timestamp);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="flex flex-col h-[600px] w-full max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <Input
          placeholder="Enter your name..."
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          className="mb-2"
        />
      </div>

      <ScrollArea className="flex-1 mb-4 p-4 border rounded-md" ref={scrollRef}>
        <div className="space-y-3">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === sender ? "items-end" : "items-start"
                }`}
              >
                <span className="text-xs text-gray-500 mb-1">{msg.sender}</span>
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.sender === sender
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-xs text-gray-400 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <div className="flex gap-2">
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={!sender}
        />
        <Button onClick={handleSend} disabled={!input.trim() || !sender}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
