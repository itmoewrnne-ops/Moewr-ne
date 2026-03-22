import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Briefcase, ArrowLeft, FileText } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function JobDetailPage({ params }: { params: { id: string } }) {
    const job = await prisma.job.findUnique({
        where: { id: params.id }
    })

    if (!job) {
        notFound()
    }

    const isExpired = new Date(job.closingDate) < new Date()

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link href="/careers" className="inline-flex items-center text-blue-600 hover:underline mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Careers
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <CardTitle className="text-3xl mb-3">{job.title}</CardTitle>
                                    <div className="flex items-center gap-4 text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <Briefcase className="h-4 w-4" />
                                            {job.type === 'FULL_TIME' ? 'Full-time' : 'Contract'}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            Deadline: {new Date(job.closingDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                {isExpired && (
                                    <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                                        Closed
                                    </span>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-3">Job Description</h3>
                                <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
                            </div>

                            {job.requirements && (
                                <div>
                                    <h3 className="text-xl font-semibold mb-3">Requirements</h3>
                                    <div className="text-gray-700 whitespace-pre-line">{job.requirements}</div>
                                </div>
                            )}

                            {job.documentUrl && (
                                <div>
                                    <h3 className="text-xl font-semibold mb-3">Job Description Document</h3>
                                    <Button variant="outline" asChild>
                                        <a href={job.documentUrl} target="_blank" rel="noopener noreferrer">
                                            <FileText className="mr-2 h-4 w-4" />
                                            Download Full Job Description (PDF)
                                        </a>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar - Application */}
                <div>
                    <Card className={isExpired ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'}>
                        <CardHeader>
                            <CardTitle>
                                {isExpired ? 'Application Closed' : 'Apply for this Position'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isExpired ? (
                                <p className="text-gray-600">
                                    The application deadline for this position has passed.
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    <p className="text-gray-700">
                                        To apply for this position, please submit your application through our
                                        recruitment portal or send your CV and cover letter to:
                                    </p>
                                    <div className="bg-white p-4 rounded-lg border">
                                        <p className="font-semibold mb-1">Email:</p>
                                        <a href="mailto:recruitment@mowenr.gov.so" className="text-blue-600 hover:underline">
                                            recruitment@mowenr.gov.so
                                        </a>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border">
                                        <p className="font-semibold mb-1">Subject Line:</p>
                                        <p className="text-sm text-gray-600">
                                            Application for {job.title}
                                        </p>
                                    </div>
                                    <Button className="w-full" asChild>
                                        <a href={`mailto:recruitment@mowenr.gov.so?subject=Application for ${encodeURIComponent(job.title)}`}>
                                            Send Application Email
                                        </a>
                                    </Button>
                                    <p className="text-xs text-gray-500 text-center">
                                        Closing Date: {new Date(job.closingDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle className="text-lg">Need Help?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 mb-4">
                                For questions about this position or the application process, please contact our HR department.
                            </p>
                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/contact">Contact HR</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
