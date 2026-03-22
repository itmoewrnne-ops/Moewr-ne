'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    Building2,
    Wrench,
    Briefcase,
    FileText,
    Newspaper,
    Settings,
    LogOut,
    Image,
    Users,
    Calendar,
    Folder,
    Shield,
    Video
} from 'lucide-react'

const sidebarItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'User Management', href: '/admin/users', icon: Shield },
    { name: 'Hero Slider', href: '/admin/hero-slides', icon: Image },
    { name: 'Featured Videos', href: '/admin/featured-videos', icon: Video },
    { name: 'Quick Links', href: '/admin/quick-links', icon: Folder },
    { name: 'Statistics', href: '/admin/statistics', icon: LayoutDashboard },
    { name: 'Partners', href: '/admin/partners', icon: Users },
    { name: 'Leadership', href: '/admin/leadership', icon: Users },
    { name: 'Departments', href: '/admin/departments', icon: Building2 },
    { name: 'Services', href: '/admin/services', icon: Wrench },
    { name: 'Projects', href: '/admin/projects', icon: Briefcase },
    { name: 'News', href: '/admin/news', icon: Newspaper },
    { name: 'Events', href: '/admin/events', icon: Calendar },
    { name: 'Tenders', href: '/admin/tenders', icon: FileText },
    { name: 'Jobs', href: '/admin/jobs', icon: Briefcase },
]

export function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()

    if (pathname === '/admin/login') {
        return null
    }

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
            router.push('/admin/login')
            router.refresh()
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    return (
        <div className="flex h-full w-64 flex-col border-r bg-gray-900 text-white">
            <div className="flex h-16 items-center justify-center border-b border-gray-800 px-6">
                <span className="text-lg font-bold">Admin Panel</span>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-2">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer",
                                    isActive
                                        ? "bg-gray-800 text-white"
                                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                )}
                            >
                                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div className="border-t border-gray-800 p-4 space-y-2">
                <Link
                    href="/"
                    className="group flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer transition-colors"
                >
                    <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
                    Back to Website
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full group flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-gray-300 hover:bg-red-800 hover:text-white transition-colors cursor-pointer"
                >
                    <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
                    Sign Out
                </button>
            </div>
        </div>
    )
}
