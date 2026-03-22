const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function resetAdmin() {
    try {
        console.log('Resetting admin user...')

        // Delete existing admin user
        await prisma.user.deleteMany({
            where: {
                OR: [
                    { email: 'admin@mow.gov.so' },
                    { role: 'ADMIN' }
                ]
            }
        })
        console.log('✅ Deleted existing admin users')

        // Hash the password
        const hashedPassword = await bcrypt.hash('admin123', 10)
        console.log('✅ Password hashed')

        // Create new admin user
        const admin = await prisma.user.create({
            data: {
                name: 'System Administrator',
                email: 'admin@mow.gov.so',
                password: hashedPassword,
                role: 'ADMIN'
            }
        })

        console.log('✅ Admin user created successfully!')
        console.log('📧 Email: admin@mow.gov.so')
        console.log('🔑 Password: admin123')
        console.log('👤 Role:', admin.role)
        console.log('🆔 ID:', admin.id)

        // Verify the password works
        const testPassword = await bcrypt.compare('admin123', admin.password)
        console.log('✅ Password verification:', testPassword ? 'SUCCESS' : 'FAILED')

    } catch (error) {
        console.error('Error resetting admin:', error)
    } finally {
        await prisma.$disconnect()
    }
}

resetAdmin()
