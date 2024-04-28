import React from "react";
import { useUserContext } from "@/contexts/user-context";
import { FaRegUser } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ChangeDisplayName } from "./change-display-name";
import { ChangeEmail } from "./change-email";
import { ChangeUserName } from "./change-user-name";

const UserSettings = ({ children }: { children: React.ReactNode }) => {
  const userContext = useUserContext();
  const { user } = userContext;

  async function logOut() {
    const supabase = createClient();
    await supabase.auth.signOut();

    userContext.setUser(null);
    userContext.setLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="flex h-[55rem] w-[70rem] flex-col gap-5 bg-background-alt px-6 py-4"
      >
        <DialogHeader>
          <DialogTitle className="text-xl">My Account</DialogTitle>
          <DialogDescription>
            In this section you can manage your account.
          </DialogDescription>
        </DialogHeader>
        <div className="flex h-full w-full justify-between">
          <div className="flex h-fit w-[35rem] flex-col rounded-lg border border-border-alt bg-popover p-2">
            <div className="mb-8 flex h-40 items-center rounded-md bg-secondary">
              <div className="relative -mb-[8rem] ml-4 mr-2 flex w-full items-end gap-3">
                <div className="w-fit rounded bg-primary-alt p-4 text-foreground ring-[6px] ring-popover">
                  <FaRegUser size={35} />
                </div>
                <hr className="h-px flex-1 border border-border-alt" />
              </div>
            </div>
            <div className="flex flex-col">
              <Field
                title="User Name"
                defaultValue={user?.userName || "guest"}
                children={<ChangeUserName user={user} />}
              />
              <Field
                title="Display Name"
                defaultValue={user?.displayName || "Guest"}
                children={<ChangeDisplayName user={user} />}
              />
              <Field
                title="Email"
                defaultValue={user?.email || "guest@gmail.com"}
                children={<ChangeEmail user={user} />}
              />
              {/* <Field title="Phone Number" defaultValue="********00" /> */}
            </div>
          </div>
          <div className="flex h-full flex-col gap-2">
            <div className="inline-flex w-96 flex-col gap-4 rounded-md border border-border-alt bg-popover p-4">
              <div>
                <h1 className="text-lg font-bold">Change Password</h1>
                <h1 className="text-sm text-foreground-alt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veritatis, similique.
                </h1>
              </div>
              <div>
                <Button className="gap-1" variant="secondary">
                  Change <TbEdit size={20} />
                </Button>
              </div>
            </div>
            <div className="flex w-96 flex-col gap-4 rounded-md border border-border-alt bg-popover p-4">
              <div>
                <h1 className="text-lg font-bold">Account Removal</h1>
                <h1 className="text-sm text-foreground-alt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veritatis, similique.
                </h1>
              </div>
              <div className="flex gap-4 text-sm">
                <Button variant="destructive">Disable Account</Button>
                <Button variant="destructiveOutline">Delete Account</Button>
              </div>
            </div>
            <Button
              onClick={logOut}
              variant={"secondary"}
              size={"lg"}
              className="mt-auto gap-1 self-end text-lg font-semibold"
            >
              Log Out
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Field = ({
  title,
  defaultValue,
  children,
}: {
  title: string;
  defaultValue: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-row items-center justify-between gap-2 rounded-md p-2">
      <div className="flex flex-col gap-1">
        <h1 className="text-xs font-semibold text-foreground-alt-2">{title}</h1>
        <h1 className="text-sm text-foreground">{defaultValue}</h1>
      </div>
      {children}
    </div>
  );
};

export default UserSettings;
