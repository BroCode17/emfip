import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getLoggedInUser } from './app/(admin)/api/appwriterapi'


export async function middleware(request: NextRequest) {
  const state = Date.now()
  const loggedInUser = await getLoggedInUser()
  //Handle sign up request
  if(request.nextUrl.pathname.includes('signup'))
    return NextResponse.next()

  if(!loggedInUser)
      return NextResponse.redirect(new URL('/login', request.url))

  return NextResponse.next();
}
export const config = {
  matcher: [
    // '/api/:path*',
    '/dashboard/:path*'
  ],
}
