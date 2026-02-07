"use client"

import { Shell } from "@/components/layout/shell"
import { CONTENT_DATA } from "@/lib/content-data"
import { QuizInterface } from "@/components/features/learn/quiz-interface"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useStore } from "@/lib/store/use-store"
import { useRouter } from "next/navigation"

export default function LessonPage({ params }: { params: { slug: string } }) {
    const completeLesson = useStore(state => state.completeLesson)
    const router = useRouter()

    // Flatten lessons to find by slug
    // In a real app, we might query DB by slug
    const lesson = CONTENT_DATA
        .flatMap(m => m.lessons)
        .find(l => l.slug === params.slug)

    if (!lesson) {
        return <div className="p-10 text-center">Ders Bulunamadı</div>
    }

    return (
        <Shell>
            <div className="max-w-4xl mx-auto space-y-8 pb-20">
                {/* Header / Nav */}
                <div>
                    <Button variant="ghost" asChild className="mb-4 pl-0 hover:bg-transparent hover:text-emerald-600">
                        <Link href="/learn">
                            <ArrowLeft className="mr-2 w-4 h-4" /> Akademiye Dön
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold text-foreground">{lesson.title}</h1>
                    <p className="text-lg text-muted-foreground">{lesson.description}</p>
                </div>

                {/* Video Player Section */}
                <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl relative group">
                    {/* Using iframe for Youtube/Vimeo. 
                         For MVP we verify functionality with a placeholder video if needed 
                         or the actual URL from data if valid. 
                     */}
                    <iframe
                        src={lesson.videoUrl}
                        title={lesson.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>

                {/* Quiz Section */}
                <div className="pt-8 border-t">
                    <h2 className="text-2xl font-bold mb-6 text-center">Bilgini Test Et 🧠</h2>
                    <QuizInterface
                        quiz={lesson.quiz}
                        onComplete={(score) => {
                            const passed = score >= lesson.quiz.questions.length / 2 // 50% pass rate
                            if (passed) {
                                completeLesson(lesson.id, lesson.xpReward)
                                // We rely on QuizInterface to show the success UI
                            }
                        }}
                    />
                </div>
            </div>
        </Shell>
    )
}
