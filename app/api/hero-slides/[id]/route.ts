import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const slide = await prisma.heroSlide.findUnique({ where: { id: params.id } })
        if (!slide) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        return NextResponse.json(slide)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch slide' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json()
        const slide = await prisma.heroSlide.update({
            where: { id: params.id },
            data: {
                title: body.title,
                subtitle: body.subtitle || null,
                image: body.image,
                buttonText: body.buttonText || null,
                buttonLink: body.buttonLink || null,
                order: body.order,
                active: body.active !== undefined ? body.active : true,
            },
        })
        revalidatePath('/')
        return NextResponse.json(slide)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update slide' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.heroSlide.delete({ where: { id: params.id } })
        revalidatePath('/')
        return NextResponse.json({ message: 'Deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete slide' }, { status: 500 })
    }
}
