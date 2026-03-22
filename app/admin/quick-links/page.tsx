'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, Edit, Save, X, Link as LinkIcon } from 'lucide-react'
import * as Icons from 'lucide-react'

interface QuickLink {
    id: string
    title: string
    href: string
    icon: string
    order: number
    active: boolean
}

const iconOptions = [
    'FileText', 'Download', 'FileCheck', 'Folder', 'File', 'FileSpreadsheet',
    'Briefcase', 'Building', 'Users', 'Mail', 'Phone', 'MapPin',
    'Calendar', 'Clock', 'Settings', 'Info', 'HelpCircle', 'Search'
]

export default function AdminQuickLinksPage() {
    const [links, setLinks] = useState<QuickLink[]>([])
    const [isAdding, setIsAdding] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        href: '',
        icon: 'FileText',
        order: 0,
    })

    useEffect(() => {
        fetchLinks()
    }, [])

    const fetchLinks = async () => {
        try {
            const response = await fetch('/api/quick-links')
            if (response.ok) {
                const data = await response.json()
                setLinks(data)
            }
        } catch (error) {
            console.error('Error fetching links:', error)
        }
    }

    const handleAdd = async () => {
        if (!formData.title || !formData.href) {
            alert('Please fill in Title and Link')
            return
        }

        try {
            const response = await fetch('/api/quick-links', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    order: links.length + 1,
                }),
            })

            if (response.ok) {
                fetchLinks()
                setFormData({ title: '', href: '', icon: 'FileText', order: 0 })
                setIsAdding(false)
                alert('✅ Quick link added successfully!')
            }
        } catch (error) {
            console.error('Error adding link:', error)
            alert('Failed to add quick link')
        }
    }

    const handleUpdate = async () => {
        if (!editingId) return

        try {
            const response = await fetch(`/api/quick-links/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                fetchLinks()
                setEditingId(null)
                setFormData({ title: '', href: '', icon: 'FileText', order: 0 })
                alert('✅ Quick link updated successfully!')
            }
        } catch (error) {
            console.error('Error updating link:', error)
            alert('Failed to update quick link')
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this quick link?')) {
            try {
                const response = await fetch(`/api/quick-links/${id}`, {
                    method: 'DELETE',
                })

                if (response.ok) {
                    fetchLinks()
                    alert('✅ Quick link deleted successfully!')
                }
            } catch (error) {
                console.error('Error deleting link:', error)
                alert('Failed to delete quick link')
            }
        }
    }

    const handleEdit = (link: QuickLink) => {
        setEditingId(link.id)
        setFormData({
            title: link.title,
            href: link.href,
            icon: link.icon,
            order: link.order,
        })
        setIsAdding(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleCancel = () => {
        setIsAdding(false)
        setEditingId(null)
        setFormData({ title: '', href: '', icon: 'FileText', order: 0 })
    }

    const getIcon = (iconName: string) => {
        const IconComponent = (Icons as any)[iconName]
        return IconComponent ? <IconComponent className="h-5 w-5" /> : <Icons.FileText className="h-5 w-5" />
    }

    return (
        <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quick Links Management</h1>
                    <p className="text-gray-600 mt-2">Manage quick access links on the homepage</p>
                </div>
                {!isAdding && !editingId && (
                    <Button onClick={() => setIsAdding(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" /> Add New Link
                    </Button>
                )}
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
                <Card className="border-t-4 border-t-blue-600 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl">{editingId ? 'Edit Quick Link' : 'Add New Quick Link'}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., Water Connection Application"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="href">Link URL *</Label>
                                <Input
                                    id="href"
                                    placeholder="e.g., /services or https://..."
                                    value={formData.href}
                                    onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="icon">Icon</Label>
                                <select
                                    id="icon"
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {iconOptions.map((icon) => (
                                        <option key={icon} value={icon}>
                                            {icon}
                                        </option>
                                    ))}
                                </select>
                                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                                    <span>Preview:</span>
                                    {getIcon(formData.icon)}
                                </div>
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
                                {editingId ? 'Update Link' : 'Save Link'}
                            </Button>
                            <Button variant="outline" onClick={handleCancel}>
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {links.map((link) => (
                    <Card key={link.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            {/* Icon */}
                            <div className="w-14 h-14 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                {getIcon(link.icon)}
                            </div>

                            {/* Title */}
                            <h3 className="text-center font-semibold text-gray-900 mb-2 min-h-[3rem] flex items-center justify-center">
                                {link.title}
                            </h3>

                            {/* Link */}
                            <p className="text-xs text-gray-500 text-center mb-4 truncate">
                                {link.href}
                            </p>

                            {/* Order Badge */}
                            <div className="text-center mb-4">
                                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                    Order: {link.order}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEdit(link)}
                                    className="flex-1 hover:bg-blue-50 hover:text-blue-600"
                                >
                                    <Edit className="mr-1 h-3 w-3" /> Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDelete(link.id)}
                                    className="hover:bg-red-50 hover:text-red-600"
                                >
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {links.length === 0 && !isAdding && (
                <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <LinkIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No Quick Links Yet</h3>
                    <p className="text-gray-500 mt-1 mb-6">Get started by adding your first quick link.</p>
                    <Button onClick={() => setIsAdding(true)}>
                        Add Quick Link
                    </Button>
                </div>
            )}
        </div>
    )
}
