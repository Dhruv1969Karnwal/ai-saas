"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { formSchemaLogin } from "@/lib/validations/auth";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormSchemaType = z.infer<typeof formSchemaLogin>;

export function UserAuthFormLogin({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchemaLogin),
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
  //   setIsLoading(true);

  //   const signInResult = await signIn("credentials", {
  //     ...data,
  //     // redirect: false,
  //     callbackUrl: searchParams?.get("from") || "/dashboard",
  //   })
  //     .then((callback) => {
  //       setIsLoading(false);

  //       if (callback?.ok) {
  //         toast({
  //           title: "redirect to dashboard page",
  //           description:
  //             "We sent you a login link. Be sure to check your spam too.",
  //           variant: "success",
  //         });
  //       }

  //       if (callback?.error) {
  //         toast({
  //           title: "Something went wrong.",
  //           description: "Your sign in request failed. Please try again.",
  //           variant: "destructive",
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       console.error("Sign-in error:", error);

  //       toast({
  //         title: "An error occurred.",
  //         description: "There was an issue signing in. Please try again.",
  //         variant: "destructive",
  //       });
  //     });

  //   // console.log("signInResult",signInResult)
  // };

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    setIsLoading(true);

    const signInResult = await signIn("credentials", {
      ...data,
      redirect: true,
      callbackUrl: searchParams?.get("from") || "/dashboard",
    })
      .then((callback) => {
        setIsLoading(false);

        
        console.log("callback",callback?.ok)

        if (callback?.ok) {
          toast({
            title: "Redirecting to the dashboard page",
            description:
              "We sent you a login link. Be sure to check your spam too.",
            variant: "success",
          });
        }
        if (callback?.error) {
          toast({
            title: "Something went wrong.",
            description: "Your sign in request failed. Please try again.",
            variant: "destructive",
          });
        }

        // Delay the redirection slightly after showing the toast
      //   setTimeout(() => {
      //     window.location.href = "/dashboard";
      //   }, 2000); // 2 seconds delay, adjust as needed
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Sign-in error:", error);

        toast({
          title: "An error occurred.",
          description: "There was an issue signing in. Please try again.",
          variant: "destructive",
        });
      });

      console.log("signInResult",signInResult)
  };

  //   const signInResult = await signIn("credentials", {
  //     ...data,
  //     // callbackUrl: searchParams?.get("from") || "/dashboard",
  //     redirect: false
  //   });
  //   console.log("After signIn call");
  //   console.log("signInResult:", signInResult);

  //   // console.log(signInResult?.ok)

  //   setIsLoading(false);

  //   if (!signInResult?.ok) {
  //     return toast({
  //       title: "Something went wrong.",
  //       description: "Your sign in request failed. Please try again.",
  //       variant: "destructive",
  //     });
  //   }

  //   return toast({
  //     title: "redirect to dashboard page",
  //     description: "We sent you a login link. Be sure to check your spam too.",
  //     variant: "success",
  //   });
  // };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
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
              disabled={isLoading || isGitHubLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="******"
              type="password"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
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
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGitHubLoading(true);
          signIn("github");
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </button>
    </div>
  );
}
