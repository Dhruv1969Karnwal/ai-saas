import { redirect } from "next/navigation";
import prisma from "@/lib/db";

import { ChatClient } from "./components/client";
import getCurrentUser from "@/lib/session";

interface ChatIdPageProps {
  params: {
    chatId: string;
  }
}

const ChatIdPage = async ({
  params
}: ChatIdPageProps) => {

    const currentUser = await getCurrentUser()
    const userId = currentUser?.userId

    if(!userId) {
        return redirect('/login')
    }



  const companion = await prisma.companion.findUnique({
    where: {
      id: params.chatId
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc"
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        }
      }
    }
  });


  if (!companion) {
    return redirect("/companion-ai");
  }

  return (
    <ChatClient companion={companion} />
  );
}
 
export default ChatIdPage;