import { User } from "@/lib/types/user";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ChangeSettingDialog from "./change-setting-dialog";

export const ChangeEmail = ({ user }: { user: User | null }) => {
  return (
    <ChangeSettingDialog>
      <DialogHeader>
        <DialogTitle>Change your email</DialogTitle>
        <DialogDescription>Enter a new email.</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-1">
        <h1 className="text-xs font-semibold text-foreground-alt-2">Email</h1>
        <input
          className="h-11 w-72 rounded-md border bg-input p-2 text-sm placeholder-secondary outline-none invalid:border-destructive/50 focus:border-secondary focus:invalid:border-destructive"
          type="email"
          placeholder={user?.email}
          defaultValue={user?.email}
        />
      </div>
      <div className="flex gap-6 self-end justify-self-end">
        <DialogClose asChild>
          <Button variant="underline">Cancel</Button>
        </DialogClose>
        <Button size="lg" className="px-7 font-semibold">
          Done
        </Button>
      </div>
      {/* {error && (
<span className="text-xs font-medium text-destructive">
* {error.message}
</span>
)} */}
    </ChangeSettingDialog>
  );
};
