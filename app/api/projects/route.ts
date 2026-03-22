import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Revalidate every 60 seconds
export const revalidate = 60

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')

        const where: any = { active: true }
        if (status) {
            where.status = status.toUpperCase()
        }

        const projects = await prisma.project.findMany({
            where,
            orderBy: { order: 'asc' },
        })

        return NextResponse.json(projects, {
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
            }
        })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const project = await prisma.project.create({
            data: {
                title: body.title,
                description: body.description,
                status: body.status || 'ONGOING',
                icon: body.icon || 'Droplets',
                image: body.image || null,
                location: body.location || null,
                budget: body.budget || null,
                timeline: body.timeline || null,
                progress: body.progress || null,
                order: body.order || 0,
                active: true,
            },
        })
        return NextResponse.json(project, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
    }
}
