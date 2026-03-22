'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2, Edit, Save, X, Briefcase, Download, FileText } from 'lucide-react'

interface Job {
    id: string
    title: string
    type: string
    description: string
    requirements: string | null
    closingDate: string
    documentUrl: string | null
}

export default function AdminJobsPage() {
    const [jobs, setJobs] = useState<Job[]>([])
    const [isAdding, setIsAdding] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        type: 'FULL_TIME',
        description: '',
        requirements: '',
        closingDate: '',
        documentUrl: '',
    })

    useEffect(() => {
        fetchJobs()
    }, [])

    const fetchJobs = async () => {
        try {
            const response = await fetch('/api/jobs')
            if (response.ok) {
                const data = await response.json()
                setJobs(data)
            }
        } catch (error) {
            console.error('Error fetching jobs:', error)
        }
    }

    const handleAdd = async () => {
        if (!formData.title || !formData.closingDate) {
            alert('Please fill in Title and Closing Date')
            return
        }

        try {
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                fetchJobs()
                resetForm()
                setIsAdding(false)
                alert('✅ Job added successfully!')
            }
        } catch (error) {
            console.error('Error adding job:', error)
            alert('Failed to add job')
        }
    }

    const handleUpdate = async () => {
        if (!editingId) return

        try {
            const response = await fetch(`/api/jobs/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                fetchJobs()
                setEditingId(null)
                resetForm()
                alert('✅ Job updated successfully!')
            }
        } catch (error) {
            console.error('Error updating job:', error)
            alert('Failed to update job')
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this job?')) {
            try {
                const response = await fetch(`/api/jobs/${id}`, {
                    method: 'DELETE',
                })

                if (response.ok) {
                    fetchJobs()
                    alert('✅ Job deleted successfully!')
                }
            } catch (error) {
                console.error('Error deleting job:', error)
                alert('Failed to delete job')
            }
        }
    }

    const handleEdit = (job: Job) => {
        setEditingId(job.id)
        setFormData({
            title: job.title,
            type: job.type,
            description: job.description,
            requirements: job.requirements || '',
            closingDate: new Date(job.closingDate).toISOString().split('T')[0],
            documentUrl: job.documentUrl || '',
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
            type: 'FULL_TIME',
            description: '',
            requirements: '',
            closingDate: '',
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
                    <h1 className="text-3xl font-bold text-gray-900">Job Vacancies</h1>
                    <p className="text-gray-600 mt-2">Manage career opportunities and job listings</p>
                </div>
                {!isAdding && !editingId && (
                    <Button onClick={() => setIsAdding(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" /> Add New Job
                    </Button>
                )}
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
                <Card className="border-t-4 border-t-blue-600 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl">{editingId ? 'Edit Job' : 'Add New Job'}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="title">Job Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., Senior Water Engineer"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type">Employment Type</Label>
                                <select
                                    id="type"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="FULL_TIME">Full Time</option>
                                    <option value="PART_TIME">Part Time</option>
                                    <option value="CONTRACT">Contract</option>
                                    <option value="INTERNSHIP">Internship</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="closingDate">Closing Date *</Label>
                                <Input
                                    id="closingDate"
                                    type="date"
                                    value={formData.closingDate}
                                    onChange={(e) => setFormData({ ...formData, closingDate: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="document">Job Description (PDF)</Label>
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

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Job summary..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="bg-gray-50 min-h-[100px]"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="requirements">Requirements</Label>
                                <Textarea
                                    id="requirements"
                                    placeholder="List key requirements..."
                                    value={formData.requirements}
                                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                    className="bg-gray-50 min-h-[150px]"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t">
                            <Button onClick={editingId ? handleUpdate : handleAdd} className="bg-blue-600 hover:bg-blue-700">
                                <Save className="mr-2 h-4 w-4" />
                                {editingId ? 'Update Job' : 'Save Job'}
                            </Button>
                            <Button variant="outline" onClick={handleCancel}>
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Jobs List */}
            <div className="grid grid-cols-1 gap-6">
                {jobs.map((job) => (
                    <Card key={job.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {job.type.replace('_', ' ')}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            Closing: {new Date(job.closingDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {job.description}
                                    </p>

                                    {job.documentUrl && (
                                        <a
                                            href={job.documentUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                                        >
                                            <Download className="w-3 h-3" /> Download Job Description
                                        </a>
                                    )}
                                </div>

                                <div className="flex gap-2 ml-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(job)}
                                        className="hover:bg-blue-50 hover:text-blue-600"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(job.id)}
                                        className="hover:bg-red-50 hover:text-red-600"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {jobs.length === 0 && !isAdding && (
                    <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No Job Vacancies</h3>
                        <p className="text-gray-500 mt-1 mb-6">Get started by adding your first job listing.</p>
                        <Button onClick={() => setIsAdding(true)}>
                            Add Job
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
