import { PrismaClient } from '@prisma/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Mail, Phone } from 'lucide-react'

async function getLeadership() {
    const prisma = new PrismaClient()
    try {
        const leadership = await prisma.leadership.findMany({
            where: { active: true },
            orderBy: { order: 'asc' },
        })
        await prisma.$disconnect()
        return leadership
    } catch (error) {
        console.error('Error fetching leadership:', error)
        await prisma.$disconnect()
        return []
    }
}

export default async function LeadershipPage() {
    const leadership = await getLeadership()

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
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-blue-900 text-white py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">Leadership</h1>
                    <p className="text-xl text-gray-200">
                        Meet the team leading our ministry
                    </p>
                </div>
            </div>

            {/* Leadership Team */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {leadership.map((leader) => (
                        <Card key={leader.id} className="overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
                            {/* Image Area */}
                            <div className="aspect-square relative bg-gray-100 flex items-center justify-center">
                                {leader.image ? (
                                    <img
                                        src={leader.image}
                                        alt={leader.name}
                                        className="w-3/4 h-3/4 object-contain"
                                    />
                                ) : (
                                    <div className={`w-3/4 h-3/4 ${getRoleColor(leader.position)} flex items-center justify-center rounded-lg`}>
                                        <span className="text-white text-8xl font-medium tracking-tighter opacity-90">
                                            {getInitials(leader.name)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <CardHeader>
                                <CardTitle className="text-xl">{leader.name}</CardTitle>
                                <p className={`font-semibold ${leader.position.toLowerCase().includes('minister') && !leader.position.toLowerCase().includes('deputy')
                                    ? 'text-blue-700'
                                    : leader.position.toLowerCase().includes('deputy')
                                        ? 'text-green-700'
                                        : 'text-red-700'
                                    }`}>
                                    {leader.position}
                                </p>
                            </CardHeader>

                            <CardContent className="flex-1 flex flex-col">
                                {leader.bio && (
                                    <p className="text-gray-600 text-sm mb-6 flex-1">{leader.bio}</p>
                                )}

                                <div className="space-y-2 mt-auto pt-4 border-t">
                                    {leader.email && (
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Mail className="w-4 h-4" />
                                            <span>{leader.email}</span>
                                        </div>
                                    )}
                                    {leader.phone && (
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Phone className="w-4 h-4" />
                                            <span>{leader.phone}</span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {leadership.length === 0 && (
                    <div className="text-center py-12">
                        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Leadership profiles coming soon.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
