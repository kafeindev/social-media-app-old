"use server";

import { SupabaseClient } from "@supabase/supabase-js";

import { UserSchemaType } from "@/lib/schemas/user-auth-schema";
import { createClient } from "@/lib/supabase/server";

export async function signIn(schema: UserSchemaType): Promise<string | null> {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword(schema);
  return error ? error.message : null;
}

export async function signUp(schema: UserSchemaType): Promise<string | null> {
  const supabase = createClient();

  const isUserNameAvailable = await checkUserNameAvailable(
    schema.data.userName,
    supabase
  );
  if (!isUserNameAvailable) {
    return "Username is unavailable";
  }

  supabase.auth.updateUser;

  const { data, error } = await supabase.auth.signUp(schema);
  if (error) {
    return error.message;
  }

  const { error: error2 } = await supabase.from("users").insert([
    {
      userId: data.user?.id,
      email: schema.email,
      userName: schema.data.userName,
    },
  ]);
  return error2 ? error2.message : null;
}

export async function checkUserNameAvailable(
  userName: string,
  supabase?: SupabaseClient
) {
  if (!supabase) {
    supabase = createClient();
  }

  const { data: user } = await supabase
    .from("users")
    .select("userName")
    .ilike("userName", userName)
    .single();
  return user ? false : true;
}
