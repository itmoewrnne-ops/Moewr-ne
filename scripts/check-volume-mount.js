// Check volume mount location
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Volume Mount...\n');

// Check common volume mount locations
const possiblePaths = [
    '/app/public/uploads',
    '/app/public/uploads/data',
    '/var/lib/containers/railwayapp/bind-mounts',
    process.env.DATABASE_URL?.replace('file:', ''),
];

console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('');

possiblePaths.forEach(p => {
    if (p) {
        try {
            const exists = fs.existsSync(p);
            const isDir = exists ? fs.statSync(p).isDirectory() : false;
            console.log(`Path: ${p}`);
            console.log(`  Exists: ${exists}`);
            console.log(`  Is Directory: ${isDir}`);
            if (exists && isDir) {
                try {
                    const files = fs.readdirSync(p);
                    console.log(`  Files: ${files.length} items`);
                    if (files.length > 0 && files.length < 10) {
                        console.log(`  Contents: ${files.join(', ')}`);
                    }
                } catch (e) {
                    console.log(`  Error reading: ${e.message}`);
                }
            }
            console.log('');
        } catch (e) {
            console.log(`Path: ${p} - Error: ${e.message}\n`);
        }
    }
});

// Check if database file exists at expected location
const dbPath = process.env.DATABASE_URL?.replace('file:', '');
if (dbPath) {
    console.log('Database file check:');
    console.log('  Path:', dbPath);
    console.log('  Exists:', fs.existsSync(dbPath));
    if (fs.existsSync(dbPath)) {
        const stats = fs.statSync(dbPath);
        console.log('  Size:', stats.size, 'bytes');
        console.log('  Modified:', stats.mtime);
    }
}

