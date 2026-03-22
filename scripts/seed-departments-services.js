const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const slugify = require('slugify')

async function seedDepartmentsAndServices() {
    try {
        console.log('Seeding departments and services...')

        // Clean up existing data
        await prisma.service.deleteMany({})
        await prisma.department.deleteMany({})

        const departments = [
            {
                name: 'Department of Water Resources',
                description: 'Responsible for the management, development, and conservation of water resources.',
                functions: 'Water quality monitoring, Hydrological surveys, Water allocation planning',
                mandate: 'To ensure sustainable availability and management of water and sanitation for all.',
                headName: 'Eng. Abdi Hassan',
                contactEmail: 'water@ministry.gov.so',
                services: [
                    {
                        title: 'Water Connection Application',
                        description: 'Apply for new residential or commercial water connection.',
                        requirements: 'ID Copy, Land Title Deed, Application Fee'
                    },
                    {
                        title: 'Water Quality Testing',
                        description: 'Request laboratory testing for water samples.',
                        requirements: 'Water Sample, Request Letter'
                    }
                ]
            },
            {
                name: 'Department of Energy',
                description: 'Oversees energy policy, renewable energy projects, and electricity regulation.',
                functions: 'Energy planning, Renewable energy promotion, Rural electrification',
                mandate: 'To facilitate affordable, reliable, sustainable and modern energy for all.',
                headName: 'Dr. Sarah Mohamed',
                contactEmail: 'energy@ministry.gov.so',
                services: [
                    {
                        title: 'Solar Permit Application',
                        description: 'License for installing large-scale solar systems.',
                        requirements: 'Technical Design, Environmental Impact Assessment'
                    },
                    {
                        title: 'Grid Connection Request',
                        description: 'Application for connecting to the national power grid.',
                        requirements: 'Site Plan, Load Estimation'
                    }
                ]
            },
            {
                name: 'Department of Natural Resources',
                description: 'Manages mineral resources, forestry, and environmental protection.',
                functions: 'Mineral exploration licensing, Environmental impact assessments, Forest conservation',
                mandate: 'To ensure sustainable management and utilization of natural resources.',
                headName: 'Mr. Yusuf Ali',
                contactEmail: 'resources@ministry.gov.so',
                services: [
                    {
                        title: 'Mining License Application',
                        description: 'Apply for exploration or extraction licenses.',
                        requirements: 'Company Registration, Financial Capability Proof'
                    },
                    {
                        title: 'Environmental Clearance',
                        description: 'Get clearance for development projects.',
                        requirements: 'Project Proposal, EIA Report'
                    }
                ]
            }
        ]

        for (const dept of departments) {
            const slug = slugify(dept.name, { lower: true, strict: true })

            const createdDept = await prisma.department.create({
                data: {
                    name: dept.name,
                    slug: slug,
                    description: dept.description,
                    functions: dept.functions,
                    mandate: dept.mandate,
                    headName: dept.headName,
                    contactEmail: dept.contactEmail,
                }
            })
            console.log(`✅ Created department: ${dept.name}`)

            for (const service of dept.services) {
                await prisma.service.create({
                    data: {
                        title: service.title,
                        description: service.description,
                        requirements: service.requirements,
                        departmentId: createdDept.id
                    }
                })
                console.log(`   - Created service: ${service.title}`)
            }
        }

        console.log('✅ Departments and Services seeded successfully!')
    } catch (error) {
        console.error('Error seeding:', error)
    } finally {
        await prisma.$disconnect()
    }
}

seedDepartmentsAndServices()
