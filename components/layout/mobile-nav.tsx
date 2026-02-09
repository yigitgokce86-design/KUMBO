"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, GraduationCap, User, Shield } from "lucide-react"

export function MobileNav() {
    const pathname = usePathname()

    const links = [
        { href: "/dashboard", label: "Ana Sayfa", icon: Home },
        { href: "/learn", label: "Akademi", icon: GraduationCap },
        { href: "/profile", label: "Profil", icon: User },
        { href: "/parent", label: "Ebeveyn", icon: Shield },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 z-50 pointer-events-none">
            <div className="bg-white/90 backdrop-blur-md border border-white/20 shadow-2xl rounded-[2rem] p-2 flex justify-around items-center max-w-md mx-auto pointer-events-auto ring-1 ring-black/5">
                {links.map((link) => {
                    const Icon = link.icon
                    const isActive = pathname.startsWith(link.href)

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-16 h-16 rounded-[1.5rem] transition-all duration-300 relative",
                                isActive
                                    ? "bg-emerald-500 text-white shadow-emerald-500/30 shadow-lg -translate-y-4 scale-110"
                                    : "text-slate-400 hover:bg-emerald-50 hover:text-emerald-600"
                            )}
                        >
                            <Icon strokeWidth={isActive ? 3 : 2.5} size={24} />
                            {isActive && (
                                <span className="text-[10px] font-bold mt-1 animate-in fade-in slide-in-from-bottom-2 absolute -bottom-6 text-emerald-800 bg-white/80 px-2 py-0.5 rounded-full shadow-sm backdrop-blur-sm">
                                    {link.label}
                                </span>
                            )}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
