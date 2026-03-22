'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

interface UserFormProps {
    initialData?: {
        id: string
        name: string
        email: string
        role: string
    }
}

export default function UserForm({ initialData }: UserFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        email: initialData?.email || '',
        password: '',
        role: initialData?.role || 'EDITOR',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const url = initialData
                ? `/api/users/${initialData.id}`
                : '/api/users'

            const method = initialData ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                router.push('/admin/users')
                router.refresh()
            } else {
                const data = await res.json()
                setError(data.error || 'Something went wrong')
            }
        } catch (error) {
            setError('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Select
                            value={formData.role}
                            onValueChange={(value) => setFormData({ ...formData, role: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ADMIN">Administrator</SelectItem>
                                <SelectItem value="EDITOR">Editor</SelectItem>
                                <SelectItem value="DEPT_HEAD">Department Head</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                            Admins have full access. Editors can manage content.
                        </p>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">
                            {initialData ? 'New Password (leave blank to keep current)' : 'Password'}
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder={initialData ? "••••••••" : "Enter password"}
                            required={!initialData}
                            minLength={6}
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : (initialData ? 'Update User' : 'Create User')}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
