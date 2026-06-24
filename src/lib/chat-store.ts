// Simple in-memory chat message store
interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
}

let messages: Message[] = [];

export function addMessage(text: string, sender: string): Message {
  const message: Message = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    text,
    sender,
    timestamp: Date.now(),
  };
  messages.push(message);
  // Keep last 100 messages
  if (messages.length > 100) {
    messages = messages.slice(-100);
  }
  return message;
}

export function getMessages(): Message[] {
  return messages;
}

export function getMessagesAfter(timestamp: number): Message[] {
  return messages.filter((m) => m.timestamp > timestamp);
}
