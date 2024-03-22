"use server";

import { ArrowLeftEndOnRectangleIcon, UserIcon } from "@/app/icons";
import { createClient } from "@/lib/supabase/server";
import AuthForm from "./auth-form";

export default async function ProfileMini() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex w-[90%] flex-col gap-2 rounded-lg bg-secondary/40 p-2">
      {user === null ? (
        <>
          <div className="flex h-12 flex-row items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background">
                {UserIcon}
              </div>
              <div className="flex flex-col text-xs">
                <h1 className="font-semibold">Guest</h1>
                <h2 className="text-muted-foreground/80">@guest</h2>
              </div>
            </div>
            <AuthForm>
              <button className="flex h-10 w-24 flex-row items-center justify-center gap-1 rounded-lg bg-secondary/80 pr-2 font-semibold transition-colors duration-200 hover:bg-secondary">
                <span className="h-6 w-6">{ArrowLeftEndOnRectangleIcon}</span>
                <h1>Login</h1>
              </button>
            </AuthForm>
          </div>
        </>
      ) : (
        user.email
      )}
    </div>
  );
}
