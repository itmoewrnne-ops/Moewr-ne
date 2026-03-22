'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
            <div className="p-4 bg-red-50 rounded-full">
                <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Something went wrong!</h2>
            <p className="text-gray-500 max-w-md text-center">
                We couldn&apos;t load the dashboard data. This might be due to a connection issue.
            </p>
            <Button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </Button>
        </div>
    )
}
