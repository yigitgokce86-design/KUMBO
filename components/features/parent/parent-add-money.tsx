"use client"

import { useState } from "react"
import { useStore } from "@/lib/store/use-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Character } from "@/components/ui/character"
import { Check, X } from "lucide-react"

export function ParentAddMoney() {
    const [amount, setAmount] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const { addMoney, goals } = useStore()
    const activeGoal = goals[0]

    const handleAdd = async () => {
        if (!amount || isNaN(Number(amount)) || !activeGoal) return

        await addMoney(activeGoal.id, Number(amount), "Harçlık")
        setAmount("")
        setIsOpen(false)
        alert("Harçlık başarıyla gönderildi! 💸")
    }

    if (!activeGoal) return <Button disabled variant="outline">Aktif Hedef Yok</Button>

    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors w-full"
            >
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                    <Character variant="guide" size="sm" className="w-10 h-10" />
                </div>
                <div className="flex-1 text-left">
                    <h3 className="font-bold text-slate-800">Harçlık Gönder</h3>
                    <p className="text-sm text-slate-500">Çocuğunuzun hesabına para ekleyin.</p>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/20 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 space-y-6 relative shadow-2xl animate-in zoom-in-95 duration-200 border-4 border-slate-100">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 p-2 rounded-full"
                        >
                            <X size={24} />
                        </button>

                        <div className="text-center space-y-2">
                            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-emerald-600 mb-2">
                                <Character variant="guide" size="sm" speaking />
                            </div>
                            <h3 className="text-2xl font-black text-slate-800">Harçlık Gönder</h3>
                            <p className="text-slate-500 font-medium text-sm">
                                {activeGoal.title} hedefine ekleniyor.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black text-2xl">₺</span>
                                <Input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="pl-10 h-16 text-3xl font-black bg-slate-50 border-2 border-slate-200 rounded-2xl text-center focus-visible:ring-emerald-500"
                                    placeholder="0"
                                    autoFocus
                                />
                            </div>

                            <div className="flex gap-2 justify-center">
                                {[20, 50, 100].map(val => (
                                    <button
                                        key={val}
                                        onClick={() => setAmount(val.toString())}
                                        className="px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-600 font-bold hover:bg-slate-100 hover:border-slate-200 transition-all active:scale-95"
                                    >
                                        +{val}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Button onClick={handleAdd} className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-200">
                            <Check className="mr-2" /> Gönder
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}
