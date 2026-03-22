// Initialize database - run this at startup
const { PrismaClient } = require('@prisma/client');
const { execSync } = require('child_process');

async function initDatabase() {
    // Force output to be visible
    process.stdout.write('🔧 Initializing Database...\n\n');
    process.stdout.write(`DATABASE_URL from environment: ${process.env.DATABASE_URL || 'NOT SET'}\n`);
    
    const dbPath = process.env.DATABASE_URL?.replace('file:', '');
    process.stdout.write(`Database path: ${dbPath || 'NOT SET'}\n`);
    
    // Verify we're using Railway's DATABASE_URL, not local .env
    if (!process.env.DATABASE_URL) {
        console.error('❌ ERROR: DATABASE_URL is not set!');
        console.error('Make sure Railway has DATABASE_URL environment variable set.');
        process.exit(1);
    }
    
    if (dbPath?.includes('./prisma/dev.db')) {
        console.error('❌ ERROR: Using local database path!');
        console.error('DATABASE_URL should be: file:/app/public/uploads/data/dev.db');
        console.error('Current DATABASE_URL:', process.env.DATABASE_URL);
        process.exit(1);
    }
    
    try {
        // Run migrations (they may already be applied, that's OK)
        process.stdout.write('Running migrations...\n');
        try {
            execSync('npx prisma migrate deploy', { 
                stdio: 'inherit',
                env: { ...process.env }
            });
            process.stdout.write('✅ Migrations completed\n');
        } catch (migrateError) {
            // Migrations might already be applied, continue anyway
            process.stdout.write('⚠️  Migrations may already be applied, continuing...\n');
        }
        
        // Check if database has tables
        const prisma = new PrismaClient({
            datasources: {
                db: {
                    url: process.env.DATABASE_URL,
                },
            },
        });
        await prisma.$connect();
        
        const tables = await prisma.$queryRaw`
            SELECT name FROM sqlite_master 
            WHERE type='table' AND name NOT LIKE 'sqlite_%'
        `;
        
        console.log(`✅ Database has ${tables.length} tables`);
        
        // ALWAYS check and ensure admin user exists
        process.stdout.write('Checking for admin user...\n');
        let userCount = 0;
        let adminUser = null;
        
        try {
            userCount = await prisma.user.count();
            process.stdout.write(`📊 User count: ${userCount}\n`);
            
            adminUser = await prisma.user.findUnique({
                where: { email: 'admin@mow.gov' }
            });
            
            if (adminUser) {
                process.stdout.write(`✅ Admin user found: ${adminUser.email}\n`);
            } else {
                process.stdout.write(`⚠️  Admin user NOT found\n`);
            }
        } catch (error) {
            process.stdout.write(`❌ Error checking users: ${error.message}\n`);
            process.stdout.write('⚠️  User table might not exist, running seed anyway...\n');
        }
        
        // ALWAYS run seed if admin user doesn't exist
        if (!adminUser) {
            process.stdout.write('⚠️  Admin user missing, running seed...\n');
            try {
                process.stdout.write('Executing: npx prisma db seed\n');
                execSync('npx prisma db seed', { 
                    stdio: 'inherit',
                    env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL },
                    cwd: process.cwd()
                });
                process.stdout.write('✅ Seed command completed\n');
                
                // Verify admin user was created
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait a bit
                const verifiedAdmin = await prisma.user.findUnique({
                    where: { email: 'admin@mow.gov' }
                });
                if (verifiedAdmin) {
                    process.stdout.write(`✅ Admin user verified: ${verifiedAdmin.email}\n`);
                    process.stdout.write(`✅ Admin user role: ${verifiedAdmin.role}\n`);
                } else {
                    process.stdout.write('❌ CRITICAL: Admin user still not found after seed!\n');
                    process.stdout.write('❌ This will prevent login. Check seed script for errors.\n');
                }
                
                // Verify user count
                const newUserCount = await prisma.user.count();
                process.stdout.write(`📊 Total users after seed: ${newUserCount}\n`);
            } catch (seedError) {
                process.stdout.write(`❌ Seed failed: ${seedError.message}\n`);
                if (seedError.stdout) process.stdout.write(`Seed stdout: ${seedError.stdout}\n`);
                if (seedError.stderr) process.stdout.write(`Seed stderr: ${seedError.stderr}\n`);
                process.stdout.write('❌ CRITICAL: Seed failure will prevent admin login!\n');
                // Don't exit - let the app start anyway, but log the error
            }
        } else {
            process.stdout.write('✅ Admin user already exists, skipping seed\n');
        }
        
        await prisma.$disconnect();
        console.log('✅ Database initialized successfully\n');
        
    } catch (error) {
        console.error('❌ Error initializing database:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    initDatabase();
}

module.exports = { initDatabase };

