import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const partner = await prisma.partner.findUnique({ where: { id: params.id } })
        if (!partner) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        return NextResponse.json(partner)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch partner' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json()
        const partner = await prisma.partner.update({
            where: { id: params.id },
            data: {
                name: body.name,
                logo: body.logo,
                website: body.website,
                category: body.category,
                order: body.order,
                active: body.active !== undefined ? body.active : true,
            },
        })
        return NextResponse.json(partner)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update partner' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.partner.delete({ where: { id: params.id } })
        return NextResponse.json({ message: 'Deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete partner' }, { status: 500 })
    }
}
