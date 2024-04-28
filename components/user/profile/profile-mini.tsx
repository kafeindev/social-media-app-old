import { useUserContext } from "@/contexts/user-context";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { PiSignInBold } from "react-icons/pi";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import AuthForm from "../../auth-form";
import UserSettings from "../setting/user-settings";

const ProfileMini = ({ details }: { details: boolean }) => {
  const { user, isLoading } = useUserContext();

  if (isLoading) {
    return <ProfileMiniSkeleton details={details} />;
  }

  if (user === null) {
    return (
      <Content details={details} username={"guest"} displayname={"Guest"}>
        <AuthForm>
          <Button variant="secondary" className="gap-1 font-semibold">
            <PiSignInBold size={20} />
            <h1>Log In</h1>
          </Button>
        </AuthForm>
      </Content>
    );
  }

  return (
    <Content
      details={details}
      username={user.userName}
      displayname={user.displayName || user.userName}
    >
      <Tooltip>
        <UserSettings>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <IoSettingsSharp size={24} />
            </Button>
          </TooltipTrigger>
        </UserSettings>
        <TooltipContent>
          <h1>User Settings</h1>
        </TooltipContent>
      </Tooltip>
    </Content>
  );
};

const Content = ({
  details,
  username,
  displayname,
  children,
  skeleton = false,
}: {
  details: boolean;
  username?: string;
  displayname?: string;
  children?: React.ReactNode;
  skeleton?: boolean;
}) => (
  <div className="flex w-full flex-col gap-2 rounded-md bg-popover p-2">
    <div className="flex flex-row items-center justify-between">
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-md bg-muted",
            { "h-8 w-8": !details },
            { "animate-pulse": skeleton },
            { "duration-500": !skeleton }
          )}
        >
          <FaRegUser size={20} className={cn({ hidden: skeleton })} />
        </div>
        <div
          className={cn(
            "flex flex-col gap-0.5 whitespace-nowrap opacity-100 transition-opacity duration-500",
            { "h-0 w-0 opacity-0": !details }
          )}
        >
          <h1
            className={cn("max-w-20 text-sm font-semibold", {
              "h-4 w-20 animate-pulse rounded-md bg-muted": skeleton,
            })}
          >
            {displayname}
          </h1>
          <h2
            className={cn("max-w-20 text-xs text-foreground-alt-2", {
              "mt-1 h-3 w-16 animate-pulse rounded-md bg-muted": skeleton,
            })}
          >
            {username && "@"}
            {username}
          </h2>
        </div>
      </div>
      <div
        className={cn("opacity-100 transition-opacity delay-500 duration-500", {
          "h-0 w-0 opacity-0 delay-0 duration-0": !details,
        })}
      >
        {children}
      </div>
    </div>
  </div>
);

const ProfileMiniSkeleton = ({ details }: { details: boolean }) => (
  <Content details={details} skeleton={true} />
);

export { ProfileMini, ProfileMiniSkeleton };
