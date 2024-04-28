"use client";

import { Suspense, useState } from "react";
import { useUserContext } from "@/contexts/user-context";
import {
  IoChatbubble,
  IoChatbubbleOutline,
  IoNotifications,
  IoNotificationsOutline,
  IoPeopleOutline,
  IoPeopleSharp,
} from "react-icons/io5";

import { User } from "@/lib/types/user";
import { cn } from "@/lib/utils";

import { FriendSkeletonList, FriendsList } from "../../friends-list";
import { SideBar } from "../../side-bar";

const ControlPanels: { [key: string]: ControlPanel } = {
  friends: {
    key: "friends",
    icon: <IoPeopleSharp size={22} />,
    iconOutline: <IoPeopleOutline size={22} />,
    value: <FriendsList />,
    valueSkeleton: <FriendSkeletonList />,
  },
  messages: {
    key: "messages",
    icon: <IoChatbubble size={22} />,
    iconOutline: <IoChatbubbleOutline size={22} />,
    value: null,
    valueSkeleton: null,
  },
  notifications: {
    key: "notifications",
    icon: <IoNotifications size={22} />,
    iconOutline: <IoNotificationsOutline size={22} />,
    value: null,
    valueSkeleton: null,
  },
};

interface ControlPanel {
  key: string;
  icon: JSX.Element;
  iconOutline: JSX.Element;
  value: React.ReactNode | null;
  valueSkeleton: React.ReactNode | null;
}

export const FriendsSideBar = () => {
  const [currentPanel, setCurrentPanel] = useState(ControlPanels.friends);

  return (
    <SideBar className="right-0 min-w-64 max-w-64 border-l border-r-0 bg-background-alt">
      {currentPanel.value && currentPanel.valueSkeleton && (
        <Suspense fallback={currentPanel.valueSkeleton}>
          {currentPanel.value}
        </Suspense>
      )}
      <div className="my-1.5 mt-auto flex h-11 w-full gap-1 self-center px-1">
        {Object.values(ControlPanels).map((panel) => (
          <button
            key={panel.key}
            onClick={() => setCurrentPanel(panel)}
            className={cn(
              "flex flex-auto items-center justify-center rounded-md text-foreground-alt-2 transition-colors duration-200 hover:bg-secondary-alt",
              {
                "bg-primary-alt text-foreground hover:bg-primary-alt":
                  panel === currentPanel,
              }
            )}
          >
            {panel === currentPanel ? panel.icon : panel.iconOutline}
          </button>
        ))}
      </div>
    </SideBar>
  );
};
