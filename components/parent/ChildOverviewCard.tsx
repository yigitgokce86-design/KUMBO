import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import styles from './ChildOverviewCard.module.css';
import { Wallet, AlertCircle, TrendingUp, ChevronRight, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface ChildOverviewCardProps {
    id: string;
    name: string;
    avatar: string; // Emoji
    balance: number;
    pendingTasks: number;
    activeGoal: string;
    goalProgress: number; // 0-100
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export const ChildOverviewCard: React.FC<ChildOverviewCardProps> = ({
    id,
    name,
    avatar,
    balance,
    pendingTasks,
    activeGoal,
    goalProgress,
    onEdit,
    onDelete
}) => {
    return (
        <GlassCard className={styles.card} hoverEffect>
            <div className={styles.header}>
                <div className={styles.profile}>
                    <div className={styles.avatar}>{avatar}</div>
                    <div>
                        <h3 className={styles.name}>{name}</h3>
                        <p className={styles.status}>Bugün aktif</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit && onEdit(id)}
                        title="Çocuğu Düzenle"
                    >
                        <Pencil size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            if (window.confirm('Bu cüzdanı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) {
                                onDelete && onDelete(id);
                            }
                        }}
                        className="text-red-500 hover:bg-red-50"
                        title="Cüzdanı Sil"
                    >
                        <Trash2 size={16} />
                    </Button>
                    <Link href={`/parent/child/${id}`}>
                        <Button variant="ghost" size="sm" rightIcon={<ChevronRight size={16} />}>
                            Detay
                        </Button>
                    </Link>
                </div>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.stat}>
                    <span className={styles.statLabel}>Cüzdan</span>
                    <div className={styles.statValue}>
                        <Wallet size={16} className="text-indigo-500" />
                        {balance.toFixed(2)} ₺
                    </div>
                </div>

                <div className={styles.stat}>
                    <span className={styles.statLabel}>Bekleyen İşlem</span>
                    {pendingTasks > 0 ? (
                        <div className={`${styles.statValue} ${styles.alert}`}>
                            <AlertCircle size={16} />
                            {pendingTasks} Görev
                        </div>
                    ) : (
                        <div className={`${styles.statValue} ${styles.good}`}>Temiz</div>
                    )}
                </div>
            </div>

            <div className={styles.goalSection}>
                <div className={styles.goalHeader}>
                    <span className={styles.goalLabel}>Hedef: {activeGoal}</span>
                    <span className={styles.goalPercent}>{goalProgress}%</span>
                </div>
                <div className={styles.progressBg}>
                    <div className={styles.progressFill} style={{ width: `${goalProgress}%` }} />
                </div>
            </div>
        </GlassCard>
    );
};
