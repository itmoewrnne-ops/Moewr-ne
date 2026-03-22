'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// --- Departments ---
export async function createDepartment(formData: FormData) {
    const name = formData.get('name') as string
    const slug = formData.get('slug') as string
    const description = formData.get('description') as string
    const image = formData.get('image') as string

    await prisma.department.create({
        data: { name, slug, description, image }
    })

    revalidatePath('/admin/departments')
    revalidatePath('/departments')
}

export async function deleteDepartment(id: string) {
    await prisma.department.delete({ where: { id } })
    revalidatePath('/admin/departments')
    revalidatePath('/departments')
}

// --- Services ---
export async function createService(formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const requirements = formData.get('requirements') as string
    const departmentId = formData.get('departmentId') as string

    await prisma.service.create({
        data: { title, description, requirements, departmentId }
    })

    revalidatePath('/admin/services')
    revalidatePath('/services')
}

export async function deleteService(id: string) {
    await prisma.service.delete({ where: { id } })
    revalidatePath('/admin/services')
    revalidatePath('/services')
}

// --- Projects ---
export async function createProject(formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const status = formData.get('status') as string
    const location = formData.get('location') as string
    const departmentId = formData.get('departmentId') as string

    await prisma.project.create({
        data: { title, description, status, location, departmentId }
    })

    revalidatePath('/admin/projects')
    revalidatePath('/projects')
}

export async function deleteProject(id: string) {
    await prisma.project.delete({ where: { id } })
    revalidatePath('/admin/projects')
    revalidatePath('/projects')
}

// --- News ---
export async function createNews(formData: FormData) {
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const category = formData.get('category') as string
    const image = formData.get('image') as string

    await prisma.news.create({
        data: { title, content, category, image }
    })

    revalidatePath('/admin/news')
    revalidatePath('/news')
}

export async function deleteNews(id: string) {
    await prisma.news.delete({ where: { id } })
    revalidatePath('/admin/news')
    revalidatePath('/news')
}
