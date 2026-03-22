import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'



export async function GET() {
    try {
        const leadership = await prisma.leadership.findMany({
            orderBy: { order: 'asc' },
        })
        return NextResponse.json(leadership)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch leadership' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const leadership = await prisma.leadership.create({
            data: {
                name: body.name,
                position: body.position,
                image: body.image || '',
                bio: body.bio || null,
                email: body.email || null,
                phone: body.phone || null,
                order: body.order || 0,
                active: true,
            },
        })
        return NextResponse.json(leadership, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create leadership' }, { status: 500 })
    }
}

