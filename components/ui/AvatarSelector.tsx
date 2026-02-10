import React from 'react';
import styles from './AvatarSelector.module.css';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';

const AVATARS = [
    '🐶', '🐱', '🦁', '🦊',
    '🐼', '🐨', '🐯', '🐸',
    '🦄', '🐲', '🚀', '⭐'
];

interface AvatarSelectorProps {
    selectedAvatar?: string;
    onSelect: (avatar: string) => void;
}

export const AvatarSelector: React.FC<AvatarSelectorProps> = ({ selectedAvatar, onSelect }) => {
    return (
        <div className={styles.grid}>
            {AVATARS.map((avatar) => (
                <button
                    key={avatar}
                    className={clsx(
                        styles.avatarBtn,
                        selectedAvatar === avatar && styles.selected
                    )}
                    onClick={() => onSelect(avatar)}
                >
                    {avatar}
                    {selectedAvatar === avatar && (
                        <div className={styles.checkBadge}>
                            <Check size={12} strokeWidth={4} />
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
};
