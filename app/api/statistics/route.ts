import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Revalidate every 60 seconds
export const revalidate = 60

export async function GET() {
    try {
        const stats = await prisma.statistic.findMany({
            where: { active: true },
            orderBy: { order: 'asc' },
        })

        return NextResponse.json(stats, {
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
            }
        })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const stat = await prisma.statistic.create({
            data: {
                title: body.title,
                value: body.value,
                unit: body.unit || null,
                category: body.category || null,
                icon: body.icon || 'BarChart',
                order: body.order || 0,
                active: true,
            },
        })
        return NextResponse.json(stat, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create statistic' }, { status: 500 })
    }
}
