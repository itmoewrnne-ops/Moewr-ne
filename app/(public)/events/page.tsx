import { Metadata } from 'next'
import { Calendar, MapPin, Clock, Filter } from 'lucide-react'
import EventCard from '@/components/EventCard'

export const metadata: Metadata = {
    title: 'Events | Ministry of Water',
    description: 'Upcoming events, conferences, workshops, and forums organized by the Ministry of Water.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getEvents() {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()

    try {
        const events = await prisma.event.findMany({
            where: {
                published: true,
            },
            orderBy: {
                startDate: 'desc',
            },
        })

        await prisma.$disconnect()
        return events
    } catch (error) {
        console.error('Error fetching events:', error)
        await prisma.$disconnect()
        return []
    }
}

export default async function EventsPage() {
    const events = await getEvents()

    const upcomingEvents = events.filter(e => e.status === 'UPCOMING')
    const ongoingEvents = events.filter(e => e.status === 'ONGOING')
    const completedEvents = events.filter(e => e.status === 'COMPLETED')

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center mb-4">
                        <Calendar className="w-8 h-8 mr-3" />
                        <h1 className="text-4xl font-bold">Events & Calendar</h1>
                    </div>
                    <p className="text-xl text-blue-100 max-w-3xl">
                        Stay updated with our upcoming conferences, workshops, forums, and training programs
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Upcoming Events */}
                {upcomingEvents.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center mb-6">
                            <div className="bg-blue-500 w-1 h-8 mr-4"></div>
                            <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {upcomingEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Ongoing Events */}
                {ongoingEvents.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center mb-6">
                            <div className="bg-green-500 w-1 h-8 mr-4"></div>
                            <h2 className="text-2xl font-bold text-gray-900">Ongoing Events</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {ongoingEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Past Events */}
                {completedEvents.length > 0 && (
                    <section>
                        <div className="flex items-center mb-6">
                            <div className="bg-gray-500 w-1 h-8 mr-4"></div>
                            <h2 className="text-2xl font-bold text-gray-900">Past Events</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {completedEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    </section>
                )}

                {/* No Events */}
                {events.length === 0 && (
                    <div className="text-center py-12">
                        <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Events Available</h3>
                        <p className="text-gray-500">Check back soon for upcoming events and conferences.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
