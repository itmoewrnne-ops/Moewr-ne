'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Target, Eye, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/components/LanguageProvider'

export function VisionMissionCards() {
    const { t } = useLanguage()
    return (
        <section className="py-12 -mt-32 md:-mt-24 relative z-10 bg-transparent">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-6 md:gap-8 md:grid-cols-3">
                    {/* Vision Card */}
                    <Card className="bg-white border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500 group overflow-hidden rounded-xl">
                        <div className="relative bg-gradient-to-br from-blue-50/40 via-blue-50/20 to-white p-8">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100/20 rounded-full -mr-12 -mt-12 blur-2xl"></div>
                            <div className="relative">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-500 border border-blue-100/50">
                                    <Eye className="h-10 w-10 text-blue-400" strokeWidth={2} />
                                </div>
                            </div>
                        </div>
                        <CardHeader className="pb-4 px-6">
                            <h3 className="text-2xl font-bold text-blue-500 mb-3 group-hover:text-blue-600 transition-colors">{t.visionMission.vision}</h3>
                        </CardHeader>
                        <CardContent className="pt-0 px-6 pb-6">
                            <p className="text-gray-600 leading-relaxed mb-6 text-base">
                                {t.visionMission.visionText}
                            </p>
                            <Link 
                                href="/about/vision-mission"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-300 group-hover:translate-x-1"
                            >
                                <span>{t.visionMission.moreDetails}</span>
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Mission Card */}
                    <Card className="bg-white border border-gray-100 hover:border-green-200 hover:shadow-xl transition-all duration-500 group overflow-hidden rounded-xl">
                        <div className="relative bg-gradient-to-br from-green-50/40 via-green-50/20 to-white p-8">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-green-100/20 rounded-full -mr-12 -mt-12 blur-2xl"></div>
                            <div className="relative">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-green-50/50 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-500 border border-green-100/50">
                                    <Target className="h-10 w-10 text-green-400" strokeWidth={2} />
                                </div>
                            </div>
                        </div>
                        <CardHeader className="pb-4 px-6">
                            <h3 className="text-2xl font-bold text-green-500 mb-3 group-hover:text-green-600 transition-colors">{t.visionMission.mission}</h3>
                        </CardHeader>
                        <CardContent className="pt-0 px-6 pb-6">
                            <p className="text-gray-600 leading-relaxed mb-6 text-base">
                                {t.visionMission.missionText}
                            </p>
                            <Link 
                                href="/about/vision-mission"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-green-500 hover:to-green-600 transition-all duration-300 group-hover:translate-x-1"
                            >
                                <span>{t.visionMission.moreDetails}</span>
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Value Card */}
                    <Card className="bg-white border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-500 group overflow-hidden rounded-xl">
                        <div className="relative bg-gradient-to-br from-purple-50/40 via-purple-50/20 to-white p-8">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100/20 rounded-full -mr-12 -mt-12 blur-2xl"></div>
                            <div className="relative">
                                <div className="w-20 h-20 bg-gradient-to-br from-purple-50 to-purple-50/50 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-500 border border-purple-100/50">
                                    <CheckCircle className="h-10 w-10 text-purple-400" strokeWidth={2} />
                                </div>
                            </div>
                        </div>
                        <CardHeader className="pb-4 px-6">
                            <h3 className="text-2xl font-bold text-purple-500 mb-3 group-hover:text-purple-600 transition-colors">{t.visionMission.value}</h3>
                        </CardHeader>
                        <CardContent className="pt-0 px-6 pb-6">
                            <p className="text-gray-600 leading-relaxed mb-6 text-base">
                                {t.visionMission.valueText}
                            </p>
                            <Link 
                                href="/about/vision-mission"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-400 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-300 group-hover:translate-x-1"
                            >
                                <span>{t.visionMission.moreDetails}</span>
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
