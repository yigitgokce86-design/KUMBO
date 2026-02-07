"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store/use-store"
import { useTheme } from "@/lib/store/use-theme"
import { Character } from "@/components/ui/character"
import { MICROCOPY } from "@/lib/theme-config"
import { loginWithEmail, loginWithGoogle } from "@/lib/auth"

// Zod Schemas
const childSchema = z.object({
    pin: z.string().min(4, "PIN 4 haneli olmalı").max(4),
})

const parentSchema = z.object({
    email: z.string().email("Geçerli bir e-posta adresi giriniz."),
    password: z.string().min(6, "Şifre en az 6 karakter olmalıdır."),
})

export function LoginForm() {
    const [loading, setLoading] = React.useState(false)
    const setUser = useStore((state) => state.setUser)
    const router = useRouter()
    const { currentTheme } = useTheme()

    const childForm = useForm<z.infer<typeof childSchema>>({
        resolver: zodResolver(childSchema),
    })

    const parentForm = useForm<z.infer<typeof parentSchema>>({
        resolver: zodResolver(parentSchema),
    })

    async function onChildSubmit(values: z.infer<typeof childSchema>) {
        setLoading(true)
        // Note: For OLP, we are simulating Child Login with PIN by just checking valid format
        // In real app, this would verify against a hashed PIN in the Profile.
        // For now, allow any entry to demo the flow, or map to a demo user.

        // Simulating a successful login for "Can" (Child)
        // We'll update this to real auth if the user has a way to auth kids (usually via Parent's account + PIN)
        setTimeout(() => {
            setUser({ id: 'demo-child-id', name: 'Can', role: 'child' })
            setLoading(false)
            router.push('/goals')
        }, 1000)
    }

    async function onParentSubmit(values: z.infer<typeof parentSchema>) {
        setLoading(true)
        const { data, error } = await loginWithEmail(values.email)

        if (error) {
            console.error(error)
            // set error state
        } else {
            // In Supabase, Magic Link sends an email. 
            // We should show a "Check your email" message.
            alert("Lütfen giriş yapmak için e-posta kutunuzu kontrol edin (Magic Link).")
        }
        setLoading(false)
    }

    async function handleGoogleLogin() {
        setLoading(true)
        await loginWithGoogle()
        // Redirect handled by Supabase
    }

    return (
        <Card className="glass-card w-full max-w-md mx-auto border-white/50 dark:border-white/10">
            <CardHeader>
                <CardTitle className="text-center text-2xl">Giriş Yap</CardTitle>
                <CardDescription className="text-center">Kumbo hesabına eriş</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="child" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="child">
                            <User className="w-4 h-4 mr-2" /> Çocuk
                        </TabsTrigger>
                        <TabsTrigger value="parent">
                            <Shield className="w-4 h-4 mr-2" /> Ebeveyn
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="child">
                        <div className="flex flex-col items-center mb-6 space-y-2">
                            <Character variant="guide" size="sm" speaking />
                            <p className="text-center text-muted-foreground text-sm font-medium">
                                {MICROCOPY.onboarding[currentTheme]}
                            </p>
                        </div>
                        <form onSubmit={childForm.handleSubmit(onChildSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="pin">Gizli Kodun (PIN)</Label>
                                <div className="relative">
                                    <Input
                                        id="pin"
                                        type="password"
                                        placeholder="****"
                                        className="text-center text-2xl tracking-widest h-14"
                                        maxLength={4}
                                        {...childForm.register("pin")}
                                    />
                                </div>
                                {childForm.formState.errors.pin && (
                                    <p className="text-sm text-destructive">{childForm.formState.errors.pin.message}</p>
                                )}
                            </div>
                            <Button type="submit" className="w-full" size="lg" disabled={loading} variant="premium">
                                {loading ? "Giriliyor..." : "Başla!"}
                            </Button>
                        </form>
                    </TabsContent>

                    <TabsContent value="parent">
                        <form onSubmit={parentForm.handleSubmit(onParentSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">E-posta</Label>
                                <Input id="email" type="email" placeholder="ornek@kumbo.app" {...parentForm.register("email")} />
                                {parentForm.formState.errors.email && (
                                    <p className="text-sm text-destructive">{parentForm.formState.errors.email.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Şifre</Label>
                                <Input id="password" type="password" {...parentForm.register("password")} />
                                {parentForm.formState.errors.password && (
                                    <p className="text-sm text-destructive">{parentForm.formState.errors.password.message}</p>
                                )}
                            </div>
                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-muted" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">veya</span>
                                </div>
                            </div>

                            <Button type="button" variant="outline" className="w-full mb-2" onClick={handleGoogleLogin}>
                                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                </svg>
                                Google ile Giriş Yap
                            </Button>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Kontrol ediliyor..." : "E-posta ile Giriş Yap"}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
