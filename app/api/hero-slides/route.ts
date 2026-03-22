import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'



export async function GET() {
    try {
        // Get all slides first for debugging
        const allSlides = await prisma.heroSlide.findMany({
            orderBy: { order: 'asc' },
        })
        console.log(`📊 Hero slides API: Total slides in database: ${allSlides.length}`)
        
        // Get active slides
        const slides = await prisma.heroSlide.findMany({
            where: { active: true },
            orderBy: { order: 'asc' },
        })
        console.log(`✅ Hero slides API: Found ${slides.length} active slides`)
        
        if (allSlides.length > 0 && slides.length === 0) {
            console.warn('⚠️ WARNING: Slides exist but none are active!')
            allSlides.forEach(slide => {
                console.log(`  - ${slide.title}: active=${slide.active}`)
            })
        }
        
        return NextResponse.json(slides)
    } catch (error) {
        console.error('❌ Hero slides API error:', error)
        return NextResponse.json({ 
            error: 'Failed to fetch slides',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const slide = await prisma.heroSlide.create({
            data: {
                title: body.title,
                subtitle: body.subtitle || null,
                image: body.image,
                buttonText: body.buttonText || null,
                buttonLink: body.buttonLink || null,
                order: body.order || 0,
                active: true,
            },
        })
        revalidatePath('/')
        return NextResponse.json(slide, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create slide' }, { status: 500 })
    }
}

