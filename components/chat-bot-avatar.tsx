import { Avatar, AvatarImage } from "@/components/ui/avatar"

interface ChatBotAvatarProps {
  src: string;
};

export const ChatBotAvatar = ({
  src
}: ChatBotAvatarProps) => {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={src} />
    </Avatar>
  );
};