import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        if (!validTypes.includes(file.type)) {
            return NextResponse.json({ error: 'Invalid file type. Only JPG, PNG, and WebP are allowed.' }, { status: 400 })
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: 'File too large. Maximum size is 5MB.' }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Create unique filename
        const timestamp = Date.now()
        const originalName = file.name.replace(/\s+/g, '-')
        const filename = `${timestamp}-${originalName}`

        // Always save to public/uploads (Next.js serves files from public/)
        // For persistence on Railway, mount a volume to public/uploads
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'ministers')
        
        // Ensure upload directory exists
        await mkdir(uploadDir, { recursive: true })

        // Save file
        const filepath = path.join(uploadDir, filename)
        await writeFile(filepath, buffer)

        // Return the public URL
        // Use API route for serving files (works with standalone mode)
        const publicUrl = `/api/uploads/ministers/${filename}`

        return NextResponse.json({
            success: true,
            url: publicUrl,
            filename,
            message: 'File uploaded successfully'
        })
    } catch (error: any) {
        console.error('Upload error:', error)
        return NextResponse.json({ 
            error: 'Upload failed', 
            details: error.message || 'Unknown error',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 })
    }
}

