"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Menu, User } from "lucide-react"
import { useTheme } from "@/lib/store/use-theme"
import { cn } from "@/lib/utils"

interface ShellProps {
    children: React.ReactNode
}

export function Shell({ children }: ShellProps) {
    const { currentTheme, setTheme } = useTheme()

    return (
        <div className="min-h-screen bg-amber-50/50 dark:bg-slate-950 flex flex-col relative overflow-hidden">
            {/* Background Gradients */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-amber-200/10 rounded-full blur-[120px] animate-float" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-200/10 rounded-full blur-[120px] animate-float opacity-70" style={{ animationDelay: '3s' }} />
            </div>

            <header className="sticky top-0 z-50 w-full border-b border-emerald-100/50 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur-xl">
                <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-emerald-800 dark:text-emerald-100">
                        <div className="bg-emerald-100 p-1.5 rounded-lg text-emerald-600">
                            <Sparkles size={20} />
                        </div>
                        Kumbo
                    </div>
                    <nav className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu size={20} />
                        </Button>
                        <div className="hidden md:flex items-center gap-4">
                            <Link href="/goals" className="text-sm font-medium text-emerald-800/70 hover:text-emerald-800 transition-colors">Hedeflerim</Link>
                            <Link href="/learn" className="text-sm font-medium text-emerald-800/70 hover:text-emerald-800 transition-colors">Öğren</Link>
                        </div>

                        {/* Theme Switcher (Temporary for Simulation) */}
                        <div className="flex bg-muted/50 rounded-full p-1 gap-1">
                            {['nature', 'sports', 'space'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTheme(t as any)}
                                    className={cn(
                                        "px-2 py-1 rounded-full text-xs font-medium transition-all",
                                        currentTheme === t ? "bg-white shadow text-foreground" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {t === 'nature' ? '🌲' : t === 'sports' ? '⚽' : '🚀'}
                                </button>
                            ))}
                        </div>

                        <Button variant="ghost" size="icon" className="rounded-full text-emerald-800 hover:bg-emerald-50">
                            <User size={20} />
                        </Button>
                    </nav>
                </div>
            </header>
            <main className="flex-1 container px-4 md:px-6 py-8">
                {children}
            </main>
        </div>
    )
}
