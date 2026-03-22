import { Metadata } from 'next'
import { MessageSquare, Send } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Feedback | Ministry of Water',
    description: 'Submit your feedback, suggestions, or complaints.',
}

export default function FeedbackPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center mb-4">
                        <MessageSquare className="w-8 h-8 mr-3" />
                        <h1 className="text-4xl font-bold">Feedback & Complaints</h1>
                    </div>
                    <p className="text-xl text-amber-100 max-w-3xl">
                        We value your feedback. Help us improve our services by sharing your thoughts
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="+252-1-234567"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Feedback Type *
                                </label>
                                <select
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                >
                                    <option value="">Select type</option>
                                    <option value="COMPLAINT">Complaint</option>
                                    <option value="SUGGESTION">Suggestion</option>
                                    <option value="INQUIRY">Inquiry</option>
                                    <option value="COMPLIMENT">Compliment</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="Brief subject of your feedback"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    required
                                    rows={6}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="Please provide details..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 flex items-center justify-center font-medium"
                            >
                                <Send className="w-5 h-5 mr-2" />
                                Submit Feedback
                            </button>
                        </form>
                    </div>

                    {/* Info Box */}
                    <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                        <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
                        <ul className="space-y-2 text-blue-800 text-sm">
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                <span>Your feedback will be reviewed by our team</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                <span>We aim to respond within 5 business days</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                <span>You&apos;ll receive updates via email</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
