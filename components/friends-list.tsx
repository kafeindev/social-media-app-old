import { useState } from "react";
import { useFriendsContext } from "@/contexts/friends-context";
import { useUserContext } from "@/contexts/user-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";

import { createFriendRequest } from "@/lib/actions/get-friends";
import {
  UserNameSchema,
  UserNameSchemaType,
} from "@/lib/schemas/user-auth-schema";
import { Friend } from "@/lib/types/friend";
import { User } from "@/lib/types/user";
import { cn } from "@/lib/utils";

const ListTypes: { [key: string]: ListType } = {
  friends: {
    title: "Friends",
    filter: (friend: Friend) => friend.accepted,
  },
  pending: {
    title: "Pending",
    filter: (friend: Friend) => !friend.accepted,
  },
  blocked: {
    title: "Blocked",
    filter: (friend: Friend) => false,
  },
};

interface ListType {
  title: string;
  filter: (friend: Friend) => boolean;
}

const FriendsList = () => {
  const [listType, setListType] = useState(ListTypes.friends);
  const { user } = useUserContext();
  const { friends } = useFriendsContext();
  const friendsFiltered = friends?.filter(listType.filter);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<UserNameSchemaType>({
    resolver: zodResolver(UserNameSchema),
  });
  const sendFriendRequest = async (data: UserNameSchemaType) => {
    if (!user) {
      return;
    }

    const { error } = await createFriendRequest(user, data.userName);
    if (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mx-2 my-2 flex gap-1">
        {Object.values(ListTypes).map((type) => (
          <button
            key={type.title}
            onClick={() => setListType(type)}
            className={cn(
              "flex flex-auto justify-center rounded py-1.5 text-sm text-foreground-alt hover:bg-secondary-alt",
              {
                "bg-secondary-alt text-foreground": listType === type,
              }
            )}
          >
            {type.title}
          </button>
        ))}
      </div>
      <div className="relative mb-1 w-full items-center self-center px-2">
        <div className="flex h-full items-center rounded-md bg-accent">
          <input
            type="text"
            placeholder="Search"
            {...register("userName")}
            className="h-full w-full bg-transparent p-2 text-foreground outline-none placeholder:text-foreground-alt-2"
          />
          <span className="mx-2">
            <IoSearchOutline size={22} className="text-foreground-alt-2" />
          </span>
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-0.5 px-2 pb-1">
        <div className="flex items-center text-xs font-semibold text-foreground-alt">
          <h1>Online Friends</h1>
          {friendsFiltered && (
            <>
              <span className="mx-1 inline-block h-1 w-1 rounded-full bg-foreground-alt" />
              <h1>{friendsFiltered.length}</h1>
            </>
          )}
        </div>
        <hr className="border-t border-border-alt" />
      </div>
      <div className="mb-2 mr-0.5 flex flex-1 flex-col gap-2 overflow-y-scroll px-2">
        {friendsFiltered ? (
          friendsFiltered.map((friend) => (
            <FriendField key={friend.id} friend={friend} user={friend.user} />
          ))
        ) : (
          <FriendSkeletonList />
        )}
      </div>
    </>
  );
};

const FriendField = ({ friend, user }: { friend: Friend; user: User }) => {
  return (
    <div className="flex h-12 w-full items-center gap-2 whitespace-nowrap rounded-md p-1 transition-colors duration-300 hover:cursor-pointer hover:bg-secondary-alt/70">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
        <FaRegUser size={20} />
      </div>
      <div className="flex w-40 flex-col">
        <h1 className="text-sm text-foreground">{user.userName}</h1>
        <h2 className="text-xs text-foreground-alt-2">
          {new Date(friend.timestamp).toLocaleString()}
        </h2>
      </div>
    </div>
  );
};

const FriendSkeletonList = () => {
  return (
    <>
      {Array.from({ length: 20 }, (_, index) => (
        <FriendSkeleton key={index} />
      ))}
    </>
  );
};

const FriendSkeleton = () => {
  return (
    <div className="flex h-12 w-full items-center gap-2 p-1">
      <div className="h-10 w-10 animate-pulse rounded-md bg-accent" />
      <div className="flex w-40 flex-col gap-0.5">
        <h1 className="h-4 w-20 animate-pulse rounded-md bg-accent" />
        <h2 className="h-4 w-40 animate-pulse rounded-md bg-accent" />
      </div>
    </div>
  );
};

export { FriendsList, FriendField, FriendSkeleton, FriendSkeletonList };
