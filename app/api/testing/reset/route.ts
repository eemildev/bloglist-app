import { NextResponse } from "next/server"
import { db } from "@/db"
import { blogs, readingList, users } from "@/db/schema";

export const DELETE = async () => {
    // The HTTP DELETE request to this API should delete all data from all the tables.
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
            { error: "This endpoint is not available in production" },
            { status: 403 },
        )
    }

    try {
        await db.delete(readingList);
        await db.delete(blogs);
        await db.delete(users);
        return NextResponse.json(
            { message: "Database reset successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Database error during reset:", error);
        return NextResponse.json(
            { error: "Something went wrong resetting the database. Please try again later." },
            { status: 500 }
        );
    }
}