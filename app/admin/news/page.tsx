'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2, Edit, Save, X, Newspaper, Image as ImageIcon } from 'lucide-react'

interface NewsItem {
    id: string
    title: string
    content: string
    category: string
    image: string | null
    images: string | null
    date: string
    published: boolean
}

export default function AdminNewsPage() {
    const [news, setNews] = useState<NewsItem[]>([])
    const [isAdding, setIsAdding] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'NEWS',
        image: '',
        images: [] as string[],
        date: new Date().toISOString().split('T')[0],
        published: true,
    })

    useEffect(() => {
        fetchNews()
    }, [])

    const fetchNews = async () => {
        try {
            const response = await fetch('/api/news')
            if (response.ok) {
                const data = await response.json()
                setNews(data)
            }
        } catch (error) {
            console.error('Error fetching news:', error)
        }
    }

    const handleAdd = async () => {
        if (!formData.title || !formData.content) {
            alert('Please fill in Title and Content')
            return
        }

        try {
            const payload = {
                ...formData,
                images: JSON.stringify(formData.images)
            }
            const response = await fetch('/api/news', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (response.ok) {
                fetchNews()
                resetForm()
                setIsAdding(false)
                alert('✅ News added successfully!')
            }
        } catch (error) {
            console.error('Error adding news:', error)
            alert('Failed to add news')
        }
    }

    const handleUpdate = async () => {
        if (!editingId) return

        try {
            const payload = {
                ...formData,
                images: JSON.stringify(formData.images)
            }
            const response = await fetch(`/api/news/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (response.ok) {
                fetchNews()
                setEditingId(null)
                resetForm()
                alert('✅ News updated successfully!')
            }
        } catch (error) {
            console.error('Error updating news:', error)
            alert('Failed to update news')
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this news item?')) {
            try {
                const response = await fetch(`/api/news/${id}`, {
                    method: 'DELETE',
                })

                if (response.ok) {
                    fetchNews()
                    alert('✅ News deleted successfully!')
                }
            } catch (error) {
                console.error('Error deleting news:', error)
                alert('Failed to delete news')
            }
        }
    }

    const handleEdit = (item: NewsItem) => {
        setEditingId(item.id)
        let images: string[] = []
        try {
            if (item.images) {
                images = JSON.parse(item.images)
            }
        } catch (e) {
            console.error('Error parsing images:', e)
            images = []
        }
        setFormData({
            title: item.title,
            content: item.content,
            category: item.category,
            image: item.image || '',
            images: images,
            date: new Date(item.date).toISOString().split('T')[0],
            published: item.published,
        })
        setIsAdding(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleCancel = () => {
        setIsAdding(false)
        setEditingId(null)
        resetForm()
    }

    const resetForm = () => {
        setFormData({
            title: '',
            content: '',
            category: 'NEWS',
            image: '',
            images: [],
            date: new Date().toISOString().split('T')[0],
            published: true,
        })
    }

    const additionalImagesInputRef = useRef<HTMLInputElement>(null)

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isMultiple: boolean = false) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setUploading(true)
        try {
            const uploadedUrls: string[] = []
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                const formDataUpload = new FormData()
                formDataUpload.append('file', file)

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formDataUpload,
                })

                if (response.ok) {
                    const data = await response.json()
                    uploadedUrls.push(data.url)
                } else {
                    const error = await response.json()
                    alert(error.error || `Upload failed for ${file.name}`)
                }
            }

            if (uploadedUrls.length > 0) {
                if (isMultiple) {
                    setFormData(prev => ({
                        ...prev,
                        images: [...prev.images, ...uploadedUrls],
                        image: prev.image || uploadedUrls[0] // Set first image as featured
                    }))
                    e.target.value = '' // Reset so user can add more
                } else {
                    setFormData(prev => ({
                        ...prev,
                        image: uploadedUrls[0],
                        images: uploadedUrls.length > 1 ? [...prev.images, ...uploadedUrls.slice(1)] : prev.images
                    }))
                }
            }
        } catch (error) {
            console.error('Upload error:', error)
            alert('Failed to upload images')
        } finally {
            setUploading(false)
        }
    }

    const removeImage = (index: number) => {
        setFormData(prev => {
            const newImages = [...prev.images]
            newImages.splice(index, 1)
            return { ...prev, images: newImages }
        })
    }

    const removeFeaturedImage = () => {
        setFormData(prev => {
            const newImages = prev.image ? [prev.image, ...prev.images] : prev.images
            return {
                ...prev,
                image: newImages.length > 0 ? newImages[0] : '',
                images: newImages.slice(1)
            }
        })
    }

    return (
        <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">News & Media</h1>
                    <p className="text-gray-600 mt-2">Manage news articles, announcements, and press releases</p>
                </div>
                {!isAdding && !editingId && (
                    <Button onClick={() => setIsAdding(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" /> Add News Item
                    </Button>
                )}
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
                <Card className="border-t-4 border-t-blue-600 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl">{editingId ? 'Edit News Item' : 'Add News Item'}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., Ministry Launches New Water Project"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <select
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="NEWS">News</option>
                                    <option value="ANNOUNCEMENT">Announcement</option>
                                    <option value="PRESS_RELEASE">Press Release</option>
                                    <option value="EVENT">Event</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="image">Featured Image (First Image - Will appear in card)</Label>
                                <div className="flex gap-4 items-start">
                                    <div className="flex-1">
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileUpload(e, false)}
                                            disabled={uploading}
                                            className="bg-gray-50"
                                        />
                                        {uploading && (
                                            <p className="text-sm text-blue-600 mt-2">Uploading...</p>
                                        )}
                                        <p className="text-xs text-gray-500 mt-1">This will be the main image shown in the news card</p>
                                    </div>
                                    {formData.image && (
                                        <div className="relative w-32 h-20 rounded overflow-hidden border-2 border-gray-300 group">
                                            <img src={formData.image} alt="Featured Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={removeFeaturedImage}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="images">Additional Images (Multiple)</Label>
                                <div className="space-y-3">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <input
                                            ref={additionalImagesInputRef}
                                            id="images"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => handleFileUpload(e, true)}
                                            disabled={uploading}
                                            className="hidden"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => additionalImagesInputRef.current?.click()}
                                            disabled={uploading}
                                            className="bg-gray-50"
                                        >
                                            <ImageIcon className="mr-2 h-4 w-4" />
                                            {uploading ? 'Uploading...' : 'Choose Files'}
                                        </Button>
                                        <span className="text-sm text-gray-600">
                                            {formData.images.length} image{formData.images.length !== 1 ? 's' : ''} added
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500">No limit — add as many images as you want. You can select multiple at once or add more anytime.</p>
                                    
                                    {formData.images.length > 0 && (
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                                            {formData.images.map((img, index) => (
                                                <div key={index} className="relative group">
                                                    <div className="w-full h-24 rounded overflow-hidden border-2 border-gray-300">
                                                        <img src={img} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="content">Content *</Label>
                                <Textarea
                                    id="content"
                                    placeholder="Write the full article content here..."
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="bg-gray-50 min-h-[200px]"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t">
                            <Button onClick={editingId ? handleUpdate : handleAdd} className="bg-blue-600 hover:bg-blue-700">
                                <Save className="mr-2 h-4 w-4" />
                                {editingId ? 'Update News' : 'Save News'}
                            </Button>
                            <Button variant="outline" onClick={handleCancel}>
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* News List */}
            <div className="grid grid-cols-1 gap-6">
                {news.map((item) => (
                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                {/* Image */}
                                <div className="w-full md:w-48 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    {item.image ? (
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <ImageIcon className="w-8 h-8" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {item.category}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(item.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleEdit(item)}
                                                className="hover:bg-blue-50 hover:text-blue-600"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDelete(item.id)}
                                                className="hover:bg-red-50 hover:text-red-600"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 line-clamp-2">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {news.length === 0 && !isAdding && (
                    <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Newspaper className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No News Items Yet</h3>
                        <p className="text-gray-500 mt-1 mb-6">Get started by adding your first news article.</p>
                        <Button onClick={() => setIsAdding(true)}>
                            Add News Item
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
