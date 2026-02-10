'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { PinInput } from '@/components/ui/PinInput';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';

// Mock users for now (will replace with Supabase data later)
const MOCK_USERS = [
    { id: '1', name: 'Leo', avatar: '🦁' },
    { id: '2', name: 'Mia', avatar: '🦄' },
];

export default function ChildLoginPage() {
    const router = useRouter();
    const [step, setStep] = useState<'select' | 'pin'>('select');
    const [selectedChild, setSelectedChild] = useState<typeof MOCK_USERS[0] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChildSelect = (child: typeof MOCK_USERS[0]) => {
        setSelectedChild(child);
        setStep('pin');
    };


    // ... inside component

    const handlePinComplete = (pin: string) => {
        setIsLoading(true);
        console.log(`Verifying PIN ${pin} for user ${selectedChild?.name}`);

        // Simulate API call for now (can be replaced with real auth later)
        setTimeout(() => {
            setIsLoading(false);
            // Store selected child in session/local storage for the dashboard to use
            if (selectedChild) {
                localStorage.setItem('kumbo_current_child', JSON.stringify(selectedChild));
            }
            router.push('/child/dashboard');
        }, 1000);
    };

    return (
        <div className={styles.container}>
            <GlassCard className={styles.card}>
                {step === 'select' ? (
                    <div className={styles.titleSection}>
                        <div>
                            <h1 className={styles.title}>
                                Sana en çok kim benziyor?
                            </h1>
                            <p className={styles.subtitle}>Giriş yapmak için profilini seç!</p>
                        </div>

                        <div className={styles.grid}>
                            {MOCK_USERS.map((user) => (
                                <button
                                    key={user.id}
                                    onClick={() => handleChildSelect(user)}
                                    className={styles.userBtn}
                                >
                                    <div className={styles.avatarDisplay}>
                                        {user.avatar}
                                    </div>
                                    <span className={styles.userName}>
                                        {user.name}
                                    </span>
                                </button>
                            ))}

                            {/* Add New Child Placeholder */}
                            <button disabled className={`${styles.userBtn} ${styles.addNewBtn}`}>
                                <div className={styles.addNewPlaceholder}>
                                    +
                                </div>
                                <span className={styles.subtitle} style={{ fontSize: '0.875rem' }}>Yeni Ekle</span>
                            </button>
                        </div>

                        <Link href="/" className={styles.backLink}>
                            ← Ana Sayfaya Dön
                        </Link>
                    </div>
                ) : (
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setStep('select')}
                            className={styles.backBtn}
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <div className={styles.pinHeader}>
                            <div className={styles.avatarSmall}>
                                {selectedChild?.avatar}
                            </div>
                            <h1 className={styles.welcomeTitle}>
                                Merhaba, {selectedChild?.name}!
                            </h1>
                            <p className={styles.subtitle}>Gizli kodunu gir</p>
                        </div>

                        <PinInput
                            onComplete={handlePinComplete}
                            isLoading={isLoading}
                        />

                        {isLoading && (
                            <p className={styles.loadingText}>
                                Sihirli kod kontrol ediliyor...
                            </p>
                        )}
                    </div>
                )}
            </GlassCard>
        </div>
    );
}
