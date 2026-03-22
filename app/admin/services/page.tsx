'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2, Edit, Save, X, Wrench, Building2 } from 'lucide-react'

interface Service {
    id: string
    title: string
    description: string
    requirements: string | null
    departmentId: string
    department: {
        id: string
        name: string
    }
}

interface Department {
    id: string
    name: string
}

export default function AdminServicesPage() {
    const [services, setServices] = useState<Service[]>([])
    const [departments, setDepartments] = useState<Department[]>([])
    const [isAdding, setIsAdding] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        departmentId: '',
    })

    useEffect(() => {
        fetchServices()
        fetchDepartments()
    }, [])

    const fetchServices = async () => {
        try {
            const response = await fetch('/api/services')
            if (response.ok) {
                const data = await response.json()
                setServices(data)
            }
        } catch (error) {
            console.error('Error fetching services:', error)
        }
    }

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
        if (!formData.title || !formData.departmentId) {
            alert('Please fill in Title and select a Department')
            return
        }

        try {
            const response = await fetch('/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                fetchServices()
                resetForm()
                setIsAdding(false)
                alert('✅ Service added successfully!')
            }
        } catch (error) {
            console.error('Error adding service:', error)
            alert('Failed to add service')
        }
    }

    const handleUpdate = async () => {
        if (!editingId) return

        try {
            const response = await fetch(`/api/services/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                fetchServices()
                setEditingId(null)
                resetForm()
                alert('✅ Service updated successfully!')
            }
        } catch (error) {
            console.error('Error updating service:', error)
            alert('Failed to update service')
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this service?')) {
            try {
                const response = await fetch(`/api/services/${id}`, {
                    method: 'DELETE',
                })

                if (response.ok) {
                    fetchServices()
                    alert('✅ Service deleted successfully!')
                }
            } catch (error) {
                console.error('Error deleting service:', error)
                alert('Failed to delete service')
            }
        }
    }

    const handleEdit = (service: Service) => {
        setEditingId(service.id)
        setFormData({
            title: service.title,
            description: service.description,
            requirements: service.requirements || '',
            departmentId: service.departmentId,
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
            requirements: '',
            departmentId: '',
        })
    }

    return (
        <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
                    <p className="text-gray-600 mt-2">Manage public services provided by departments</p>
                </div>
                {!isAdding && !editingId && (
                    <Button onClick={() => setIsAdding(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" /> Add New Service
                    </Button>
                )}
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
                <Card className="border-t-4 border-t-blue-600 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl">{editingId ? 'Edit Service' : 'Add New Service'}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Service Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., Water Connection Application"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="department">Department *</Label>
                                <select
                                    id="department"
                                    value={formData.departmentId}
                                    onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Department</option>
                                    {departments.map((dept) => (
                                        <option key={dept.id} value={dept.id}>
                                            {dept.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe the service..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="bg-gray-50 min-h-[100px]"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="requirements">Requirements (Optional)</Label>
                                <Textarea
                                    id="requirements"
                                    placeholder="List requirements (e.g., ID card, Application Form)..."
                                    value={formData.requirements}
                                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                    className="bg-gray-50 min-h-[100px]"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t">
                            <Button onClick={editingId ? handleUpdate : handleAdd} className="bg-blue-600 hover:bg-blue-700">
                                <Save className="mr-2 h-4 w-4" />
                                {editingId ? 'Update Service' : 'Save Service'}
                            </Button>
                            <Button variant="outline" onClick={handleCancel}>
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Services List */}
            <div className="grid grid-cols-1 gap-6">
                {services.map((service) => (
                    <Card key={service.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            <Building2 className="w-3 h-3 mr-1" />
                                            {service.department.name}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 mb-4">
                                        {service.description}
                                    </p>

                                    {service.requirements && (
                                        <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-600">
                                            <span className="font-semibold block mb-1">Requirements:</span>
                                            {service.requirements}
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2 ml-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(service)}
                                        className="hover:bg-blue-50 hover:text-blue-600"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(service.id)}
                                        className="hover:bg-red-50 hover:text-red-600"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {services.length === 0 && !isAdding && (
                    <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Wrench className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No Services Yet</h3>
                        <p className="text-gray-500 mt-1 mb-6">Get started by adding your first service.</p>
                        <Button onClick={() => setIsAdding(true)}>
                            Add Service
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
