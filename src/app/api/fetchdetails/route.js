import { prisma } from '@/utils/_PrismaController';
import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers';


export async function GET() {
    const cookie = cookies().get("user")
    if (cookie?.value) {
        const userId = cookie.value
        const user = await prisma.userDetails.findFirst(
            {
                where: {
                    userId: userId
                }
            }
        )
        return NextResponse.json(user)
    }
    return NextResponse.json({ status: "false" })
    // return NextResponse.json({ "data": "success" })
}