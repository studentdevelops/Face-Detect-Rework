import { fetchUser } from '@/utils/_PrismaController';
import { NextResponse, NextRequest } from 'next/server'
import { cookies } from "next/headers";

export async function POST(req, res) {
    const response = await req.json();
    if (response.email != "" && response.password != "") {
        const result = await fetchUser(response.email, response.password);
        if (result?.userId) {
            cookies().set({
                name: "user",
                value: result.userId,
                maxAge: 60 * 60 * 24 * 3,
                secure: true,
                httpOnly: true,
                path: "/"
            })
            return NextResponse.json(result)
        }
    } else {
        return NextResponse.json({ "status": false }).status(400)
    }
}