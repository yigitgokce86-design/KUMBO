import React from 'react';
import { motion } from 'framer-motion';

const ChildStats: React.FC = () => {
    // Mock data for the chart
    const weeklyData = [
        { day: 'Pzt', amount: 20 },
        { day: 'Sal', amount: 0 },
        { day: 'Çar', amount: 50 },
        { day: 'Per', amount: 10 },
        { day: 'Cum', amount: 30 },
        { day: 'Cmt', amount: 100 },
        { day: 'Paz', amount: 40 },
    ];

    const maxAmount = Math.max(...weeklyData.map(d => d.amount));

    return (
        <div className="bubble-card space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="text-2xl">📊</span> Birikim Performansı
            </h3>

            {/* Simple Bar Chart */}
            <div className="flex items-end justify-between h-40 gap-2 px-2">
                {weeklyData.map((data, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <motion.div
                            className="w-full bg-primary/20 rounded-t-lg relative group"
                            initial={{ height: 0 }}
                            animate={{ height: `${(data.amount / maxAmount) * 100}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                        >
                            {/* Tooltip on hover */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {data.amount} TL
                            </div>
                            {data.amount > 0 && (
                                <div className="absolute bottom-0 left-0 w-full bg-primary rounded-t-lg h-full" />
                            )}
                        </motion.div>
                        <span className="text-xs font-bold text-muted-foreground">{data.day}</span>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                    <p className="text-xs font-bold text-muted-foreground uppercase">Haftalık Toplam</p>
                    <p className="text-xl font-black text-primary">250 TL</p>
                </div>
                <div className="text-center">
                    <p className="text-xs font-bold text-muted-foreground uppercase">Günlük Ort.</p>
                    <p className="text-xl font-black text-accent">35.7 TL</p>
                </div>
            </div>

            <div className="bg-primary/5 p-4 rounded-2xl flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <p className="text-sm font-medium leading-tight text-foreground/80">
                    <strong>Fiko'nun Notu:</strong> Yiğit hafta sonları daha fazla biriktiriyor! Belki hafta içi için küçük bir motivasyon ödülü verebilirsin.
                </p>
            </div>
        </div>
    );
};

export default ChildStats;
