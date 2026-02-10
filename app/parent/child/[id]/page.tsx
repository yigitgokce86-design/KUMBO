'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';
import { ArrowLeft, Save, DollarSign, Calendar, Lock } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ChildDetailPage() {
    const params = useParams();
    const childId = params.id;

    // Mock Data (in real app, fetch based on childId)
    const childName = childId === '1' ? 'Leo' : 'Mia';

    const [allowanceAmount, setAllowanceAmount] = useState('5.00');
    const [payoutDay, setPayoutDay] = useState('Friday');
    const [requireTasks, setRequireTasks] = useState(true);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/parent/dashboard" className={styles.backButton}>
                    <ArrowLeft size={24} />
                </Link>
                <h1 className={styles.pageTitle}>{childName}'s Settings</h1>
                <div style={{ width: 24 }} />
            </header>

            <div className={styles.grid}>
                {/* Allowance Configuration */}
                <GlassCard className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.iconBox}>
                            <DollarSign size={24} className="text-emerald-600" />
                        </div>
                        <h2 className={styles.cardTitle}>Allowance</h2>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Weekly Amount</label>
                        <div className={styles.inputWrapper}>
                            <span className={styles.currencyPrefix}>$</span>
                            <input
                                type="number"
                                value={allowanceAmount}
                                onChange={(e) => setAllowanceAmount(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Payout Day</label>
                        <select
                            value={payoutDay}
                            onChange={(e) => setPayoutDay(e.target.value)}
                            className={styles.select}
                        >
                            <option>Monday</option>
                            <option>Friday</option>
                            <option>Sunday</option>
                        </select>
                    </div>

                    <div className={styles.toggleRow}>
                        <div className={styles.toggleLabel}>
                            <span>Require Task Completion</span>
                            <p className={styles.toggleDesc}>Must complete all assigned chores to receive allowance.</p>
                        </div>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={requireTasks}
                                onChange={(e) => setRequireTasks(e.target.checked)}
                            />
                            <span className={styles.slider} />
                        </label>
                    </div>

                    <Button variant="primary" size="lg" className="w-full mt-4" leftIcon={<Save size={20} />}>
                        Save Changes
                    </Button>
                </GlassCard>

                {/* Account Controls */}
                <GlassCard className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.iconBox}>
                            <Lock size={24} className="text-slate-600" />
                        </div>
                        <h2 className={styles.cardTitle}>Account & PIN</h2>
                    </div>

                    <div className={styles.infoRow}>
                        <span>Login PIN</span>
                        <Button variant="ghost" size="sm">Reset PIN</Button>
                    </div>

                    <div className={styles.infoRow}>
                        <span>Content Level</span>
                        <span className={styles.valueBadge}>Beginner (Age 6-8)</span>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
