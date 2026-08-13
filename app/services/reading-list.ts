import { db } from "../../db"
import { readingList } from "../../db/schema"
import { eq, and } from "drizzle-orm"
import { getCurrentUser } from "./session"

export const getReadingListByUserId = async (userId: number) => {
    return db.query.readingList.findMany({
        where: eq(readingList.userId, userId),
        with: { blog: true }
    })
}

export const createReadingListItem = async (blogId: number) => {
    const user = await getCurrentUser()

    if (!user) {
        throw new Error("Not logged in")
    }

    const userId = user.id

    return db.insert(readingList).values({ userId, blogId })
}

export const deleteReadingListItem = async (blogId: number) => {
    const user = await getCurrentUser()

    if (!user) {
        throw new Error("Not logged in")
    }

    const userId = user.id

    return db.delete(readingList).where(eq(readingList.userId, userId) && eq(readingList.blogId, blogId))
}

export const markReadingListItemAsRead = async (blogId: number) => {
    const user = await getCurrentUser()

    if (!user) {
        throw new Error("Not logged in")
    }
    const userId = user.id

    return db
        .update(readingList)
        .set({ read: true })
        .where(
            and(
                eq(readingList.userId, userId),
                eq(readingList.blogId, blogId)
            )
        )
}
