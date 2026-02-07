"use client"

import { Shell } from "@/components/layout/shell"
import { CONTENT_DATA } from "@/lib/content-data"
import { LessonCard } from "@/components/features/learn/lesson-card"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store/use-store"
import { Trophy } from "lucide-react"

export default function LearnPage() {
    const { completedLessons, xp } = useStore()

    return (
        <Shell>
            <div className="space-y-8 pb-20">
                <div className="text-center space-y-2 relative">
                    <h1 className="text-3xl font-bold text-emerald-900">Kumbo Akademi 🎓</h1>
                    <p className="text-muted-foreground">Paranın sırlarını keşfet ve rozetleri topla!</p>

                    {/* XP Display */}
                    <div className="absolute top-0 right-0 hidden md:flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold border border-amber-200 shadow-sm animate-pulse-soft">
                        <Trophy className="w-4 h-4" />
                        <span>{xp} XP</span>
                    </div>
                </div>

                <div className="grid gap-8">
                    {CONTENT_DATA.map((module) => (
                        <div key={module.id} className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Badge variant="outline" className="text-sm px-3 py-1 bg-white border-emerald-200">
                                    Seviye {module.level}
                                </Badge>
                                <h2 className="text-2xl font-bold">{module.title}</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {module.lessons.map((lesson, idx) => {
                                    const isCompleted = completedLessons.includes(lesson.id)
                                    // Simple unlock logic: First lesson always unlocked, or if previous is completed
                                    const previousLesson = idx > 0 ? module.lessons[idx - 1] : null
                                    const isLocked = idx > 0 && previousLesson && !completedLessons.includes(previousLesson.id)

                                    // Override for OLP: Unlock everything for demo purposes if needed, 
                                    // but let's try the real logic to show off the system.
                                    // ACTUALLY: Let's keep it unlocked for the user to see all screens easily.
                                    // const status = isCompleted ? 'completed' : (isLocked ? 'locked' : 'unlocked')
                                    const status = isCompleted ? 'completed' : 'unlocked'

                                    return (
                                        <LessonCard
                                            key={lesson.id}
                                            lesson={lesson}
                                            status={status}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Shell>
    )
}
