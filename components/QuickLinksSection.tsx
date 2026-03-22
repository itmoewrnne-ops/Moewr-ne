'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'

interface QuickLink {
    id: string
    title: string
    href: string
    icon: string
    order: number
}

export function QuickLinksSection() {
    const [links, setLinks] = useState<QuickLink[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchLinks()
    }, [])

    const fetchLinks = async () => {
        try {
            const response = await fetch('/api/quick-links')
            if (response.ok) {
                const data = await response.json()
                console.log(`✅ Quick links fetched: ${data.length} links`)
                setLinks(data)
            } else {
                console.error(`❌ Failed to fetch quick links: ${response.status} ${response.statusText}`)
                const errorData = await response.json().catch(() => ({}))
                console.error('Error details:', errorData)
            }
        } catch (error) {
            console.error('❌ Error fetching quick links:', error)
        } finally {
            setLoading(false)
        }
    }

    const getIcon = (iconName: string) => {
        const IconComponent = (Icons as any)[iconName]
        return IconComponent ? IconComponent : Icons.FileText
    }

    if (loading) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Quick Access</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    if (links.length === 0) {
        return null
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Quick Access</h2>
                </div>

                {/* Quick Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {links.map((link) => {
                        const IconComponent = getIcon(link.icon)
                        return (
                            <Link key={link.id} href={link.href}>
                                <div className="group bg-white rounded-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-500 cursor-pointer">
                                    {/* Icon */}
                                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                        <IconComponent className="h-8 w-8 text-blue-600" />
                                    </div>
                                    {/* Title */}
                                    <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {link.title}
                                    </p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
