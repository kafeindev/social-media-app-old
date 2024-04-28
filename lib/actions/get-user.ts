"use server";

import { createClient } from "@/lib/supabase/server";
import { User, UserStatus } from "@/lib/types/user";

export async function getUser(): Promise<User | null> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user === null) {
    return null;
  }

  return getUserWithSupabaseUser(user);
}

export async function getUserWithId(userId: string): Promise<User | null> {
  const supabase = createClient();

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("userId", userId)
    .single();
  if (data === null) {
    return null;
  }

  return resolveData(data);
}

export async function getUserWithName(userName: string): Promise<User | null> {
  const supabase = createClient();

  const { data } = await supabase
    .from("users")
    .select("*")
    .ilike("userName", userName)
    .single();
  if (data === null) {
    return null;
  }

  return resolveData(data);
}

export async function getUserWithSupabaseUser(user: any): Promise<User | null> {
  const supabase = createClient();

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("userId", user?.id)
    .single();
  if (data === null) {
    return null;
  }

  return resolveData(data);
}

function resolveData(data: any): User {
  return {
    userId: data.userId,
    email: data.email,
    userName: data.userName,
    displayName: data.displayName || data.userName,
    aboutMe: data.aboutMe,
    avatarUrl: data.avatarUrl,
    bannerUrl: data.bannerUrl,
    status: (data.status && UserStatus[data.status]) || UserStatus.Offline,
  };
}
