import { z } from "zod";

export type Page = {
  title: string;
  href: string;
  iconOutline: JSX.Element;
  iconSolid: JSX.Element;
};

export const UserSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
    confirmPassword: z.string(),
    data: z.object({
      userName: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters"),
      userUID: z.string(),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type UserSchemaType = z.infer<typeof UserSchema>;
