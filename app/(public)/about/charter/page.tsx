import { Card, CardContent } from "@/components/ui/card";
import { FileText, CheckCircle } from "lucide-react";
import { getLocale } from "@/lib/locale";
import { getTranslations } from "@/lib/translations";

export default async function ServiceCharterPage() {
    const locale = await getLocale();
    const t = getTranslations(locale);
    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-8 text-blue-900">{t.charter.title}</h1>

            <Card className="mb-8">
                <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                        <FileText className="h-12 w-12 text-blue-600 flex-shrink-0" />
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">{t.charter.commitmentTitle}</h2>
                            <p className="text-gray-700 mb-4">
                                {t.charter.commitmentText}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            {t.charter.coreValues}
                        </h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>{t.charter.value1}</li>
                            <li>{t.charter.value2}</li>
                            <li>{t.charter.value3}</li>
                            <li>{t.charter.value4}</li>
                            <li>{t.charter.value5}</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            {t.charter.serviceStandards}
                        </h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>{t.charter.standard1}</li>
                            <li>{t.charter.standard2}</li>
                            <li>{t.charter.standard3}</li>
                            <li>{t.charter.standard4}</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
