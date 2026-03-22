import { Metadata } from 'next'
import { FileText, Award, Droplet, Download, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Online Services | Ministry of Water',
    description: 'Access online services including registrations, licenses, and applications.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

const iconMap: Record<string, any> = {
    FileText,
    Award,
    Droplet,
    Download,
    ExternalLink,
}

async function getOnlineServices() {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()

    try {
        const services = await prisma.onlineService.findMany({
            where: {
                active: true,
            },
            orderBy: {
                order: 'asc',
            },
        })

        await prisma.$disconnect()
        return services
    } catch (error) {
        console.error('Error fetching online services:', error)
        await prisma.$disconnect()
        return []
    }
}

export default async function OnlineServicesPage() {
    const services = await getOnlineServices()

    const categories = {
        REGISTRATION: services.filter(s => s.category === 'REGISTRATION'),
        LICENSE: services.filter(s => s.category === 'LICENSE'),
        APPLICATION: services.filter(s => s.category === 'APPLICATION'),
        FORM: services.filter(s => s.category === 'FORM'),
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center mb-4">
                        <FileText className="w-8 h-8 mr-3" />
                        <h1 className="text-4xl font-bold">Online Services</h1>
                    </div>
                    <p className="text-xl text-green-100 max-w-3xl">
                        Access our online services for registrations, licenses, and applications
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Quick Links */}
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Quick Access</h3>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/online-services/track"
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                        >
                            Track Application
                            <ExternalLink className="w-4 h-4 ml-1" />
                        </Link>
                        <Link
                            href="/online-services/apply"
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                        >
                            Submit Application
                            <ExternalLink className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </div>

                {/* Registrations */}
                {categories.REGISTRATION.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center mb-6">
                            <div className="bg-blue-500 w-1 h-8 mr-4"></div>
                            <h2 className="text-2xl font-bold text-gray-900">Registrations</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categories.REGISTRATION.map((service) => {
                                const Icon = service.icon ? iconMap[service.icon] || FileText : FileText
                                return (
                                    <div key={service.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                        <div className="flex items-start mb-4">
                                            <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                                <Icon className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                                                <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                                                {service.requirements && (
                                                    <div className="mb-3">
                                                        <p className="text-xs font-semibold text-gray-700 mb-1">Requirements:</p>
                                                        <p className="text-xs text-gray-600">{service.requirements}</p>
                                                    </div>
                                                )}
                                                <Link
                                                    href="/online-services/apply"
                                                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                                                >
                                                    Apply Now
                                                    <ExternalLink className="w-3 h-3 ml-1" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                )}

                {/* Licenses */}
                {categories.LICENSE.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center mb-6">
                            <div className="bg-green-500 w-1 h-8 mr-4"></div>
                            <h2 className="text-2xl font-bold text-gray-900">Licenses</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categories.LICENSE.map((service) => {
                                const Icon = service.icon ? iconMap[service.icon] || Award : Award
                                return (
                                    <div key={service.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                        <div className="flex items-start mb-4">
                                            <div className="bg-green-100 p-3 rounded-lg mr-4">
                                                <Icon className="w-6 h-6 text-green-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                                                <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                                                {service.requirements && (
                                                    <div className="mb-3">
                                                        <p className="text-xs font-semibold text-gray-700 mb-1">Requirements:</p>
                                                        <p className="text-xs text-gray-600">{service.requirements}</p>
                                                    </div>
                                                )}
                                                <Link
                                                    href="/online-services/apply"
                                                    className="inline-flex items-center text-green-600 hover:text-green-800 font-medium text-sm"
                                                >
                                                    Apply Now
                                                    <ExternalLink className="w-3 h-3 ml-1" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                )}

                {/* Applications */}
                {categories.APPLICATION.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center mb-6">
                            <div className="bg-purple-500 w-1 h-8 mr-4"></div>
                            <h2 className="text-2xl font-bold text-gray-900">Applications</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categories.APPLICATION.map((service) => {
                                const Icon = service.icon ? iconMap[service.icon] || Droplet : Droplet
                                return (
                                    <div key={service.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                        <div className="flex items-start mb-4">
                                            <div className="bg-purple-100 p-3 rounded-lg mr-4">
                                                <Icon className="w-6 h-6 text-purple-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                                                <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                                                {service.requirements && (
                                                    <div className="mb-3">
                                                        <p className="text-xs font-semibold text-gray-700 mb-1">Requirements:</p>
                                                        <p className="text-xs text-gray-600">{service.requirements}</p>
                                                    </div>
                                                )}
                                                <Link
                                                    href="/online-services/apply"
                                                    className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium text-sm"
                                                >
                                                    Apply Now
                                                    <ExternalLink className="w-3 h-3 ml-1" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                )}

                {/* Downloadable Forms */}
                {categories.FORM.length > 0 && (
                    <section>
                        <div className="flex items-center mb-6">
                            <div className="bg-orange-500 w-1 h-8 mr-4"></div>
                            <h2 className="text-2xl font-bold text-gray-900">Downloadable Forms</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categories.FORM.map((service) => (
                                <div key={service.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start mb-4">
                                        <div className="bg-orange-100 p-3 rounded-lg mr-4">
                                            <Download className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                                            <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                                            {service.documentUrl && (
                                                <a
                                                    href={service.documentUrl}
                                                    download
                                                    className="inline-flex items-center text-orange-600 hover:text-orange-800 font-medium text-sm"
                                                >
                                                    Download Form
                                                    <Download className="w-3 h-3 ml-1" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* No Services */}
                {services.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Services Available</h3>
                        <p className="text-gray-500">Online services will be available soon.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
