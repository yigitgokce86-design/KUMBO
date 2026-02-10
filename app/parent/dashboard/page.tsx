'use client';

import React, { useEffect, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { ChildOverviewCard } from '@/components/parent/ChildOverviewCard';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import styles from './page.module.css';
import { Bell, Plus, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

interface ChildData {
    id: string;
    name: string;
    avatar: string;
    balance: number;
    pendingTasks: number;
    activeGoal: string;
    goalProgress: number;
}

export default function ParentDashboardPage() {
    const { user, loading: authLoading, signOut } = useAuth();
    const [children, setChildren] = useState<ChildData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            fetchChildren();
        }
    }, [authLoading, user]);

    const fetchChildren = async () => {
        try {
            // Try Supabase first
            if (user) {
                const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('parent_id', user.id)
                    .eq('role', 'child');

                if (error) {
                    console.warn('Supabase fetch failed, falling back to local storage:', error);
                    throw error;
                };

                if (data && data.length > 0) {
                    const transformedChildren = data.map((child: any) => ({
                        id: child.id,
                        name: child.name || 'Unknown',
                        avatar: child.avatar_url || '👤',
                        balance: 0,
                        pendingTasks: 0,
                        activeGoal: 'No Goal Set',
                        goalProgress: 0
                    }));
                    setChildren(transformedChildren);
                    setLoading(false); // Ensure loading stops if successful
                    return;
                }
            }
        } catch (error) {
            console.log('Using local/mock data due to error or empty DB');
        }

        // Fallback: Load from LocalStorage or use Mock Data
        const localData = localStorage.getItem('kumbo_children');
        if (localData) {
            setChildren(JSON.parse(localData));
        } else {
            // Default Mock Data for immediate "restored" feel
            setChildren([
                {
                    id: '1',
                    name: 'Leo',
                    avatar: '🦁',
                    balance: 12.50,
                    pendingTasks: 3,
                    activeGoal: 'New Bicycle',
                    goalProgress: 70
                },
                {
                    id: '2',
                    name: 'Mia',
                    avatar: '🦄',
                    balance: 45.00,
                    pendingTasks: 0,
                    activeGoal: 'Lego Set',
                    goalProgress: 22
                }
            ]);
        }
        setLoading(false);
    };

    const handleDeleteChild = async (childId: string) => {
        // 1. Optimistic Update
        const updatedChildren = children.filter(c => c.id !== childId);
        setChildren(updatedChildren);

        // 2. Local Storage Update
        localStorage.setItem('kumbo_children', JSON.stringify(updatedChildren));

        // 3. Supabase Update (if user exists)
        if (user) {
            try {
                await supabase.from('users').delete().eq('id', childId);
            } catch (error) {
                console.error('Failed to delete from Supabase:', error);
                // Optionally revert state if strict consistency is needed
            }
        }
    };

    const handleEditChild = async (childId: string) => {
        const childToEdit = children.find(c => c.id === childId);
        if (!childToEdit) return;

        // Simple prompt for now - could be a modal
        const newName = window.prompt("Enter new name:", childToEdit.name);
        if (newName && newName !== childToEdit.name) {
            // 1. Optimistic Update
            const updatedChildren = children.map(c =>
                c.id === childId ? { ...c, name: newName } : c
            );
            setChildren(updatedChildren);

            // 2. Local Storage
            localStorage.setItem('kumbo_children', JSON.stringify(updatedChildren));

            // 3. Supabase
            if (user) {
                try {
                    await supabase.from('users').update({ name: newName }).eq('id', childId);
                } catch (error) {
                    console.error('Failed to update Supabase:', error);
                }
            }
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.pageTitle}>Ebeveyn Paneli</h1>
                <div className={styles.headerActions}>
                    <button
                        className={styles.iconBtn}
                        onClick={() => alert('Bildirimler yakında! 🔔')}
                    >
                        <Bell size={24} />
                        <span className={styles.badge}>3</span>
                    </button>
                    <button
                        onClick={async () => {
                            await signOut();
                            window.location.href = '/'; // Force redirect to home
                        }}
                        className={styles.iconBtn}
                    >
                        <LogOut size={24} />
                    </button>
                </div>
            </header>

            <section className={styles.overviewSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Ailem</h2>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {children.length > 0 && (
                            <>
                                <Link href="/parent/tasks">
                                    <Button size="sm" variant="secondary" className="bg-indigo-100 text-indigo-700">
                                        Görevleri Yönet
                                    </Button>
                                </Link>
                                <Link href="/parent/goals">
                                    <Button size="sm" variant="secondary" className="bg-emerald-100 text-emerald-700">
                                        Hedef İstekleri
                                    </Button>
                                </Link>
                            </>
                        )}
                        <Link href="/parent/add-child">
                            <Button size="sm" variant="secondary" leftIcon={<Plus size={16} />}>
                                Çocuk Ekle
                            </Button>
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <div className="flex-center" style={{ minHeight: '200px' }}>Yükleniyor...</div>
                ) : children.length === 0 ? (
                    <GlassCard className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
                        <h3 className="text-xl font-bold mb-2">Kumbo'ya Hoş Geldiniz!</h3>
                        <p className="text-slate-500 mb-6">Başlamak için ilk çocuğunuzu ekleyin.</p>
                        <Link href="/parent/add-child">
                            <Button variant="primary" size="lg" leftIcon={<Plus size={20} />}>
                                Çocuk Profili Ekle
                            </Button>
                        </Link>
                    </GlassCard>
                ) : (
                    <div className={styles.childrenGrid}>
                        {children.map(child => (
                            <ChildOverviewCard
                                key={child.id}
                                {...child}
                                onDelete={handleDeleteChild}
                                onEdit={handleEditChild}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Premium Banner */}
            <section className="mb-6">
                <GlassCard className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-10 -translate-y-10" />
                    <div className="relative z-10">
                        <h3 className="text-lg font-bold mb-2">Kumbo Premium'a Geçin ✨</h3>
                        <p className="opacity-90 mb-4 text-sm max-w-md">Çocuklarınız için sınırsız görevler, detaylı raporlar ve özel oyunlaştırılmış içerikler.</p>
                        <Button
                            size="sm"
                            className="bg-white text-indigo-600 hover:bg-indigo-50 border-none"
                            onClick={() => alert('Yakında!')}
                        >
                            Bilgi Al
                        </Button>
                    </div>
                </GlassCard>
            </section>

            <section className={styles.settingsSection}>
                <Link href="/parent/settings">
                    <GlassCard className={styles.settingsCard} hoverEffect>
                        <div className={styles.settingIcon}>
                            <Settings size={24} className="text-slate-600" />
                        </div>
                        <div className={styles.settingContent}>
                            <h3 className={styles.settingTitle}>Harçlık Ayarları</h3>
                            <p className={styles.settingDesc}>Haftalık ödemeleri ve kuralları yönet</p>
                        </div>
                    </GlassCard>
                </Link>
            </section>
        </div>
    );
}
