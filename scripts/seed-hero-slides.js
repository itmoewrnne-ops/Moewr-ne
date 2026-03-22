const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seedHeroSlides() {
    try {
        console.log('Seeding hero slides...')

        // Delete existing slides
        await prisma.heroSlide.deleteMany({})

        // Create default slides
        const slides = [
            {
                title: 'Sustainable Water Management',
                subtitle: 'Ensuring access to clean water for all citizens',
                image: '/hero-slide-1.jpg',
                buttonText: 'Learn More',
                buttonLink: '/about/ministry',
                order: 1,
                active: true,
            },
            {
                title: 'Leadership & Governance',
                subtitle: 'Committed to excellence in public service',
                image: '/hero-slide-2.jpg',
                buttonText: 'Meet Our Team',
                buttonLink: '/about/leadership',
                order: 2,
                active: true,
            },
            {
                title: 'Renewable Energy Solutions',
                subtitle: 'Powering the nation with clean, sustainable solar energy',
                image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2072',
                buttonText: 'View Projects',
                buttonLink: '/projects',
                order: 3,
                active: true,
            },
        ]

        for (const slide of slides) {
            await prisma.heroSlide.create({ data: slide })
            console.log(`✅ Created slide: ${slide.title}`)
        }

        console.log('✅ Hero slides seeded successfully!')
    } catch (error) {
        console.error('Error seeding hero slides:', error)
    } finally {
        await prisma.$disconnect()
    }
}

seedHeroSlides()
