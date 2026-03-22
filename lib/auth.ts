import { SignJWT, jwtVerify } from 'jose'
import { serialize, parse } from 'cookie'
import { NextRequest, NextResponse } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production-min-32-chars'
const TOKEN_NAME = 'auth-token'

export interface TokenPayload {
    userId: string
    email: string
    role: string
    [key: string]: any
}

// Generate JWT token
export async function generateToken(payload: TokenPayload): Promise<string> {
    const secret = new TextEncoder().encode(JWT_SECRET)
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('7d')
        .sign(secret)
}

// Verify JWT token
export async function verifyToken(token: string): Promise<TokenPayload | null> {
    try {
        const secret = new TextEncoder().encode(JWT_SECRET)
        const { payload } = await jwtVerify(token, secret)
        return payload as unknown as TokenPayload
    } catch (error) {
        return null
    }
}

// Set auth cookie
export function setAuthCookie(response: NextResponse, token: string) {
    const cookie = serialize(TOKEN_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    })

    response.headers.set('Set-Cookie', cookie)
    return response
}

// Clear auth cookie
export function clearAuthCookie(response: NextResponse) {
    const cookie = serialize(TOKEN_NAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
    })

    response.headers.set('Set-Cookie', cookie)
    return response
}

// Get token from request
export function getTokenFromRequest(request: NextRequest): string | null {
    const cookies = parse(request.headers.get('cookie') || '')
    return cookies[TOKEN_NAME] || null
}

// Verify request authentication
export async function verifyAuth(request: NextRequest): Promise<TokenPayload | null> {
    const token = getTokenFromRequest(request)
    if (!token) return null
    return await verifyToken(token)
}
