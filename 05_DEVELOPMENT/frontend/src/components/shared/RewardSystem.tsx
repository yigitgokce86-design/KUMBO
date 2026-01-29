import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Task {
    id: string;
    title: string;
    reward: number;
    status: 'pending' | 'completed' | 'verified' | 'settled';
}

const RewardSystem: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskReward, setNewTaskReward] = useState(10);

    // Initial Load & Sync with LocalStorage
    useEffect(() => {
        const stored = localStorage.getItem('kumbo_tasks');
        if (stored) {
            setTasks(JSON.parse(stored));
        } else {
            const initialTasks: Task[] = [
                { id: '1', title: 'Odanı Topla', reward: 10, status: 'pending' },
                { id: '2', title: 'Kitap Oku (20 sayfa)', reward: 15, status: 'pending' },
            ];
            setTasks(initialTasks);
            localStorage.setItem('kumbo_tasks', JSON.stringify(initialTasks));
        }
    }, []);

    const saveTasks = (newTasks: Task[]) => {
        setTasks(newTasks);
        localStorage.setItem('kumbo_tasks', JSON.stringify(newTasks));
    };

    const addTask = () => {
        if (!newTaskTitle) return;
        const newTask: Task = {
            id: Date.now().toString(),
            title: newTaskTitle,
            reward: newTaskReward,
            status: 'pending',
        };
        saveTasks([...tasks, newTask]);
        setNewTaskTitle('');
    };

    const verifyTask = (id: string) => {
        const newTasks = tasks.map(t =>
            t.id === id ? { ...t, status: 'verified' as const } : t
        );
        saveTasks(newTasks);
    };

    const deleteTask = (id: string) => {
        const newTasks = tasks.filter(t => t.id !== id);
        saveTasks(newTasks);
    };

    return (
        <div className="bubble-card space-y-6">
            <h3 className="text-xl font-black flex items-center gap-2">
                <span className="text-2xl">🎁</span> Görev Atama (Ebeveyn)
            </h3>

            {/* Add Task Form */}
            <div className="bg-[#F5F5F5] p-4 rounded-2xl space-y-3">
                <input
                    type="text"
                    placeholder="Yeni görev adı..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full p-4 rounded-xl border-4 border-white focus:border-[#4CAF50] outline-none font-bold text-[#3E2723] bg-white mb-2"
                />
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Ödül (TL)"
                        value={newTaskReward}
                        onChange={(e) => setNewTaskReward(parseInt(e.target.value))}
                        className="w-1/2 p-4 rounded-xl border-4 border-white focus:border-[#4CAF50] outline-none font-bold text-[#3E2723] bg-white"
                    />
                    <button
                        onClick={addTask}
                        disabled={!newTaskTitle}
                        className={`w-1/2 bg-[#4CAF50] text-white font-black rounded-xl transition-all shadow-[0_4px_0_0_#388E3C] active:translate-y-1 active:shadow-none ${!newTaskTitle ? 'opacity-50 grayscale' : ''}`}
                    >
                        GÖREV EKLE
                    </button>
                </div>
            </div>

            {/* Task List */}
            <div className="space-y-3">
                <AnimatePresence>
                    {tasks.map((task) => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`p-4 rounded-2xl border-4 flex justify-between items-center transition-colors ${task.status === 'settled' ? 'bg-[#4CAF50]/10 border-[#4CAF50]/20' :
                                    task.status === 'verified' ? 'bg-[#FF9800]/10 border-[#FF9800]/20' :
                                        'bg-white border-[#F5F5F5]'
                                }`}
                        >
                            <div className="flex-1">
                                <p className={`font-black text-sm ${task.status === 'settled' ? 'line-through text-[#3E2723]/40' : 'text-[#3E2723]'}`}>
                                    {task.title}
                                </p>
                                <p className="text-[10px] font-black text-[#FF9800] uppercase tracking-tighter">{task.reward} TL ÖDÜL</p>
                            </div>

                            <div className="flex items-center gap-2">
                                {task.status === 'completed' ? (
                                    <button
                                        onClick={() => verifyTask(task.id)}
                                        className="bg-[#FF9800] text-white text-[10px] px-3 py-2 rounded-xl font-black shadow-[0_3px_0_0_#E68A00] active:translate-y-1 active:shadow-none"
                                    >
                                        ONAYLA
                                    </button>
                                ) : task.status === 'verified' ? (
                                    <span className="text-[#FF9800] font-black text-[10px] animate-pulse">ÖDÜL BEKLENİYOR...</span>
                                ) : task.status === 'settled' ? (
                                    <span className="text-[#4CAF50] font-black text-[10px]">✓ TAMAMLANDI</span>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span className="text-[#3E2723]/40 text-[10px] font-black uppercase tracking-tighter italic">YAPILIYOR...</span>
                                        <button onClick={() => deleteTask(task.id)} className="text-red-400 p-1">✕</button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {tasks.length === 0 && (
                    <div className="text-center py-6 opacity-40">
                        <p className="text-sm font-bold uppercase tracking-widest">Hiç görev yok 🐿️</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RewardSystem;
