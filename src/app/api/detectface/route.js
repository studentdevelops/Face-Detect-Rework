import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers';
import { detectFaces } from '@/utils/ClarifaiLib';
import { updateDetails } from '@/utils/_PrismaController';



export async function POST(req, res) {
    const userId = cookies().get("user").value
    const reqBody = await req.json()
    if(!reqBody?.image){
        return NextResponse.json({status: false})
    }
    const response = await detectFaces(reqBody.image)
    const dbUpdate = updateDetails(userId);
    return NextResponse.json({ response });
}