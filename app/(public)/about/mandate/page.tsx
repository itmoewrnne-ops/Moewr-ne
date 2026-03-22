import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Eye, Award } from 'lucide-react'
import { getLocale } from '@/lib/locale'
import { getTranslations } from '@/lib/translations'

export default async function MandatePage() {
    const locale = await getLocale()
    const t = getTranslations(locale)
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-blue-900 text-white py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">{t.mandate.title}</h1>
                    <p className="text-xl text-gray-200">
                        {t.mandate.subtitle}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <Card className="border-t-4 border-t-blue-600">
                        <CardHeader>
                            <Target className="h-12 w-12 text-blue-600 mb-4" />
                            <CardTitle>{t.mandate.mission}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">
                                {t.mandate.missionText}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-t-4 border-t-green-600">
                        <CardHeader>
                            <Eye className="h-12 w-12 text-green-600 mb-4" />
                            <CardTitle>{t.mandate.vision}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">
                                {t.mandate.visionText}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-t-4 border-t-yellow-600">
                        <CardHeader>
                            <Award className="h-12 w-12 text-yellow-600 mb-4" />
                            <CardTitle>{t.mandate.coreValues}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-gray-600 space-y-2">
                                <li>• {t.mandate.cv1}</li>
                                <li>• {t.mandate.cv2}</li>
                                <li>• {t.mandate.cv3}</li>
                                <li>• {t.mandate.cv4}</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">{t.mandate.legalMandate}</h2>
                    <div className="prose max-w-none text-gray-600">
                        <p className="mb-4">
                            {t.mandate.legalText}
                        </p>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900">{t.mandate.keyResponsibilities}</h3>
                        <ul className="space-y-2 ml-6">
                            <li>{t.mandate.resp1}</li>
                            <li>{t.mandate.resp2}</li>
                            <li>{t.mandate.resp3}</li>
                            <li>{t.mandate.resp4}</li>
                            <li>{t.mandate.resp5}</li>
                            <li>{t.mandate.resp6}</li>
                            <li>{t.mandate.resp7}</li>
                            <li>{t.mandate.resp8}</li>
                        </ul>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900">{t.mandate.strategicObjectives}</h3>
                        <ul className="space-y-2 ml-6">
                            <li>{t.mandate.so1}</li>
                            <li>{t.mandate.so2}</li>
                            <li>{t.mandate.so3}</li>
                            <li>{t.mandate.so4}</li>
                            <li>{t.mandate.so5}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
