import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'



export async function GET() {
    try {
        const news = await prisma.news.findMany({
            orderBy: { date: 'desc' }
        })
        return NextResponse.json(news)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const news = await prisma.news.create({
            data: {
                title: body.title,
                content: body.content,
                category: body.category,
                image: body.image || null,
                images: body.images || null,
                date: body.date ? new Date(body.date) : new Date(),
                published: body.published !== undefined ? body.published : true,
            },
        })
        return NextResponse.json(news, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create news' }, { status: 500 })
    }
}

