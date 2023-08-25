"use client";

import { Companion, Message } from "@prisma/client";


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
  console.log(companion)

  return (
    <div className="flex flex-col h-full p-4 space-y-2">
        {companion.messages.length}
    </div>
   );
}