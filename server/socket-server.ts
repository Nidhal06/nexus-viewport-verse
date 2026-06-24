import { Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import {
  getConversation,
  createConversation,
  addMessage,
  getAllConversations,
  updateVisitorName,
} from "../src/lib/chat-persistence";

let io: SocketIOServer | null = null;

export function initSocketServer(httpServer: HTTPServer) {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Visitor joins their private room
    socket.on("visitor:join", ({ visitorId, visitorName }) => {
      socket.join(`visitor:${visitorId}`);

      let conversation = getConversation(visitorId);
      if (!conversation) {
        conversation = createConversation(visitorId, visitorName);
      } else {
        // Always update visitor name to the latest one provided
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
      io?.to(`visitor:${visitorId}`).emit("message:new", message);

      // Send to admin
      io?.to("admin").emit("conversation:update", conversation);

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
      io?.to(`visitor:${visitorId}`).emit("message:new", message);

      // Send to admin
      io?.to("admin").emit("conversation:update", conversation);

      console.log(`Admin message to visitor ${visitorId}:`, text);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
}

export function getIO() {
  return io;
}
