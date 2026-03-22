"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as Icons from 'lucide-react'

interface Project {
    id: string
    title: string
    description: string
    status: string
    icon: string
    image: string | null
}

interface ProjectsTabsClientProps {
    projects: Project[]
}

export function ProjectsTabsClient({ projects }: ProjectsTabsClientProps) {
    const [activeTab, setActiveTab] = useState("ONGOING");

    const getIcon = (iconName: string) => {
        const IconComponent = (Icons as any)[iconName]
        return IconComponent ? IconComponent : Icons.Droplets
    }

    const getIconColor = (iconName: string) => {
        const colors: Record<string, string> = {
            Droplets: 'text-cyan-500',
            Waves: 'text-blue-400',
            Factory: 'text-blue-600',
            Shield: 'text-blue-500',
            Sprout: 'text-green-500',
            Zap: 'text-yellow-500',
            Building: 'text-gray-600',
            Construction: 'text-orange-500',
            Lightbulb: 'text-yellow-400',
            Wind: 'text-sky-500',
            Sun: 'text-amber-500',
            Battery: 'text-green-600',
        }
        return colors[iconName] || 'text-blue-600'
    }

    const filteredProjects = projects.filter(p => p.status === activeTab)

    const tabs = [
        { key: 'ONGOING', label: 'Ongoing' },
        { key: 'COMPLETED', label: 'Completed' },
        { key: 'UPCOMING', label: 'Upcoming' },
    ]

    return (
        <div className="w-full">
            {/* Tabs */}
            <div className="flex justify-center mb-10">
                <div className="inline-flex rounded-lg bg-white border border-gray-200 p-1 shadow-sm">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-8 py-2.5 text-sm font-semibold rounded-md transition-all duration-200 ${activeTab === tab.key
                                ? "bg-blue-600 text-white shadow-md"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
                    {filteredProjects.map((project) => {
                        const IconComponent = getIcon(project.icon)
                        const iconColor = getIconColor(project.icon)

                        return (
                            <div
                                key={project.id}
                                className="group bg-white rounded-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-500"
                            >
                                {/* Icon */}
                                <div className={`w-14 h-14 mb-4 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors`}>
                                    <IconComponent className={`h-7 w-7 ${iconColor}`} />
                                </div>

                                {/* Title */}
                                <h3 className="text-base font-semibold text-gray-900 mb-4 leading-tight min-h-[3rem]">
                                    {project.title}
                                </h3>

                                {/* Learn More Link */}
                                <Link
                                    href="/projects"
                                    className="text-sm text-blue-600 font-semibold inline-flex items-center hover:text-blue-700 transition-colors"
                                >
                                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="text-center py-12 text-gray-500">
                    <p>No {activeTab.toLowerCase()} projects at this time.</p>
                </div>
            )}
        </div>
    );
}
