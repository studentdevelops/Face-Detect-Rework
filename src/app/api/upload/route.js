import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers';
import fs from "fs"

export async function POST(req, res) {
    const { image, url } = await req.json()
    const base64Array = image.split(";base64,");
    const base64Image = base64Array.pop()
    const format = base64Array[0].substring(11)
    const finalUrl = `uploads/${url.split("/").pop()}.${format}`;
    fs.writeFile(`public/${finalUrl}`, base64Image, "base64", (err) => {
        if (err) {
            return NextResponse.json({ status: "failed" });
        }
    });
    return NextResponse.json({ url: finalUrl });
}