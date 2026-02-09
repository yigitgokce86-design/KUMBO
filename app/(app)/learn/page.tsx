"use client"

import { MOCK_LESSONS } from "@/lib/content-data"
import { LessonCard } from "@/components/features/learn/lesson-card"
import { Character } from "@/components/ui/character"
import { useStore } from "@/lib/store/use-store"
import { useRouter } from "next/navigation"

export default function LearnPage() {
    const { xp } = useStore()
    const router = useRouter()

    // Derived state for UI can be done here if needed

    const handleLessonClick = (lesson: any) => {
        router.push(`/learn/${lesson.id}`)
    }

    return (
        <div className="flex flex-col gap-6 p-4 pb-24">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-emerald-900 -tracking-wide">Akademi 🎓</h1>
                    <p className="text-emerald-700 font-medium">Para ustası olmaya hazırlan!</p>
                </div>
                <div className="bg-amber-100 px-4 py-2 rounded-2xl border-2 border-amber-200">
                    <span className="font-black text-amber-600">✨ {xp} XP</span>
                </div>
            </div>

            {/* Hero / Featured Lesson */}
            <div className="bg-emerald-500 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl shadow-emerald-500/20 group cursor-pointer border-b-8 border-emerald-600 active:border-b-0 active:translate-y-2 transition-all">
                <div className="relative z-10 w-2/3">
                    <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-lg mb-3 inline-block">YENİ DERS</span>
                    <h2 className="text-3xl font-black mb-2 leading-none">Para Nedir?</h2>
                    <p className="text-emerald-100 font-medium text-sm mb-6">Paranın tarihini kısaca öğrenelim.</p>
                    <button className="bg-white text-emerald-600 font-black px-6 py-3 rounded-xl text-sm shadow-lg group-hover:scale-105 transition-transform" onClick={() => router.push('/learn/1')}>
                        Hemen İzle
                    </button>
                </div>
                <div className="absolute right-[-20px] bottom-[-20px] opacity-100 scale-110 group-hover:rotate-6 transition-transform">
                    <Character variant="guide" size="md" />
                </div>
            </div>

            {/* Lesson List */}
            <div className="space-y-4">
                <h3 className="text-emerald-900 font-black text-xl">Temel Dersler</h3>
                <div className="grid gap-4">
                    {MOCK_LESSONS.map((lesson) => (
                        <LessonCard
                            key={lesson.id}
                            lesson={{ ...lesson, isLocked: false }} // Unlock all for demo
                            onClick={() => handleLessonClick(lesson)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
