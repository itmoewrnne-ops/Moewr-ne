import { Metadata } from 'next'
import { BookOpen, Clock, Users, Award } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Training Institute | Ministry of Water',
    description: 'Water Technology Institute - Training and capacity building programs.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getCourses() {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()

    try {
        const courses = await prisma.course.findMany({
            where: {
                status: {
                    in: ['ACTIVE', 'UPCOMING'],
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        await prisma.$disconnect()
        return courses
    } catch (error) {
        console.error('Error fetching courses:', error)
        await prisma.$disconnect()
        return []
    }
}

export default async function TrainingPage() {
    const courses = await getCourses()

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center mb-4">
                        <BookOpen className="w-8 h-8 mr-3" />
                        <h1 className="text-4xl font-bold">Water Technology Institute</h1>
                    </div>
                    <p className="text-xl text-purple-100 max-w-3xl">
                        Building capacity through quality training and research in water resources management
                    </p>
                </div>
            </div>

            {/* Mission & Objectives */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                        <p className="text-gray-700 leading-relaxed">
                            To provide quality training and research in the field of operation & maintenance,
                            Integrated Water Resource Management (IWRM), and water-related technologies to all
                            public and private sectors involved in the water sector.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Objectives</h2>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                                <span className="text-purple-600 mr-2">•</span>
                                <span>Maximize the number of skilled water professionals</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-600 mr-2">•</span>
                                <span>Increase sustainability of water systems</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-600 mr-2">•</span>
                                <span>Enhance skills and knowledge of water technicians</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-600 mr-2">•</span>
                                <span>Empower students with career management skills</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Courses */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <div className="bg-purple-500 w-1 h-8 mr-4"></div>
                            <h2 className="text-2xl font-bold text-gray-900">Available Courses</h2>
                        </div>
                        <Link
                            href="/training/courses"
                            className="text-purple-600 hover:text-purple-800 font-medium"
                        >
                            View All Courses →
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                {course.image && (
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                                            {course.level}
                                        </span>
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                                            {course.category}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-gray-700">
                                            <Clock className="w-4 h-4 mr-2 text-purple-600" />
                                            <span>{course.duration}</span>
                                        </div>
                                        {course.capacity && (
                                            <div className="flex items-center text-sm text-gray-700">
                                                <Users className="w-4 h-4 mr-2 text-purple-600" />
                                                <span>{course.enrolled || 0}/{course.capacity} enrolled</span>
                                            </div>
                                        )}
                                    </div>

                                    <Link
                                        href={`/training/courses/${course.id}`}
                                        className="inline-block w-full text-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {courses.length === 0 && (
                        <div className="text-center py-12">
                            <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Courses Available</h3>
                            <p className="text-gray-500">Check back soon for upcoming training programs.</p>
                        </div>
                    )}
                </section>

                {/* Achievements */}
                <section className="mt-16">
                    <div className="flex items-center mb-6">
                        <div className="bg-green-500 w-1 h-8 mr-4"></div>
                        <h2 className="text-2xl font-bold text-gray-900">Our Achievements</h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-blue-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-1">164+</div>
                            <div className="text-gray-600">Technicians Trained</div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-green-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-1">12+</div>
                            <div className="text-gray-600">Professional Graduates</div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-purple-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-1">8</div>
                            <div className="text-gray-600">Training Batches</div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-orange-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-1">6 months</div>
                            <div className="text-gray-600">Certificate Programs</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
