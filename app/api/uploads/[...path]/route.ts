import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

export const dynamic = 'force-dynamic'

export async function GET(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    try {
        // Reconstruct the file path from the route params
        const filePath = params.path.join('/')
        
        // Security: Prevent directory traversal
        if (filePath.includes('..') || filePath.startsWith('/')) {
            return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
        }

        // Construct full file path
        const fullPath = path.join(process.cwd(), 'public', 'uploads', filePath)

        // Check if file exists
        if (!existsSync(fullPath)) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 })
        }

        // Read file
        const fileBuffer = await readFile(fullPath)
        
        // Determine content type based on file extension
        const ext = path.extname(fullPath).toLowerCase()
        const contentTypeMap: Record<string, string> = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.webp': 'image/webp',
            '.gif': 'image/gif',
        }
        const contentType = contentTypeMap[ext] || 'application/octet-stream'

        // Return file with appropriate headers
        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        })
    } catch (error) {
        console.error('Error serving file:', error)
        return NextResponse.json({ error: 'Failed to serve file' }, { status: 500 })
    }
}

