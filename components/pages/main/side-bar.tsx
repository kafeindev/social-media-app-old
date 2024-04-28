"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AiFillMessage, AiOutlineMessage } from "react-icons/ai";
import {
  IoHome,
  IoHomeOutline,
  IoNotifications,
  IoNotificationsOutline,
  IoSearch,
  IoSearchOutline,
} from "react-icons/io5";

import { Page } from "@/lib/types/page";
import { cn } from "@/lib/utils";

import { NavLinkWrapper } from "../../nav-link";
import { SideBar } from "../../side-bar";
import { ProfileMini } from "../../user/profile/profile-mini";

export const PAGES: { [key: string]: Page } = {
  home: {
    title: "Home",
    href: "/",
    icon: <IoHome size={24} />,
    iconOutline: <IoHomeOutline size={24} />,
  },
  explore: {
    title: "Explore",
    href: "/explore",
    icon: <IoSearch size={24} />,
    iconOutline: <IoSearchOutline size={24} />,
  },
  notifications: {
    title: "Notifications",
    href: "/notifications",
    icon: <IoNotifications size={24} />,
    iconOutline: <IoNotificationsOutline size={24} />,
  },
  messages: {
    title: "Messages",
    href: "/messages",
    icon: <AiFillMessage size={24} />,
    iconOutline: <AiOutlineMessage size={24} />,
  },
};

export const MainSideBar = () => {
  const pathname = usePathname();
  const isOpen = pathname === "/";

  return (
    <SideBar
      className={cn(
        "z-20 w-16 animate-slideRight bg-background-alt p-2 text-foreground duration-500",
        { "w-64": isOpen }
      )}
    >
      <a
        href="https://github.com/KafeinDev/social-media-app"
        target="_blank"
        className="flex flex-row items-center gap-3 rounded-md p-2 transition-colors duration-200 hover:bg-secondary/20"
      >
        <Image
          src="/logo.svg"
          alt="logo"
          height={100}
          width={100}
          priority={true}
          style={{
            width: isOpen ? "3rem" : "2rem",
            transition: "width 500ms",
          }}
        />
        <div
          className={cn(
            "flex flex-col whitespace-nowrap pb-2 font-semibold opacity-100 transition-opacity duration-500",
            { "h-0 w-0 opacity-0": !isOpen }
          )}
        >
          <h1>Social</h1>
          <h1>Media App</h1>
        </div>
      </a>
      <hr className="my-2 h-px border" />
      <div className="flex h-full flex-col justify-between">
        <NavLinkWrapper isTitleVisible={isOpen} pages={Object.entries(PAGES)} />
        <ProfileMini details={isOpen} />
      </div>
    </SideBar>
  );
};
