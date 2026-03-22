'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, Edit, Save, X, Image as ImageIcon, Globe } from 'lucide-react'

interface Partner {
    id: string
    name: string
    logo: string
    website: string | null
    category: string | null
    order: number
    active: boolean
}

export default function AdminPartnersPage() {
    const [partners, setPartners] = useState<Partner[]>([])
    const [isAdding, setIsAdding] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        logo: '',
        website: '',
        category: '',
        order: 0,
    })

    useEffect(() => {
        fetchPartners()
    }, [])

    const fetchPartners = async () => {
        try {
            const response = await fetch('/api/partners')
            if (response.ok) {
                const data = await response.json()
                setPartners(data)
            }
        } catch (error) {
            console.error('Error fetching partners:', error)
        }
    }

    const handleAdd = async () => {
        if (!formData.name || !formData.logo) {
            alert('Please fill in Name and Logo')
            return
        }

        try {
            const response = await fetch('/api/partners', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    order: partners.length + 1,
                }),
            })

            if (response.ok) {
                fetchPartners()
                resetForm()
                setIsAdding(false)
                alert('✅ Partner added successfully!')
            }
        } catch (error) {
            console.error('Error adding partner:', error)
            alert('Failed to add partner')
        }
    }

    const handleUpdate = async () => {
        if (!editingId) return

        try {
            const response = await fetch(`/api/partners/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                fetchPartners()
                setEditingId(null)
                resetForm()
                alert('✅ Partner updated successfully!')
            }
        } catch (error) {
            console.error('Error updating partner:', error)
            alert('Failed to update partner')
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this partner?')) {
            try {
                const response = await fetch(`/api/partners/${id}`, {
                    method: 'DELETE',
                })

                if (response.ok) {
                    fetchPartners()
                    alert('✅ Partner deleted successfully!')
                }
            } catch (error) {
                console.error('Error deleting partner:', error)
                alert('Failed to delete partner')
            }
        }
    }

    const handleEdit = (partner: Partner) => {
        setEditingId(partner.id)
        setFormData({
            name: partner.name,
            logo: partner.logo,
            website: partner.website || '',
            category: partner.category || '',
            order: partner.order,
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
            name: '',
            logo: '',
            website: '',
            category: '',
            order: 0,
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
                setFormData(prev => ({ ...prev, logo: data.url }))
            } else {
                const error = await response.json()
                alert(error.error || 'Upload failed')
            }
        } catch (error) {
            console.error('Upload error:', error)
            alert('Failed to upload logo')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Partners Management</h1>
                    <p className="text-gray-600 mt-2">Manage development partners and their logos</p>
                </div>
                {!isAdding && !editingId && (
                    <Button onClick={() => setIsAdding(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" /> Add New Partner
                    </Button>
                )}
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
                <Card className="border-t-4 border-t-blue-600 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl">{editingId ? 'Edit Partner' : 'Add New Partner'}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Partner Name *</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g., World Bank"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="website">Website (Optional)</Label>
                                <Input
                                    id="website"
                                    placeholder="e.g., https://worldbank.org"
                                    value={formData.website}
                                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="logo">Partner Logo *</Label>
                                <div className="flex gap-4 items-start">
                                    <div className="flex-1">
                                        <Input
                                            id="logo"
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
                                    {formData.logo && (
                                        <div className="w-32 h-20 rounded overflow-hidden border-2 border-gray-300 bg-white flex items-center justify-center p-2">
                                            <img src={formData.logo} alt="Preview" className="max-w-full max-h-full object-contain" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category (Optional)</Label>
                                <Input
                                    id="category"
                                    placeholder="e.g., Development Partner"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                                {editingId ? 'Update Partner' : 'Save Partner'}
                            </Button>
                            <Button variant="outline" onClick={handleCancel}>
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Partners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {partners.map((partner) => (
                    <Card key={partner.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6 text-center">
                            {/* Logo */}
                            <div className="h-24 flex items-center justify-center mb-4 bg-white rounded p-2 border border-gray-100">
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            </div>

                            {/* Name */}
                            <h3 className="font-semibold text-gray-900 mb-2 truncate">
                                {partner.name}
                            </h3>

                            {/* Website Link */}
                            {partner.website && (
                                <a
                                    href={partner.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 hover:underline flex items-center justify-center gap-1 mb-4"
                                >
                                    <Globe className="w-3 h-3" /> Visit Website
                                </a>
                            )}

                            {/* Order Badge */}
                            <div className="mb-4">
                                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                    Order: {partner.order}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 justify-center">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEdit(partner)}
                                    className="hover:bg-blue-50 hover:text-blue-600"
                                >
                                    <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDelete(partner.id)}
                                    className="hover:bg-red-50 hover:text-red-600"
                                >
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {partners.length === 0 && !isAdding && (
                <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No Partners Yet</h3>
                    <p className="text-gray-500 mt-1 mb-6">Get started by adding your first partner.</p>
                    <Button onClick={() => setIsAdding(true)}>
                        Add Partner
                    </Button>
                </div>
            )}
        </div>
    )
}
