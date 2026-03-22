
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const images = [
        '/uploads/hero/slide-1.jpg',
        '/uploads/hero/slide-2.jpg'
    ]
    const getRandomImage = () => images[Math.floor(Math.random() * images.length)]

    try {
        console.log('Starting mass seeding...')

        // 1. SERVICES
        const services = [
            { title: 'Water Quality Testing', description: 'Comprehensive laboratory analysis for water safety.', requirements: 'Sample submission form' },
            { title: 'Drilling Permits', description: 'Licensing for new borehole drilling operations.', requirements: 'Environmental impact assessment' },
            { title: 'Grid Connection', description: 'Application for residential and commercial power connection.', requirements: 'Property ownership proof' },
            { title: 'Environmental Audit', description: 'Mandatory annual environmental compliance audit.', requirements: 'Previous audit reports' }
        ]

        // Get a department to attach services to
        const dept = await prisma.department.findFirst()
        if (dept) {
            for (const s of services) {
                await prisma.service.create({
                    data: { ...s, departmentId: dept.id }
                })
            }
            console.log('Added 4 Services')
        }

        // 2. LEADERSHIP - Clear and Add
        await prisma.leadership.deleteMany({ where: { active: true } }) // simplified clear
        const leaders = [
            { name: 'Dr. Ali Hassan', position: 'Minister', bio: 'Expert in Hydrology with 15 years exp.', image: getRandomImage(), order: 1 },
            { name: 'Eng. Sarah Juma', position: 'Director General', bio: 'Energy sector veteran.', image: getRandomImage(), order: 2 },
            { name: 'Mr. Mohamed Abdi', position: 'Head of Water', bio: 'Leading major infrastructure projects.', image: getRandomImage(), order: 3 },
            { name: 'Ms. Faduma Ahmed', position: 'Head of Energy', bio: 'Specialist in renewable energy.', image: getRandomImage(), order: 4 }
        ]
        for (const l of leaders) {
            await prisma.leadership.create({ data: { ...l, active: true } })
        }
        console.log('Added 4 Leadership profiles')

        // 3. EVENTS (More)
        const events = [
            { title: 'National Water Conference', description: 'Annual gathering of industry experts.', category: 'CONFERENCE', startDate: new Date('2025-06-15'), status: 'UPCOMING', image: getRandomImage() },
            { title: 'Solar Training Workshop', description: 'Hands-on training for technicians.', category: 'TRAINING', startDate: new Date('2025-02-10'), status: 'UPCOMING', image: getRandomImage() }
        ]
        for (const e of events) {
            await prisma.event.create({ data: { ...e, published: true } })
        }
        console.log('Added 2 Events')

        // 4. JOBS
        const jobs = [
            { title: 'Senior Hydrologist', type: 'FULL_TIME', description: 'Lead water resource mapping.', closingDate: new Date('2025-03-01') },
            { title: 'Electrical Engineer', type: 'CONTRACT', description: 'Supervise grid expansion.', closingDate: new Date('2025-02-20') },
            { title: 'Project Manager', type: 'FULL_TIME', description: 'Manage donor-funded projects.', closingDate: new Date('2025-03-15') }
        ]
        for (const j of jobs) {
            await prisma.job.create({ data: j })
        }
        console.log('Added 3 Jobs')

        // 5. TENDERS
        const tenders = [
            { title: 'Supply of Solar Panels', category: 'Energy', status: 'OPEN', deadline: new Date('2025-04-01') },
            { title: 'Borehole Drilling Phase 2', category: 'Infrastructure', status: 'OPEN', deadline: new Date('2025-03-20') }
        ]
        for (const t of tenders) {
            await prisma.tender.create({ data: t })
        }
        console.log('Added 2 Tenders')

        // 6. ONLINE SERVICES
        const onlineServices = [
            { title: 'E-Licensing Portal', description: 'Apply for licenses online.', category: 'APPLICATION', icon: 'Globe' },
            { title: 'Bill Payment', description: 'Pay utility bills instantly.', category: 'PAYMENT', icon: 'CreditCard' }
        ]
        for (const os of onlineServices) {
            await prisma.onlineService.create({ data: { ...os, active: true } })
        }
        console.log('Added 2 Online Services')

    } catch (e) {
        console.error(e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
