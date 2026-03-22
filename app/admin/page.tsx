import { Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardStats from '@/components/admin/DashboardStats'
import DashboardSkeleton from '@/components/admin/DashboardSkeleton'

export const revalidate = 30 // Revalidate every 30 seconds

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>

            <Suspense fallback={<DashboardSkeleton />}>
                <DashboardStats />
            </Suspense>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-blue-50/50 border-blue-100/50">
                    <CardHeader>
                        <CardTitle>System Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b pb-2">
                                <span className="text-sm font-medium">Database Connection</span>
                                <span className="text-sm text-green-600 font-bold">Connected</span>
                            </div>
                            <div className="flex items-center justify-between border-b pb-2">
                                <span className="text-sm font-medium">API Status</span>
                                <span className="text-sm text-green-600 font-bold">Operational</span>
                            </div>
                            <div className="flex items-center justify-between border-b pb-2">
                                <span className="text-sm font-medium">File Storage</span>
                                <span className="text-sm text-green-600 font-bold">Ready</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Last Backup</span>
                                <span className="text-sm text-gray-500">Today, 04:00 AM</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3 bg-blue-50/50 border-blue-100/50">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <a href="/admin/news" className="block w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-sm font-medium transition-colors cursor-pointer">
                            + Post New Article
                        </a>
                        <a href="/admin/projects" className="block w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-sm font-medium transition-colors cursor-pointer">
                            + Add New Project
                        </a>
                        <a href="/admin/tenders" className="block w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-sm font-medium transition-colors cursor-pointer">
                            + Publish Tender
                        </a>
                        <a href="/admin/events" className="block w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-sm font-medium transition-colors cursor-pointer">
                            + Schedule Event
                        </a>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
