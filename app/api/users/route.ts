import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { verifyAuth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    try {
        const auth = await verifyAuth(request)
        if (!auth || auth.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const auth = await verifyAuth(request)
        if (!auth || auth.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { name, email, password, role } = body

        if (!email || !password || !role) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            }
        })

        return NextResponse.json(user)
    } catch (error) {
        console.error('Create user error:', error)
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }
}
