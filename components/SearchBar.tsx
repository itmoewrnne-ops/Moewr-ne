'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function SearchBar() {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // Implement search functionality
        console.log('Searching for:', searchQuery)
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Search"
            >
                <Search className="h-5 w-5 text-gray-700" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Search</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSearch}>
                            <div className="flex gap-2">
                                <Input
                                    type="text"
                                    placeholder="Search for services, departments, news..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1"
                                    autoFocus
                                />
                                <Button type="submit">Search</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
