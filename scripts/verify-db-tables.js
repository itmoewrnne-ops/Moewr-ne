// Verify database has tables using raw SQL
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verifyTables() {
    console.log('🔍 Verifying Database Tables...\n');
    
    try {
        // Use raw SQL to check tables
        const tables = await prisma.$queryRaw`
            SELECT name FROM sqlite_master 
            WHERE type='table' AND name NOT LIKE 'sqlite_%'
            ORDER BY name
        `;
        
        console.log(`✅ Found ${tables.length} tables:`);
        tables.forEach(t => console.log(`   - ${t.name}`));
        
        // Check if User table exists and has data
        const userCount = await prisma.$queryRaw`SELECT COUNT(*) as count FROM User`;
        console.log(`\n✅ User table count: ${userCount[0].count}`);
        
        // Try to query a user
        const users = await prisma.$queryRaw`SELECT email, role FROM User LIMIT 1`;
        if (users.length > 0) {
            console.log(`✅ Sample user: ${users[0].email} (${users[0].role})`);
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('Code:', error.code);
    } finally {
        await prisma.$disconnect();
    }
}

verifyTables();

