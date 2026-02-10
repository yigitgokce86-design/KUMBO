import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import styles from './LessonCard.module.css';
import { PlayCircle, CheckCircle2, Lock } from 'lucide-react';
import { clsx } from 'clsx';

interface LessonCardProps {
    id: string;
    title: string;
    duration: string;
    isLocked?: boolean;
    isCompleted?: boolean;
    thumbnailColor?: string; // CSS gradient string
    onClick?: () => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
    title,
    duration,
    isLocked,
    isCompleted,
    thumbnailColor = 'linear-gradient(135deg, #6366f1, #a855f7)',
    onClick
}) => {
    return (
        <GlassCard
            className={clsx(styles.card, isLocked && styles.locked)}
            hoverEffect={!isLocked}
            onClick={!isLocked ? onClick : undefined}
        >
            <div className={styles.thumbnail} style={{ background: thumbnailColor }}>
                {isLocked ? (
                    <Lock className="text-white/50" size={32} />
                ) : isCompleted ? (
                    <CheckCircle2 className="text-white" size={32} />
                ) : (
                    <PlayCircle className="text-white" size={32} />
                )}
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <span className={styles.duration}>{duration}</span>
            </div>

            {isCompleted && <div className={styles.statusBar} />}
        </GlassCard>
    );
};
