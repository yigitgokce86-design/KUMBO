'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AvatarSelector } from '@/components/ui/AvatarSelector';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import styles from './page.module.css';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function AddChildPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [name, setName] = useState('');
    const [pin, setPin] = useState(''); // Simple text input for setup, max 4 chars
    const [avatar, setAvatar] = useState('🦁');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Allow fallback even if user is not fully authed in Supabase (demo mode)
        // if (!user) return; 

        if (!name.trim()) { setError('Name is required'); return; }
        if (pin.length !== 4) { setError('PIN must be 4 digits'); return; }

        setLoading(true);
        setError('');

        const newChild = {
            id: crypto.randomUUID(),
            parent_id: user?.id || 'demo-parent',
            role: 'child',
            name: name.trim(),
            pin_hash: pin,
            avatar_url: avatar,
            // UI helper fields
            balance: 0,
            pendingTasks: 0,
            activeGoal: 'No Goal Set',
            goalProgress: 0,
            avatar: avatar // For UI compatibility
        };

        try {
            // Try Supabase insert
            if (user) {
                const { error: dbError } = await supabase
                    .from('users')
                    .insert({
                        parent_id: user.id,
                        role: 'child',
                        name: newChild.name,
                        pin_hash: newChild.pin_hash,
                        avatar_url: newChild.avatar_url
                    });

                if (dbError) throw dbError;
            } else {
                throw new Error("No user detected");
            }

        } catch (err: any) {
            console.warn('Database write failed, saving locally:', err);

            // Fallback: Save to LocalStorage
            const existing = JSON.parse(localStorage.getItem('kumbo_children') || '[]');
            localStorage.setItem('kumbo_children', JSON.stringify([...existing, newChild]));

            // Optional: Alert user
            // alert('Saved to local storage (Database unavailable)');
        } finally {
            setLoading(false);
            router.push('/parent/dashboard');
            router.refresh();
        }
    };

    return (
        <div className={styles.container}>
            <GlassCard className={styles.card}>
                <div className={styles.header}>
                    <Link href="/parent/dashboard" className={styles.backLink}>
                        <ChevronLeft size={20} /> Back
                    </Link>
                    <h1 className={styles.title}>Add a Child</h1>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.avatarSection}>
                        <label className={styles.label}>Choose an Avatar</label>
                        <AvatarSelector selectedAvatar={avatar} onSelect={setAvatar} />
                    </div>

                    <Input
                        label="Child's Name"
                        placeholder="e.g. Leo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Input
                        label="4-Digit PIN"
                        placeholder="1234"
                        type="tel"
                        maxLength={4}
                        value={pin}
                        onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
                    />

                    {error && <p className={styles.error}>{error}</p>}

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        isLoading={loading}
                        disabled={loading}
                        style={{ marginTop: '1rem' }}
                    >
                        Create Profile
                    </Button>
                </form>
            </GlassCard>
        </div>
    );
}
