import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const news = await prisma.news.findUnique({ where: { id: params.id } })
        if (!news) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        return NextResponse.json(news)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json()

        const news = await prisma.news.update({
            where: { id: params.id },
            data: {
                title: body.title,
                content: body.content,
                category: body.category,
                image: body.image,
                images: body.images || null,
                date: body.date ? new Date(body.date) : undefined,
                published: body.published,
            },
        })
        return NextResponse.json(news)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update news' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.news.delete({ where: { id: params.id } })
        return NextResponse.json({ message: 'Deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 })
    }
}
