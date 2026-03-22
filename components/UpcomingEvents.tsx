import { Calendar, MapPin, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { format } from 'date-fns'
import { prisma } from '@/lib/prisma'

export const revalidate = 60

interface UpcomingEventsProps {
    limit?: number
}

async function getUpcomingEvents(limit: number = 3) {
    try {
        const now = new Date()

        // Get upcoming events
        const events = await prisma.event.findMany({
            where: {
                published: true,
                startDate: {
                    gte: now,
                },
            },
            orderBy: {
                startDate: 'asc',
            },
            take: limit,
        })

        return events
    } catch (error) {
        console.error('Error fetching events:', error)
        return []
    }
}

export default async function UpcomingEvents({ limit = 3 }: UpcomingEventsProps) {
    const events = await getUpcomingEvents(limit)

    if (events.length === 0) {
        return null
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Events</h2>
                    <p className="text-gray-600">Join us at our upcoming events and conferences</p>
                    <Link
                        href="/events"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mt-4"
                    >
                        View All Events
                        <Calendar className="w-4 h-4 ml-2" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <Link
                            key={event.id}
                            href={`/events/${event.id}`}
                            className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="mb-3">
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                                    {event.category}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                                {event.title}
                            </h3>
                            <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>{format(new Date(event.startDate), 'MMM dd, yyyy')}</span>
                            </div>
                            {event.location && (
                                <p className="text-sm text-gray-500 mt-2">{event.location}</p>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
