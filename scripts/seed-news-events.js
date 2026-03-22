const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seedNewsAndEvents() {
    try {
        console.log('Seeding news and events...')

        // Clean up existing data
        await prisma.news.deleteMany({})
        await prisma.event.deleteMany({})

        // Seed News
        const newsItems = [
            {
                title: 'Ministry Launches New Water Conservation Project',
                content: 'The Ministry of Water, Energy and Natural Resources has today launched a comprehensive water conservation project aimed at improving water security in drought-prone areas. The project involves the construction of new dams and rehabilitation of existing boreholes.',
                category: 'NEWS',
                date: new Date(),
                published: true
            },
            {
                title: 'Renewable Energy Summit Announced',
                content: 'We are pleased to announce the upcoming Renewable Energy Summit which will bring together stakeholders from across the region to discuss sustainable energy solutions.',
                category: 'ANNOUNCEMENT',
                date: new Date(Date.now() - 86400000), // Yesterday
                published: true
            },
            {
                title: 'Quarterly Report on Natural Resources',
                content: 'The quarterly report on the state of natural resources has been released. It highlights significant progress in forest conservation efforts.',
                category: 'PRESS_RELEASE',
                date: new Date(Date.now() - 172800000), // 2 days ago
                published: true
            }
        ]

        for (const item of newsItems) {
            await prisma.news.create({ data: item })
            console.log(`✅ Created news: ${item.title}`)
        }

        // Seed Events
        const events = [
            {
                title: 'National Water Summit 2025',
                description: 'A high-level summit discussing the future of water resources in the country.',
                category: 'CONFERENCE',
                startDate: new Date(Date.now() + 604800000), // 1 week from now
                endDate: new Date(Date.now() + 691200000),
                location: 'Mogadishu',
                venue: 'Decale Hotel',
                status: 'UPCOMING',
                published: true
            },
            {
                title: 'Solar Energy Workshop',
                description: 'Technical workshop for solar energy installers and engineers.',
                category: 'WORKSHOP',
                startDate: new Date(Date.now() + 1209600000), // 2 weeks from now
                location: 'Hargeisa',
                venue: 'Mansoor Hotel',
                status: 'UPCOMING',
                published: true
            }
        ]

        for (const event of events) {
            await prisma.event.create({ data: event })
            console.log(`✅ Created event: ${event.title}`)
        }

        console.log('✅ News and Events seeded successfully!')
    } catch (error) {
        console.error('Error seeding:', error)
    } finally {
        await prisma.$disconnect()
    }
}

seedNewsAndEvents()
