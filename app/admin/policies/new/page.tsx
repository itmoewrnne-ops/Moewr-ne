'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Upload } from 'lucide-react'
import Link from 'next/link'

export default function NewPolicyPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Water',
        file: null as File | null,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would implement the file upload and database save logic
        console.log('Form submitted:', formData)
        // Redirect back to policies list
        router.push('/admin/policies')
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/policies">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">Add New Document</h1>
                    <p className="text-gray-600 mt-1">Upload a new policy or legal document</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Document Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Document Title *</Label>
                            <Input
                                id="title"
                                placeholder="e.g., National Water Policy 2024"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                placeholder="Brief description of the document"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <select
                                id="category"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                required
                            >
                                <option value="Water">Water</option>
                                <option value="Energy">Energy</option>
                                <option value="Natural Resources">Natural Resources</option>
                                <option value="General">General</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="file">Upload Document (PDF) *</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                <input
                                    type="file"
                                    id="file"
                                    accept=".pdf"
                                    onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                                    className="hidden"
                                    required
                                />
                                <label htmlFor="file" className="cursor-pointer">
                                    <span className="text-blue-600 hover:underline">Click to upload</span>
                                    {' '}or drag and drop
                                </label>
                                <p className="text-sm text-gray-500 mt-2">PDF files only (Max 10MB)</p>
                                {formData.file && (
                                    <p className="text-sm text-green-600 mt-2">
                                        Selected: {formData.file.name}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" className="flex-1">
                                Upload Document
                            </Button>
                            <Link href="/admin/policies" className="flex-1">
                                <Button type="button" variant="outline" className="w-full">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
