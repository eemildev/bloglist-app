"use server"

import { revalidatePath } from "next/cache"
import { createReadingListItem, deleteReadingListItem, markReadingListItemAsRead } from "../services/reading-list"
import { auth } from "@/auth"

export const addReadingListItem = async (formData: FormData) => {
  const session = await auth()
  if (!session) {
    return { error: "You are not logged in" }
  }

  const id = Number(formData.get("id")) //blog id

  await createReadingListItem(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}

export const removeReadingListItem = async (formData: FormData) => {
  const session = await auth()
    if (!session) {
    return { error: "You are not logged in" }
  }

  const id = Number(formData.get("id")) //blog id

    await deleteReadingListItem(id)
    revalidatePath(`/blogs/${id}`)
    revalidatePath("/blogs")
}

export const markAsRead = async (formData: FormData) => {
  const session = await auth()
  if (!session) {
    return { error: "You are not logged in" }
  }
  const id = Number(formData.get("id")) //blog id

  await markReadingListItemAsRead(id)
  revalidatePath("/me")
}