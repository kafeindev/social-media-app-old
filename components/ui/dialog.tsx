import React from "react";

import { cn } from "@/lib/utils";

const Root = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div className={className} ref={ref} {...props} />
));

const Trigger = React.forwardRef<
  HTMLButtonElement,
  {
    children: React.ReactNode;
    openHandler: React.Dispatch<React.SetStateAction<boolean>>;
  }
>(({ children, openHandler }, ref) => {
  return React.cloneElement(children as React.ReactElement, {
    onClick: () => openHandler(true),
    ref: ref,
  });
});

const Content = React.forwardRef<
  HTMLDivElement,
  {
    isOpen: boolean;
    className?: string;
    children?: React.ReactNode;
  }
>(
  ({ isOpen, className, children }, ref) =>
    isOpen && (
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        className={cn(
          "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform animate-contentShow",
          className
        )}
        ref={ref}
      >
        {children}
      </div>
    )
);

const Overlay = React.forwardRef<
  HTMLDivElement,
  {
    isOpen: boolean;
    onClose: () => void;
  }
>(
  ({ isOpen, onClose, ...props }, ref) =>
    isOpen && (
      <div
        aria-modal="true"
        aria-hidden={!isOpen}
        className="fixed inset-0 z-50 bg-black opacity-50"
        onClick={onClose}
        ref={ref}
        {...props}
      />
    )
);

export { Content, Overlay, Root, Trigger };
