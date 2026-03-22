import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from './lib/auth'

export async function middleware(request: NextRequest) {
    // Only protect /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Allow access to login page
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next()
        }

        // Verify authentication
        const user = await verifyAuth(request)

        if (!user) {
            // Redirect to login if not authenticated
            const loginUrl = new URL('/admin/login', request.url)
            loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
            return NextResponse.redirect(loginUrl)
        }

        // Check if user has allowed roles (ADMIN, EDITOR, DEPT_HEAD)
        const allowedRoles = ['ADMIN', 'EDITOR', 'DEPT_HEAD']
        if (!allowedRoles.includes(user.role)) {
            const loginUrl = new URL('/admin/login', request.url)
            loginUrl.searchParams.set('error', 'unauthorized')
            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}
