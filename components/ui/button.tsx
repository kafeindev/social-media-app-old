import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary-alt text-foreground shadow hover:bg-primary-alt-2",
        destructive:
          "bg-destructive text-foreground shadow-sm hover:bg-destructive-alt",
        destructiveOutline:
          "border border-destructive shadow-sm hover:bg-destructive hover:text-foreground",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-foreground",
        underline: "underline-offset-4 hover:underline",
        secondary:
          "bg-secondary-alt text-foreground shadow-sm hover:bg-secondary",
        ghost: "hover:bg-secondary-alt hover:text-foreground",
        link: "text-primary-alt underline-offset-4 hover:underline",
        foregroundText: "text-foreground-alt-2 hover:text-foreground",
        primaryText: "text-primary hover:text-primary-alt",
      },
      size: {
        default: "h-9 p-2",
        fit: "w-fit h-fit",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-4",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
