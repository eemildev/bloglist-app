// actions/me.ts
"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const generateApiToken = async () => {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "User not authenticated", success: false, apiToken: undefined }
  }

  try {
    const newToken = crypto.randomUUID()

    await db
      .update(users)
      .set({ apiToken: newToken })
      .where(eq(users.id, Number(session.user.id)))

    revalidatePath("/me")
    
    // Return the new token in the action state
    return { success: true, apiToken: newToken, error: undefined }
  } catch (error: unknown) {
    return {
      error: error instanceof Error ? error.message : "Failed to generate token",
      success: false,
      apiToken: "",
    }
  }
}