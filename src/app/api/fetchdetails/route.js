import { prisma } from '@/utils/_PrismaController';
import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers';


export async function GET() {
    const userId = cookies().get("user").value
    const user = await prisma.userDetails.findFirst(
        {
            where: {
                userId: userId
            }
        }
    )
    return NextResponse.json(user)
    // return NextResponse.json({ "data": "success" })
}