import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {

    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
            { error: "This endpoint is not available in production" },
            { status: 403 },
        )
    }
    const { username, name, password } = await request.json()

    // Validate the input data
    const errors: { [key: string]: string } = {}

    if (!username || username.length < 4) errors.username = "Username must be at least 4 characters long"
    if (!name || name.length < 4) errors.name = "Name must be at least 4 characters long"
    if (!password || password.length < 4) errors.password = "Password must be at least 4 characters long"

    if (Object.keys(errors).length > 0) {
        return NextResponse.json(
            { error: Object.values(errors).join(", ") },
            { status: 403 },
        );
    }

    try {
        const existingUser = await db.select().from(users).where(eq(users.username, username)).limit(1);

        if (existingUser.length > 0) {
            return NextResponse.json(
                { error: "This username is already taken." },
                { status: 400 }
            );
        }


        const passwordHash = await bcrypt.hash(password, 10)
        await db.insert(users).values({ username, name, passwordHash })

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        );

    } catch (error) {
        console.error("Database error during registration:", error);
        return NextResponse.json(
            { error: "Something went wrong creating your account. Please try again later." },
            { status: 500 }
        );
    }
}
