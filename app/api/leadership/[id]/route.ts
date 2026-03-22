import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const leadership = await prisma.leadership.findUnique({ where: { id: params.id } })
        if (!leadership) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        return NextResponse.json(leadership)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch leadership' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json()
        const leadership = await prisma.leadership.update({
            where: { id: params.id },
            data: {
                name: body.name,
                position: body.position,
                image: body.image || '',
                bio: body.bio || null,
                email: body.email || null,
                phone: body.phone || null,
                order: body.order,
                active: body.active !== undefined ? body.active : true,
            },
        })
        return NextResponse.json(leadership)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update leadership' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.leadership.delete({ where: { id: params.id } })
        return NextResponse.json({ message: 'Deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete leadership' }, { status: 500 })
    }
}
