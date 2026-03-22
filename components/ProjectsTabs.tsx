import { prisma } from '@/lib/prisma'
import { ProjectsTabsClient } from './ProjectsTabsClient'

export const revalidate = 60

async function getProjects() {
    try {
        const projects = await prisma.project.findMany({
            where: { active: true },
            orderBy: { order: 'asc' },
        })
        return projects
    } catch (error) {
        console.error('Error fetching projects:', error)
        return []
    }
}

export async function ProjectsTabs() {
    const projects = await getProjects()

    return (
        <section className="py-16 bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                        Our Projects
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our ongoing and completed initiatives aimed at improving water and energy infrastructure across the region.
                    </p>
                </div>

                <ProjectsTabsClient projects={projects} />
            </div>
        </section>
    )
}
