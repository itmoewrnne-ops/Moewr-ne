import { Card, CardContent } from "@/components/ui/card"

export function StatsSkeleton() {
    return (
        <section className="py-8 bg-gradient-to-r from-blue-900 to-blue-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="text-center animate-pulse">
                            <div className="w-8 h-8 bg-white/20 rounded-full mx-auto mb-2"></div>
                            <div className="h-6 bg-white/20 rounded w-16 mx-auto mb-1"></div>
                            <div className="h-3 bg-white/20 rounded w-20 mx-auto"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function EventsSkeleton() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
                    <div className="h-4 w-64 bg-gray-200 rounded mx-auto animate-pulse"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-lg p-6 shadow-md animate-pulse">
                            <div className="w-20 h-6 bg-blue-100 rounded-full mb-3"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function LeadershipSkeleton() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
                    <div className="h-4 w-64 bg-gray-200 rounded mx-auto animate-pulse"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
                            <div className="h-40 bg-gray-200 flex items-center justify-center">
                                <div className="w-24 h-24 rounded-full bg-gray-300"></div>
                            </div>
                            <div className="p-6 text-center">
                                <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-3"></div>
                                <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                                <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function AnnouncementsSkeleton() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="h-8 w-64 bg-gray-200 rounded mx-auto animate-pulse"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <Card key={i} className="overflow-hidden animate-pulse">
                            <div className="h-48 bg-gray-200"></div>
                            <CardContent className="p-6">
                                <div className="flex gap-2 mb-3">
                                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                                </div>
                                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function PartnersSkeleton() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="w-full aspect-[4/3] bg-gray-100 rounded-lg animate-pulse"></div>
                    ))}
                </div>
            </div>
        </section>
    )
}
