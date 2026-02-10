import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import styles from './GoalCard.module.css';
import { clsx } from 'clsx';
import { Trophy } from 'lucide-react';

interface GoalCardProps {
    id: string;
    title: string;
    targetAmount: number;
    currentAmount: number;
    emoji?: string;
    isNew?: boolean; // If true, renders as a "Add New" button
    onClick?: () => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({
    title,
    targetAmount,
    currentAmount,
    emoji,
    isNew,
    onClick
}) => {
    if (isNew) {
        return (
            <button className={styles.newCard} onClick={onClick}>
                <div className={styles.plusIcon}>+</div>
                <span className={styles.newText}>Yeni Hedef</span>
            </button>
        );
    }

    const percentage = Math.min(100, Math.round((currentAmount / targetAmount) * 100));

    return (
        <GlassCard className={styles.card} hoverEffect onClick={onClick}>
            <div className={styles.iconBox}>
                {emoji || <Trophy size={24} className="text-yellow-500" />}
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.amounts}>
                    <span className={styles.current}>{currentAmount} ₺</span>
                    <span className={styles.target}> / {targetAmount} ₺</span>
                </p>

                <div className={styles.progressBg}>
                    <div
                        className={styles.progressFill}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        </GlassCard>
    );
};
