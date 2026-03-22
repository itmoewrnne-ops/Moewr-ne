'use client'

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

export function ScrollToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300)
        }
        window.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (!visible) return null

    return (
        <div className="fixed bottom-8 left-8 z-40" dir="ltr">
            <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
                <ChevronUp className="w-6 h-6" strokeWidth={2.5} />
            </button>
        </div>
    )
}
