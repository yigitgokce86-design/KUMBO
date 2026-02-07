"use client"

import * as React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quiz } from "@/lib/content-data"
import { CheckCircle, XCircle, ArrowRight, RefreshCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuizInterfaceProps {
    quiz: Quiz
    onComplete: (score: number) => void
}

export function QuizInterface({ quiz, onComplete }: QuizInterfaceProps) {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [selectedOption, setSelectedOption] = React.useState<number | null>(null)
    const [isAnswered, setIsAnswered] = React.useState(false)
    const [score, setScore] = React.useState(0)
    const [showResult, setShowResult] = React.useState(false)

    const currentQuestion = quiz.questions[currentIndex]
    const isLastQuestion = currentIndex === quiz.questions.length - 1

    const handleOptionSelect = (index: number) => {
        if (isAnswered) return
        setSelectedOption(index)
        setIsAnswered(true)

        if (index === currentQuestion.correctIndex) {
            setScore(prev => prev + 1)
        }
    }

    const handleNext = () => {
        if (isLastQuestion) {
            setShowResult(true)
            onComplete(score + (selectedOption === currentQuestion.correctIndex ? 0 : 0)) // Score is already updated before? No, state update usually async but here we rely on prev. 
            // Wait, we updated score above. Just passing the final calculated score might be tricky if we depend on 'score' state variable which might not have updated yet in this render cycle if we called multiple setters.
            // Actually, safe way: pass score.
        } else {
            setCurrentIndex(prev => prev + 1)
            setSelectedOption(null)
            setIsAnswered(false)
        }
    }

    const resetQuiz = () => {
        setCurrentIndex(0)
        setSelectedOption(null)
        setIsAnswered(false)
        setScore(0)
        setShowResult(false)
    }

    if (showResult) {
        const passed = score >= quiz.questions.length / 2 // Simple pass logic
        return (
            <Card className="text-center p-8 bg-white/90 backdrop-blur">
                <div className="flex justify-center mb-4">
                    {passed ? <CheckCircle className="w-16 h-16 text-emerald-500" /> : <XCircle className="w-16 h-16 text-red-500" />}
                </div>
                <h2 className="text-2xl font-bold mb-2">{passed ? "Tebrikler!" : "Biraz Daha Çalışalım"}</h2>
                <p className="text-muted-foreground mb-6">
                    {quiz.questions.length} sorudan {score} tanesini doğru bildin.
                </p>
                <div className="flex gap-4 justify-center">
                    <Button onClick={resetQuiz} variant="outline"><RefreshCcw className="mr-2 w-4 h-4" /> Tekrar Dene</Button>
                    {passed && <Button onClick={() => window.location.href = '/learn'}>Dersleri Gör</Button>}
                </div>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-2xl mx-auto shadow-xl">
            <CardHeader>
                <div className="flex justify-between items-center text-sm text-muted-foreground uppercase tracking-wider">
                    <span>Soru {currentIndex + 1} / {quiz.questions.length}</span>
                    <span>Puan: {score}</span>
                </div>
                <CardTitle className="text-xl mt-2">{currentQuestion.text}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedOption === index
                    const isCorrect = index === currentQuestion.correctIndex

                    let variantClass = "border-2 hover:bg-muted"
                    if (isAnswered) {
                        if (isCorrect) variantClass = "border-emerald-500 bg-emerald-50 text-emerald-700"
                        else if (isSelected) variantClass = "border-red-500 bg-red-50 text-red-700"
                        else variantClass = "opacity-50"
                    } else if (isSelected) {
                        variantClass = "border-primary bg-primary/5"
                    }

                    return (
                        <div
                            key={index}
                            onClick={() => handleOptionSelect(index)}
                            className={cn(
                                "p-4 rounded-lg cursor-pointer transition-all font-medium flex items-center justify-between",
                                variantClass
                            )}
                        >
                            {option}
                            {isAnswered && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                            {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                        </div>
                    )
                })}
            </CardContent>
            <CardFooter className="justify-end">
                <Button onClick={handleNext} disabled={!isAnswered}>
                    {isLastQuestion ? "Sonucu Gör" : "Sonraki Soru"} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
            </CardFooter>
        </Card>
    )
}
