import Link from 'next/link'
import { Users } from 'lucide-react'

export const revalidate = 60

async function getLeadership() {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()

    try {
        const leadership = await prisma.leadership.findMany({
            where: { active: true },
            orderBy: {
                order: 'asc',
            },
            take: 4,
        })

        await prisma.$disconnect()
        return leadership
    } catch (error) {
        console.error('Error fetching leadership:', error)
        await prisma.$disconnect()
        return []
    }
}

export async function LeadershipSection() {
    const leaders = await getLeadership()

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    const getRoleColor = (position: string) => {
        const pos = position.toLowerCase()
        if (pos.includes('deputy')) return 'bg-[#008F6A]' // Green
        if (pos.includes('minister')) return 'bg-[#1439B7]' // Blue
        if (pos.includes('secretary') || pos.includes('ps')) return 'bg-[#CC1D1D]' // Red
        return 'bg-gray-600' // Default
    }

    return (
        <section className="py-16 bg-blue-50/30">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Our Leadership
                    </h2>
                    <div className="w-20 h-1 bg-blue-400/50 mx-auto mb-4"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Meet the dedicated leaders guiding our ministry&apos;s vision and mission
                    </p>
                </div>

                {/* Leadership Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {leaders.length === 0 ? (
                        <div className="col-span-full text-center py-12 px-4">
                            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                                Meet the dedicated leaders guiding our ministry&apos;s vision and mission.
                            </p>
                            <Link
                                href="/about/leadership"
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                            >
                                View Leadership
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    ) : leaders.map((leader) => (
                        <div
                            key={leader.id}
                            className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Photo */}
                            <div className={`relative aspect-[3/4] ${getRoleColor(leader.position)} flex items-center justify-center overflow-hidden`}>
                                {leader.image ? (
                                    <img
                                        src={leader.image}
                                        alt={leader.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <span className="text-white text-6xl font-bold tracking-tight opacity-90">
                                        {getInitials(leader.name)}
                                    </span>
                                )}
                            </div>

                            {/* Info */}
                            <div className="p-5">
                                <h3 className="font-bold text-lg text-gray-900 mb-1">
                                    {leader.name}
                                </h3>
                                <p className="text-sm font-semibold text-blue-600 mb-3">
                                    {leader.position}
                                </p>
                                {leader.bio && (
                                    <p className="text-sm text-gray-600 line-clamp-3">
                                        {leader.bio}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Link – only when we have leaders */}
                {leaders.length > 0 && (
                    <div className="text-center mt-10">
                        <Link
                            href="/about/leadership"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                        >
                            View All Leadership
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}
