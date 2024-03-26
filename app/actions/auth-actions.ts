"use server";

import { UserSchemaType } from "@/lib/definitions";
import { createClient } from "@/lib/supabase/server";

export async function signin(schema: UserSchemaType): Promise<string | null> {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword(schema);
  if (error) {
    return error.message;
  }
  return null;
}

export async function signup(schema: UserSchemaType): Promise<string | null> {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp(schema);
  if (error) {
    return error.message;
  }

  const { error: error2 } = await supabase
    .from("users")
    .insert([{ userId: data.user?.id, userName: schema.data.userName }]);
  if (error2) {
    return error2.message;
  }

  return null;
}
