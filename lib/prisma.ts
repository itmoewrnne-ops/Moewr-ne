import { PrismaClient } from '@prisma/client'
import { dirname } from 'path'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Ensure database directory exists (server-only, use require to avoid client bundling)
if (typeof process !== 'undefined' && process.env.DATABASE_URL && typeof window === 'undefined') {
    try {
        const fs = require('fs')
        const dbPath = process.env.DATABASE_URL.replace('file:', '')
        const dbDir = dirname(dbPath)
        fs.mkdirSync(dbDir, { recursive: true })
        
        if (process.env.NODE_ENV === 'production') {
            console.log('[Prisma] Database path:', dbPath)
            console.log('[Prisma] Database file exists:', fs.existsSync(dbPath))
            if (fs.existsSync(dbPath)) {
                const stats = fs.statSync(dbPath)
                console.log('[Prisma] Database file size:', stats.size, 'bytes')
            }
        }
    } catch (error) {
        console.error('[Prisma] Error ensuring database directory:', error)
    }
}

// Create Prisma client with explicit DATABASE_URL
// IMPORTANT: Always use DATABASE_URL from environment, never hardcoded paths
const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set!')
}

// Log the database URL being used (for debugging)
if (process.env.NODE_ENV === 'production') {
    console.log('[Prisma] Using DATABASE_URL:', databaseUrl.replace(/file:/, ''))
}

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
        datasources: {
            db: {
                url: databaseUrl,
            },
        },
    })

// Force connection and verify database at startup in production
if (process.env.NODE_ENV === 'production' && !globalForPrisma.prisma) {
    // Use setImmediate to ensure this runs after module load
    setImmediate(async () => {
        try {
            await prisma.$connect()
            console.log('[Prisma] Connected to database successfully')
            // Verify tables exist
            const tables = await prisma.$queryRaw<Array<{ name: string }>>`SELECT name FROM sqlite_master WHERE type='table' LIMIT 1`
            const hasTables = Array.isArray(tables) && tables.length > 0
            console.log('[Prisma] Database has tables:', hasTables)
            if (hasTables) {
                const tableNames = await prisma.$queryRaw<Array<{ name: string }>>`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'`
                console.log('[Prisma] Table count:', Array.isArray(tableNames) ? tableNames.length : 0)
            } else {
                console.error('[Prisma] WARNING: Database file exists but has no tables!')
                console.error('[Prisma] This means migrations did not run on this database file.')
            }
        } catch (error: any) {
            console.error('[Prisma] Failed to connect or verify:', error.message)
            console.error('[Prisma] Error code:', error.code)
        }
    })
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
