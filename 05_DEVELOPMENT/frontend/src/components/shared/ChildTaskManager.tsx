import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from './RewardSystem';

interface Props {
    onBalanceUpdate: (amount: number) => void;
}

const ChildTaskManager: React.FC<Props> = ({ onBalanceUpdate }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const syncTasks = () => {
            const stored = localStorage.getItem('kumbo_tasks');
            if (stored) {
                setTasks(JSON.parse(stored));
            }
        };

        syncTasks();
        // Listen for changes (can be simple polling or custom event, for now we sync when component mounts/updates)
        const interval = setInterval(syncTasks, 2000);
        return () => clearInterval(interval);
    }, []);

    const updateTaskStatus = (id: string, newStatus: Task['status']) => {
        const updatedTasks = tasks.map(t =>
            t.id === id ? { ...t, status: newStatus } : t
        );
        setTasks(updatedTasks);
        localStorage.setItem('kumbo_tasks', JSON.stringify(updatedTasks));

        // If child confirms reward, update the shared user balance
        if (newStatus === 'settled') {
            const task = tasks.find(t => t.id === id);
            if (task) {
                onBalanceUpdate(task.reward);
            }
        }
    };

    return (
        <div className="bubble-card space-y-4 !p-5">
            <h3 className="text-lg font-black flex items-center gap-2">
                <span>🎯</span> Görevlerim
            </h3>

            <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {tasks.filter(t => t.status !== 'settled').map((task) => (
                        <motion.div
                            key={task.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#F5F5F5] p-4 rounded-3xl border-2 border-white flex justify-between items-center"
                        >
                            <div className="flex-1 pr-2">
                                <p className="font-black text-sm text-[#3E2723] leading-tight">{task.title}</p>
                                <p className="text-[10px] font-black text-[#4CAF50] uppercase">+{task.reward} TL ÖDÜL</p>
                            </div>

                            {task.status === 'pending' && (
                                <button
                                    onClick={() => updateTaskStatus(task.id, 'completed')}
                                    className="bg-[#4CAF50] text-white text-[10px] px-3 py-2 rounded-xl font-black shadow-[0_3px_0_0_#388E3C] active:translate-y-1 active:shadow-none whitespace-nowrap"
                                >
                                    BİTTİ! 🐿️
                                </button>
                            )}

                            {task.status === 'completed' && (
                                <span className="text-[#3E2723]/40 text-[10px] font-black uppercase tracking-tighter italic whitespace-nowrap animate-pulse">
                                    ONAY BEKLENİYOR...
                                </span>
                            )}

                            {task.status === 'verified' && (
                                <button
                                    onClick={() => updateTaskStatus(task.id, 'settled')}
                                    className="bg-[#FF9800] text-white text-[10px] px-3 py-2 rounded-xl font-black shadow-[0_3px_0_0_#E68A00] active:translate-y-1 active:shadow-none animate-bounce"
                                >
                                    ÖDÜLÜ ALDIM 🏆
                                </button>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {tasks.filter(t => t.status !== 'settled').length === 0 && (
                    <div className="text-center py-4 bg-[#F5F5F5] rounded-3xl border-2 border-dashed border-[#3E2723]/10">
                        <p className="text-xs font-bold text-[#3E2723]/40">HİÇ GÖREVİN YOK, HARİKASIN! 🌰</p>
                    </div>
                )}
            </div>

            <p className="text-[8px] font-black text-[#3E2723]/30 text-center uppercase tracking-widest leading-tight">
                GÖREVİ BİTİR ➜ EBEVEYN ONAYI ➜ ÖDÜLÜ ONAYLA (GÜVEN BAĞI)
            </p>
        </div>
    );
};

export default ChildTaskManager;
