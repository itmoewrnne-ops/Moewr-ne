'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Trash2, Edit, FileText, Eye } from 'lucide-react'
import Link from 'next/link'

export default function AdminPoliciesPage() {
    const [policies, setPolicies] = useState([
        {
            id: 1,
            title: 'National Water Policy 2024',
            description: 'Framework for sustainable water resource management',
            category: 'Water',
            publishedDate: '2024-01-15',
            fileSize: '2.5 MB',
            fileUrl: '/documents/water-policy-2024.pdf',
        },
        {
            id: 2,
            title: 'Energy Act 2023',
            description: 'Legislation governing energy sector operations',
            category: 'Energy',
            publishedDate: '2023-12-01',
            fileSize: '1.8 MB',
            fileUrl: '/documents/energy-act-2023.pdf',
        },
        {
            id: 3,
            title: 'Natural Resources Conservation Act',
            description: 'Legal framework for environmental protection',
            category: 'Natural Resources',
            publishedDate: '2023-11-20',
            fileSize: '3.2 MB',
            fileUrl: '/documents/nr-conservation-act.pdf',
        },
        {
            id: 4,
            title: 'Water Services Regulations',
            description: 'Standards and guidelines for water service providers',
            category: 'Water',
            publishedDate: '2023-10-10',
            fileSize: '1.5 MB',
            fileUrl: '/documents/water-services-regs.pdf',
        },
    ])

    const handleView = (policy: typeof policies[0]) => {
        window.open(policy.fileUrl, '_blank')
    }

    const handleEdit = (policyId: number) => {
        // Navigate to edit page or open modal
        alert(`Edit policy ID: ${policyId}`)
    }

    const handleDelete = (policyId: number) => {
        if (confirm('Are you sure you want to delete this policy document?')) {
            setPolicies(policies.filter(p => p.id !== policyId))
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Policies & Documents</h1>
                    <p className="text-gray-600 mt-2">Manage policy documents and legal frameworks</p>
                </div>
                <Link href="/admin/policies/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Document
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Published Date</TableHead>
                            <TableHead>File Size</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {policies.map((policy) => (
                            <TableRow key={policy.id}>
                                <TableCell>
                                    <div>
                                        <p className="font-medium">{policy.title}</p>
                                        <p className="text-sm text-gray-500">{policy.description}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${policy.category === 'Water' ? 'bg-blue-100 text-blue-800' :
                                            policy.category === 'Energy' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'
                                        }`}>
                                        {policy.category}
                                    </span>
                                </TableCell>
                                <TableCell>{new Date(policy.publishedDate).toLocaleDateString()}</TableCell>
                                <TableCell>{policy.fileSize}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            title="View"
                                            onClick={() => handleView(policy)}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            title="Edit"
                                            onClick={() => handleEdit(policy.id)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            title="Delete"
                                            onClick={() => handleDelete(policy.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {policies.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No policy documents found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-600">Total Documents</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{policies.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-600">Water Policies</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">
                        {policies.filter(p => p.category === 'Water').length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-600">Energy Policies</h3>
                    <p className="text-3xl font-bold text-yellow-600 mt-2">
                        {policies.filter(p => p.category === 'Energy').length}
                    </p>
                </div>
            </div>
        </div>
    )
}
