import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage() {
    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Contact Us</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    We are here to serve you. Reach out to us for any inquiries or assistance.
                </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
                {/* Contact Info */}
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Ministry Headquarters</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                                <div>
                                    <p className="font-medium">Address</p>
                                    <p className="text-gray-600">123 Government Road, Capital City</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-blue-600 mt-1" />
                                <div>
                                    <p className="font-medium">Phone</p>
                                    <p className="text-gray-600">+123 456 7890</p>
                                    <p className="text-gray-600">+123 456 7891</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-blue-600 mt-1" />
                                <div>
                                    <p className="font-medium">Email</p>
                                    <p className="text-gray-600">info@mow.gov</p>
                                    <p className="text-gray-600">support@mow.gov</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock className="h-5 w-5 text-blue-600 mt-1" />
                                <div>
                                    <p className="font-medium">Working Hours</p>
                                    <p className="text-gray-600">Mon - Fri: 8:00 AM - 5:00 PM</p>
                                    <p className="text-gray-600">Sat - Sun: Closed</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                        {/* Placeholder Map */}
                        <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-100">
                            Interactive Map Placeholder
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Send us a Message</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="first-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">First name</label>
                                    <Input id="first-name" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="last-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Last name</label>
                                    <Input id="last-name" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                                <Input id="email" type="email" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Subject</label>
                                <Input id="subject" placeholder="Inquiry about..." />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message</label>
                                <Textarea id="message" placeholder="Your message here..." className="min-h-[150px]" />
                            </div>
                            <Button type="submit" className="w-full">Send Message</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
