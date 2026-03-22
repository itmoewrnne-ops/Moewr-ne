// Check if users exist in the database
const { PrismaClient } = require('@prisma/client');

async function checkUsers() {
    console.log('🔍 Checking database for users...\n');
    
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        console.error('❌ DATABASE_URL environment variable is not set!');
        process.exit(1);
    }
    
    console.log('Using DATABASE_URL:', databaseUrl.replace(/file:/, ''));
    
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: databaseUrl,
            },
        },
    });
    
    try {
        await prisma.$connect();
        console.log('✅ Connected to database\n');
        
        // Check user count
        const userCount = await prisma.user.count();
        console.log(`📊 Total users: ${userCount}\n`);
        
        if (userCount === 0) {
            console.log('❌ No users found in database!');
            console.log('💡 Run: npx prisma db seed');
        } else {
            // List all users
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    createdAt: true,
                },
            });
            
            console.log('👥 Users in database:');
            console.log('─'.repeat(80));
            users.forEach((user, index) => {
                console.log(`${index + 1}. Email: ${user.email}`);
                console.log(`   Name: ${user.name || 'N/A'}`);
                console.log(`   Role: ${user.role}`);
                console.log(`   Created: ${user.createdAt.toISOString()}`);
                console.log('');
            });
            
            // Check for admin user specifically
            const adminUser = await prisma.user.findUnique({
                where: { email: 'admin@mow.gov' },
            });
            
            if (adminUser) {
                console.log('✅ Admin user found:');
                console.log(`   Email: ${adminUser.email}`);
                console.log(`   Name: ${adminUser.name}`);
                console.log(`   Role: ${adminUser.role}`);
                console.log(`   Password hash: ${adminUser.password.substring(0, 20)}...`);
            } else {
                console.log('❌ Admin user (admin@mow.gov) NOT found!');
            }
        }
        
        await prisma.$disconnect();
        console.log('\n✅ Check completed');
        
    } catch (error) {
        console.error('❌ Error checking database:', error.message);
        console.error('Error details:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    checkUsers();
}

module.exports = { checkUsers };

