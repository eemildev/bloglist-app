import { eq, ilike } from "drizzle-orm"
import { db } from "@/db"
import { blogs } from "@/db/schema"
import { getCurrentUser } from "./session"

export const getBlogs = async (searchQuery?: string) => {
  const blogs = await db.query.blogs.findMany({
    orderBy: (blog, { desc }) => desc(blog.likes),
    where: searchQuery ? (blog) => ilike(blog.title, `%${searchQuery}%`) : undefined,
  })
  return blogs
}

export const addBlog = async (title: string, author: string, url: string) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }
  return db.insert(blogs).values({ title, author, url, likes: 0, userId: user.id })
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({ where: eq(blogs.id, id) })
}

export const likeBlog = async (id: number) => {
  const blog = await db.query.blogs.findFirst({ where: eq(blogs.id, id) })
  if (blog) {
    return db.update(blogs).set({ likes: blog.likes + 1 }).where(eq(blogs.id, id))
  }
} 
