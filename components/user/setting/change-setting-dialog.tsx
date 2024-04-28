import React from "react";
import { TbEdit } from "react-icons/tb";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const ChangeSettingDialog = ({
  contentClassName,
  children,
}: {
  contentClassName?: string;
  children: React.ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="h-10 gap-1 text-sm">
          Edit <TbEdit size={20} className="mb-0.5" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          contentClassName,
          "flex flex-col gap-5 bg-popover p-8 pb-6"
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ChangeSettingDialog;
