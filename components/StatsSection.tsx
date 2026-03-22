import * as Icons from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { getLocale } from '@/lib/locale'
import { getTranslations } from '@/lib/translations'

export const revalidate = 60

async function getStats() {
    try {
        const stats = await prisma.statistic.findMany({
            where: { active: true },
            orderBy: { order: 'asc' },
        })
        return stats
    } catch (error) {
        console.error('Error fetching statistics:', error)
        return []
    }
}

const statTitleKeys: Record<string, 'waterCoverage' | 'activeProjects' | 'peopleServed' | 'budgetUtilization'> = {
    'Water Coverage': 'waterCoverage',
    'Active Projects': 'activeProjects',
    'People Served': 'peopleServed',
    'Budget Utilization': 'budgetUtilization',
}

export async function StatsSection() {
    const [stats, locale] = await Promise.all([getStats(), getLocale()])
    const t = getTranslations(locale)

    const getIcon = (iconName: string | null) => {
        if (!iconName) return Icons.BarChart
        const IconComponent = (Icons as any)[iconName]
        return IconComponent ? IconComponent : Icons.BarChart
    }

    const getIconColor = (index: number) => {
        const colors = [
            'text-orange-500',
            'text-blue-400',
            'text-green-500',
            'text-purple-500',
            'text-yellow-500',
            'text-red-500',
        ]
        return colors[index % colors.length]
    }

    // Default stats if database is empty
    const defaultStats = [
        { id: '1', value: '68', title: 'Water Coverage', icon: 'Droplet', order: 1, active: true },
        { id: '2', value: '42', title: 'Active Projects', icon: 'Briefcase', order: 2, active: true },
        { id: '3', value: '2.5M', title: 'People Served', icon: 'Users', order: 3, active: true },
        { id: '4', value: '87', title: 'Budget Utilization', icon: 'DollarSign', order: 4, active: true },
    ]

    const displayStats = stats.length > 0 ? stats : defaultStats

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />

            <div className="relative container mx-auto px-4 max-w-7xl">
                {/* Section title */}
                <div className="text-center mb-14">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                        {t.stats.ourImpact}
                    </h2>
                    <div className="w-16 h-1 bg-white/40 rounded-full mx-auto mb-3" />
                    <p className="text-blue-100/90 text-sm md:text-base max-w-xl mx-auto">
                        {t.stats.keyAchievements}
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {displayStats.slice(0, 4).map((stat, index) => {
                        const IconComponent = getIcon(stat.icon)
                        const colorClass = getIconColor(index)

                        return (
                            <div
                                key={stat.id || `stat-${index}`}
                                className="group"
                            >
                                <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 hover:bg-white/15 hover:border-white/30 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1 transition-all duration-300 h-full">
                                    {/* Icon container */}
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-5 bg-white/15 group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300">
                                        <IconComponent
                                            className={`w-7 h-7 md:w-8 md:h-8 ${colorClass} drop-shadow-md`}
                                            strokeWidth={2.5}
                                        />
                                    </div>

                                    {/* Number */}
                                    <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-2 tracking-tight">
                                        {stat.value}
                                    </div>

                                    {/* Label */}
                                    <div className="text-blue-100/95 text-xs md:text-sm uppercase tracking-widest font-semibold">
                                        {(statTitleKeys[stat.title] ? t.stats[statTitleKeys[stat.title]] : stat.title).toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
