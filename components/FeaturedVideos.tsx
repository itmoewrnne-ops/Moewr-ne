'use client'

import { useState, useEffect } from 'react'
import { Play, X, Maximize2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

interface Video {
    id: string
    title: string
    youtubeId: string
    thumbnail?: string | null
}

export function FeaturedVideos() {
    const [videos, setVideos] = useState<Video[]>([])
    const [loading, setLoading] = useState(true)
    const [playingId, setPlayingId] = useState<string | null>(null)

    useEffect(() => {
        fetchVideos()
        // Refresh every 2 minutes - videos rarely change, no need for 5s polling
        const interval = setInterval(fetchVideos, 120000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const scrollToSection = () => {
            if (window.location.hash === '#featured-videos-section') {
                setTimeout(() => {
                    const el = document.getElementById('featured-videos-section')
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }, 300)
            }
        }
        scrollToSection()
        window.addEventListener('hashchange', scrollToSection)
        return () => window.removeEventListener('hashchange', scrollToSection)
    }, [])

    const fetchVideos = async () => {
        try {
            const res = await fetch('/api/featured-videos', { headers: { 'Content-Type': 'application/json' } })
            if (res.ok) {
                const data = await res.json()
                setVideos(Array.isArray(data) ? data : [])
            }
        } catch {
            /* ignore */
        } finally {
            setLoading(false)
        }
    }

    const getThumbnailUrl = (youtubeId: string) =>
        `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`

    const togglePlay = (video: Video, e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setPlayingId((prev) => (prev === video.id ? null : video.id))
    }

    return (
        <section
            className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white"
            id="featured-videos-section"
            style={{ display: 'block' }}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                        Featured Videos
                    </h2>
                    <div className="w-16 h-1 bg-green-600 rounded-full mx-auto mb-3" />
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Watch our latest videos and updates from the Ministry
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-16">
                        <p className="text-gray-500">Loading videos...</p>
                    </div>
                ) : videos.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-600 text-lg mb-4">No featured videos at the moment.</p>
                        <p className="text-gray-400 text-sm mb-6">Check back soon.</p>
                        <a
                            href="/admin/featured-videos"
                            className="inline-block px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Add Videos (Admin)
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {videos.map((video) => {
                            const isPlaying = playingId === video.id
                            const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`

                            return (
                                <Card
                                    key={video.id}
                                    className="group overflow-hidden bg-white border border-gray-200 hover:border-green-200 hover:shadow-xl transition-all duration-300 rounded-2xl"
                                >
                                    {/* Video area – thumbnail or inline player */}
                                    <div className="relative aspect-video bg-gray-900 overflow-hidden">
                                        {isPlaying ? (
                                            <>
                                                <iframe
                                                    src={embedUrl}
                                                    title={video.title}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen
                                                    className="absolute inset-0 w-full h-full"
                                                />
                                                <button
                                                    onClick={(e) => togglePlay(video, e)}
                                                    className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors z-10"
                                                    aria-label="Stop video"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <img
                                                    src={getThumbnailUrl(video.youtubeId)}
                                                    alt={video.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    onError={(e) => {
                                                        const t = e.target as HTMLImageElement
                                                        t.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
                                                    }}
                                                />
                                                <div
                                                    className="absolute inset-0 bg-black/20 group-hover:bg-black/30 flex items-center justify-center cursor-pointer transition-colors"
                                                    onClick={(e) => togglePlay(video, e)}
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label={`Play ${video.title}`}
                                                    onKeyDown={(e) => {
                                                        if ((e.key === 'Enter' || e.key === ' ') && !isPlaying) {
                                                            e.preventDefault()
                                                            setPlayingId(video.id)
                                                        }
                                                    }}
                                                >
                                                    <div className="bg-green-600 hover:bg-green-500 rounded-full p-5 group-hover:scale-110 transition-all shadow-xl">
                                                        <Play className="h-10 w-10 text-white fill-white ml-1" />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Title + Watch full screen */}
                                    <div className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <h3 className="text-lg md:text-xl font-bold text-gray-900 line-clamp-2 flex-1">
                                            {video.title}
                                        </h3>
                                        <Link
                                            href={`/videos/${video.youtubeId}`}
                                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-green-600 hover:text-white text-gray-700 font-semibold rounded-xl transition-colors shrink-0"
                                        >
                                            <Maximize2 className="w-5 h-5" />
                                            Watch full screen
                                        </Link>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    )
}
