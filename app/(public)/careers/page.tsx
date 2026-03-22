import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Briefcase, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function CareersPage() {
    const jobs = await prisma.job.findMany({
        where: {
            closingDate: {
                gte: new Date() // Only show jobs that haven't closed yet
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                        Explore career opportunities at the Ministry of Water Resources & Energy.
                        Help us build a sustainable future for North East State.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Job Listings */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold mb-6">Current Vacancies</h2>

                        {jobs.length === 0 ? (
                            <Card>
                                <CardContent className="p-12 text-center">
                                    <Briefcase className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                                    <h3 className="text-xl font-semibold mb-2">No Current Openings</h3>
                                    <p className="text-gray-600">
                                        There are no job vacancies at the moment. Please check back later.
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="space-y-6">
                                {jobs.map((job) => (
                                    <Card key={job.id} className="hover:shadow-lg transition-shadow">
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                                                    <div className="flex items-center gap-4 text-sm text-gray-600">
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
                                                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                                                    {job.type === 'FULL_TIME' ? 'Full-time' : 'Contract'}
                                                </span>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>

                                            {job.requirements && (
                                                <div className="mb-4">
                                                    <h4 className="font-semibold mb-2">Requirements:</h4>
                                                    <div className="text-sm text-gray-600 whitespace-pre-line">
                                                        {job.requirements}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex gap-3">
                                                <Button asChild>
                                                    <Link href={`/careers/${job.id}`}>
                                                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                {job.documentUrl && (
                                                    <Button variant="outline" asChild>
                                                        <a href={job.documentUrl} target="_blank" rel="noopener noreferrer">
                                                            Download PDF
                                                        </a>
                                                    </Button>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card className="bg-blue-900 text-white">
                            <CardHeader>
                                <CardTitle>Why Work With Us?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-300">•</span>
                                        <span>Impactful work serving the community</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-300">•</span>
                                        <span>Professional development opportunities</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-300">•</span>
                                        <span>Competitive government benefits</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-300">•</span>
                                        <span>Inclusive and diverse work environment</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Internship Program</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4">
                                    We offer 3-6 month internships for recent graduates in Engineering,
                                    Environmental Science, and ICT.
                                </p>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href="/contact">Learn More</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
