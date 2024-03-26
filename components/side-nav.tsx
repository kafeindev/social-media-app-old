"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { PAGES } from "@/lib/constants";
import { Page } from "@/lib/definitions";
import { cn } from "@/lib/utils";

export default function SideNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="fixed flex min-h-screen min-w-64 flex-col justify-between border-r bg-background-alt text-foreground">
      <div className="m-2 flex h-full flex-col items-center">
        <a
          href="https://github.com/KafeinDev/social-media-app"
          target="_blank"
          className="flex w-full flex-row items-center gap-3 rounded-md p-2 transition-colors duration-200 hover:bg-secondary/20"
        >
          <Image
            src="logo.svg"
            alt="logo"
            height={100}
            width={100}
            style={{ width: "3rem" }}
          />
          <div className="flex flex-col pb-2 font-semibold">
            <h1>Social</h1>
            <h1>Media App</h1>
          </div>
        </a>
        <hr className="my-2 h-px w-full border border-border-alt" />
        <div className="flex w-full flex-col gap-2">
          {Object.entries(PAGES).map(([key, page]) => (
            <NavLink
              key={key}
              page={page}
              isSelected={pathname === page.href}
            />
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}

export function NavLink({
  page,
  isSelected,
}: Readonly<{
  page: Page;
  isSelected: boolean;
}>) {
  const Icon = isSelected ? page.icon : page.iconOutline;
  return (
    <Link
      href={page.href}
      className={cn(
        "flex h-11 w-full items-center gap-5 rounded-md px-3 text-lg text-muted-foreground transition-colors duration-200 hover:bg-secondary/30",
        {
          "bg-secondary/30 font-semibold text-foreground": isSelected,
        }
      )}
    >
      <Icon size={30} />
      <h1>{page.title}</h1>
    </Link>
  );
}
