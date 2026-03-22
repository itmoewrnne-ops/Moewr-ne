import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'
import slugify from 'slugify'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const department = await prisma.department.findUnique({
            where: { id: params.id },
            include: {
                services: true,
                projects: true
            }
        })
        if (!department) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        return NextResponse.json(department)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch department' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json()

        const data: any = {
            name: body.name,
            description: body.description,
            image: body.image,
            functions: body.functions,
            mandate: body.mandate,
            headName: body.headName,
            headImage: body.headImage,
            headBio: body.headBio,
            contactEmail: body.contactEmail,
            contactPhone: body.contactPhone,
        }

        // Update slug if name changes and slug isn't manually provided
        if (body.name && !body.slug) {
            data.slug = slugify(body.name, { lower: true, strict: true })
        } else if (body.slug) {
            data.slug = body.slug
        }

        const department = await prisma.department.update({
            where: { id: params.id },
            data: data,
        })
        return NextResponse.json(department)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update department' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.department.delete({ where: { id: params.id } })
        return NextResponse.json({ message: 'Deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete department' }, { status: 500 })
    }
}
