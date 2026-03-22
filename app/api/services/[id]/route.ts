import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const service = await prisma.service.findUnique({
            where: { id: params.id },
            include: {
                department: {
                    select: { id: true, name: true }
                }
            }
        })
        if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        return NextResponse.json(service)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json()

        const service = await prisma.service.update({
            where: { id: params.id },
            data: {
                title: body.title,
                description: body.description,
                requirements: body.requirements,
                departmentId: body.departmentId,
            },
            include: {
                department: {
                    select: { id: true, name: true }
                }
            }
        })
        return NextResponse.json(service)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.service.delete({ where: { id: params.id } })
        return NextResponse.json({ message: 'Deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
    }
}
