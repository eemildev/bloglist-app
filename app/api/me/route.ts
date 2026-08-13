import { getUserByApiToken } from "../../services/users"
import { NextResponse } from "next/server"
import { headers } from 'next/headers'


export const GET = async () => {
    const authorization = (await headers()).get('authorization')
    const token = authorization?.split(' ')[1] // Assuming the format is "Bearer <token>"
    if (!token) {
        return NextResponse.json({ error: "Authorization header missing or invalid" }, { status: 401 })
    }
    try {
        const user = await getUserByApiToken(token)
        return NextResponse.json(user);
    } catch {
        return NextResponse.json({ error: "invalid token" }, { status: 500 })
    }
}
