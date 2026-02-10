/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { ParentTaskCard } from '@/components/parent/ParentTaskCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';
import { ArrowLeft, Plus, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

// Mock Data
const INITIAL_TASKS = [
    { id: '1', title: 'Bulaşıkları boşalt', reward: 0.50, childName: 'Leo', status: 'pending_approval' as const },
    { id: '2', title: 'Köpeği gezdir', reward: 1.50, childName: 'Leo', status: 'approved' as const },
    { id: '3', title: 'Odanı topla', reward: 2.00, childName: 'Leo', status: 'available' as const },
    { id: '4', title: 'Çiçekleri sula', reward: 1.00, childName: 'Mia', status: 'available' as const },
];

export default function ParentTasksPage() {
    const [tasks, setTasks] = useState(INITIAL_TASKS);

    const handleApprove = (id: string) => {
        setTasks(prev => prev.map(t =>
            t.id === id ? { ...t, status: 'approved' } : t
        ));
        // TODO: Add to child balance logic here
    };

    const handleDeny = (id: string) => {
        setTasks(prev => prev.map(t =>
            t.id === id ? { ...t, status: 'available' } : t
        ));
    };

    const handleDelete = (id: string) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    const pendingCount = tasks.filter(t => t.status === 'pending_approval').length;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/parent/dashboard" className={styles.backButton}>
                    <ArrowLeft size={24} />
                </Link>
                <h1 className={styles.pageTitle}>Görevler & İşler</h1>
                <Button size="sm" leftIcon={<Plus size={16} />}>Yeni</Button>
            </header>

            {/* Pending Approvals Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    Onay Bekleyenler
                    {pendingCount > 0 && <span className={styles.badge}>{pendingCount}</span>}
                </h2>
                {pendingCount === 0 ? (
                    <GlassCard className={styles.emptyState}>
                        <CheckCircle2 size={32} className="text-emerald-500 mb-2" />
                        <p className="text-slate-500">Her şey yolunda! Onaylanacak görev yok.</p>
                    </GlassCard>
                ) : (
                    <div className={styles.list}>
                        {tasks.filter(t => t.status === 'pending_approval').map(task => (
                            <ParentTaskCard
                                key={task.id}
                                {...task}
                                onApprove={handleApprove}
                                onDeny={handleDeny}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Active Definitions Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Aktif Görev Listesi</h2>
                <div className={styles.list}>
                    {tasks.filter(t => t.status === 'available').map(task => (
                        <ParentTaskCard
                            key={task.id}
                            {...task}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
