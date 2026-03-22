"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
    CloudRain,
    Droplets,
    Wrench,
    Briefcase,
    Monitor,
    ClipboardList,
    Users,
    ArrowRight
} from "lucide-react";

const departments = [
    {
        title: "Energy Department",
        icon: CloudRain,
        color: "text-blue-500",
        href: "/departments/energy"
    },
    {
        title: "Water Resources & Hydrometeorology",
        icon: Droplets,
        color: "text-cyan-500",
        href: "/departments/water-resources"
    },
    {
        title: "Planning and Policy",
        icon: ClipboardList,
        color: "text-green-600",
        href: "/departments/planning-policy"
    },
    {
        title: "Administration and Finance",
        icon: Briefcase,
        color: "text-purple-500",
        href: "/departments/administration-finance"
    },
    {
        title: "Human Resources",
        icon: Users,
        color: "text-rose-500",
        href: "/departments/human-resources"
    },
    {
        title: "ICT",
        icon: Monitor,
        color: "text-indigo-500",
        href: "/departments/information-technology"
    },
    {
        title: "Officer",
        icon: Wrench,
        color: "text-orange-500",
        href: "/departments/officer"
    }
];

export function DepartmentsGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
                <Link key={index} href={dept.href} className="group">
                    <Card className="h-full hover:shadow-md transition-all duration-200 border-gray-100 group-hover:border-blue-100">
                        <CardContent className="p-6 flex items-center space-x-4">
                            <div className={`p-3 rounded-full bg-gray-50 group-hover:bg-white transition-colors`}>
                                <dept.icon className={`h-6 w-6 ${dept.color}`} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {dept.title}
                                </h3>
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100" />
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
