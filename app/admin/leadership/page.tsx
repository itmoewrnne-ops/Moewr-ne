'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2, Edit, Save, X, Image as ImageIcon, Mail, Phone } from 'lucide-react'

interface Leadership {
    id: string
    name: string
    position: string
    image: string | null
    bio: string | null
    email: string | null
    phone: string | null
    order: number
    active: boolean
}

export default function AdminLeadershipPage() {
    const [leadership, setLeadership] = useState<Leadership[]>([])
    const [isAdding, setIsAdding] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        image: '',
        bio: '',
        email: '',
        phone: '',
        order: 0,
    })

    useEffect(() => {
        fetchLeadership()
    }, [])

    const fetchLeadership = async () => {
        try {
            const response = await fetch('/api/leadership')
            if (response.ok) {
                const data = await response.json()
                setLeadership(data)
            }
        } catch (error) {
            console.error('Error fetching leadership:', error)
        }
    }

    const handleAdd = async () => {
        if (!formData.name || !formData.position) {
            alert('Please fill in Name and Position')
            return
        }

        try {
            const response = await fetch('/api/leadership', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    order: leadership.length + 1,
                }),
            })

            if (response.ok) {
                fetchLeadership()
                setFormData({ name: '', position: '', image: '', bio: '', email: '', phone: '', order: 0 })
                setIsAdding(false)
                alert('✅ Leadership member added successfully!')
            }
        } catch (error) {
            console.error('Error adding leadership:', error)
            alert('Failed to add leadership member')
        }
    }

    const handleUpdate = async () => {
        if (!editingId) return

        try {
            const response = await fetch(`/api/leadership/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                fetchLeadership()
                setEditingId(null)
                setFormData({ name: '', position: '', image: '', bio: '', email: '', phone: '', order: 0 })
                alert('✅ Leadership member updated successfully!')
            }
        } catch (error) {
            console.error('Error updating leadership:', error)
            alert('Failed to update leadership member')
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this leadership member?')) {
            try {
                const response = await fetch(`/api/leadership/${id}`, {
                    method: 'DELETE',
                })

                if (response.ok) {
                    fetchLeadership()
                    alert('✅ Leadership member deleted successfully!')
                }
            } catch (error) {
                console.error('Error deleting leadership:', error)
                alert('Failed to delete leadership member')
            }
        }
    }

    const handleEdit = (member: Leadership) => {
        setEditingId(member.id)
        setFormData({
            name: member.name,
            position: member.position,
            image: member.image || '',
            bio: member.bio || '',
            email: member.email || '',
            phone: member.phone || '',
            order: member.order,
        })
        setIsAdding(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleCancel = () => {
        setIsAdding(false)
        setEditingId(null)
        setFormData({ name: '', position: '', image: '', bio: '', email: '', phone: '', order: 0 })
    }

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    const getRoleColor = (position: string) => {
        const pos = position.toLowerCase()
        if (pos.includes('deputy')) return 'bg-[#008F6A]' // Green
        if (pos.includes('minister')) return 'bg-[#1439B7]' // Blue
        if (pos.includes('secretary') || pos.includes('ps')) return 'bg-[#CC1D1D]' // Red
        return 'bg-gray-600' // Default
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
                    <h1 className="text-3xl font-bold text-gray-900">Leadership Management</h1>
                    <p className="text-gray-600 mt-2">Manage ministry leadership profiles</p>
                </div>
                {!isAdding && !editingId && (
                    <Button onClick={() => setIsAdding(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" /> Add New Leader
                    </Button>
                )}
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
                <Card className="border-t-4 border-t-blue-600 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl">{editingId ? 'Edit Profile' : 'Add New Profile'}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name *</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g., Hon. Ahmed Mohamed"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="position">Position *</Label>
                                <Input
                                    id="position"
                                    placeholder="e.g., Minister"
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="image">Photo</Label>
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
                                        <div className="w-20 h-20 rounded overflow-hidden border-2 border-gray-300">
                                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500">
                                    Upload a photo (JPG, PNG, or WebP, max 5MB)
                                </p>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="bio">Biography</Label>
                                <Textarea
                                    id="bio"
                                    placeholder="Brief professional biography..."
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    rows={4}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="email@mow.gov"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    placeholder="+252..."
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                                {editingId ? 'Update Profile' : 'Save Profile'}
                            </Button>
                            <Button variant="outline" onClick={handleCancel}>
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Leadership Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {leadership.map((member) => (
                    <div
                        key={member.id}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
                    >
                        {/* Card Header / Image Area */}
                        <div className={`aspect-square relative ${getRoleColor(member.position)} flex items-center justify-center`}>
                            {member.image ? (
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-white text-8xl font-medium tracking-tighter opacity-90">
                                    {getInitials(member.name)}
                                </span>
                            )}

                            {/* Role Badge */}
                            <div className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                                Leadership
                            </div>

                            {/* Edit Image Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => handleEdit(member)}
                                    className="font-semibold"
                                >
                                    <ImageIcon className="mr-2 h-4 w-4" /> Change Photo
                                </Button>
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                <p className={`text-sm font-semibold ${member.position.toLowerCase().includes('minister') && !member.position.toLowerCase().includes('deputy')
                                    ? 'text-blue-700'
                                    : member.position.toLowerCase().includes('deputy')
                                        ? 'text-green-700'
                                        : 'text-red-700'
                                    }`}>
                                    {member.position}
                                </p>
                            </div>

                            {member.bio && (
                                <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1">
                                    {member.bio}
                                </p>
                            )}

                            <div className="space-y-2 mt-auto text-sm text-gray-500 border-t pt-4">
                                {member.email && (
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <span>{member.email}</span>
                                    </div>
                                )}
                                {member.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span>{member.phone}</span>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 mt-6">
                                <Button
                                    variant="outline"
                                    className="flex-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                                    onClick={() => handleEdit(member)}
                                >
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                                    onClick={() => handleDelete(member.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {leadership.length === 0 && !isAdding && (
                <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No Leadership Profiles</h3>
                    <p className="text-gray-500 mt-1 mb-6">Get started by adding your first leadership member.</p>
                    <Button onClick={() => setIsAdding(true)}>
                        Add Leadership Member
                    </Button>
                </div>
            )}
        </div>
    )
}
