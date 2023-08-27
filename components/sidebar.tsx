"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  MessagesSquare,
  Music,
  Settings,
  VideoIcon,
  Plus,
  Home,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";
import { FreeCounter } from "@/components/free-counter";

const poppins = Montserrat({ weight: "600", subsets: ["latin"] });

interface ConversationItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  label: string;
  color: string;
}

interface RouteItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  label: string;
  color?: string;
  more?: boolean;
}

interface ConversationItemProps {
  item: ConversationItem;
}

interface RouteLinkProps {
  route: RouteItem;
  pathname: string | null;
}

interface AccordionRouteLinkProps {
  route: RouteItem;
  pathname: string | null;
  conversation: ConversationItem[];
}

const ConversationItem: React.FC<ConversationItemProps> = ({ item }) => (
  <Link href={item.href}>
    <AccordionContent key={item.label}>
      <div className="flex items-center flex-1">
        <item.icon className={cn("h-5 w-5 mr-3", item.color)} />
        {item.label}
      </div>
    </AccordionContent>
  </Link>
);

const RouteLink: React.FC<RouteLinkProps> = ({ route, pathname }) => {
  const isPathActive = pathname === route.href;
  const linkClasses = cn(
    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
    {
      "text-white bg-white/10": isPathActive,
      "text-zinc-400": !isPathActive,
    }
  );

  return (
    <Link key={route.href} href={route.href} className={linkClasses}>
      <div className="flex items-center flex-1">
        <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
        {route.label}
      </div>
    </Link>
  );
};

const AccordionRouteLink: React.FC<AccordionRouteLinkProps> = ({
  route,
  pathname,
  conversation,
}) => (
  <Link
    key={route.href}
    href={route.href === '/conversation' ? '/dashboard': route.href}
    className={cn(
      "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
      {
        "text-white bg-white/10": pathname === route.href,
        "text-zinc-400": pathname !== route.href,
      }
    )}
  >
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex items-center flex-1">
            <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
            {route.label}
          </div>
        </AccordionTrigger>
        {conversation.map((item) => (
          <ConversationItem key={item.label} item={item} />
        ))}
      </AccordionItem>
    </Accordion>
  </Link>
);

export const Sidebar = ({
  apiLimitCount = 0,
}: {
  apiLimitCount: number;
}) => {
  const pathname = usePathname();


  const conversation: ConversationItem[] = [
    {
      icon: Home,
      href: "/companion-ai",
      label: "Companion-ai",
      color: "text-gray-600",
    },
    {
      icon: Plus,
      // ? make it companion/new 
      href: "/companion/64e78d5a11dac7dddfb88888",
      label: "Create",
      color: "text-red-500",
    },
    {
      icon: MessageSquare,
      href: "/conversation",
      label: "Conversation",
      color: "text-purple-800",
    },
  ];

  const routes: RouteItem[] = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-sky-500",
      more: false,
    },
    {
      label: "Conversation",
      icon: MessagesSquare,
      href: "/conversation",
      color: "text-violet-500",
      more: true,
    },
    {
      label: "Image Generation",
      icon: ImageIcon,
      color: "text-pink-700",
      href: "/image",
      more: false,
    },
    {
      label: "Video Generation",
      icon: VideoIcon,
      color: "text-orange-700",
      href: "/video",
      more: false,
    },
    {
      label: "Music Generation",
      icon: Music,
      color: "text-emerald-500",
      href: "/music",
      more: false,
    },
    {
      label: "Code Generation",
      icon: Code,
      color: "text-green-700",
      href: "/code",
      more: false,
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      more: false,
    },
  ];

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", poppins.className)}>
            Genius
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) =>
            route.more ? (
              <AccordionRouteLink
                key={route.href}
                route={route}
                pathname={pathname}
                conversation={conversation}
              />
            ) : (
              <RouteLink key={route.href} route={route} pathname={pathname} />
            )
          )}
        </div>
      </div>
      <FreeCounter 
        apiLimitCount={apiLimitCount} 
      />
    </div>
  );
};