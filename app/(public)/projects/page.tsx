import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from 'lucide-react' // Wait, Badge is not in lucide-react. I'll use a simple span or create a Badge component.
// I'll just use a span for now.

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        include: {
            department: true,
        },
    })

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Development Projects</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Tracking the progress of infrastructure and development initiatives across the country.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {projects.map((project) => {
                    const mainImage = project.image || null


                    return (
                        <Card key={project.id} className="overflow-hidden flex flex-col md:flex-row">
                            {mainImage && (
                                <div className="md:w-1/3 h-48 md:h-auto">
                                    <img src={mainImage} alt={project.title} className="w-full h-full object-cover" />
                                </div>
                            )}
                            <div className="flex-1 flex flex-col">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="text-xs font-medium text-blue-600 mb-1 uppercase tracking-wider">
                                                {project.department?.name}
                                            </div>
                                            <CardTitle className="text-xl">{project.title}</CardTitle>
                                        </div>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${project.status === 'ONGOING' ? 'bg-blue-100 text-blue-800' :
                                            project.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                            {project.status}
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-gray-600 mb-4">{project.description}</p>
                                    {project.location && (
                                        <div className="text-sm text-gray-500 mt-auto">
                                            📍 {project.location}
                                        </div>
                                    )}
                                </CardContent>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
