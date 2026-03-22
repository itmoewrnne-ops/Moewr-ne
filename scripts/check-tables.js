// Check if database tables exist
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkTables() {
    try {
        // Try to query the _prisma_migrations table
        const result = await prisma.$queryRaw`SELECT name FROM sqlite_master WHERE type='table' ORDER BY name`;
        console.log('📋 Tables in database:');
        console.log(JSON.stringify(result, null, 2));
        
        // Try to count users
        try {
            const userCount = await prisma.user.count();
            console.log('\n✅ User table exists, count:', userCount);
        } catch (e) {
            console.log('\n❌ User table does NOT exist');
            console.log('Error:', e.message);
        }
        
    } catch (error) {
        console.error('❌ Error checking database:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

checkTables();

