import { prisma } from '@/lib/prisma'
import { AnnouncementsSectionClient } from './AnnouncementsSectionClient'

export const revalidate = 60

async function getNewsArticles() {
    try {
        const articles = await prisma.news.findMany({
            where: {
                published: true,
            },
            orderBy: {
                date: 'desc',
            },
            take: 8, // Fetch enough for 2 slides
        })

        return articles
    } catch (error) {
        console.error('Error fetching news articles:', error)
        return []
    }
}

export async function AnnouncementsSection() {
    const articles = await getNewsArticles()

    return <AnnouncementsSectionClient articles={articles} />
}
