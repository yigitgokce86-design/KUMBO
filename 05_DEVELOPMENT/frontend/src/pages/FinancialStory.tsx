import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Story {
    id: number;
    title: string;
    icon: string;
    category: 'BÜTÇE' | 'TASARRUF' | 'İHTİYAÇ';
    content: string;
    tip: string;
}

const stories: Story[] = [
    {
        id: 1,
        title: 'Fiko ve Altın Fındıklar',
        icon: '🌰',
        category: 'BÜTÇE',
        content: 'Fiko, ormanda her gün 10 fındık topluyor. 5 tanesini karnını doyurmak için yiyor, 2 tanesini acil durumlar için saklıyor, 3 tanesini ise en büyük hayali olan o dev kışlık ev için biriktiriyor. İşte buna bütçe yönetimi deniyor!',
        tip: 'Kumbarana para atmadan önce, harcaman gerekenleri ayırıp kalanını biriktirmelisin.'
    },
    {
        id: 2,
        title: 'İhtiyaç mı, İstek mi?',
        icon: '⚖️',
        category: 'İHTİYAÇ',
        content: 'Kumbo bir gün çok süslü bir şapka gördü. Ama kış geliyordu ve kalın bir atkıya daha çok ihtiyacı vardı. Şapka bir "istek", atkı ise bir "ihtiyaçtı". Kumbo parasını önce ihtiyaçlarına ayırdığı için kışın hiç üşümedi.',
        tip: 'Bir şeyi almadan önce kendine sor: Bu gerçekten gerekli mi, yoksa sadece istiyor muyum?'
    },
    {
        id: 3,
        title: 'Tasarruf Sihirbazı',
        icon: '🪄',
        category: 'TASARRUF',
        content: 'Damlayan bir musluk, sönmeyen bir lamba... Aslında bunlar minik para canavarlarıdır! Enerji ve su tasarrufu yapmak, kumbarana dolaylı yoldan daha fazla para girmesini sağlar.',
        tip: 'Evde gereksiz yanan ışıkları söndürerek ebeveynlerine ve bütçene yardım edebilirsin.'
    }
];

const FinancialStory: React.FC = () => {
    const [selectedStory, setSelectedStory] = useState<Story | null>(null);

    return (
        <div className="min-h-screen bg-[#FFF8E1] pt-8 pb-24 px-6 flex flex-col items-center overflow-x-hidden">
            <header className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-2 animate-float">
                    <img src="/kumbo-mascot.png" alt="Fiko" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-3xl font-black text-[#4CAF50] uppercase tracking-tighter">HİKAYE VAKTİ</h1>
                <p className="text-sm font-bold text-[#3E2723]/60 uppercase tracking-widest">Finansal Okuryazarlık</p>
            </header>

            <main className="w-full max-w-md space-y-4">
                {stories.map((story) => (
                    <motion.div
                        key={story.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedStory(story)}
                        className="bubble-card !p-5 cursor-pointer flex items-center gap-4 hover:border-[#4CAF50]/30"
                    >
                        <div className="text-4xl bg-[#F5F5F5] w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner">
                            {story.icon}
                        </div>
                        <div className="flex-1">
                            <span className="text-[10px] font-black bg-[#4CAF50]/10 text-[#4CAF50] px-2 py-0.5 rounded-full">
                                {story.category}
                            </span>
                            <h3 className="text-lg font-black text-[#3E2723] uppercase mt-1">{story.title}</h3>
                            <p className="text-xs font-bold text-[#3E2723]/40">Okumak için dokun ➜</p>
                        </div>
                    </motion.div>
                ))}

                <div className="bg-white/50 border-2 border-dashed border-[#3E2723]/10 rounded-[2rem] p-6 text-center mt-8">
                    <p className="text-xs font-bold text-[#3E2723]/40 italic">
                        "Bilgi en büyük birikimdir. 🐿️"
                    </p>
                </div>
            </main>

            <AnimatePresence>
                {selectedStory && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={() => setSelectedStory(null)}
                    >
                        <motion.div
                            initial={{ y: 50, scale: 0.9 }}
                            animate={{ y: 0, scale: 1 }}
                            className="bubble-card w-full max-w-sm max-h-[80vh] overflow-y-auto !p-8 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedStory(null)}
                                className="absolute top-4 right-4 text-2xl opacity-20 hover:opacity-100"
                            >
                                ✕
                            </button>

                            <div className="text-center mb-6">
                                <div className="text-6xl mb-4">{selectedStory.icon}</div>
                                <h2 className="text-2xl font-black text-[#3E2723] uppercase">{selectedStory.title}</h2>
                            </div>

                            <div className="space-y-6">
                                <p className="text-lg font-bold text-[#3E2723]/80 leading-relaxed text-center">
                                    {selectedStory.content}
                                </p>

                                <div className="bg-[#FF9800]/10 border-2 border-[#FF9800]/20 p-4 rounded-2xl">
                                    <p className="text-xs font-black text-[#FF9800] uppercase tracking-widest mb-1">🐿️ FİKO'NUN TÜYOSU:</p>
                                    <p className="text-sm font-bold text-[#3E2723]">{selectedStory.tip}</p>
                                </div>

                                <button
                                    onClick={() => setSelectedStory(null)}
                                    className="fiko-button w-full uppercase"
                                >
                                    ANLADIM! 🧪
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FinancialStory;
