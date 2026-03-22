"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Droplets, Zap, CheckCircle, FileText } from "lucide-react";

const services = [
    {
        title: "Water Licensing",
        description: "Regulation and licensing of water service providers.",
        icon: Droplets,
        iconColor: "text-blue-500",
        bgColor: "bg-blue-50",
        href: "/services/water-licensing"
    },
    {
        title: "Energy Certification",
        description: "Certification for electrical contractors and solar installers.",
        icon: Zap,
        iconColor: "text-blue-600",
        bgColor: "bg-blue-50",
        href: "/services/energy-certification"
    },
    {
        title: "Borehole Inspection",
        description: "Technical inspection and approval for drilling.",
        icon: CheckCircle,
        iconColor: "text-blue-500",
        bgColor: "bg-blue-50",
        href: "/services/borehole-inspection"
    },
    {
        title: "Environmental Compliance",
        description: "Ensuring projects meet environmental standards.",
        icon: FileText,
        iconColor: "text-blue-500",
        bgColor: "bg-blue-50",
        href: "/services/environmental-compliance"
    }
];

export function ServicesSection() {
    return (
        <section className="py-16 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                        Our Services & Focus Areas
                    </h2>
                    <p className="text-lg text-gray-600">
                        We are dedicated to providing essential services and regulating the water and energy sectors.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className={`w-12 h-12 rounded-lg ${service.bgColor} flex items-center justify-center mb-4`}>
                                    <service.icon className={`h-6 w-6 ${service.iconColor}`} />
                                </div>
                                <CardTitle className="text-xl font-bold text-gray-900">
                                    {service.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-6">
                                    {service.description}
                                </p>
                                <Link
                                    href={service.href}
                                    className="text-blue-600 font-medium inline-flex items-center hover:underline"
                                >
                                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
