"use client";

import { Companion, Message } from "@prisma/client";
import { ChatHeader } from "@/components/chat-header";

interface ChatClientProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    }
  };
};

export const ChatClient = ({
  companion,
}: ChatClientProps) => {
  // console.log(companion.userId)
  // const type = typeof companion.userId
  // console.log(type)

  

  return (
    <div className="flex flex-col h-full p-4 space-y-2">
        <ChatHeader companion={companion} />
    </div>
   );
}