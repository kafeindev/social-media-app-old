"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as Dialog from "./ui/dialog";
import { UserSchema, UserSchemaType } from "@/lib/definitions";
import { signin, signup } from "@/app/actions/auth-actions";
import { LockIcon, MailIcon, UserIcon, XMarkIcon } from "@/app/icons";
import { cn } from "@/lib/utils";

export default function AuthForm({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAuthModeLogin, setIsAuthModeLogin] = React.useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<UserSchemaType>({ resolver: zodResolver(UserSchema) });
  const onSubmit: SubmitHandler<UserSchemaType> = (data) => signup(data);

  function handleIsAuthModeLogin(value: boolean) {
    setIsAuthModeLogin(value);
    clearErrors(["email", "password", "data"]);
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger children={children} openHandler={setIsOpen} />
      <Dialog.Overlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Dialog.Content isOpen={isOpen}>
        <div className="flex w-[35rem] flex-col items-center rounded-lg bg-popover py-16 text-popover-foreground">
          <button
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-150 hover:bg-secondary/50"
            onClick={() => setIsOpen(false)}
          >
            {XMarkIcon}
          </button>
          <div className="flex h-full w-full flex-col items-center gap-5">
            <div className="flex h-14 w-[70%] items-center rounded-lg bg-muted/50 p-2 text-sm font-semibold">
              <button
                onClick={() => handleIsAuthModeLogin(true)}
                className={cn("h-full w-[50%] rounded-lg", {
                  "bg-secondary/80": isAuthModeLogin,
                })}
              >
                Log In
              </button>
              <button
                onClick={() => handleIsAuthModeLogin(false)}
                className={cn("h-full w-[50%] rounded-lg", {
                  "bg-secondary/80": !isAuthModeLogin,
                })}
              >
                Sign Up
              </button>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-[70%] flex-col items-center justify-between gap-8 rounded-lg border border-border/60 bg-muted/30 py-8"
            >
              <div className="mr-7 flex flex-col gap-2">
                <div className="flex flex-row items-center gap-2">
                  {MailIcon}
                  <input
                    className="h-11 w-72 rounded-lg border bg-muted p-2 text-sm placeholder-secondary outline-none invalid:border-destructive/50 focus:border-secondary focus:invalid:border-destructive"
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                  />
                </div>
                {!isAuthModeLogin && (
                  <div className="flex flex-row items-center gap-2">
                    {UserIcon}
                    <input
                      className="h-11 w-72 rounded-lg border bg-muted p-2 text-sm placeholder-secondary outline-none invalid:border-destructive/50 focus:border-secondary focus:invalid:border-destructive"
                      placeholder="User Name"
                      type="text"
                      {...register("data.userName")}
                    />
                  </div>
                )}
                <div className="flex flex-row items-center gap-2">
                  {LockIcon}
                  <input
                    className="h-11 w-72 rounded-lg border bg-muted p-2 text-sm placeholder-secondary outline-none invalid:border-destructive/50 focus:border-secondary focus:invalid:border-destructive"
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                  />
                </div>
              </div>
              <button
                onClick={() => {}}
                className="h-12 w-[70%] scale-95 justify-self-end rounded-lg bg-primary/90 text-lg font-bold transition-transform duration-200 hover:scale-100 hover:ease-out"
              >
                {isAuthModeLogin ? "Log In" : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
