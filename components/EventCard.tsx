'use client'

import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react'
import { format } from 'date-fns'

interface Event {
    id: string
    title: string
    description: string
    category: string
    startDate: Date
    endDate?: Date | null
    location?: string | null
    venue?: string | null
    image?: string | null
    registrationUrl?: string | null
    status: string
}

interface EventCardProps {
    event: Event
}

const categoryColors: Record<string, string> = {
    CONFERENCE: 'bg-blue-100 text-blue-800',
    WORKSHOP: 'bg-green-100 text-green-800',
    FORUM: 'bg-purple-100 text-purple-800',
    TRAINING: 'bg-orange-100 text-orange-800',
    LAUNCH: 'bg-pink-100 text-pink-800',
}

const statusColors: Record<string, string> = {
    UPCOMING: 'bg-blue-500',
    ONGOING: 'bg-green-500',
    COMPLETED: 'bg-gray-500',
    CANCELLED: 'bg-red-500',
}

export default function EventCard({ event }: EventCardProps) {
    const startDate = new Date(event.startDate)
    const endDate = event.endDate ? new Date(event.endDate) : null

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Event Image */}
            {event.image && (
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className={`absolute top-4 right-4 ${statusColors[event.status]} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                        {event.status}
                    </div>
                </div>
            )}

            <div className="p-6">
                {/* Category Badge */}
                <div className="mb-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[event.category] || 'bg-gray-100 text-gray-800'}`}>
                        {event.category}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {event.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                    {/* Date */}
                    <div className="flex items-center text-sm text-gray-700">
                        <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                        <span>
                            {format(startDate, 'MMM dd, yyyy')}
                            {endDate && ` - ${format(endDate, 'MMM dd, yyyy')}`}
                        </span>
                    </div>

                    {/* Time */}
                    <div className="flex items-center text-sm text-gray-700">
                        <Clock className="w-4 h-4 mr-2 text-blue-600" />
                        <span>{format(startDate, 'h:mm a')}</span>
                    </div>

                    {/* Location */}
                    {event.location && (
                        <div className="flex items-center text-sm text-gray-700">
                            <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                            <span>
                                {event.location}
                                {event.venue && ` - ${event.venue}`}
                            </span>
                        </div>
                    )}
                </div>

                {/* Registration Link */}
                {event.registrationUrl && event.status === 'UPCOMING' && (
                    <a
                        href={event.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Register Now
                        <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                )}
            </div>
        </div>
    )
}
