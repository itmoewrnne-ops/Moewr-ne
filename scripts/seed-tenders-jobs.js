const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seedTendersAndJobs() {
    try {
        console.log('Seeding tenders and jobs...')

        // Clean up existing data
        await prisma.tender.deleteMany({})
        await prisma.job.deleteMany({})

        // Seed Tenders
        const tenders = [
            {
                title: 'Construction of Water Boreholes in Galmudug',
                category: 'Construction',
                status: 'OPEN',
                budget: '$250,000',
                deadline: new Date(Date.now() + 2592000000), // 30 days from now
            },
            {
                title: 'Supply of Solar Panels for Rural Electrification',
                category: 'Supply',
                status: 'OPEN',
                budget: '$150,000',
                deadline: new Date(Date.now() + 1296000000), // 15 days from now
            },
            {
                title: 'Consultancy for Environmental Impact Assessment',
                category: 'Consultancy',
                status: 'CLOSED',
                budget: '$50,000',
                deadline: new Date(Date.now() - 86400000), // Yesterday
            }
        ]

        for (const tender of tenders) {
            await prisma.tender.create({ data: tender })
            console.log(`✅ Created tender: ${tender.title}`)
        }

        // Seed Jobs
        const jobs = [
            {
                title: 'Senior Hydrologist',
                type: 'FULL_TIME',
                description: 'We are looking for an experienced Hydrologist to lead our water resource assessment team.',
                requirements: 'Master\'s degree in Hydrology, 5+ years experience',
                closingDate: new Date(Date.now() + 2592000000), // 30 days from now
            },
            {
                title: 'Renewable Energy Engineer',
                type: 'CONTRACT',
                description: 'Join our team to design and implement solar energy projects across the country.',
                requirements: 'Bachelor\'s degree in Electrical Engineering, Solar certification',
                closingDate: new Date(Date.now() + 1296000000), // 15 days from now
            }
        ]

        for (const job of jobs) {
            await prisma.job.create({ data: job })
            console.log(`✅ Created job: ${job.title}`)
        }

        console.log('✅ Tenders and Jobs seeded successfully!')
    } catch (error) {
        console.error('Error seeding:', error)
    } finally {
        await prisma.$disconnect()
    }
}

seedTendersAndJobs()
