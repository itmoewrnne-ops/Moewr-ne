import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { generateToken, setAuthCookie } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// Rate limiting map (in production, use Redis)
const loginAttempts = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
    const now = Date.now()
    const attempts = loginAttempts.get(ip)

    if (!attempts || now > attempts.resetTime) {
        loginAttempts.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 }) // 15 minutes
        return true
    }

    if (attempts.count >= 5) {
        return false // Too many attempts
    }

    attempts.count++
    return true
}

export async function POST(request: NextRequest) {
    try {
        // Get client IP for rate limiting
        const ip = request.headers.get('x-forwarded-for') || 'unknown'

        // Check rate limit (skip in development)
        if (process.env.NODE_ENV === 'production' && !checkRateLimit(ip)) {
            return NextResponse.json(
                { error: 'Too many login attempts. Please try again later.' },
                { status: 429 }
            )
        }

        const body = await request.json()
        const { email, password } = body

        // Input validation
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            )
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            )
        }

        // Find user
        console.log('Looking for user with email:', email.toLowerCase().trim())
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase().trim() }
        })

        if (!user) {
            console.log('User not found')
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            )
        }

        console.log('User found:', { id: user.id, email: user.email, role: user.role })

        // Verify password
        console.log('Verifying password...')
        const isPasswordValid = await bcrypt.compare(password, user.password)
        console.log('Password valid:', isPasswordValid)

        if (!isPasswordValid) {
            console.log('Invalid password')
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            )
        }

        // Check if user has admin role
        if (user.role !== 'ADMIN') {
            console.log('User is not ADMIN, role:', user.role)
            return NextResponse.json(
                { error: 'Unauthorized. Admin access only.' },
                { status: 403 }
            )
        }

        // Generate JWT token
        console.log('Generating JWT token...')
        const token = await generateToken({
            userId: user.id,
            email: user.email,
            role: user.role
        })
        console.log('Token generated successfully')

        // Create response with auth cookie
        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        })

        return setAuthCookie(response, token)

    } catch (error: any) {
        console.error('Login error:', error)
        console.error('Error details:', {
            message: error?.message,
            stack: error?.stack,
            code: error?.code,
            meta: error?.meta
        })
        return NextResponse.json(
            { 
                error: 'An error occurred during login',
                details: process.env.NODE_ENV === 'development' ? error?.message : undefined
            },
            { status: 500 }
        )
    }
}
