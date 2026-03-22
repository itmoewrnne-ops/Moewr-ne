import { Metadata } from 'next'
import { BarChart3, TrendingUp, Droplet, Users, Briefcase, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Statistics Dashboard | Ministry of Water',
    description: 'Key statistics and data on water sector performance and achievements.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getStatistics() {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()

    try {
        const statistics = await prisma.statistic.findMany({
            orderBy: {
                order: 'asc',
            },
        })

        await prisma.$disconnect()
        return statistics
    } catch (error) {
        console.error('Error fetching statistics:', error)
        await prisma.$disconnect()
        return []
    }
}

const iconMap: Record<string, any> = {
    Droplet,
    Users,
    Briefcase,
    DollarSign,
    TrendingUp,
    BarChart3,
}

export default async function StatisticsPage() {
    const statistics = await getStatistics()

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center mb-4">
                        <BarChart3 className="w-8 h-8 mr-3" />
                        <h1 className="text-4xl font-bold">Statistics Dashboard</h1>
                    </div>
                    <p className="text-xl text-cyan-100 max-w-3xl">
                        Key performance indicators and achievements in the water sector
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Key Metrics */}
                <section className="mb-12">
                    <div className="flex items-center mb-6">
                        <div className="bg-cyan-500 w-1 h-8 mr-4"></div>
                        <h2 className="text-2xl font-bold text-gray-900">Key Metrics {statistics[0]?.year && `(${statistics[0].year})`}</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statistics.map((stat) => {
                            const Icon = stat.icon ? iconMap[stat.icon] || BarChart3 : BarChart3
                            return (
                                <div key={stat.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="bg-cyan-100 p-3 rounded-lg">
                                            <Icon className="w-6 h-6 text-cyan-600" />
                                        </div>
                                        {stat.year && (
                                            <span className="text-xs text-gray-500">{stat.year}</span>
                                        )}
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 mb-1">
                                        {stat.value}{stat.unit}
                                    </div>
                                    <div className="text-gray-600 text-sm">{stat.title}</div>
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* Additional Info */}
                <section className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">About Our Data</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Our statistics are compiled from various sources including field surveys,
                            project reports, and partner organizations. Data is updated regularly to
                            ensure accuracy and relevance.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            For detailed reports and historical data, please visit our Resources Library.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Data Categories</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                                <span className="text-cyan-600 mr-2">•</span>
                                <span>Water Coverage & Access</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-cyan-600 mr-2">•</span>
                                <span>Infrastructure Projects</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-cyan-600 mr-2">•</span>
                                <span>Population Served</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-cyan-600 mr-2">•</span>
                                <span>Budget & Financial Performance</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* No Statistics */}
                {statistics.length === 0 && (
                    <div className="text-center py-12">
                        <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Statistics Available</h3>
                        <p className="text-gray-500">Statistics will be available soon.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
