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

export function getConversation(visitorId: string): Conversation | undefined {
  const conversations = loadData();
  return conversations.find((c) => c.visitorId === visitorId);
}

export function createConversation(visitorId: string, visitorName: string): Conversation {
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

export function addMessage(visitorId: string, message: Message): Conversation {
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

export function getAllConversations(): Conversation[] {
  return loadData().sort((a, b) => b.updatedAt - a.updatedAt);
}

export function updateVisitorName(visitorId: string, newName: string): Conversation {
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
