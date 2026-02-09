"use client"

import { Badge } from "@/lib/content-data"
import { cn } from "@/lib/utils"
import { Lock } from "lucide-react"

interface BadgeListProps {
    badges: Badge[]
}

export function BadgeList({ badges }: BadgeListProps) {
    return (
        <div className="grid grid-cols-3 gap-4">
            {badges.map((badge) => (
                <div
                    key={badge.id}
                    className={cn(
                        "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all text-center gap-2",
                        badge.isEarned
                            ? "bg-white border-emerald-100 shadow-sm"
                            : "bg-slate-50 border-slate-100 opacity-60 grayscale"
                    )}
                >
                    <div className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-sm mb-1",
                        badge.isEarned ? "bg-gradient-to-br from-amber-100 to-orange-50" : "bg-slate-200"
                    )}>
                        {badge.isEarned ? badge.imageUrl : <Lock className="text-slate-400" size={24} />}
                    </div>

                    <div className="space-y-1">
                        <h4 className={cn("font-bold text-sm leading-tight", badge.isEarned ? "text-emerald-900" : "text-slate-500")}>
                            {badge.title}
                        </h4>
                        <p className="text-[10px] font-medium text-slate-400 line-clamp-2">
                            {badge.description}
                        </p>
                    </div>

                    {badge.isEarned && (
                        <span className="text-[10px] font-black text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                            +{badge.xpReward} XP
                        </span>
                    )}
                </div>
            ))}
        </div>
    )
}
