"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, likeBlog } from "../services/blogs"
import { auth } from "@/auth"

export type blogFormState = {
  errors: {
    title?: string,
    author?: string,
    url?: string
    _form?: string
  },
  values: {
    title: string,
    author: string,
    url: string
  }
};

export const createBlog = async (
  prevState: blogFormState,
  formData: FormData
) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = (formData.get("title") as string)?.trim()
  const author = (formData.get("author") as string)?.trim()
  const url = (formData.get("URL") as string)?.trim()

  const errors: blogFormState["errors"] = {}

  if (!title || title.length < 4) errors.title = "Title must be at least 4 characters long"
  if (!author || author.length < 4) errors.author = "Author must be at least 4 characters long"
  if (!url || url.length < 4) errors.url = "URL must be at least 4 characters long"

  if (Object.keys(errors).length > 0) {
    console.log("Validation errors:", errors);
    return { errors, values: { title, author, url } };
  }

  try {
    await addBlog(title, author, url)
  } catch (error) {
    console.error("Database error during blog creation:", error);
    return {
      errors: { _form: "Something went wrong creating your blog. Please try again later." },
      values: { title, author, url }
    };
  }

  revalidatePath("/blogs")
  redirect("/blogs")
}

export const addLikeToBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await likeBlog(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}