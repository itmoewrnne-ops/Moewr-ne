import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Calendar, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
    const news = await prisma.news.findUnique({
        where: { id: params.id }
    })

    if (!news || !news.published) {
        notFound()
    }

    // Parse images
    let allImages: string[] = []
    try {
        if (news.images) {
            allImages = JSON.parse(news.images)
        }
        if (news.image && !allImages.includes(news.image)) {
            allImages = [news.image, ...allImages]
        }
    } catch (e) {
        if (news.image) {
            allImages = [news.image]
        }
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link 
                href="/news" 
                className="inline-flex items-center text-blue-600 hover:text-blue-700 hover:underline mb-6 transition-colors"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to News
            </Link>

            <article className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {news.category}
                        </span>
                        <span className="flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            {new Date(news.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4 leading-tight">
                        {news.title}
                    </h1>
                </div>

                {/* Featured Image */}
                {allImages.length > 0 && (
                    <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                        <div className="relative w-full h-[400px] md:h-[500px]">
                            <Image
                                src={allImages[0]}
                                alt={news.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 896px"
                            />
                        </div>
                    </div>
                )}

                {/* Content */}
                <Card className="mb-8 shadow-lg">
                    <CardContent className="p-8 md:p-12">
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                            {news.content.split('\n').map((paragraph, index) => (
                                paragraph.trim() && (
                                    <p key={index} className="mb-4 text-lg">
                                        {paragraph}
                                    </p>
                                )
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Image Gallery */}
                {allImages.length > 1 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <ImageIcon className="h-6 w-6 text-blue-600" />
                            Gallery ({allImages.length} Images)
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {allImages.slice(1).map((img, index) => (
                                <div 
                                    key={index} 
                                    className="relative aspect-video rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group cursor-pointer"
                                >
                                    <Image
                                        src={img}
                                        alt={`${news.title} - Image ${index + 2}`}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Back Button */}
                <div className="mt-8 pt-8 border-t">
                    <Link 
                        href="/news" 
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to All News
                    </Link>
                </div>
            </article>
        </div>
    )
}
