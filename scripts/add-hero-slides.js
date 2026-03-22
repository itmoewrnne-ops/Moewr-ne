const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function addHeroSlides() {
    console.log('Adding hero slides...')

    try {
        // Delete existing slides first
        await prisma.heroSlide.deleteMany({})

        // Create new hero slides
        await prisma.heroSlide.createMany({
            data: [
                {
                    title: 'Sustainable Water for All',
                    subtitle: 'Ensuring access to clean and safe water for every citizen',
                    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=2070',
                    buttonText: 'Learn More',
                    buttonLink: '/about',
                    order: 1,
                    active: true,
                },
                {
                    title: 'Powering Our Future',
                    subtitle: 'Developing renewable energy solutions for sustainable development',
                    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=2070',
                    buttonText: 'Our Projects',
                    buttonLink: '/projects',
                    order: 2,
                    active: true,
                },
                {
                    title: 'Building Infrastructure',
                    subtitle: 'Investing in water and energy infrastructure across the nation',
                    image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=2070',
                    buttonText: 'View Projects',
                    buttonLink: '/projects',
                    order: 3,
                    active: true,
                },
            ],
        })

        console.log('✅ Hero slides added successfully!')

        // Verify
        const count = await prisma.heroSlide.count()
        console.log(`Total hero slides: ${count}`)

    } catch (error) {
        console.error('Error adding hero slides:', error)
    } finally {
        await prisma.$disconnect()
    }
}

addHeroSlides()
