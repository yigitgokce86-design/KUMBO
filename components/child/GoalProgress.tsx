import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import styles from './GoalProgress.module.css'; // We'll create this next
import { Trophy } from 'lucide-react';

interface GoalProgressProps {
    title: string;
    currentAmount: number;
    targetAmount: number;
    imageUrl?: string;
}

export const GoalProgress: React.FC<GoalProgressProps> = ({
    title,
    currentAmount,
    targetAmount,
    imageUrl
}) => {
    const percentage = Math.min(100, Math.round((currentAmount / targetAmount) * 100));

    return (
        <GlassCard className={styles.container}>
            <div className={styles.header}>
                <div className={styles.label}>
                    <Trophy size={20} className="text-yellow-500" />
                    <span>Hedefim</span>
                </div>
                <span className={styles.percentage}>{percentage}%</span>
            </div>

            <div className={styles.content}>
                <div className={styles.imagePlaceholder}>
                    {imageUrl ? <img src={imageUrl} alt={title} /> : <span style={{ fontSize: '2rem' }}>🚲</span>}
                </div>
                <div className={styles.details}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.amount}>
                        <span className={styles.current}>{currentAmount} ₺</span>
                        <span className={styles.target}> / {targetAmount} ₺</span>
                    </p>
                </div>
            </div>

            <div className={styles.progressBarBg}>
                <div
                    className={styles.progressBarFill}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </GlassCard>
    );
};
