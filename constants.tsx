import {
  Code,
  ImageIcon,
  MessagesSquare,
  Music,
  VideoIcon,
  Plus,
  MessageSquare,
  Home,
} from "lucide-react";

export const MAX_FREE_COUNTS = 10;

interface ConToolItem {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  color: string;
  bgColor: string;
}

export const conTools: ConToolItem[] = [
  {
    label: "Companion-ai",
    icon: Home,
    href: "/companion-ai",
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
  },
  {
    label: "Create",
    icon: Plus,
    href: "/companion/64e78d5a11dac7dddfb88888",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
  },
];

interface ToolsItem {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  color: string;
  bgColor: string;
  more?: boolean;
}

export const tools: ToolsItem[] = [
  {
    label: "Conversation",
    icon: MessagesSquare,
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    more: true,
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
  },
];
