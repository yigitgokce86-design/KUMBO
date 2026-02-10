'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import styles from './page.module.css';
import { ArrowRight, Mail, Lock, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function ParentLoginPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                router.push('/parent/dashboard');
            } else {
                const { error, data } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            role: 'parent',
                            full_name: 'Parent User' // Simplified for MVP
                        }
                    }
                });
                if (error) throw error;
                // If auto-confirm is enabled, they are logged in.
                // If email confirmation is required, show message.
                if (data.user && !data.session) {
                    setError('Please check your email to confirm your account.');
                } else {
                    // Create profile if using custom trigger or manual creation
                    // For now, depending on the SQL trigger availability, 
                    // we assume the profile is created or we do it here.
                    const { error: profileError } = await supabase.from('profiles').insert({
                        id: data.user!.id,
                        role: 'parent',
                        full_name: 'Kumbo Parent',
                        balance: 0
                    });
                    if (profileError) {
                        // Profile might already exist due to trigger
                        console.log('Profile creation note:', profileError.message);
                    }

                    router.push('/parent/dashboard');
                }
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <GlassCard className={styles.card}>
                <h1 className={styles.title}>
                    {isLogin ? 'Parent Login' : 'Create Account'}
                </h1>
                <p className={styles.subtitle}>
                    {isLogin ? 'Welcome back! Manage your family.' : 'Start your family\'s financial journey.'}
                </p>

                <form onSubmit={handleAuth} className="space-y-4 my-6">
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <Button
                        variant="primary"
                        className="w-full justify-center"
                        disabled={loading}
                        rightIcon={loading ? <Loader2 className="animate-spin" /> : <ArrowRight size={20} />}
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </Button>
                </form>

                <div className="text-center text-sm text-slate-500">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-indigo-600 font-bold hover:underline"
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </div>

                <div style={{ height: 16 }} />

                <Link href="/">
                    <Button variant="ghost" className="w-full justify-center">Back Home</Button>
                </Link>
            </GlassCard>
        </div>
    );
}
