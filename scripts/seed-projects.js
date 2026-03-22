const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seedProjects() {
    try {
        console.log('Seeding projects...')

        // Delete existing projects
        await prisma.project.deleteMany({})

        // Create default projects
        const projects = [
            {
                title: 'Kenya Water, Sanitation and Hygiene (K-WASH) Program',
                description: 'Comprehensive water and sanitation infrastructure development program',
                status: 'ONGOING',
                icon: 'Droplets',
                location: 'Garowe, Puntland',
                budget: '$5.2 Million',
                timeline: '2023-2026',
                progress: 65,
                order: 1,
                active: true,
            },
            {
                title: 'Thwake Multipurpose Water Development Programme',
                description: 'Large-scale water storage and distribution infrastructure project',
                status: 'ONGOING',
                icon: 'Factory',
                location: 'Bosaso Region',
                budget: '$8.5 Million',
                timeline: '2022-2025',
                progress: 45,
                order: 2,
                active: true,
            },
            {
                title: 'Horn of Africa Groundwater for Resilience',
                description: 'Groundwater exploration and sustainable management initiative',
                status: 'COMPLETED',
                icon: 'Waves',
                location: 'Multiple Districts',
                budget: '$3.2 Million',
                timeline: '2020-2023',
                progress: 100,
                order: 3,
                active: true,
            },
            {
                title: 'Kenya Water Security and Climate Resilience Programme',
                description: 'Climate adaptation and water security enhancement project',
                status: 'UPCOMING',
                icon: 'Shield',
                location: 'Statewide',
                budget: '$12 Million',
                timeline: '2025-2028',
                progress: 0,
                order: 4,
                active: true,
            },
            {
                title: 'Mwache Multipurpose Dam Project',
                description: 'Major dam construction for water storage and hydropower',
                status: 'UPCOMING',
                icon: 'Sprout',
                location: 'Qardho District',
                budget: '$15 Million',
                timeline: '2026-2030',
                progress: 0,
                order: 5,
                active: true,
            },
        ]

        for (const project of projects) {
            await prisma.project.create({ data: project })
            console.log(`✅ Created project: ${project.title}`)
        }

        console.log('✅ Projects seeded successfully!')
    } catch (error) {
        console.error('Error seeding projects:', error)
    } finally {
        await prisma.$disconnect()
    }
}

seedProjects()
