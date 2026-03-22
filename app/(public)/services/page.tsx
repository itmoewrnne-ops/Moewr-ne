import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { ServicesSection } from '@/components/ServicesSection'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ServicesPage() {
    const services = await prisma.service.findMany({
        include: {
            department: true,
        },
    })

    return (
        <div className="flex flex-col min-h-screen">
            <ServicesSection />

            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Service Catalog</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Access government services efficiently. Find what you need below.
                    </p>
                </div>

                <div className="max-w-md mx-auto mb-12 relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input placeholder="Search for a service..." className="pl-10" />
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <Card key={service.id} className="hover:border-blue-500 transition-colors">
                            <CardHeader>
                                <div className="text-xs font-medium text-blue-600 mb-2 uppercase tracking-wider">
                                    {service.department.name}
                                </div>
                                <CardTitle className="text-lg">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4">{service.description}</p>
                                <div className="bg-gray-50 p-3 rounded-md text-sm">
                                    <span className="font-semibold text-gray-900">Requirements:</span>
                                    <p className="text-gray-600 mt-1">{service.requirements || 'None specified'}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
