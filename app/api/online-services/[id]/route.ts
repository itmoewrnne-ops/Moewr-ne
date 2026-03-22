import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const service = await prisma.onlineService.findUnique({ where: { id: params.id } })
        if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        return NextResponse.json(service)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch online service' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json()
        const service = await prisma.onlineService.update({
            where: { id: params.id },
            data: {
                title: body.title,
                description: body.description,
                category: body.category,
                requirements: body.requirements,
                formUrl: body.formUrl,
                documentUrl: body.documentUrl,
                icon: body.icon,
                order: body.order,
                active: body.active !== undefined ? body.active : true,
            },
        })
        return NextResponse.json(service)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update online service' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.onlineService.delete({ where: { id: params.id } })
        return NextResponse.json({ message: 'Deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete online service' }, { status: 500 })
    }
}
