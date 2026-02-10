import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import styles from './ParentTaskCard.module.css';
import { Check, X, Clock, Trash2, Edit2 } from 'lucide-react';
import { clsx } from 'clsx';

interface ParentTaskCardProps {
    id: string;
    title: string;
    reward: number;
    childName: string;
    status: 'pending_approval' | 'approved' | 'available' | 'rejected';
    onApprove?: (id: string) => void;
    onDeny?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export const ParentTaskCard: React.FC<ParentTaskCardProps> = ({
    id,
    title,
    reward,
    childName,
    status,
    onApprove,
    onDeny,
    onDelete
}) => {
    return (
        <GlassCard className={styles.card}>
            <div className={styles.mainContent}>
                <div className={styles.info}>
                    <div className={styles.headerRow}>
                        <span className={styles.childBadge}>{childName}</span>
                        <span className={clsx(styles.statusBadge, styles[status])}>
                            {status === 'pending_approval' ? 'Onay Bekliyor' :
                                status === 'approved' ? 'Onaylandı' :
                                    status === 'rejected' ? 'Reddedildi' : 'Aktif'}
                        </span>
                    </div>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.reward}>{reward.toFixed(2)} ₺</p>
                </div>

                <div className={styles.actions}>
                    {status === 'pending_approval' && (
                        <>
                            <Button
                                size="sm"
                                variant="secondary" // Green-ish usually
                                onClick={() => onApprove?.(id)}
                                leftIcon={<Check size={16} />}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white"
                            >
                                Onayla
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => onDeny?.(id)}
                                leftIcon={<X size={16} />}
                                className="text-red-500 hover:bg-red-50"
                            >
                                Reddet
                            </Button>
                        </>
                    )}

                    {status === 'available' && (
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onDelete?.(id)}
                            className="text-slate-400 hover:text-red-500"
                        >
                            <Trash2 size={16} />
                        </Button>
                    )}
                </div>
            </div>
        </GlassCard>
    );
};
