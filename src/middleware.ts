import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await request.cookies;
  
  const accessToken = cookieStore.get('accessToken')?.value;
 
  if (pathname.startsWith('/courses')) {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/courses/:path*',
};