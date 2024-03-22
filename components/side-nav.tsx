"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { Logo } from "@/app/icons";
import { PAGES } from "@/lib/constants";
import { Page } from "@/lib/definitions";
import { cn } from "@/lib/utils";

export default function SideNav({
  profileMini,
}: {
  profileMini: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="fixed flex min-h-screen min-w-64 flex-col justify-between border-r bg-card text-card-foreground">
      <div className="m-2 flex h-full flex-col items-center">
        <a
          href="https://github.com/KafeinDev/social-media-app"
          target="_blank"
          className="flex w-full flex-row items-center gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-secondary/10"
        >
          <span className="w-12 text-[#bb99f6]">{Logo}</span>
          <div className="flex flex-col pb-2 font-semibold">
            <h1>Social</h1>
            <h1>Media App</h1>
          </div>
        </a>
        <hr className="my-2 h-px w-full border-border" />
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
      <div className="flex flex-col items-center pb-2">{profileMini}</div>
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
        "flex h-11 w-full items-center gap-5 rounded-lg px-3 text-lg text-muted-foreground transition-colors duration-200 hover:bg-secondary/30",
        {
          "bg-secondary/30": isSelected,
        }
      )}
    >
      <span
        className={cn("flex w-7 items-center justify-center font-semibold", {
          "font-bold text-foreground": isSelected,
        })}
      >
        {icon}
      </span>
      <h1 className={cn({ "font-bold text-foreground": isSelected })}>
        {page.title}
      </h1>
    </Link>
  );
}
