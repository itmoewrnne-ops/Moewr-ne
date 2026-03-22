import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Compass } from "lucide-react";
import { getLocale } from "@/lib/locale";
import { getTranslations } from "@/lib/translations";

export default async function AboutMinistryPage() {
    const locale = await getLocale();
    const t = getTranslations(locale);
    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-8 text-blue-900">{t.aboutMinistry.title}</h1>
            <Card className="mb-12">
                <CardContent className="p-8 prose max-w-none">
                    <p className="text-lg text-gray-700 mb-4">
                        {t.aboutMinistry.intro}
                    </p>
                </CardContent>
            </Card>

            <h2 className="text-2xl font-bold mb-6 text-blue-900">{t.aboutMinistry.visionMissionTitle}</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-blue-50 border-blue-100">
                    <CardHeader>
                        <Eye className="h-10 w-10 text-blue-600 mb-2" />
                        <CardTitle className="text-2xl text-blue-800">{t.visionMission.vision}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700">
                            {t.visionMission.visionText}
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-100">
                    <CardHeader>
                        <Target className="h-10 w-10 text-green-600 mb-2" />
                        <CardTitle className="text-2xl text-green-800">{t.visionMission.mission}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700">
                            {t.visionMission.missionText}
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-purple-50 border-purple-100 md:col-span-2 lg:col-span-1">
                    <CardHeader>
                        <Compass className="h-10 w-10 text-purple-600 mb-2" />
                        <CardTitle className="text-2xl text-purple-800">{t.visionMission.strategicObjectives}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>{t.visionMission.obj1}</li>
                            <li>{t.visionMission.obj2}</li>
                            <li>{t.visionMission.obj3}</li>
                            <li>{t.visionMission.obj4}</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
