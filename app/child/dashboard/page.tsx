'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GoalProgress } from '@/components/child/GoalProgress';
import styles from './page.module.css'; // We'll create this next
import { Flame, Star, Wallet, GraduationCap, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function ChildDashboardPage() {
    // Dynamic Data from Login
    const [child, setChild] = React.useState<any>(null);

    React.useEffect(() => {
        const stored = localStorage.getItem('kumbo_current_child');
        if (stored) {
            setChild(JSON.parse(stored));
        }
    }, []);

    const childName = child?.name || "Buddy";
    const streak = child?.streak || 5;
    const balance = child?.balance || 0.00;

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <div>
                    <h1 className={styles.greeting}>Günaydın, {childName}! ☀️</h1>
                    <p className={styles.subtitle}>Bugünü harika yapalım.</p>
                </div>
                <div className={styles.streakBadge}>
                    <Flame className="text-orange-500 fill-orange-500" size={20} />
                    <span>{streak} Gün</span>
                </div>
            </header>

            {/* Main Goal Section */}
            <section className={styles.section}>
                <GoalProgress
                    title="Yeni Bisiklet"
                    currentAmount={85}
                    targetAmount={120}
                />
            </section>

            {/* Quick Actions Grid */}
            <section className={styles.actionGrid}>
                <Link href="/child/earn" className={styles.actionCardWrapper}>
                    <GlassCard hoverEffect className={`${styles.actionCard} ${styles.earnCard}`}>
                        <div className={styles.iconCircle}>
                            <Star size={32} className="text-white" />
                        </div>
                        <span className={styles.actionTitle}>Kazan</span>
                        <span className={styles.actionDesc}>2 yeni görev</span>
                    </GlassCard>
                </Link>

                <Link href="/child/save" className={styles.actionCardWrapper}>
                    <GlassCard hoverEffect className={`${styles.actionCard} ${styles.saveCard}`}>
                        <div className={styles.iconCircle}>
                            <Wallet size={32} className="text-white" />
                        </div>
                        <span className={styles.actionTitle}>Biriktir</span>
                        <span className={styles.actionDesc}>{balance.toFixed(2)} ₺ cüzdanda</span>
                    </GlassCard>
                </Link>

                <Link href="/child/learn" className={styles.actionCardWrapper}>
                    <GlassCard hoverEffect className={`${styles.actionCard} ${styles.learnCard}`}>
                        <div className={styles.iconCircle}>
                            <GraduationCap size={32} className="text-white" />
                        </div>
                        <span className={styles.actionTitle}>Öğren</span>
                        <span className={styles.actionDesc}>Yeni ders var!</span>
                    </GlassCard>
                </Link>
            </section>
        </div>
    );
}
