'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Download } from 'lucide-react'

const policies = [
    {
        id: 1,
        title: 'National Water Policy 2024',
        description: 'Framework for sustainable water resource management',
        date: '2024-01-15',
        size: '2.5 MB',
        fileUrl: '/documents/water-policy-2024.pdf', // You'll need to add actual PDF files here
    },
    {
        id: 2,
        title: 'Energy Act 2023',
        description: 'Legislation governing energy sector operations',
        date: '2023-12-01',
        size: '1.8 MB',
        fileUrl: '/documents/energy-act-2023.pdf',
    },
    {
        id: 3,
        title: 'Natural Resources Conservation Act',
        description: 'Legal framework for environmental protection',
        date: '2023-11-20',
        size: '3.2 MB',
        fileUrl: '/documents/nr-conservation-act.pdf',
    },
    {
        id: 4,
        title: 'Water Services Regulations',
        description: 'Standards and guidelines for water service providers',
        date: '2023-10-10',
        size: '1.5 MB',
        fileUrl: '/documents/water-services-regs.pdf',
    },
]

export default function PoliciesPage() {
    const handleView = (policy: typeof policies[0]) => {
        // Open PDF in new tab
        window.open(policy.fileUrl, '_blank')
    }

    const handleDownload = (policy: typeof policies[0]) => {
        // Create a temporary link and trigger download
        const link = document.createElement('a')
        link.href = policy.fileUrl
        link.download = `${policy.title}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-blue-900 text-white py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">Policies & Acts</h1>
                    <p className="text-xl text-gray-200">
                        Legal and policy framework governing our operations
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {policies.map((policy) => (
                        <Card key={policy.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg mb-2">{policy.title}</CardTitle>
                                        <p className="text-sm text-gray-600">{policy.description}</p>
                                    </div>
                                    <FileText className="h-8 w-8 text-blue-600 ml-4" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-500">
                                        <p>Published: {new Date(policy.date).toLocaleDateString()}</p>
                                        <p>Size: {policy.size}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleView(policy)}
                                            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                                        >
                                            <FileText className="h-4 w-4" />
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleDownload(policy)}
                                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                        >
                                            <Download className="h-4 w-4" />
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Key Policy Areas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-lg text-blue-900 mb-3">Water Sector</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Water resource allocation and management</li>
                                <li>• Water quality standards and monitoring</li>
                                <li>• Sanitation and hygiene promotion</li>
                                <li>• Drought and flood management</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-yellow-900 mb-3">Energy Sector</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Renewable energy development</li>
                                <li>• Energy efficiency standards</li>
                                <li>• Power generation and distribution</li>
                                <li>• Energy access and affordability</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-green-900 mb-3">Natural Resources</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Forest conservation and management</li>
                                <li>• Mineral resource regulation</li>
                                <li>• Wildlife protection</li>
                                <li>• Environmental impact assessment</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-purple-900 mb-3">Cross-Cutting Issues</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Climate change adaptation</li>
                                <li>• Gender mainstreaming</li>
                                <li>• Public-private partnerships</li>
                                <li>• Regional cooperation</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
