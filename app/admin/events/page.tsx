'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2, Edit, Save, X, Calendar, MapPin, Image as ImageIcon } from 'lucide-react'

interface Event {
    id: string
    title: string
    description: string
    category: string
    startDate: string
    endDate: string | null
    location: string | null
    venue: string | null
    image: string | null
    registrationUrl: string | null
    status: string
    published: boolean
}

export default function AdminEventsPage() {
    const [events, setEvents] = useState<Event[]>([])
    const [isAdding, setIsAdding] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'CONFERENCE',
        startDate: '',
        endDate: '',
        location: '',
        venue: '',
        image: '',
        registrationUrl: '',
        status: 'UPCOMING',
    })

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        try {
            const response = await fetch('/api/events')
            if (response.ok) {
                const data = await response.json()
                setEvents(data)
            }
        } catch (error) {
            console.error('Error fetching events:', error)
        }
    }

    const handleAdd = async () => {
        if (!formData.title || !formData.startDate) {
            alert('Please fill in Title and Start Date')
            return
        }

        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                fetchEvents()
                resetForm()
                setIsAdding(false)
                alert('✅ Event added successfully!')
            }
        } catch (error) {
            console.error('Error adding event:', error)
            alert('Failed to add event')
        }
    }

    const handleUpdate = async () => {
        if (!editingId) return

        try {
            const response = await fetch(`/api/events/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                fetchEvents()
                setEditingId(null)
                resetForm()
                alert('✅ Event updated successfully!')
            }
        } catch (error) {
            console.error('Error updating event:', error)
            alert('Failed to update event')
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this event?')) {
            try {
                const response = await fetch(`/api/events/${id}`, {
                    method: 'DELETE',
                })

                if (response.ok) {
                    fetchEvents()
                    alert('✅ Event deleted successfully!')
                }
            } catch (error) {
                console.error('Error deleting event:', error)
                alert('Failed to delete event')
            }
        }
    }

    const handleEdit = (event: Event) => {
        setEditingId(event.id)
        setFormData({
            title: event.title,
            description: event.description,
            category: event.category,
            startDate: new Date(event.startDate).toISOString().slice(0, 16), // Format for datetime-local
            endDate: event.endDate ? new Date(event.endDate).toISOString().slice(0, 16) : '',
            location: event.location || '',
            venue: event.venue || '',
            image: event.image || '',
            registrationUrl: event.registrationUrl || '',
            status: event.status,
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
            description: '',
            category: 'CONFERENCE',
            startDate: '',
            endDate: '',
            location: '',
            venue: '',
            image: '',
            registrationUrl: '',
            status: 'UPCOMING',
        })
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        try {
            const formDataUpload = new FormData()
            formDataUpload.append('file', file)

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formDataUpload,
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
                    <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
                    <p className="text-gray-600 mt-2">Manage upcoming events, conferences, and workshops</p>
                </div>
                {!isAdding && !editingId && (
                    <Button onClick={() => setIsAdding(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" /> Add New Event
                    </Button>
                )}
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
                <Card className="border-t-4 border-t-blue-600 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl">{editingId ? 'Edit Event' : 'Add New Event'}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="title">Event Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., National Water Summit 2025"
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
                                    <option value="CONFERENCE">Conference</option>
                                    <option value="WORKSHOP">Workshop</option>
                                    <option value="FORUM">Forum</option>
                                    <option value="TRAINING">Training</option>
                                    <option value="LAUNCH">Launch Event</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <select
                                    id="status"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="UPCOMING">Upcoming</option>
                                    <option value="ONGOING">Ongoing</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="CANCELLED">Cancelled</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="startDate">Start Date & Time *</Label>
                                <Input
                                    id="startDate"
                                    type="datetime-local"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="endDate">End Date & Time</Label>
                                <Input
                                    id="endDate"
                                    type="datetime-local"
                                    value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    placeholder="e.g., Mogadishu"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="venue">Venue</Label>
                                <Input
                                    id="venue"
                                    placeholder="e.g., Decale Hotel"
                                    value={formData.venue}
                                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="image">Event Banner</Label>
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
                                    </div>
                                    {formData.image && (
                                        <div className="w-32 h-20 rounded overflow-hidden border-2 border-gray-300">
                                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Event details..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="bg-gray-50 min-h-[150px]"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t">
                            <Button onClick={editingId ? handleUpdate : handleAdd} className="bg-blue-600 hover:bg-blue-700">
                                <Save className="mr-2 h-4 w-4" />
                                {editingId ? 'Update Event' : 'Save Event'}
                            </Button>
                            <Button variant="outline" onClick={handleCancel}>
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Events List */}
            <div className="grid grid-cols-1 gap-6">
                {events.map((event) => (
                    <Card key={event.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                {/* Date Box */}
                                <div className="flex-shrink-0 w-20 h-20 bg-blue-50 rounded-lg flex flex-col items-center justify-center text-blue-700 border border-blue-100">
                                    <span className="text-xs font-bold uppercase">
                                        {new Date(event.startDate).toLocaleString('default', { month: 'short' })}
                                    </span>
                                    <span className="text-2xl font-bold">
                                        {new Date(event.startDate).getDate()}
                                    </span>
                                    <span className="text-xs text-blue-500">
                                        {new Date(event.startDate).getFullYear()}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${event.status === 'UPCOMING' ? 'bg-green-100 text-green-800' :
                                                        event.status === 'COMPLETED' ? 'bg-gray-100 text-gray-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {event.status}
                                                </span>
                                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {event.location || 'TBD'}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleEdit(event)}
                                                className="hover:bg-blue-50 hover:text-blue-600"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDelete(event.id)}
                                                className="hover:bg-red-50 hover:text-red-600"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 line-clamp-2 mb-2">
                                        {event.description}
                                    </p>

                                    {event.venue && (
                                        <p className="text-sm text-gray-500">
                                            <span className="font-medium">Venue:</span> {event.venue}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {events.length === 0 && !isAdding && (
                    <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No Events Yet</h3>
                        <p className="text-gray-500 mt-1 mb-6">Get started by adding your first event.</p>
                        <Button onClick={() => setIsAdding(true)}>
                            Add Event
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
