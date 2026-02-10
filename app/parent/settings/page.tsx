'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';
import { ArrowLeft, Wallet, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { logEvent } from '@/lib/analytics';

interface ChildAllowance {
    id: string;
    name: string;
    avatar: string; // Emoji
    allowanceAmount: number;
    allowanceDay: string;
    lastPaid: string | null;
    balance: number;
}

const DAYS = [
    { value: 'Monday', label: 'Pazartesi' },
    { value: 'Tuesday', label: 'Salı' },
    { value: 'Wednesday', label: 'Çarşamba' },
    { value: 'Thursday', label: 'Perşembe' },
    { value: 'Friday', label: 'Cuma' },
    { value: 'Saturday', label: 'Cumartesi' },
    { value: 'Sunday', label: 'Pazar' },
];

export default function AllowancePage() {
    const { user } = useAuth();
    const [children, setChildren] = useState<ChildAllowance[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null); // Child ID being saved

    useEffect(() => {
        if (user) {
            fetchChildren();
        }
    }, [user]);

    const fetchChildren = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('parent_id', user?.id)
                .eq('role', 'child');

            if (error) throw error;

            if (data) {
                const transformed = data.map((child: any) => ({
                    id: child.id,
                    name: child.name,
                    avatar: child.avatar_url || '👤',
                    allowanceAmount: child.allowance_amount || 0,
                    allowanceDay: child.allowance_day || 'Friday',
                    lastPaid: child.last_allowance_paid,
                    balance: 0 // Fetch actual balance via separate query if needed, or assume transaction sum
                    // For now, let's keep it simple.
                }));
                setChildren(transformed);
            }
        } catch (error) {
            console.error('Error fetching children:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateSettings = async (childId: string, updates: Partial<ChildAllowance>) => {
        // Optimistic UI
        setChildren(prev => prev.map(c =>
            c.id === childId ? { ...c, ...updates } : c
        ));

        // DB Update
        try {
            const { error } = await supabase
                .from('users')
                .update({
                    allowance_amount: updates.allowanceAmount,
                    allowance_day: updates.allowanceDay
                })
                .eq('id', childId);

            if (error) throw error;
        } catch (err) {
            console.error('Failed to update settings', err);
            // Revert on error?
        }
    };

    const handlePayNow = async (childId: string) => {
        const child = children.find(c => c.id === childId);
        if (!child || child.allowanceAmount <= 0) return;

        if (!confirm(`${child.name} kullanıcısına ${child.allowanceAmount} ₺ harçlık göndermek istiyor musunuz?`)) return;

        setSaving(childId);
        try {
            // 1. Create Transaction
            const { error: txError } = await supabase
                .from('transactions')
                .insert({
                    user_id: childId,
                    amount: child.allowanceAmount,
                    type: 'allowance',
                    description: 'Haftalık Harçlık'
                });

            if (txError) throw txError;

            // 2. Update User (Last Paid + Balance Trigger handled by DB or manual update here)
            // Note: Ideally a DB trigger handles balance calc. For MVP we might need to manually update if we aren't using triggers yet.
            // Let's manually update last_paid for now.
            const { error: userError } = await supabase
                .from('users')
                .update({
                    last_allowance_paid: new Date().toISOString()
                })
                .eq('id', childId);

            if (userError) throw userError;

            // Success feedback
            alert('Harçlık gönderildi! 💸');
            setChildren(prev => prev.map(c =>
                c.id === childId ? { ...c, lastPaid: new Date().toISOString() } : c
            ));
            logEvent('allowance_paid', user?.id || 'unknown', { child_id: childId, amount: child.allowanceAmount });

        } catch (err) {
            console.error('Payment failed', err);
            alert('İşlem başarısız oldu.');
        } finally {
            setSaving(null);
        }
    };

    if (loading) return <div className="flex-center p-12">Yükleniyor...</div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/parent/dashboard" className={styles.backButton}>
                    <ArrowLeft size={24} />
                </Link>
                <div className={styles.headerText}>
                    <h1 className={styles.pageTitle}>Harçlık Ayarları</h1>
                    <p className="text-slate-500 text-sm">Haftalık harçlıkları planlayın</p>
                </div>
            </header>

            <div className={styles.grid}>
                {children.map(child => (
                    <GlassCard key={child.id} className={styles.card}>
                        <div className={styles.childHeader}>
                            <div className={styles.avatar}>{child.avatar}</div>
                            <div>
                                <h3 className={styles.childName}>{child.name}</h3>
                                {/* <p className={styles.balance}>Cüzdan: <span className={styles.balanceValue}>??? ₺</span></p> */}
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Haftalık Tutar (₺)</label>
                            <input
                                type="number"
                                className={styles.input}
                                value={child.allowanceAmount}
                                onChange={(e) => handleUpdateSettings(child.id, { allowanceAmount: parseFloat(e.target.value) || 0 })}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Ödeme Günü</label>
                            <select
                                className={styles.input}
                                value={child.allowanceDay}
                                onChange={(e) => handleUpdateSettings(child.id, { allowanceDay: e.target.value })}
                            >
                                {DAYS.map(day => (
                                    <option key={day.value} value={day.value}>{day.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.payButton}>
                            <Button
                                variant="primary"
                                fullWidth
                                leftIcon={<Wallet size={18} />}
                                onClick={() => handlePayNow(child.id)}
                                isLoading={saving === child.id}
                                disabled={child.allowanceAmount <= 0}
                            >
                                Şimdi Öde ({child.allowanceAmount} ₺)
                            </Button>
                            {child.lastPaid && (
                                <p className={styles.lastPaid}>
                                    Son ödeme: {new Date(child.lastPaid).toLocaleDateString('tr-TR')}
                                </p>
                            )}
                        </div>
                    </GlassCard>
                ))}

                {children.length === 0 && (
                    <div className="col-span-full text-center py-12 text-slate-500">
                        Henüz hiç çocuk eklemediniz. <Link href="/parent/add-child" className="text-indigo-600 font-bold hover:underline">Ekle</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
