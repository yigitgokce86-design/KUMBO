"use client"

import { useTheme } from "@/lib/store/use-theme"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface CharacterProps {
    variant: 'guide' | 'logic' | 'compassion'
    className?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    speaking?: boolean // Adds a subtle speaking animation
}

export function Character({ variant, className, size = 'md', speaking }: CharacterProps) {
    const { config } = useTheme()

    const characterData = config.characters[variant]

    const sizeClasses = {
        sm: "w-16 h-16",
        md: "w-32 h-32",
        lg: "w-48 h-48",
        xl: "w-64 h-64"
    }

    return (
        <motion.div
            className={cn("relative flex flex-col items-center justify-center", className)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {/* Character Image container */}
            <div className={cn(
                "relative rounded-full overflow-visible flex items-center justify-center",
                sizeClasses[size],
                speaking && "animate-pulse" // Simple speaking effect
            )}>
                {/* 
                Since we don't have the real assets yet, we use a colored placeholder 
                that matches the theme's colors.
                In production, this would be: <img src={characterData.assetPath} ... />
             */}
                <div className={cn(
                    "w-full h-full rounded-full border-4 border-white shadow-xl flex items-center justify-center text-4xl",
                    variant === 'guide' && "bg-emerald-100",
                    variant === 'logic' && "bg-blue-100",
                    variant === 'compassion' && "bg-amber-100"
                )}>
                    {/* Fallback Emoji based on Role */}
                    {variant === 'guide' && "🧢"}
                    {variant === 'logic' && "🤖"}
                    {variant === 'compassion' && "🐶"}
                </div>

                {/* Badge/Role Label */}
                <div className="absolute -bottom-2 bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold text-foreground whitespace-nowrap border border-muted">
                    {characterData.name}
                </div>
            </div>
        </motion.div>
    )
}
