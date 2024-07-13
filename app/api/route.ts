"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const signOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};

export const signIn = async (formData: FormData) => {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/plan");
};

export const signUp = async (formData: FormData) => {
  "use server";

  // const origin = headers().get("origin");
  // const email = formData.get("email") as string;
  // const password = formData.get("password") as string;
  // const supabase = createClient();

  // const { error } = await supabase.auth.signUp({
  //   email,
  //   password,
  //   options: {
  //     emailRedirectTo: `${origin}/auth/callback`,

  //   },
  // });

  const origin = headers().get("origin");
  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;
  const newEmail = formData.get("email") as string;
  const newPassword = formData.get("password") as string;
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email: newEmail,
    password: newPassword,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/login?message=Check email to continue sign in process");
};
