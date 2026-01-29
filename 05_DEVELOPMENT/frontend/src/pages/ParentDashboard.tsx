import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChildStats from '../components/shared/ChildStats';
import RewardSystem from '../components/shared/RewardSystem';

const ParentDashboard: React.FC = () => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState(false);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const stored = localStorage.getItem('kumbo_user');
        if (stored) {
            setUserData(JSON.parse(stored));
        }
    }, []);

    const checkAnswer = () => {
        if (parseInt(answer) === 27) {
            setIsUnlocked(true);
            setError(false);
        } else {
            setError(true);
            setAnswer('');
        }
    };

    const togglePremium = (status: boolean) => {
        if (!userData) return;
        const updated = { ...userData, isPremium: status };
        setUserData(updated);
        localStorage.setItem('kumbo_user', JSON.stringify(updated));
    };

    return (
        <div className="min-h-screen bg-[#FFF8E1] p-6 flex flex-col items-center">
            <AnimatePresence mode="wait">
                {!isUnlocked ? (
                    <motion.div
                        key="gate"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bubble-card w-full max-w-sm text-center space-y-6 mt-20"
                    >
                        <div className="text-4xl">🔐</div>
                        <h2 className="text-2xl font-black">Ebeveyn Girişi</h2>
                        <p className="text-lg font-medium text-muted-foreground">Devam etmek için aşağıdaki soruyu çözmelisin:</p>
                        <div className="text-3xl font-black bg-[#F5F5F5] p-4 rounded-2xl text-[#3E2723]">
                            12 + 15 = ?
                        </div>
                        <input
                            type="number"
                            placeholder="Cevap..."
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className={`w-full p-4 rounded-2xl border-4 outline-none text-center text-2xl font-black bg-white ${error ? 'border-red-500 animate-shake' : 'border-[#F5F5F5] focus:border-[#4CAF50]'}`}
                        />
                        <button
                            onClick={checkAnswer}
                            disabled={!answer}
                            className={`fiko-button w-full text-xl uppercase ${!answer ? 'opacity-50 grayscale shadow-none translate-y-1' : ''}`}
                        >
                            KİLİDİ AÇ
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-6xl space-y-8"
                    >
                        <header className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm">
                            <div>
                                <h1 className="text-3xl font-black text-[#4CAF50]">Ebeveyn Paneli</h1>
                                <p className="text-lg font-bold text-[#3E2723]/60">KUMBO Yönetimi 🌰</p>
                            </div>
                            <div className="w-14 h-14 bg-[#FF9800] text-white rounded-full flex items-center justify-center shadow-lg text-2xl">👤</div>
                        </header>

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
                            {/* Left Column: Child Status & Stats */}
                            <div className="xl:col-span-2 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Child Card */}
                                    <div className="bubble-card space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-[#FF9800] rounded-full flex items-center justify-center text-3xl shadow-md">🐿️</div>
                                            <div>
                                                <h3 className="text-2xl font-black uppercase">{userData?.name || 'Yiğit'}</h3>
                                                <p className="text-sm font-bold text-[#3E2723]/60 italic truncate max-w-[150px]">{userData?.itemName || 'LEGO City'}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="w-full h-4 bg-[#F5F5F5] rounded-full overflow-hidden border-2 border-[#F5F5F5]">
                                                <div
                                                    className="h-full bg-[#4CAF50] rounded-full transition-all duration-1000"
                                                    style={{ width: `${Math.min(100, ((userData?.currentBalance || 0) / (userData?.itemPrice || 1500)) * 100)}%` }}
                                                />
                                            </div>
                                            <div className="flex justify-between text-xs font-black text-[#3E2723]">
                                                <span>%{Math.round(((userData?.currentBalance || 0) / (userData?.itemPrice || 1500)) * 100)} Tamamlandı</span>
                                                <span>{userData?.currentBalance || 0} / {userData?.itemPrice || 1500} TL</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subscription Plan Card (NEW Revenue Model Function) */}
                                    <div className="bubble-card space-y-6 bg-gradient-to-br from-white to-[#FFF8E1]">
                                        <h3 className="text-lg font-black flex items-center gap-2">
                                            <span>💎</span> Üyelik Durumu
                                        </h3>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => togglePremium(false)}
                                                className={`flex-1 p-3 rounded-2xl border-4 transition-all text-xs font-black ${!userData?.isPremium ? 'border-[#4CAF50] bg-white shadow-md' : 'border-[#F5F5F5] opacity-50'}`}
                                            >
                                                ÜCRETSİZ <br /> (Reklamlı)
                                            </button>
                                            <button
                                                onClick={() => togglePremium(true)}
                                                className={`flex-1 p-3 rounded-2xl border-4 transition-all text-xs font-black ${userData?.isPremium ? 'border-[#FF9800] bg-white shadow-md text-[#FF9800]' : 'border-[#F5F5F5] opacity-50'}`}
                                            >
                                                PREMIUM <br /> (Reklamsız)
                                            </button>
                                        </div>
                                        <p className="text-[10px] font-bold text-[#3E2723]/40 text-center uppercase tracking-tighter">
                                            Premium üyeler reklam görmez ve sınırsız hedef ekleyebilirler.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <ChildStats />
                                    {/* Transaction Log */}
                                    <div className="bubble-card space-y-6">
                                        <h3 className="text-xl font-black border-b-4 border-[#F5F5F5] pb-3 flex items-center gap-2">
                                            <span>📜</span> Son Hareketler
                                        </h3>
                                        <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="flex justify-between items-center p-3 bg-[#F5F5F5] rounded-2xl">
                                                    <div className="flex items-center space-x-2 text-xs">
                                                        <span className="text-xl">🌰</span>
                                                        <div>
                                                            <p className="font-black">Harçlık</p>
                                                            <p className="text-[8px] font-bold text-[#3E2723]/40 uppercase">29 Ocak</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-[#4CAF50] font-black text-sm">+50 TL</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Reward/Task System */}
                            <div className="xl:col-span-1">
                                <RewardSystem />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ParentDashboard;
