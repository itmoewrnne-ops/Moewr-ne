const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seedQuickLinks() {
    try {
        console.log('Seeding quick links...')

        // Delete existing links
        await prisma.quickLink.deleteMany({})

        // Create default quick links
        const links = [
            {
                title: 'Water Connection Application',
                href: '/services',
                icon: 'FileText',
                order: 1,
                active: true,
            },
            {
                title: 'Download Forms',
                href: '/downloads',
                icon: 'Download',
                order: 2,
                active: true,
            },
            {
                title: 'Tender Documents',
                href: '/tenders',
                icon: 'FileCheck',
                order: 3,
                active: true,
            },
            {
                title: 'Project Reports',
                href: '/projects',
                icon: 'Folder',
                order: 4,
                active: true,
            },
        ]

        for (const link of links) {
            await prisma.quickLink.create({ data: link })
            console.log(`✅ Created quick link: ${link.title}`)
        }

        console.log('✅ Quick links seeded successfully!')
    } catch (error) {
        console.error('Error seeding quick links:', error)
    } finally {
        await prisma.$disconnect()
    }
}

seedQuickLinks()
