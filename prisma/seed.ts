import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

// Ensure we use the DATABASE_URL from environment
const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  console.error('❌ ERROR: DATABASE_URL environment variable is not set!')
  process.exit(1)
}

console.log('🌱 Seed script starting...')
console.log('Using DATABASE_URL:', databaseUrl.replace(/file:/, ''))

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
})

async function main() {
  console.log('Start seeding ...')

  // 1. Remove old admin (admin@mow.gov) and create Admin User
  await prisma.user.deleteMany({ where: { email: 'admin@mow.gov' } }).catch(() => {})
  
  const hashedPassword = await bcrypt.hash('password123', 10)
  console.log('Creating admin user...')
  const admin = await prisma.user.upsert({
    where: { email: 'hanamaxamuud479@gmail.com' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'hanamaxamuud479@gmail.com',
      name: 'Hani Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin user created/updated:', admin.email)

  // 2. Create Departments with enhanced fields
  const waterDept = await prisma.department.upsert({
    where: { slug: 'water-resources' },
    update: { name: 'Water Resources & Hydrometeorology Department', functions: JSON.stringify(['Water Service and Supply', 'Operation and Maintenance']) },
    create: {
      name: 'Water Resources & Hydrometeorology Department',
      slug: 'water-resources',
      description: 'Responsible for sustainable management and development of water resources.',
      image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=2070',
      functions: JSON.stringify(['Water Service and Supply', 'Operation and Maintenance']),
      mandate: 'To ensure sustainable management, development, and equitable distribution of water resources for all citizens.',
      headName: 'Director',
      contactEmail: 'water@mow.gov',
      contactPhone: '+252-1-234567',
      achievements: JSON.stringify([
        'Increased water coverage by 25% in 2024',
        'Completed 15 major water projects',
        'Trained 200+ water technicians'
      ]),
    },
  })

  const energyDept = await prisma.department.upsert({
    where: { slug: 'energy' },
    update: { name: 'Energy Department' },
    create: {
      name: 'Energy Department',
      slug: 'energy',
      description: 'Overseeing energy production, distribution, and renewable energy initiatives.',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=2070',
      functions: JSON.stringify(['Electricity Generation and Transmission', 'Renewable Energy']),
      mandate: 'To develop and promote sustainable energy solutions for national development.',
      headName: 'Director',
      contactEmail: 'energy.moewr@ne.so',
      contactPhone: '+252-1-234568',
    },
  })

  await prisma.department.upsert({
    where: { slug: 'planning-policy' },
    update: {},
    create: {
      name: 'Planning and Policy Department',
      slug: 'planning-policy',
      description: 'Strategic planning and policy development for the ministry.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c71ca48?auto=format&fit=crop&q=80&w=2070',
      functions: JSON.stringify(['Planning', 'Monitoring and Evaluation (M&E)']),
      mandate: 'To develop and coordinate ministry-wide planning and policy.',
      headName: 'Director',
      contactEmail: 'planning.moewr@ne.so',
      contactPhone: '+252-1-234569',
    },
  })

  await prisma.department.upsert({
    where: { slug: 'administration-finance' },
    update: {},
    create: {
      name: 'Administration and Finance Department',
      slug: 'administration-finance',
      description: 'Administrative support and financial management for the ministry.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2070',
      functions: JSON.stringify(['Administration', 'Finance and Accounting']),
      mandate: 'To provide efficient administrative and financial services.',
      headName: 'Director',
      contactEmail: 'admin.moewr@ne.so',
      contactPhone: '+252-1-234570',
    },
  })

  await prisma.department.upsert({
    where: { slug: 'human-resources' },
    update: {},
    create: {
      name: 'Human Resources Department',
      slug: 'human-resources',
      description: 'Recruitment, staffing, and capacity building for ministry personnel.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070',
      functions: JSON.stringify(['Recruitment and Staffing', 'Training and Capacity Building']),
      mandate: 'To ensure effective human resource management.',
      headName: 'Director',
      contactEmail: 'hr.moewr@ne.so',
      contactPhone: '+252-1-234571',
    },
  })

  await prisma.department.upsert({
    where: { slug: 'information-technology' },
    update: {
      name: 'ICT Department',
      description: 'An IT department (Information Technology department) is a unit within an organization responsible for managing and overseeing the technology infrastructure and systems. The main goal of the IT department is to ensure that all technology-related systems run smoothly, securely, and efficiently.',
      functions: JSON.stringify([
        'Computer Hardware: Physical devices like computers, servers, and networking equipment',
        'Software: Programs and applications that allow users to perform specific tasks, from operating systems to specialized tools',
        'Networking: The connections between computers and devices, often involving the internet or private networks',
        'Cyber security: Protecting systems and data from cyber threats',
        'Data Management: Storing, organizing, and analysing data',
      ]),
      mandate: "The mission of an IT department typically outlines its core purpose and how it aims to support the organization's goals through technology. While the vision is more future-oriented, the mission focuses on the department's present-day responsibilities and the actions it takes to fulfill its role.",
      headBio: "The vision of an IT department refers to the use of computers, software, networks, and other electronic systems to process, store, and share information. It involves a wide range of fields including computer hardware, software, networking, cyber security, and data management.",
    },
    create: {
      name: 'ICT Department',
      slug: 'information-technology',
      description: 'An IT department (Information Technology department) is a unit within an organization responsible for managing and overseeing the technology infrastructure and systems. The main goal of the IT department is to ensure that all technology-related systems run smoothly, securely, and efficiently.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=2070',
      functions: JSON.stringify([
        'Computer Hardware: Physical devices like computers, servers, and networking equipment',
        'Software: Programs and applications that allow users to perform specific tasks, from operating systems to specialized tools',
        'Networking: The connections between computers and devices, often involving the internet or private networks',
        'Cyber security: Protecting systems and data from cyber threats',
        'Data Management: Storing, organizing, and analysing data',
      ]),
      mandate: "The mission of an IT department typically outlines its core purpose and how it aims to support the organization's goals through technology. While the vision is more future-oriented, the mission focuses on the department's present-day responsibilities and the actions it takes to fulfill its role.",
      headBio: "The vision of an IT department refers to the use of computers, software, networks, and other electronic systems to process, store, and share information. It involves a wide range of fields including computer hardware, software, networking, cyber security, and data management.",
      headName: 'Director',
      contactEmail: 'it.moewr@ne.so',
      contactPhone: '+252-1-234572',
    },
  })

  await prisma.department.upsert({
    where: { slug: 'officer' },
    update: {},
    create: {
      name: 'Officer',
      slug: 'officer',
      description: 'Minister\'s office and executive coordination.',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2070',
      functions: JSON.stringify(['Executive Support', 'Coordination']),
      mandate: 'To support executive functions and coordination.',
      headName: 'Officer',
      contactEmail: 'moewr@ne.so',
      contactPhone: '+252-1-234573',
    },
  })

  // 3. Create Services
  await prisma.service.create({
    data: {
      title: 'Water Connection Application',
      description: 'Apply for a new residential or commercial water connection.',
      requirements: 'ID Copy, Title Deed, Application Form',
      departmentId: waterDept.id,
    },
  })

  await prisma.service.create({
    data: {
      title: 'Solar Permit Issuance',
      description: 'Get a permit for installing solar panels.',
      requirements: 'Site Plan, Technical Drawings',
      departmentId: energyDept.id,
    },
  })

  // 4. Create Enhanced Projects
  await prisma.project.create({
    data: {
      title: 'National Dam Construction Project',
      description: 'Construction of a major dam to improve water storage capacity and irrigation infrastructure.',
      status: 'ONGOING',
      location: 'Northern Region',
      departmentId: waterDept.id,
      image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=2070',
      budget: '$50 Million',
      timeline: '2023-2026',
      progress: 65,
    },
  })

  // 5. Create News
  await prisma.news.create({
    data: {
      title: 'Minister Launches New Water Project',
      content: 'The Minister today launched a groundbreaking water project that will serve thousands...',
      category: 'NEWS',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2070',
      published: true,
    },
  })

  // 6. Create Events
  await prisma.event.createMany({
    data: [
      {
        title: 'Water Sector Development Forum 2025',
        description: 'Annual forum bringing together stakeholders in the water sector to discuss challenges and opportunities.',
        category: 'FORUM',
        startDate: new Date('2025-03-15'),
        endDate: new Date('2025-03-17'),
        location: 'Mogadishu',
        venue: 'National Conference Center',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2070',
        status: 'UPCOMING',
        published: true,
      },
      {
        title: 'Training of Trainers Workshop (TOT)',
        description: 'Intensive training program for water sector professionals to become certified trainers.',
        category: 'TRAINING',
        startDate: new Date('2025-02-10'),
        endDate: new Date('2025-02-14'),
        location: 'Hargeisa',
        venue: 'Water Technology Institute',
        status: 'UPCOMING',
        published: true,
      },
      {
        title: 'Renewable Energy Conference',
        description: 'International conference on renewable energy solutions for sustainable development.',
        category: 'CONFERENCE',
        startDate: new Date('2025-04-20'),
        endDate: new Date('2025-04-22'),
        location: 'Mogadishu',
        registrationUrl: 'https://example.com/register',
        status: 'UPCOMING',
        published: true,
      },
    ],
  })

  // 7. Create Online Services
  await prisma.onlineService.createMany({
    data: [
      {
        title: 'Water Contractor Registration',
        description: 'Register as a certified water contractor to bid on government projects.',
        category: 'REGISTRATION',
        requirements: 'Business License, Technical Qualifications, Insurance Certificate',
        icon: 'FileText',
        order: 1,
        active: true,
      },
      {
        title: 'Water Professional License',
        description: 'Apply for or renew your water professional license.',
        category: 'LICENSE',
        requirements: 'Academic Certificates, Work Experience, ID Copy',
        icon: 'Award',
        order: 2,
        active: true,
      },
      {
        title: 'Borehole Drilling Permit',
        description: 'Apply for permission to drill a borehole on your property.',
        category: 'APPLICATION',
        requirements: 'Land Title, Site Plan, Environmental Assessment',
        icon: 'Droplet',
        order: 3,
        active: true,
      },
    ],
  })

  // 8. Create Courses
  await prisma.course.createMany({
    data: [
      {
        title: 'Operation & Maintenance of Water Systems',
        description: 'Comprehensive 6-month certificate program covering water system O&M.',
        duration: '6 months',
        level: 'CERTIFICATE',
        category: 'O&M',
        requirements: 'High School Diploma, Basic Technical Knowledge',
        curriculum: 'Module 1: Water System Basics, Module 2: Maintenance Procedures, Module 3: Troubleshooting',
        capacity: 30,
        enrolled: 18,
        status: 'ACTIVE',
      },
      {
        title: 'Integrated Water Resources Management (IWRM)',
        description: 'Advanced diploma program in water resources management.',
        duration: '12 months',
        level: 'DIPLOMA',
        category: 'IWRM',
        requirements: 'Bachelor\'s Degree or Equivalent Experience',
        capacity: 25,
        enrolled: 12,
        status: 'ACTIVE',
      },
      {
        title: 'Training of Trainers (TOT)',
        description: 'Short-term intensive program to develop training skills.',
        duration: '2 weeks',
        level: 'TOT',
        category: 'MANAGEMENT',
        startDate: new Date('2025-02-10'),
        endDate: new Date('2025-02-24'),
        capacity: 20,
        enrolled: 15,
        status: 'UPCOMING',
      },
    ],
  })

  // 9. Create Resources
  await prisma.resource.createMany({
    data: [
      {
        title: 'National Water Policy 2024',
        description: 'Comprehensive water policy framework for sustainable water management.',
        category: 'POLICY',
        fileUrl: '/documents/water-policy-2024.pdf',
        fileSize: '2.5 MB',
        fileType: 'PDF',
        downloads: 145,
      },
      {
        title: 'Water Sector Annual Report 2023',
        description: 'Detailed report on water sector achievements and challenges.',
        category: 'REPORT',
        fileUrl: '/documents/annual-report-2023.pdf',
        fileSize: '5.8 MB',
        fileType: 'PDF',
        downloads: 89,
      },
      {
        title: 'Technical Guidelines for Borehole Drilling',
        description: 'Standard operating procedures for safe borehole drilling.',
        category: 'GUIDELINE',
        fileUrl: '/documents/borehole-guidelines.pdf',
        fileSize: '1.2 MB',
        fileType: 'PDF',
        downloads: 234,
      },
      {
        title: 'Water Resources Map 2024',
        description: 'GIS-based map showing water resources distribution.',
        category: 'MAP',
        fileUrl: '/documents/water-resources-map.pdf',
        fileSize: '8.3 MB',
        fileType: 'PDF',
        downloads: 67,
      },
    ],
  })

  // 10. Create Statistics
  await prisma.statistic.createMany({
    data: [
      {
        title: 'Water Coverage',
        value: '68',
        unit: '%',
        category: 'WATER_COVERAGE',
        icon: 'Droplet',
        order: 1,
        year: 2024,
      },
      {
        title: 'Active Projects',
        value: '42',
        unit: 'projects',
        category: 'PROJECTS',
        icon: 'Briefcase',
        order: 2,
        year: 2024,
      },
      {
        title: 'People Served',
        value: '2.5M',
        unit: 'people',
        category: 'PEOPLE_SERVED',
        icon: 'Users',
        order: 3,
        year: 2024,
      },
      {
        title: 'Budget Utilization',
        value: '87',
        unit: '%',
        category: 'BUDGET',
        icon: 'DollarSign',
        order: 4,
        year: 2024,
      },
    ],
  })

  // 11. Create FAQs
  await prisma.fAQ.createMany({
    data: [
      {
        question: 'How do I apply for a water connection?',
        answer: 'You can apply for a water connection through our Online Services portal. You will need to provide your ID, property title deed, and completed application form.',
        category: 'SERVICES',
        order: 1,
        active: true,
      },
      {
        question: 'What are the requirements for water contractor registration?',
        answer: 'Water contractors must have a valid business license, relevant technical qualifications, insurance certificate, and at least 2 years of experience in the field.',
        category: 'SERVICES',
        order: 2,
        active: true,
      },
      {
        question: 'How can I report a water leak?',
        answer: 'You can report water leaks through our feedback form or by calling our emergency hotline at +252-1-234567.',
        category: 'GENERAL',
        order: 3,
        active: true,
      },
      {
        question: 'Are there job opportunities at the ministry?',
        answer: 'Current job openings are posted on our Careers page. We regularly update this section with new opportunities.',
        category: 'CAREERS',
        order: 4,
        active: true,
      },
    ],
  })

  // 12. Create Hero Slides (only if they don't exist)
  const existingSlides = await prisma.heroSlide.count()
  if (existingSlides === 0) {
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
  }

  // 13. Create Quick Links
  await prisma.quickLink.createMany({
    data: [
      {
        title: 'Government Portal',
        href: 'https://www.gov.so',
        icon: 'Globe',
        order: 1,
        active: true,
      },
      {
        title: 'World Bank Water Projects',
        href: 'https://www.worldbank.org',
        icon: 'ExternalLink',
        order: 2,
        active: true,
      },
      {
        title: 'UNICEF WASH Program',
        href: 'https://www.unicef.org',
        icon: 'Heart',
        order: 3,
        active: true,
      },
    ],
  })

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
