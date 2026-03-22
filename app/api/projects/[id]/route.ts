import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const project = await prisma.project.findUnique({ where: { id: params.id } })
        if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        return NextResponse.json(project)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json()
        const project = await prisma.project.update({
            where: { id: params.id },
            data: {
                title: body.title,
                description: body.description,
                status: body.status,
                icon: body.icon,
                image: body.image || null,
                location: body.location || null,
                budget: body.budget || null,
                timeline: body.timeline || null,
                progress: body.progress || null,
                order: body.order,
                active: body.active !== undefined ? body.active : true,
            },
        })
        return NextResponse.json(project)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.project.delete({ where: { id: params.id } })
        return NextResponse.json({ message: 'Deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
    }
}
