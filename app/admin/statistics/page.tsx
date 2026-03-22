'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, Edit, Save, X, BarChart } from 'lucide-react'
import * as Icons from 'lucide-react'

interface Statistic {
    id: string
    title: string
    value: string
    unit: string | null
    category: string | null
    icon: string
    order: number
    active: boolean
}

const iconOptions = [
    'BarChart', 'PieChart', 'TrendingUp', 'Activity', 'Users', 'Droplets',
    'Zap', 'Home', 'Map', 'Globe', 'CheckCircle', 'Award'
]

export default function AdminStatisticsPage() {
    const [stats, setStats] = useState<Statistic[]>([])
    const [isAdding, setIsAdding] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        value: '',
        unit: '',
        category: '',
        icon: 'BarChart',
        order: 0,
    })

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/statistics')
            if (response.ok) {
                const data = await response.json()
                setStats(data)
            }
        } catch (error) {
            console.error('Error fetching statistics:', error)
        }
    }

    const handleAdd = async () => {
        if (!formData.title || !formData.value) {
            alert('Please fill in Title and Value')
            return
        }

        try {
            const response = await fetch('/api/statistics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    order: stats.length + 1,
                }),
            })

            if (response.ok) {
                fetchStats()
                resetForm()
                setIsAdding(false)
                alert('✅ Statistic added successfully!')
            }
        } catch (error) {
            console.error('Error adding statistic:', error)
            alert('Failed to add statistic')
        }
    }

    const handleUpdate = async () => {
        if (!editingId) return

        try {
            const response = await fetch(`/api/statistics/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                fetchStats()
                setEditingId(null)
                resetForm()
                alert('✅ Statistic updated successfully!')
            }
        } catch (error) {
            console.error('Error updating statistic:', error)
            alert('Failed to update statistic')
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this statistic?')) {
            try {
                const response = await fetch(`/api/statistics/${id}`, {
                    method: 'DELETE',
                })

                if (response.ok) {
                    fetchStats()
                    alert('✅ Statistic deleted successfully!')
                }
            } catch (error) {
                console.error('Error deleting statistic:', error)
                alert('Failed to delete statistic')
            }
        }
    }

    const handleEdit = (stat: Statistic) => {
        setEditingId(stat.id)
        setFormData({
            title: stat.title,
            value: stat.value,
            unit: stat.unit || '',
            category: stat.category || '',
            icon: stat.icon,
            order: stat.order,
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
            value: '',
            unit: '',
            category: '',
            icon: 'BarChart',
            order: 0,
        })
    }

    const getIcon = (iconName: string) => {
        const IconComponent = (Icons as any)[iconName]
        return IconComponent ? <IconComponent className="h-5 w-5" /> : <Icons.BarChart className="h-5 w-5" />
    }

    return (
        <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Statistics Management</h1>
                    <p className="text-gray-600 mt-2">Manage homepage statistics and achievements</p>
                </div>
                {!isAdding && !editingId && (
                    <Button onClick={() => setIsAdding(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" /> Add New Statistic
                    </Button>
                )}
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
                <Card className="border-t-4 border-t-blue-600 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl">{editingId ? 'Edit Statistic' : 'Add New Statistic'}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., People Served"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="value">Value *</Label>
                                <Input
                                    id="value"
                                    placeholder="e.g., 2.5M"
                                    value={formData.value}
                                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="unit">Unit (Optional)</Label>
                                <Input
                                    id="unit"
                                    placeholder="e.g., Citizens"
                                    value={formData.unit}
                                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
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
                                {editingId ? 'Update Statistic' : 'Save Statistic'}
                            </Button>
                            <Button variant="outline" onClick={handleCancel}>
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6 text-center">
                            {/* Icon */}
                            <div className="w-12 h-12 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                {getIcon(stat.icon)}
                            </div>

                            {/* Value */}
                            <div className="text-3xl font-bold text-blue-900 mb-1">
                                {stat.value}
                            </div>

                            {/* Title & Unit */}
                            <h3 className="font-semibold text-gray-900 mb-1">
                                {stat.title}
                            </h3>
                            {stat.unit && (
                                <p className="text-sm text-gray-500 mb-4">
                                    {stat.unit}
                                </p>
                            )}

                            {/* Order Badge */}
                            <div className="mb-4">
                                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                    Order: {stat.order}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 justify-center">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEdit(stat)}
                                    className="hover:bg-blue-50 hover:text-blue-600"
                                >
                                    <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDelete(stat.id)}
                                    className="hover:bg-red-50 hover:text-red-600"
                                >
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {stats.length === 0 && !isAdding && (
                <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BarChart className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No Statistics Yet</h3>
                    <p className="text-gray-500 mt-1 mb-6">Get started by adding your first statistic.</p>
                    <Button onClick={() => setIsAdding(true)}>
                        Add Statistic
                    </Button>
                </div>
            )}
        </div>
    )
}
