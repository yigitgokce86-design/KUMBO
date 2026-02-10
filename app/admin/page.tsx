'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import styles from './page.module.css';
import { supabase } from '@/lib/supabaseClient';
import { Users, Target, CheckSquare, Activity } from 'lucide-react';

// Define event interface
interface AnalyticsEvent {
    id: string;
    event: string;
    metadata: Record<string, any>; // Keeping any for metadata flexibility for now, or use unknown
    timestamp: string;
}

export default function AdminPage() {
    const [stats, setStats] = useState({
        totalParents: 0,
        totalChildren: 0,
        activeGoals: 0,
        completedTasks: 0
    });
    const [events, setEvents] = useState<AnalyticsEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();

        // Optional: Realtime subscription could go here
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);

            // 1. Fetch Stats (Parallel)
            const [
                { count: parents },
                { count: children },
                { count: goals },
                { count: tasks }
            ] = await Promise.all([
                supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'parent'),
                supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'child'),
                supabase.from('goals').select('*', { count: 'exact', head: true }).eq('status', 'active'),
                supabase.from('tasks').select('*', { count: 'exact', head: true }).eq('status', 'approved')
            ]);

            setStats({
                totalParents: parents || 0,
                totalChildren: children || 0,
                activeGoals: goals || 0,
                completedTasks: tasks || 0
            });

            // 2. Fetch Recent Activity
            // Join with user to get name if possible
            const { data: activity } = await supabase
                .from('analytics_events')
                .select('*') // If we set up relation, could select user:users(name)
                .order('timestamp', { ascending: false })
                .limit(20);

            if (activity) {
                setEvents(activity);
            }

        } catch (err) {
            console.error('Admin data fetch failed', err);
        } finally {
            setLoading(false);
        }
    };

    const formatEvent = (event: AnalyticsEvent) => {
        // Map event types to Turkish descriptions
        const map: Record<string, string> = {
            'task_created': 'Yeni Görev Oluşturuldu',
            'task_completed': 'Çocuk Görevi Tamamladı',
            'task_approved': 'Ebeveyn Görevi Onayladı',
            'goal_created': 'Yeni Hedef Oluşturuldu',
            'goal_approved': 'Hedef Onaylandı',
            'user_login': 'Kullanıcı Girişi',
            'allowance_paid': 'Harçlık Ödendi'
        };
        return map[event.event] || event.event;
    };

    const getIcon = (type: string) => {
        if (type.includes('task')) return '📋';
        if (type.includes('goal')) return '🎯';
        if (type.includes('allowance')) return '💸';
        return '👤';
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Kurucu Paneli</h1>
                <p className={styles.subtitle}>Sistem metrikleri ve aktiviteleri</p>
            </header>

            <div className={styles.statsGrid}>
                <GlassCard className={styles.statCard} hoverEffect>
                    <span className={styles.statLabel}>Toplam Aile</span>
                    <span className={styles.statValue}>{stats.totalParents}</span>
                    <Users size={24} className="text-indigo-400 absolute top-6 right-6 opacity-20" />
                </GlassCard>
                <GlassCard className={styles.statCard} hoverEffect>
                    <span className={styles.statLabel}>Toplam Çocuk</span>
                    <span className={styles.statValue}>{stats.totalChildren}</span>
                    <Users size={24} className="text-pink-400 absolute top-6 right-6 opacity-20" />
                </GlassCard>
                <GlassCard className={styles.statCard} hoverEffect>
                    <span className={styles.statLabel}>Aktif Hedefler</span>
                    <span className={styles.statValue}>{stats.activeGoals}</span>
                    <Target size={24} className="text-amber-400 absolute top-6 right-6 opacity-20" />
                </GlassCard>
                <GlassCard className={styles.statCard} hoverEffect>
                    <span className={styles.statLabel}>Biten Görevler</span>
                    <span className={styles.statValue}>{stats.completedTasks}</span>
                    <CheckSquare size={24} className="text-emerald-400 absolute top-6 right-6 opacity-20" />
                </GlassCard>
            </div>

            <GlassCard className="p-6">
                <h2 className={styles.sectionTitle}>Son Aktiviteler</h2>
                <div className={styles.feed}>
                    {events.length === 0 ? (
                        <p className="text-slate-500">Henüz aktivite yok.</p>
                    ) : (
                        events.map(ev => (
                            <div key={ev.id} className={styles.activityItem}>
                                <div className={styles.activityIcon}>
                                    {getIcon(ev.event)}
                                </div>
                                <div className={styles.activityContent}>
                                    <p className={styles.activityText}>
                                        <strong>{formatEvent(ev)}</strong>
                                        {/* Optional details if metadata exists */}
                                        {ev.metadata?.amount && ` - ${ev.metadata.amount} ₺`}
                                    </p>
                                    <p className={styles.activityTime}>
                                        {new Date(ev.timestamp).toLocaleString('tr-TR')}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </GlassCard>
        </div>
    );
}
