import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { DepartmentsGrid } from '@/components/DepartmentsGrid'

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DepartmentsPage() {
    let departments: Awaited<ReturnType<typeof prisma.department.findMany>> = []
    try {
        departments = await prisma.department.findMany()
        console.log(`✅ Departments page: Found ${departments.length} departments`)
    } catch (error) {
        console.error('❌ Error fetching departments:', error)
    }

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Our Departments</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Explore the various departments working tirelessly to manage our nation&apos;s water, energy, and natural resources.
                </p>
            </div>

            <div className="mb-12">
                <DepartmentsGrid />
            </div>

            {/* Existing dynamic list kept as fallback or for admin managed departments */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {departments.map((dept) => (
                    <Card key={dept.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                        {dept.image && (
                            <div className="h-48 overflow-hidden rounded-t-lg">
                                <img src={dept.image} alt={dept.name} className="w-full h-full object-cover transition-transform hover:scale-105" />
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="text-xl">{dept.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                            <p className="text-gray-600 mb-6 flex-1">{dept.description}</p>
                            <Button asChild className="w-full mt-auto">
                                <Link href={`/departments/${dept.slug}`}>
                                    View Department <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
