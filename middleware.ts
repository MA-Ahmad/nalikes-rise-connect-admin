import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { isTokenExpired } from './utils/helper'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('rise_admin_auth')?.value
  const expiredToken = isTokenExpired(token as string)

  // Redirect unauthenticated users to login page
  if (expiredToken) {
    if (!request.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  } else {
    // Redirect authenticated users from login page to dashboard
    if (request.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/apps', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/apps', '/dashboard', '/tweets'],
}
