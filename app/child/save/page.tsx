'use client';

import React from 'react';
import { JarVisual } from '@/components/child/JarVisual';
import { GlassCard } from '@/components/ui/GlassCard';
import styles from './page.module.css';
import { ArrowLeft, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import Link from 'next/link';

export default function SavePage() {
    const balance = 12.50;
    const goalTarget = 120; // e.g., total needed for current goal
    const fillPercentage = (balance / goalTarget) * 100;

    // Mock History
    const history = [
        { id: 1, label: 'Görev Kazancı', amount: 2.00, type: 'in', date: 'Bugün' },
        { id: 2, label: 'Haftalık Harçlık', amount: 5.00, type: 'in', date: 'Dün' },
        { id: 3, label: 'Dondurma', amount: -3.50, type: 'out', date: 'Pzt' },
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/child/dashboard" className={styles.backButton}>
                    <ArrowLeft size={24} />
                </Link>
                <h1 className={styles.pageTitle}>Cüzdanım</h1>
                <div style={{ width: 24 }} />
            </header>

            <GlassCard className={styles.balanceCard}>
                <h2 className={styles.balanceTitle}>Toplam Birikim</h2>
                <div className={styles.balanceAmount}>{balance.toFixed(2)} ₺</div>
                <JarVisual fillPercentage={fillPercentage} />
            </GlassCard>

            <div className={styles.historySection}>
                <h3 className={styles.sectionTitle}>Geçmiş</h3>
                <div className={styles.historyList}>
                    {history.map((item) => (
                        <div key={item.id} className={styles.historyItem}>
                            <div className={styles.historyIconBox} data-type={item.type}>
                                {item.type === 'in' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                            </div>
                            <div className={styles.historyDetails}>
                                <span className={styles.historyLabel}>{item.label}</span>
                                <span className={styles.historyDate}>{item.date}</span>
                            </div>
                            <span className={`${styles.historyAmount} ${item.type === 'in' ? styles.plus : styles.minus}`}>
                                {item.type === 'in' ? '+' : ''}{item.amount.toFixed(2)} ₺
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
