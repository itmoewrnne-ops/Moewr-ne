// Test Prisma connection from the app's perspective
const { PrismaClient } = require('@prisma/client');

async function testConnection() {
    console.log('🧪 Testing Prisma Connection...\n');
    
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('');
    
    const prisma = new PrismaClient({
        log: ['error', 'warn', 'info'],
        datasources: {
            db: {
                url: process.env.DATABASE_URL,
            },
        },
    });
    
    try {
        console.log('Connecting to database...');
        await prisma.$connect();
        console.log('✅ Connected');
        
        console.log('\nChecking tables...');
        const tables = await prisma.$queryRaw`
            SELECT name FROM sqlite_master 
            WHERE type='table' AND name NOT LIKE 'sqlite_%'
            ORDER BY name
        `;
        
        console.log(`Found ${tables.length} tables:`);
        tables.forEach(t => console.log(`  - ${t.name}`));
        
        if (tables.length === 0) {
            console.log('\n❌ No tables found! Database is empty.');
            console.log('Running migrations...');
            // This won't work in a script, but we can suggest it
        } else {
            console.log('\n✅ Tables exist!');
            
            // Try to query User table
            try {
                const userCount = await prisma.user.count();
                console.log(`✅ User table accessible, count: ${userCount}`);
            } catch (e) {
                console.log(`❌ Cannot access User table: ${e.message}`);
            }
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('Code:', error.code);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();

