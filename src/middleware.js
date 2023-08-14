import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { AuthGuard } from './utils/AuthGuard'

// // This function can be marked `async` if using `await` inside
export function middleware(request) {
  AuthGuard()
}

// // See "Matching Paths" below to learn more
export const config = {
  matcher: ['/'],
}