"use client"

import { useEffect } from "react"
import { useStore } from "@/lib/store/use-store"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const fetchUser = useStore(state => state.fetchUser)
    const fetchGoals = useStore(state => state.fetchGoals)
    const setUser = useStore(state => state.setUser)
    const router = useRouter()

    useEffect(() => {
        const supabase = createClient()

        // Check active session
        const initSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session?.user) {
                await fetchUser()
                fetchGoals()
            }
        }

        initSession()

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                await fetchUser()
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
    }, [setUser, fetchGoals, fetchUser, router])

    return <>{children}</>
}
