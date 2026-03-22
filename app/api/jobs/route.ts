import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'



export async function GET() {
    try {
        const jobs = await prisma.job.findMany({
            orderBy: { closingDate: 'asc' }
        })
        return NextResponse.json(jobs)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const job = await prisma.job.create({
            data: {
                title: body.title,
                type: body.type,
                description: body.description,
                requirements: body.requirements || null,
                closingDate: new Date(body.closingDate),
                documentUrl: body.documentUrl || null,
            },
        })
        return NextResponse.json(job, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create job' }, { status: 500 })
    }
}

