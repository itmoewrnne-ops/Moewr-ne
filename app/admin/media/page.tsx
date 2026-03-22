'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2, Edit, Image as ImageIcon, Video, Upload } from 'lucide-react'
import Link from 'next/link'

type MediaItem = {
    id: number
    title: string
    type: 'image' | 'video'
    category: string
    url: string
    uploadDate: string
    size: string
    leadershipPosition?: string // For leadership photos
    leadershipName?: string
}

export default function AdminMediaPage() {
    const [media, setMedia] = useState<MediaItem[]>([
        {
            id: 1,
            title: 'Minister Photo',
            type: 'image',
            category: 'Leadership',
            url: 'https://ui-avatars.com/api/?name=Ahmed+Mohamed&size=400&background=1e40af&color=fff',
            uploadDate: '2024-01-15',
            size: '245 KB',
            leadershipPosition: 'Minister',
            leadershipName: 'Hon. Ahmed Mohamed',
        },
        {
            id: 2,
            title: 'Deputy Minister Photo',
            type: 'image',
            category: 'Leadership',
            url: 'https://ui-avatars.com/api/?name=Fatima+Hassan&size=400&background=059669&color=fff',
            uploadDate: '2024-01-15',
            size: '198 KB',
            leadershipPosition: 'Deputy Minister',
            leadershipName: 'Dr. Fatima Hassan',
        },
        {
            id: 3,
            title: 'Permanent Secretary Photo',
            type: 'image',
            category: 'Leadership',
            url: 'https://ui-avatars.com/api/?name=Omar+Ali&size=400&background=dc2626&color=fff',
            uploadDate: '2024-01-15',
            size: '212 KB',
            leadershipPosition: 'Permanent Secretary',
            leadershipName: 'Eng. Omar Ali',
        },
    ])

    const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all')
    const [categoryFilter, setCategoryFilter] = useState<string>('all')

    const filteredMedia = media.filter(item => {
        const typeMatch = filter === 'all' || item.type === filter
        const categoryMatch = categoryFilter === 'all' || item.category === categoryFilter
        return typeMatch && categoryMatch
    })

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this media item?')) {
            setMedia(media.filter(m => m.id !== id))

            // Update leadership data if it's a leadership photo
            const deletedItem = media.find(m => m.id === id)
            if (deletedItem?.category === 'Leadership') {
                updateLeadershipData()
            }
        }
    }

    const updateLeadershipData = () => {
        // This function would update the leadership-data.ts file
        // For now, we'll just log it
        console.log('Leadership data should be updated')
        alert('Leadership photo updated! The changes will appear on the frontend Leadership page.')
    }

    const categories = ['Leadership', 'Projects', 'Events', 'Infrastructure', 'Other']

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Media Gallery</h1>
                    <p className="text-gray-600 mt-2">Manage photos, videos, and other media files</p>
                </div>
                <Link href="/admin/media/upload">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Upload Media
                    </Button>
                </Link>
            </div>

            {/* Info Alert for Leadership Photos */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-blue-700">
                            <strong>Tip:</strong> Photos uploaded with &quot;Leadership&quot; category will automatically appear on the public Leadership page.
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center bg-white p-4 rounded-lg shadow">
                <div className="flex gap-2">
                    <Button
                        variant={filter === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('all')}
                    >
                        All
                    </Button>
                    <Button
                        variant={filter === 'image' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('image')}
                    >
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Images
                    </Button>
                    <Button
                        variant={filter === 'video' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('video')}
                    >
                        <Video className="mr-2 h-4 w-4" />
                        Videos
                    </Button>
                </div>

                <div className="flex-1" />

                <select
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMedia.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-square bg-gray-200 relative">
                            {item.type === 'image' ? (
                                <img
                                    src={item.url}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                    <Video className="h-16 w-16 text-white" />
                                </div>
                            )}
                            <div className="absolute top-2 right-2">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${item.type === 'image' ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white'
                                    }`}>
                                    {item.type}
                                </span>
                            </div>
                            {item.category === 'Leadership' && (
                                <div className="absolute top-2 left-2">
                                    <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-500 text-white">
                                        Leadership
                                    </span>
                                </div>
                            )}
                        </div>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm">{item.title}</CardTitle>
                            <p className="text-xs text-gray-500">{item.category}</p>
                            {item.leadershipName && (
                                <p className="text-xs text-blue-600 font-medium">{item.leadershipName}</p>
                            )}
                            {item.leadershipPosition && (
                                <p className="text-xs text-gray-500">{item.leadershipPosition}</p>
                            )}
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-xs text-gray-500 mb-3">
                                <p>{new Date(item.uploadDate).toLocaleDateString()}</p>
                                <p>{item.size}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => window.open(item.url, '_blank')}
                                >
                                    View
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredMedia.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg">
                    <ImageIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">No media files found</p>
                </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-600">Total Files</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{media.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-600">Images</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">
                        {media.filter(m => m.type === 'image').length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-600">Videos</h3>
                    <p className="text-3xl font-bold text-purple-600 mt-2">
                        {media.filter(m => m.type === 'video').length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-600">Leadership Photos</h3>
                    <p className="text-3xl font-bold text-yellow-600 mt-2">
                        {media.filter(m => m.category === 'Leadership').length}
                    </p>
                </div>
            </div>
        </div>
    )
}
