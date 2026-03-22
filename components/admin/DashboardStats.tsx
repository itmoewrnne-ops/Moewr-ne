import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Wrench, Briefcase, FileText, Newspaper, Calendar } from "lucide-react";

async function getStats() {
    // Parallel data fetching
    const [
        deptCount,
        serviceCount,
        projectCount,
        tenderCount,
        newsCount,
        eventCount
    ] = await Promise.all([
        prisma.department.count(),
        prisma.service.count(),
        prisma.project.count({ where: { status: 'ONGOING' } }),
        prisma.tender.count({ where: { status: 'OPEN' } }),
        prisma.news.count(),
        prisma.event.count({ where: { status: 'UPCOMING' } })
    ])

    return {
        deptCount,
        serviceCount,
        projectCount,
        tenderCount,
        newsCount,
        eventCount
    }
}

export default async function DashboardStats() {
    const stats = await getStats()

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-blue-50/50 border-blue-100/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.deptCount}</div>
                    <p className="text-xs text-muted-foreground">Operational departments</p>
                </CardContent>
            </Card>
            <Card className="bg-blue-50/50 border-blue-100/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Services</CardTitle>
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.serviceCount}</div>
                    <p className="text-xs text-muted-foreground">Public services available</p>
                </CardContent>
            </Card>
            <Card className="bg-blue-50/50 border-blue-100/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ongoing Projects</CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.projectCount}</div>
                    <p className="text-xs text-muted-foreground">Currently in progress</p>
                </CardContent>
            </Card>
            <Card className="bg-blue-50/50 border-blue-100/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Open Tenders</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.tenderCount}</div>
                    <p className="text-xs text-muted-foreground">Active procurement opportunities</p>
                </CardContent>
            </Card>
            <Card className="bg-blue-50/50 border-blue-100/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">News Articles</CardTitle>
                    <Newspaper className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.newsCount}</div>
                    <p className="text-xs text-muted-foreground">Total published articles</p>
                </CardContent>
            </Card>
            <Card className="bg-blue-50/50 border-blue-100/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.eventCount}</div>
                    <p className="text-xs text-muted-foreground">Scheduled events</p>
                </CardContent>
            </Card>
        </div>
    )
}
