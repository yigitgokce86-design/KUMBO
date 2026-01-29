import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Onboarding: React.FC = () => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState<number>(0);
    const [itemUrl, setItemUrl] = useState('');
    const [savePlan, setSavePlan] = useState<'daily' | 'weekly' | 'monthly'>('daily');
    const [saveAmount, setSaveAmount] = useState<number>(10);

    const nextStep = () => setStep(prev => prev + 1);

    const completeOnboarding = () => {
        const userData = {
            name,
            itemName,
            itemPrice,
            itemUrl,
            savePlan,
            saveAmount,
            currentBalance: 0,
            onboardingCompleted: true,
            isPremium: false // Default to free
        };
        localStorage.setItem('kumbo_user', JSON.stringify(userData));
        window.location.href = '/';
    };

    // Helper to truncate long URLs for display
    const truncateUrl = (url: string) => {
        if (url.length > 30) return url.substring(0, 27) + '...';
        return url;
    };

    return (
        <div className="min-h-screen bg-[#FFF8E1] flex flex-col items-center justify-center p-6 overflow-x-hidden pb-12">
            <AnimatePresence mode="wait">
                {/* Step 1: Hoşgeldin & İsim */}
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="bubble-card w-full max-w-sm text-center space-y-6"
                    >
                        <div className="w-32 h-32 mx-auto relative">
                            <img src="/kumbo-mascot.png" alt="Fiko" className="w-full h-full object-contain animate-float" />
                            <div className="absolute -bottom-2 -right-2 bg-[#FF9800] text-white p-2 rounded-full shadow-lg text-xl">🐿️</div>
                        </div>
                        <h2 className="text-3xl font-black text-[#3E2723]">Merhaba!</h2>
                        <p className="text-lg font-bold text-[#3E2723]/60 leading-tight">Ben Fiko! Seninle harika şeyler biriktireceğiz. Senin adın ne?</p>
                        <input
                            type="text"
                            placeholder="Adını buraya yaz..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-4 rounded-2xl border-4 border-[#F5F5F5] focus:border-[#4CAF50] outline-none text-center text-xl font-black bg-[#F9F9F9]"
                        />
                        {name.length > 1 && (
                            <button onClick={nextStep} className="fiko-button w-full text-xl uppercase tracking-tighter">TANIŞTIĞIMIZA MEMNUN OLDUM!</button>
                        )}
                    </motion.div>
                )}

                {/* Step 2: Link Yapıştırma (Affiliate Temeli) */}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="bubble-card w-full max-w-sm text-center space-y-6"
                    >
                        <div className="text-5xl mb-4">🔗</div>
                        <h2 className="text-2xl font-black text-[#3E2723]">Memnun Oldum, {name}!</h2>
                        <p className="text-lg font-bold text-[#3E2723]/60 leading-tight">Şimdi, ulaşmak istediğin o harika ürünün linkini buraya yapıştır!</p>
                        <input
                            type="text"
                            placeholder="Amazon veya Trendyol linki..."
                            value={itemUrl}
                            onChange={(e) => setItemUrl(e.target.value)}
                            className="w-full p-4 rounded-2xl border-4 border-[#F5F5F5] focus:border-[#4CAF50] outline-none text-center text-xs font-bold text-[#3E2723] bg-[#F9F9F9] break-all"
                        />
                        {itemUrl.startsWith('http') && (
                            <button onClick={nextStep} className="fiko-button w-full text-xl uppercase tracking-tighter">İLERLE</button>
                        )}
                    </motion.div>
                )}

                {/* Step 3: Ürün Adı */}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="bubble-card w-full max-w-sm text-center space-y-6"
                    >
                        <div className="text-5xl mb-4">🎁</div>
                        <h2 className="text-2xl font-black text-[#3E2723]">Ürünün Adı Nedir?</h2>
                        <p className="text-sm font-bold text-[#3E2723]/40 break-all px-4">{truncateUrl(itemUrl)}</p>
                        <input
                            type="text"
                            placeholder="Örn: LEGO Seti, Bisiklet..."
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            className="w-full p-4 rounded-2xl border-4 border-[#F5F5F5] focus:border-[#4CAF50] outline-none text-center text-xl font-black bg-[#F9F9F9]"
                        />
                        {itemName.length > 1 && (
                            <button onClick={nextStep} className="fiko-button w-full text-xl uppercase tracking-tighter">BU ÇOK HAVALI!</button>
                        )}
                    </motion.div>
                )}

                {/* Step 4: Ürün Fiyatı */}
                {step === 4 && (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="bubble-card w-full max-w-sm text-center space-y-6"
                    >
                        <div className="text-5xl mb-4">💰</div>
                        <h2 className="text-2xl font-black text-[#3E2723] uppercase">{itemName}</h2>
                        <p className="text-lg font-bold text-[#3E2723]/60 leading-tight">Fiyatını biliyor musun? Yaklaşık bir tutar da yazabilirsin.</p>
                        <div className="relative px-4">
                            <input
                                type="number"
                                placeholder="0"
                                value={itemPrice || ''}
                                onChange={(e) => setItemPrice(Number(e.target.value))}
                                className="w-full p-4 rounded-2xl border-4 border-[#F5F5F5] focus:border-[#4CAF50] outline-none text-center text-3xl font-black bg-[#F9F9F9] pr-12"
                            />
                            <span className="absolute right-10 top-1/2 -translate-y-1/2 text-xl font-black text-[#3E2723]/40">TL</span>
                        </div>
                        {itemPrice > 0 && (
                            <button onClick={nextStep} className="fiko-button w-full text-xl uppercase tracking-tighter">İLERİYE GİDELİM</button>
                        )}
                    </motion.div>
                )}

                {/* Step 5: Birikim Planı */}
                {step === 5 && (
                    <motion.div
                        key="step5"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="bubble-card w-full max-w-md text-center space-y-6"
                    >
                        <div className="text-5xl mb-4">🌰</div>
                        <h2 className="text-2xl font-black text-[#3E2723]">Birikim Planın Nedir?</h2>
                        <p className="text-lg font-bold text-[#3E2723]/60 leading-tight">Kumbara'na ne kadar sıklıkla ve ne kadar fındık (para) ekleyebilirsin?</p>

                        <div className="flex gap-2">
                            {(['daily', 'weekly', 'monthly'] as const).map((plan) => (
                                <button
                                    key={plan}
                                    onClick={() => setSavePlan(plan)}
                                    className={`plan-button ${savePlan === plan ? 'active border-[#4CAF50]' : 'border-[#F5F5F5]'}`}
                                >
                                    <span className="font-black text-xs uppercase tracking-tighter">
                                        {plan === 'daily' ? 'GÜNLÜK' : plan === 'weekly' ? 'HAFTALIK' : 'AYLIK'}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className="relative">
                            <input
                                type="number"
                                value={saveAmount}
                                onChange={(e) => setSaveAmount(Number(e.target.value))}
                                className="w-full p-4 rounded-2xl border-4 border-[#F5F5F5] focus:border-[#4CAF50] outline-none text-center text-3xl font-black bg-[#F9F9F9] pr-12"
                            />
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl font-black text-[#3E2723]/40">TL</span>
                        </div>

                        <button onClick={nextStep} className="fiko-button w-full text-xl uppercase tracking-tighter">PLANI KAYDET</button>
                    </motion.div>
                )}

                {/* Step 6: "Nasıl Kullanılır?" Videosu */}
                {step === 6 && (
                    <motion.div
                        key="step6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="bubble-card w-full max-w-xl text-center space-y-6"
                    >
                        <h2 className="text-2xl font-black text-[#3E2723]">KUMBO'yu Keşfet! 🎥</h2>
                        <p className="text-lg font-bold text-[#3E2723]/60 leading-tight">Uygulamayı nasıl kullanacağını öğrenmek için bu kısa videoyu izle.</p>

                        <div className="video-container">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"
                                title="KUMBO Eğitim Videosu"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        <button onClick={completeOnboarding} className="fiko-button w-full text-xl uppercase tracking-tighter">HAYDİ BAŞLAYALIM! 🚀</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Onboarding;
