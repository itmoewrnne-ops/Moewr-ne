
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    try {
        // Delete existing slides to reset
        await prisma.heroSlide.deleteMany({})
        console.log('Deleted existing slides')

        // Create new slide with updated title
        await prisma.heroSlide.create({
            data: {
                title: 'LasAnod Water Conservation',
                subtitle: 'Pioneering sustainable water solutions for our future',
                image: '/uploads/hero/slide-1.jpg',
                buttonText: 'Our Projects',
                buttonLink: '/projects',
                order: 1,
                active: true
            }
        })

        // Re-create the second slide as well (assuming they want to keep the images I uploaded, but just change the text of the first one). 
        // However, the user said 'only use renuwable energy photo' in the previous turn. 
        // If they meant 'only use that one photo for ALL slides' or 'only have ONE slide', I should probably stick to just one slide if the second one used a different photo.
        // In the previous turn I created 2 slides. Slide 1 used slide-1.jpg. Slide 2 used slide-2.jpg.
        // If the user said "only use renuwable energy photo" (singular), maybe I should only have ONE slide?
        // Let's assume for now I should only have the one slide about LasAnod Water.

        console.log('Created updated slide')
    } catch (e) {
        console.error(e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
