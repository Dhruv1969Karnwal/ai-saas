"use client";

import { Copy } from "lucide-react";

import { cn } from "@/lib/utils";
import { ChatBotAvatar } from "@/components/chat-bot-avatar";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
// import getCurrentUser from "@/lib/session";

export interface ChatMessageProps {
  role: "system" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
}

export const ChatMessage = ({
  role,
  content,
  isLoading,
  src,
}: ChatMessageProps) => {

    // const currentUser = await getCurrentUser()
    const {data: session} = useSession()
  return (
    <div
      className={cn(
        "group flex items-start gap-x-3 py-4 w-full",
        role === "user" && "justify-end"
      )}
    >
      {role !== "user" && src && <ChatBotAvatar src={src} />}
      <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
        {isLoading ? "Loading ..." : content}
      </div>
      {role === "user" && (
        <UserAvatar
          user={{
            name: session?.user?.name || null,
            image: session?.user?.image || null,
          }}
          className="h-8 w-8"
        />
      )}
    </div>
  );
};
