"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Lock } from "lucide-react"

export default function BetaGatePage() {
    const [code, setCode] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const response = await fetch('/api/beta-check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code })
            })

            if (response.ok) {
                router.push('/')
                router.refresh()
            } else {
                setError("Hatalı kod. Lütfen davetiyenizi kontrol edin.")
            }
        } catch (err) {
            setError("Bir hata oluştu.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#E0F2F1] relative overflow-hidden p-4">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-300 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-teal-200 rounded-full blur-3xl" />
            </div>

            <Card className="w-full max-w-md bg-white border-4 border-emerald-50 text-emerald-900 shadow-xl relative z-10 rounded-[2rem]">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-emerald-100 p-4 rounded-full w-fit mb-4 shadow-sm">
                        <Lock className="w-10 h-10 text-emerald-600" />
                    </div>
                    <CardTitle className="text-3xl font-black tracking-tight text-emerald-950">Kumbo Private Beta</CardTitle>
                    <CardDescription className="text-emerald-700/80 font-medium font-sans">
                        Bu proje şu anda kapalı beta aşamasındadır.<br />
                        Erişim için lütfen davetiye kodunuzu giriniz.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="password"
                            placeholder="Erişim Kodu"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="bg-emerald-50 border-2 border-emerald-100 text-center text-2xl tracking-[0.5em] placeholder:tracking-normal placeholder:text-emerald-900/30 h-16 rounded-2xl focus-visible:ring-emerald-400 font-bold text-emerald-900"
                        />
                        {error && <p className="text-sm text-red-300 text-center animate-pulse">{error}</p>}
                        <Button
                            type="submit"
                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black h-14 rounded-2xl text-lg shadow-[0_4px_0_0_#059669] active:shadow-none active:translate-y-[4px] transition-all"
                            disabled={loading || !code}
                        >
                            {loading ? "Kontrol Ediliyor..." : "Giriş Yap"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
