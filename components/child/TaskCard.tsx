import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import styles from './TaskCard.module.css';
import { CheckCircle2, Clock, Star } from 'lucide-react';
import { clsx } from 'clsx';

interface TaskCardProps {
    id: string;
    title: string;
    reward: number;
    status: 'available' | 'pending_approval' | 'approved' | 'rejected';
    onComplete: (id: string) => void;
    isLoading?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({
    id,
    title,
    reward,
    status,
    onComplete,
    isLoading
}) => {
    const isPending = status === 'pending_approval';
    const isApproved = status === 'approved';

    return (
        <GlassCard className={clsx(styles.card, isPending && styles.pending)}>
            <div className={styles.left}>
                <div className={clsx(styles.iconBox, isPending ? styles.iconPending : styles.iconActive)}>
                    {isPending ? <Clock size={24} /> : <Star size={24} />}
                </div>
                <div>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.reward}>
                        +{reward.toFixed(2)} ₺
                    </p>
                </div>
            </div>

            <div className={styles.right}>
                {status === 'available' && (
                    <Button
                        size="sm"
                        onClick={() => onComplete(id)}
                        isLoading={isLoading}
                        variant="secondary"
                        leftIcon={<CheckCircle2 size={16} />}
                    >
                        Tamamla
                    </Button>
                )}
                {status === 'pending_approval' && (
                    <span className={styles.statusBadge}>Kontrol Ediliyor</span>
                )}
                {status === 'approved' && (
                    <span className={styles.statusBadgeApproved}>Ödendi</span>
                )}
                {status === 'rejected' && (
                    <span className={styles.statusBadge} style={{ background: '#fecaca', color: '#b91c1c' }}>Reddedildi</span>
                )}
            </div>
        </GlassCard>
    );
};
