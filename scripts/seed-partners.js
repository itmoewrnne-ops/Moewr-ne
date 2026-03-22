const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seedPartners() {
    try {
        console.log('Seeding partners...')

        // Delete existing partners
        await prisma.partner.deleteMany({})

        // Create default partners
        const partners = [
            {
                name: 'The World Bank',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/World_Bank_logo.svg/200px-World_Bank_logo.svg.png',
                website: 'https://www.worldbank.org',
                category: 'Development Partner',
                order: 1,
                active: true,
            },
            {
                name: 'UNICEF',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/UNICEF_Logo.svg/200px-UNICEF_Logo.svg.png',
                website: 'https://www.unicef.org',
                category: 'Development Partner',
                order: 2,
                active: true,
            },
            {
                name: 'UNDP',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/UNDP_logo.svg/200px-UNDP_logo.svg.png',
                website: 'https://www.undp.org',
                category: 'Development Partner',
                order: 3,
                active: true,
            },
            {
                name: 'World Health Organization',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/WHO_logo.svg/200px-WHO_logo.svg.png',
                website: 'https://www.who.int',
                category: 'Development Partner',
                order: 4,
                active: true,
            },
            {
                name: 'African Development Bank',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/African_Development_Bank_Logo.svg/200px-African_Development_Bank_Logo.svg.png',
                website: 'https://www.afdb.org',
                category: 'Financial Partner',
                order: 5,
                active: true,
            },
            {
                name: 'USAID',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/USAID-Identity.svg/200px-USAID-Identity.svg.png',
                website: 'https://www.usaid.gov',
                category: 'Development Partner',
                order: 6,
                active: true,
            },
        ]

        for (const partner of partners) {
            await prisma.partner.create({ data: partner })
            console.log(`✅ Created partner: ${partner.name}`)
        }

        console.log('✅ Partners seeded successfully!')
    } catch (error) {
        console.error('Error seeding partners:', error)
    } finally {
        await prisma.$disconnect()
    }
}

seedPartners()
