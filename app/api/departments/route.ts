import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import slugify from 'slugify'

export const dynamic = 'force-dynamic'



export async function GET() {
    try {
        const departments = await prisma.department.findMany({
            orderBy: { name: 'asc' },
            include: {
                _count: {
                    select: { services: true, projects: true }
                }
            }
        })
        return NextResponse.json(departments)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Generate slug from name if not provided
        const slug = body.slug || slugify(body.name, { lower: true, strict: true })

        const department = await prisma.department.create({
            data: {
                name: body.name,
                slug: slug,
                description: body.description || null,
                image: body.image || null,
                functions: body.functions || null,
                mandate: body.mandate || null,
                headName: body.headName || null,
                headImage: body.headImage || null,
                headBio: body.headBio || null,
                contactEmail: body.contactEmail || null,
                contactPhone: body.contactPhone || null,
            },
        })
        return NextResponse.json(department, { status: 201 })
    } catch (error) {
        console.error('Error creating department:', error)
        return NextResponse.json({ error: 'Failed to create department' }, { status: 500 })
    }
}

