const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function initializeLeadership() {
    try {
        // Check if leadership data already exists
        const existing = await prisma.leadership.count()

        if (existing > 0) {
            console.log('Leadership data already exists. Skipping initialization.')
            return
        }

        // Create default leadership members
        const leadership = [
            {
                name: 'Hon. Ahmed Mohamed',
                position: 'Minister',
                image: 'https://ui-avatars.com/api/?name=Ahmed+Mohamed&size=400&background=1e40af&color=fff',
                bio: 'Leading the ministry with over 20 years of experience in public service and resource management.',
                email: 'minister@mow.gov',
                phone: '+252 61 234 5678',
                order: 1,
                active: true,
            },
            {
                name: 'Dr. Fatima Hassan',
                position: 'Deputy Minister',
                image: 'https://ui-avatars.com/api/?name=Fatima+Hassan&size=400&background=059669&color=fff',
                bio: 'Expert in water resource management with a PhD in Environmental Engineering.',
                email: 'deputy.minister@mow.gov',
                phone: '+252 61 234 5679',
                order: 2,
                active: true,
            },
            {
                name: 'Eng. Omar Ali',
                position: 'Permanent Secretary',
                image: 'https://ui-avatars.com/api/?name=Omar+Ali&size=400&background=dc2626&color=fff',
                bio: 'Experienced civil engineer specializing in infrastructure development and energy systems.',
                email: 'ps@mow.gov',
                phone: '+252 61 234 5680',
                order: 3,
                active: true,
            },
        ]

        for (const leader of leadership) {
            await prisma.leadership.create({
                data: leader,
            })
        }

        console.log('✅ Successfully initialized leadership data!')
    } catch (error) {
        console.error('Error initializing leadership:', error)
    } finally {
        await prisma.$disconnect()
    }
}

initializeLeadership()
