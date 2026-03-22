'use client'

import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'

interface NewsArticle {
    id: string
    title: string
    date: Date
    category: string
    image: string | null
    images: string | null
}

interface AnnouncementsSectionClientProps {
    articles: NewsArticle[]
}

export function AnnouncementsSectionClient({ articles }: AnnouncementsSectionClientProps) {
    // Show only the latest 8 articles
    const displayArticles = articles.slice(0, 8)

    if (displayArticles.length === 0) return null

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent via-green-500 to-green-500"></div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                            Our Recent News Articles
                        </h2>
                        <div className="h-px w-16 bg-gradient-to-l from-transparent via-green-500 to-green-500"></div>
                    </div>
                </div>

                {/* Articles Grid - 3 cards per row, wider & more beautiful */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {displayArticles.map((article) => {
                        // Get first image (featured image or first from images array)
                        let allImages: string[] = []
                        try {
                            if (article.images) {
                                allImages = JSON.parse(article.images)
                            }
                            if (article.image && !allImages.includes(article.image)) {
                                allImages = [article.image, ...allImages]
                            }
                        } catch (e) {
                            if (article.image) {
                                allImages = [article.image]
                            }
                        }
                        const firstImage = allImages.length > 0 ? allImages[0] : null

                        return (
                            <Link key={article.id} href={`/news/${article.id}`}>
                                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer h-full bg-white border-2 border-gray-100 hover:border-gray-300 hover:shadow-gray-200/50 flex flex-col rounded-xl">
                                    {/* Image Section - Top */}
                                    <div className="relative w-full aspect-[4/3] min-h-[220px] overflow-hidden bg-gradient-to-br from-blue-50 to-gray-100">
                                        {firstImage ? (
                                            <Image
                                                src={firstImage}
                                                alt={article.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-gray-200 flex items-center justify-center">
                                                <span className="text-gray-400 text-sm">No Image</span>
                                            </div>
                                        )}
                                        {/* Category Badge Overlay */}
                                        <div className="absolute top-5 left-5">
                                            <span className="px-4 py-2 text-sm font-bold text-white bg-green-600 rounded-full shadow-lg uppercase tracking-wider">
                                                {article.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Section - Below Image */}
                                    <CardContent className="flex flex-col justify-between bg-white p-6 lg:p-8 flex-grow">
                                        <div>
                                            {/* Date */}
                                            <div className="mb-3">
                                                <span className="text-sm text-gray-500 uppercase font-semibold tracking-wide">
                                                    {format(new Date(article.date), 'dd MMM, yyyy')}
                                                </span>
                                            </div>
                                            
                                            {/* Title - Green Color */}
                                            <h3 className="text-lg lg:text-xl font-bold text-gray-900 uppercase leading-snug group-hover:text-gray-800 transition-colors mb-5 line-clamp-3">
                                                {article.title}
                                            </h3>
                                        </div>

                                        {/* Beautiful Button */}
                                        <div className="mt-auto pt-2">
                                            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 group-hover:translate-x-1">
                                                <span>Read More</span>
                                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                    )
                    })}
                </div>

                {/* View All Link */}
                <div className="text-center mt-12">
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 transition-all duration-300"
                    >
                        View All News Articles
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
