'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function VideoWatchPage() {
    const params = useParams()
    const id = params?.id as string

    if (!id) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <p className="text-white">Video not found.</p>
                <Link href="/#featured-videos-section" className="text-green-400 hover:underline ml-4">
                    Back to videos
                </Link>
            </div>
        )
    }

    const embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1`

    return (
        <div className="min-h-screen bg-black flex flex-col">
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-black/80 border-b border-white/10 sticky top-0 z-10">
                <Link
                    href="/#featured-videos-section"
                    className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Featured Videos
                </Link>
                <span className="text-white/60 text-sm">MOEWR</span>
            </div>

            {/* Full-screen video */}
            <div className="flex-1 w-full flex items-center justify-center p-4">
                <div className="w-full max-w-6xl aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                    <iframe
                        src={embedUrl}
                        title="Video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full"
                    />
                </div>
            </div>
        </div>
    )
}
