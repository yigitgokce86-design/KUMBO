import React from 'react';
import styles from './Button.module.css';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    disabled,
    fullWidth,
    ...props
}) => {
    return (
        <button
            className={clsx(
                styles.button,
                styles[variant],
                styles[size],
                isLoading && styles.loading,
                fullWidth && styles.fullWidth,
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className={styles.spinner} size={18} />}
            {!isLoading && leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
            <span className={styles.content}>{children}</span>
            {!isLoading && rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
        </button>
    );
};
