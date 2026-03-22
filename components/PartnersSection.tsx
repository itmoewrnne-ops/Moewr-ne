import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { Handshake } from 'lucide-react'
import { getLocale } from '@/lib/locale'
import { getTranslations } from '@/lib/translations'

export const revalidate = 60

async function getPartners() {
    try {
        const partners = await prisma.partner.findMany({
            where: { active: true },
            orderBy: { order: 'asc' },
        })
        return partners
    } catch (error) {
        console.error('Error fetching partners:', error)
        return []
    }
}

export async function PartnersSection() {
    const [partners, locale] = await Promise.all([getPartners(), getLocale()])
    const t = getTranslations(locale)

    if (partners.length === 0) return null

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Subtle background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.08)_0%,_transparent_50%)]" />

            <div className="relative container mx-auto px-4 max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 mb-6">
                        <Handshake className="w-7 h-7" strokeWidth={2} />
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        {t.partners.title}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-6" />
                    <p className="text-green-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-semibold tracking-wide">
                        {t.partners.subtitle}
                    </p>
                </div>

                {/* Partners Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {partners.map((partner) => (
                        <div key={partner.id} className="group">
                            <a
                                href={partner.website || '#'}
                                target={partner.website ? "_blank" : "_self"}
                                rel={partner.website ? "noopener noreferrer" : ""}
                                className={`block w-full aspect-[4/3] bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-blue-200 flex items-center justify-center p-6 lg:p-8 group-hover:-translate-y-1 group-hover:border-blue-400 group-hover:shadow-blue-100 ${!partner.website && 'cursor-default'}`}
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        fill
                                        className="object-contain transition-all duration-300"
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                                    />
                                </div>
                            </a>
                        </div>
                    ))}
                </div>

                {/* View All Link */}
                <div className="text-center mt-14">
                    <Link
                        href="/about/partners"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
                    >
                        {t.partners.viewAll}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    )
}
