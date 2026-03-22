'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getLeadership() {
    try {
        const leadership = await prisma.leadership.findMany({
            where: { active: true },
            orderBy: { order: 'asc' },
        })
        return leadership
    } catch (error) {
        console.error('Error fetching leadership:', error)
        // Return default data if database fails
        return [
            {
                id: '1',
                name: 'Hon. Ahmed Mohamed',
                position: 'Minister',
                image: 'https://ui-avatars.com/api/?name=Ahmed+Mohamed&size=400&background=1e40af&color=fff',
                bio: 'Leading the ministry with over 20 years of experience in public service and resource management.',
                email: 'minister@mow.gov',
                phone: '+252 61 234 5678',
                order: 1,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '2',
                name: 'Dr. Fatima Hassan',
                position: 'Deputy Minister',
                image: 'https://ui-avatars.com/api/?name=Fatima+Hassan&size=400&background=059669&color=fff',
                bio: 'Expert in water resource management with a PhD in Environmental Engineering.',
                email: 'deputy.minister@mow.gov',
                phone: '+252 61 234 5679',
                order: 2,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '3',
                name: 'Eng. Omar Ali',
                position: 'Permanent Secretary',
                image: 'https://ui-avatars.com/api/?name=Omar+Ali&size=400&background=dc2626&color=fff',
                bio: 'Experienced civil engineer specializing in infrastructure development and energy systems.',
                email: 'ps@mow.gov',
                phone: '+252 61 234 5680',
                order: 3,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]
    }
}

export async function createLeadership(data: {
    name: string
    position: string
    image: string
    bio?: string
    email?: string
    phone?: string
    order?: number
}) {
    try {
        const leadership = await prisma.leadership.create({
            data: {
                ...data,
                order: data.order || 0,
            },
        })
        revalidatePath('/about/leadership')
        revalidatePath('/admin/media')
        return { success: true, data: leadership }
    } catch (error) {
        console.error('Error creating leadership:', error)
        return { success: false, error: 'Failed to create leadership member' }
    }
}

export async function updateLeadership(id: string, data: {
    name?: string
    position?: string
    image?: string
    bio?: string
    email?: string
    phone?: string
    order?: number
    active?: boolean
}) {
    try {
        const leadership = await prisma.leadership.update({
            where: { id },
            data,
        })
        revalidatePath('/about/leadership')
        revalidatePath('/admin/media')
        return { success: true, data: leadership }
    } catch (error) {
        console.error('Error updating leadership:', error)
        return { success: false, error: 'Failed to update leadership member' }
    }
}

export async function deleteLeadership(id: string) {
    try {
        await prisma.leadership.delete({
            where: { id },
        })
        revalidatePath('/about/leadership')
        revalidatePath('/admin/media')
        return { success: true }
    } catch (error) {
        console.error('Error deleting leadership:', error)
        return { success: false, error: 'Failed to delete leadership member' }
    }
}

export async function getMedia(category?: string) {
    try {
        const media = await prisma.media.findMany({
            where: category ? { category } : undefined,
            orderBy: { createdAt: 'desc' },
        })
        return media
    } catch (error) {
        console.error('Error fetching media:', error)
        return []
    }
}

export async function createMedia(data: {
    title: string
    type: string
    category: string
    url: string
    fileSize?: string
}) {
    try {
        const media = await prisma.media.create({
            data,
        })
        revalidatePath('/admin/media')
        return { success: true, data: media }
    } catch (error) {
        console.error('Error creating media:', error)
        return { success: false, error: 'Failed to upload media' }
    }
}

export async function deleteMedia(id: string) {
    try {
        await prisma.media.delete({
            where: { id },
        })
        revalidatePath('/admin/media')
        return { success: true }
    } catch (error) {
        console.error('Error deleting media:', error)
        return { success: false, error: 'Failed to delete media' }
    }
}
