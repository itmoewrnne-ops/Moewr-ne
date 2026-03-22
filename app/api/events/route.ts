import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'



export async function GET() {
    try {
        const events = await prisma.event.findMany({
            orderBy: { startDate: 'asc' }
        })
        return NextResponse.json(events)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const event = await prisma.event.create({
            data: {
                title: body.title,
                description: body.description,
                category: body.category,
                startDate: new Date(body.startDate),
                endDate: body.endDate ? new Date(body.endDate) : null,
                location: body.location || null,
                venue: body.venue || null,
                image: body.image || null,
                registrationUrl: body.registrationUrl || null,
                status: body.status || 'UPCOMING',
                published: body.published !== undefined ? body.published : true,
            },
        })
        return NextResponse.json(event, { status: 201 })
    } catch (error) {
        console.error('Error creating event:', error)
        return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
    }
}

