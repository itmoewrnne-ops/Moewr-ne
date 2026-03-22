'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2, Edit, Save, X, Briefcase, Image as ImageIcon } from 'lucide-react'
import * as Icons from 'lucide-react'

interface Project {
    id: string
    title: string
    description: string
    status: string
    icon: string
    image: string | null
    location: string | null
    budget: string | null
    timeline: string | null
    progress: number | null
    order: number
    active: boolean
}

const iconOptions = [
    'Droplets', 'Waves', 'Factory', 'Shield', 'Sprout', 'Zap',
    'Building', 'Construction', 'Lightbulb', 'Wind', 'Sun', 'Battery'
]

const statusOptions = ['ONGOING', 'COMPLETED', 'UPCOMING']

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [isAdding, setIsAdding] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'ONGOING',
        icon: 'Droplets',
        image: '',
        location: '',
        budget: '',
        timeline: '',
        progress: 0,
        order: 0,
    })

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects')
            if (response.ok) {
                const data = await response.json()
                setProjects(data)
            }
        } catch (error) {
            console.error('Error fetching projects:', error)
        }
    }

    const handleAdd = async () => {
        if (!formData.title || !formData.description) {
            alert('Please fill in Title and Description')
            return
        }

        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    order: projects.length + 1,
                }),
            })

            if (response.ok) {
                fetchProjects()
                resetForm()
                setIsAdding(false)
                alert('✅ Project added successfully!')
            }
        } catch (error) {
            console.error('Error adding project:', error)
            alert('Failed to add project')
        }
    }

    const handleUpdate = async () => {
        if (!editingId) return

        try {
            const response = await fetch(`/api/projects/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                fetchProjects()
                setEditingId(null)
                resetForm()
                alert('✅ Project updated successfully!')
            }
        } catch (error) {
            console.error('Error updating project:', error)
            alert('Failed to update project')
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            try {
                const response = await fetch(`/api/projects/${id}`, {
                    method: 'DELETE',
                })

                if (response.ok) {
                    fetchProjects()
                    alert('✅ Project deleted successfully!')
                }
            } catch (error) {
                console.error('Error deleting project:', error)
                alert('Failed to delete project')
            }
        }
    }

    const handleEdit = (project: Project) => {
        setEditingId(project.id)
        setFormData({
            title: project.title,
            description: project.description,
            status: project.status,
            icon: project.icon,
            image: project.image || '',
            location: project.location || '',
            budget: project.budget || '',
            timeline: project.timeline || '',
            progress: project.progress || 0,
            order: project.order,
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
            status: 'ONGOING',
            icon: 'Droplets',
            image: '',
            location: '',
            budget: '',
            timeline: '',
            progress: 0,
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

    const getIcon = (iconName: string) => {
        const IconComponent = (Icons as any)[iconName]
        return IconComponent ? <IconComponent className="h-5 w-5" /> : <Icons.Droplets className="h-5 w-5" />
    }

    const getStatusBadge = (status: string) => {
        const colors = {
            ONGOING: 'bg-blue-100 text-blue-800',
            COMPLETED: 'bg-green-100 text-green-800',
            UPCOMING: 'bg-yellow-100 text-yellow-800',
        }
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
    }

    return (
        <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Projects Management</h1>
                    <p className="text-gray-600 mt-2">Manage all ministry projects and their details</p>
                </div>
                {!isAdding && !editingId && (
                    <Button onClick={() => setIsAdding(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" /> Add New Project
                    </Button>
                )}
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
                <Card className="border-t-4 border-t-blue-600 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl">{editingId ? 'Edit Project' : 'Add New Project'}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="title">Project Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., Kenya Water, Sanitation and Hygiene Program"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Brief description of the project..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="bg-gray-50 min-h-[100px]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status *</Label>
                                <select
                                    id="status"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {statusOptions.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
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

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="image">Project Image</Label>
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
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    placeholder="e.g., Garowe, Puntland"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="budget">Budget</Label>
                                <Input
                                    id="budget"
                                    placeholder="e.g., $5.2 Million"
                                    value={formData.budget}
                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="timeline">Timeline</Label>
                                <Input
                                    id="timeline"
                                    placeholder="e.g., 2023-2026"
                                    value={formData.timeline}
                                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="progress">Progress (%)</Label>
                                <Input
                                    id="progress"
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formData.progress}
                                    onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) || 0 })}
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
                                {editingId ? 'Update Project' : 'Save Project'}
                            </Button>
                            <Button variant="outline" onClick={handleCancel}>
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Projects List by Status */}
            {['ONGOING', 'COMPLETED', 'UPCOMING'].map((status) => {
                const statusProjects = projects.filter(p => p.status === status)
                if (statusProjects.length === 0) return null

                return (
                    <div key={status}>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(status)}`}>
                                {status}
                            </span>
                            <span className="text-gray-400 text-lg">({statusProjects.length})</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {statusProjects.map((project) => (
                                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                                    {project.image && (
                                        <div className="aspect-video bg-gray-200 overflow-hidden">
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <CardContent className="p-6">
                                        {/* Icon & Title */}
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                                                {getIcon(project.icon)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-gray-900 leading-tight line-clamp-2">
                                                    {project.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                            {project.description}
                                        </p>

                                        {/* Details */}
                                        <div className="space-y-2 text-xs text-gray-500 mb-4">
                                            {project.location && (
                                                <div><span className="font-semibold">Location:</span> {project.location}</div>
                                            )}
                                            {project.budget && (
                                                <div><span className="font-semibold">Budget:</span> {project.budget}</div>
                                            )}
                                            {project.timeline && (
                                                <div><span className="font-semibold">Timeline:</span> {project.timeline}</div>
                                            )}
                                            {project.progress !== null && (
                                                <div>
                                                    <span className="font-semibold">Progress:</span> {project.progress}%
                                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                        <div
                                                            className="bg-blue-600 h-1.5 rounded-full"
                                                            style={{ width: `${project.progress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 pt-4 border-t">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleEdit(project)}
                                                className="flex-1 hover:bg-blue-50 hover:text-blue-600"
                                            >
                                                <Edit className="mr-1 h-3 w-3" /> Edit
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDelete(project.id)}
                                                className="hover:bg-red-50 hover:text-red-600"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )
            })}

            {projects.length === 0 && !isAdding && (
                <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Briefcase className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No Projects Yet</h3>
                    <p className="text-gray-500 mt-1 mb-6">Get started by adding your first project.</p>
                    <Button onClick={() => setIsAdding(true)}>
                        Add Project
                    </Button>
                </div>
            )}
        </div>
    )
}
