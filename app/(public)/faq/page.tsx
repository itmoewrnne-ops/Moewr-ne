import { Metadata } from 'next'
import { HelpCircle, Search } from 'lucide-react'

export const metadata: Metadata = {
    title: 'FAQs | Ministry of Water',
    description: 'Frequently asked questions about our services and operations.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getFAQs() {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()

    try {
        const faqs = await prisma.fAQ.findMany({
            where: {
                active: true,
            },
            orderBy: {
                order: 'asc',
            },
        })

        await prisma.$disconnect()
        return faqs
    } catch (error) {
        console.error('Error fetching FAQs:', error)
        await prisma.$disconnect()
        return []
    }
}

export default async function FAQPage() {
    const faqs = await getFAQs()

    const categories = {
        GENERAL: faqs.filter(f => f.category === 'GENERAL'),
        SERVICES: faqs.filter(f => f.category === 'SERVICES'),
        PROJECTS: faqs.filter(f => f.category === 'PROJECTS'),
        CAREERS: faqs.filter(f => f.category === 'CAREERS'),
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center mb-4">
                        <HelpCircle className="w-8 h-8 mr-3" />
                        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
                    </div>
                    <p className="text-xl text-teal-100 max-w-3xl">
                        Find answers to common questions about our services and operations
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* General Questions */}
                {categories.GENERAL.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center mb-6">
                            <div className="bg-blue-500 w-1 h-8 mr-4"></div>
                            <h2 className="text-2xl font-bold text-gray-900">General Questions</h2>
                        </div>
                        <div className="space-y-4">
                            {categories.GENERAL.map((faq) => (
                                <div key={faq.id} className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start">
                                        <HelpCircle className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-1" />
                                        {faq.question}
                                    </h3>
                                    <p className="text-gray-700 ml-7">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Services Questions */}
                {categories.SERVICES.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center mb-6">
                            <div className="bg-green-500 w-1 h-8 mr-4"></div>
                            <h2 className="text-2xl font-bold text-gray-900">Services</h2>
                        </div>
                        <div className="space-y-4">
                            {categories.SERVICES.map((faq) => (
                                <div key={faq.id} className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start">
                                        <HelpCircle className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-1" />
                                        {faq.question}
                                    </h3>
                                    <p className="text-gray-700 ml-7">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects Questions */}
                {categories.PROJECTS.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center mb-6">
                            <div className="bg-purple-500 w-1 h-8 mr-4"></div>
                            <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
                        </div>
                        <div className="space-y-4">
                            {categories.PROJECTS.map((faq) => (
                                <div key={faq.id} className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start">
                                        <HelpCircle className="w-5 h-5 mr-2 text-purple-600 flex-shrink-0 mt-1" />
                                        {faq.question}
                                    </h3>
                                    <p className="text-gray-700 ml-7">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Careers Questions */}
                {categories.CAREERS.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center mb-6">
                            <div className="bg-orange-500 w-1 h-8 mr-4"></div>
                            <h2 className="text-2xl font-bold text-gray-900">Careers</h2>
                        </div>
                        <div className="space-y-4">
                            {categories.CAREERS.map((faq) => (
                                <div key={faq.id} className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start">
                                        <HelpCircle className="w-5 h-5 mr-2 text-orange-600 flex-shrink-0 mt-1" />
                                        {faq.question}
                                    </h3>
                                    <p className="text-gray-700 ml-7">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Contact Section */}
                <section className="bg-teal-50 border-l-4 border-teal-600 p-6 rounded-r-lg">
                    <h3 className="font-semibold text-teal-900 mb-2">Still have questions?</h3>
                    <p className="text-teal-800 mb-4">
                        If you couldn&apos;t find the answer you&apos;re looking for, please contact us or submit your feedback.
                    </p>
                    <div className="flex gap-4">
                        <a
                            href="/contact"
                            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
                        >
                            Contact Us
                        </a>
                        <a
                            href="/feedback"
                            className="bg-white text-teal-600 border border-teal-600 px-6 py-2 rounded-lg hover:bg-teal-50"
                        >
                            Submit Feedback
                        </a>
                    </div>
                </section>

                {/* No FAQs */}
                {faqs.length === 0 && (
                    <div className="text-center py-12">
                        <HelpCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No FAQs Available</h3>
                        <p className="text-gray-500">FAQs will be available soon.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
