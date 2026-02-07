"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlayCircle, Lock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Lesson } from "@/lib/content-data"
import { cn } from "@/lib/utils"

interface LessonCardProps {
    lesson: Lesson
    status: 'locked' | 'unlocked' | 'completed'
}

export function LessonCard({ lesson, status }: LessonCardProps) {
    const isLocked = status === 'locked'
    const isCompleted = status === 'completed'

    return (
        <Card className={cn(
            "overflow-hidden transition-all hover:shadow-md",
            isLocked && "opacity-60 grayscale"
        )}>
            <div className="relative h-32 w-full bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={lesson.thumbnail} alt={lesson.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    {isLocked ? <Lock className="text-white w-8 h-8" /> : <PlayCircle className="text-white w-10 h-10 hover:scale-110 transition-transform" />}
                </div>
                <Badge className="absolute bottom-2 right-2 bg-black/50 text-white hover:bg-black/70">
                    {lesson.duration}
                </Badge>
            </div>

            <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg leading-tight">{lesson.title}</h3>
                    {isCompleted && <CheckCircle className="text-emerald-500 w-5 h-5" />}
                </div>
            </CardHeader>

            <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {lesson.description}
                </p>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button
                    asChild
                    className="w-full"
                    variant={isCompleted ? "outline" : "default"}
                    disabled={isLocked}
                >
                    <Link href={isLocked ? '#' : `/learn/${lesson.slug}`}>
                        {isCompleted ? 'Tekrar İzle' : 'Derse Başla'}
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
