'use client';

import React, { useState, useEffect } from 'react';
import { TaskCard } from '@/components/child/TaskCard';
import styles from './page.module.css';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { supabase } from '@/lib/supabaseClient';
import { logEvent } from '@/lib/analytics';
import confetti from 'canvas-confetti';

import { Task } from '@/types';

export default function EarnPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [childId, setChildId] = useState<string | null>(null);


    useEffect(() => {
        // Get child from local storage (simulating auth)
        const stored = localStorage.getItem('kumbo_current_child');
        if (stored) {
            const child = JSON.parse(stored);
            setChildId(child.id);
            fetchTasks(child.id);
        }
    }, []);

    const fetchTasks = async (cid: string) => {
        const { data } = await supabase
            .from('tasks')
            .select('*')
            .eq('child_id', cid)
            .or('status.eq.available,status.eq.pending_approval')
            .order('created_at', { ascending: false });

        if (data) setTasks(data);
    };

    // ... (in component)
    const handleComplete = async (id: string) => {
        // 1. Optimistic update
        setTasks(prev => prev.map(t =>
            t.id === id ? { ...t, status: 'pending_approval' } : t
        ));

        // 2. Trigger confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        // 3. Supabase Update
        const { error } = await supabase
            .from('tasks')
            .update({ status: 'pending_approval' })
            .eq('id', id);

        if (error) {
            console.error('Task update failed', error);
            // Revert on error?
        } else {
            logEvent('task_completed', childId || 'unknown', { task_id: id });
        }
    };

    return (
        <div className={styles.container}>
            {/* Headers and Hero... */}
            <header className={styles.header}>
                <Link href="/child/dashboard" className={styles.backButton}>
                    <ArrowLeft size={24} />
                </Link>
                <h1 className={styles.pageTitle}>Para Kazan</h1>
                <div style={{ width: 24 }} /> {/* Spacer */}
            </header>

            <div className={styles.introCard}>
                <GlassCard className={styles.hero}>
                    <div className={styles.heroIcon}>
                        <Sparkles size={32} className="text-white" />
                    </div>
                    <div>
                        <h2 className={styles.heroTitle}>Görevler</h2>
                        <p className={styles.heroSubtitle}>Hedeflerine ulaşmak için görevleri tamamla!</p>
                    </div>
                </GlassCard>
            </div>

            <div className={styles.taskList}>
                {tasks.length === 0 ? (
                    <div className="text-center text-slate-500 mt-8">
                        Şu an hiç görev yok. <br /> Harika gidiyorsun! 🎉
                    </div>
                ) : (
                    tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            reward={task.reward_amount}
                            status={task.status}
                            onComplete={handleComplete}
                        />
                    ))
                )}
            </div>
            {/* Removed custom confetti overlay */}
        </div>
    );
}

