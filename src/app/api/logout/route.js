import { NextResponse, NextRequest } from 'next/server'
import { cookies } from "next/headers";

export async function GET(req, res) {
    cookies().delete("user")
    return NextResponse.json("success")
}