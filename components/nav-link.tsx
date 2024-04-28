"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Page } from "@/lib/types/page";
import { cn } from "@/lib/utils";

const NavLink = ({
  page,
  isSelected,
  isTitleVisible = true,
  className,
  ...children
}: {
  page: Page;
  isSelected: boolean;
  isTitleVisible?: boolean;
  className?: string;
  children?: React.ReactNode;
}) => {
  const icon = !isSelected && page.iconOutline ? page.iconOutline : page.icon;
  return (
    <Link
      href={page.href}
      scroll={false}
      className={cn(
        className,
        "flex h-11 w-full items-center gap-5 rounded-md px-3 text-foreground-alt-2 transition-colors duration-200 hover:bg-secondary/30",
        { "bg-secondary/30 font-semibold text-foreground": isSelected }
      )}
    >
      <span className="transition-none">{icon}</span>
      <h1
        className={cn("opacity-100 transition-opacity duration-500", {
          "h-0 w-0 opacity-0": !isTitleVisible,
        })}
      >
        {page.title}
      </h1>
      {Object.values(children)}
    </Link>
  );
};

const NavLinkWrapper = ({
  pages,
  isTitleVisible = true,
  className,
  ...children
}: {
  pages: Array<[string, Page]>;
  isTitleVisible?: boolean;
  className?: string;
  children?: React.ReactNode;
}) => {
  const pathname = usePathname();
  return (
    <div className={cn(className, "flex flex-col gap-2")}>
      {pages.map(([key, page]) => (
        <NavLink
          key={key}
          page={page}
          isSelected={
            pathname === page.href ||
            (pathname !== null &&
              pathname.startsWith(page.href) &&
              page.href !== "/")
          }
          isTitleVisible={isTitleVisible}
        />
      ))}
      {Object.values(children)}
    </div>
  );
};

export { NavLink, NavLinkWrapper };
