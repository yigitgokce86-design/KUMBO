"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { MOCK_LESSONS } from "@/lib/content-data"
import { useStore } from "@/lib/store/use-store"
import { VideoPlayer } from "@/components/features/learn/video-player"
import { QuizInterface } from "@/components/features/learn/quiz-interface"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function LessonDetailPage() {
    const params = useParams()
    const router = useRouter()
    const { completeLesson, xp } = useStore()
    const [quizStarted, setQuizStarted] = useState(false)

    // Find lesson by ID
    const lesson = MOCK_LESSONS.find(l => l.id === params.lessonId)

    if (!lesson) {
        return <div className="p-10 text-center text-emerald-800 font-bold">Ders bulunamadı 😔</div>
    }

    const handleQuizComplete = async (score: number) => {
        // Simple logic: If score > 0, complete the lesson
        if (score > 0) {
            await completeLesson(lesson.id, lesson.xp)
            alert(`Tebrikler! ${lesson.xp} XP kazandın! 🎓`)
        } else {
            alert(`Dersi tamamladın ama hiç puan alamadın. Tekrar dene!`)
        }
        router.push('/learn')
    }

    return (
        <div className="flex flex-col gap-6 p-4 pb-24 max-w-2xl mx-auto">
            {/* Header / Back */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-emerald-100/50">
                    <ArrowLeft className="w-6 h-6 text-emerald-700" />
                </Button>
                <h1 className="text-2xl font-black text-emerald-900 line-clamp-1">{lesson.title}</h1>
            </div>

            {/* Video Section */}
            {!quizStarted ? (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    {lesson.videoUrl && (
                        <div className="rounded-[2rem] overflow-hidden shadow-2xl bg-black">
                            <VideoPlayer url={lesson.videoUrl} title={lesson.title} />
                        </div>
                    )}

                    <div className="bg-white p-6 rounded-[2rem] border-4 border-emerald-50 shadow-lg space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="bg-amber-100 text-amber-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                                {lesson.xp} XP
                            </div>
                            <div className="bg-emerald-100 text-emerald-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                                {lesson.duration}
                            </div>
                        </div>
                        <h2 className="text-xl font-bold text-emerald-950">Ders Hakkında</h2>
                        <p className="text-emerald-800/80 leading-relaxed font-medium">
                            {lesson.description}
                        </p>

                        <div className="pt-4">
                            <Button
                                onClick={() => setQuizStarted(true)}
                                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black text-lg h-16 rounded-2xl shadow-[0_6px_0_0_#059669] active:shadow-none active:translate-y-[6px] transition-all"
                            >
                                Quizi Başlat 🚀
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="animate-in slide-in-from-right-8 duration-500">
                    <QuizInterface questions={lesson.quiz || []} onComplete={handleQuizComplete} />
                    <div className="mt-4 text-center">
                        <button onClick={() => setQuizStarted(false)} className="text-emerald-500 text-sm font-bold hover:underline">
                            Videoya Dön
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
