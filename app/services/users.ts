import { db } from "../../db"
import { blogs, users } from "../../db/schema"
import { eq } from "drizzle-orm"

export const getUsers = async () => {
  return db.query.users.findMany()
}

export const getUserById = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  })
}

export const getUserByApiToken = async (apiToken: string) => {
  return db.query.users.findFirst({
    where: eq(users.apiToken, apiToken),
    columns: {
      id: true,
      username: true,
      name: true
    },
    with: { blogs: true }, // Include related blogs in the result
  })
}

export const getBlogsByUserId = async (userId: number) => {
  return db.query.blogs.findMany({
    where: eq(blogs.userId, userId),
  })
}

export const getUserWithBlogs = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    with: { blogs: true },
  })
}