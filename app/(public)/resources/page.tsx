import { Metadata } from 'next'
import { FileText, Download, Search, Filter } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Resources Library | Ministry of Water',
    description: 'Access policy documents, research papers, reports, and technical guidelines.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getResources() {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()

    try {
        const resources = await prisma.resource.findMany({
            orderBy: {
                publishedAt: 'desc',
            },
        })

        await prisma.$disconnect()
        return resources
    } catch (error) {
        console.error('Error fetching resources:', error)
        await prisma.$disconnect()
        return []
    }
}

export default async function ResourcesPage() {
    const resources = await getResources()

    const categories = {
        POLICY: resources.filter(r => r.category === 'POLICY'),
        RESEARCH: resources.filter(r => r.category === 'RESEARCH'),
        REPORT: resources.filter(r => r.category === 'REPORT'),
        GUIDELINE: resources.filter(r => r.category === 'GUIDELINE'),
        MAP: resources.filter(r => r.category === 'MAP'),
        STATISTICAL: resources.filter(r => r.category === 'STATISTICAL'),
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center mb-4">
                        <FileText className="w-8 h-8 mr-3" />
                        <h1 className="text-4xl font-bold">Resources Library</h1>
                    </div>
                    <p className="text-xl text-indigo-100 max-w-3xl">
                        Access policy documents, research papers, technical guidelines, and more
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Policy Documents */}
                {categories.POLICY.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center mb-6">
                            <div className="bg-blue-500 w-1 h-8 mr-4"></div>
                            <h2 className="text-2xl font-bold text-gray-900">Policy Documents</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {categories.POLICY.map((resource) => (
                                <div key={resource.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
                                            {resource.description && (
                                                <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                                            )}
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span>{resource.fileType}</span>
                                                <span>{resource.fileSize}</span>
                                                <span>{resource.downloads} downloads</span>
                                            </div>
                                        </div>
                                        <a
                                            href={resource.fileUrl}
                                            download
                                            className="ml-4 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                                            title="Download"
                                        >
                                            <Download className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Reports */}
                {categories.REPORT.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center mb-6">
                            <div className="bg-green-500 w-1 h-8 mr-4"></div>
                            <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {categories.REPORT.map((resource) => (
                                <div key={resource.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
                                            {resource.description && (
                                                <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                                            )}
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span>{resource.fileType}</span>
                                                <span>{resource.fileSize}</span>
                                                <span>{resource.downloads} downloads</span>
                                            </div>
                                        </div>
                                        <a
                                            href={resource.fileUrl}
                                            download
                                            className="ml-4 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
                                            title="Download"
                                        >
                                            <Download className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Technical Guidelines */}
                {categories.GUIDELINE.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center mb-6">
                            <div className="bg-purple-500 w-1 h-8 mr-4"></div>
                            <h2 className="text-2xl font-bold text-gray-900">Technical Guidelines</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {categories.GUIDELINE.map((resource) => (
                                <div key={resource.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
                                            {resource.description && (
                                                <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                                            )}
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span>{resource.fileType}</span>
                                                <span>{resource.fileSize}</span>
                                                <span>{resource.downloads} downloads</span>
                                            </div>
                                        </div>
                                        <a
                                            href={resource.fileUrl}
                                            download
                                            className="ml-4 bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700"
                                            title="Download"
                                        >
                                            <Download className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Maps */}
                {categories.MAP.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center mb-6">
                            <div className="bg-orange-500 w-1 h-8 mr-4"></div>
                            <h2 className="text-2xl font-bold text-gray-900">Maps & GIS Data</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {categories.MAP.map((resource) => (
                                <div key={resource.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
                                            {resource.description && (
                                                <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                                            )}
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span>{resource.fileType}</span>
                                                <span>{resource.fileSize}</span>
                                                <span>{resource.downloads} downloads</span>
                                            </div>
                                        </div>
                                        <a
                                            href={resource.fileUrl}
                                            download
                                            className="ml-4 bg-orange-600 text-white p-3 rounded-lg hover:bg-orange-700"
                                            title="Download"
                                        >
                                            <Download className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* No Resources */}
                {resources.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Resources Available</h3>
                        <p className="text-gray-500">Resources will be available soon.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
