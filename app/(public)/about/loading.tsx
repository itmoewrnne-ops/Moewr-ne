export default function AboutLoading() {
    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-pulse" aria-live="polite" aria-busy="true">
            <div className="h-10 bg-gray-200 rounded w-3/4 max-w-md mb-8" />
            <div className="h-4 bg-gray-200 rounded w-full mb-4" />
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-8" />
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-48 bg-gray-100 rounded-lg" />
                ))}
            </div>
        </div>
    )
}
