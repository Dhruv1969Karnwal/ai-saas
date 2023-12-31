"use client"
import { SafeUser } from "@/lib/safeUser";
import Link from "next/link";
import { UserAvatar } from "@/components/user-avatar";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarTopProps {
    currentUser?: SafeUser | null;
  }

export function NavbarTop({ currentUser }: NavbarTopProps) {
    const handleSignOut = async () => {
        await signOut({
          callbackUrl: `${window.location.origin}/login`,
        });
      };
  return (
     <div className="flex w-full justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar
              user={{ name: currentUser?.name || null, image: currentUser?.image || null }}
              className="h-8 w-8"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                {currentUser?.name && <p className="font-medium">{currentUser?.name}</p>}
                {currentUser?.email && (
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {currentUser?.email}
                  </p>
                )}
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/billing">Billing</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleSignOut}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> 
  )
}
