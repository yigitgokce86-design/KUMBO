import { createClient } from "@/lib/supabase/client"

export async function loginWithEmail(email: string) {
    const supabase = createClient()

    // For MVP/Dev, we might just simulate success if no backend is connected yet,
    // but here we implement the real call.
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        console.warn("Supabase URL not found. Simulating login.")
        return { user: { email }, error: null }
    }

    const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            shouldCreateUser: true,
            emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
    })

    return { data, error }
}

export async function loginWithGoogle() {
    const supabase = createClient()

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        console.warn("Supabase URL not found. Simulating login.")
        return { error: "Supabase not configured" }
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/auth/callback`,
        },
    })

    return { data, error }
}

export async function logout() {
    const supabase = createClient()
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return
    await supabase.auth.signOut()
}

export async function getUser() {
    const supabase = createClient()
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null
    const { data: { user } } = await supabase.auth.getUser()
    return user
}
