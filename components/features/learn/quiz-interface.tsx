"use client"

import { useState } from "react"
import type { Question } from "@/lib/content-data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
// import { CheckCircle2, XCircle } from "lucide-react" // Importing icons to avoid errors if lucide not installed, basic check needed
import { Check, X } from "lucide-react"

interface QuizInterfaceProps {
    questions: Question[]
    onComplete: (score: number) => void
}

export function QuizInterface({ questions, onComplete }: QuizInterfaceProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    const [isAnswered, setIsAnswered] = useState(false)
    const [score, setScore] = useState(0)
    const [showResult, setShowResult] = useState(false)

    // Fallback if no questions
    if (!questions || questions.length === 0) {
        return <div className="p-4 text-center text-emerald-800">Bu ders için quiz bulunamadı.</div>
    }

    const currentQuestion = questions[currentIndex]

    const handleOptionSelect = (index: number) => {
        if (isAnswered) return
        setSelectedOption(index)
        setIsAnswered(true)

        const isCorrect = index === currentQuestion.correctIndex
        if (isCorrect) {
            setScore(prev => prev + 1)
        }
    }

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1)
            setSelectedOption(null)
            setIsAnswered(false)
        } else {
            setShowResult(true)
        }
    }

    const finishQuiz = () => {
        onComplete(score)
    }

    if (showResult) {
        return (
            <div className="bg-white p-6 rounded-[2rem] border-4 border-emerald-50 text-center space-y-4 shadow-xl">
                <h3 className="text-2xl font-black text-emerald-900">Quiz Tamamlandı!</h3>
                <div className="text-5xl font-black text-amber-500 my-4">
                    {score} / {questions.length}
                </div>
                <p className="text-emerald-700 font-medium">
                    {score === questions.length ? "Harikasın! Hepsini bildin! 🎉" : "Güzel deneme! Öğrenmeye devam et. 💪"}
                </p>
                <Button onClick={finishQuiz} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl h-14 font-black text-lg shadow-[0_4px_0_0_#059669] active:translate-y-1 active:shadow-none transition-all">
                    Dersi Tamamla & XP Al
                </Button>
            </div>
        )
    }

    return (
        <div className="bg-white p-6 rounded-[2rem] border-4 border-emerald-50 shadow-xl space-y-6">
            <div className="flex justify-between items-center text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
                <span>Soru {currentIndex + 1} / {questions.length}</span>
                <span>Puan: {score}</span>
            </div>

            <h3 className="text-xl font-bold text-emerald-900 leading-tight min-h-[3rem]">
                {currentQuestion.text}
            </h3>

            <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                    let stateStyles = "bg-white border-2 border-emerald-100 text-emerald-800 hover:bg-emerald-50 hover:border-emerald-200"

                    if (isAnswered) {
                        if (idx === currentQuestion.correctIndex) {
                            stateStyles = "bg-emerald-500 border-emerald-600 text-white shadow-md scale-[1.02]"
                        } else if (idx === selectedOption) {
                            stateStyles = "bg-red-100 border-red-200 text-red-800 opacity-80"
                        } else {
                            stateStyles = "opacity-40 grayscale"
                        }
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => handleOptionSelect(idx)}
                            disabled={isAnswered}
                            className={cn(
                                "w-full p-4 rounded-xl text-left font-bold transition-all duration-200 flex items-center justify-between",
                                stateStyles
                            )}
                        >
                            {option}
                            {isAnswered && idx === currentQuestion.correctIndex && <Check className="w-6 h-6 text-white" />}
                            {isAnswered && idx === selectedOption && idx !== currentQuestion.correctIndex && <X className="w-6 h-6 text-red-500" />}
                        </button>
                    )
                })}
            </div>

            {isAnswered && (
                <div className="pt-2 animate-in fade-in slide-in-from-bottom-2">
                    <Button
                        onClick={handleNext}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-14 rounded-xl font-black text-lg shadow-[0_4px_0_0_#059669] active:shadow-none active:translate-y-[4px] transition-all"
                    >
                        {currentIndex < questions.length - 1 ? "Sonraki Soru" : "Sonucu Gör"}
                    </Button>
                </div>
            )}
        </div>
    )
}
