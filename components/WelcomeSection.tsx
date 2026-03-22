import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { getLocale } from '@/lib/locale'
import { getTranslations } from '@/lib/translations'

// Revalidate every 60 seconds
export const revalidate = 60

async function getMinister() {
    try {
        // Get the minister (first leadership member with position containing "minister")
        const minister = await prisma.leadership.findFirst({
            where: {
                active: true,
                position: {
                    contains: 'MINISTER',
                },
            },
            orderBy: {
                order: 'asc',
            },
        })

        return minister
    } catch (error) {
        console.error('Error fetching minister:', error)
        return null
    }
}

export async function WelcomeSection() {
    const [minister, locale] = await Promise.all([getMinister(), getLocale()])
    const t = getTranslations(locale)

    return (
        <section className="py-16 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex justify-center mb-4">
                    <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-12 text-center">
                    {t.welcome.title}
                </h2>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Minister Photo */}
                    <div className="flex justify-center">
                        <div className="relative max-w-md w-full">
                            <div className="w-full relative aspect-[3/4]">
                                <Image
                                    src="/xijaar.jpg"
                                    alt={t.welcome.ministerName}
                                    fill
                                    className="rounded-lg shadow-xl object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                                <div className="mt-4 text-center">
                                    <h3 className="text-xl font-bold text-gray-900">{t.welcome.ministerName}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Minister's Message */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.welcome.ministerMessage}</h3>
                            <div className="h-1 w-16 bg-blue-500 rounded-full mb-6"></div>
                        </div>

                        <p className="text-lg leading-8 text-gray-600 text-justify">
                            {t.welcome.ministerMessageText}
                        </p>

                        <div className="pt-4">
                            <p className="font-semibold text-gray-900">{t.welcome.ministerName}</p>
                            <p className="text-blue-600 text-sm uppercase">{t.welcome.minister}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
