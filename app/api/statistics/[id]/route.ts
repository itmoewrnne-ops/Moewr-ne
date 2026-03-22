import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const stat = await prisma.statistic.findUnique({ where: { id: params.id } })
        if (!stat) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        return NextResponse.json(stat)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch statistic' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json()
        const stat = await prisma.statistic.update({
            where: { id: params.id },
            data: {
                title: body.title,
                value: body.value,
                unit: body.unit,
                category: body.category,
                icon: body.icon,
                order: body.order,
                active: body.active !== undefined ? body.active : true,
            },
        })
        return NextResponse.json(stat)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update statistic' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.statistic.delete({ where: { id: params.id } })
        return NextResponse.json({ message: 'Deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete statistic' }, { status: 500 })
    }
}
