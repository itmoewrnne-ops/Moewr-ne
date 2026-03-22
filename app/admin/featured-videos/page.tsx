'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, Edit, Save, X, Video, ArrowUp, ArrowDown } from 'lucide-react'

interface FeaturedVideo {
    id: string
    title: string
    youtubeId: string
    thumbnail: string | null
    order: number
    active: boolean
}

export default function AdminFeaturedVideosPage() {
    const [videos, setVideos] = useState<FeaturedVideo[]>([])
    const [isAdding, setIsAdding] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        youtubeId: '',
        order: 0,
    })

    useEffect(() => {
        fetchVideos()
    }, [])

    const fetchVideos = async () => {
        try {
            const response = await fetch('/api/featured-videos')
            if (response.ok) {
                const data = await response.json()
                setVideos(data)
            }
        } catch (error) {
            console.error('Error fetching videos:', error)
        }
    }

    const extractYouTubeId = (url: string): string => {
        // Extract YouTube ID from various URL formats
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
            /^([a-zA-Z0-9_-]{11})$/ // Direct ID
        ]
        
        for (const pattern of patterns) {
            const match = url.match(pattern)
            if (match) return match[1]
        }
        return url
    }

    const handleAdd = async () => {
        if (!formData.title || !formData.youtubeId) {
            alert('Please fill in Title and YouTube ID/URL')
            return
        }

        const youtubeId = extractYouTubeId(formData.youtubeId)

        try {
            const response = await fetch('/api/featured-videos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    youtubeId,
                    order: videos.length + 1,
                }),
            })

            if (response.ok) {
                fetchVideos()
                setFormData({ title: '', youtubeId: '', order: 0 })
                setIsAdding(false)
                alert('✅ Video added successfully!')
            } else {
                const error = await response.json()
                const errorMessage = error.details ? `${error.error}\n\nDetails: ${error.details}` : error.error || 'Failed to add video'
                alert(errorMessage)
                console.error('API Error:', error)
            }
        } catch (error) {
            console.error('Error adding video:', error)
            alert(`Failed to add video: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
    }

    const handleUpdate = async () => {
        if (!editingId) return

        const youtubeId = extractYouTubeId(formData.youtubeId)

        try {
            const response = await fetch(`/api/featured-videos/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    youtubeId,
                }),
            })

            if (response.ok) {
                fetchVideos()
                setEditingId(null)
                setFormData({ title: '', youtubeId: '', order: 0 })
                alert('✅ Video updated successfully!')
            } else {
                const error = await response.json()
                alert(error.error || 'Failed to update video')
            }
        } catch (error) {
            console.error('Error updating video:', error)
            alert('Failed to update video')
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this video?')) {
            try {
                const response = await fetch(`/api/featured-videos/${id}`, {
                    method: 'DELETE',
                })

                if (response.ok) {
                    fetchVideos()
                    alert('✅ Video deleted successfully!')
                }
            } catch (error) {
                console.error('Error deleting video:', error)
                alert('Failed to delete video')
            }
        }
    }

    const handleEdit = (video: FeaturedVideo) => {
        setEditingId(video.id)
        setFormData({
            title: video.title,
            youtubeId: video.youtubeId,
            order: video.order,
        })
        setIsAdding(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleCancel = () => {
        setIsAdding(false)
        setEditingId(null)
        setFormData({ title: '', youtubeId: '', order: 0 })
    }

    const getThumbnailUrl = (youtubeId: string) => {
        return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    }

    return (
        <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Featured Videos Management</h1>
                    <p className="text-gray-600 mt-2">Manage featured videos displayed on the homepage</p>
                </div>
                {!isAdding && !editingId && (
                    <Button onClick={() => setIsAdding(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" /> Add New Video
                    </Button>
                )}
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
                <Card className="border-t-4 border-t-blue-600 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl">{editingId ? 'Edit Video' : 'Add New Video'}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="title">Video Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., Wasiirka wasaaradda Tamarta iyo Macdanta JSL oo shaaciyey..."
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="youtubeId">YouTube ID or URL *</Label>
                                <Input
                                    id="youtubeId"
                                    placeholder="e.g., dQw4w9WgXcQ or https://youtube.com/watch?v=..."
                                    value={formData.youtubeId}
                                    onChange={(e) => setFormData({ ...formData, youtubeId: e.target.value })}
                                    className="bg-gray-50"
                                />
                                <p className="text-xs text-gray-500">
                                    Enter YouTube video ID or full URL. The ID will be extracted automatically.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="order">Display Order</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                    className="bg-gray-50"
                                />
                            </div>

                            {formData.youtubeId && (
                                <div className="md:col-span-2">
                                    <Label>Preview</Label>
                                    <div className="mt-2 w-full max-w-md aspect-video bg-gray-200 rounded overflow-hidden border-2 border-gray-300">
                                        <img
                                            src={getThumbnailUrl(extractYouTubeId(formData.youtubeId))}
                                            alt="Video preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement
                                                target.src = `https://img.youtube.com/vi/${extractYouTubeId(formData.youtubeId)}/hqdefault.jpg`
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 pt-4 border-t">
                            <Button onClick={editingId ? handleUpdate : handleAdd} className="bg-blue-600 hover:bg-blue-700">
                                <Save className="mr-2 h-4 w-4" />
                                {editingId ? 'Update Video' : 'Save Video'}
                            </Button>
                            <Button variant="outline" onClick={handleCancel}>
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Videos List */}
            <div className="grid grid-cols-1 gap-6">
                {videos.map((video) => (
                    <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="flex flex-col md:flex-row">
                            {/* Video Thumbnail Preview */}
                            <div className="md:w-1/3 bg-gray-200 relative aspect-video md:aspect-auto">
                                <img
                                    src={getThumbnailUrl(video.youtubeId)}
                                    alt={video.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement
                                        target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
                                    }}
                                />
                                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                                    Order: {video.order}
                                </div>
                                {!video.active && (
                                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                                        Inactive
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h3>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                                    <div>
                                        <span className="font-semibold">YouTube ID:</span> {video.youtubeId}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Status:</span>{' '}
                                        <span className={video.active ? 'text-green-600' : 'text-red-600'}>
                                            {video.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(video)}
                                        className="hover:bg-blue-50 hover:text-blue-600"
                                    >
                                        <Edit className="mr-2 h-4 w-4" /> Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(video.id)}
                                        className="hover:bg-red-50 hover:text-red-600"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank')}
                                        className="hover:bg-red-50 hover:text-red-600"
                                    >
                                        <Video className="h-4 w-4" /> View
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {videos.length === 0 && !isAdding && (
                <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Video className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No Videos Yet</h3>
                    <p className="text-gray-500 mt-1 mb-6">Get started by adding your first featured video.</p>
                    <Button onClick={() => setIsAdding(true)}>
                        Add Featured Video
                    </Button>
                </div>
            )}
        </div>
    )
}
