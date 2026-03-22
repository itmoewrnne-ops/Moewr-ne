import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'



export async function GET() {
    try {
        const services = await prisma.service.findMany({
            include: {
                department: {
                    select: { id: true, name: true }
                }
            },
            orderBy: { title: 'asc' }
        })
        return NextResponse.json(services)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const service = await prisma.service.create({
            data: {
                title: body.title,
                description: body.description,
                requirements: body.requirements || null,
                departmentId: body.departmentId,
            },
            include: {
                department: {
                    select: { id: true, name: true }
                }
            }
        })
        return NextResponse.json(service, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
    }
}

