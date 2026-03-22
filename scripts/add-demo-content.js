
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    try {
        // 1. Add Projects
        const projects = [
            {
                title: 'Las Anod Urban Water Supply',
                description: 'Comprehensive water supply system rehabilitation and expansion to serve the growing population of Las Anod.',
                status: 'ONGOING',
                icon: 'Droplets',
                location: 'Las Anod',
                progress: 65,
                active: true,
                order: 2
            },
            {
                title: 'Rural Solar Mini-Grids',
                description: 'Installation of solar hybrid mini-grids to provide reliable eco-friendly electricity to 15 rural communities.',
                status: 'UPCOMING',
                icon: 'Zap',
                location: 'Multiple Regions',
                progress: 10,
                active: true,
                order: 3
            }
        ]

        for (const project of projects) {
            await prisma.project.create({ data: project })
        }
        console.log('Added 2 Projects')

        // 2. Add News
        const newsItems = [
            {
                title: 'Ministry Launches Strategic Water Plan 2025',
                content: 'The Ministry has officially unveiled the new 5-year strategic plan to ensure water security and sustainable management of resources across the region.',
                category: 'NEWS',
                published: true,
                date: new Date('2024-12-01')
            },
            {
                title: 'Renewable Energy Summit Success',
                content: 'Key stakeholders gathered to discuss the future of green energy in the region, securing investments for major solar and wind projects.',
                category: 'EVENT',
                published: true,
                date: new Date('2024-11-20')
            }
        ]

        for (const news of newsItems) {
            await prisma.news.create({ data: news })
        }
        console.log('Added 2 News Items')

    } catch (e) {
        console.error(e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
