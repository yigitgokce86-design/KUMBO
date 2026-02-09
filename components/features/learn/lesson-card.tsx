"use client"

import { Lock, PlayCircle, CheckCircle } from "lucide-react"
import { Lesson } from "@/lib/content-data"
import { cn } from "@/lib/utils"

interface LessonCardProps {
    lesson: Lesson
    onClick?: () => void
}

export function LessonCard({ lesson, onClick }: LessonCardProps) {
    return (
        <div
            onClick={!lesson.isLocked ? onClick : undefined}
            className={cn(
                "bg-white p-5 rounded-[1.5rem] relative overflow-hidden transition-all duration-300 group border-2 border-emerald-50 shadow-sm",
                lesson.isLocked ? "opacity-60 grayscale bg-slate-50" : "hover:border-emerald-200 hover:shadow-[0_8px_20px_-8px_rgba(16,185,129,0.2)] cursor-pointer active:scale-95"
            )}
        >
            {/* Background Gradient Accent */
                !lesson.isLocked && (
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                )}

            <div className="flex items-center gap-4 relative z-10">
                {/* Thumbnail / Icon */}
                <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-emerald-100",
                    lesson.isLocked ? "bg-slate-100" : "bg-gradient-to-br from-emerald-100 to-teal-50"
                )}>
                    {lesson.isLocked ? <Lock size={24} className="text-slate-400" /> : <span className="scale-125">{lesson.thumbnail}</span>}
                </div>

                {/* Info */}
                <div className="flex-1">
                    <h3 className="font-bold text-emerald-950 text-lg leading-tight mb-1 group-hover:text-emerald-700 transition-colors">{lesson.title}</h3>
                    <p className="text-emerald-900/60 text-xs line-clamp-2 font-medium">{lesson.description}</p>

                    <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs font-extrabold text-amber-500 flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                            ✨ {lesson.xp} XP
                        </span>
                        <span className="text-xs text-emerald-900/40 font-bold">• {lesson.duration}</span>
                    </div>
                </div>

                {/* Status Icon */}
                <div className="pr-2">
                    {lesson.isCompleted ? (
                        <CheckCircle className="text-emerald-500 fill-emerald-100" size={28} />
                    ) : !lesson.isLocked ? (
                        <PlayCircle className="text-emerald-300 group-hover:text-emerald-500 transition-colors" size={32} />
                    ) : null}
                </div>
            </div>
        </div>
    )
}
