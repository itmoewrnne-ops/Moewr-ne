import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import { getLocale } from '@/lib/locale'
import { getTranslations } from '@/lib/translations'

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DepartmentDetailPage({ params }: { params: { slug: string } }) {
    const locale = await getLocale()
    const t = getTranslations(locale)
    const department = await prisma.department.findUnique({
        where: { slug: params.slug },
        include: {
            services: true,
            projects: true,
        },
    })

    if (!department) {
        notFound()
    }

    // Safely parse functions - handle both JSON strings and plain strings
    let functions: string[] = []
    if (department.functions) {
        try {
            // Try to parse as JSON first
            functions = JSON.parse(department.functions)
        } catch (e) {
            // If parsing fails, treat it as a comma-separated string
            functions = department.functions.split(',').map(f => f.trim()).filter(Boolean)
        }
    }


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative bg-blue-900 text-white py-20">
                {department.image && (
                    <div className="absolute inset-0 overflow-hidden">
                        <img src={department.image} alt={department.name} className="w-full h-full object-cover opacity-20" />
                    </div>
                )}
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">{department.name}</h1>
                    {department.description && (
                        <p className="text-xl text-gray-200 max-w-3xl">{department.description}</p>
                    )}
                </div>
            </div>

            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Vision */}
                        {department.headBio && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t.department.vision}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700 leading-relaxed">{department.headBio}</p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Mission */}
                        {department.mandate && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t.department.mission}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700 leading-relaxed">{department.mandate}</p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Key Functions */}
                        {functions.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t.department.keyFunctions}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="grid gap-4 sm:grid-cols-2">
                                        {functions.map((func: string, index: number) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{func}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}

                        {/* Projects */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.department.ongoingProjects}</h2>
                            <div className="grid gap-6">
                                {department.projects.map((project) => (
                                    <Card key={project.id}>
                                        <CardHeader>
                                            <CardTitle className="text-lg">{project.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-600 mb-2">{project.description}</p>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-medium">
                                                    {project.status}
                                                </span>
                                                {project.location && <span>📍 {project.location}</span>}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                                {department.projects.length === 0 && (
                                    <p className="text-gray-500 italic">{t.department.noProjects}</p>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Services */}
                        <Card>
                            <CardHeader>
                                <CardTitle>{t.department.servicesOffered}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    {department.services.map((service) => (
                                        <li key={service.id} className="border-b pb-4 last:border-0 last:pb-0">
                                            <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                                            <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                                            {service.requirements && (
                                                <p className="text-xs text-gray-500">
                                                    <span className="font-medium">{t.department.req}:</span> {service.requirements}
                                                </p>
                                            )}
                                        </li>
                                    ))}
                                    {department.services.length === 0 && (
                                        <p className="text-gray-500 italic">{t.department.noServices}</p>
                                    )}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
