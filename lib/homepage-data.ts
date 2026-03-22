import { prisma } from './prisma'

export async function getHomepageData() {
    try {
        // Fetch all data in parallel to minimize database round trips
        const [
            heroSlides,
            minister,
            stats,
            projects,
            events,
            news,
            leadership,
            partners,
        ] = await Promise.all([
            // Hero Slides
            prisma.heroSlide.findMany({
                where: { active: true },
                orderBy: { order: 'asc' },
                take: 5,
            }),

            // Minister (for Welcome Section)
            prisma.leadership.findFirst({
                where: {
                    active: true,
                    position: { contains: 'MINISTER' },
                },
                orderBy: { order: 'asc' },
            }),

            // Statistics
            prisma.statistic.findMany({
                where: { active: true },
                orderBy: { order: 'asc' },
                take: 8,
            }),

            // Projects (for ProjectsTabs)
            prisma.project.findMany({
                where: { active: true },
                orderBy: { order: 'asc' },
                take: 12,
            }),

            // Events
            prisma.event.findMany({
                where: {
                    published: true,
                    startDate: { gte: new Date() },
                },
                orderBy: { startDate: 'asc' },
                take: 3,
            }),

            // News (for Announcements)
            prisma.news.findMany({
                where: { published: true },
                orderBy: { date: 'desc' },
                take: 6,
            }),

            // Leadership
            prisma.leadership.findMany({
                where: { active: true },
                orderBy: { order: 'asc' },
                take: 4,
            }),

            // Partners
            prisma.partner.findMany({
                where: { active: true },
                orderBy: { order: 'asc' },
            }),
        ])

        return {
            heroSlides,
            minister,
            stats,
            projects,
            events,
            news,
            leadership,
            partners,
        }
    } catch (error) {
        console.error('Error fetching homepage data:', error)
        // Return empty data on error to prevent page crash
        return {
            heroSlides: [],
            minister: null,
            stats: [],
            projects: [],
            events: [],
            news: [],
            leadership: [],
            partners: [],
        }
    }
}

export type HomepageData = Awaited<ReturnType<typeof getHomepageData>>
