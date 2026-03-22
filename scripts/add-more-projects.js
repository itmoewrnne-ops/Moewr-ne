
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const images = [
        '/uploads/hero/slide-1.jpg',
        '/uploads/hero/slide-2.jpg'
    ]
    const getRandomImage = () => images[Math.floor(Math.random() * images.length)]

    try {
        const newProjects = [
            {
                title: 'National Grid Expansion Phase II',
                description: 'Extending the high-voltage transmission network to connect 50,000 new households to the national grid.',
                status: 'ONGOING',
                icon: 'Zap',
                location: 'National',
                budget: '$12M',
                progress: 45,
                image: getRandomImage(),
                active: true,
                order: 4
            },
            {
                title: 'Hargeisa Urban Water Treatment',
                description: 'Modernization of the city water treatment facilities to meet international safety standards.',
                status: 'ONGOING',
                icon: 'Droplets',
                location: 'Hargeisa',
                budget: '$8.5M',
                progress: 70,
                image: getRandomImage(),
                active: true,
                order: 5
            },
            {
                title: 'Berbera Solar Park',
                description: 'Construction of a 20MW solar photovoltaic plant reducing carbon emissions by 15,000 tons annually.',
                status: 'COMPLETED',
                icon: 'Sun',
                location: 'Berbera',
                budget: '$25M',
                progress: 100,
                image: getRandomImage(),
                active: true,
                order: 6
            },
            {
                title: 'Burao Borehole Drilling Campaign',
                description: 'Successful drilling and equipping of 20 strategic boreholes in drought-affected zones.',
                status: 'COMPLETED',
                icon: 'Disc', // specific icon if available, or generic
                location: 'Burao',
                budget: '$3M',
                progress: 100,
                image: getRandomImage(),
                active: true,
                order: 7
            }
        ]

        for (const project of newProjects) {
            await prisma.project.create({ data: project })
        }
        console.log(`Added ${newProjects.length} new projects (Ongoing/Completed)`)

    } catch (e) {
        console.error(e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
