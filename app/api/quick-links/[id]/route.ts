import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const link = await prisma.quickLink.findUnique({ where: { id: params.id } })
        if (!link) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        return NextResponse.json(link)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch quick link' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json()
        const link = await prisma.quickLink.update({
            where: { id: params.id },
            data: {
                title: body.title,
                href: body.href,
                icon: body.icon,
                order: body.order,
                active: body.active !== undefined ? body.active : true,
            },
        })
        return NextResponse.json(link)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update quick link' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.quickLink.delete({ where: { id: params.id } })
        return NextResponse.json({ message: 'Deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete quick link' }, { status: 500 })
    }
}
