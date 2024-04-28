import React from "react";

import { cn } from "@/lib/utils";

const SideBar = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("fixed flex h-full flex-col border-r", className)}
    {...props}
  >
    {children}
  </div>
);

export { SideBar };
