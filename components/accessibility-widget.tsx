"use client"

import * as React from "react"
import { Eye, Type, Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

export function AccessibilityWidget() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [highContrast, setHighContrast] = React.useState(false)
    const [fontSize, setFontSize] = React.useState(100) // Percentage

    React.useEffect(() => {
        const root = document.documentElement
        if (highContrast) {
            root.classList.add("high-contrast")
        } else {
            root.classList.remove("high-contrast")
        }

        // Reset font size before applying new one to avoid compounding if using rem, 
        // but here we set style property
        root.style.fontSize = `${fontSize}%`

    }, [highContrast, fontSize])

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2" dir="ltr">
            {isOpen && (
                <div className="bg-background border rounded-lg shadow-lg p-2 min-w-[200px] animate-in slide-in-from-bottom-5">
                    <div className="flex items-center justify-between p-2 border-b">
                        <span className="text-sm font-semibold">Accessibility</span>
                    </div>
                    <div className="p-2 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-sm">Contrast</span>
                            <Button
                                variant={highContrast ? "default" : "outline"}
                                size="sm"
                                onClick={() => setHighContrast(!highContrast)}
                                className="h-8"
                            >
                                <Eye className="h-4 w-4 mr-2" />
                                {highContrast ? "On" : "Off"}
                            </Button>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-sm">Text Size</span>
                            <div className="flex items-center gap-1">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => setFontSize(Math.max(100, fontSize - 10))}
                                    disabled={fontSize <= 100}
                                >
                                    <Minus className="h-3 w-3" />
                                </Button>
                                <span className="text-xs w-8 text-center">{fontSize}%</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => setFontSize(Math.min(150, fontSize + 10))}
                                    disabled={fontSize >= 150}
                                >
                                    <Plus className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Button
                variant="default"
                size="icon"
                className="rounded-full h-12 w-12 shadow-xl"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Accessibility Options"
            >
                <span className="text-lg font-bold">Aa</span>
            </Button>
        </div>
    )
}
