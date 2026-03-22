import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Revalidate every 60 seconds
export const revalidate = 60

export async function GET() {
    try {
        const partners = await prisma.partner.findMany({
            where: { active: true },
            orderBy: { order: 'asc' },
        })

        return NextResponse.json(partners, {
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
            }
        })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const partner = await prisma.partner.create({
            data: {
                name: body.name,
                logo: body.logo,
                website: body.website || null,
                category: body.category || null,
                order: body.order || 0,
                active: true,
            },
        })
        return NextResponse.json(partner, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 })
    }
}
