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
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900 p-4">
            <Card className="w-full max-w-md bg-white/10 border-white/20 text-white backdrop-blur-xl">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-white/20 p-3 rounded-full w-fit mb-4">
                        <Lock className="w-8 h-8 text-emerald-300" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">Kumbo Private Beta</CardTitle>
                    <CardDescription className="text-indigo-200">
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
                            className="bg-white/5 border-white/10 text-center text-lg tracking-widest placeholder:text-white/30 focus-visible:ring-emerald-400"
                        />
                        {error && <p className="text-sm text-red-300 text-center animate-pulse">{error}</p>}
                        <Button
                            type="submit"
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold"
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
