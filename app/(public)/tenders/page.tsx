import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Briefcase, Download, Calendar } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function TendersAndJobsPage() {
    const tenders = await prisma.tender.findMany({
        where: { status: 'OPEN' },
        orderBy: { deadline: 'asc' }
    })

    const jobs = await prisma.job.findMany({
        where: { closingDate: { gte: new Date() } },
        orderBy: { closingDate: 'asc' }
    })

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Opportunities</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Current tenders for contractors and job openings for professionals.
                </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
                {/* Tenders Section */}
                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <FileText className="h-6 w-6 text-blue-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Open Tenders</h2>
                    </div>
                    <div className="space-y-4">
                        {tenders.map((tender) => (
                            <Card key={tender.id}>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg">{tender.title}</CardTitle>
                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                            {tender.category}
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            Deadline: {new Date(tender.deadline).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-gray-900">Budget: {tender.budget || 'N/A'}</span>
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download Docs
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        {tenders.length === 0 && (
                            <p className="text-gray-500 italic">No open tenders at the moment.</p>
                        )}
                    </div>
                </section>

                {/* Jobs Section */}
                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <Briefcase className="h-6 w-6 text-green-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Job Vacancies</h2>
                    </div>
                    <div className="space-y-4">
                        {jobs.map((job) => (
                            <Card key={job.id}>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg">{job.title}</CardTitle>
                                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                            {job.type}
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            Closing: {new Date(job.closingDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full">
                                        View Details & Apply
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                        {jobs.length === 0 && (
                            <p className="text-gray-500 italic">No job vacancies available.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}
