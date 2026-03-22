'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Shield, User as UserIcon } from 'lucide-react'
import { format } from 'date-fns'

interface User {
    id: string
    name: string
    email: string
    role: string
    createdAt: string
}

export default function UserList() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users')
            if (res.ok) {
                const data = await res.json()
                setUsers(data)
            }
        } catch (error) {
            console.error('Failed to fetch users', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return

        try {
            const res = await fetch(`/api/users/${id}`, {
                method: 'DELETE',
            })

            if (res.ok) {
                setUsers(users.filter(user => user.id !== id))
                router.refresh()
            } else {
                const data = await res.json()
                alert(data.error || 'Failed to delete user')
            }
        } catch (error) {
            alert('An error occurred')
        }
    }

    if (loading) {
        return <div>Loading users...</div>
    }

    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                        <UserIcon className="w-4 h-4 text-gray-500" />
                                    </div>
                                    {user.name || 'N/A'}
                                </div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                                    {user.role === 'ADMIN' && <Shield className="w-3 h-3 mr-1" />}
                                    {user.role}
                                </Badge>
                            </TableCell>
                            <TableCell>{format(new Date(user.createdAt), 'MMM dd, yyyy')}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Link href={`/admin/users/${user.id}`}>
                                        <Button variant="ghost" size="icon">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
