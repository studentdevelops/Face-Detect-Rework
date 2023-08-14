
import { NextRequest, NextResponse } from 'next/server';

export function AuthGuard(request) {
  const isAuthenticated = request.cookies.get('user')
  
  if (!isAuthenticated) {
    // Redirect the user to the login page or return an error response
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Continue with the next middleware or route handler
  return NextResponse.next();
}
