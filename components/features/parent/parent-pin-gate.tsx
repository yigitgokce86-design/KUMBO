"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, Lock } from "lucide-react"

interface ParentPinGateProps {
    onUnlock: () => void
}

export function ParentPinGate({ onUnlock }: ParentPinGateProps) {
    const [pin, setPin] = useState("")
    const [error, setError] = useState(false)

    const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value.length <= 4 && /^\d*$/.test(value)) {
            setPin(value)
            setError(false)
        }
    }

    useEffect(() => {
        if (pin.length === 4) {
            if (pin === "0000" || pin === "1234") {
                onUnlock()
            } else {
                setError(true)
                setPin("")
            }
        }
    }, [pin, onUnlock])

    return (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="bg-white max-w-sm w-full rounded-[2rem] p-8 text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-emerald-600 mb-4">
                    <Shield size={40} strokeWidth={2.5} />
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-black text-slate-900">Ebeveyn Girişi</h2>
                    <p className="text-slate-500 font-medium">Devam etmek için 4 haneli PIN kodunu girin.</p>
                    <p className="text-xs text-slate-400">(Varsayılan: 0000)</p>
                </div>

                <div className="relative">
                    <Input
                        type="password"
                        inputMode="numeric"
                        value={pin}
                        onChange={handlePinChange}
                        className="text-center text-4xl tracking-[1em] h-20 bg-slate-50 border-2 border-slate-200 text-slate-900 rounded-2xl focus-visible:ring-emerald-500 font-black"
                        placeholder="••••"
                    />
                    {error && (
                        <p className="text-red-500 text-sm font-bold mt-2 animate-pulse">
                            Hatalı PIN! Tekrar deneyin.
                        </p>
                    )}
                </div>

                <Button
                    variant="ghost"
                    className="text-slate-400 hover:text-slate-600"
                    onClick={() => window.location.href = '/dashboard'}
                >
                    Geri Dön
                </Button>
            </div>
        </div>
    )
}
