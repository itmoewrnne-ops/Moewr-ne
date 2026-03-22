'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, Edit, Save, X, FileText, Download } from 'lucide-react'

interface Tender {
    id: string
    title: string
    category: string
    status: string
    budget: string | null
    deadline: string
    documentUrl: string | null
}

export default function AdminTendersPage() {
    const [tenders, setTenders] = useState<Tender[]>([])
    const [isAdding, setIsAdding] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        category: 'Construction',
        status: 'OPEN',
        budget: '',
        deadline: '',
        documentUrl: '',
    })

    useEffect(() => {
        fetchTenders()
    }, [])

    const fetchTenders = async () => {
        try {
            const response = await fetch('/api/tenders')
            if (response.ok) {
                const data = await response.json()
                setTenders(data)
            }
        } catch (error) {
            console.error('Error fetching tenders:', error)
        }
    }

    const handleAdd = async () => {
        if (!formData.title || !formData.deadline) {
            alert('Please fill in Title and Deadline')
            return
        }

        try {
            const response = await fetch('/api/tenders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                fetchTenders()
                resetForm()
                setIsAdding(false)
                alert('✅ Tender added successfully!')
            }
        } catch (error) {
            console.error('Error adding tender:', error)
            alert('Failed to add tender')
        }
    }

    const handleUpdate = async () => {
        if (!editingId) return

        try {
            const response = await fetch(`/api/tenders/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                fetchTenders()
                setEditingId(null)
                resetForm()
                alert('✅ Tender updated successfully!')
            }
        } catch (error) {
            console.error('Error updating tender:', error)
            alert('Failed to update tender')
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this tender?')) {
            try {
                const response = await fetch(`/api/tenders/${id}`, {
                    method: 'DELETE',
                })

                if (response.ok) {
                    fetchTenders()
                    alert('✅ Tender deleted successfully!')
                }
            } catch (error) {
                console.error('Error deleting tender:', error)
                alert('Failed to delete tender')
            }
        }
    }

    const handleEdit = (tender: Tender) => {
        setEditingId(tender.id)
        setFormData({
            title: tender.title,
            category: tender.category,
            status: tender.status,
            budget: tender.budget || '',
            deadline: new Date(tender.deadline).toISOString().split('T')[0],
            documentUrl: tender.documentUrl || '',
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
            category: 'Construction',
            status: 'OPEN',
            budget: '',
            deadline: '',
            documentUrl: '',
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
                setFormData(prev => ({ ...prev, documentUrl: data.url }))
            } else {
                const error = await response.json()
                alert(error.error || 'Upload failed')
            }
        } catch (error) {
            console.error('Upload error:', error)
            alert('Failed to upload document')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Tenders Management</h1>
                    <p className="text-gray-600 mt-2">Manage procurement and tender opportunities</p>
                </div>
                {!isAdding && !editingId && (
                    <Button onClick={() => setIsAdding(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" /> Add New Tender
                    </Button>
                )}
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
                <Card className="border-t-4 border-t-blue-600 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl">{editingId ? 'Edit Tender' : 'Add New Tender'}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="title">Tender Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., Construction of Water Dam in Region X"
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
                                    <option value="Construction">Construction</option>
                                    <option value="Consultancy">Consultancy</option>
                                    <option value="Supply">Supply of Goods</option>
                                    <option value="Services">Services</option>
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
                                    <option value="OPEN">Open</option>
                                    <option value="CLOSED">Closed</option>
                                    <option value="AWARDED">Awarded</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="budget">Budget (Optional)</Label>
                                <Input
                                    id="budget"
                                    placeholder="e.g., $500,000"
                                    value={formData.budget}
                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="deadline">Deadline *</Label>
                                <Input
                                    id="deadline"
                                    type="date"
                                    value={formData.deadline}
                                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="document">Tender Document (PDF)</Label>
                                <div className="flex gap-4 items-center">
                                    <div className="flex-1">
                                        <Input
                                            id="document"
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileUpload}
                                            disabled={uploading}
                                            className="bg-gray-50"
                                        />
                                        {uploading && (
                                            <p className="text-sm text-blue-600 mt-2">Uploading...</p>
                                        )}
                                    </div>
                                    {formData.documentUrl && (
                                        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded border border-green-200">
                                            <FileText className="w-4 h-4" />
                                            <span className="text-sm font-medium">Document Uploaded</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t">
                            <Button onClick={editingId ? handleUpdate : handleAdd} className="bg-blue-600 hover:bg-blue-700">
                                <Save className="mr-2 h-4 w-4" />
                                {editingId ? 'Update Tender' : 'Save Tender'}
                            </Button>
                            <Button variant="outline" onClick={handleCancel}>
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Tenders List */}
            <div className="grid grid-cols-1 gap-6">
                {tenders.map((tender) => (
                    <Card key={tender.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tender.status === 'OPEN' ? 'bg-green-100 text-green-800' :
                                                tender.status === 'CLOSED' ? 'bg-red-100 text-red-800' :
                                                    'bg-blue-100 text-blue-800'
                                            }`}>
                                            {tender.status}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            Deadline: {new Date(tender.deadline).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{tender.title}</h3>
                                    <p className="text-sm text-gray-600 mb-2">Category: {tender.category}</p>
                                    {tender.budget && (
                                        <p className="text-sm text-gray-500">Budget: {tender.budget}</p>
                                    )}
                                    {tender.documentUrl && (
                                        <a
                                            href={tender.documentUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mt-2"
                                        >
                                            <Download className="w-3 h-3" /> Download Document
                                        </a>
                                    )}
                                </div>

                                <div className="flex gap-2 ml-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(tender)}
                                        className="hover:bg-blue-50 hover:text-blue-600"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(tender.id)}
                                        className="hover:bg-red-50 hover:text-red-600"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {tenders.length === 0 && !isAdding && (
                    <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No Tenders Yet</h3>
                        <p className="text-gray-500 mt-1 mb-6">Get started by adding your first tender.</p>
                        <Button onClick={() => setIsAdding(true)}>
                            Add Tender
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
