"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { Github } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";


const UserAuthForm : React.FC = () => {
  const isLoading = false;
  const isGitHubLoading = false;
  const pathname = usePathname();
  const isLoginPage = pathname === "/register";

  return (
    <div className={cn("grid gap-6")}>
      <form>
        <div className="grid gap-2">
          {isLoginPage && (
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Name
              </Label>
              <Input
                id="text"
                placeholder="abc123"
                type="name"
                autoCapitalize="none"
                autoComplete="text"
                autoCorrect="off"
              />
            </div>
          )}

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="******"
              type="password"
              autoCapitalize="none"
              autoComplete="text"
              autoCorrect="off"
            />
          </div>

          <button className={cn(buttonVariants())} disabled={isLoading}>
            Sign In
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="w-full flex-col flex space-y-4">
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={() => {
          }}
        >
          {isGitHubLoading ? (
            <p>Hello</p>
          ) : (
            <Github className="mr-2 h-4 w-4" />
          )}{" "}
          Github
        </button>
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={() => {
          }}
        >
          {isGitHubLoading ? (
            <p>Hello</p>
          ) : (
            <Github className="mr-2 h-4 w-4" />
          )}{" "}
          Github
        </button>
      </div>
    </div>
  );
};

export default UserAuthForm
