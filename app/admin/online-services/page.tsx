'use client'

import { useState, useEffect } from 'react'
import { FileText, Plus, Edit, Trash2 } from 'lucide-react'

interface OnlineService {
    id: string
    title: string
    description: string
    category: string
    requirements?: string | null
    formUrl?: string | null
    documentUrl?: string | null
    icon?: string | null
    order: number
    active: boolean
}

export default function AdminOnlineServicesPage() {
    const [services, setServices] = useState<OnlineService[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingService, setEditingService] = useState<OnlineService | null>(null)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'REGISTRATION',
        requirements: '',
        formUrl: '',
        documentUrl: '',
        icon: 'FileText',
        order: 0,
        active: true,
    })

    useEffect(() => {
        fetchServices()
    }, [])

    const fetchServices = async () => {
        try {
            const response = await fetch('/api/online-services')
            if (response.ok) {
                const data = await response.json()
                setServices(data)
            }
        } catch (error) {
            console.error('Error fetching services:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const url = editingService ? `/api/online-services/${editingService.id}` : '/api/online-services'
            const method = editingService ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                fetchServices()
                resetForm()
                alert(editingService ? 'Service updated!' : 'Service created!')
            }
        } catch (error) {
            console.error('Error saving service:', error)
            alert('Failed to save service')
        }
    }

    const handleEdit = (service: OnlineService) => {
        setEditingService(service)
        setFormData({
            title: service.title,
            description: service.description,
            category: service.category,
            requirements: service.requirements || '',
            formUrl: service.formUrl || '',
            documentUrl: service.documentUrl || '',
            icon: service.icon || 'FileText',
            order: service.order,
            active: service.active,
        })
        setShowForm(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this service?')) return

        try {
            const response = await fetch(`/api/online-services/${id}`, { method: 'DELETE' })
            if (response.ok) {
                fetchServices()
                alert('Service deleted!')
            }
        } catch (error) {
            console.error('Error deleting service:', error)
        }
    }

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            category: 'REGISTRATION',
            requirements: '',
            formUrl: '',
            documentUrl: '',
            icon: 'FileText',
            order: 0,
            active: true,
        })
        setEditingService(null)
        setShowForm(false)
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <FileText className="w-6 h-6 mr-2" />
                        Online Services Management
                    </h1>
                    <p className="text-gray-600 mt-1">Manage online services and applications</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">
                        {editingService ? 'Edit Service' : 'Create New Service'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                >
                                    <option value="REGISTRATION">Registration</option>
                                    <option value="LICENSE">License</option>
                                    <option value="APPLICATION">Application</option>
                                    <option value="FORM">Form</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                <input
                                    type="text"
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                    placeholder="FileText, Award, Droplet"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                            <textarea
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                            <textarea
                                value={formData.requirements}
                                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                rows={2}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Form URL</label>
                                <input
                                    type="url"
                                    value={formData.formUrl}
                                    onChange={(e) => setFormData({ ...formData, formUrl: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Document URL</label>
                                <input
                                    type="url"
                                    value={formData.documentUrl}
                                    onChange={(e) => setFormData({ ...formData, documentUrl: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="active"
                                checked={formData.active}
                                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                className="mr-2"
                            />
                            <label htmlFor="active" className="text-sm font-medium text-gray-700">Active</label>
                        </div>

                        <div className="flex gap-2">
                            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                                {editingService ? 'Update' : 'Create'}
                            </button>
                            <button type="button" onClick={resetForm} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {services.map((service) => (
                            <tr key={service.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{service.title}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                        {service.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">{service.order}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs ${service.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {service.active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => handleEdit(service)} className="text-blue-600 hover:text-blue-800">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(service.id)} className="text-red-600 hover:text-red-800">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {services.length === 0 && !isLoading && (
                    <div className="text-center py-12 text-gray-500">
                        No services found. Click &quot;Add Service&quot; to create one.
                    </div>
                )}
            </div>
        </div>
    )
}
