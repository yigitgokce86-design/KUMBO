import React from 'react';
import styles from './JarVisual.module.css';

interface JarVisualProps {
    fillPercentage: number; // 0 to 100
}

export const JarVisual: React.FC<JarVisualProps> = ({ fillPercentage }) => {
    // Clamp percentage between 5% and 95% for visual aesthetics so it doesn't look empty or overfull
    const visualHeight = Math.max(5, Math.min(95, fillPercentage));

    return (
        <div className={styles.container}>
            <div className={styles.jar}>
                <div className={styles.lid} />
                <div className={styles.glass}>
                    <div
                        className={styles.liquid}
                        style={{ height: `${visualHeight}%` }}
                    >
                        <div className={styles.surface} />
                    </div>
                    <div className={styles.highlight} />
                </div>
            </div>
            <div className={styles.shadow} />
        </div>
    );
};
