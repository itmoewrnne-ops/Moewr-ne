import * as React from "react"
import { cn } from "@/lib/utils"

// Since I didn't install class-variance-authority or radix-ui/react-slot, I should probably stick to simple props for now or install them.
// Wait, I didn't install them. I should probably install them or write a simpler button.
// I'll write a simpler button for now to avoid more install issues, or I can add them to package.json and let npm install pick them up if it's not too late.
// `npm install` is already running.
// I'll write a simpler version without cva/slot for now, or just use clsx/tailwind-merge.

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
        const Comp = "button"

        const variants = {
            default: "bg-blue-600 text-white hover:bg-blue-700",
            destructive: "bg-red-600 text-white hover:bg-red-700",
            outline: "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900",
            secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
            ghost: "hover:bg-gray-100 hover:text-gray-900",
            link: "text-blue-600 underline-offset-4 hover:underline",
        }

        const sizes = {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10",
        }

        return (
            <Comp
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
