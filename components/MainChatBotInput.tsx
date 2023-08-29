"use client";

import { MessagesContext } from '@/context/messages'
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { FC, HTMLAttributes, useState, useContext, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { nanoid } from 'nanoid'
import { Message } from "@/lib/validations/message";

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const MainChatBotInput: FC<ChatInputProps> = ({ className, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [input, setInput] = useState<string>("");
  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(MessagesContext)

  const { mutate: sendMessage, isLoading } = useMutation({
    mutationFn: async (message: Message) => {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [message] }),
      });

      return response.body;
    },
    onMutate(message) {
      addMessage(message)
    },
    onSuccess: async (stream) => {
      console.log("success")
      if (!stream) throw new Error('No stream')

      const id = nanoid()
      const responseMessage: Message = {
        id,
        isUserMessage: false,
        text: '',
      }

      addMessage(responseMessage)

      setIsMessageUpdating(true)

      const reader = stream.getReader()
      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)
        // console.log(chunkValue)
        updateMessage(id, (prev) => prev + chunkValue)
      }

      setIsMessageUpdating(false)
      setInput('')

      setTimeout(() => {
        textareaRef.current?.focus()
      }, 10)
    },
  });

  return (
    <div {...props} className={cn("border-t border-zinc-300", className)}>
      <div className="relative mt-4 mb-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutosize
        ref={textareaRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()

            const message: Message = {
              id: nanoid(),
              isUserMessage: true,
              text: input,
            }

            sendMessage(message)
          }
        }}
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxRows={4}
          autoFocus
          placeholder="Write a message..."
          className="peer disabled:opacity-50 pr-4 pl-4 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6 border-x-0 border-y-0"
        />
      </div>
    </div>
  );
};

export default MainChatBotInput;
