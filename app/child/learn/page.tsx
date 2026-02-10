'use client';

import React, { useState } from 'react';
import { LessonCard } from '@/components/child/LessonCard';
import styles from './page.module.css';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import Link from 'next/link';

// Mock Data
const LESSONS = [
    {
        id: '1',
        title: 'İstek mi, İhtiyaç mı?',
        duration: '2 dk',
        isCompleted: true,
        thumbnailColor: 'linear-gradient(135deg, #F59E0B, #FBBF24)'
    },
    {
        id: '2',
        title: 'Bisiklet İçin Nasıl Para Biriktirilir?',
        duration: '3 dk',
        isCompleted: false,
        thumbnailColor: 'linear-gradient(135deg, #10B981, #34D399)'
    },
    {
        id: '3',
        title: 'Faiz Nedir?',
        duration: '5 dk',
        isLocked: true,
        thumbnailColor: 'linear-gradient(135deg, #6366F1, #818CF8)'
    },
];

export default function LearnPage() {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    const handleLessonOpen = (id: string, title: string) => {
        console.log(`Open lesson: ${title}`);
        setActiveVideo(id);
        // In a real app, this would open a video modal or navigate to /child/learn/[id]
        alert(`Playing video: ${title}`);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/child/dashboard" className={styles.backButton}>
                    <ArrowLeft size={24} />
                </Link>
                <h1 className={styles.pageTitle}>Öğren</h1>
                <div style={{ width: 24 }} />
            </header>

            <div className={styles.heroSection}>
                <div className={styles.heroIcon}>
                    <Lightbulb size={32} className="text-white" />
                </div>
                <div className={styles.heroText}>
                    <h2 className={styles.heroTitle}>Seviye Atla!</h2>
                    <p className={styles.heroSubtitle}>Rozet kazanmak ve para sırlarını öğrenmek için videoları izle.</p>
                </div>
            </div>

            <div className={styles.lessonList}>
                {LESSONS.map(lesson => (
                    <LessonCard
                        key={lesson.id}
                        {...lesson}
                        onClick={() => handleLessonOpen(lesson.id, lesson.title)}
                    />
                ))}
            </div>
        </div>
    );
}
