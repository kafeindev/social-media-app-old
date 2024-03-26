"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CgSpinner } from "react-icons/cg";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import { FaLock } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import { IconType } from "react-icons/lib";

import {
  UserSchemaType,
  UserSignInSchema,
  UserSignUpSchema,
} from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { signin, signup } from "@/app/actions/auth-actions";

import * as Dialog from "./ui/dialog";

export default function AuthForm({ children }: { children: React.ReactNode }) {
  const [error, setError] = React.useState<null | string>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAuthModeLogin, setIsAuthModeLogin] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<UserSchemaType>({
    resolver: zodResolver(
      isAuthModeLogin ? UserSignInSchema : UserSignUpSchema
    ),
  });

  async function onSubmit(data: UserSchemaType) {
    setIsLoading(true);

    if (isAuthModeLogin) {
      setError(await signin(data));
    } else {
      setError(await signup(data));
    }

    setIsLoading(false);
  }

  function handleIsAuthModeLogin(value: boolean) {
    setIsAuthModeLogin(value);
    clearErrors(["email", "password", "data"]);
    setError(null);
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger children={children} openHandler={setIsOpen} />
      <Dialog.Overlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Dialog.Content isOpen={isOpen}>
        <div className="flex w-[35rem] flex-col items-center rounded-md bg-card py-16">
          <div className="absolute left-2 top-2 flex flex-row items-center justify-center gap-1 text-xs font-semibold text-foreground/50">
            <FaLock size={18} />
            <h1>Authentication</h1>
          </div>

          <button
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-150 hover:bg-secondary/50"
            onClick={() => setIsOpen(false)}
          >
            <HiMiniXMark size={30} />
          </button>

          <div className="flex h-full w-full flex-col items-center gap-5">
            <div className="flex h-14 w-[70%] items-center rounded-md bg-muted p-2 text-sm font-semibold">
              <button
                onClick={() => handleIsAuthModeLogin(true)}
                className={cn("h-full w-[50%] rounded-md", {
                  "bg-secondary": isAuthModeLogin,
                })}
              >
                Log In
              </button>
              <button
                onClick={() => handleIsAuthModeLogin(false)}
                className={cn("h-full w-[50%] rounded-md", {
                  "bg-secondary": !isAuthModeLogin,
                })}
              >
                Sign Up
              </button>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-[70%] flex-col items-center justify-between gap-8 rounded-md border border-border bg-popover py-10"
            >
              <div className="flex flex-col gap-3">
                <FormField
                  icon={CiMail}
                  type="email"
                  placeholder="Email"
                  register={register}
                  registerValue="email"
                  error={errors.email}
                />
                {!isAuthModeLogin && (
                  <FormField
                    icon={CiUser}
                    type="text"
                    placeholder="Name"
                    register={register}
                    registerValue="data.userName"
                    error={errors.data?.userName}
                  />
                )}
                <FormField
                  icon={CiLock}
                  type="password"
                  placeholder="Password"
                  register={register}
                  registerValue="password"
                  error={errors.password}
                />
              </div>
              <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                {error && <p className="text-xs text-destructive">{error}</p>}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex h-12 w-[70%] scale-95 items-center justify-center justify-self-end rounded-md bg-primary text-lg font-bold transition-transform duration-200 hover:scale-100 hover:ease-out disabled:scale-100 disabled:bg-primary/20"
                >
                  {isLoading ? (
                    <CgSpinner className="h-8 w-8 animate-spin text-foreground" />
                  ) : isAuthModeLogin ? (
                    "Log In"
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}

function FormField({
  icon,
  type,
  placeholder,
  register,
  registerValue,
  error,
}: {
  icon: IconType;
  type: string;
  placeholder: string;
  register: any;
  registerValue: string;
  error: any;
}) {
  const Icon = icon; //
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <input
          className="h-11 w-72 rounded-md border bg-input p-2 text-sm placeholder-secondary outline-none invalid:border-destructive/50 focus:border-secondary focus:invalid:border-destructive"
          type={type}
          placeholder={placeholder}
          {...register(registerValue, { required: true })}
          required
        />
        <Icon size={25} className="absolute right-36 text-foreground/70" />
      </div>
      {error && (
        <span className="text-xs font-medium text-destructive">
          * {error.message}
        </span>
      )}
    </div>
  );
}
