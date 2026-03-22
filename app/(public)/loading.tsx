export default function PublicLoading() {
    return (
        <div className="h-0.5 w-full bg-gray-100 overflow-hidden" aria-live="polite" aria-busy="true">
            <div className="h-full w-1/3 bg-green-600 animate-shimmer" />
        </div>
    )
}
