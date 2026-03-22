import Image from "next/image"

export default function OrganizationalStructurePage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-5xl px-6 py-12">
                {/* Organizational Structure Image - exact match to reference */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-blue-900 mb-2">Organizational Structure</h1>
                    <p className="text-gray-600">Ministry of Energy & Water Resources – North-Eastern State</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <Image
                        src="/organizational-structure.png"
                        alt="Ministry of Energy & Water Resources North-Eastern State - Organizational Structure"
                        width={1200}
                        height={1600}
                        className="w-full h-auto object-contain"
                        priority
                    />
                </div>
                <p className="text-center text-sm text-gray-600 mt-8">
                    © Ministry of Energy and Water Resources
                </p>
            </div>
        </div>
    )
}
