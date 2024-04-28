"use client";

import { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PreviousURLContext } from "@/contexts/previous-url-context";
import { useUserContext } from "@/contexts/user-context";
import { BiMessageAltAdd } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";

import { cn } from "@/lib/utils";

import { SideBar } from "../../side-bar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

const MessagesSideBar = () => {
  const pathname = usePathname();
  const previous = useContext(PreviousURLContext);
  const { user } = useUserContext();

  const messageFields = Array.from({ length: 23 }, (_, index) => (
    <MessageField key={index} id={index.toString()} pathname={pathname} />
  ));

  return (
    <>
      <SideBar
        className={cn(
          "ml-16 min-w-64 whitespace-nowrap bg-background-alt p-2 pr-0.5 text-foreground",
          {
            "animate-slideRight duration-500":
              !previous?.startsWith("/messages"),
          }
        )}
      >
        <div className="flex items-end justify-between pl-2 pr-1.5">
          <h1 className="font-semibold">Direct Messages</h1>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex text-foreground-alt-2 transition-colors duration-300 hover:text-foreground">
                <BiMessageAltAdd size={24} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <h1>Create DM</h1>
            </TooltipContent>
          </Tooltip>
        </div>
        <hr className="my-2 h-px border" />
        <div className="flex flex-col gap-2 overflow-y-auto pr-1">
          {messageFields}
        </div>
      </SideBar>
    </>
  );
};

const MessageField = ({
  id,
  pathname,
}: {
  id: string;
  pathname: string | null;
}) => {
  return (
    <Link
      href={"/messages/" + id}
      scroll={false}
      className={cn(
        "flex h-12 w-full items-center gap-2 rounded-md p-1 transition-colors duration-300 hover:cursor-pointer hover:bg-secondary-alt/70",
        {
          "bg-secondary-alt/80 hover:bg-secondary-alt/80":
            pathname === "/messages/" + id,
        }
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
        <FaRegUser size={20} />
      </div>
      <div className="flex w-40 flex-col">
        <h1 className="text-sm text-foreground">Guest</h1>
        <h2 className="text-xs text-foreground-alt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          corporis dolore nesciunt deserunt vel laboriosam nisi! Aspernatur
          numquam officiis velit.
        </h2>
      </div>
    </Link>
  );
};

export default MessagesSideBar;
