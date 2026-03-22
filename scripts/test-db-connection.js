// Test database connection
const { PrismaClient } = require('@prisma/client');

async function testConnection() {
    console.log('🔍 Testing Database Connection...\n');
    
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set (' + process.env.JWT_SECRET.length + ' chars)' : 'Not set');
    console.log('NODE_ENV:', process.env.NODE_ENV || 'Not set');
    console.log('');
    
    const prisma = new PrismaClient({
        log: ['error', 'warn', 'info'],
    });
    
    try {
        // Test connection
        await prisma.$connect();
        console.log('✅ Prisma client connected');
        
        // Test query
        const userCount = await prisma.user.count();
        console.log('✅ User count:', userCount);
        
        // Test admin user
        const admin = await prisma.user.findUnique({
            where: { email: 'admin@mow.gov' }
        });
        
        if (admin) {
            console.log('✅ Admin user found:');
            console.log('   Email:', admin.email);
            console.log('   Role:', admin.role);
            console.log('   Password hash length:', admin.password.length);
        } else {
            console.log('❌ Admin user not found');
        }
        
    } catch (error) {
        console.error('❌ Database connection error:');
        console.error('   Message:', error.message);
        console.error('   Code:', error.code);
        if (error.meta) {
            console.error('   Meta:', JSON.stringify(error.meta, null, 2));
        }
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();

