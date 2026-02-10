'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css'; // Re-use main goals styles or create new
import { ArrowLeft, Target, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { logEvent } from '@/lib/analytics';

export default function NewGoalPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const stored = localStorage.getItem('kumbo_current_child');
        if (!stored) return;
        const child = JSON.parse(stored);

        try {
            const { data, error } = await supabase
                .from('goals')
                .insert({
                    child_id: child.id,
                    title: title,
                    target_amount: parseFloat(amount),
                    current_amount: 0,
                    status: 'pending_approval' // Needs parent approval
                })
                .select()
                .single();

            if (error) throw error;

            logEvent('goal_created', child.id, { goal_id: data.id, amount: parseFloat(amount) });
            router.push('/child/goals');
        } catch (err) {
            console.error('Failed to create goal', err);
            alert('Bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <header style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <Link href="/child/goals" style={{ marginRight: '1rem', padding: '0.5rem', background: 'rgba(255,255,255,0.5)', borderRadius: '50%' }}>
                    <ArrowLeft size={24} />
                </Link>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--indigo-600), var(--purple-600))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Yeni Hedef
                </h1>
            </header>

            <GlassCard className="p-6">
                <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div className="flex-center" style={{ width: 64, height: 64, background: '#e0e7ff', borderRadius: '50%', margin: '0 auto' }}>
                        <Target size={32} className="text-indigo-600" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-600 mb-2">Hedefin Nedir?</label>
                        <input
                            type="text"
                            placeholder="Örn: Bisiklet, Lego..."
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1.1rem' }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-600 mb-2">Hedef Tutar (₺)</label>
                        <input
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            required
                            min="1"
                            step="0.5"
                            style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1.1rem' }}
                        />
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        fullWidth
                        isLoading={loading}
                        leftIcon={<Save size={20} />}
                        className="mt-4"
                    >
                        Hedefi Kaydet
                    </Button>
                </form>
            </GlassCard>
        </div>
    );
}
