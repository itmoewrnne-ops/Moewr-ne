import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const event = await prisma.event.findUnique({ where: { id: params.id } })
        if (!event) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        return NextResponse.json(event)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json()

        const event = await prisma.event.update({
            where: { id: params.id },
            data: {
                title: body.title,
                description: body.description,
                category: body.category,
                startDate: body.startDate ? new Date(body.startDate) : undefined,
                endDate: body.endDate ? new Date(body.endDate) : undefined,
                location: body.location,
                venue: body.venue,
                image: body.image,
                registrationUrl: body.registrationUrl,
                status: body.status,
                published: body.published,
            },
        })
        return NextResponse.json(event)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.event.delete({ where: { id: params.id } })
        return NextResponse.json({ message: 'Deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
    }
}
