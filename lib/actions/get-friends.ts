"use server";

import { createClient } from "../supabase/server";
import { Friend } from "../types/friend";
import { User } from "../types/user";
import { getUserWithId, getUserWithName } from "./get-user";

export async function getFriends(user: User): Promise<null | Friend[]> {
  const supabase = createClient();

  const { data } = await supabase
    .from("friends")
    .select("*")
    .or("requesterId.eq." + user.userId + ",receiverId.eq." + user.userId);
  if (data === null) {
    return null;
  }

  const users = await Promise.all(
    data.map((friend) =>
      getUserWithId(
        friend.requesterId === user.userId
          ? friend.receiverId
          : friend.requesterId
      )
    )
  );
  return users.map((user, index) => ({
    ...data[index],
    user,
  }));
}

export async function createFriendRequest(
  user: User,
  targetName: string
): Promise<{ error: string | null }> {
  const supabase = createClient();

  const targetUser = await getUserWithName(targetName);
  if (targetUser === null) {
    return { error: "User not found" };
  }

  const { error } = await supabase.from("friends").insert({
    requesterId: user.userId,
    receiverId: targetUser.userId,
    timestamp: new Date().toISOString(),
    accepted: false,
  });
  if (error) {
    return { error: error.message };
  }
  return { error: null };
}
