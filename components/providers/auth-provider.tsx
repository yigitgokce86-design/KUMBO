"use client"

import { useEffect } from "react"
import { useStore } from "@/lib/store/use-store"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const setUser = useStore(state => state.setUser)
    const fetchGoals = useStore(state => state.fetchGoals)
    const router = useRouter()

    useEffect(() => {
        const supabase = createClient()

        // Check active session
        const initSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session?.user) {
                // Here we would ideally fetch the profile from 'profiles' table
                // For now, we use the auth user metadata
                setUser({
                    id: session.user.id,
                    name: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'Kullanıcı',
                    role: 'parent', // Defaulting to parent for Auth users, 'child' is usually local/PIN only for now
                    email: session.user.email
                })
                fetchGoals()
            }
        }

        initSession()

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                setUser({
                    id: session.user.id,
                    name: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'Kullanıcı',
                    role: 'parent',
                    email: session.user.email
                })
                fetchGoals()
                router.refresh()
            } else if (event === 'SIGNED_OUT') {
                setUser(null)
                router.push('/')
                router.refresh()
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [setUser, fetchGoals, router])

    return <>{children}</>
}
