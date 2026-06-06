import { NextResponse } from 'next/server';

export function middleware(request) {
  const accept = request.headers.get('accept') ?? '';
  const { pathname } = request.nextUrl;

  if (accept.includes('text/markdown')) {
    const url = request.nextUrl.clone();
    url.pathname = '/api/markdown';
    url.searchParams.set('path', pathname);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/about', '/cases', '/contact'],
};
