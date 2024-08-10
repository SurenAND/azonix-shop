import { NextRequest } from 'next/dist/server/web/spec-extension/request';
import { NextResponse } from 'next/dist/server/web/spec-extension/response';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.has('accessToken');
  const role = request.cookies.get('role');

  // Redirect to home if trying to access register page and token exists
  if (pathname.startsWith('/register') && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect to home if trying to access dashboard and user is not admin or moderator
  if (pathname.startsWith('/dashboard') && !(role?.value === 'ADMIN')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect to home if trying to access profile page and token exists
  if (pathname.startsWith('/profile') && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/register', '/dashboard', '/profile'],
};
