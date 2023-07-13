import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers';
import { updateDetails } from '@/utils/_PrismaController';
import { detectCelebrity } from '@/utils/ClarifaiLib';



export async function POST(req, res) {
    const userId = cookies().get("user").value
    const reqBody = await req.json()
    if(!reqBody?.image){
        return NextResponse.json({status: false})
    }
    const response = await detectCelebrity(reqBody.image);
    const dbUpdate = updateDetails(userId);
    return NextResponse.json({ response });
    // return NextResponse.json({"test":1})
}