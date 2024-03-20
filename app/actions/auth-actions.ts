"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { UserSchemaType } from "@/lib/definitions";
import { createClient } from "@/lib/supabase/server";

export async function signin(schema: UserSchemaType) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword(schema);
  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(schema: UserSchemaType) {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp(schema);
  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
