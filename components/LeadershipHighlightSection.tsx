import { Users } from 'lucide-react'
import { leadershipData } from '@/lib/leadership-data'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getTopLeader() {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()

    try {
        const leaders = await prisma.leadership.findMany({
            where: { active: true },
            orderBy: { order: 'asc' },
            take: 1
        })

        // Prefer DB result, otherwise use first from fallback data
        return leaders[0] ?? leadershipData[0] ?? null
    } catch (error) {
        console.error('Error fetching highlighted leader:', error)
        return leadershipData[0] ?? null
    } finally {
        await prisma.$disconnect()
    }
}

const getInitials = (name: string) =>
    name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

export async function LeadershipHighlightSection() {
    const leader = await getTopLeader()

    if (!leader) {
        return (
            <section className="py-16 bg-gradient-to-b from-green-50 via-white to-white">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-700 mb-4">
                        <Users className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-800">Leadership</h2>
                    <p className="text-gray-600 mt-2">Leadership profiles are being updated.</p>
                </div>
            </section>
        )
    }

    return (
        <section className="py-16 bg-gradient-to-b from-green-50 via-white to-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-10 space-y-3">
                    <p className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold tracking-[0.18em] uppercase">
                        Ministry of Energy and Water Resources · North East State of Somalia
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-green-800 leading-tight">
                        Ministers and Director General of the Ministry of Energy and Water Resources
                    </h2>
                </div>

                <div className="flex justify-center">
                    <div className="bg-white border border-green-100 rounded-2xl shadow-xl overflow-hidden max-w-sm w-full">
                        <div className="relative aspect-[3/4] bg-green-700 flex items-center justify-center">
                            {leader.image ? (
                                <img
                                    src={leader.image}
                                    alt={leader.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-white text-7xl font-bold tracking-tight">
                                    {getInitials(leader.name)}
                                </span>
                            )}
                        </div>
                        <div className="bg-green-600 text-white text-center py-4 space-y-1">
                            <p className="text-xs uppercase tracking-[0.24em] font-semibold">
                                {leader.position}
                            </p>
                            <p className="text-lg font-bold">{leader.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
