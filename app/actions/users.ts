"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "../../db"
import { users } from "../../db/schema"
import { eq } from "drizzle-orm"

export type UserFormState = {
  errors: {
    username?: string
    name?: string ;
    password?: string;
    confirm_password?: string;
    _form?: string;
  };
  values: {
    username: string;
    name: string;
  };
  success?: boolean;
};

export const registerUser = async (prevState: UserFormState, formData: FormData) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = (formData.get("password") as string)
  const confirm_password = (formData.get("confirm_password") as string)

  const errors: UserFormState["errors"] = {}

  if (!username || username.length < 4) errors.username = "Username must be at least 4 characters long"
  if (!name || name.length < 4) errors.name = "Name must be at least 4 characters long"
  if (!password || password.length < 4) errors.password = "Password must be at least 4 characters long"
  if (!confirm_password || confirm_password !== password) errors.confirm_password = "Passwords do not match"

  if (Object.keys(errors).length > 0) {
    console.log("Validation errors:", errors);
    return { errors, values: { username, name }, success: false };
  }

  try {
    const existingUser = await db.select().from(users).where(eq(users.username, username)).limit(1);

    if (existingUser.length > 0) {
      return {
        errors: { username: "This username is already taken." },
        values: { username, name },
        success: false
      };
    }


    const passwordHash = await bcrypt.hash(password, 10)
    await db.insert(users).values({ username, name, passwordHash })

  } catch (error) {
    console.error("Database error during registration:", error);
    return {
      errors: { _form: "Something went wrong creating your account. Please try again later." },
      values: { username, name },
      success: false
    };
  }

  return { errors: {}, values: { username, name }, success: true }
}