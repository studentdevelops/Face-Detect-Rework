import { prisma } from '@/utils/_PrismaController';
import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers';

export async function GET() {
    const userId = cookies().get("user").value
    const userUpdate = prisma.userDetails.update({
        where: {
            userId: userId
        },
        data: {
            count: { increment: 1 }
        }
    })
    return NextResponse.json(userUpdate);
}