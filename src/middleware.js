import { NextResponse } from 'next/server';

const SESSION_COOKIE = 'hims_auth_session';
const SESSION_TOKEN = 'mock_hims_session_abc123xyz';

export function middleware(request) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE);
    const isAuthenticated = sessionCookie?.value === SESSION_TOKEN;
    const isAuthPath = request.nextUrl.pathname.startsWith('/auth');

    if (!isAuthenticated && !isAuthPath) {
        const url = request.nextUrl.clone();
        url.pathname = '/auth/login';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
