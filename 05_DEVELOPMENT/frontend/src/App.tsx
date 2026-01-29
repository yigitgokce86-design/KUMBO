import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import HazelnutPiggyBank from './components/shared/HazelnutPiggyBank';
import Onboarding from './pages/Onboarding';
import ParentDashboard from './pages/ParentDashboard';
import FinancialStory from './pages/FinancialStory';
import ChildTaskManager from './components/shared/ChildTaskManager';
import { motion, AnimatePresence } from 'framer-motion';

// Bottom Navigation Component
const Navigation: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: "KUMBO'RA", icon: '🌰' },
        { path: '/story', label: 'HİKAYE', icon: '📖' },
        { path: '/parent', label: 'EBEVEYN', icon: '🔐' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t-4 border-[#F5F5F5] px-6 py-3 flex justify-around items-center z-50">
            {navItems.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={`flex flex-col items-center space-y-1 transition-all ${location.pathname === item.path ? 'scale-110 shadow-sm bg-[#FFF8E1]/50 p-2 rounded-2xl' : 'opacity-50 blur-[0.5px] grayscale'
                        }`}
                >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-[10px] font-black tracking-tighter text-[#3E2723]">{item.label}</span>
                </Link>
            ))}
        </nav>
    );
};

// Ad Component for Revenue Model
const SponsoredAd: React.FC = () => {
    const ads = [
        { id: 1, title: 'LEGO Kalesi', img: '🏰', price: '450 TL', url: '#' },
        { id: 2, title: 'Boyama Seti', img: '🎨', price: '75 TL', url: '#' },
        { id: 3, title: 'Robot Oyuncak', img: '🤖', price: '299 TL', url: '#' },
    ];
    const ad = ads[Math.floor(Math.random() * ads.length)];

    return (
        <div className="bg-[#4CAF50]/5 border-2 border-dashed border-[#4CAF50]/30 p-4 rounded-2xl space-y-2 relative overflow-hidden group">
            <span className="absolute top-2 right-2 text-[8px] font-black bg-[#4CAF50]/10 text-[#4CAF50] px-1 rounded">SPONSORLU</span>
            <div className="flex items-center gap-3">
                <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">{ad.img}</div>
                <div>
                    <h4 className="text-xs font-black text-[#3E2723]">{ad.title}</h4>
                    <p className="text-[10px] font-bold text-[#4CAF50] italic">Hemen incele & biriktirmeye başla!</p>
                </div>
            </div>
        </div>
    );
};

const MainApp: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const [progress, setProgress] = useState(0);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [showVideo, setShowVideo] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);

    const loadUserData = () => {
        const stored = localStorage.getItem('kumbo_user');
        if (stored) {
            const data = JSON.parse(stored);
            setUserData(data);
            setCurrentAmount(data.currentBalance || 0);
            setProgress(((data.currentBalance || 0) / data.itemPrice) * 100);
        } else {
            window.location.href = '/onboarding';
        }
    };

    useEffect(() => {
        loadUserData();
        const interval = setInterval(loadUserData, 1500);
        return () => clearInterval(interval);
    }, []);

    const onBalanceUpdate = (reward: number) => {
        const stored = localStorage.getItem('kumbo_user');
        if (stored) {
            const data = JSON.parse(stored);
            const newBalance = (data.currentBalance || 0) + reward;
            const updated = { ...data, currentBalance: newBalance };
            localStorage.setItem('kumbo_user', JSON.stringify(updated));
            loadUserData();
            setShowCelebration(true);
            setTimeout(() => setShowCelebration(false), 3000);
        }
    };

    const addFındık = () => {
        if (!userData) return;
        const newAmount = Math.min(currentAmount + 25, userData.itemPrice);
        setCurrentAmount(newAmount);
        setProgress((newAmount / userData.itemPrice) * 100);
        const updated = { ...userData, currentBalance: newAmount };
        localStorage.setItem('kumbo_user', JSON.stringify(updated));
    };

    if (!userData) return <div className="min-h-screen bg-[#FFF8E1]" />;

    const remaining = userData.itemPrice - currentAmount;
    const etaValue = Math.ceil(remaining / userData.saveAmount);
    const etaLabel = userData.savePlan === 'daily' ? 'Gün' : userData.savePlan === 'weekly' ? 'Hafta' : 'Ay';

    return (
        <div className="min-h-screen flex flex-col items-center pt-8 pb-24 px-4 bg-[#FFF8E1] overflow-y-auto overflow-x-hidden">
            <header className="mb-6 text-center relative w-full">
                <div className="flex justify-center mb-2">
                    <img src="/kumbo-mascot.png" alt="KUMBO" className="w-20 h-20 object-contain animate-float" />
                </div>
                <h1 className="text-3xl font-black text-[#4CAF50] mb-0 tracking-tight leading-none uppercase">KUMBO</h1>
                <p className="text-sm text-[#3E2723]/60 font-bold uppercase tracking-widest">Hedefine Az Kaldı!</p>

                <button
                    onClick={() => setShowVideo(true)}
                    className="absolute top-0 right-0 bg-white shadow-md p-2 rounded-2xl flex items-center gap-2 border-2 border-[#F5F5F5] hover:scale-105 transition-transform"
                >
                    <span className="text-xl">🎥</span>
                    <span className="text-[10px] font-black text-[#3E2723]">YARDIM</span>
                </button>
            </header>

            <main className="w-full max-w-sm space-y-6">
                <div className="relative">
                    <HazelnutPiggyBank
                        progress={progress}
                        targetAmount={userData.itemPrice}
                        currentAmount={currentAmount}
                    />
                    <AnimatePresence>
                        {showCelebration && (
                            <motion.div
                                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                                animate={{ opacity: 1, y: -100, scale: 1.5 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                            >
                                <div className="bg-[#4CAF50] text-white px-6 py-2 rounded-full font-black shadow-2xl flex items-center gap-2">
                                    <span>🌰</span> +ÖDÜL GELDİ!
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="bubble-card !p-5 space-y-4">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1 w-2/3">
                            <p className="text-[10px] font-black text-[#3E2723]/40 uppercase tracking-tighter">İSTEDİĞİN ÜRÜN</p>
                            <a
                                href={userData.itemUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg font-black text-[#3E2723] uppercase hover:text-[#4CAF50] transition-colors flex items-center gap-1 group"
                            >
                                <span className="truncate block">{userData.itemName}</span>
                                <span className="opacity-0 group-hover:opacity-100 text-xs text-black/20">🔗</span>
                            </a>
                        </div>
                        <div className="text-right space-y-1 w-1/3">
                            <p className="text-[10px] font-black text-[#3E2723]/40 uppercase tracking-tighter">KALAN SÜRE</p>
                            <h3 className="text-lg font-black text-[#FF9800] uppercase">~{etaValue} {etaLabel}</h3>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 bg-[#F9F9F9] p-3 rounded-2xl border-2 border-[#F5F5F5]">
                        <div className="w-12 h-12 bg-[#FF9800] rounded-full flex items-center justify-center text-2xl shadow-md shrink-0">
                            🐿️
                        </div>
                        <p className="text-xs font-bold leading-tight text-[#3E2723]">
                            Fiko diyor ki: "Vay canına {userData.name}! Sadece {remaining} TL daha biriktirmen gerekiyor!"
                        </p>
                    </div>

                    {!userData.isPremium && <SponsoredAd />}

                    <button
                        onClick={addFındık}
                        className="fiko-button w-full text-lg uppercase tracking-wider h-14"
                    >
                        FINDIK EKLE (+25 TL)
                    </button>
                </div>

                <ChildTaskManager onBalanceUpdate={onBalanceUpdate} />
            </main>

            <AnimatePresence>
                {showVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
                        onClick={() => setShowVideo(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="w-full max-w-xl bg-white rounded-[2rem] p-4 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowVideo(false)}
                                className="absolute -top-12 right-0 text-white text-4xl"
                            >
                                ✕
                            </button>
                            <div className="video-container">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                                    title="KUMBO Eğitim Videosu"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="text-center mt-4">
                                <h3 className="text-xl font-black text-[#3E2723]">KUMBO Nasıl Çalışır?</h3>
                                <p className="text-sm font-bold text-[#3E2723]/60">Hadi hemen biriktirmeye başlayalım!</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="relative min-h-screen">
                <Routes>
                    <Route path="/" element={<MainApp />} />
                    <Route path="/story" element={<FinancialStory />} />
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="/parent" element={<ParentDashboard />} />
                </Routes>
                <Navigation />
            </div>
        </BrowserRouter>
    );
};

export default App;
