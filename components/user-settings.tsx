"use client";

import React from "react";
import { FaRegUser } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { HiMiniXMark } from "react-icons/hi2";
import { LuUserX } from "react-icons/lu";
import { PiSignOutBold } from "react-icons/pi";
import { TbEdit } from "react-icons/tb";

import { createClient } from "@/lib/supabase/client";

import * as Dialog from "./ui/dialog";

export default function UserSettings({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSettingsChanged, setIsSettingsChanged] = React.useState(false);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsOpen(false);
    window.location.reload();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const defaultValue = event.target.defaultValue;
    const value = event.target.value;
    if (defaultValue !== value) {
      setIsSettingsChanged(true);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger children={children} openHandler={setIsOpen} />
      <Dialog.Overlay
        isOpen={isOpen}
        onClose={() => !isSettingsChanged && setIsOpen(false)}
      />
      <Dialog.Content isOpen={isOpen}>
        <div className="flex h-[50rem] w-[55rem] rounded-lg bg-card">
          <button
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-150 hover:bg-secondary/50"
            onClick={() => !isSettingsChanged && setIsOpen(false)}
          >
            <HiMiniXMark size={30} />
          </button>

          <div className="absolute left-2 top-2 flex flex-row items-center justify-center gap-1 text-xs font-semibold text-foreground/50">
            <FaRegUser size={18} />
            <h1>User Settings</h1>
          </div>

          <div className="mt-12 flex h-[90%] w-full justify-center">
            <div className="flex w-[90%] flex-col rounded-lg bg-muted shadow-xl">
              <div className="flex h-48 w-full items-center justify-center rounded-md bg-secondary">
                <div className="z-1 relative -mb-[14rem] flex h-36 w-36 items-center justify-center rounded-full bg-muted text-foreground ring-[0.5rem] ring-secondary">
                  <FaRegUser size={75} />
                </div>
              </div>
              <div className="mt-16 flex flex-row px-8">
                <div className="flex w-full flex-col flex-wrap gap-6">
                  <h1 className="text-lg font-bold text-white">
                    Account Settings
                  </h1>
                  <Field
                    title="User Name"
                    type="text"
                    defaultValue="guest"
                    onChange={handleChange}
                  />
                  <Field
                    title="Email"
                    type="email"
                    defaultValue="guest@gmail.com"
                    onChange={handleChange}
                  />
                  <Field
                    title="Display Name"
                    type="text"
                    defaultValue="Guest"
                    onChange={handleChange}
                  />
                  <Field
                    title="Phone Number"
                    type="tel"
                    defaultValue="********00"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col items-center justify-around gap-5">
                  <button className="relative inline-flex h-12 w-40 items-center justify-center rounded-md bg-accent pr-6 font-semibold text-accent-foreground transition-colors duration-200 hover:bg-secondary/90">
                    Profile Settings
                    <FaArrowUpRightFromSquare
                      size={18}
                      className="absolute right-2"
                    />
                  </button>
                  <button className="relative inline-flex h-12 w-[11.3rem] items-center justify-center rounded-md bg-accent pr-6 font-semibold text-accent-foreground transition-colors duration-200 hover:bg-secondary/90">
                    Change Password
                    <TbEdit size={25} className="absolute right-1" />
                  </button>
                  <button
                    onClick={signOut}
                    className="relative inline-flex h-12 w-28 items-center justify-center rounded-md bg-destructive pr-5 font-semibold text-accent-foreground transition-colors duration-200 hover:bg-destructive/70"
                  >
                    Sign Out
                    <PiSignOutBold size={22} className="absolute right-1" />
                  </button>
                  <button className="inline-flex h-10 items-center justify-center gap-2 font-semibold decoration-1 hover:underline">
                    Delete Account
                    <LuUserX size={22} />
                  </button>
                </div>
              </div>
              {isSettingsChanged && (
                <div className="z-1 absolute bottom-3 right-14 flex">
                  <button
                    onClick={() => setIsSettingsChanged(false)}
                    className="h-12 w-24 scale-90 rounded-md bg-secondary font-bold transition-transform duration-200 hover:scale-100 hover:ease-out"
                  >
                    Reset
                  </button>
                  <button className="h-12 w-36 scale-90 rounded-md bg-primary font-bold transition-transform duration-200 hover:scale-100 hover:ease-out">
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}

function Field({
  title,
  type,
  defaultValue,
  onChange,
}: {
  title: string;
  type: string;
  defaultValue: string;
  onChange: any;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xs font-semibold text-foreground/70">{title}</h1>
      <input
        type={type}
        className="h-11 w-64 rounded-md border bg-input p-2 text-sm text-foreground placeholder-secondary outline-none invalid:border-destructive/50 focus:border-secondary focus:invalid:border-destructive"
        placeholder={title}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
}
