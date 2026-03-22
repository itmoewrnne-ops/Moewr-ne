'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/components/LanguageProvider'

function AnimatedTitle({ text, isActive, delayMs = 0 }: { text: string; isActive: boolean; delayMs?: number }) {
    const [displayedText, setDisplayedText] = useState('')
    const [hasStarted, setHasStarted] = useState(false)

    useEffect(() => {
        if (!isActive) {
            setDisplayedText('')
            setHasStarted(false)
            return
        }

        const startTimer = setTimeout(() => {
            setHasStarted(true)
        }, delayMs)
        return () => clearTimeout(startTimer)
    }, [isActive, delayMs])

    useEffect(() => {
        if (!hasStarted || !isActive) return

        setDisplayedText('')
        let currentIndex = 0
        const interval = setInterval(() => {
            if (currentIndex < text.length) {
                setDisplayedText(text.slice(0, currentIndex + 1))
                currentIndex++
            } else {
                clearInterval(interval)
            }
        }, 42)

        return () => clearInterval(interval)
    }, [text, isActive, hasStarted])

    return (
        <span className="inline-block">
            {text.split('').map((char, index) => (
                <span
                    key={index}
                    className={`inline-block transition-all duration-300 ease-out ${
                        index < displayedText.length
                            ? 'opacity-100 translate-y-0 scale-100'
                            : 'opacity-0 translate-y-2 scale-90'
                    }`}
                    style={{
                        transitionDelay: `${index * 25}ms`,
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    )
}

interface HeroSlide {
    id: string
    title: string
    subtitle: string | null
    image: string
    buttonText: string | null
    buttonLink: string | null
    order: number
}

interface HeroSliderClientProps {
    slides: HeroSlide[]
}

export function HeroSliderClient({ slides }: HeroSliderClientProps) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const { t } = useLanguage()

    useEffect(() => {
        if (slides.length === 0) return

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000) // Change slide every 5 seconds
        
        return () => clearInterval(timer)
    }, [slides.length])

    if (slides.length === 0) {
        return (
            <div className="relative h-[700px] lg:h-[800px] xl:h-[900px] w-full bg-gradient-to-r from-green-200 to-green-100 flex items-center">
                <div className="text-left text-gray-800 px-8 lg:px-12 xl:px-16 w-full" dir="ltr">
                    <h1 className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-extrabold mb-10 text-gray-800">
                        {t.hero.title}
                    </h1>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-6xl text-gray-700 font-extrabold">
                        {t.hero.subtitle}
                    </h2>
                </div>
            </div>
        )
    }

    return (
        <div className="relative h-[700px] lg:h-[800px] xl:h-[900px] w-full overflow-hidden -mt-0">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                        index === currentSlide 
                            ? 'opacity-100 z-10' 
                            : 'opacity-0 z-0'
                    }`}
                >
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover transition-transform duration-1000 ease-in-out"
                        priority={index === 0}
                        quality={75}
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full px-8 lg:px-12 xl:px-16" dir="ltr">
                            <h1 className="text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold mb-6 text-white drop-shadow-lg leading-tight">
                                <AnimatedTitle text={slide.title} isActive={index === currentSlide} />
                            </h1>
                            {slide.subtitle && (
                                <h2 
                                    className={`text-2xl md:text-3xl lg:text-3xl xl:text-4xl mb-8 max-w-4xl text-white font-extrabold drop-shadow-lg transition-all duration-500 leading-relaxed ${
                                        index === currentSlide 
                                            ? 'opacity-100 translate-y-0' 
                                            : 'opacity-0 translate-y-4'
                                    }`}
                                    style={{ transitionDelay: `${slide.title.length * 42 + 180}ms` }}
                                >
                                    <AnimatedTitle 
                                        text={slide.subtitle} 
                                        isActive={index === currentSlide} 
                                        delayMs={slide.title.length * 42 + 180} 
                                    />
                                </h2>
                            )}
                            {slide.buttonText && slide.buttonLink && (
                                <Link href={slide.buttonLink}>
                                    <Button
                                        id={`hero-cta-${slide.id}`}
                                        size="lg"
                                        className={`bg-white text-green-600 hover:bg-gray-100 font-semibold text-lg md:text-xl shadow-lg hover:shadow-xl transition-all duration-500 ${
                                            index === currentSlide 
                                                ? 'opacity-100 translate-y-0' 
                                                : 'opacity-0 translate-y-4'
                                        }`}
                                        style={{ transitionDelay: `${slide.title.length * 42 + 400}ms` }}
                                    >
                                        {slide.buttonText}
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Dots Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
