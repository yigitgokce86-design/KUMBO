import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import styles from './ParentGoalCard.module.css';
import { Check, X, Target } from 'lucide-react';
import { clsx } from 'clsx';

interface ParentGoalCardProps {
    id: string;
    childName: string;
    title: string;
    amount: number;
    // Status should match database or app usage. 'pending_approval' is what we use in page.tsx
    status: 'pending_approval' | 'active' | 'approved' | 'rejected' | 'completed';
    onApprove?: (id: string) => void;
    onDeny?: (id: string) => void;
}

export const ParentGoalCard: React.FC<ParentGoalCardProps> = ({
    id,
    childName,
    title,
    amount,
    status,
    onApprove,
    onDeny,
}) => {
    return (
        <GlassCard className={styles.card}>
            <div className={styles.iconBox}>
                <Target size={24} className="text-indigo-600" />
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <span className={styles.childBadge}>{childName}</span>
                    <span className={styles.date}>Bugün</span>
                </div>

                <h3 className={styles.title}>{title}</h3>
                <p className={styles.amount}>Hedef: {amount.toFixed(2)} ₺</p>

                {status === 'pending_approval' ? (
                    <div className={styles.actions}>
                        <Button
                            size="sm"
                            variant="secondary" // Green-ish usually, can override via className
                            className="bg-emerald-500 hover:bg-emerald-600 text-white"
                            onClick={() => onApprove?.(id)}
                            leftIcon={<Check size={16} />}
                        >
                            Onayla
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:bg-red-50"
                            onClick={() => onDeny?.(id)}
                            leftIcon={<X size={16} />}
                        >
                            Reddet
                        </Button>
                    </div>
                ) : (
                    <div className={clsx(styles.statusBadge, styles[status])}>
                        {status === 'active' || status === 'approved' ? 'Onaylandı' :
                            status === 'completed' ? 'Tamamlandı' :
                                status === 'rejected' ? 'Reddedildi' : 'Bilinmiyor'}
                    </div>
                )}
            </div>
        </GlassCard>
    );
};
