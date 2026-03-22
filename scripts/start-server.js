// Start Next.js standalone server with proper port configuration
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Get port from environment variable (Railway provides this)
const PORT = process.env.PORT || 3000;

console.log(`🚀 Starting Next.js server on port ${PORT}...`);
console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`📁 Working directory: ${process.cwd()}`);

// Verify standalone server exists
const serverPath = path.join(process.cwd(), '.next', 'standalone', 'server.js');
if (!fs.existsSync(serverPath)) {
    console.error(`❌ Standalone server not found at: ${serverPath}`);
    console.error('❌ Make sure you run "npm run build" first!');
    process.exit(1);
}

console.log(`✅ Found standalone server at: ${serverPath}`);

// Ensure public folder exists (needed for static assets)
const publicPath = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicPath)) {
    console.warn(`⚠️  Public folder not found at: ${publicPath}`);
    console.warn('⚠️  Creating public folder...');
    fs.mkdirSync(publicPath, { recursive: true });
}

// Start the standalone server
console.log(`🌐 Starting server with PORT=${PORT}...`);

const server = spawn('node', [serverPath], {
    stdio: 'inherit',
    env: {
        ...process.env,
        PORT: PORT.toString(),
        NODE_ENV: process.env.NODE_ENV || 'production',
    },
    cwd: process.cwd(),
});

server.on('error', (error) => {
    console.error('❌ Failed to start server:', error);
    console.error('❌ Error details:', error.message);
    process.exit(1);
});

server.on('exit', (code, signal) => {
    if (code !== 0 && code !== null) {
        console.error(`❌ Server exited with code ${code}${signal ? ` (signal: ${signal})` : ''}`);
        process.exit(code || 1);
    } else if (signal) {
        console.log(`📴 Server terminated by signal: ${signal}`);
    }
});

// Handle termination signals
process.on('SIGTERM', () => {
    console.log('📴 Received SIGTERM, shutting down gracefully...');
    if (server && !server.killed) {
        server.kill('SIGTERM');
    }
    setTimeout(() => {
        process.exit(0);
    }, 5000);
});

process.on('SIGINT', () => {
    console.log('📴 Received SIGINT, shutting down gracefully...');
    if (server && !server.killed) {
        server.kill('SIGINT');
    }
    setTimeout(() => {
        process.exit(0);
    }, 5000);
});

// Keep process alive
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught exception:', error);
    if (server && !server.killed) {
        server.kill();
    }
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled rejection at:', promise, 'reason:', reason);
    if (server && !server.killed) {
        server.kill();
    }
    process.exit(1);
});

