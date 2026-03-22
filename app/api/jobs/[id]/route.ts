import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const job = await prisma.job.findUnique({ where: { id: params.id } })
        if (!job) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        return NextResponse.json(job)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json()

        const job = await prisma.job.update({
            where: { id: params.id },
            data: {
                title: body.title,
                type: body.type,
                description: body.description,
                requirements: body.requirements,
                closingDate: body.closingDate ? new Date(body.closingDate) : undefined,
                documentUrl: body.documentUrl,
            },
        })
        return NextResponse.json(job)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update job' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.job.delete({ where: { id: params.id } })
        return NextResponse.json({ message: 'Deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 })
    }
}
