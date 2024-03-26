import { IconType } from "react-icons/lib";
import { z } from "zod";

export type Page = {
  title: string;
  href: string;
  icon: IconType;
  iconOutline: IconType;
};

export const UserSignUpSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters"),
  data: z.object({
    userName: z
      .string()
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters and numbers")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters"),
  }),
});
export const UserSignInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters"),
});
export type UserSchemaType = z.infer<typeof UserSignUpSchema>;
