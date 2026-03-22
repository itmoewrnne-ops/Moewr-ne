'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Upload, Image as ImageIcon, Video, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { addLeadershipMember } from '@/lib/leadership-storage'

export default function UploadMediaPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        category: 'Leadership',
        type: 'image' as 'image' | 'video',
        file: null as File | null,
        // Leadership-specific fields
        leadershipName: '',
        leadershipPosition: '',
        bio: '',
        email: '',
        phone: '',
    })
    const [preview, setPreview] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFormData({ ...formData, file })

            // Create preview for images
            if (file.type.startsWith('image/')) {
                const reader = new FileReader()
                reader.onloadend = () => {
                    setPreview(reader.result as string)
                }
                reader.readAsDataURL(file)
            } else {
                setPreview(null)
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Use the preview image (base64) as the image URL
            const imageUrl = preview || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(formData.leadershipName || formData.title) + '&size=400&background=random'

            if (formData.category === 'Leadership' && formData.leadershipName) {
                // Add leadership member to localStorage
                addLeadershipMember({
                    name: formData.leadershipName,
                    position: formData.leadershipPosition,
                    image: imageUrl,
                    bio: formData.bio || undefined,
                    email: formData.email || undefined,
                    phone: formData.phone || undefined,
                })

                alert('✅ Leadership photo uploaded successfully! It will now appear on the Leadership page.')
                router.push('/admin/media')
            } else {
                alert('Media uploaded successfully!')
                router.push('/admin/media')
            }
        } catch (error) {
            console.error('Upload error:', error)
            alert('Failed to upload media. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const categories = ['Leadership', 'Projects', 'Events', 'Infrastructure', 'Other']
    const leadershipPositions = ['Minister', 'Deputy Minister', 'Permanent Secretary', 'Director', 'Other']

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/media">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">Upload Media</h1>
                    <p className="text-gray-600 mt-1">Add photos or videos to the gallery</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upload Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Media Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., Minister Official Photo"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type">Media Type *</Label>
                                <select
                                    id="type"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'image' | 'video' })}
                                    required
                                >
                                    <option value="image">Image</option>
                                    <option value="video">Video</option>
                                </select>
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
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Leadership-specific fields */}
                            {formData.category === 'Leadership' && (
                                <>
                                    <div className="border-t pt-4">
                                        <h3 className="font-semibold mb-4 text-blue-900">Leadership Information</h3>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="leadershipName">Full Name *</Label>
                                                <Input
                                                    id="leadershipName"
                                                    placeholder="e.g., Hon. Ahmed Mohamed"
                                                    value={formData.leadershipName}
                                                    onChange={(e) => setFormData({ ...formData, leadershipName: e.target.value })}
                                                    required={formData.category === 'Leadership'}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="leadershipPosition">Position *</Label>
                                                <select
                                                    id="leadershipPosition"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                    value={formData.leadershipPosition}
                                                    onChange={(e) => setFormData({ ...formData, leadershipPosition: e.target.value })}
                                                    required={formData.category === 'Leadership'}
                                                >
                                                    <option value="">Select Position</option>
                                                    {leadershipPositions.map(pos => (
                                                        <option key={pos} value={pos}>{pos}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="bio">Biography</Label>
                                                <Textarea
                                                    id="bio"
                                                    placeholder="Brief bio of the leader"
                                                    value={formData.bio}
                                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                                    rows={3}
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="email@mow.gov"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">Phone</Label>
                                                    <Input
                                                        id="phone"
                                                        placeholder="+252 61 234 5678"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="file">
                                    Upload File ({formData.type === 'image' ? 'JPG, PNG, WebP' : 'MP4, WebM'}) *
                                </Label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                    {formData.type === 'image' ? (
                                        <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                    ) : (
                                        <Video className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                    )}
                                    <input
                                        type="file"
                                        id="file"
                                        accept={formData.type === 'image' ? 'image/*' : 'video/*'}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        required
                                    />
                                    <label htmlFor="file" className="cursor-pointer">
                                        <span className="text-blue-600 hover:underline">Click to upload</span>
                                        {' '}or drag and drop
                                    </label>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {formData.type === 'image' ? 'Max 5MB' : 'Max 50MB'}
                                    </p>
                                    {formData.file && (
                                        <p className="text-sm text-green-600 mt-2">
                                            ✅ Selected: {formData.file.name}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" className="flex-1" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="mr-2 h-4 w-4" />
                                            Upload Media
                                        </>
                                    )}
                                </Button>
                                <Link href="/admin/media" className="flex-1">
                                    <Button type="button" variant="outline" className="w-full" disabled={loading}>
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Preview */}
                <Card>
                    <CardHeader>
                        <CardTitle>Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {preview ? (
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                <div className="text-center text-gray-400">
                                    {formData.type === 'image' ? (
                                        <>
                                            <ImageIcon className="h-16 w-16 mx-auto mb-2" />
                                            <p>Image preview will appear here</p>
                                        </>
                                    ) : (
                                        <>
                                            <Video className="h-16 w-16 mx-auto mb-2" />
                                            <p>Video file selected</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {formData.file && (
                            <div className="space-y-2 text-sm mb-4 bg-gray-50 p-3 rounded">
                                <p><strong>Filename:</strong> {formData.file.name}</p>
                                <p><strong>Size:</strong> {(formData.file.size / 1024).toFixed(2)} KB</p>
                                <p><strong>Type:</strong> {formData.file.type}</p>
                            </div>
                        )}

                        {formData.category === 'Leadership' && formData.leadershipName && (
                            <div className="bg-green-50 border-2 border-green-500 p-4 rounded-lg">
                                <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                                    <span className="text-2xl">✅</span> Will appear on Leadership page
                                </h4>
                                <div className="space-y-1 text-sm">
                                    <p><strong>Name:</strong> {formData.leadershipName}</p>
                                    <p><strong>Position:</strong> {formData.leadershipPosition}</p>
                                    {formData.bio && <p><strong>Bio:</strong> {formData.bio.substring(0, 50)}...</p>}
                                    {formData.email && <p>📧 {formData.email}</p>}
                                    {formData.phone && <p>📱 {formData.phone}</p>}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
