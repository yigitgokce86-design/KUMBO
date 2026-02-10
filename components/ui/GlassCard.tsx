import React from 'react';
import styles from './GlassCard.module.css';
import { clsx } from 'clsx';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
    onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
    children,
    className,
    hoverEffect = false,
    onClick,
}) => {
    return (
        <div
            className={clsx(
                styles.card,
                hoverEffect && styles.hover,
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
