'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2, Edit, Save, X, Image as ImageIcon, ArrowUp, ArrowDown } from 'lucide-react'

interface HeroSlide {
    id: string
    title: string
    subtitle: string | null
    image: string
    buttonText: string | null
    buttonLink: string | null
    order: number
    active: boolean
}

export default function AdminHeroSliderPage() {
    const [slides, setSlides] = useState<HeroSlide[]>([])
    const [isAdding, setIsAdding] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        image: '',
        buttonText: '',
        buttonLink: '',
        order: 0,
    })
    
    const handleAddClick = (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        setIsAdding(true)
        setEditingId(null)
        setFormData({ title: '', subtitle: '', image: '', buttonText: '', buttonLink: '', order: 0 })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        fetchSlides()
    }, [])

    const fetchSlides = async () => {
        try {
            const response = await fetch('/api/hero-slides')
            if (response.ok) {
                const data = await response.json()
                setSlides(data)
            }
        } catch (error) {
            console.error('Error fetching slides:', error)
        }
    }

    const handleAdd = async () => {
        if (!formData.title || !formData.image) {
            alert('Please fill in Title and Image')
            return
        }

        try {
            const response = await fetch('/api/hero-slides', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    order: slides.length + 1,
                }),
            })

            if (response.ok) {
                fetchSlides()
                setFormData({ title: '', subtitle: '', image: '', buttonText: '', buttonLink: '', order: 0 })
                setIsAdding(false)
                alert('✅ Slide added successfully!')
            }
        } catch (error) {
            console.error('Error adding slide:', error)
            alert('Failed to add slide')
        }
    }

    const handleUpdate = async () => {
        if (!editingId) return

        try {
            const response = await fetch(`/api/hero-slides/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                fetchSlides()
                setEditingId(null)
                setFormData({ title: '', subtitle: '', image: '', buttonText: '', buttonLink: '', order: 0 })
                alert('✅ Slide updated successfully!')
            }
        } catch (error) {
            console.error('Error updating slide:', error)
            alert('Failed to update slide')
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this slide?')) {
            try {
                const response = await fetch(`/api/hero-slides/${id}`, {
                    method: 'DELETE',
                })

                if (response.ok) {
                    fetchSlides()
                    alert('✅ Slide deleted successfully!')
                }
            } catch (error) {
                console.error('Error deleting slide:', error)
                alert('Failed to delete slide')
            }
        }
    }

    const handleEdit = (slide: HeroSlide) => {
        setEditingId(slide.id)
        setFormData({
            title: slide.title,
            subtitle: slide.subtitle || '',
            image: slide.image,
            buttonText: slide.buttonText || '',
            buttonLink: slide.buttonLink || '',
            order: slide.order,
        })
        setIsAdding(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleCancel = () => {
        setIsAdding(false)
        setEditingId(null)
        setFormData({ title: '', subtitle: '', image: '', buttonText: '', buttonLink: '', order: 0 })
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', file)

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                const data = await response.json()
                setFormData(prev => ({ ...prev, image: data.url }))
            } else {
                const error = await response.json()
                alert(error.error || 'Upload failed')
            }
        } catch (error) {
            console.error('Upload error:', error)
            alert('Failed to upload image')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2">Hero Slider Management</h1>
                    <p className="text-lg font-bold text-gray-700 mt-2">Manage homepage hero slider images and content</p>
                </div>
                {!isAdding && !editingId && (
                    <Button 
                        type="button"
                        onClick={handleAddClick}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add New Slide
                    </Button>
                )}
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
                <Card className="border-t-4 border-t-blue-600 shadow-lg my-8">
                    <CardHeader>
                        <CardTitle className="text-2xl font-extrabold">{editingId ? 'Edit Slide' : 'Add New Slide'}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., Building a Sustainable Future"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subtitle">Subtitle</Label>
                                <Input
                                    id="subtitle"
                                    placeholder="e.g., Ensuring Water Security for All"
                                    value={formData.subtitle}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="image">Slide Image *</Label>
                                <div className="flex gap-4 items-start">
                                    <div className="flex-1">
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            disabled={uploading}
                                            className="bg-gray-50"
                                        />
                                        {uploading && (
                                            <p className="text-sm text-blue-600 mt-2">Uploading...</p>
                                        )}
                                    </div>
                                    {formData.image && (
                                        <div className="w-32 h-20 rounded overflow-hidden border-2 border-gray-300">
                                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500">
                                    Upload a high-quality image (recommended: 1920x1080px)
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="buttonText">Button Text</Label>
                                <Input
                                    id="buttonText"
                                    placeholder="e.g., Learn More"
                                    value={formData.buttonText}
                                    onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="buttonLink">Button Link</Label>
                                <Input
                                    id="buttonLink"
                                    placeholder="e.g., /about/ministry"
                                    value={formData.buttonLink}
                                    onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="order">Display Order</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    className="bg-gray-50"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t">
                            <Button onClick={editingId ? handleUpdate : handleAdd} className="bg-blue-600 hover:bg-blue-700">
                                <Save className="mr-2 h-4 w-4" />
                                {editingId ? 'Update Slide' : 'Save Slide'}
                            </Button>
                            <Button variant="outline" onClick={handleCancel}>
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Slides List */}
            <div className="grid grid-cols-1 gap-6">
                {slides.map((slide) => (
                    <Card key={slide.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="flex flex-col md:flex-row">
                            {/* Image Preview */}
                            <div className="md:w-1/3 bg-gray-200 relative aspect-video md:aspect-auto">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                                    Order: {slide.order}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-6">
                                <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{slide.title}</h3>
                                {slide.subtitle && (
                                    <p className="text-lg font-bold text-gray-700 mb-4">{slide.subtitle}</p>
                                )}
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                                    {slide.buttonText && (
                                        <div>
                                            <span className="font-semibold">Button:</span> {slide.buttonText}
                                        </div>
                                    )}
                                    {slide.buttonLink && (
                                        <div>
                                            <span className="font-semibold">Link:</span> {slide.buttonLink}
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(slide)}
                                        className="hover:bg-blue-50 hover:text-blue-600"
                                    >
                                        <Edit className="mr-2 h-4 w-4" /> Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(slide.id)}
                                        className="hover:bg-red-50 hover:text-red-600"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {slides.length === 0 && !isAdding && (
                <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ImageIcon className="w-10 h-10 text-gray-400" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-3">No Slides Yet</h2>
                    <p className="text-xl font-bold text-gray-700 mt-2 mb-8">Get started by adding your first hero slide.</p>
                    <Button 
                        type="button"
                        onClick={handleAddClick}
                        size="lg" 
                        className="text-lg font-bold bg-blue-600 hover:bg-blue-700"
                    >
                        Add Hero Slide
                    </Button>
                </div>
            )}
        </div>
    )
}
