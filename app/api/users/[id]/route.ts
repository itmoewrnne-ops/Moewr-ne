import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { verifyAuth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const auth = await verifyAuth(request)
        if (!auth || auth.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { name, email, password, role } = body

        const updateData: any = {
            name,
            email,
            role
        }

        if (password) {
            updateData.password = await bcrypt.hash(password, 10)
        }

        const user = await prisma.user.update({
            where: { id: params.id },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            }
        })

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const auth = await verifyAuth(request)
        if (!auth || auth.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Prevent deleting yourself
        if (auth.userId === params.id) {
            return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 })
        }

        await prisma.user.delete({
            where: { id: params.id }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
    }
}
