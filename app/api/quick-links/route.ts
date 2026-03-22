import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'



export async function GET() {
    try {
        const links = await prisma.quickLink.findMany({
            where: { active: true },
            orderBy: { order: 'asc' },
        })
        console.log(`✅ Quick links API: Found ${links.length} active links`)
        return NextResponse.json(links)
    } catch (error) {
        console.error('❌ Quick links API error:', error)
        return NextResponse.json({ 
            error: 'Failed to fetch quick links',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const link = await prisma.quickLink.create({
            data: {
                title: body.title,
                href: body.href,
                icon: body.icon || 'FileText',
                order: body.order || 0,
                active: true,
            },
        })
        return NextResponse.json(link, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create quick link' }, { status: 500 })
    }
}

