import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'



export async function GET() {
    try {
        const tenders = await prisma.tender.findMany({
            orderBy: { deadline: 'asc' }
        })
        return NextResponse.json(tenders)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch tenders' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const tender = await prisma.tender.create({
            data: {
                title: body.title,
                category: body.category,
                status: body.status || 'OPEN',
                budget: body.budget || null,
                deadline: new Date(body.deadline),
                documentUrl: body.documentUrl || null,
            },
        })
        return NextResponse.json(tender, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create tender' }, { status: 500 })
    }
}

