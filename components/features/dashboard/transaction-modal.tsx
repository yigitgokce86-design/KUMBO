"use client"

import { useState } from "react"
import { useStore } from "@/lib/store/use-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Check } from "lucide-react"
import { Character } from "@/components/ui/character"

interface TransactionModalProps {
    isOpen: boolean
    onClose: () => void
}

export function TransactionModal({ isOpen, onClose }: TransactionModalProps) {
    const [amount, setAmount] = useState("")
    const { addMoney, goals } = useStore()
    const activeGoal = goals[0]

    if (!isOpen) return null

    const handleAdd = () => {
        if (!amount || isNaN(Number(amount))) return

        // 1. Add Money
        addMoney(activeGoal.id, Number(amount))

        // 2. Play Sound (Mock)
        // const audio = new Audio('/coin.mp3')
        // audio.play()

        // 3. Close
        setAmount("")
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/20 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 space-y-6 relative shadow-2xl animate-in zoom-in-95 duration-200 border-4 border-emerald-100">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-emerald-900/40 hover:text-emerald-900 transition-colors bg-emerald-50 p-2 rounded-full"
                >
                    <X size={24} />
                </button>

                {/* Character Feedback */}
                <div className="flex flex-col items-center text-center space-y-2">
                    <Character variant="guide" size="md" speaking />
                    <h3 className="text-2xl font-black text-emerald-900 font-sans">Ne kadar ekliyoruz?</h3>
                    <p className="text-emerald-700/80 text-sm font-medium">Kumbarana atmak istediğin tutarı gir.</p>
                </div>

                {/* Input Area */}
                <div className="space-y-4">
                    <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-black text-2xl group-focus-within:scale-110 transition-transform">₺</span>
                        <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="pl-10 h-20 text-4xl font-black bg-emerald-50 border-2 border-emerald-100 text-emerald-900 placeholder:text-emerald-900/20 rounded-2xl text-center focus:ring-4 focus:ring-emerald-200 focus:border-emerald-400 transition-all shadow-inner"
                            placeholder="0"
                            autoFocus
                        />
                    </div>

                    {/* Quick Presets */}
                    <div className="flex gap-2 justify-center">
                        {[10, 20, 50].map((val) => (
                            <button
                                key={val}
                                onClick={() => setAmount(val.toString())}
                                className="px-5 py-3 rounded-2xl bg-white border-2 border-emerald-100 text-emerald-700 font-bold shadow-[0_4px_0_0_#D1FAE5] active:shadow-none active:translate-y-[4px] hover:bg-emerald-50 transition-all"
                            >
                                + {val} TL
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Button */}
                <Button
                    onClick={handleAdd}
                    className="w-full h-16 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xl rounded-2xl shadow-[0_6px_0_0_#059669] active:shadow-none active:translate-y-[6px] transition-all"
                >
                    <Check className="mr-2 stroke-[3]" /> Kumbaraya At!
                </Button>

            </div>
        </div>
    )
}
