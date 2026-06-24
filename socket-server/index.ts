import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

interface Conversation {
  id: string;
  visitorName: string;
  visitorId: string;
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

const DATA_FILE = join(process.cwd(), "chat-data.json");

function loadData(): Conversation[] {
  if (!existsSync(DATA_FILE)) {
    return [];
  }
  try {
    const data = readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveData(conversations: Conversation[]) {
  writeFileSync(DATA_FILE, JSON.stringify(conversations, null, 2));
}

function getConversation(visitorId: string): Conversation | undefined {
  const conversations = loadData();
  return conversations.find((c) => c.visitorId === visitorId);
}

function createConversation(visitorId: string, visitorName: string): Conversation {
  const conversations = loadData();
  const conversation: Conversation = {
    id: Date.now().toString(),
    visitorId,
    visitorName,
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  conversations.push(conversation);
  saveData(conversations);
  return conversation;
}

function addMessage(visitorId: string, message: Message): Conversation {
  const conversations = loadData();
  const convIndex = conversations.findIndex((c) => c.visitorId === visitorId);

  if (convIndex === -1) {
    throw new Error("Conversation not found");
  }

  conversations[convIndex].messages.push(message);
  conversations[convIndex].updatedAt = Date.now();
  saveData(conversations);
  return conversations[convIndex];
}

function getAllConversations(): Conversation[] {
  return loadData().sort((a, b) => b.updatedAt - a.updatedAt);
}

function updateVisitorName(visitorId: string, newName: string): Conversation {
  const conversations = loadData();
  const convIndex = conversations.findIndex((c) => c.visitorId === visitorId);

  if (convIndex === -1) {
    throw new Error("Conversation not found");
  }

  conversations[convIndex].visitorName = newName;
  conversations[convIndex].updatedAt = Date.now();
  saveData(conversations);
  return conversations[convIndex];
}

const httpServer = createServer();
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Visitor joins their private room
  socket.on("visitor:join", ({ visitorId, visitorName }) => {
    socket.join(`visitor:${visitorId}`);

    let conversation = getConversation(visitorId);
    if (!conversation) {
      conversation = createConversation(visitorId, visitorName);
    } else {
      conversation = updateVisitorName(visitorId, visitorName);
    }

    socket.emit("conversation:history", conversation);
    console.log(`Visitor ${visitorName} joined with ID: ${visitorId}`);
  });

  // Visitor sends message
  socket.on("visitor:message", ({ visitorId, text }) => {
    const message = {
      id: Date.now().toString(),
      sender: "visitor" as const,
      text,
      timestamp: Date.now(),
    };

    const conversation = addMessage(visitorId, message);

    // Send to visitor
    io.to(`visitor:${visitorId}`).emit("message:new", message);

    // Send to admin
    io.to("admin").emit("conversation:update", conversation);

    console.log(`Message from visitor ${visitorId}:`, text);
  });

  // Admin joins admin room
  socket.on("admin:join", () => {
    socket.join("admin");
    const conversations = getAllConversations();
    socket.emit("conversations:all", conversations);
    console.log("Admin joined");
  });

  // Admin sends message to visitor
  socket.on("admin:message", ({ visitorId, text }) => {
    const message = {
      id: Date.now().toString(),
      sender: "admin" as const,
      text,
      timestamp: Date.now(),
    };

    const conversation = addMessage(visitorId, message);

    // Send to visitor
    io.to(`visitor:${visitorId}`).emit("message:new", message);

    // Send to admin
    io.to("admin").emit("conversation:update", conversation);

    console.log(`Admin message to visitor ${visitorId}:`, text);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`\n🚀 Socket.io server running on port ${PORT}`);
  console.log(`📡 Ready for connections\n`);
});
