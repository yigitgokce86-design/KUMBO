import React from 'react';
import { motion } from 'framer-motion';

interface HazelnutPiggyBankProps {
    progress: number; // 0 to 100
    targetAmount: number;
    currentAmount: number;
}

const HazelnutPiggyBank: React.FC<HazelnutPiggyBankProps> = ({ progress, targetAmount, currentAmount }) => {
    // Generate some "floating" hazelnuts based on progress
    const hazelnutCount = Math.floor(progress / 5);

    return (
        <div className="relative w-full max-w-sm mx-auto p-8 bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-primary/20">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />

            {/* Progress Circle Container */}
            <div className="relative aspect-square flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        className="stroke-background fill-none"
                        strokeWidth="10"
                    />
                    <motion.circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        className="stroke-primary fill-none"
                        strokeWidth="10"
                        strokeDasharray="100 100"
                        initial={{ strokeDashoffset: 100 }}
                        animate={{ strokeDashoffset: 100 - progress }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                    />
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-5xl font-black text-foreground">{Math.round(progress)}%</span>
                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">İlerleme</span>
                </div>

                {/* Floating Hazelnuts Decoration */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-2xl"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: i < hazelnutCount ? 1 : 0,
                            opacity: i < hazelnutCount ? 0.6 : 0,
                            y: [0, -10, 0]
                        }}
                        transition={{
                            y: { duration: 2, repeat: Infinity, delay: i * 0.2 },
                            scale: { duration: 0.5 }
                        }}
                        style={{
                            top: `${50 + 40 * Math.sin((i * 45 * Math.PI) / 180)}%`,
                            left: `${50 + 40 * Math.cos((i * 45 * Math.PI) / 180)}%`,
                        }}
                    >
                        🌰
                    </motion.div>
                ))}
            </div>

            {/* Money Labels */}
            <div className="mt-8 space-y-2">
                <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-muted-foreground">Biriken</span>
                    <span className="text-primary">{currentAmount.toLocaleString('tr-TR')} TL</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-muted-foreground">
                    <span>Hedef</span>
                    <span>{targetAmount.toLocaleString('tr-TR')} TL</span>
                </div>

                {/* Progress Bar Detail */}
                <div className="w-full h-4 bg-background rounded-full overflow-hidden mt-4">
                    <motion.div
                        className="h-full bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1.5 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default HazelnutPiggyBank;
