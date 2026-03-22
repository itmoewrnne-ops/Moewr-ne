
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    try {
        const stats = await prisma.statistic.count()
        const projects = await prisma.project.count()
        const events = await prisma.event.count()
        const news = await prisma.news.count()
        const leadership = await prisma.leadership.count()
        const partners = await prisma.partner.count()

        console.log(JSON.stringify({
            stats,
            projects,
            events,
            news,
            leadership,
            partners
        }, null, 2))
    } catch (e) {
        console.error(e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
