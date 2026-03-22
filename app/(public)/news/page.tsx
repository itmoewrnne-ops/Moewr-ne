import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function NewsPage() {
    const news = await prisma.news.findMany({
        where: { published: true },
        orderBy: { date: 'desc' }
    })

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">News & Media</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Latest updates, press releases, and announcements from the Ministry.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {news.map((item) => {
                    // Get first image (featured image or first from images array)
                    let allImages: string[] = []
                    try {
                        if (item.images) {
                            allImages = JSON.parse(item.images)
                        }
                        if (item.image && !allImages.includes(item.image)) {
                            allImages = [item.image, ...allImages]
                        }
                    } catch (e) {
                        if (item.image) {
                            allImages = [item.image]
                        }
                    }
                    const firstImage = allImages.length > 0 ? allImages[0] : null
                    
                    return (
                        <Link href={`/news/${item.id}`} key={item.id}>
                            <Card className="overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 h-full cursor-pointer group">
                                {firstImage && (
                                    <div className="h-48 overflow-hidden relative">
                                        <img 
                                            src={firstImage} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-300" 
                                        />
                                        {allImages.length > 1 && (
                                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-blue-600">
                                                {allImages.length} Images
                                            </div>
                                        )}
                                    </div>
                                )}
                                <CardHeader>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-medium text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded">
                                            {item.category}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {new Date(item.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <CardTitle className="text-xl leading-tight group-hover:text-blue-600 transition-colors font-bold">
                                        {item.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-gray-600 line-clamp-3 leading-relaxed">{item.content}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
