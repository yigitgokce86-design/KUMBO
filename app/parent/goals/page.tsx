/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { ParentGoalCard } from '@/components/parent/ParentGoalCard';
import { GlassCard } from '@/components/ui/GlassCard'; // Ensure this is used if needed, or remove import
import styles from './page.module.css';
import { ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { logEvent } from '@/lib/analytics';

export default function ParentGoalsPage() {
    const { user } = useAuth();
    const [goals, setGoals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchGoals();
        }
    }, [user]);

    const fetchGoals = async () => {
        try {
            setLoading(true);
            // Fetch all goals for children of this parent
            // We need to join with users to get child name
            const { data, error } = await supabase
                .from('goals')
                .select(`
                    *,
                    child:users(name)
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (data) {
                const formattedGoals = data.map(g => ({
                    ...g,
                    amount: g.target_amount, // Map target_amount to amount for card
                    childName: g.child?.name || 'Çocuk'
                }));
                setGoals(formattedGoals);
            }
        } catch (error) {
            console.error('Error fetching goals:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string) => {
        const { error } = await supabase
            .from('goals')
            .update({ status: 'active' }) // Approving makes it active for the child to save towards
            .eq('id', id);

        if (!error) {
            setGoals(prev => prev.map(g =>
                g.id === id ? { ...g, status: 'active' } : g
            ));
            logEvent('goal_approved', user?.id || 'unknown', { goal_id: id });
        }
    };

    const handleDeny = async (id: string) => {
        const { error } = await supabase
            .from('goals')
            .update({ status: 'rejected' })
            .eq('id', id);

        if (!error) {
            setGoals(prev => prev.map(g =>
                g.id === id ? { ...g, status: 'rejected' } : g
            ));
        }
    };

    const pendingCount = goals.filter(g => g.status === 'pending_approval').length;

    if (loading) return <div className="flex-center p-12">Yükleniyor...</div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/parent/dashboard" className={styles.backButton}>
                    <ArrowLeft size={24} />
                </Link>
                <div className={styles.headerText}>
                    <h1 className={styles.pageTitle}>Hedef İstekleri</h1>
                    {/* <p className="text-slate-500 text-sm">Çocuklarınızın tasarruf hedeflerini inceleyin</p> */}
                </div>
            </header>

            <section className={styles.section}>
                <div className={styles.hero}>
                    <ShieldCheck size={32} className="text-indigo-600" />
                    <div>
                        <h2 className={styles.heroTitle}>Güvenli Hedefler</h2>
                        <p className={styles.heroDesc}>Çocuklarınızın koyduğu hedefleri inceleyerek onlara rehberlik edin.</p>
                    </div>
                </div>
            </section>

            <section className={styles.listSection}>
                <h3 className={styles.listTitle}>
                    Onay Bekleyenler
                    {pendingCount > 0 && <span className={styles.badge}>{pendingCount}</span>}
                </h3>

                {pendingCount === 0 && (
                    <div className={styles.emptyState}>
                        <CheckCircle2 size={24} className="text-emerald-500 mb-2" />
                        <p>Bekleyen hedef isteği yok. Harika!</p>
                    </div>
                )}

                <div className={styles.list}>
                    {goals.filter(g => g.status === 'pending_approval').map(goal => (
                        <ParentGoalCard
                            key={goal.id}
                            {...goal}
                            // Pass mapped props if needed or ensure component handles it
                            status="pending_approval" // Explicitly pass status for TS if needed
                            onApprove={handleApprove}
                            onDeny={handleDeny}
                        />
                    ))}
                </div>
            </section>

            <section className={styles.listSection}>
                <h3 className={styles.listTitle}>Geçmiş / Aktif Hedefler</h3>
                <div className={styles.list}>
                    {goals.filter(g => g.status !== 'pending_approval').map(goal => (
                        <ParentGoalCard
                            key={goal.id}
                            {...goal}
                            onApprove={handleApprove} // Optional: allow re-approving?
                            onDeny={handleDeny}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
