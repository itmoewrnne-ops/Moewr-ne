import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'



export async function GET() {
    try {
        const services = await prisma.onlineService.findMany({
            orderBy: { order: 'asc' },
        })
        return NextResponse.json(services)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
    } 
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const service = await prisma.onlineService.create({
            data: {
                title: body.title,
                description: body.description,
                category: body.category,
                requirements: body.requirements || null,
                formUrl: body.formUrl || null,
                documentUrl: body.documentUrl || null,
                icon: body.icon || null,
                order: body.order || 0,
                active: body.active !== undefined ? body.active : true,
            },
        })
        return NextResponse.json(service, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
    } 
}

