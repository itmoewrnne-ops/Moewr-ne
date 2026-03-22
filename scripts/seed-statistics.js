const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seedStatistics() {
    try {
        console.log('Seeding statistics...')

        // Delete existing statistics
        await prisma.statistic.deleteMany({})

        // Create default statistics
        const stats = [
            {
                title: 'Energy Projects',
                value: '12',
                unit: 'Projects',
                category: 'PROJECTS',
                icon: 'Zap',
                order: 1,
                active: true,
            },
            {
                title: 'Water Projects',
                value: '20',
                unit: 'Projects',
                category: 'PROJECTS',
                icon: 'Droplets',
                order: 2,
                active: true,
            },
            {
                title: 'Wells Rehabilitated',
                value: '50',
                unit: 'Wells',
                category: 'WATER_COVERAGE',
                icon: 'Wrench',
                order: 3,
                active: true,
            },
            {
                title: 'Shallow Wells',
                value: '55',
                unit: 'Wells',
                category: 'WATER_COVERAGE',
                icon: 'Drill',
                order: 4,
                active: true,
            },
        ]

        for (const stat of stats) {
            await prisma.statistic.create({ data: stat })
            console.log(`✅ Created statistic: ${stat.title}`)
        }

        console.log('✅ Statistics seeded successfully!')
    } catch (error) {
        console.error('Error seeding statistics:', error)
    } finally {
        await prisma.$disconnect()
    }
}

seedStatistics()
