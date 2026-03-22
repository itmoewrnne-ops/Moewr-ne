import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json()
        const video = await prisma.featuredVideo.update({
            where: { id: params.id },
            data: {
                title: body.title,
                youtubeId: body.youtubeId,
                thumbnail: body.thumbnail || null,
                order: body.order || 0,
                active: body.active !== undefined ? body.active : true,
            },
        })
        revalidatePath('/')
        return NextResponse.json(video)
    } catch (error) {
        console.error('Error updating video:', error)
        return NextResponse.json({ 
            error: 'Failed to update video',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.featuredVideo.delete({
            where: { id: params.id },
        })
        revalidatePath('/')
        return NextResponse.json({ message: 'Video deleted successfully' })
    } catch (error) {
        console.error('Error deleting video:', error)
        return NextResponse.json({ 
            error: 'Failed to delete video',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}
