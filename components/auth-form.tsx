import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CgSpinner } from "react-icons/cg";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import { FaLock } from "react-icons/fa";
import { IconType } from "react-icons/lib";

import { signIn, signUp } from "@/lib/actions/auth-actions";
import {
  UserSchemaType,
  UserSignInSchema,
  UserSignUpSchema,
} from "@/lib/schemas/user-auth-schema";
import { cn } from "@/lib/utils";

import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const AuthForm = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<null | string>(null);
  const [isAuthModeLogin, setIsAuthModeLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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

    const promise = isAuthModeLogin ? signIn(data) : signUp(data);
    promise.then((error) => {
      setIsLoading(false);

      if (error !== null) {
        setError(error);
        return;
      }

      clearErrors(["email", "password", "data"]);
      window.location.reload();
    });
  }

  function handleIsAuthModeLogin(value: boolean) {
    setIsAuthModeLogin(value);
    clearErrors(["email", "password", "data"]);
    setError(null);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col bg-background-alt p-14 pb-8">
        <div className="absolute left-2 top-2 flex flex-row items-end gap-1 text-xs font-semibold text-foreground/50">
          <FaLock size={18} />
          <h1>Authentication</h1>
        </div>

        <div className="flex h-full w-full flex-col items-center gap-5">
          <div className="flex h-14 w-96 items-center rounded-md bg-accent p-2 text-sm font-semibold">
            <button
              onClick={() => handleIsAuthModeLogin(true)}
              className={cn("h-full w-[50%] rounded-md", {
                "bg-secondary-alt": isAuthModeLogin,
              })}
            >
              Log In
            </button>
            <button
              onClick={() => handleIsAuthModeLogin(false)}
              className={cn("h-full w-[50%] rounded-md", {
                "bg-secondary-alt": !isAuthModeLogin,
              })}
            >
              Sign Up
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-96 flex-col items-center justify-between gap-8 rounded-md border border-border-alt bg-popover py-10"
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
                  placeholder="User Name"
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
              {error && <p className="text-sm text-destructive">{error}</p>}
              <button
                type="submit"
                disabled={isLoading}
                className="flex h-12 w-64 scale-90 items-center justify-center justify-self-end rounded-md bg-primary-alt text-lg font-bold transition-transform duration-300 hover:scale-100 hover:ease-out disabled:scale-100 disabled:bg-primary-alt/20"
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
      </DialogContent>
    </Dialog>
  );
};

const FormField = ({
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
}) => {
  const Icon = icon; //
  return (
    <div className="flex flex-col gap-1">
      <div className="relative flex items-center gap-2">
        <input
          className="h-11 w-72 rounded-md border bg-input p-2 text-sm placeholder-secondary outline-none invalid:border-destructive/50 focus:border-secondary focus:invalid:border-destructive"
          type={type}
          placeholder={placeholder}
          {...register(registerValue, { required: true })}
        />
        <Icon size={24} className="absolute right-2 text-foreground-alt-2" />
      </div>
      {error && (
        <span className="text-xs font-medium text-destructive">
          * {error.message}
        </span>
      )}
    </div>
  );
};

export default AuthForm;
