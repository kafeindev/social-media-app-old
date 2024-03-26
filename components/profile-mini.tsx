"use server";

import { FaRegUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { PiSignInBold } from "react-icons/pi";

import { createClient } from "@/lib/supabase/server";

import AuthForm from "./auth-form";
import UserSettings from "./user-settings";

export default async function ProfileMini() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user === null) {
    return (
      <Content
        userName="guest"
        displayName="Guest"
        other={
          <AuthForm>
            <button className="flex h-10 w-24 flex-row items-center justify-center gap-1 rounded-md bg-secondary pr-2 font-semibold transition-colors duration-150 hover:bg-secondary/70">
              <PiSignInBold size={23} />
              <h1>Login</h1>
            </button>
          </AuthForm>
        }
      />
    );
  }

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("userId", user?.id)
    .single();

  return (
    <Content
      userName={data.userName}
      displayName={data.userName}
      other={
        <UserSettings>
          <button className="flex items-center justify-center rounded-md p-1.5 transition-colors duration-200 hover:bg-secondary">
            <IoMdSettings size={25} />
          </button>
        </UserSettings>
      }
    />
  );
}

async function Content({
  userName,
  displayName,
  other,
}: {
  userName: string;
  displayName: string;
  other: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center pb-2">
      <div className="flex w-[90%] flex-col gap-2 rounded-md border border-border/60 bg-accent p-2">
        <div className="flex h-12 flex-row items-center justify-between">
          <div className="flex items-center justify-center gap-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <FaRegUser size={20} />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-sm font-semibold">{displayName}</h1>
              <h2 className="text-xs text-secondary-foreground/60">
                @{userName}
              </h2>
            </div>
          </div>
          {other}
        </div>
      </div>
    </div>
  );
}
