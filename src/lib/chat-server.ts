import { createServerFunction } from "@tanstack/react-start/server";
import { addMessage, getMessages, getMessagesAfter } from "./chat-store";

export const sendMessage = createServerFunction({ method: "POST" })
  .validator((data: { text: string; sender: string }) => data)
  .handler(async ({ data }) => {
    const message = addMessage(data.text, data.sender);
    return message;
  });

export const fetchMessages = createServerFunction({ method: "GET" })
  .validator((data: { since?: number } | undefined) => data ?? {})
  .handler(async ({ data }) => {
    if (data.since) {
      return getMessagesAfter(data.since);
    }
    return getMessages();
  });
