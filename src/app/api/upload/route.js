import { uploadData } from '@/utils/CloudinaryLib';
import { NextResponse, NextRequest } from 'next/server'

export async function POST(req, res) {
    const { image } = await req.json();
    const url = await uploadData(image)
    return NextResponse.json({ url });
}