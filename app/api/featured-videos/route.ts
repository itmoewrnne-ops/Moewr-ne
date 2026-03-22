import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const videos = await prisma.featuredVideo.findMany({
            where: { active: true },
            orderBy: { order: 'asc' },
        })
        const res = NextResponse.json(videos)
        res.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120')
        return res
    } catch (error) {
        console.error('❌ Featured videos API error:', error)
        return NextResponse.json({ 
            error: 'Failed to fetch videos',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        console.log('📝 Creating video with data:', body)
        
        if (!body.title || !body.youtubeId) {
            return NextResponse.json({ 
                error: 'Title and YouTube ID are required',
            }, { status: 400 })
        }

        const video = await prisma.featuredVideo.create({
            data: {
                title: body.title,
                youtubeId: body.youtubeId,
                thumbnail: body.thumbnail || null,
                order: body.order || 0,
                active: body.active !== undefined ? body.active : true,
            },
        })
        console.log('✅ Video created successfully:', video.id)
        revalidatePath('/')
        return NextResponse.json(video, { status: 201 })
    } catch (error) {
        console.error('❌ Error creating video:', error)
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        const errorStack = error instanceof Error ? error.stack : undefined
        console.error('Error details:', { errorMessage, errorStack })
        return NextResponse.json({ 
            error: 'Failed to create video',
            details: errorMessage
        }, { status: 500 })
    }
}
