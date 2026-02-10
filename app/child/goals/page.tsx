/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { GoalCard } from '@/components/child/GoalCard';
import styles from './page.module.css';
import { ArrowLeft, Rocket } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function GoalsPage() {
    const [goals, setGoals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem('kumbo_current_child');
        if (stored) {
            const child = JSON.parse(stored);
            fetchGoals(child.id);
        }
    }, []);

    const fetchGoals = async (childId: string) => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('goals')
                .select('*')
                .eq('child_id', childId)
                .neq('status', 'rejected') // Don't show rejected goals? Or show them differently. Let's hide for now or showed as closed.
                .order('created_at', { ascending: false });

            if (data) {
                // Map DB columns to Component props
                const mapped = data.map(g => ({
                    id: g.id,
                    title: g.title,
                    targetAmount: g.target_amount,
                    currentAmount: g.current_amount,
                    emoji: null // We might not have emoji in DB yet, can add later or parse from title
                }));
                setGoals(mapped);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/child/dashboard" className={styles.backButton}>
                    <ArrowLeft size={24} />
                </Link>
                <h1 className={styles.pageTitle}>Hedeflerim</h1>
                <div style={{ width: 24 }} />
            </header>

            <div className={styles.grid}>
                {/* Add New Goal Card - First */}
                <GoalCard
                    id="new"
                    title="Yeni Hedef"
                    targetAmount={0}
                    currentAmount={0}
                    isNew
                    onClick={() => router.push('/child/goals/new')}
                />

                {goals.map(goal => (
                    <GoalCard
                        key={goal.id}
                        {...goal}
                        onClick={() => console.log('View Goal', goal.id)}
                    />
                ))}
            </div>

            <div className={styles.tipSection}>
                <div className={styles.tipIcon}>
                    <Rocket size={20} className="text-white" />
                </div>
                <p className={styles.tipText}>
                    İpucu: Her gün az da olsa biriktirmek, büyük hedeflere ulaşmanı sağlar!
                </p>
            </div>
        </div>
    );
}
