import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const tender = await prisma.tender.findUnique({ where: { id: params.id } })
        if (!tender) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        return NextResponse.json(tender)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch tender' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json()

        const tender = await prisma.tender.update({
            where: { id: params.id },
            data: {
                title: body.title,
                category: body.category,
                status: body.status,
                budget: body.budget,
                deadline: body.deadline ? new Date(body.deadline) : undefined,
                documentUrl: body.documentUrl,
            },
        })
        return NextResponse.json(tender)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update tender' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.tender.delete({ where: { id: params.id } })
        return NextResponse.json({ message: 'Deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete tender' }, { status: 500 })
    }
}
