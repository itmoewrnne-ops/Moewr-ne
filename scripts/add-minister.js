const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function addMinister() {
    try {
        // Check if minister already exists
        const existing = await prisma.leadership.findFirst({
            where: {
                position: {
                    contains: 'MINISTER',
                },
            },
        })

        if (existing) {
            console.log('Minister already exists. Updating...')
            await prisma.leadership.update({
                where: { id: existing.id },
                data: {
                    name: 'Gen Abd Hassan Mohamed Hijaar',
                    position: 'THE MINISTER',
                    image: '/uploads/ministers/minister.jpg',
                    bio: 'The Ministry of Water, Sanitation & Irrigation is committed to ensuring sustainable water resource management and equitable access to clean water and sanitation services for all citizens. Under my leadership, we are working tirelessly to implement innovative solutions, strengthen infrastructure, and build partnerships that will transform our water sector for generations to come.',
                    email: 'minister@mow.gov.so',
                    phone: '+252 61 234 5678',
                    order: 1,
                    active: true,
                },
            })
            console.log('✅ Minister updated successfully!')
        } else {
            console.log('Creating new minister...')
            await prisma.leadership.create({
                data: {
                    name: 'Gen Abd Hassan Mohamed (Xijaar)',
                    position: 'Minister',
                    image: '/uploads/ministers/minister.jpg',
                    bio: 'The Ministry of Water, Sanitation & Irrigation is committed to ensuring sustainable water resource management and equitable access to clean water and sanitation services for all citizens. Under my leadership, we are working tirelessly to implement innovative solutions, strengthen infrastructure, and build partnerships that will transform our water sector for generations to come.',
                    email: 'minister@mow.gov.so',
                    phone: '+252 61 234 5678',
                    order: 1,
                    active: true,
                },
            })
            console.log('✅ Minister created successfully!')
        }
    } catch (error) {
        console.error('Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

addMinister()
