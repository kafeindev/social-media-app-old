"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { Logo } from "@/app/icons";
import { PAGES } from "@/lib/constants";
import { Page } from "@/lib/definitions";
import { cn } from "@/lib/utils";
// import ProfileMini from "./account/profile-mini";

export default function SideNav() {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen min-w-64 flex-col justify-between border border-r bg-card text-card-foreground">
      <div className="m-2 flex h-full flex-col items-center">
        <a
          href="https://github.com/KafeinDev/social-media-app"
          target="_blank"
          className="flex w-full flex-row items-center gap-3 rounded-lg p-2 hover:bg-secondary/10"
        >
          <span className="w-12 text-[#1FD8A4]">{Logo}</span>
          <div className="flex flex-col pb-2 font-semibold">
            <h1>Social</h1>
            <h1>Media App</h1>
          </div>
        </a>
        <hr className="my-2 h-px w-full text-border" />
        <div className="flex w-full flex-col items-center justify-center gap-2">
          {Object.entries(PAGES).map(([key, page]) => (
            <NavLink
              key={key}
              page={page}
              isSelected={pathname === page.href}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        {/* <ProfileMini /> */}
        <h1 className="text-xs text-card-foreground/50">© 2024 Kafein LLC</h1>
      </div>
    </div>
  );
}

export function NavLink({
  page,
  isSelected,
}: Readonly<{ page: Page; isSelected: boolean }>) {
  const icon = isSelected ? page.iconSolid : page.iconOutline;
  return (
    <Link
      href={page.href}
      className={cn(
        "flex h-12 w-full items-center gap-5 rounded-lg px-3 text-lg transition-colors duration-200 hover:bg-secondary/20",
        {
          "bg-secondary/20": isSelected,
        }
      )}
    >
      <span className="flex w-7 items-center justify-center font-semibold">
        {icon}
      </span>
      <h1 className={cn({ "font-bold": isSelected })}>{page.title}</h1>
    </Link>
  );
}
