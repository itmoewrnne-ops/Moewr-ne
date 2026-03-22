'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2, Edit, Save, X, Building2, User, Phone, FileText } from 'lucide-react'

interface Department {
    id: string
    name: string
    slug: string
    description: string | null
    image: string | null
    functions: string | null
    mandate: string | null
    headName: string | null
    headImage: string | null
    headBio: string | null
    contactEmail: string | null
    contactPhone: string | null
    _count?: {
        services: number
        projects: number
    }
}

export default function AdminDepartmentsPage() {
    const [departments, setDepartments] = useState<Department[]>([])
    const [isAdding, setIsAdding] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [activeTab, setActiveTab] = useState('basic') // basic, details, leadership, contact

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        image: '',
        functions: '',
        mandate: '',
        headName: '',
        headImage: '',
        headBio: '',
        contactEmail: '',
        contactPhone: '',
    })

    useEffect(() => {
        fetchDepartments()
    }, [])

    const fetchDepartments = async () => {
        try {
            const response = await fetch('/api/departments')
            if (response.ok) {
                const data = await response.json()
                setDepartments(data)
            }
        } catch (error) {
            console.error('Error fetching departments:', error)
        }
    }

    const handleAdd = async () => {
        if (!formData.name) {
            alert('Please fill in Department Name')
            return
        }

        try {
            const response = await fetch('/api/departments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                fetchDepartments()
                resetForm()
                setIsAdding(false)
                alert('✅ Department added successfully!')
            }
        } catch (error) {
            console.error('Error adding department:', error)
            alert('Failed to add department')
        }
    }

    const handleUpdate = async () => {
        if (!editingId) return

        try {
            const response = await fetch(`/api/departments/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                fetchDepartments()
                setEditingId(null)
                resetForm()
                alert('✅ Department updated successfully!')
            }
        } catch (error) {
            console.error('Error updating department:', error)
            alert('Failed to update department')
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this department? This will also affect linked services and projects.')) {
            try {
                const response = await fetch(`/api/departments/${id}`, {
                    method: 'DELETE',
                })

                if (response.ok) {
                    fetchDepartments()
                    alert('✅ Department deleted successfully!')
                }
            } catch (error) {
                console.error('Error deleting department:', error)
                alert('Failed to delete department')
            }
        }
    }

    const handleEdit = (dept: Department) => {
        setEditingId(dept.id)
        setFormData({
            name: dept.name,
            slug: dept.slug,
            description: dept.description || '',
            image: dept.image || '',
            functions: dept.functions || '',
            mandate: dept.mandate || '',
            headName: dept.headName || '',
            headImage: dept.headImage || '',
            headBio: dept.headBio || '',
            contactEmail: dept.contactEmail || '',
            contactPhone: dept.contactPhone || '',
        })
        setIsAdding(false)
        setActiveTab('basic')
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
            slug: '',
            description: '',
            image: '',
            functions: '',
            mandate: '',
            headName: '',
            headImage: '',
            headBio: '',
            contactEmail: '',
            contactPhone: '',
        })
        setActiveTab('basic')
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'headImage') => {
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
                setFormData(prev => ({ ...prev, [field]: data.url }))
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
                    <h1 className="text-3xl font-bold text-gray-900">Departments Management</h1>
                    <p className="text-gray-600 mt-2">Manage ministry departments, leadership, and functions</p>
                </div>
                {!isAdding && !editingId && (
                    <Button onClick={() => setIsAdding(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" /> Add New Department
                    </Button>
                )}
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
                <Card className="border-t-4 border-t-blue-600 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center justify-between">
                            <span>{editingId ? 'Edit Department' : 'Add New Department'}</span>
                            <div className="flex gap-2 text-sm font-normal">
                                {['basic', 'details', 'leadership', 'contact'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-3 py-1 rounded-full capitalize transition-colors ${activeTab === tab
                                            ? 'bg-blue-100 text-blue-700 font-medium'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        {/* Basic Info Tab */}
                        {activeTab === 'basic' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Department Name *</Label>
                                    <Input
                                        id="name"
                                        placeholder="e.g., Department of Water Resources"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="bg-gray-50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug (Optional)</Label>
                                    <Input
                                        id="slug"
                                        placeholder="e.g., water-resources"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="bg-gray-50"
                                    />
                                    <p className="text-xs text-gray-500">Leave empty to auto-generate from name</p>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Brief overview of the department..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="bg-gray-50 min-h-[100px]"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="image">Department Cover Image</Label>
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-1">
                                            <Input
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, 'image')}
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
                            </div>
                        )}

                        {/* Details Tab */}
                        {activeTab === 'details' && (
                            <div className="grid grid-cols-1 gap-6 animate-in fade-in duration-300">
                                <div className="space-y-2">
                                    <Label htmlFor="mandate">Mandate</Label>
                                    <Textarea
                                        id="mandate"
                                        placeholder="The official mandate of the department..."
                                        value={formData.mandate}
                                        onChange={(e) => setFormData({ ...formData, mandate: e.target.value })}
                                        className="bg-gray-50 min-h-[100px]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="functions">Core Functions</Label>
                                    <Textarea
                                        id="functions"
                                        placeholder="List the key functions..."
                                        value={formData.functions}
                                        onChange={(e) => setFormData({ ...formData, functions: e.target.value })}
                                        className="bg-gray-50 min-h-[150px]"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Leadership Tab */}
                        {activeTab === 'leadership' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                                <div className="space-y-2">
                                    <Label htmlFor="headName">Head of Department Name</Label>
                                    <Input
                                        id="headName"
                                        placeholder="e.g., Dr. Ahmed Ali"
                                        value={formData.headName}
                                        onChange={(e) => setFormData({ ...formData, headName: e.target.value })}
                                        className="bg-gray-50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="headImage">Head&apos;s Photo</Label>
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-1">
                                            <Input
                                                id="headImage"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, 'headImage')}
                                                disabled={uploading}
                                                className="bg-gray-50"
                                            />
                                        </div>
                                        {formData.headImage && (
                                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
                                                <img src={formData.headImage} alt="Head" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="headBio">Head&apos;s Biography</Label>
                                    <Textarea
                                        id="headBio"
                                        placeholder="Brief bio of the department head..."
                                        value={formData.headBio}
                                        onChange={(e) => setFormData({ ...formData, headBio: e.target.value })}
                                        className="bg-gray-50 min-h-[100px]"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Contact Tab */}
                        {activeTab === 'contact' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                                <div className="space-y-2">
                                    <Label htmlFor="contactEmail">Contact Email</Label>
                                    <Input
                                        id="contactEmail"
                                        type="email"
                                        placeholder="e.g., water@ministry.gov.so"
                                        value={formData.contactEmail}
                                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                        className="bg-gray-50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contactPhone">Contact Phone</Label>
                                    <Input
                                        id="contactPhone"
                                        placeholder="e.g., +252 61 1234567"
                                        value={formData.contactPhone}
                                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                                        className="bg-gray-50"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3 pt-4 border-t">
                            <Button onClick={editingId ? handleUpdate : handleAdd} className="bg-blue-600 hover:bg-blue-700">
                                <Save className="mr-2 h-4 w-4" />
                                {editingId ? 'Update Department' : 'Save Department'}
                            </Button>
                            <Button variant="outline" onClick={handleCancel}>
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Departments List */}
            <div className="grid grid-cols-1 gap-6">
                {departments.map((dept) => (
                    <Card key={dept.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                {/* Image */}
                                <div className="w-full md:w-48 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    {dept.image ? (
                                        <img src={dept.image} alt={dept.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <Building2 className="w-8 h-8" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">{dept.name}</h3>
                                            <p className="text-sm text-gray-500 mb-2">/{dept.slug}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleEdit(dept)}
                                                className="hover:bg-blue-50 hover:text-blue-600"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDelete(dept.id)}
                                                className="hover:bg-red-50 hover:text-red-600"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {dept.description || 'No description provided.'}
                                    </p>

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                        {dept.headName && (
                                            <div className="flex items-center gap-1">
                                                <User className="w-4 h-4" />
                                                <span>Head: {dept.headName}</span>
                                            </div>
                                        )}
                                        {dept.contactPhone && (
                                            <div className="flex items-center gap-1">
                                                <Phone className="w-4 h-4" />
                                                <span>{dept.contactPhone}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1">
                                            <FileText className="w-4 h-4" />
                                            <span>{dept._count?.services || 0} Services</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {departments.length === 0 && !isAdding && (
                    <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Building2 className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No Departments Yet</h3>
                        <p className="text-gray-500 mt-1 mb-6">Get started by adding your first department.</p>
                        <Button onClick={() => setIsAdding(true)}>
                            Add Department
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
